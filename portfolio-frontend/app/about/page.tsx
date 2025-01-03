     "use client"


import FrontLayout from "layout/FrontLayout";
import Image from "next/image";
import DevelopOne from "public/images/rocket.png";
import DevelopTwo from "public/images/Group.png";
import DevelopThree from "public/images/satisfaction.png";
import Js from "public/images/javascript.png";

import React from "public/images/react.png";
import Php from "public/images/php.png";
import Mysql from "public/images/mysql.png";
import Wordpress from "public/images/wordpress.png";
import Button from "components/Button";
import Title from "components/Title";


export default function About(){
    return(
        <FrontLayout>
           <section>
               <div className="aboutHeroSection max-w-main-max-width w-full mx-auto pt-36 pb-24">
                    <div className="heroContent text-center">
                           <h2 className="text-5xl font-bold">Develop your Innovation</h2>
                           <p className="text-lg font-normal my-1">“The innovation consists in seeing what everyone has seen and in thinking what no one has thought.”</p>
                           <Button className="bg-primary-text-color text-white rounded-md my-4">Join With me</Button>
                    </div>

                    <div className="rowDevelop grid grid-cols-3 gap-4 my-5 justify-center">
                          <div className="developOne text-center">
                              <div className="img w-10 h-20 mx-auto">
                              <Image
                                src={DevelopOne}
                                alt="developOne"
                                className="w-auto h-auto object-contain"
                                loading="lazy"
                                quality={100}
                                
                              />
                              </div>
                              <Title title="From Zero To One" className="text-primary-text-color font-bold text-4xl mb-2" />
                              <p className="min-h-fit max-h-fit">
                              We are an Information and Communication Technology (ICT) company specialized in the design and development of management systems. We combine vertical market expertise with the advantages from innovative technologies, such as Big Data, Social Networking, Cloud Computing, to optimize and integrate processes, applications and devices for customer service.</p>
                          </div>
                          <div className="developThree text-center ">
                             <div className="img w-10 h-20 mx-auto">
                              <Image
                                src={DevelopTwo}
                                alt="developOne"
                                className="w-auto h-auto object-contain"
                                loading="lazy"
                                quality={100}
                              
                              />
                              </div>
                              <Title title="One Level Up" className="text-primary-text-color font-bold text-4xl min-h-10 mb-2" />
                             <p className="min-h-fit max-h-fit">The presence of professionalism coming from the consulting sector and from the most established system integrators, with experience of know-how and complementary backgrounds, has allowed us to create a close, dynamic and reactive team. We believe that innovation is a key for increasing knowledge and developing new business opportunities.</p>
                          </div>
                          <div className="developOne text-center">
                          <div className="img w-10 h-20 mx-auto">
                              <Image
                                src={DevelopThree}
                                alt="developOne"
                                className="w-auto h-auto object-contain"
                                loading="lazy"
                                quality={100}
                              />
                              </div>
                              <Title title="Your Satisfaction" className="text-primary-text-color font-bold text-4xl mb-2" />
                              <p>We experiment with new technologies in our      Industry,    creating  intuitive    and easy-to-use      tools,    improving    user’s experience.  We    support       companies 
                              in this new    way    of     interpreting    the network,      helping    them to      find new business   models    and   providing them with   a      domain    of    new     solutions available today.</p>
                          </div>
                    </div>
               </div>
           </section>

          <section>
          <div className="sectionUsed max-w-main-max-width w-full mx-auto py-8">
                  <Title title="Technology I Work" className="font-bold text-4xl text-center" />

                  <div className="technologyIcon my-8 ">
                    <ul className="flex justify-center items-center gap-x-4">
                       <li> <Image src={Js} alt="js" width={80} height={80} quality={100} /></li>
                       <li> <Image src={React} alt="js" width={80} height={80} quality={100} /></li>
                       <li> <Image src={Php} alt="js" width={80} height={80} quality={100} /></li>
                       <li> <Image src={Mysql} alt="js" width={80} height={80} quality={100} /></li>
                       <li> <Image src={Wordpress} alt="js" width={80} height={80} quality={100} /></li>
                    </ul>
                     
                  </div>
            </div>
          </section>
        </FrontLayout>
    )
}