import axios from "axios";
import { useEffect } from "react";
import { toast } from "sonner";


export default function useGet<Type>(apiUrl:string){
    
    const getData = async (): Promise<Type | undefined> =>{
        try {
             const response = await axios.get<Type>(apiUrl);
              if(response.status === 200){

                toast.success("Data Fetched Successfully");
                return response.data
              }
        } catch (error: unknown) {
            if (error instanceof Error) {
                toast.error("Error Occured While Fetching Data");
              } else {
                toast.error("Unknown Error Occured While Fetching Data");
              }
        }
      }

      useEffect(() =>{
        getData()   
      }, [apiUrl])
      
      return { getData }
}   