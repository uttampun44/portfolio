"use client"

import Button from "components/Button";
import Input from "components/Input";
import Title from "components/Title";
import usePost from "hooks/api/usePost";
import FrontLayout from "layout/FrontLayout";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";


type contatcForm={
    contact_name:string,
    street:string,
    city:string,
    postal:string,
    phone:number,
    email:string,
    message:string
}
export default function ContactMe() {

    const methods = useForm<contatcForm>({
        defaultValues:{
          contact_name: "",
          street: "",
          city: "",
          postal: "",
          phone: 9814436510,
          email: "",
        }
    })
    
    const {postData} = usePost<contatcForm>(`${process.env.NEXT_PUBLIC_API_URL}/api/contact`);

    const onSubmit: SubmitHandler<contatcForm> = async (data) => {
         try {
            const response = await postData(data);
            console.log(response);
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
                                    {...methods.register("postal")}
                                    />

                                </div>
                                <Input type="number" placeholder="Contact Phone" className={{
                                    input: "focus:outline-none border-b-2 w-full text-lg my-4"
                                }} 
                                {...methods.register("phone")}
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