import AuthenticateNavLink from "layout/authenticatelayout/AuthenticateNavLink";
import AuthenticateSidebar from "layout/authenticatelayout/AuthenticateSidebar";

export default function index(){
    return(
        <AuthenticateNavLink>
            <AuthenticateSidebar />
        </AuthenticateNavLink>
    )
}