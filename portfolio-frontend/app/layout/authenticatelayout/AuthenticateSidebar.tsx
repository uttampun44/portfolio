"use client"

import React from "react"
import Title from "components/Title";
import Link from "next/link";
import { SidebarData } from "data/BackendNavData/SidebarData";
import Icon from "components/Icon";
import Image from "next/image";
import ProfilePic from "public/images/ProfilePic.png";


export default function AuthenticateSidebar() {

    return (
        <>

            <aside>
                <div className="sideContainer  w-56 absolute top-0 h-full z-50 bg-white pt-9 pb-20">
                    <div className="image flex px-4 items-center gap-x-3">
                        <Icon iconName="dashboardIcon" className="w-8 h-auto" />
                        <Title title="Dashboard" className="text-2xl font-medium" />
                    </div>
                    <div className="menu px-4 py-10">
                         <ul className="menuList">
                           {
                             SidebarData.map((item, index:number)=>{
                               return (
                                 <li key={index} className="menuItem flex items-center gap-4 my-2">
                                  <Icon iconName={item.iconName} className="w-8 h-auto" /> <Link href={item.href} className="text-base font-medium text-backend-primary-color">{item.name}</Link>
                                 </li>
                               )
                             })
                           }
                        </ul>
                    </div>

                    <div className="profilePic absolute bottom-8 left-6 flex items-center gap-x-4">
                        <Image src={ProfilePic} alt="Profile Picture" width={40} height={40} objectFit="contain" />
                        <h6 className="text-backend-primary-color text-base font-medium">Uttam Pun</h6>
                    </div>
                </div>
            </aside>
           
        </>
    )
}