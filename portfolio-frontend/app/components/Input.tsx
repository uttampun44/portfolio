import React from "react";
import CompulsaryField from "./CompulsaryField";
import { useFormContext } from "react-hook-form";
import { InputProps } from "utils/InputTypes";

/**
 * Input Component
 *
 * A reusable input field component integrated with `react-hook-form` for seamless form validation and management. 
 * It supports various input types, labels, validation errors, and additional customization options.
 *
 * Props:
 * - `label` (string | optional): The text label displayed above the input field. If not provided, no label is rendered.
 * - `placeholder` (string | optional): Placeholder text to guide the user within the input field.
 * - `type` (string): Specifies the input type (e.g., "text", "email", "password").
 * - `name` (string): The name of the input field used for form registration and validation with `react-hook-form`.
 * - `readonly` (boolean | optional): If true, makes the input field read-only.
 * - `className` (object | optional): Allows you to pass custom CSS classes for the `label` and `input` elements.
 *   - `className.label` (string): Class for styling the label.
 *   - `className.input` (string): Class for styling the input field.
 * - `required` (boolean | optional): If true, makes the input field mandatory for form submission.
 * - `compulsaryField` (boolean | optional): If true, displays a visual indicator (via the `CompulsaryField` component) next to the label.
 * - `autocomplete` (string | optional): Specifies the autocomplete behavior for the input field (e.g., "on", "off", "email").
 * - `props` (object | optional): Any additional attributes or event handlers passed to the input field.
 * - `ref` (React Ref | optional): A forwarded ref to access the input DOM node directly.
 *
 * Integration with `react-hook-form`:
 * - The component uses `useFormContext` to access form state and `register` for registering the input field.
 * - Displays validation errors associated with the field name dynamically below the input.
 *
 * Example Usage:
 * ```tsx
 * import { useForm, FormProvider } from "react-hook-form";
 * 
 * const MyForm = () => {
 *   const methods = useForm();
 *   
 *   return (
 *     <FormProvider {...methods}>
 *       <form onSubmit={methods.handleSubmit(data => console.log(data))}>
 *         <Input
 *           label="Username"
 *           name="username"
 *           type="text"
 *           placeholder="Enter your username"
 *           required
 *           className={{
 *             label: "text-gray-700 font-medium",
 *             input: "border rounded p-2 w-full",
 *           }}
 *         />
 *         <button type="submit">Submit</button>
 *       </form>
 *     </FormProvider>
 *   );
 * };
 * ```
 *
 * Notes:
 * - This component uses `forwardRef` for compatibility with React ref forwarding.
 * - Dynamically renders error messages using the `errors` object from `react-hook-form`.
 * - Aims to be a flexible, composable, and accessible building block for forms.
 *
 * @param {InputProps} props - Input field properties and configurations.
 * @returns {JSX.Element} A fully functional input field with optional label and validation error handling.
 */


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
             {...register(name || "")}
             ref={ref}
            {...props} 
             autoComplete={autocomplete}
             required={required}
             readOnly={readonly}
            />
        
             {
                errors && (
                    <p className="error text-red-700 font-normal"> {errors[name || ""]?.message as string}</p>
                )
             }
         </React.Fragment>
    )
});

Input.displayName = "Input";

export default Input