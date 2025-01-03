import React from "react";

type buttonType = "button" | "submit" | "reset";
interface ButtonProps {
    children: React.ReactNode;
    className?: string;
    type?: buttonType;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void ;
}

const Button:React.FC<ButtonProps> = ({children, className, type,  onClick}) => {
  return(
    <button type={type} onClick={onClick} className={`button py-2 px-5 ${className}`.trim()}>{children}</button>
  )
}

export default Button