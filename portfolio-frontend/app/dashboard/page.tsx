
import { cookies } from "next/headers"


export default async function Dashboard(){

    const cookieStore = await cookies()
    const cook = cookieStore.get("token");


    console.log(cook)
    return(
        <>
           dasdasd
        </>
    )
}