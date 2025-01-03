   "use client"

import Button from "components/Button"
import Input from "components/Input"
import Title from "components/Title"


export default function DesignTogether() {

    const handleChange = () =>{

    }
    return (
        <div className="designTogether pb-32">
            <div className="designContainer max-w-main-max-width mx-auto w-full text-center">
                <div className="discuss max-w-[932px] mx-auto w-full px-8 ">
                    <Title title="Lets Design Together" className="text-6xl font-bold " />

                    <p className=" text-lg font-normal my-6 min-w-fit text-wrap">Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti dolore ad et autem inventore impedit commodi laboriosam iusto sequi a!</p>

                </div>

                <div className="email max-w-[879px] mx-auto w-full">
                   <form className="w-full flex gap-x-4">
                     <Input type="email"
                      name="email" 
                      placeholder="Enter Your Email"
                       className={{ input: "rounded-md bg-bg-secondary p-2 flex-1"}} 
                       onChange={handleChange} />
                   <Button className="bg-primary-text-color !py-1 !px-2 w-fit rounded-md text-white font-bold">Contact Me</Button>
                   </form>
                </div>
            </div>
        </div>
    )
}