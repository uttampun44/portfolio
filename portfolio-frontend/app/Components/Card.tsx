import React from "react"

interface cardProps {
    children: React.ReactNode;
}

const Card:React.FC<cardProps> = ({children}) =>{
    return(
        <div className="cardContainer">
           {children}
        </div>
    )
} 
export default Card