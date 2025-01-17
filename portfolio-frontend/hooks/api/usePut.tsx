import axios from "axios";
import { useCallback} from "react";

export default function usePut<T>(apiUrl:string){
   
    const putData = useCallback( async (): Promise<T | undefined> =>{
        try {
             const response = await axios.put<T>(apiUrl);
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
      }, []) 

      return { putData }    
}