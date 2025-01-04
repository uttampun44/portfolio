    "use client";
import React, {createContext, ReactNode, useContext, useState} from "react";

interface AuthValue {
  isMode: boolean;
  setMode: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AuthContext = createContext<AuthValue | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
  }

export default function AuthProvider({children}: AuthProviderProps){

  const [isMode, setMode] = useState<AuthValue['isMode']>(false);


  
  return (
       <AuthContext.Provider value={{isMode, setMode}}>
          {children}
       </AuthContext.Provider>
  )
}

export const useAuth = (): AuthValue => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};