     "use client"

import Button from "@/components/Button";
import FrontLayout from "@/layout/FrontLayout";
import Image from "next/image";
import DevelopOne from "@/public/images/rocket.png";
import DevelopTwo from "@/public/images/Group.png";
import DevelopThree from "@/public/images/satisfaction.png";
import Js from "@/public/images/javascript.png";
import Title from "@/components/Title";

export default function About(){
    return(
        <FrontLayout>
           <section>
               <div className="aboutHeroSection max-w-main-max-width w-full mx-auto py-36">
                    <div className="heroContent text-center">
                           <h2 className="text-5xl font-bold">Develop your Innovation</h2>
                           <p className="text-lg font-normal my-1">“The innovation consists in seeing what everyone has seen and in thinking what no one has thought.”</p>
                           <Button className="bg-primary-text-color text-white rounded-md my-4">Join With me</Button>
                    </div>

                    <div className="rowDevelop grid grid-cols-3 gap-4 my-5 justify-center">
                          <div className="developOne text-center grid">
                              <div className="img w-20 h-20 mx-auto">
                              <Image
                                src={DevelopOne}
                                alt="developOne"
                                className="w-auto h-auto object-contain"
                                loading="lazy"
                                quality={100}
                                
                              />
                              </div>
                              <Title title="From Zero To One" className="text-primary-text-color font-bold text-4xl mt-6" />
                          </div>
                          <div className="developThree text-center grid">
                          <div className="img w-20 h-20 mx-auto">
                              <Image
                                src={DevelopTwo}
                                alt="developOne"
                                className="w-auto h-auto object-contain"
                                loading="lazy"
                                quality={100}
                              />
                              </div>
                              <Title title="One Level Up" className="text-primary-text-color font-bold text-4xl min-h-10 mt-6" />
                          </div>
                          <div className="developOne text-center grid">
                          <div className="img w-20 h-20 mx-auto">
                              <Image
                                src={DevelopThree}
                                alt="developOne"
                                className="w-auto h-auto object-contain"
                                loading="lazy"
                                quality={100}
                              />
                              </div>
                              <Title title="Your Satisfaction" className="text-primary-text-color font-bold text-4xl mt-6" />
                          </div>
                    </div>
               </div>
           </section>

          <section>
          <div className="sectionUsed max-w-main-max-width w-full mx-auto py-8">
                  <Title title="Technology I Work" className="font-bold text-4xl text-center" />

                  <div className="technologyIcon my-8 ">
                    <ul className="flex">
                       <li> <Image src={Js} alt="js" width={80} height={80} quality={100} /></li>
                    </ul>
                     
                  </div>
            </div>
          </section>
        </FrontLayout>
    )
}