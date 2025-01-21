/**
 * Type Definitions for Input Component
 *
 * The `InputProps` interface and `inputType` type are used to define the structure and constraints for the props of a reusable input component.
 */

/**
 * Input Type
 *
 * A union type defining the acceptable HTML input types for the component.
 *
 * Options:
 * - `"email"`: Input for email addresses.
 * - `"text"`: Standard text input.
 * - `"password"`: Input for passwords (masked text).
 * - `"number"`: Input for numeric values.
 * - `"checkbox"`: Checkbox input.
 * - `"radio"`: Radio button input.
 * - `"file"`: File upload input.
 */


type inputType = "email" | "text" | "password" | "number" | "checkbox" | "radio" | "file"; 

/**
 * InputProps Interface
 *
 * Defines the expected structure for the props passed to the Input component.
 *
 * Properties:
 * - `label` (string | optional): The text label displayed above the input field.
 * - `type` (inputType): Specifies the type of the input field (e.g., "text", "email").
 * - `name` (string | undefined | optional): The name attribute used for form registration and identification.
 * - `placeholder` (string | optional): Placeholder text shown inside the input field.
 * - `className` (object | optional): Custom CSS classes for styling the input and label.
 *   - `className.input` (string): Class for styling the input element.
 *   - `className.label` (string): Class for styling the label element.
 * - `errors` (Record<string, string> | optional): A record object containing field-specific error messages.
 *   - Example: `{ "email": "Email is required", "password": "Password must be at least 8 characters" }`.
 * - `compulsaryField` (boolean | optional): If true, indicates that the field is mandatory (e.g., with an asterisk next to the label).
 * - `autocomplete` (string | optional): Specifies the autocomplete behavior (e.g., "on", "off", "email").
 * - `required` (boolean | optional): If true, enforces the field to be filled before form submission.
 * - `readonly` (boolean | optional): If true, the input field becomes read-only.
 *
 * Usage Example:
 * ```tsx
 * import { InputProps } from "utils/InputTypes";
 * 
 * const inputConfig: InputProps = {
 *   label: "Email Address",
 *   type: "email",
 *   name: "email",
 *   placeholder: "Enter your email",
 *   className: {
 *     input: "border rounded px-4 py-2",
 *     label: "font-bold text-gray-700",
 *   },
 *   required: true,
 *   autocomplete: "email",
 * };
 * ```
 *
 * Notes:
 * - Ensures type safety when passing props to the Input component.
 * - Enhances maintainability and scalability for forms by defining reusable input structures.
 */

export interface InputProps {
    label?: string;
    type: inputType;
    name?: string | undefined;
    placeholder?: string;
    className?: {
        input?: string;
        label?: string;
    };
    accept?: string;
    value?: string;
    errors?: Record<string, string>;
    compulsaryField?: boolean,
    autocomplete?: string;
    required?: boolean;
    readonly?: boolean;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}