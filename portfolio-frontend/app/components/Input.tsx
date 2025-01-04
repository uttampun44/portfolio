import React from "react";
import CompulsaryField from "./CompulsaryField";
import { useFormContext } from "react-hook-form";
import { InputProps } from "utils/InputTypes";

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ label,placeholder, type, name, readonly, className, required,  compulsaryField, autocomplete, ...props }, ref) => {

    const {formState: { errors }, register } = useFormContext();
    return (
       
         <React.Fragment>
               {
            label  && (
                <label className={className?.label}>{label} {compulsaryField && (<CompulsaryField/>)}</label> 
            )
           }
            <input type={type}  className={className?.input} placeholder={placeholder}
             {...register(name)}
             ref={ref}
            {...props} 
             autoComplete={autocomplete}
             required={required}
             readOnly={readonly}
            />
        
             {
                errors && (
                    <p className="error text-red-700 font-normal"> {errors[name]?.message as string}</p>
                )
             }
         </React.Fragment>
    )
});

Input.displayName = "Input";

export default Input