"use client"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Button from "components/Button";
import Input from "components/Input";
import Modal from "components/Modal";
import Overlary from "components/Overlary";
import useGet from "hooks/api/useGet";
import usePost from "hooks/api/usePost";
import usePut from "hooks/api/usePut";
import useToggle from "hooks/useToggle";
import Cookies from "js-cookie";
import AuthenticateNavLink from "layout/authenticatelayout/AuthenticateNavLink";
import AuthenticateSidebar from "layout/authenticatelayout/AuthenticateSidebar";
import React, { useState } from "react";
import { FormProvider, set, useForm } from "react-hook-form";
import { BiEditAlt } from "react-icons/bi";
import { Cell, Column, HeaderCell, Table } from "rsuite-table";
import { toast } from "sonner";

type mapForm = {
    map_link: string,
}

type mapResponse = {
    id: number | string,
    map_link: string,
}[]

type editMapForm = {
    id: string,
    map_link: string,
}
export default function Map() {

    const { isOpen, setIsOpen } = useToggle();
    const [mapLinks, setMapLinks] = useState<mapResponse | undefined>(undefined);
    const [isEditingMode, setEditingMode] = useState(false);
    const [mapId, setMapId] = useState<string | number>()
    const [editData, setEditData] = useState<editMapForm | undefined>(undefined);

    const handleModal = () => {
        setIsOpen(true)
    }

    const url = process.env.NEXT_PUBLIC_API_URL;

    const formMethods = useForm<mapForm>()

    const { postData } = usePost<mapForm>(`${url}/api/map-links`);
    const { putData } = usePut<mapForm>(`${url}/api/map`);

    
    const token = Cookies.get("token");

    const mutation = useMutation({
        mutationFn: (data: mapForm) => postData(data, {
            Authorization: `Bearer ${token}`,
        }),
        onSuccess: () => {
            toast.success("Map Link Post successfully")
            setIsOpen(false)
            formMethods.reset()

        },
        onError: () => {
            toast.error("Failed to Post")
        }
    })

    const queryClient = useQueryClient()

    const mutationPut = useMutation({
        mutationFn: (data: mapForm) => putData(mapId as number, data,
            {
                Authorization: `Bearer ${token}`,

            }),
        onSuccess: (data) => {
            queryClient.setQueryData(['map', { id: mapId }], data)
            toast.success("Map Link Updated");
        },
        onError: () => {
            toast.error("Map Link Update Failed");
        }
    })      
    const handleSubmit = (data: mapForm) => {
        try {
            if (isEditingMode && mapId) {
                mutationPut.mutate(data)
                setIsOpen(false)
            } else {
                mutation.mutate(data);
                setIsOpen(false)
            }
        } catch (error) {
            if (error instanceof Error) {
                toast.error(`Error fetching data:${error.message}`);
            } else {
                toast.error('Unknown error occurred while fetching data.');
            }
        }
    }

    const { getData } = useGet<mapResponse | undefined>(`${url}/api/map`);

    const fetchMapLinks = async (): Promise<mapResponse | undefined> => {
        const response = await getData();
        setMapLinks(response);
        return response;
    }
    const { isLoading } = useQuery({
        queryFn: fetchMapLinks,
        queryKey: ["map_links"],
        refetchOnWindowFocus: false,
        refetchOnMount: false,
    })
   
    const handleEdit = (rowData: Record<string, string>) => {
    
            setMapId(rowData.id);
            setEditingMode(true)
            setIsOpen(true)
            setEditData({
                id: rowData.id,
                map_link: rowData.map_link || "",
            })
      
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
                            <FormProvider {...formMethods}>
                                <form onSubmit={formMethods.handleSubmit(handleSubmit)} className="flex flex-col gap-y-2 w-full mt-2">
                                    <Input
                                        type="text"
                                        {...formMethods.register("map_link")}
                                        placeholder="Map Link"
                                        className={{
                                            input: "w-full focus:outline-none border-[1px] border-backend-primary-text-color p-2 rounded-md",
                                            label: "text-backend-primary-text-color"
                                        }}
                                        defaultValue={editData?.map_link as string || ""}
                                    />
                                    <div className="button my-2">
                                        <Button type="submit" className="bg-bg-backend-secondary-color text-white rounded-md">Submit</Button> <Button className="bg-primary-text-color text-white rounded-md"
                                            onClick={() => {
                                                setIsOpen(false);
                                            }}>Cancel</Button>
                                    </div>
                                </form>
                            </FormProvider>
                        </Modal>
                    </React.Fragment>

                )
            }
            <div className="tableRow my-2 ml-56 pl-14 p-5 text-center">

                <div className="button pl-14 p-5 flex justify-end">
                    <Button type="submit" onClick={handleModal} className="bg-bg-backend-secondary-color text-white py-1 px-2 rounded-md">Add Map Link</Button>
                </div>

                <Table
                    data={mapLinks}
                    loading={isLoading}
                    loadAnimation={true}
                    cellBordered
                    bordered
                    height={500}
                    key="id"
                >
                    <Column minWidth={120} width={100} flexGrow={1}>
                        <HeaderCell align="center" className="text-backend-primary-text-color">ID</HeaderCell>
                        <Cell dataKey="id" />
                    </Column>
                    <Column minWidth={120} width={100} flexGrow={1} >
                        <HeaderCell align="center" className="text-backend-primary-text-color">Map Link</HeaderCell>
                        <Cell dataKey="map_link" />

                    </Column>
                    <Column minWidth={120} width={100} flexGrow={1} >
                        <HeaderCell align="center" className="text-backend-primary-text-color">Edit</HeaderCell>
                        <Cell>
                            {
                                (rowData) => (
                                    <BiEditAlt className="cursor-pointer text-lg text-blue-700" key={rowData.id}
                                        onClick={() => {
                                            handleEdit(rowData)
                                        }}
                                    />
                                )
                            }
                        </Cell>
                    </Column>
                </Table>
            </div>

        </AuthenticateNavLink>
    )
}