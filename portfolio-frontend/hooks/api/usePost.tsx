import axios from "axios";
import { useCallback} from "react";
import { toast } from "sonner";
import Cookies from "js-cookie";


interface postData<T> {
    data: T,
    status: number,
    token:string
}

export default function usePost<Type>(apiUrl:string){
    
   const postData = useCallback(async (payload: unknown): Promise<postData<Type> | undefined> =>{
        try {

         const token = Cookies.get("token");

           
             const response = await axios.post<postData<Type>>(apiUrl, payload,{
               headers:{
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`
               }
             })

             if(response.status === 200){
                toast.success("Data Post Successfully");
                return response.data
             }
        } catch (error) {
            if (error instanceof Error) {
               toast.error("Error Occured While Posting Data");
              } else {
                toast.error("Unknown Error Occured While Posting Data");
              }
        }
   }, [apiUrl])

   return { postData }
}   