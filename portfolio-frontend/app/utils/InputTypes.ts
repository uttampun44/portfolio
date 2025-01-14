type inputType = "email" | "text" | "password" | "number" | "checkbox" | "radio" | "file"; 

export interface InputProps {
    label?: string;
    type: inputType;
    name?: string | undefined;
    placeholder?: string;
    className?: {
        input?: string;
        label?: string;
    };
    errors?: Record<string, string>;
    compulsaryField?: boolean,
    autocomplete?: string;
    required?: boolean;
    readonly?: boolean;
}