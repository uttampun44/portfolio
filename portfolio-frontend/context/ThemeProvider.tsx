   "use client";
    import React, {createContext, ReactNode, useState} from "react";

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
  
      const [theme, setDark] = useState<ThemeType>("light");
  
      function toggleTheme(){
        setDark((prev) => {
          const newTheme = prev === "light" ? "dark" : "light";
          document.documentElement.classList.toggle("dark", newTheme === "dark");
          return newTheme;
        });
      }
      return (
          <ThemeContext.Provider value={{theme, toggleTheme}}>
             {children}
          </ThemeContext.Provider>
      )
    }   