"use client";

import React, { useState } from "react";
import Title from "components/Title";
import Link from "next/link";
import { SidebarData } from "data/BackendNavData/SidebarData";
import Icon from "components/Icon";
import Image from "next/image";
import ProfilePic from "public/images/ProfilePic.png";

export default function AuthenticateSidebar() {
  
  const [selectedData, setSelectedData] = useState<number | null>(null);

  const handleToggle = (id: number) => {
    setSelectedData(prev => (prev === id ? null : id));
  };

  return (
    <aside>
      <div className="sideContainer w-56 absolute top-0 h-full z-50 bg-white border-r-[1px] pt-9 pb-20">
        {/* Dashboard Title */}
        <div className="image flex px-4 items-center gap-x-3">
          <Icon iconName="dashboardIcon" className="w-8 h-auto" />
          <Title title="Dashboard" className="text-2xl font-medium" />
        </div>

        {/* Sidebar Menu */}
        <div className="menu px-4 py-10">
          <ul className="menuList">
            {SidebarData.map((item, index: number) => (
              <li key={index} className="menuItem gap-4 my-2">
                {/* Parent Item */}
                <Link
                  href={item.href}
                  className="text-base font-medium text-backend-primary-text-color"
                  onClick={() => handleToggle(item.id)}
                >
                  {item.name}
                </Link>

                {/* Submenu */}
                {selectedData === item.id && item.subNav && (
                  <ul className="subMenu pl-6 mt-2">
                    {item.subNav.map((subItem, subIndex: number) => (
                      <li key={subIndex} className="subMenuItem my-1">
                        <Link
                          href={subItem.href}
                          className="text-sm font-medium text-backend-primary-text-color"
                        >
                          {subItem.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Profile Section */}
        <div className="profilePic absolute bottom-8 left-6 flex items-center gap-x-4">
          <Image
            src={ProfilePic}
            alt="Profile Picture"
            width={40}
            height={40}
            objectFit="contain"
          />
          <h6 className="text-backend-primary-color text-base font-medium">
            Uttam Pun
          </h6>
        </div>
      </div>
    </aside>
  );
}
