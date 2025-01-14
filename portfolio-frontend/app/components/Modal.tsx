import React from "react";

interface modalProps {
  className?:{
    modalContainer:string
  },
  children:React.ReactNode
}

export default function Modal(props:modalProps) {
  return (
    <div className={`fixed inset-0 z-50 ${props?.className?.modalContainer || ""} `}>
       {props.children}
    </div>
  );
}