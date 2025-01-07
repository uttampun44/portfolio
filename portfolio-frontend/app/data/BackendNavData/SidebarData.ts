import { IconType } from "components/Icon";

type SideNav ={
    name: string,
    href: string,   
    iconName?: IconType
    subNav?: SideNav[]
}
export const SidebarData:SideNav[]   = [
    {
        name: "Dashboard",
        href: "/dashboard",
        iconName: 'dashboard',
    },
    {
        name: "Projects",
        href: "#",
        iconName: 'dashboard',
        subNav:[
            {
                name: "Project Categories",
                href: "/projects/categories",
               
            },
            {
                name: "Projects",
                href: "/projects/projects",
                
            },
            
        ]
    },                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
    {
        name: "Clients",
        href: "/clients",
    },
    {
        name: "Invoices",
        href: "/invoices",
    },
    {
        name: "Settings",
        href: "/settings",
    },
];          