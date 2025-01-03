import React, {createContext, ReactNode, useState} from "react";


interface AuthValue {
  isMode: boolean;
  setMode: React.Dispatch<React.SetStateAction<boolean>>;
}
export const AuthContext = createContext<AuthValue>({
  isMode: false,
  setMode: () => {}
});

interface AuthProviderProps {
    children: ReactNode;
  }

export default function AuthProvider({children}: AuthProviderProps){

  const [isMode, setMode] = useState(true);


  
  return (
       <AuthContext.Provider value={{isMode, setMode}}>
          {children}
       </AuthContext.Provider>
  )
}