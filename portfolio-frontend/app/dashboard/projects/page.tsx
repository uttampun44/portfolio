"use client"

import Button from "components/Button";
import Input from "components/Input";
import Modal from "components/Modal";
import Overlary from "components/Overlary";
import Title from "components/Title";
import useToggle from "hooks/useToggle";
import AuthenticateNavLink from "layout/authenticatelayout/AuthenticateNavLink";
import AuthenticateSidebar from "layout/authenticatelayout/AuthenticateSidebar";
import React from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { Cell, Column, HeaderCell, Table } from "rsuite-table";

type projectPost = {
    name: string,
    image: string,
    link: string
    project_category_id: number,
}

export default function Projects() {

    const { isOpen, setIsOpen, toggle } = useToggle();

    const methods = useForm<projectPost>({
        defaultValues: {
            name: "",
            image: "",
            link: "",
            project_category_id: 0
        }
    });

    const onSubmit: SubmitHandler<projectPost> = async (data) => {
        console.log(data);
    }

    const handleModal = () => {
        setIsOpen(true);
    }

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
                                <Title title="Create Project" className="text-lg font-bold" />
                            <FormProvider {...methods}>
                                <form onSubmit={methods.handleSubmit(onSubmit)} className="flex flex-col gap-y-2 w-full">
                                    <Input
                                      type="text"
                                       
                                        name="name"
                                        placeholder="Project Name"
                                        className={{
                                            input: "w-full focus:outline-none border-[1px] border-backend-primary-text-color p-2 rounded-md",
                                            label: "text-backend-primary-text-color"
                                        }}
                                    />
                                    <Input
                                      type="file"
                                       
                                        name="image"
                                        placeholder="Project Image"
                                        className={{
                                            input: "w-full focus:outline-none border-[1px] border-backend-primary-text-color p-2 rounded-md",
                                            label: "text-backend-primary-text-color"
                                        }}
                                    />
                                    <Input
                                        type="text"
                                        name="link"
                                        placeholder="Project Link"
                                        className={{
                                            input: "w-full focus:outline-none border-[1px] border-backend-primary-text-color p-2 rounded-md",
                                            label: "text-backend-primary-text-color"
                                        }}

                                    />
                                    <Input
                                        type="number"
                                        label="Project Category"
                                        name="project_category_id"
                                        placeholder="Project Category"
                                        className={{
                                            input: "w-full focus:outline-none border-[1px] border-backend-primary-text-color p-2 rounded-md",
                                            label: "text-backend-primary-text-color"
                                        }}
                                    />

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

                        cellBordered
                        bordered
                    >
                        <Column minWidth={120} width={100} flexGrow={1}>
                            <HeaderCell align="center" className="text-backend-primary-text-color">ID</HeaderCell>
                            <Cell dataKey="id" align="center" />
                        </Column>
                        <Column minWidth={120} width={100} flexGrow={1}>
                            <HeaderCell align="center" className="text-backend-primary-text-color">Image</HeaderCell>
                            <Cell dataKey="name" align="center" />
                        </Column>
                        <Column minWidth={120} width={100} flexGrow={1} align="center">
                            <HeaderCell align="center" className="text-backend-primary-text-color">Project Category</HeaderCell>
                            <Cell>

                            </Cell>
                        </Column>
                        <Column minWidth={120} width={100} flexGrow={1} align="center">
                            <HeaderCell align="center" className="text-backend-primary-text-color">Edit</HeaderCell>
                            <Cell>

                            </Cell>
                        </Column>
                        <Column minWidth={120} width={100} flexGrow={1} align="center">
                            <HeaderCell align="center" className="text-backend-primary-text-color">Delete</HeaderCell>
                            <Cell>

                            </Cell>
                        </Column>
                    </Table>
                </div>
            </div>
        </AuthenticateNavLink>
    );
}