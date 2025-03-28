"use client"

import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import Button from "components/Button";
import Input from "components/Input";
import Title from "components/Title";
import usePost from "hooks/api/usePost";
import FrontLayout from "layout/FrontLayout";
import React, { useState } from "react";
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

type mapResponse = {
    id: number,
    map_link: string,
}

export default function ContactMe() {

    const url = process.env.NEXT_PUBLIC_API_URL;

    const [map, setMap] = useState<mapResponse[]>([]);

    const fetchMap = async (): Promise<mapResponse[]> => {
        const response = await axios.get(`${url}/api/map-link`);
        setMap(response.data.map);
        return response.data;
    }

    useQuery({
        queryKey: ["map"],
        queryFn: fetchMap,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
    });


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
                <div className="contactContainer max-w-main-max-width mx-auto w-full max-md:my-24 lg:py-20">
                    {/* <Title title="Contact Us" className="text-5xl font-bold text-center" /> */}
                    <div className="contactForm grid grid-cols-2 gap-x-10 max-md:grid-cols-1 max-md:p-5 my-20">
                        <div className="form">
                            <h2 className="text-3xl font-bold">Get in <span className="text-primary-text-color">touch</span></h2>
                            <p className="max-w-fit  my-1">Enim tempor eget pharetra facilisis sed maecenas adipiscing. Eu leo molestie vel, ornare non id blandit netus.</p>
                           <FormProvider {...methods}>
                           <form className="my-8" onSubmit={methods.handleSubmit(onSubmit)}>
                                <Input
                                 type="text" placeholder="Contact Name" 
                                 className={{
                                    input: "focus:outline-none border-b-2 w-full text-lg mb-4 rounded-sm p-1"
                                }}
                                 {...methods.register("contact_name")}
                                 required={true}
                                />
                                <Input type="text" placeholder="Street"
                                 className={{
                                    input: "focus:outline-none border-b-2 w-full text-lg my-4 rounded-sm p-1" }}
                                  {...methods.register("street")}
                                  required={true}
                                  />
                                <div className="flex gap-x-8 my-4">
                                    <Input type="text" placeholder="City" className={{
                                        input: "focus:outline-none border-b-2 w-full text-lg rounded-sm p-1"
                                    }} 
                                    {...methods.register("city")}
                                    required={true}
                                    />
                                    <Input type="text" placeholder="Postal" className={{
                                        input: "focus:outline-none border-b-2 w-full text-lg rounded-sm p-1"
                                    }} 
                                    {...methods.register("postal_code")}
                                    required={true}
                                    />

                                </div>
                                <Input type="number" placeholder="Contact Phone" className={{
                                    input: "focus:outline-none border-b-2 w-full text-lg my-4 rounded-sm p-1"
                                }} 
                                {...methods.register("phone_number")}
                                required={true}
                                />
                                <Input type="email" placeholder="Email"
                                 className={{
                                    input: "focus:outline-none border-b-2 w-full text-lg my-4 rounded-sm p-1"
                                }} 
                                {...methods.register("email")}
                                required={true}
                                />

                                <Input type="text"
                                 placeholder="Let's talk about your idea" className={{
                                    input: "focus:outline-none border-b-2 w-full text-lg my-4 rounded-sm p-1"
                                }} 
                                {...methods.register("message")}
                                required={true}
                                />
                                <Button type="submit" className="bg-primary-text-color text-white rounded-md">Submit</Button>
                            </form>
                            </FormProvider>
                        </div>
                        <div className="map ml-10 max-md:m-0">
                             {
                                 map.map((item: mapResponse) => (
                                     <React.Fragment key={item.id}>
                                        <iframe src={item.map_link} title="map" className="w-full h-full" allowFullScreen></iframe>
                                     </React.Fragment>
                                 ))
                             }
                        </div>
                    </div>
                </div>
            </section>
        </FrontLayout>
    )
}