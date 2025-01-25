
"use client";

import React, { useState } from "react";
import Title from "components/Title";
import Link from "next/link";
import { SidebarData } from "data/BackendNavData/SidebarData";
import Icon from "components/Icon";
import Image from "next/image";
import ProfilePic from "public/images/ProfilePic.png";
import useGet from "hooks/api/useGet";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";


type usersResponse = {
  users: number | undefined
  auth_user: {
    id: number,
    name: string,
  }
}


export default function AuthenticateSidebar() {

  const [selectedData, setSelectedData] = useState<number | null>(null);

  const handleToggle = (id: number) => {
    setSelectedData(prev => (prev === id ? null : id));
  };

  const url = process.env.NEXT_PUBLIC_API_URL;

  const { getData } = useGet<usersResponse | undefined>(`${url}/api/dashboard`);
  const [users, setUsers] = useState<usersResponse | undefined>(undefined);


  const fetchUsers = async (): Promise<usersResponse | undefined> => {
    const response = await getData();
    setUsers(response);
    return response;
  }

  // refetching on windows focus will not rerender the data on the page

  useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
    refetchOnWindowFocus: false,
    staleTime: 30000
  });


  return (
    <aside>
      <div className="sideContainer w-56 fixed top-0 h-screen z-50 bg-white border-r-[1px] pt-9 pb-20">
        {/* Dashboard Title */}
        <div className="image flex px-4 items-center gap-x-3">
          <Icon iconName="dashboardIcon" className="w-8 h-auto" />
          <Title title="Dashboard" className="text-2xl font-medium" />
        </div>

        {/* Sidebar Menu */}
        <div className="menu px-4 py-10">
          <ul className="menuList">
            {SidebarData.map((item, index: number) => (
              <React.Fragment key={index}>
                <li  className="menuItem gap-4 my-2 flex items-center">
                  {/* Parent Item */}
                  {
                    item.iconName && (
                      <Icon iconName={item.iconName} className="w-8 h-auto" />
                    )
                  }
                  <Link
                    href={item.href}
                    className="text-base font-medium text-backend-primary-text-color"
                    onClick={() => handleToggle(item.id)}
                  >
                    {item.name}
                  </Link>
                </li>
                {selectedData === item.id && item.subNav && (
                  <React.Fragment >
                    {item.subNav.map((subItem, index: number) => (
                      <li  className="subMenuItem my-1" key={index}>
                        <Link
                          href={subItem.href}
                          className="text-sm font-medium text-backend-primary-text-color"
                        >
                          {subItem.name}
                        </Link>
                      </li>
                    ))}
                  </React.Fragment>
                )}

              </React.Fragment>
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
            {users?.auth_user?.name}
          </h6>
        </div>
      </div>
    </aside>
  );
}
