import axios from "axios";
import { useCallback} from "react";

export default function usePut<T>(apiUrl:string){
   
    const putData =  async(id: number, data: T, headers?: Record<string, string>) => {
        try {
             const response = await axios.put<T>(`${apiUrl}/${id}`, data, {
               headers:{
                 "Accept": "application/json",
                 ...headers
               }
             });
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

      return { putData }    
}