"use client"

import { useQuery } from "@tanstack/react-query";
import Title from "components/Title";
import useGet from "hooks/api/useGet";
import AuthenticateNavLink from "layout/authenticatelayout/AuthenticateNavLink";
import AuthenticateSidebar from "layout/authenticatelayout/AuthenticateSidebar";
import { useState } from "react";
import { BiEditAlt } from "react-icons/bi";
import { Cell, Column, HeaderCell, Table } from "rsuite-table";



type project_categories = {
    id: number,
    name: string,
}
interface projectCategoryResponse {
    project_categories: project_categories[]
}

export default function ProjectCategory() {

    const url = process.env.NEXT_PUBLIC_API_URL;
    const { getData } = useGet<projectCategoryResponse | undefined>(`${url}/api/project-categories`);

    const [projectCategory, setProjectCategory] = useState<projectCategoryResponse | undefined>(undefined);

    const fetchUsers = async (): Promise<projectCategoryResponse | undefined> => {
        const response = await getData();
        setProjectCategory(response);
        return response;
    }

    const { isLoading, error } = useQuery({
        queryKey: ["project_categories"],
        queryFn: fetchUsers,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        staleTime: 30000
    })

    if (error instanceof Error) return <div>Error: {error.message}</div>;

    return (
        <AuthenticateNavLink>
            <AuthenticateSidebar />
            <div className="projectCategoriesContainer min-h-full  w-full bg-bg-dashboard h-screen lg:p-10 ">
                <div className="blogBox ml-64 mr-0 bg-white rounded-md p-5">
                    <Title title="All Project Categories" className="text-lg font-bold my-5" />

                    <Table
                        loading={isLoading}
                        data={projectCategory?.project_categories}
                     
                        loadAnimation={true}
                        cellBordered
                        bordered
                    >
                        <Column minWidth={120} width={100} flexGrow={1}>
                            <HeaderCell align="center" className="text-backend-primary-text-color">ID</HeaderCell>
                            <Cell dataKey="id" align="center" />
                        </Column>
                        <Column minWidth={120} width={100} flexGrow={1}>
                            <HeaderCell align="center" className="text-backend-primary-text-color">Name</HeaderCell>
                            <Cell dataKey="name" align="center" />
                        </Column>
                        <Column minWidth={120} width={100} flexGrow={1} align="center">
                            <HeaderCell align="center" className="text-backend-primary-text-color">Edit</HeaderCell>
                            <Cell>
                                {(rowData: project_categories) => {
                                    return (
                                        <BiEditAlt className="cursor-pointer text-lg" key={rowData.id} />
                                    )
                                }}
                            </Cell>
                        </Column>
                    </Table>
                </div>
            </div>
        </AuthenticateNavLink>
    )
}