type inputType = "email" | "text" | "password" | "number" | "checkbox" | "radio"; 

export interface InputProps {
    label?: string;
    type: inputType;
    name?: string;
    placeholder?: string;
    className?: {
        input?: string;
        label?: string;
    };
    errors?: Record<string, string>;
    compulsaryField?: boolean,
    [key: string]: unknown;
    autocomplete?: string;
    required?: boolean;
    readonly?: boolean;
}