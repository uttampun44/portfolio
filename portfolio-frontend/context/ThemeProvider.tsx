   "use client";
    import React, {createContext, ReactNode, useState} from "react";

    interface ThemeValue {
      isDark: boolean;
      setDark: React.Dispatch<React.SetStateAction<boolean>>;
    }
  
    export const ThemeContext = createContext<ThemeValue>({
      isDark: false,
      setDark: () => {},
    });
  
    interface ThemeProviderProps {
      children: ReactNode;
    }
  
    export default function ThemeProvider({children}: ThemeProviderProps){
  
      const [isDark, setDark] = useState(false);
  
      return (
          <ThemeContext.Provider value={{isDark, setDark}}>
             {children}
          </ThemeContext.Provider>
      )
    }   