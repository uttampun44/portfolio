import axios from "axios";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { toast } from "sonner";


export default function useGet<Type>(apiUrl:string){
    
    const getData = async (): Promise<Type | undefined> =>{
        try {

            const token = Cookies.get("token");

            //  get token from cookie if the token is not exists then return

            if(!token) return;

             const response = await axios.get<Type>(apiUrl, {
                 headers: {
                     Authorization: `Bearer ${token}`,
                     "Content-Type": "application/json",
                     ...(token ? { Authorization: `Bearer ${token}` } : {}), 
                 },
             });
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