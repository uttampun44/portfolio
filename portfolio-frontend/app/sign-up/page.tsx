"use client";

import Image from "next/image";
import LoginImage from "public/images/loginImage.png";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import Google from "public/images/google.png";
import Github from "public/images/github.png";
import Link from "next/link";
import Title from "components/Title";
import Input from "components/Input";
import Button from "components/Button";
import usePost from "hooks/api/usePost";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";


interface signupForm {
  name: string,
  email: string,
  password: string,
  password_confirmation: string
}

export default function SignUp() {

  const methods = useForm<signupForm>()

  const url = process.env.NEXT_PUBLIC_API_URL;

  const router = useRouter();

  const { postData } = usePost<signupForm>(`${url}/api/sign-up`)

  const mutation = useMutation({
    mutationFn: (data: signupForm) => postData(data),
    onSuccess: (response) => {
      if(!response?.data) return;
      toast.success("Signup Successfully");
      router.push("/login");
    },
    onError: () => {
      toast.error("Signup Failed");
    }
  });
  const onSubmit: SubmitHandler<signupForm> = (data) => {
    try {

      mutation.mutate(data);

    } catch (error: unknown) {
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
          <Title title="Signup" className="text-2xl font-bold mb-3" />
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              <Input type="text"
                {...methods.register("name")}
                label="Name"
                compulsaryField={true}
                className={{ label: "block font-medium", input: "w-full focus:outline-none mb-2 py-1 px-2 border-2 border-bg-secondary rounded-md" }}
                placeholder="Enter Your Name"
                required
              />
              <Input type="email"
                {...methods.register("email")}
                label="Email"
                className={{ label: "block font-medium", input: "w-full focus:outline-none mb-2 py-1 px-2 border-2 border-bg-secondary rounded-md" }}
                placeholder="Enter Your Email"
                compulsaryField={true}
                required
              />
              <Input type="password"
                {...methods.register("password")}
                label="Password"
                className={{ label: "block font-medium", input: "w-full focus:outline-none mb-2 py-1 px-2 border-2 border-bg-secondary rounded-md" }}
                placeholder="Enter Your Password"
                compulsaryField={true}
                required
              />
              <Input type="password"
                {...methods.register("password_confirmation")}
                label="Confirm Password"
                className={{ label: "block font-medium", input: "w-full focus:outline-none mb-2 py-1 px-2 border-2 border-bg-secondary rounded-md" }}
                placeholder="Enter Your Confirm Password"
                compulsaryField={true}
                required
              />
              <div className="checkbox my-5">
                <Input type="checkbox" className={{
                  input: "border-2 border-bg-secondary"
                }} /> <span className="font-medium">I agree to the terms & policy</span>
              </div>

              <div className="button">
                <Button type="submit" className="bg-primary-text-color text-white py-1 px-2 rounded-md">Signup</Button>
              </div>
            </form>
          </FormProvider>

          <div className="or flex items-center gap-x-1 my-10">
            <hr className="h-[1px] border-2 border-bg-bg-fourth w-full"></hr><span>or</span><hr className="h-[1px] border-2 border-bg-bg-fourth w-full"></hr>
          </div>
          <div className="signup flex justify-between gap-x-2 max-md:grid max-md:grid-cols-1 max-md:gap-y-5">
            <Button className="flex gap-x-1 items-center border-2 border-bg-bg-fourth rounded-md md:w-1/2"><Image src={Google} alt="google" />Signup with Google</Button>
            <Button className="flex gap-x-1 items-center border-2 border-bg-bg-fourth rounded-md md:w-1/2"><Image src={Github} alt="google" width={24} height={24} objectFit="contain" />Signup with Github</Button>
          </div>

          <div className="haveAccount text-center my-2 text-primary-text-color text-lg font-medium">
            <span>Have an account ? </span><Link href="/login" className="text-blue-700">Login</Link> Or <Link href="/" aria-label="home" className=" text-blue-700 text-center">Home</Link>
          </div>
        </div>
        <div className="image w-full md:w-1/2 relative max-md:w-full max-md:hidden ">
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
            className="w-full h-screen object-cover rounded-l-[42px]"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </div>
    </section>
  );
}
