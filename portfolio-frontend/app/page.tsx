"use client"

import FrontLayout from "layout/FrontLayout";
import Image from "next/image";
import Profile from "public/images/profile.png";
import Link from "next/link";
import { FaLinkedin } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";
import About from "layout/sectionlayout/about/About";
import Project from "layout/sectionlayout/projects/Project";
import DesignTogether from "layout/sectionlayout/design-together/DesginTogether";
import Button from "components/Button";



export default function Home() {
  return (
    <>
      <FrontLayout>
        <main>
          <section className="heroSection">
            <div className="heroContent max-w-main-max-width mx-auto w-full pt-28 pb-16 max-md:pt-16 max-md:pb-10">
              <div className="heroContainer flex gap-x-8 justify-between max-md:flex-wrap max-md:p-5">
                <div className="personalDetails  w-1/2 pt-24 max-md:pt-0 max-md:w-full">
                  <h6 className="text-2xl ">Hi I am</h6>
                  <h5 className="text-primary-text-color  text-3xl  font-bold">Uttam Pun</h5>
                  <h2 className="text-7xl  font-bold max-md:text-4xl">Front End</h2>
                  <h2 className="text-7xl text-end font-bold max-md:text-4xl">Developer</h2>

                  <div className="btnPara">
                    <p className="mt-6 mb-7 min-w-fit ">Lorem ipsum dolor sit amet consectetur. Tristique amet sed massa nibh lectus netus in. Aliquet donec morbi convallis pretium. Turpis tempus pharetra</p>
                    <Button className="bg-primary-text-color rounded-md text-white">Hire Me</Button>
                  </div>
                </div>
                <div className="img w-1/2 flex flex-col max-md:w-full max-md:mt-5">
                   <div className="imgProfile">
                   <Image src={Profile}
                    alt="profile"
                    className="w-full h-auto float-right object-contain"
                    quality={100}
                    priority={true}
                  />
                   </div>
                  <div className="iconRow flex align-center justify-center text-xl  gap-x-4 my-4">
                      <Link href="https://www.linkedin.com/in/uttam-pun-35a533194/" aria-label="icons" target="__blank"><FaLinkedin /></Link>
                      <Link href="https://github.com/uttampun44/" aria-label="icons" target="__blank"><FaGithub /></Link>
                      <Link href="https://www.facebook.com/upun3" aria-label="icons" target="__blank"><FaFacebookSquare /></Link>
                  </div>

                </div>
              </div>
            </div>
          </section>

         <About />
         <Project />
         <DesignTogether />
        </main>
      </FrontLayout>
    </>
  );
}
