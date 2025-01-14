interface overlaryProps {
    className?:string
}

export default function Overlary(props:overlaryProps) {
  return (
    <div className={`fixed inset-0 z-50 bg-black opacity-75 ${props?.className || ""}`}>
     
    </div>
  );
}