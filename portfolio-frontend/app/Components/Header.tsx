   'use client'

import { navData } from "data/NavData/Navdata";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { RootState } from "../../lib/store";
import { usePathname } from "next/navigation";

export default function Header(){
    
   const pathname = usePathname().split("/").slice(1);

  
    return(
        <header>
             <div className="headerRow max-w-main-max-width mx-auto w-full py-10">
                  <div className="navLink p-5 bg-main-bg rounded-full flex justify-between ">
                       {
                          navData.map((data, index) => {
                            return(
                                <div className="menuLink" key={index}>
                                   <Link href={`${data.link}`} aria-label={data.name} className="text-white">{data.name}</Link>
                                </div>
                            )
                          })
                       }
                    </div>  
             </div>
        </header>
    )
}