import { useMutation } from "@tanstack/react-query";
import Button from "components/Button";
import usePost from "hooks/api/usePost";
import { useRouter } from "next/navigation";
import React from "react";
import {useForm } from "react-hook-form";
import { GiHamburgerMenu } from "react-icons/gi";
import { toast } from "sonner";

interface LogoutResponse {
    message: string;
    data: any;
  }

  
type childrenProps = {
    children: React.ReactNode
}
export default function AuthenticateNavLink(props: childrenProps) {

    const router = useRouter()

    const url = process.env.NEXT_PUBLIC_API_URL;

    const {handleSubmit} = useForm();

    const { postData } = usePost<LogoutResponse>(`${url}/api/logout`);
    
      const mutation = useMutation({
        mutationFn: () => postData({}),
        onSuccess: () => {
        
          document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
          
          toast.success("Logged out successfully");
        
          router.push("/login");
        },
        onError: (error) => {
          toast.error("Logout failed. Please try again.");
          console.error('Logout error:', error);
        }
      });

      const onSubmit = async () => {
        mutation.mutate();
      };
      
    return (
        <React.Fragment>
            <nav className="navlink flex justify-center">
                <GiHamburgerMenu className="w-6 h-6" />
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Button onClick={() => {
                        router.push("/login")
                    }}>Logout</Button>
                </form>
            </nav>
            <main>{props.children}</main>
        </React.Fragment>
    )
}