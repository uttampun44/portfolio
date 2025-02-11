   'use client'

import { AuthContext } from "context/ContextApi";
import { navData } from "data/NavData/Navdata";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { BiStar } from "react-icons/bi";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoIosClose } from "react-icons/io";
import Icon from "./Icon";


export default function Header(){
    
   const {isToggle, setToggle} = useContext(AuthContext);

   const [color, setColor] = useState(false);

   const handleClick = () => {
      document.getElementsByTagName("html")[0].classList.add('hamburgerSlide');
    setToggle(true);
   }

 useEffect(() =>{
   const scroll = () =>{
      if(window.scrollY >= 80){
       
          setColor(true)
      }else{
         setColor(false);
      }
   }

   window.addEventListener("scroll", scroll)

   return () => {
      window.removeEventListener("scroll", scroll)
   }
 }, [])

   

    return(
        <header   className={`max-md:fixed max-md:w-full max-md:z-50 ${
         color ? "max-md:bg-bg-secondary" : ""
       }`}>
             <div className="headerRow max-w-main-max-width mx-auto w-full py-10 max-md:px-6 max-md:py-6 ">
                  <div className="navLink p-5 bg-main-bg rounded-full flex items-center justify-between max-md:hidden">
                       {
                          navData.map((data, index) => {
                            return(
                                <div className="menuLink" key={index}>
                                   <Link href={`${data.link}`} aria-label={data.name} className="text-white font-poppins font-poppins-light">{data.name}</Link>
                                </div>
                            )
                          })
                       }
                     <div className="themeClick">
                      <Icon iconName="star" className="text-white" />
                      {/* <Icon iconName="darkStar" className="text-white" /> */}
                     </div>
                    </div> 
                    <div className="hamBurger md:hidden flex justify-end">
                       <GiHamburgerMenu className={`w-6 h-6 text-black`} onClick={handleClick} />
                    </div>

             </div>

             <div className={`menuMobile h-screen bg-main-bg fixed inset-0 z-10 overflow-hidden ${isToggle ? 'transform translate-y-72 ease-out duration-300 delay-75' : 'translate-y-full ease-out duration-300 delay-75'}`}>

               <IoIosClose onClick={() => {
                  setToggle(false)
                  document.getElementsByTagName("html")[0].classList.remove('hamburgerSlide');

               }} className="absolute top-4 right-4 text-white cursor-pointer text-3xl" />
            
                <div className="menuMobileContainer absolute top-36 -translate-y-1/1 left-1/2 transform -translate-x-1/2">
                   <div className="menuMobileContent grid gap-y-4 bg-main-bg rounded-lg max-w-main-max-width mx-auto">
                      {
                         navData.map((data, index) => {
                           return(
                              <div className="menuLink " key={index}>
                                 <Link href={`${data.link}`} onClick={() => {
                                    if(data.link) setToggle(false)
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