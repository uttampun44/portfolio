"use client"

import Button from "components/Button";
import Title from "components/Title";
import Cookies from "js-cookie";
import AuthenticateNavLink from "layout/authenticatelayout/AuthenticateNavLink";
import AuthenticateSidebar from "layout/authenticatelayout/AuthenticateSidebar";
import { Table, Column, HeaderCell, Cell } from 'rsuite-table';


export default function Blogs() {

    const token = Cookies.get("token");

    const handleClick = () => {
        alert("Create Blog");
    };

    return <div>
       {
         token && (
            <AuthenticateNavLink>
            <AuthenticateSidebar />
            <div className="blogsContainer min-h-full  w-full bg-bg-dashboard h-screen lg:p-10 ">
                <div className="blogBox ml-64 mr-0 bg-white rounded-md p-5">

                    <div className="row flex justify-between items-center text-backend-primary-text-color">
                        <Title title="Blogs" /> <Button onClick={handleClick} className="bg-bg-backend-secondary-color p-5 rounded-md text-white font-medium">Create Blog</Button>
                    </div>

                    <div className="tableBox">
                         <Table>
                             <Column>
                                <HeaderCell className="text-primary-text-color">ID</HeaderCell>
                                <Cell>1</Cell>
                             </Column>
                             <Column>
                                <HeaderCell className="text-primary-text-color">ID</HeaderCell>
                                <Cell>1</Cell>
                             </Column>
                             <Column>
                                <HeaderCell className="text-primary-text-color">ID</HeaderCell>
                                <Cell>1</Cell>
                             </Column>
                         </Table>
                    </div>
                </div>
            </div>
        </AuthenticateNavLink>
         )
       }
    </div>;
}