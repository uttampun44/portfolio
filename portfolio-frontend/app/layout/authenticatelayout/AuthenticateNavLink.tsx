import { useMutation } from "@tanstack/react-query";
import Button from "components/Button";
import usePost from "hooks/api/usePost";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { GiHamburgerMenu } from "react-icons/gi";
import { toast } from "sonner";

interface LogoutResponse<T> {
  message: string;
  data: T;
}


type childrenProps = {
  title?: string | undefined
  className?: {
    title: string | undefined
  }
  children: React.ReactNode
}
export default function AuthenticateNavLink<T>(props: childrenProps) {

  const router = useRouter()

  const url = process.env.NEXT_PUBLIC_API_URL;

  const { handleSubmit } = useForm();

  const { postData } = usePost<LogoutResponse<T>>(`${url}/api/logout`);

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
      <nav className="navlink bg-bg-dashboard flex justify-between items-center  ml-56 pl-14 p-5">
        <div className="navlinkToogle flex gap-x-4">
          <GiHamburgerMenu className="w-6 h-6" /><h6 className={props.className?.title}>{props?.title}</h6>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Button onClick={() => {
            router.push("/login")
          }} className="text-lg font-medium">Logout</Button>
        </form>
      </nav>
      <main>{props.children}</main>
    </React.Fragment>
  )
}