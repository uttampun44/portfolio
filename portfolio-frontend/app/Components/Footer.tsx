import { navData } from "data/NavData/Navdata";
import Link from "next/link";
import { FaLinkedin } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";


export default function Footer(){
    return(
        <>
           <footer>
              <section className="footer-section bg-bg-fourth py-16">
              <div className="footerContainer max-w-[809px] mx-auto w-full ">
                  <div className="link flex justify-between items-center font-poppins font-medium">
                     {
                        navData.map((link, index:number) => (
                            <Link key={index} href={link.link} aria-label={link.name}>{link.name}</Link>
                        ))
                     }
                  </div>
                  <div className="iconRow flex align-center justify-center text-xl gap-x-8 my-4">
                      <Link href="https://www.linkedin.com/in/uttam-pun-35a533194/" aria-label="icons" target="__blank"><FaLinkedin  /></Link>
                      <Link href="https://github.com/uttampun44/" aria-label="icons" target="__blank"><FaGithub  /></Link>
                      <Link href="https://www.facebook.com/upun3" aria-label="icons" target="__blank"><FaFacebookSquare  /></Link>
                  </div>
              </div>
              </section>
              <div className="copyrights bg-[#545454] text-white py-8 text-center">
                    <p className="font-normal">© 2023 Uttam Pun, All Rights Reserved, Inc.</p>
              </div>
           </footer>
        </>
    )
}