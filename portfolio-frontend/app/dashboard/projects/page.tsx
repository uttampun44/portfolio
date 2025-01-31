"use client"

import { useMutation, useQuery } from "@tanstack/react-query";
import Button from "components/Button";
import Input from "components/Input";
import Label from "components/Label";
import Modal from "components/Modal";
import Overlary from "components/Overlary";
import Title from "components/Title";
import useDelete from "hooks/api/useDelete";
import useGet from "hooks/api/useGet";
import usePost from "hooks/api/usePost";
import useToggle from "hooks/useToggle";
import Cookies from "js-cookie";
import AuthenticateNavLink from "layout/authenticatelayout/AuthenticateNavLink";
import AuthenticateSidebar from "layout/authenticatelayout/AuthenticateSidebar";
import React, { useState } from "react";
import {  FormProvider, SubmitHandler, useForm} from "react-hook-form";
import { BiEditAlt, BiTrash } from "react-icons/bi";
import { Cell, Column, HeaderCell, Table } from "rsuite-table";
import { toast } from "sonner";

type projectPost = {
    name: string,
    image: File | null,
    link: string
    project_category_id: number,
}

type project_categories = {
    id: number,
    name: string,
}

type projectResponse = {
    id: number,
    name: string,
    image: string,
    link: string,
    project_category_id: number,
}
type projectCategoryResponse = {
    project_categories: project_categories[]
    projects: projectResponse[]
}



