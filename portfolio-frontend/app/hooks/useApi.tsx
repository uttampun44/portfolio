import axios from "axios";
import { useEffect, useState } from "react"


interface ApiResponse<T> {
    data: T
}
export default function useApi<T>(apiUrl:string){
     const [fetchData, setData] = useState<T|null>(null);
   
     const getData = async() =>{
        try {
             const response = await axios.get<ApiResponse<T>>(apiUrl);
             setData(response.data.data);
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error('Error fetching data:', error.message);
              } else {
                console.error('Unknown error occurred while fetching data.');
              }
        }
     }
    
     const postData = async (payload: T): Promise<any> =>{
        try {
            const response = await axios.post(apiUrl, payload);

            return response

        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error('Error fetching data:', error.message);
              } else {
                console.error('Unknown error occurred while fetching data.');
              }
        }
     }
    
     useEffect(() =>{
         getData()
    }, [apiUrl])
    
    return {fetchData, setData, getData, postData}
}