import Button from "components/Button";
import FrontLayout from "components/FrontLayout";
import Title from "components/Title";
import Image from "next/image";
import Profile from "../public/profile.png";
import Bg from "../public/sectionbg.png";

export default function Home() {
  return (
    <>
      <FrontLayout>
        <main>
          <section className="heroSection">
            <div className="heroContent max-w-main-max-width mx-auto w-full pt-7">
              <div className="gridHero flex relative justify-center h-[690px] -z-10">
                <div className="testimonial w-1/3 absolute top-1/2 left-0 ">
                 <p className="text-lg font-medium"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem,
                 commodi.</p>
                </div>
                <div className="mainDiv text-center relative h-screen ">
                  <Button className="border-[1px] border-black">Hello !</Button>
                  <div className="title font-semibold text-7xl ">
                      <Title title="I'm">
                        <span className="text-[#FFD700]">Uttam</span>
                      </Title>  
                    
                      <Title title="React/Laravel Developer" />

                      <div className="img absolute w-full top-44">
                         <Image 
                         src={Profile} 
                         alt="profile"
                          width={0}
                           height={0}
                            loading="lazy"
                            quality={100}
                            style={{
                              width: "100%",
                              height: "auto",
                              objectFit: "contain",
                            }}
                             />
                             {/* <div className=" inline-block w-[812px] h-[408px] bg-primary-text-color ">

                             </div> */}
                      </div>
                  </div>
                </div>
                <div className="experienceDiv w-48 absolute top-1/2 right-0"> 
                  <div className="experienceContent">
                    <h2 className="text-4xl font-bold">Experience</h2>
                    <p>5 Years</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-main-bg py-28 bg-no-repeat bg-cover" style={{ backgroundImage: `url(${Bg.src})` }}>
             dsadsa
          </section>
        </main>
      </FrontLayout>
    </>
  );
}
