"use client"


import LoginImage from "public/images/loginImage.png";
import Image from "next/image";
import { FormProvider, set, SubmitHandler, useForm } from "react-hook-form";
import Link from "next/link";
import Title from "components/Title";
import Input from "components/Input";
import Button from "components/Button";
import { useDispatch } from "react-redux";
import { AppDispatch } from "store/store";
import { setToken } from "lib/features/auth/Auth";
import usePost from "hooks/api/usePost";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useState } from "react";


interface loginForm {
  email: string,
  password: string,
}

export default function Login() {

  const url = process.env.NEXT_PUBLIC_API_URL;

  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>()

  const [errorMessage, setErrorMessage] = useState<string>("");



  const methods = useForm<loginForm>({
    defaultValues: {
      email: "",
      password: ""
    }
  })



  const { postData } = usePost<loginForm>(`${url}/api/login`)

  const mutation = useMutation({
    mutationFn: (data: loginForm) => postData(data),
    onSuccess: (response) => {
   
         document.cookie = `token=${response?.token}; path=/; max-age=${7 * 24 * 60 * 60};`;
   
         dispatch(setToken(response?.token || ""));
        
         if(response?.token){
           router.push("/dashboard");  
           toast.success("Login Successfully");
         }else{
            setErrorMessage("Invalid Credentials");
           toast.error("Login Failed");
         }
    },
   
  })

  const onSubmit: SubmitHandler<loginForm> = async (data) => {

    try {
      mutation.mutate(data)
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error fetching data:', error.message);
      } else {
        console.error('Unknown error occurred while fetching data.');
      }
    }
  }
  return (
    <section className="signup">

      <div className="signupContainer flex flex-col md:flex-row max-md:flex-wrap md:h-screen">


        <div className="form w-full md:w-1/2 py-40 px-44 max-md:w-full max-md:p-5">
          <Title title="Welcome back !" className="text-2xl font-bold mb-3" />

          <p className="text-base font-medium">Enter your Credentials to access your account</p>
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} className="mb-8 mt-10">

              <Input type="email"
                {...methods.register("email")}
                label="Email"
                className={{ label: "block font-medium", input: "w-full focus:outline-none mb-2 py-1 px-2 border-2 border-bg-secondary rounded-md" }}
                placeholder="Enter Your Email"
                compulsaryField={true}
                autocomplete="email"
                required={true}
              />

              <Input type="password"
                {...methods.register("password")}
                label="Password"
                className={{ label: "block font-medium", input: "w-full focus:outline-none mb-2 py-1 px-2 border-2 border-bg-secondary rounded-md" }}
                placeholder="Enter Your Password"
                compulsaryField={true}
                autocomplete="current-password"
                required={true}
              />
          
             {
               errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>
             }
                
              <div className="checkbox my-5">
                <Input type="checkbox" className={{
                  input: "border-2 border-bg-secondary"
                }} 
                required={true}
                /> <span className="font-medium">I agree to the terms & policy</span>
              </div>

              <div className="button">
                <Button type="submit" className="bg-primary-text-color text-white py-1 px-2 rounded-md">Login</Button>
              </div>
          
            </form>
          </FormProvider>
          <div className="haveAccount my-2 text-primary-text-color text-lg font-medium">
          <Link href="/" aria-label="home" className=" text-blue-700 text-center">Home</Link>
          </div>


        </div>
        <div className="image w-full md:w-1/2 relative max-md:hidden">
          <div className="overlay absolute w-full h-full inset-0 bg-main-bg opacity-70 rounded-l-[42px] z-10"></div>
          <div className="content absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 text-center px-4">
            <h2 className="text-white text-4xl font-bold mb-4">
              Welcome to My Community
            </h2>
            <p className="text-white text-lg">
              Developers can write blogs about technology and share their
              thoughts.
            </p>
          </div>
          <Image
            src={LoginImage}
            alt="A vibrant login-related illustration"
            loading="lazy"
            quality={100}
            className="w-full h-screen rounded-l-[42px]"
            sizes="(max-width: 768px) 100vw, 50vw"
            fill={true}
          />
        </div>
      </div>
    </section>
  )
}