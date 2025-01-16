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
        href: "#",
        subNav:[
            {
                id: 6,
                name: "Blog Category",
                href: "/dashboard/blogs/blog-categories"
            },
            {
                id: 7,
                name: "Blogs",
                href: "/dashboard/blogs",
            }
        ]
    },
  
    {   id:8,
        name: "Settings",
        href: "#",
        subNav:[
            {
                id:9,
                name: "Profile",
                href: "/dashboard/settings/profile",
            },
            {
                id:10,
                name: "Roles",
                href: "/dashboard/settings/roles",
            },
            {
                id:10,
                name: "Backup",
                href: "/dashboard/settings/back-up",
            }
        ]
    },
];          