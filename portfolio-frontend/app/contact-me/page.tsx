"use client"

import { useMutation } from "@tanstack/react-query";
import Button from "components/Button";
import Input from "components/Input";
import Title from "components/Title";
import usePost from "hooks/api/usePost";
import FrontLayout from "layout/FrontLayout";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";


type contatcForm={
    contact_name:string,
    street:string,
    city:string,
    postal_code:string,
    phone_number:string,
    email:string,
    message:string
}
export default function ContactMe() {

    const methods = useForm<contatcForm>({
        defaultValues:{
          contact_name: "",
          street: "",
          city: "",
          postal_code: "",
          phone_number: "",
          email: "",
        }
    })
    
    const {postData} = usePost<contatcForm>(`${process.env.NEXT_PUBLIC_API_URL}/api/contact-me`);

    const mutation = useMutation({
        mutationFn: (data: contatcForm) => postData(data),
        onSuccess: () => {
            toast.success("Message sent successfully");
        },
        onError: () => {
            toast.error("Message not sent");
        }
    })

    const onSubmit: SubmitHandler<contatcForm> = async (data) => {
        console.log(data)
         try {
            mutation.mutate(data);
             
         } catch (error) {
            if (error instanceof Error) {
                console.error('Error fetching data:', error.message);
              } else {
                console.error('Unknown error occurred while fetching data.');
              }
         }
    }
    return (
        <FrontLayout>
            <section className="py-16">
                <div className="contactContainer max-w-main-max-width mx-auto w-full">
                    <Title title="Contact Us" className="text-5xl font-bold text-center" />
                    <div className="contactForm grid grid-cols-2 max-md:grid-cols-1 max-md:p-5 my-6">
                        <div className="form">
                            <h2 className="text-3xl font-bold">Get in <span className="text-primary-text-color">touch</span></h2>
                            <p className="max-w-fit  my-1">Enim tempor eget pharetra facilisis sed maecenas adipiscing. Eu leo molestie vel, ornare non id blandit netus.</p>
                           <FormProvider {...methods}>
                           <form className="my-8" onSubmit={methods.handleSubmit(onSubmit)}>
                                <Input
                                 type="text" placeholder="Contact Name" 
                                 className={{
                                    input: "focus:outline-none border-b-2 w-full text-lg mb-4"
                                }}
                                 {...methods.register("contact_name")}
                            
                                />
                                <Input type="text" placeholder="Street"
                                 className={{
                                    input: "focus:outline-none border-b-2 w-full text-lg my-4" }}
                                  {...methods.register("street")}
                                   
                                  />
                                <div className="flex gap-x-8 my-4">
                                    <Input type="text" placeholder="City" className={{
                                        input: "focus:outline-none border-b-2 w-full text-lg"
                                    }} 
                                    {...methods.register("city")}
                                    />
                                    <Input type="text" placeholder="Postal" className={{
                                        input: "focus:outline-none border-b-2 w-full text-lg"
                                    }} 
                                    {...methods.register("postal_code")}
                                    />

                                </div>
                                <Input type="number" placeholder="Contact Phone" className={{
                                    input: "focus:outline-none border-b-2 w-full text-lg my-4"
                                }} 
                                {...methods.register("phone_number")}
                                />
                                <Input type="email" placeholder="Email"
                                 className={{
                                    input: "focus:outline-none border-b-2 w-full text-lg my-4"
                                }} 
                                {...methods.register("email")}
                                />

                                <Input type="text"
                                 placeholder="Let's talk about your idea" className={{
                                    input: "focus:outline-none border-b-2 w-full text-lg my-4"
                                }} 
                                {...methods.register("message")}
                                />
                                <Button type="submit" className="bg-primary-text-color text-white rounded-md">Submit</Button>
                            </form>
                            </FormProvider>
                        </div>
                        <div className="map">

                        </div>
                    </div>
                </div>
            </section>
        </FrontLayout>
    )
}