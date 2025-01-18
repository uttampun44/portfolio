"use client"

import Button from "components/Button";
import Input from "components/Input";
import Label from "components/Label";
import Modal from "components/Modal";
import Overlary from "components/Overlary";
import Title from "components/Title";
import useToggle from "hooks/useToggle";
import Cookies from "js-cookie";
import AuthenticateNavLink from "layout/authenticatelayout/AuthenticateNavLink";
import AuthenticateSidebar from "layout/authenticatelayout/AuthenticateSidebar";
import { Controller, FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { Table, Column, HeaderCell, Cell } from 'rsuite-table';
import React, { useMemo, useRef, useState } from "react";
import dynamic from 'next/dynamic';
import useGet from "hooks/api/useGet";
import { useMutation, useQuery } from "@tanstack/react-query";
import usePost from "hooks/api/usePost";
import { toast } from "sonner";
import { BiEditAlt, BiTrash } from "react-icons/bi";


type blogPost = {
    title: string,
    mini_title: string,
    tags: string,
    content: string,
    image: string,
    blog_category_id: string,
}

type blogCategories = {
    id: number,
    name: string,
}

type postResponse = {
    id: number,
    title: string,
    mini_title: string,
    tags: string,
    content: string,
    image: string,  
    blog_category_id: number,
}

type blogCategoryResponse = {
    posts: postResponse[],
    blog_categories: blogCategories[]
}


export default function Blogs() {

    const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });

    const url = process.env.NEXT_PUBLIC_API_URL;

    const token = Cookies.get("token");
    const { isOpen, setIsOpen, } = useToggle();

    const editor = useRef(null);

    const [blogCategory, setBlogCategory] = useState<blogCategoryResponse | undefined>(undefined);



    const config: Record<string, {}> = useMemo(
        () => ({
            readonly: false,
            placeholder: 'Start typings...',
        }),
        []
    );



    const methods = useForm<blogPost>({
        defaultValues: {
            title: "",
            mini_title: "",
            tags: "",
            content: "",
            image: "",
            blog_category_id: ""
        }
    });

    const { postData } = usePost<blogPost>(`${url}/api/posts`);

    const mutation = useMutation({
        mutationFn: (data: blogPost) => postData(data, {
            Authorization: `Bearer ${token}`,
        }),
        onSuccess: (response) => {
            if (!response?.data) return;
            toast.success("Blog Created");
        },
        onError: () => {
            toast.error("Blog Creation Failed");
        }
    })


    const handleClick = () => {
        setIsOpen(true);
    };

    const onSubmit: SubmitHandler<blogPost> = async (data) => {
        try {
            mutation.mutate(data);
        } catch (error) {
            if (error instanceof Error) {
                toast.error(`Error fetching data:${error.message}`);
            } else {
                toast.error('Unknown error occurred while fetching data.');
            }
        }
    }


    const { getData } = useGet<blogCategoryResponse | undefined>(`${url}/api/posts`);

    const fetchBlogCategories = async (): Promise<blogCategoryResponse | undefined> => {
        const response = await getData();
        setBlogCategory(response);
        return response;
    }

   const {isLoading} =  useQuery({
        queryFn: fetchBlogCategories,
        queryKey: ["blog_categories"],
        refetchOnWindowFocus: false,
        refetchOnMount: false,
    })

  
    return <div>
        {
            token && (
                <AuthenticateNavLink>
                    <AuthenticateSidebar />
                    {
                        isOpen && (
                            <React.Fragment>
                                <Overlary />
                                <Modal className={{
                                    modalContainer: "max-w-xl w-full mx-auto bg-white rounded-md p-5 min-h-fit top-10"
                                }}>
                                    <Label name="Blogs" htmlFor="name" className="text-lg font-bold" />
                                    <FormProvider {...methods}>
                                        <form onSubmit={methods.handleSubmit(onSubmit)} className="flex flex-col gap-y-2 w-full mt-2">
                                            <Input
                                                type="text"
                                                {...methods.register("title")}

                                                placeholder="Title"
                                                className={{
                                                    input: "w-full focus:outline-none border-[1px] border-backend-primary-text-color p-2 rounded-md",
                                                    label: "text-backend-primary-text-color"
                                                }}
                                            />
                                            <Input
                                                type="text"
                                                {...methods.register("mini_title")}

                                                placeholder="Semi Title"
                                                className={{
                                                    input: "w-full focus:outline-none border-[1px] border-backend-primary-text-color p-2 rounded-md",
                                                    label: "text-backend-primary-text-color"
                                                }}
                                            />

                                            <Input
                                                type="text"
                                                {...methods.register("tags")}

                                                placeholder="Tags"
                                                className={{
                                                    input: "w-full focus:outline-none border-[1px] border-backend-primary-text-color p-2 rounded-md",
                                                    label: "text-backend-primary-text-color"
                                                }}
                                            />

                                            <Input
                                                type="file"
                                                {...methods.register("image")}

                                                placeholder="Semi Title"
                                                className={{
                                                    input: "w-full focus:outline-none border-[1px] border-backend-primary-text-color p-2 rounded-md",
                                                    label: "text-backend-primary-text-color"
                                                }}
                                            />


                                            <Controller

                                                control={methods.control}
                                                name="content"
                                                render={({ field }) => (
                                                    <JoditEditor
                                                        ref={editor}
                                                        value={field.value}
                                                        config={config}
                                                        onBlur={(newContent) => field.onChange(newContent)}
                                                        onChange={(newContent) => field.onChange(newContent)}
                                                    />
                                                )}
                                            />

                                            <select className="my-2 border-[1px] border-backend-primary-text-color p-2 rounded-md" {...methods.register("blog_category_id")}>
                                                <option>Blog Category</option>
                                                {
                                                    blogCategory?.blog_categories?.map((category: blogCategories,) => {
                                                        return (

                                                            <option key={category.id} value={category.id}>{category.name}</option>

                                                        )
                                                    })
                                                }
                                            </select>

                                            <div className="button my-2">
                                                <Button type="submit" className="bg-bg-backend-secondary-color text-white rounded-md">Submit</Button> <Button className="bg-primary-text-color text-white rounded-md" onClick={() => {
                                                    setIsOpen(false);
                                                }}>Cancel</Button>
                                            </div>
                                        </form>
                                    </FormProvider>
                                </Modal>
                            </React.Fragment>
                        )
                    }
                    <div className="blogsContainer min-h-full  w-full bg-bg-dashboard h-screen lg:p-10 ">
                        <div className="blogBox ml-64 mr-0 bg-white rounded-md p-5">

                            <div className="row flex justify-between items-center text-backend-primary-text-color mb-2">
                                <Title title="Blogs" /> <Button onClick={handleClick} className="bg-bg-backend-secondary-color p-5 rounded-md text-white font-medium">Create Blog</Button>
                            </div>

                            <div className="tableBox">
                                <Table
                                 data={blogCategory?.posts}
                                    cellBordered
                                    bordered
                                  loading={isLoading}
                                  loadAnimation={true}
                                  height={innerHeight - 350}
                                >
                                    <Column>
                                        <HeaderCell className="text-primary-text-color">ID</HeaderCell>
                                        <Cell>1</Cell>
                                    </Column>
                                    <Column>
                                        <HeaderCell className="text-primary-text-color">Title</HeaderCell>
                                        <Cell dataKey="id" />
                                    </Column>
                                    <Column>
                                        <HeaderCell className="text-primary-text-color">Semi Title</HeaderCell>
                                        <Cell dataKey="mini_title" />
                                    </Column>
                                    <Column>
                                        <HeaderCell className="text-primary-text-color">Tags</HeaderCell>
                                        <Cell dataKey="tags" />
                                    </Column>
                                    <Column>
                                        <HeaderCell className="text-primary-text-color">Image</HeaderCell>
                                        <Cell dataKey="image" />
                                    </Column>
                                    <Column>
                                        <HeaderCell className="text-primary-text-color">Content</HeaderCell>
                                        <Cell dataKey="content" />
                                    </Column>
                                    <Column>
                                        <HeaderCell className="text-primary-text-color">Blog Category</HeaderCell>
                                        <Cell>1</Cell>
                                    </Column>
                                    <Column>
                                        <HeaderCell className="text-primary-text-color">Edit</HeaderCell>
                                        <Cell>
                                            {
                                                (rowData: postResponse) => {
                                                    return (
                                                        <BiEditAlt className="cursor-pointer text-lg" key={rowData.id} />
                                                    )
                                                }
                                            }
                                        </Cell>
                                    </Column>
                                    <Column>
                                        <HeaderCell className="text-primary-text-color">Delete</HeaderCell>
                                        <Cell>
                                            {
                                                (rowData: postResponse) => {
                                                    return (
                                                        <BiTrash className="cursor-pointer text-lg" key={rowData.id} />
                                                    )
                                                }
                                            }
                                        </Cell>
                                    </Column>
                                </Table>
                            </div>
                        </div>
                    </div>
                </AuthenticateNavLink>
            )
        }
    </div>;
}