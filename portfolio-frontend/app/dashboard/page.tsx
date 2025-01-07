   "use client"
import { useQuery } from "@tanstack/react-query";
import Button from "components/Button";
import useApi from "hooks/useApi";
import AuthenticateSidebar from "layout/authenticatelayout/AuthenticateSidebar";
import { redirect } from "next/navigation";
import { GiHamburgerMenu } from "react-icons/gi";



interface users{
    id:number,
    name:string,
    email:string,
}

export default  function Dashboard(){

    const url = process.env.NEXT_PUBLIC_API_URL;    
     
    const {getData} = useApi<{users: []}>(`${url}/api/dashboard`);
    const {postData} = useApi(`${url}/api/logout`);

    const fetchUsers = async(): Promise<users[]> => {
      
      const response = await getData(); 
      
      return response?.users;
    }

    const handleLogout = async() => {
       const response = await postData({});

       if(response?.status === 200){
        document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
         redirect("/login");
       }
      
    }

  const {isLoading,  error} = useQuery({
    queryKey: ["users"],   
    queryFn: fetchUsers
  });


  if (isLoading) return <div>Loading...</div>;
  if (error instanceof Error) return <div>Error: {error.message}</div>;

   

    return(
        <>
          <AuthenticateSidebar />
            <div className="dashboardContainer absolute  w-full h-full bg-bg-dashboard lg:py-10">
                 <div className="navlink flex justify-center">
                      <GiHamburgerMenu className="w-6 h-6"  /> <Button onClick={handleLogout} >Logout</Button>
                 </div>
            </div>
         
        </>
    )
}