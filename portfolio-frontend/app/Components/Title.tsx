
import React from "react";

interface tileProps  {
    title: string;
    className?: string;
    children?: React.ReactNode
};

const Title: React.FC<tileProps> = ({title, className, children}) => {
  return(
    <div className="title">
      <h1 className={className}>{title}{children}</h1>
    </div>
  )
}

export default Title;