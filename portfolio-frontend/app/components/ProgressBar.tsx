import React from "react"


interface progressProps  {
  className:string
  value: number
  maxValue:number
}
const ProgressBar:React.FC<progressProps> = ({className, value, maxValue}) =>{

    const percentage = (value / maxValue) * 100;

    return(
        <div className="relative progressBar">
           <progress className={`progressBar, ${className}`} value={value} max={maxValue}></progress>
           <div className={`border-primary-text-color border-2 bg-bg-secondary w-6 h-6 rounded-full absolute top-0 `}  style={{ left: `calc(${percentage}% - 12px)` }} >

           </div>
        </div>
    )
}

export default ProgressBar