     "use client"

import Button from "@/components/Button";
import Title from "@/components/Title";
import FrontLayout from "@/layout/FrontLayout";
import Image from "next/image";
import DevelopOne from "@/public/images/rocket.png";
import DevelopTwo from "@/public/images/Group.png";
import DevelopThree from "@/public/images/satisfaction.png";

export default function About(){
    return(
        <FrontLayout>
           <section>
               <div className="aboutHeroSection max-w-main-max-width w-full mx-auto py-48">
                    <div className="heroContent text-center">
                           <h2 className="text-5xl font-bold">Develop your Innovation</h2>
                           <p className="text-lg font-normal my-1">“The innovation consists in seeing what everyone has seen and in thinking what no one has thought.”</p>
                           <Button className="bg-primary-text-color text-white rounded-md my-4">Join With me</Button>
                    </div>

                    <div className="rowDevelop grid grid-cols-3 gap-4 justify-center">
                          <div className="developOne text-center">
                              <Image
                                src={DevelopOne}
                                alt="developOne"
                                className="w-auto h-auto object-contain"
                                loading="lazy"
                                quality={100}
                                
                              />
                              <Title title="From Zero To One" className="text-primary-text-color font-bold text-4xl" />
                          </div>
                          <div className="developThree text-center">
                              <Image
                                src={DevelopTwo}
                                alt="developOne"
                                className="w-auto h-auto object-contain"
                                loading="lazy"
                                quality={100}
                              />
                              <Title title="From Zero To One" className="text-primary-text-color font-bold text-4xl" />
                          </div>
                          <div className="developOne text-center">
                              <Image
                                src={DevelopThree}
                                alt="developOne"
                                className="w-auto h-auto object-contain"
                                loading="lazy"
                                quality={100}
                              />
                              <Title title="From Zero To One" className="text-primary-text-color font-bold text-4xl" />
                          </div>
                    </div>
               </div>
           </section>
        </FrontLayout>
    )
}