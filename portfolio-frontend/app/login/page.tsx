       "use client"
 
import Button from "components/Button";
import Input from "components/Input";
import Title from "components/Title";
import LoginImage from "public/images/loginImage.png";
import Image from "next/image";
import { SubmitHandler, useForm } from "react-hook-form";
import Link from "next/link";
import Google from "public/images/google.png";
import Github from "public/images/github.png";


interface loginForm{
    email:string,
    password:string,
}

export default function Login(){

    const {handleSubmit, register, setError, clearErrors, reset, resetField} = useForm<loginForm>()

    const onSubmit: SubmitHandler<loginForm> = () =>{

    }
    return(
        <section className="signup">
            
      <div className="signupContainer flex flex-col md:flex-row">

       
        <div className="form w-full md:w-1/2 py-40 px-44">
       
        
        <Title title="Welcome back !" className="text-2xl font-bold mb-3"/>
         
         <p className="text-base font-medium">Enter your Credentials to access your account</p>
         <form onSubmit={handleSubmit(onSubmit)} className="mb-8 mt-10">
           
               <Input type="email"
             {...register("email")}
              label="Email"
              className={{label: "block font-medium", input: "w-full focus:outline-none mb-2 py-1 px-2 border-2 border-bg-secondary rounded-md"}}
              placeholder="Enter Your Email"
              compulsary={true}
              />
               <Input type="password"
             {...register("password")}
              label="Password" 
              className={{label: "block font-medium", input: "w-full focus:outline-none mb-2 py-1 px-2 border-2 border-bg-secondary rounded-md"}}
              placeholder="Enter Your Password"
              compulsary={true}
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

         <div className="or flex items-center gap-x-1 my-10">
             <hr className="h-[1px] border-2 border-bg-bg-fourth w-full"></hr><span>or</span><hr className="h-[1px] border-2 border-bg-bg-fourth w-full"></hr>
         </div>
         <div className="signup flex justify-between gap-x-2">
            <Button className="flex gap-x-1 items-center border-2 border-bg-bg-fourth rounded-md md:w-1/2"><Image src={Google} alt="google" />Signup with Google</Button>
            <Button className="flex gap-x-1 items-center border-2 border-bg-bg-fourth rounded-md md:w-1/2"><Image src={Github} alt="google" width={24} height={24} objectFit="contain" />Signup with Github</Button>
         </div>

         <div className="haveAccount text-center my-2 text-primary-text-color text-lg font-medium">
            <span>Have an account ? </span><Link href="/sign-up" className="text-blue-700">Signup</Link> Or <Link href="/" aria-label="home" className=" text-blue-700 text-center">Home</Link>
         </div>
          
        
        </div>
        <div className="image w-full md:w-1/2 relative">
          <div className="overlay absolute w-full h-full inset-0 bg-main-bg opacity-70 rounded-l-[42px]"></div>
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
    )
}