import axios from "axios";
import { useEffect, useState } from "react"

export default function useApi(apiUrl:string){
     const [fetchData, setData] = useState(null);
   
     const getData = async() =>{
        try {
             const response = await axios.get(apiUrl);
             setData(response.data);
        } catch (error:any) {
            throw new error
        }finally{

        }
     }

     const postData = async(payload:any) =>{
        try {
            const response = await axios.post(apiUrl, payload);

            return response

        } catch (error) {
            
        }finally{

        }
     }
    useEffect(() =>{
         getData()
    }, [apiUrl])
    return {fetchData, setData, getData, postData}
}