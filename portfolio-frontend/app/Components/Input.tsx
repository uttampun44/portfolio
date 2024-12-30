import React from "react";

type inputType = "email" | "text" | "password" | "number"; 

interface InputProps {
    label?: string;
    value?: string;
    type?: inputType;
    name: string;
    placeholder?: string;
    className?: {
        input?: string;
        label?: string;
    };
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input:React.FC<InputProps> = ({ label, value, type, name, placeholder, className, onChange }) => {
    return (
       
         <React.Fragment>
               {
            label && (
                <label className={className?.label}>{label}</label>
            )
           }
            <input type={type} className={className?.input} name={name} placeholder={placeholder} value={value} onChange={onChange} />
        
         </React.Fragment>
    )
}
export default Input