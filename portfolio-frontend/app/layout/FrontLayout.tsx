   "use client"

import React from "react";
import Footer from "components/Footer";
import Header from "components/Header";


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