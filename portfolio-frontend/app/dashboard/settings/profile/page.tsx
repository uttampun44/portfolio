import AuthenticateNavLink from "layout/authenticatelayout/AuthenticateNavLink";
import AuthenticateSidebar from "layout/authenticatelayout/AuthenticateSidebar";

export default function Profile() {
    
    return (
      
           <AuthenticateNavLink title="Profile">
           <AuthenticateSidebar />
           </AuthenticateNavLink>
       
    )
}