import axios from "axios";
import Cookies from "js-cookie";
import { useCallback} from "react";


export default function useGet<Type>(apiUrl:string){
    
    const getData = useCallback(  async (): Promise<Type | undefined> =>{
        try {

            const token = Cookies.get("token");

            //  get token from cookie if the token is not exists then return

            console.log(token)
            if(!token) return;

             const response = await axios.get<Type>(apiUrl, {
                 headers: {
                     Authorization: `Bearer ${token}`,
                     "Content-Type": "application/json",
                     ...(token ? { Authorization: `Bearer ${token}` } : {}), 
                 },
             });

            // const reponse = await getData(url)
            // setResponse(response) will fetch the data from api
              if(response.status === 200){
                return response.data
              }
        } catch (error: unknown) {
            if (error instanceof Error) {
               console.log(error.message);
              } else {
               console.log(error);
              }
        }
      }, [])

     
      
      return { getData }
}   