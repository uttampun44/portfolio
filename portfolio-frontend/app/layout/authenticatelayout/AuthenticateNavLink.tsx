import Button from "components/Button";
import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";

type childrenProps = {
    children: React.ReactNode
}
export default function AuthenticateNavLink(props: childrenProps) {

    return (
        <React.Fragment>
            <nav className="navlink flex justify-center">
                <GiHamburgerMenu className="w-6 h-6" /> <Button  >Logout</Button>
            </nav>
            <main>{props.children}</main>
        </React.Fragment>
    )
}