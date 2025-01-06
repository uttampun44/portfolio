   'use client'

import { navData } from "data/NavData/Navdata";
import Link from "next/link";
import { GiHamburgerMenu } from "react-icons/gi";

export default function Header(){
    

    return(
        <header>
             <div className="headerRow max-w-main-max-width mx-auto w-full py-10 max-md:px-6 max-md:py-6 ">
                  <div className="navLink p-5 bg-main-bg rounded-full flex justify-between max-md:hidden">
                       {
                          navData.map((data, index) => {
                            return(
                                <div className="menuLink" key={index}>
                                   <Link href={`${data.link}`} aria-label={data.name} className="text-white font-poppins font-poppins-light">{data.name}</Link>
                                </div>
                            )
                          })
                       }
                    </div>  
                    <div className="hamBurger  md:hidden flex justify-end">
                       <GiHamburgerMenu className="w-6 h-6" />
                    </div>

             </div>
        </header>
    )
}