"use client"

import FrontLayout from "layout/FrontLayout";
import Image from "next/image";
import Profile from "../public/images/programmer.png";
import aboutBg from "../public/images/programmerAbout.png";
import Button from "components/Button";
import Link from "next/link";
import { FaLinkedin } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";
import Title from "components/Title";
import ProgressBar from "components/ProgressBar";


export default function Home() {
  return (
    <>
      <FrontLayout>
        <main>
          <section className="heroSection">
            <div className="heroContent max-w-main-max-width mx-auto w-full py-28">
              <div className="heroContainer flex gap-x-8">
                <div className="personalDetails font-poppins-semi-bold w-1/2">
                  <h6 className="text-2xl font-poppins">Hi I am</h6>
                  <h5 className="text-primary-text-color font-poppins text-3xl ">Uttam Pun</h5>
                  <h2 className="text-7xl font-poppins ">Front End</h2>
                  <h2 className="text-7xl font-poppins text-end">Developer</h2>

                  <div className="btnPara font-poppins">
                    <p className="mt-6 mb-7 min-w-fit ">Lorem ipsum dolor sit amet consectetur. Tristique amet sed massa nibh lectus netus in. Aliquet donec morbi convallis pretium. Turpis tempus pharetra</p>
                    <Button className="bg-primary-text-color rounded-md text-white">Hire Me</Button>
                  </div>
                </div>
                <div className="img w-1/2 flex flex-col">
                   <div className="imgProfile">
                   <Image src={Profile}
                    alt="profile"
                    className="w-full h-auto float-right"
                    loading="lazy"
                    quality={100}
                    objectFit="contain"
                  />
                   </div>
                  <div className="iconRow flex align-center justify-center  gap-x-4">
                      <Link href="" aria-label="icons"><FaLinkedin /></Link>
                      <Link href="" aria-label="icons"><FaGithub /></Link>
                      <Link href="" aria-label="icons"><FaFacebookSquare /></Link>
                  </div>

                </div>
              </div>
            </div>
          </section>

          <section className="py-16">
            <div className="myServiceContainer max-w-main-max-width mx-auto">
              <div className="headingRow flex items-start justify-between">
                 <div className="aboutImg w-1/3">
                 <Image src={aboutBg}
                    alt="profile"
                    className="w-full h-auto float-right"
                    loading="lazy"
                    quality={100}
                    objectFit="contain"
                  />
                 </div>
                 <div className="aboutDescription w-1/2">
                   <h2 className="text-6xl font-semibold font-poppins">About Me</h2>
                   <p className="mt-6 mb-7 min-w-fit ">Lorem ipsum dolor sit amet consectetur. Tristique amet sed massa nibh lectus netus in. Aliquet donec morbi convallis pretium. Turpis tempus pharetra</p>
                   <div className="skillList">
                    
                     <div className="react">
                        <Title title="React" className="text-2xl font-medium font-poppins" />
                        <ProgressBar value={85} maxValue={100} className={`bg-primary-color w-full rounded-md`} />
                     </div>
                     <div className="nextjs">
                        <Title title="Nextjs" className="text-2xl font-medium font-poppins" />
                        <ProgressBar value={70} maxValue={100} className={`bg-primary-color w-full rounded-md`} />
                     </div>
                   
                     <div className="laravel">
                        <Title title="Laravel" className="text-2xl font-medium font-poppins" />
                        <ProgressBar value={75} maxValue={100} className={`bg-primary-color w-full rounded-md`} />
                     </div>
                     <div className="mysql">
                        <Title title="Mysql" className="text-2xl font-medium font-poppins" />
                        <ProgressBar value={70} maxValue={100} className={`bg-primary-color w-full rounded-md`} />
                     </div>
                     <div className="git">
                        <Title title="Git" className="text-2xl font-medium font-poppins" />
                        <ProgressBar value={80} maxValue={100} className={`bg-primary-color w-full rounded-md`} />
                     </div>
                   </div>
                 </div>
              </div>
            </div>
          </section>
        </main>
      </FrontLayout>
    </>
  );
}
