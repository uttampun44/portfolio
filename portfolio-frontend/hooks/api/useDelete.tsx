import axios from "axios";
import { useCallback } from "react";

export default function useDelete<T>(baseUrl: string) {

     
    // custom hooks delete and headers
    const deleteData = useCallback(async (id: number, headers?: Record<string, string>) => {
            try {
                const response = await axios.delete<T>(`${baseUrl}/${id}`, {
                    headers,
                });

                if (response.status === 200) {
                    return response.data;
                } else {
                    throw new Error(`Failed to delete resource. Status: ${response.status}`);
                }
            } catch (error: unknown) {
                if (error instanceof Error) {
                    console.error('Error deleting data:', error.message);
                    throw new Error(error.message); 
                } else {
                    console.error('Unknown error occurred while deleting data.');
                    throw new Error('Unknown error occurred.');
                }
            }
        },
        [baseUrl] 
    );

    return { deleteData };
}
