import React from "react"

interface cardProps {
    children: React.ReactNode;
    className?: string,
}

/**
 * Card Component
 *
 * A reusable container component for wrapping content with additional styling options.
 * This component can be used to create consistent UI elements such as cards across your application.
 *
 * Props:
 * - `children` (React.ReactNode): The content to be rendered inside the card. It can be any valid React node.
 * - `className` (string | optional): Additional CSS classes to customize the card's styles.
 *
 * Example Usage:
 * ```tsx
 * <Card className="bg-gray-100 shadow-lg p-4">
 *   <h2>Card Title</h2>
 *   <p>This is some card content.</p>
 * </Card>
 * ```
 *
 * Notes:
 * - This component uses a base class `cardContainer` with default styles.
 * - Additional custom styles can be passed via the `className` prop.
 *
 * @param {cardProps} props - The props object containing `children` and `className`.
 * @returns {JSX.Element} A styled card container wrapping the provided content.
 */

const Card:React.FC<cardProps> = ({children, className}) =>{
    return(
        <div className={`cardContainer min-w-96 min-h-fit, ${className}`}>
           {children}
        </div>
    )
} 
export default Card