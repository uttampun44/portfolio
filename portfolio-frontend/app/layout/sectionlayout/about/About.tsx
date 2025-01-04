   
      "use client"
import ProgressBar from "components/ProgressBar";
import Title from "components/Title";
import Image from "next/image";
import aboutBg from "public/images/programmerAbout.png";


export default function About(){
    return(
        <section className="py-16">
<div className="myServiceContainer max-w-main-max-width mx-auto">
  <div className="headingRow flex items-start justify-between max-md:flex-wrap max-md:p-5">
     <div className="aboutImg w-1/3 max-md:w-full">
     <Image src={aboutBg}
        alt="profile"
        className="w-full h-auto float-right object-contain"
        loading="lazy"
        quality={100}
        
      />
     </div>
     <div className="aboutDescription w-1/2 max-md:w-full max-md:mt-5">
       <h2 className="text-6xl font-semibold">About Me</h2>
       <p className="mt-6 mb-7 min-w-fit ">Lorem ipsum dolor sit amet consectetur. Tristique amet sed massa nibh lectus netus in. Aliquet donec morbi convallis pretium. Turpis tempus pharetra</p>
       <div className="skillList">
        
         <div className="react">
            
            <Title  title="React" className="text-2xl font-semibold"/>
            <ProgressBar value={85} maxValue={100} className={`bg-primary-color w-full rounded-md`} />
         </div>
         <div className="nextjs">
            <Title title="Nextjs" className="text-2xl font-semibold" />
            <ProgressBar value={70} maxValue={100} className={`bg-primary-color w-full rounded-md`} />
         </div>
       
         <div className="laravel">
            <Title title="Laravel" className="text-2xl font-semibold" />
            <ProgressBar value={75} maxValue={100} className={`bg-primary-color w-full rounded-md`} />
         </div>
         <div className="mysql">
            <Title title="Mysql" className="text-2xl font-semibold" />
            <ProgressBar value={70} maxValue={100} className={`bg-primary-color w-full rounded-md`} />
         </div>
         <div className="git">
            <Title title="Git" className="text-2xl font-semibold" />
            <ProgressBar value={80} maxValue={100} className={`bg-primary-color w-full rounded-md`} />
         </div>
       </div>
     </div>
  </div>
</div>
</section>
    )
}