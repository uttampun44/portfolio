     "use client"

import { useMutation, useQuery } from "@tanstack/react-query";
import useDelete from "hooks/api/useDelete";
import useGet from "hooks/api/useGet";
import Cookies from "js-cookie";
import AuthenticateNavLink from "layout/authenticatelayout/AuthenticateNavLink";
import AuthenticateSidebar from "layout/authenticatelayout/AuthenticateSidebar";
import { useState } from "react";
import { BiTrash } from "react-icons/bi";
import { Cell, Column, HeaderCell, Table } from "rsuite-table";
import { toast } from "sonner";

type contactMeResponse = {
    contact_name:string,
    street:string,
    city:string,
    postal_code:string,
    phone_number:string,
    email:string,
    message:string
}[]

export default function Contactme() {

    const url = process.env.NEXT_PUBLIC_API_URL;

    const { getData } = useGet<contactMeResponse | undefined>(`${url}/api/contact-me`);
    const [message, setMessage] = useState<contactMeResponse | undefined>([]);


    const fetchUsers = async (): Promise<contactMeResponse | undefined> => {
        const response = await getData();
     
        setMessage(response);
        toast.success("Successfully fetched message");
        return response;
    }

    // refetching on windows focus will not rerender the data on the page

    const { isLoading, error } = useQuery({
        queryKey: ["message"],
        queryFn: fetchUsers,
        refetchOnWindowFocus: false,
        staleTime: 30000
    });

    const { deleteData } = useDelete(`${url}/api/contact-me`);

    const token = Cookies.get("token");

    const deleteMutation = useMutation({
        mutationFn: (id: number) => deleteData(id, {
            Authorization: `Bearer ${token}`,
        }),
        onSuccess: () => {
            toast.success("Message deleted successfully");
        },
        onError: () => {
            toast.error("Failed to delete message");
        }
    });

  

    const handleDelete = async (id: number) => {
        try {
            deleteMutation.mutate(id);
        } catch (error) {
            if (error instanceof Error) {
                toast.error(`Error deleting message: ${error.message}`);
            } else {
                toast.error('Unknown error occurred while deleting message.');
            }
        }
    };


    if (isLoading) return <div>Loading...</div>;
    if (error instanceof Error) return <div>Error: {error.message}</div>;
    return (
       <AuthenticateNavLink>
           <AuthenticateSidebar />
           <div className="tableRow my-2 ml-56 pl-14 p-5 text-center">
                <Table

                  data={message}
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
                    <HeaderCell align="center" className="text-backend-primary-text-color">Name</HeaderCell>
                    <Cell dataKey="contact_name" />
                  </Column>
                  <Column minWidth={120} width={100} flexGrow={1} >
                    <HeaderCell align="center" className="text-backend-primary-text-color">Email</HeaderCell>
                    <Cell dataKey="email" />
                  </Column>
                  <Column minWidth={120} width={100} flexGrow={1} >
                    <HeaderCell align="center" className="text-backend-primary-text-color">Phone Number</HeaderCell>
                    <Cell dataKey="phone_number" />
                  </Column>
                  <Column minWidth={120} width={100} flexGrow={1} >
                    <HeaderCell align="center" className="text-backend-primary-text-color">Street</HeaderCell>
                    <Cell dataKey="street" />
                  </Column>
                  <Column minWidth={120} width={100} flexGrow={1} >
                    <HeaderCell align="center" className="text-backend-primary-text-color">City</HeaderCell>
                    <Cell dataKey="city" />
                  </Column>
                  <Column minWidth={120} width={100} flexGrow={1} >
                    <HeaderCell align="center" className="text-backend-primary-text-color">Postal Code</HeaderCell>
                    <Cell dataKey="postal_code" />
                  </Column>
                  <Column minWidth={120} width={100} flexGrow={1} >
                    <HeaderCell align="center" className="text-backend-primary-text-color">Message</HeaderCell>
                    <Cell dataKey="message" />
                  </Column>

                
                  <Column minWidth={120} width={100} flexGrow={1} >
                    <HeaderCell align="center" className="text-backend-primary-text-color">Delete</HeaderCell>
                    <Cell>
                      {(rowData) => (
                        <BiTrash className="cursor-pointer text-lg text-red-700 text-center" key={rowData.id} 
                          onClick={() => {
                            handleDelete(rowData.id)
                          }}
                        />
                      )}
                    </Cell>
                  </Column>

                </Table>
              </div>
       </AuthenticateNavLink>
    )
}