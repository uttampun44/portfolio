import React from "react";
import Footer from "./Footer";
import Header from "./Header";

interface layout{
    children: React.ReactNode
}

export default function FrontLayout(props:layout){
    return(
       <>
          <Header />
          {props.children}
        <Footer />
       </>
    )
}