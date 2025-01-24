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
import { QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import usePost from "hooks/api/usePost";
import { toast } from "sonner";
import { BiEditAlt, BiTrash } from "react-icons/bi";
import useDelete from "hooks/api/useDelete";
import usePut from "hooks/api/usePut";
import Card from "components/Card";


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
    image: File,
    blog_category_id: string,
}

type blogCategoryResponse = {
    posts: postResponse[],
    blog_categories: blogCategories[]
}

type editBlogPost = {
    title: string,
    mini_title: string,
    tags: string,
    content: string,
    image: File,
    blog_category_id: string,
}


export default function Blogs() {

    const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });

    const url = process.env.NEXT_PUBLIC_API_URL;

    const token = Cookies.get("token");
    const { isOpen, setIsOpen, } = useToggle();


    const [editData, setEditData] = useState<editBlogPost | undefined>(undefined);
    const [isEditingMode, setEditingMode] = useState(false);
    const [postsId, setPostsId] = useState<number>()

    console.log(postsId)

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
    const { putData } = usePut<blogPost>(`${url}/api/posts`)

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

    const queryClient = useQueryClient()

    const mutationPut = useMutation({
        mutationFn: (data: blogPost) => putData(postsId as number, data,
            {
                Authorization: `Bearer ${token}`,

            }),
        onSuccess: (data) => {
            queryClient.setQueryData(['todo', { id: postsId }], data)
            toast.success("Blog Updated");
        },
        onError: () => {
            toast.error("Blog Update Failed");
        }
    })

    const handleClick = () => {
        setIsOpen(true);
    };

    const onSubmit: SubmitHandler<blogPost> = async (data) => {
        console.log(data)
        try {
            if (isEditingMode && postsId) {
                mutationPut.mutate(data)
            } else {
                mutation.mutate(data);
            }
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

    const handleEditBlogPost = (post: editBlogPost) => {
        setEditingMode(true)
        setIsOpen(true)
        setEditData({
            title: post.title || "",
            mini_title: post.mini_title || "",
            tags: post.tags || "",
            content: post.content || "",
            image: post.image  as File,
            blog_category_id: post.blog_category_id || "",
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
                                                defaultValue={editData?.title as string || ""}
                                            />
                                            <Input
                                                type="text"
                                                {...methods.register("mini_title")}

                                                placeholder="Semi Title"
                                                className={{
                                                    input: "w-full focus:outline-none border-[1px] border-backend-primary-text-color p-2 rounded-md",
                                                    label: "text-backend-primary-text-color"
                                                }}
                                                defaultValue={editData?.mini_title as string || ""}
                                            />

                                            <Input
                                                type="text"
                                                {...methods.register("tags")}

                                                placeholder="Tags"
                                                className={{
                                                    input: "w-full focus:outline-none border-[1px] border-backend-primary-text-color p-2 rounded-md",
                                                    label: "text-backend-primary-text-color"
                                                }}
                                                defaultValue={editData?.tags as string || ""}
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
                                                defaultValue={editData?.content as string || ""}
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

                                            <select defaultValue={editData?.blog_category_id as string || ""} className="text-backend-primary-text-color text-lg font-medium focus:outline-none border-[1px] border-backend-primary-text-color p-2 rounded-md" {...methods.register("blog_category_id")}>
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
                                                <Button type="submit" className="bg-bg-backend-secondary-color text-white rounded-md">{isEditingMode ? "Update" : "Create"}</Button> <Button className="bg-primary-text-color text-white rounded-md" onClick={() => {
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

                            {
                                blogCategory?.posts.length === 0 ? (
                                    <>
                                        No blogs Yet
                                    </>
                                ) : (
                                    <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-12 gap-4">
                                    {
                                        blogCategory?.posts.map((post: postResponse) => {
                                            return (
                                                <Card className="bg-white rounded-md p-5 border-[1px] shadow-sm" key={post.id}>
    
                                                    <div className="flex flex-col">
                                                        <h1 className="text-2xl font-bold">{post.title}</h1>
                                                        <h6 className="text-lg font-medium">{post.mini_title}</h6>
                                                    </div>
                                                    <div className="flex items-center my-1">
                                                        <h6 className="text-sm font-medium">{post.tags}</h6>
                                                    </div>
                                                    <img src={`${url}/storage/${post.image}`} alt="Blog Image" className="w-full h-auto" style={{ objectFit: "cover", borderRadius: "8px" }} />
    
                                                    <div className="pargraph my-2">
                                                        <p className="text-sm">{stripHtmlTags(post.content)}</p>
                                                    </div>
    
                                                    <div className="flex my-3 gap-x-5">
                                                        <div className="edit flex gap-4" onClick={() => {
                                                            handleEditBlogPost(post as postResponse)
                                                            setPostsId(post.id)
                                                        }}>
                                                            <BiEditAlt className="cursor-pointer text-lg text-blue-700" key={post.id}/> 
                                                            edit
                                                        </div>
    
                                                        <div className="delete flex gap-4" onClick={() => {
                                                            handleDelete(post.id)
                                                        }}>
                                                            <BiTrash className="cursor-pointer text-lg text-red-700" key={post.id}
                                                               
                                                            />Delete
                                                        </div>
                                                    </div>
                                                </Card>
                                            )
                                        })
                                    }
                                </div>
                                )
                            }
                           
                        </div>
                    </div>
                </AuthenticateNavLink>
            )
        }
    </div>;
}