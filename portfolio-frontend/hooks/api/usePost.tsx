import axios from "axios";
import { useCallback} from "react";

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
               },
               ...customHeaders
             })

             if(response.status === 200){
          
                return response.data
             }
        } catch (error) {
            if (error instanceof Error) {
               console.log(error.message);
              } else {
                console.log(error);
              }
        }
   }, [apiUrl])

   return { postData }
}   