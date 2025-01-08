import axios from "axios";
import { useEffect } from "react";

export default function useDelete<T>(apiUrl:string){
    
     const deleteData = async () =>{
        try {
            const response = await axios.delete<T>(apiUrl);

            if(response.status === 200){
                return response.data
            }
        
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error('Error fetching data:', error.message);
              } else {
                console.error('Unknown error occurred while fetching data.');
              }
        }
     }
   useEffect(() =>{
       deleteData()
    }, [apiUrl])
    return { deleteData }
}   