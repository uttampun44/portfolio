'use client'

import { AuthContext } from "context/AuthContext";
import { navData } from "data/NavData/Navdata";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoIosClose } from "react-icons/io";
import Icon from "./Icon";

import { ThemeContext } from "context/ThemeProvider";


export default function Header() {

   const { isToggle, setToggle } = useContext(AuthContext);
   const { theme, toggleTheme } = useContext(ThemeContext);

   const [color, setColor] = useState(false);

   const handleClick = () => {
      document.getElementsByTagName("html")[0].classList.add('hamburgerSlide');
      setToggle(true);
   }



   useEffect(() => {
      const scroll = () => {
         if (window.scrollY >= 80) {

            setColor(true)
         } else {
            setColor(false);
         }
      }

      window.addEventListener("scroll", scroll)

      return () => {
         window.removeEventListener("scroll", scroll)
      }
   }, [])



   return (
      <header className={`fixed w-full z-50 ${color ? "max-md:bg-bg-secondary bg-white border-b-2" : ""
         }`}>
         <div className="headerRow max-w-main-max-width mx-auto w-full py-10 max-md:hidden">
            <div className={`navLink p-5 bg-main-bg rounded-full flex items-center justify-between max-md:hidden`}>
               {
                  navData.map((data, index) => {
                     return (
                        <div className="menuLink" key={index}>
                           <Link href={`${data.link}`} aria-label={data.name} className="text-white dark:text-white font-poppins font-poppins-light">{data.name}</Link>
                        </div>
                     )
                  })
               }
               <div className="themeClick cursor-pointer" onClick={() => toggleTheme()}>
                  {
                     theme === "light" ? (
                        <Icon iconName="darkStar" className="text-white min-w-8 min-h-8 object-contain" />
                     ) : (
                        <Icon iconName="star" className="text-white min-w-8 min-h-8 object-contain" />
                     )
                  }
               </div>
            </div>


         </div>

         <div className="mobileRow flex items-center justify-between relative lg:hidden p-4 m-4">
            <div className="theme" onClick={() => toggleTheme()}>
               {
                  theme === "light" ? (
                     <Icon iconName="darkStar" className="text-black dark:text-white min-w-8 min-h-8 object-contain" />
                  ) : (
                     <Icon iconName="star" className="text-black dark:text-white min-w-8 min-h-8 object-contain" />
                  )
               }
            </div>

            <div className="hamBurger md:hidden flex justify-end">
               <GiHamburgerMenu className={`w-6 h-6 text-black dark:text-white cursor-pointer`} onClick={handleClick} />
            </div>


         </div>
         <div className={`menuMobile lg:hidden h-screen bg-main-bg absolute inset-0 z-10 overflow-hidden ${isToggle ? 'transform translate-y-72 ease-out duration-300 delay-75' : 'translate-y-full ease-out duration-300 delay-75'}`}>

            <IoIosClose onClick={() => {
               setToggle(false)
               document.getElementsByTagName("html")[0].classList.remove('hamburgerSlide');

            }} className="absolute top-4 right-4 text-white cursor-pointer text-3xl" />

            <div className="menuMobileContainer absolute top-[10%] -translate-y-1/1 left-1/2 transform -translate-x-1/2">
               <div className="menuMobileContent grid gap-y-4 bg-main-bg rounded-lg max-w-main-max-width mx-auto">
                  {
                     navData.map((data, index) => {
                        return (
                           <div className="menuLink " key={index}>
                              <Link href={`${data.link}`} onClick={() => {
                                 if (!data.link) return setToggle(false)
                              }} aria-label={data.name} className="text-white font-poppins text-2xl font-medium">{data.name}</Link>
                           </div>
                        )
                     })
                  }
               </div>

            </div>
         </div>
      </header>
   )
}