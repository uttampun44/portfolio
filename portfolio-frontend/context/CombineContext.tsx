import React from "react"
import ThemeProvider from "./ThemeContext"
import AuthProvider from "./AuthContext"

interface CombineContext{
 children:React.ReactNode   
}
export default function CombineContext(pros: CombineContext){
    return(
           <ThemeProvider>
              <AuthProvider>
                 {pros.children}
              </AuthProvider>
           </ThemeProvider>
    )
}