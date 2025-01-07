   "use client"
import { useQuery } from "@tanstack/react-query";


export default  function Dashboard(){

    const url = process.env.NEXT_PUBLIC_API_URL;    
     
    const fetchUsers = async() =>{
        const response = await fetch(`${url}/api/dashboard`);
        const data = await response.json();

        return data.users;
    }

  const {isLoading, data, error} = useQuery({
    queryKey: ["users"],   
    queryFn: fetchUsers
  });

  console.log(data)

  if (isLoading) return <div>Loading...</div>;
  if (error instanceof Error) return <div>Error: {error.message}</div>;

   

    return(
        <>
           <h1>Dashboard</h1>
        </>
    )
}