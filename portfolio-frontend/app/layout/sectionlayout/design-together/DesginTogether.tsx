"use client"

import Button from "components/Button"
import Input from "components/Input"
import Title from "components/Title"
import useApi from "hooks/useApi"
import { FormProvider, SubmitHandler, useForm } from "react-hook-form"

type formData = {
    email: string
}

export default function DesignTogether() {

    const methods = useForm({
        defaultValues: {
            email: ""
        }
    });

    const url = process.env.NEXT_PUBLIC_API_URL;

    const { postData } = useApi<formData>(`${url}/api/contact`)



    const onSubmit: SubmitHandler<formData> = async (data) => {
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
        <div className="designTogether pb-32">
            <div className="designContainer max-w-main-max-width mx-auto w-full text-center">
                <div className="discuss max-w-[932px] mx-auto w-full px-8 ">
                    <Title title="Lets Design Together" className="text-6xl font-bold max-md:text-4xl" />

                    <p className=" text-lg font-normal my-6 min-w-fit text-wrap">Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti dolore ad et autem inventore impedit commodi laboriosam iusto sequi a!</p>

                </div>

                <div className="email max-w-[879px] mx-auto w-full">
                    <FormProvider {...methods}>
                        <form className="w-full flex gap-x-4 max-md:flex-wrap max-md:p-5" onSubmit={methods.handleSubmit(onSubmit)}>
                            <Input type="email"

                                placeholder="Enter Your Email"
                                className={{ input: "rounded-md bg-bg-secondary p-2 flex-1 max-md:w-full" }}
                                {...methods.register("email")}
                                required={true}
                            />
                            <Button className="bg-primary-text-color !py-1 !px-2 w-fit rounded-md text-white font-bold max-md:mt-5 max-md:w-full">Contact Me</Button>
                        </form>
                    </FormProvider>
                </div>
            </div>
        </div>
    )
}