"use client"

import { useMutation, useQuery } from "@tanstack/react-query";
import Button from "components/Button";
import Input from "components/Input";
import Label from "components/Label";
import Modal from "components/Modal";
import Overlary from "components/Overlary";
import Title from "components/Title";
import useGet from "hooks/api/useGet";
import usePost from "hooks/api/usePost";
import useToggle from "hooks/useToggle";
import Cookies from "js-cookie";
import AuthenticateNavLink from "layout/authenticatelayout/AuthenticateNavLink";
import AuthenticateSidebar from "layout/authenticatelayout/AuthenticateSidebar";
import React, { useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { Cell, Column, HeaderCell, Table } from "rsuite-table";
import { toast } from "sonner";


type blogCategoryForm = {
    name: string,
}
type blogs = {
    id: number,
    name: string,
}
type blogCategoryResponse = {
    blogs: blogs[]
}
export default function () {

    const token = Cookies.get("token")
    const { isOpen, setIsOpen } = useToggle();
    const [blogCategory, setBlogCategory] = useState<blogCategoryResponse | null>(null);


    console.log(blogCategory?.blogs)
    const url = process.env.NEXT_PUBLIC_API_URL;
    const methods = useForm<blogCategoryForm>({
        defaultValues: {
            name: ""
        }
    })

    const { postData } = usePost<blogCategoryForm>(`${url}/api/blog-categories`)

    const { getData } = useGet<blogCategoryResponse | undefined>(`${url}/api/blog-categories`)


    const mutate = useMutation({
        mutationFn: (data: blogCategoryForm) => postData(data, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            }
        }),
        onSuccess: (response) => {
            if (!response) return
            toast.success("Blog Category Post successfully")
            setIsOpen(false)
            methods.reset()
        },
        onError: () => {
            toast.error("Failed to Post")
        }
    })

    const fetchBlogCategory = async (): Promise<blogCategoryResponse | undefined> => {
        const response = await getData();
        if (!response?.blogs) return
        setBlogCategory(response);
        toast.success("Blog Category Successfully Fetched !")
        return response;
    }

    const { isLoading } = useQuery({
        queryFn: fetchBlogCategory,
        queryKey: ["blogs"],
        refetchOnWindowFocus: false,
        refetchOnMount: false,
    })

    const onSubmit: SubmitHandler<blogCategoryForm> = async (data) => {
        try {
            mutate.mutate(data);
        } catch (error) {
            if (error instanceof Error) {
                toast.error(`Error fetching data:${error.message}`);
            } else {
                toast.error('Unknown error occurred while fetching data.');
            }
        }
    }


    return (
        <div>
            {
                token && (
                    <AuthenticateNavLink>
                        <AuthenticateSidebar />
                        {
                            isOpen && (
                                <React.Fragment>
                                    <Overlary />
                                    <Modal className={{
                                        modalContainer: "max-w-md w-full mx-auto bg-white rounded-md p-5 min-h-fit translate-y-1/2"
                                    }}>
                                        <Label name="Blog Categories" htmlFor="name" className="text-lg font-bold" />
                                        <FormProvider {...methods}>
                                            <form onSubmit={methods.handleSubmit(onSubmit)} className="flex flex-col gap-y-2 w-full mt-2">
                                                <Input
                                                    type="text"
                                                    {...methods.register("name")}
                                                    placeholder="Title"
                                                    className={{
                                                        input: "w-full focus:outline-none border-[1px] border-backend-primary-text-color p-2 rounded-md",
                                                        label: "text-backend-primary-text-color"
                                                    }}
                                                />



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
                        <div className="blogsCateogriesContainer min-h-full  w-full bg-bg-dashboard h-screen lg:p-10 ">
                            <div className="blogCateogoryBox ml-64 mr-0 bg-white rounded-md p-5">

                                <div className="row flex justify-between items-center text-backend-primary-text-color my-2">
                                    <Title title="Blog Category" /> <Button onClick={() => {
                                        setIsOpen(true)
                                    }} className="bg-bg-backend-secondary-color p-5 rounded-md text-white font-medium">Create Blog Category</Button>
                                </div>

                                <Table
                                    data={blogCategory?.blogs}
                                    loading={isLoading}
                                    cellBordered
                                    bordered
                                
                                >
                                    <Column>
                                        <HeaderCell align="center" >S.No</HeaderCell>
                                        <Cell dataKey="id" />
                                    </Column>


                                    <Column>
                                        <HeaderCell align="center" className="text-primary-text-color">Title</HeaderCell>
                                        <Cell dataKey="name" />
                                    </Column>
                                    <Column>
                                        <HeaderCell align="center" className="text-primary-text-color">Edit</HeaderCell>
                                        <Cell>

                                        </Cell>
                                    </Column>
                                    <Column>
                                        <HeaderCell align="center" className="text-primary-text-color">Delete</HeaderCell>
                                        <Cell>1</Cell>
                                    </Column>
                                </Table>

                            </div>
                        </div>
                    </AuthenticateNavLink>
                )
            }
        </div>
    )
}