export default function Projects() {

    const [projectCategory, setProjectCategory] = useState<projectCategoryResponse | undefined>(undefined);
    const [isEditingMode, setEditingMode] = useState(false);
    const [projectId, setProjectId] = useState<number | undefined>(undefined);

    const token = Cookies.get("token");

    const { isOpen, setIsOpen, } = useToggle();

    const methods = useForm<projectPost>();

    const url = process.env.NEXT_PUBLIC_API_URL;

    const { getData } = useGet<projectCategoryResponse | undefined>(`${url}/api/projects`);

    const { postData } = usePost<projectPost>(`${url}/api/projects`);



    const mutations = useMutation({
        mutationFn: (data: projectPost) => postData(data, {
            Authorization: `Bearer ${token}`,
        }),
        onSuccess: () => {
            toast.success("Project Created");
        },
        onError: () => {
            toast.error("Project Creation Failed");
        }

    })


    // form submit 
    const onSubmit: SubmitHandler<projectPost> = async (data) => {


        try {
            mutations.mutate(data, {
                onSuccess: () => {
                    toast.success("Project Created");
                    setIsOpen(false)
                },
                onError: () => {
                    toast.error("Project Creation Failed");
                }
            });

        } catch (error) {
            if (error instanceof Error) {
                toast.error(`Error fetching data:${error.message}`);
            } else {
                toast.error('Unknown error occurred while fetching data.');
            }
        }
    }

    const fetchProjects = async (): Promise<projectCategoryResponse | undefined> => {
        const response = await getData();
        setProjectCategory(response);
        return response;
    }

    const { isLoading } = useQuery({
        queryFn: fetchProjects,
        queryKey: ["project_categories"],
        refetchOnWindowFocus: false,
        refetchOnMount: false,
    })
    const handleModal = () => {
        setIsOpen(true)
    }

    const { deleteData } = useDelete(`${url}/api/projects`);

    const deleteMutation = useMutation({
        mutationFn: (id: number) => deleteData(id, {
            Authorization: `Bearer ${token}`,
        }),
        onSuccess: () => {
            toast.success("Project Category deleted successfully");
        },
        onError: () => {
            toast.error("Failed to delete Project Category");
        }
    });

    const handleDelete = async (id: number) => {
        try {
            deleteMutation.mutate(id);
        } catch (error) {
            if (error instanceof Error) {
                toast.error(`Error deleting Project Category: ${error.message}`);
            } else {
                toast.error("Unknown error occurred while deleting Project Category.");
            }
        }
    };


    return (
        <AuthenticateNavLink>
            <AuthenticateSidebar />
            {
                isOpen && (
                    <React.Fragment>
                        <Overlary />
                        <Modal className={{
                            modalContainer: "max-w-md w-full mx-auto bg-white rounded-md p-5 min-h-fit translate-y-1/2"
                        }}>
                            <Label name="Project Name" htmlFor="name" className="text-lg font-bold" />
                            <FormProvider {...methods}>
                                <form onSubmit={methods.handleSubmit(onSubmit)} className="flex flex-col gap-y-2 w-full mt-2">
                                    <Input
                                        type="text"
                                        {...methods.register("name")}
                                        placeholder="Project Name"
                                        className={{
                                            input: "w-full focus:outline-none border-[1px] border-backend-primary-text-color p-2 rounded-md",
                                            label: "text-backend-primary-text-color"
                                        }}
                                    />

                                    <Input
                                        type="file"
                                        accept="image/*"
                                        name="image"
                                        placeholder="Project Image"
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

                                    <Input
                                        type="text"
                                        {...methods.register("link")}
                                        placeholder="Project Link"
                                        className={{
                                            input: "w-full focus:outline-none border-[1px] border-backend-primary-text-color p-2 rounded-md",
                                            label: "text-backend-primary-text-color"
                                        }}

                                    />

                                    <select {...methods.register("project_category_id")} className="text-backend-primary-text-color text-lg font-medium focus:outline-none border-[1px] border-backend-primary-text-color p-2 rounded-md">
                                        <option className="p-2">Select Project</option>
                                        {
                                            projectCategory?.project_categories.map((category: project_categories,) => {
                                                return (

                                                    <option key={category.id} value={category.id}>{category.name}</option>

                                                )
                                            })
                                        }
                                    </select>
                                    <div className="button">
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
                    <div className="projectRow flex justify-between my-2">
                        <Title title="All Projects" className="text-lg font-bold" />
                        <Button className="bg-bg-backend-secondary-color rounded-md text-white cursor-pointer" onClick={handleModal}>Create Project</Button>
                    </div>
                    <Table
                        data={projectCategory?.projects}
                        loading={isLoading}
                        loadAnimation={true}
                        cellBordered
                        bordered
                        height={500}
                    >
                        <Column minWidth={120} width={100} flexGrow={1}>
                            <HeaderCell align="center" className="text-backend-primary-text-color">ID</HeaderCell>
                            <Cell dataKey="id" align="center" />
                        </Column>
                        <Column minWidth={120} width={100} flexGrow={1}>
                            <HeaderCell align="center" className="text-backend-primary-text-color">Name</HeaderCell>
                            <Cell dataKey="name" align="center" />
                        </Column>

                        <Column minWidth={120} width={100} flexGrow={1}>
                            <HeaderCell align="center" className="text-backend-primary-text-color">Image</HeaderCell>
                            <Cell>
                                {rowData => (
                                    <img
                                        src={`${url}/storage/${rowData.image}`}
                                        alt={rowData.name}
                                        className="w-full h-full object-contain"
                                        height="400"
                                    />
                                )}
                            </Cell>
                        </Column>

                        <Column minWidth={150} width={200} align="center">
                            <HeaderCell align="center" className="text-backend-primary-text-color">Project Category</HeaderCell>
                            <Cell dataKey="project_category.name" align="center" />
                        </Column>
                        <Column minWidth={120} width={100} flexGrow={1} align="center">
                            <HeaderCell align="center" className="text-backend-primary-text-color">Edit</HeaderCell>
                            <Cell className="cursor-pointer">
                                {
                                    ((rowData) => (
                                        <BiEditAlt className="cursor-pointer text-lg text-blue-700" key={rowData.id}

                                            onClick={() => {
                                                setProjectId(rowData.id);
                                                setEditingMode(true);
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
                                                handleDelete(rowData.id);
                                            }}
                                        />
                                    ))
                                }
                            </Cell>
                        </Column>
                    </Table>
                </div>
            </div>
        </AuthenticateNavLink>
    );
}