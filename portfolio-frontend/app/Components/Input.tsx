import React from "react";
import CompulsaryField from "./CompulsaryField";

type inputType = "email" | "text" | "password" | "number" | "checkbox" | "radio"; 

interface InputProps {
    label?: string;
    value?: string;
    type?: inputType;
    name?: string;
    placeholder?: string;
    className?: {
        input?: string;
        label?: string;
    };
    compulsary?: boolean,
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input:React.FC<InputProps> = ({ label, value, type, name, placeholder, className, compulsary, onChange }) => {
    return (
       
         <React.Fragment>
               {
            label  && (
                <label className={className?.label}>{label} {compulsary && (<CompulsaryField/>)}</label> 
            )
           }
            <input type={type} className={className?.input} name={name} placeholder={placeholder}
             value={value} onChange={onChange} 
             
             />  
         </React.Fragment>
    )
}
export default Input