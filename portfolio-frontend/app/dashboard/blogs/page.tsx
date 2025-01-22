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
import { Controller, FormProvider, set, SubmitHandler, useForm } from "react-hook-form";
import { Table, Column, HeaderCell, Cell } from 'rsuite-table';
import React, { useMemo, useRef, useState } from "react";
import dynamic from 'next/dynamic';
import useGet from "hooks/api/useGet";
import { useMutation, useQuery } from "@tanstack/react-query";
import usePost from "hooks/api/usePost";
import { toast } from "sonner";
import { BiEditAlt, BiTrash } from "react-icons/bi";
import useDelete from "hooks/api/useDelete";


type blogPost = {
    id?: number,
    title: string,
    mini_title: string,
    tags: string,
    content: string,
    image: File,
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

type editBlogResponse = {
    id: number,
    title: string,
    mini_title: string,
    tags: string,
    content: string,
    image: string | File,
    blog_category_id: string,
}


export default function Blogs() {

    const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });

    const url = process.env.NEXT_PUBLIC_API_URL;

    const token = Cookies.get("token");
    const { isOpen, setIsOpen, } = useToggle();
 

    const [editData, setEditData] = useState<blogPost | undefined>(undefined);

    const editor = useRef(null);

    const [blogCategory, setBlogCategory] = useState<blogCategoryResponse | undefined>(undefined);



    const config: Record<string, {}> = useMemo(
        () => ({
            readonly: false,
            placeholder: 'Start typings...',
        }),
        []
    );



    const methods = useForm<blogPost>();

    const { postData } = usePost<blogPost>(`${url}/api/posts`);

    const mutation = useMutation({
        mutationFn: (data: blogPost) => postData(data, {
            Authorization: `Bearer ${token}`,
        }),
        onSuccess: () => {
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

    const { isLoading } = useQuery({
        queryFn: fetchBlogCategories,
        queryKey: ["blog_categories"],
        refetchOnWindowFocus: false,
        refetchOnMount: false,
    })

    const { deleteData } = useDelete(`${url}/api/posts`);

    const mutate = useMutation({
        mutationFn: (id: number) => deleteData(id, {
            Authorization: `Bearer ${token}`,
        }),
        onSuccess: () => {
            toast.success("Blog deleted successfully");
            fetchBlogCategories();
        },
        onError: () => {
            toast.error("Failed to delete Blog");
        }
    });

    const handleDelete = async (id: number) => {
        try {
            mutate.mutate(id);
        } catch (error) {
            if (error instanceof Error) {
                toast.error(`Error deleting Blog: ${error.message}`);
            } else {
                toast.error("Unknown error occurred while deleting Blog.");
            }
        }
    };

    const handleEditBlogPost = (rowData: editBlogResponse) => {
       
        setIsOpen(true)
        setEditData({
            title: rowData.title,
            mini_title: rowData.mini_title,
            tags: rowData.tags,
            content: rowData.content,
            image: rowData.image as File,
            blog_category_id: rowData.blog_category_id,
        })
    }

    function stripHtmlTags(content: string): string {
        return content.replace(/<\/?[^>]+(>|$)/g, "");
      }
      

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
                                    modalContainer: "max-w-3xl w-full mx-auto bg-white rounded-md p-5 min-h-fit top-10"
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
                                                defaultValue={editData?.title as string}
                                            />
                                            <Input
                                                type="text"
                                                {...methods.register("mini_title")}

                                                placeholder="Semi Title"
                                                className={{
                                                    input: "w-full focus:outline-none border-[1px] border-backend-primary-text-color p-2 rounded-md",
                                                    label: "text-backend-primary-text-color"
                                                }}
                                                defaultValue={editData?.mini_title as string}
                                            />

                                            <Input
                                                type="text"
                                                {...methods.register("tags")}

                                                placeholder="Tags"
                                                className={{
                                                    input: "w-full focus:outline-none border-[1px] border-backend-primary-text-color p-2 rounded-md",
                                                    label: "text-backend-primary-text-color"
                                                }}
                                                defaultValue={editData?.tags as string}
                                            />

                                            <Input
                                                type="file"
                                                accept="image/*"
                                                name="image"
                                                placeholder="Image Filed"
                                                className={{
                                                    input: "w-full focus:outline-none border-[1px] border-backend-primary-text-color p-2 rounded-md",
                                                    label: "text-backend-primary-text-color"
                                                }}

                                                onChange={(e) => {
                                                    const file = e.target.files?.[0]

                                                    if (file) {
                                                        methods.setValue("image", file, {
                                                            shouldValidate: true
                                                        })
                                                    }
                                                }}

                                            />
                                            {editData?.image && typeof editData.image === "string" && (
                                                <img
                                                    src={`${url}/storage/${editData.image}`}
                                                    alt="Blog Image"
                                                    width={100}
                                                    height={100}
                                                    style={{ objectFit: "cover", borderRadius: "8px" }}
                                                />
                                            )}



                                            <Controller

                                                control={methods.control}
                                                name="content"
                                                defaultValue={editData?.content as string}
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

                                            <select defaultValue={editData?.blog_category_id as string} className="text-backend-primary-text-color text-lg font-medium focus:outline-none border-[1px] border-backend-primary-text-color p-2 rounded-md" {...methods.register("blog_category_id")}>
                                                <option>Select Blog Category</option>
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
                                    height={600}
                                >
                                    <Column minWidth={120} width={100} flexGrow={1}>
                                        <HeaderCell align="center" className="text-backend-primary-text-color">ID</HeaderCell>
                                        <Cell dataKey="id" align="center" />
                                    </Column>
                                    <Column minWidth={120} width={100} flexGrow={1}>
                                        <HeaderCell align="center" className="text-backend-primary-text-color">Title</HeaderCell>
                                        <Cell dataKey="title" align="center" />
                                    </Column>

                                    <Column minWidth={120} width={100} flexGrow={1}>
                                        <HeaderCell align="center" className="text-backend-primary-text-color">Tags</HeaderCell>
                                        <Cell dataKey="tags" align="center" />
                                    </Column>

                                    <Column minWidth={250} width={300} align="center">
                                        <HeaderCell align="center" className="text-backend-primary-text-color">Content</HeaderCell>
                                        <Cell dataKey="content" align="center">
                                        {rowData => stripHtmlTags(rowData.content)}
                                        </Cell>    
                                    </Column>

                                    <Column minWidth={150} width={200} align="center">
                                        <HeaderCell align="center" className="text-backend-primary-text-color">Blog Category</HeaderCell>
                                        <Cell dataKey="blog_category.name" align="center" />
                                    </Column>

                                    <Column minWidth={120} width={100} flexGrow={1} align="center">
                                        <HeaderCell align="center" className="text-backend-primary-text-color">Edit</HeaderCell>
                                        <Cell className="cursor-pointer">
                                            {
                                                ((rowData) => (
                                                    <BiEditAlt className="cursor-pointer text-lg text-blue-700" key={rowData.id}
                                                        onClick={() => {
                                                            handleEditBlogPost(rowData as editBlogResponse)
                                                        }}
                                                    />
                                                ))
                                            }
                                        </Cell>

                                    </Column>
                                    <Column minWidth={120} width={100} flexGrow={1} align="center">
                                        <HeaderCell align="center" className="text-backend-primary-text-color">Delete</HeaderCell>
                                        <Cell className="cursor-pointer">
                                            {
                                                ((rowData) => (
                                                    <BiTrash className="cursor-pointer text-lg text-red-700" key={rowData.id}
                                                        onClick={() => {
                                                            handleDelete(rowData.id)
                                                        }}
                                                    />
                                                ))
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