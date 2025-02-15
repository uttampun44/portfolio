    "use client";
import React, {createContext, ReactNode, useContext, useState} from "react";

interface AuthValue {
  isMode: boolean;
  isToggle:boolean,
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
  setMode: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AuthContext = createContext<AuthValue>({
  isMode: false,
  isToggle: false,
  setToggle: () => {},
  setMode: () => {},
});

interface AuthProviderProps {
    children: ReactNode;
  }

export default function AuthProvider({children}: AuthProviderProps){

  const [isMode, setMode] = useState(false);
   const [isToggle, setToggle] = useState(false);

  
  return (
       <AuthContext.Provider value={{isMode, isToggle, setMode, setToggle}}>
          {children}
       </AuthContext.Provider>
  )
}

