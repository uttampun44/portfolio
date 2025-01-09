"use client"
import { useQuery } from "@tanstack/react-query";
import useGet from "hooks/api/useGet";
import AuthenticateNavLink from "layout/authenticatelayout/AuthenticateNavLink";
import AuthenticateSidebar from "layout/authenticatelayout/AuthenticateSidebar";


interface users {
  id: number,
  name: string,
  email: string,
}

interface dashboardResponse {
  users: users[]
}

export default function Dashboard() {

  const url = process.env.NEXT_PUBLIC_API_URL;

  const { getData } = useGet<dashboardResponse>(`${url}/api/dashboard`);

  const fetchUsers = async (): Promise<users[] | undefined> => {
    const response = await getData();
    return response?.users;
  }

// refetching on windows focus will not rerender the data on the page

  const { isLoading, error } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
    refetchOnWindowFocus: false,
  });


  if (isLoading) return <div>Loading...</div>;
  if (error instanceof Error) return <div>Error: {error.message}</div>;



  return (
    <>
      <AuthenticateSidebar />
      <AuthenticateNavLink >
        <div className="dashboardContainer min-h-full  w-full bg-bg-dashboard h-screen lg:p-10 ">
          <div className="dashboardBox ml-64 mr-0 ">

            <div className="row bg-white rounded-md p-5 ">
              <div className="first">
                total
              </div>
              <div className="second">
                customers
              </div>
              <div className="active">
                active
              </div>
            </div>
          </div>
        </div>
      </AuthenticateNavLink>
    </>
  )
}