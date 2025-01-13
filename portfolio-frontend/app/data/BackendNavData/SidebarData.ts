import { IconType } from "components/Icon";

type SideNav ={
    id: number,
    name: string,
    href: string,   
    iconName?: IconType
    subNav?: SideNav[]
}
export const SidebarData:SideNav[]   = [
    {
        id: 1,
        name: "Dashboard",
        href: "/dashboard",
        iconName: 'dashboard',
    },
    {   id:2,
        name: "Projects",
        href: "#",
        iconName: 'dashboard',
        subNav:[
            {   id:3,
                name: "Project Categories",
                href: "/dashboard/projects/project-categories",
               
            },
            {    id:4,
                name: "Projects",
                href: "/dashboard/projects",
                
            },
            
        ]
    },                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
    {   id:5,
        name: "Blogs",
        href: "/dashboard/blogs",
    },
  
    {   id:6,
        name: "Settings",
        href: "/settings",
    },
];          