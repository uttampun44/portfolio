    "use client"
   
import { useSelector } from "react-redux"

export default function Dashboard(){

   const token = useSelector((state:any) => state.auth.token)

   console.log(token);
    return(
        <>
        dasdsa
        </>
    )
}