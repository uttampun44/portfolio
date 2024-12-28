
type buttonType = "button" | "submit" | "reset";
interface ButtonProps {
    children: React.ReactNode;
    className?: string;
    type?: buttonType;
    onClick?: () => React.MouseEvent<HTMLButtonElement>;
}

const Button:React.FC<ButtonProps> = ({children, className, type,  onClick}) => {
  return(
    <button type={type} onClick={onClick} className={`button py-2 px-5 rounded-full ${className}`}>{children}</button>
  )
}

export default Button