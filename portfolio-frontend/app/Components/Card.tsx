import React from "react"

interface cardProps {
    children: React.ReactNode;
    className?: string,
}

const Card:React.FC<cardProps> = ({children, className}) =>{
    return(
        <div className={`cardContainer min-w-96 min-h-fit, ${className}`}>
           {children}
        </div>
    )
} 
export default Card