import React from "react";

type inputType = "email" | "text" | "password" | "number"; 

interface InputProps {
    label: string;
    value: string;
    type: inputType;
    className?: {
        input?: string;
        label?: string;
        container?:string
    };
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input:React.FC<InputProps> = ({ label, value, className, onChange }) => {
    return (
        <div className={`inputContainer, ${className?.container}`}>
            <label className={className?.label}>{label}</label>
            <input className={className?.input} value={value} onChange={onChange} />
        </div>
    )
}
export default Input