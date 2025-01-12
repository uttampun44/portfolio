import axios from "axios";
import { useCallback} from "react";
import { toast } from "sonner";

type methodType = "POST" | "PUT";

interface postData<T> {
    data: T,
    status: number,
    token:string,
    method?: methodType
    headers?: Record<string, string>
   
}

export default function usePost<Type>(apiUrl:string){
    
   const postData = useCallback(async (payload: unknown, customHeaders:Record<string, string> = {}): Promise<postData<Type> | undefined> =>{
        try {

      
             const response = await axios.post<postData<Type>>(apiUrl, payload,{
               
               // headers it will take atomatically post data as bearer token
               headers:{
                  "Content-Type": "application/json",
                  ...customHeaders
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