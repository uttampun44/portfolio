   'use client'

import { navData } from "data/NavData/Navdata";
import Link from "next/link";


export default function Header(){
    


    return(
        <header>
             <div className="headerRow max-w-main-max-width mx-auto w-full py-10">
                  <div className="navLink p-5 bg-main-bg rounded-full flex justify-between max-md:flex-wrap">
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
             </div>
        </header>
    )
}