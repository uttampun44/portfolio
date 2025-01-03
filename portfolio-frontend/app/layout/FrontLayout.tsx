   "use client"

import Footer from "components/Footer";
import Header from "components/Header";
import React from "react";



interface layout{
    children: React.ReactNode
}

export default function FrontLayout(props:layout){
    return(
       <>
         <Header/>
         {props.children}
         <Footer />
       </>
    )
}