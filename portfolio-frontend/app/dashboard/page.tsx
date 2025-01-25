"use client"
import { useQuery } from "@tanstack/react-query";
import Icon from "components/Icon";
import Title from "components/Title";
import useGet from "hooks/api/useGet";
import AuthenticateNavLink from "layout/authenticatelayout/AuthenticateNavLink";
import AuthenticateSidebar from "layout/authenticatelayout/AuthenticateSidebar";
import { useState } from "react";
import { Cell, Column, HeaderCell, Table } from "rsuite-table";
import { toast } from "sonner";


type usersResponse = {
  users: number | undefined
  auth_user: {
    id: number,
    name: string,
  }
}

type search = {
  name: string
}


export default function Dashboard() {

  const url = process.env.NEXT_PUBLIC_API_URL;

  const { getData } = useGet<usersResponse | undefined>(`${url}/api/dashboard`);
  const [users, setUsers] = useState<usersResponse | undefined>(undefined);


  const fetchUsers = async (): Promise<usersResponse | undefined> => {
    const response = await getData();
    setUsers(response);
    toast.success("Successfully fetched users");
    return response;
  }

  // refetching on windows focus will not rerender the data on the page

  const { isLoading, error } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
    refetchOnWindowFocus: false,
    staleTime: 30000
  });


  if (isLoading) return <div>Loading...</div>;
  if (error instanceof Error) return <div>Error: {error.message}</div>;


  return (
    <>
      <AuthenticateSidebar />
      <AuthenticateNavLink title={`Hello ${users?.auth_user?.name} !`} className={{ title: "text-lg font-semibold capitalize" }} >
        <div className="dashboardContainer min-h-full  w-full bg-bg-dashboard h-screen lg:p-10 ">
          <div className="dashboardBox ml-64 mr-0 ">

            <div className="row bg-white rounded-md p-5 grid grid-cols-3  gap-x-4 gap-y-2 ">
              <div className="users flex gap-x-6 border-r-[1px]">

                <Icon iconName="users" className="w-auto h-full" />

                <div className="totalUsers w-full">
                  <h6 className="text-backend-primary-color text-lg font-medium">Total Users</h6>
                  <p className="text-black font-bold text-lg">{users?.users}</p>
                </div>
              </div>

              <div className="second flex gap-x-6 border-r-[1px]">
                <Icon iconName="blog" className="w-auto h-full" />

                <div className="totalUsers w-full">
                  <h6 className="text-backend-primary-color text-lg font-medium">Total Blogs</h6>
                  <p className="text-black font-bold text-lg">10</p>
                </div>
              </div>
              <div className="active flex gap-x-6">
                <Icon iconName="users" className="w-auto h-full" />

                <div className="totalUsers w-full">
                  <h6 className="text-backend-primary-color text-lg font-medium">Total Projects</h6>
                  <p className="text-black font-bold text-lg">10</p>
                </div>
              </div>
            </div>

            <div className="allUsers my-8 rounded-md p-5 bg-white">
              <div className="usersRow flex justify-between items-center">
                <div className="title">
                  <Title title="All Users" className="text-lg font-semibold capitalize" />
                </div>
                <div className="search">
                  <input type="text" placeholder="Search" className="w-full p-1 rounded-md bg-transparent border-[1px] focus:outline-none text-black font-medium" />
                </div>
              </div>

              <div className="tableRow my-2">
                <Table

                  loading={isLoading}
                  loadAnimation={true}
                  cellBordered
                  bordered
                  height={500}
                >
                  <Column minWidth={120} width={100} flexGrow={1}>
                    <HeaderCell align="center" className="text-backend-primary-text-color">ID</HeaderCell>
                    <Cell>1</Cell>
                  </Column>
                  <Column minWidth={120} width={100} flexGrow={1} >
                    <HeaderCell align="center" className="text-backend-primary-text-color">Name</HeaderCell>
                    <Cell>1</Cell>
                  </Column>
                  <Column minWidth={120} width={100} flexGrow={1} >
                    <HeaderCell align="center" className="text-backend-primary-text-color">Email</HeaderCell>
                    <Cell>1</Cell>
                  </Column>

                </Table>
              </div>
            </div>
          </div>
        </div>
      </AuthenticateNavLink>
    </>
  )
}