"use client"

import FrontLayout from "layout/FrontLayout";
import Image from "next/image";
import Profile from "../public/images/profile.png";
import Button from "components/Button";
import Link from "next/link";
import { FaLinkedin } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";
import About from "layout/sectionlayout/about/About";
import Project from "layout/sectionlayout/projects/Project";
import DesignTogether from "layout/sectionlayout/design-together/DesginTogether";



export default function Home() {
  return (
    <>
      <FrontLayout>
        <main>
          <section className="heroSection">
            <div className="heroContent max-w-main-max-width mx-auto w-full pt-28 pb-16">
              <div className="heroContainer flex gap-x-8 justify-between">
                <div className="personalDetails  w-1/2 pt-24">
                  <h6 className="text-2xl ">Hi I am</h6>
                  <h5 className="text-primary-text-color  text-3xl ">Uttam Pun</h5>
                  <h2 className="text-7xl ">Front End</h2>
                  <h2 className="text-7xl text-end">Developer</h2>

                  <div className="btnPara">
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
                  <div className="iconRow flex align-center justify-center  gap-x-4 my-4">
                      <Link href="" aria-label="icons"><FaLinkedin /></Link>
                      <Link href="" aria-label="icons"><FaGithub /></Link>
                      <Link href="" aria-label="icons"><FaFacebookSquare /></Link>
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
