import React, {useState} from 'react'


type toggleType = {
    isOpen:boolean,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
    toggle?: () => void
}
export default function useToggle():toggleType {

    const [isOpen, setIsOpen] = useState(false);
     
    function toggle() {
        setIsOpen(!isOpen);
    }
  
    return {isOpen, setIsOpen,  toggle}
}
