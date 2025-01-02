"use client"

import Button from "components/Button";
import Input from "components/Input";
import Title from "components/Title";
import FrontLayout from "layout/FrontLayout";

export default function ContactMe() {
    return (
        <FrontLayout>
            <section className="py-16">
                <div className="contactContainer max-w-main-max-width mx-auto w-full">
                    <Title title="Contact Us" className="text-5xl font-bold text-center" />
                    <div className="contactForm grid grid-cols-2 my-6">
                        <div className="form">
                            <h2 className="text-3xl font-bold">Get in <span className="text-primary-text-color">touch</span></h2>
                            <p className="max-w-fit  my-1">Enim tempor eget pharetra facilisis sed maecenas adipiscing. Eu leo molestie vel, ornare non id blandit netus.</p>
                            <form className="my-8">
                                <Input type="text" placeholder="Contact Name" className={{
                                    input: "focus:outline-none border-b-2 w-full text-lg mb-4"
                                }} />
                                <Input type="text" placeholder="Street" className={{
                                    input: "focus:outline-none border-b-2 w-full text-lg my-4"
                                }} />
                                <div className="flex gap-x-8 my-4">
                                    <Input type="text" placeholder="City" className={{
                                        input: "focus:outline-none border-b-2 w-full text-lg"
                                    }} />
                                    <Input type="text" placeholder="Postal" className={{
                                        input: "focus:outline-none border-b-2 w-full text-lg"
                                    }} />

                                </div>
                                <Input type="number" placeholder="Contact Phone" className={{
                                    input: "focus:outline-none border-b-2 w-full text-lg my-4"
                                }} />
                                <Input type="email" placeholder="Email" className={{
                                    input: "focus:outline-none border-b-2 w-full text-lg my-4"
                                }} />

                                <Input type="text" placeholder="Let's talk about your idea" className={{
                                    input: "focus:outline-none border-b-2 w-full text-lg my-4"
                                }} />
                                <Button type="submit" className="bg-primary-text-color text-white rounded-md">Submit</Button>
                            </form>
                        </div>
                        <div className="map">

                        </div>
                    </div>
                </div>
            </section>
        </FrontLayout>
    )
}