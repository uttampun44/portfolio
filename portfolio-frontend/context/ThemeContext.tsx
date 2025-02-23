   "use client";
    import React, {createContext, ReactNode, useEffect, useState} from "react";

    type ThemeType = "light" | "dark";

    interface ThemeValue {
      theme: ThemeType;
      toggleTheme: () => void;
    }
  
    export const ThemeContext = createContext<ThemeValue>({
      theme: "light",
      toggleTheme: () => {},
    });
  
    interface ThemeProviderProps {
      children: ReactNode;
    }
  
    export default function ThemeProvider({children}: ThemeProviderProps){
  
      const [theme, setTheme] = useState<ThemeType>(() => {
       
        if(typeof window !== "undefined"){
          const savedTheme = localStorage.getItem("theme")
          return savedTheme === "dark" ? "dark" : "light"
        }
        return "light";
      });


      useEffect(() => {
       
        document.documentElement.classList.toggle("dark", theme === "dark");
  
        localStorage.setItem("theme", theme);
      }, [theme]); 
    
      function toggleTheme() {
     
        setTheme((prev) => (prev === "light" ? "dark" : "light"));
      }


      return (
          <ThemeContext.Provider value={{theme, toggleTheme}}>
             {children}
          </ThemeContext.Provider>
      )
    }   