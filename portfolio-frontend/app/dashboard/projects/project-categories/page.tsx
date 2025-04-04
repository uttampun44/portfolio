"use client"

import { useMutation, useQuery } from "@tanstack/react-query";
import Title from "components/Title";
import useDelete from "hooks/api/useDelete";
import useGet from "hooks/api/useGet";
import Cookies from "js-cookie";
import AuthenticateNavLink from "layout/authenticatelayout/AuthenticateNavLink";
import AuthenticateSidebar from "layout/authenticatelayout/AuthenticateSidebar";
import { useState } from "react";
import { BiEditAlt, BiTrash} from "react-icons/bi";
import { Cell, Column, HeaderCell, Table } from "rsuite-table";
import { toast } from "sonner";



type project_categories = {
    id: number,
    name: string,
}
interface projectCategoryResponse {
    project_categories: project_categories[]
}

export default function ProjectCategory() {

    const token = Cookies.get("token");
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
    })

    const { deleteData } = useDelete(`${url}/api/project-categories`);

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
                                        <BiEditAlt className="cursor-pointer text-lg text-blue-600" key={rowData.id} />
                                    )
                                }}
                            </Cell>
                        </Column>

                        <Column minWidth={120} width={100} flexGrow={1} align="center"> 
                            <HeaderCell align="center" className="text-backend-primary-text-color">Delete</HeaderCell>
                            <Cell>
                                {(rowData: project_categories) => {
                                    return (
                                        <BiTrash className="cursor-pointer text-lg text-red-700" key={rowData.id} 
                                         onClick={() => 
                                            handleDelete(rowData.id)
                                         }
                                        />
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