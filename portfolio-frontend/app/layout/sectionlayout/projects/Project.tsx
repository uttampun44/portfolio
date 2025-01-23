"use client"

import Image from "next/image";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import Sainstream from "public/images/saintstream.png";
import Exclusive from "public/images/exclusivestore.png";
import Office from "public/images/Office.png"
import Amazon from "public/images/amazonprime.png";
import Link from "next/link";
import Title from "components/Title";
import Card from "components/Card";
import Button from "components/Button";


export default function Project() {
    return (
        <section className="my-32">
            <div className="projectContainer max-w-main-max-width mx-auto w-full text-center">
                <Title title="My Projects" className="text text-6xl font-semibold" />
                <p className="my-4 font-normal">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero, harum.</p>

                <div className="projectTab">
                    <div className="tabsRow">
                        <Tabs >
                            <TabList className="flex justify-center gap-x-4 cursor-pointer font-medium" >
                                <Tab className="bg-bg-secondary py-1 px-4 rounded-md ">All</Tab>
                                <Tab className="bg-bg-secondary py-1 px-4 rounded-md ">React</Tab>
                                <Tab className="bg-bg-secondary py-1 px-4 rounded-md ">Laravel</Tab>
                            </TabList>

                            <TabPanel>
                                {/* all */}
                                <div className="projectGrid grid grid-cols-3 gap-4 my-4 max-md:grid max-md:grid-cols-1 max-md:gap-y-4">
                                   
                                <Card className=" px-4 rounded-md cursor-pointer">
                                        <div className="image bg-bg-card">

                                            <Image src={Sainstream} loading="lazy" alt="saintstream" quality={100} layout="responsive" width={200} height={200} />
                                        </div>
                                        <div className="detail grid gap-y-1 text-left my-1 text-2xl font-poppins font-bold">
                                            <h6 className="text-primary-text-color font-poppins text-lg font-">React / Laravel</h6>
                                            <p className="text-wrap"> Fullstack Authentication Movie App</p>
                                            <Button className="bg-primary-text-color !p-2 text-white rounded-md w-24 text-lg font-poppins">  <Link href="https://saintstream-eight.vercel.app/" aria-label="movie-app" className="text-base font-normal" target="__blank">View</Link></Button>
                                        </div>


                                    </Card>
                                    <Card className=" px-4 rounded-md cursor-pointer">
                                        <div className="image bg-bg-card">

                                            <Image src={Exclusive} loading="lazy" alt="saintstream" quality={100} layout="responsive" width={200} height={200} />
                                        </div>
                                        <div className="detail grid gap-y-1 text-left my-1 text-2xl font-poppins font-bold">
                                            <h6 className="text-primary-text-color font-poppins text-lg font-">React / Node</h6>
                                            Fullstack Ecommerce
                                            <Button className="bg-primary-text-color !p-2 text-white rounded-md w-24 text-lg font-poppins">  <Link href="https://exclusivestore-front.onrender.com/" aria-label="movie-app" className="text-base font-normal" target="__blank">View</Link></Button>
                                        </div>


                                    </Card>

                                    <Card className=" px-4 rounded-md cursor-pointer">
                                        <div className="image bg-bg-card">

                                            <Image src={Amazon} loading="lazy" alt="saintstream" quality={100} layout="responsive" width={200} height={200} />
                                        </div>
                                        <div className="detail grid gap-y-1 text-left my-1 text-2xl font-poppins font-bold">
                                            <h6 className="text-primary-text-color font-poppins text-lg font-">React</h6>
                                            React Amazon Clone
                                            <Button className="bg-primary-text-color !p-2 text-white rounded-md w-24 text-lg font-poppins"> <Link href="https://prime-clone-1884d.web.app/" aria-label="movie-app" className="text-base font-normal" target="__blank">View</Link></Button>
                                        </div>


                                    </Card>
                                    <Card className=" px-4 rounded-md cursor-pointer">
                                        <div className="image bg-bg-card">

                                            <Image src={Office} loading="lazy" alt="saintstream" quality={100} layout="responsive" width={200} height={200} />
                                        </div>
                                        <div className="detail grid gap-y-1 text-left my-1 text-2xl font-poppins font-bold">
                                            <h6 className="text-primary-text-color font-poppins text-lg font-">Laravel</h6>
                                            <p className="text-wrap">Laravel CMS</p>
                                            <Button className="bg-primary-text-color !p-2 text-white rounded-md w-24 text-lg font-normal font-poppins"> <Link href="https://brightit.com.np/" aria-label="movie-app" className="text-base font-normal" target="__blank">View</Link></Button>
                                        </div>


                                    </Card>
                                </div>
                                
                            </TabPanel>
                            <TabPanel>

                                {/* react */}
                                <div className="projectGrid grid grid-cols-3 max-md:grid max-md:grid-cols-1 max-md:gap-y-4 gap-x-4 my-4">
                                    <Card className=" px-4 rounded-md cursor-pointer">
                                        <div className="image bg-bg-card">

                                            <Image src={Sainstream} loading="lazy" alt="saintstream" quality={100} layout="responsive" width={200} height={200} />
                                        </div>
                                        <div className="detail grid gap-y-1 text-left my-1 text-2xl font-poppins font-bold">
                                            <h6 className="text-primary-text-color font-poppins text-lg font-">React / Laravel</h6>
                                            <p className="text-wrap"> Fullstack Authentication Movie App</p>
                                            <Button className="bg-primary-text-color !p-2 text-white rounded-md w-24 text-lg font-poppins">  <Link href="https://saintstream-eight.vercel.app/" aria-label="movie-app" className="text-base font-normal" target="__blank">View</Link></Button>
                                        </div>


                                    </Card>
                                    <Card className=" px-4 rounded-md cursor-pointer">
                                        <div className="image bg-bg-card">

                                            <Image src={Exclusive} loading="lazy" alt="saintstream" quality={100} layout="responsive" width={200} height={200} />
                                        </div>
                                        <div className="detail grid gap-y-1 text-left my-1 text-2xl font-bold">
                                            <h6 className="text-primary-text-color text-lg font-">React / Node</h6>
                                            Fullstack Ecommerce
                                            <Button className="bg-primary-text-color !p-2 text-white rounded-md w-24 text-lg">  <Link href="https://exclusivestore-front.onrender.com/" aria-label="movie-app" className="text-base font-normal" target="__blank">View</Link></Button>
                                        </div>


                                    </Card>

                                    <Card className=" px-4 rounded-md cursor-pointer">
                                        <div className="image bg-bg-card">

                                            <Image src={Amazon} loading="lazy" alt="saintstream" quality={100}  layout="responsive" width={200} height={200} />
                                        </div>
                                        <div className="detail grid gap-y-1 text-left my-1 text-2xl font-bold">
                                            <h6 className="text-primary-text-color text-lg font-">React</h6>
                                            React Amazon Clone
                                            <Button className="bg-primary-text-color !p-2 text-white rounded-md w-24 text-lg"> <Link href="https://prime-clone-1884d.web.app/" aria-label="movie-app" className="text-base font-normal" target="__blank">View</Link></Button>
                                        </div>
                                    </Card>
                                </div>
                            </TabPanel>
                            

                            <TabPanel>
                                {/* laravel */}
                                <div className="projectGrid grid grid-cols-3 max-md:grid max-md:grid-cols-1 max-md:gap-y-4 gap-x-4 my-4">
                                    <Card className=" px-4 rounded-md">
                                        <div className="image bg-bg-card">

                                            <Image src={Office} loading="lazy" alt="saintstream" quality={100} layout="responsive" width={200} height={200} />
                                        </div>
                                        <div className="detail grid gap-y-1 text-left my-1 text-2xl font-bold">
                                            <h6 className="text-primary-text-color  text-lg font-">Laravel</h6>
                                            <p className="text-wrap">Laravel CMS</p>
                                            <Button className="bg-primary-text-color !p-2 text-white rounded-md w-24 text-lg font-normal"> <Link href="https://brightit.com.np/" aria-label="movie-app" className="text-base font-normal" target="__blank">View</Link></Button>
                                        </div>


                                    </Card>
                                </div>
                            </TabPanel>

                        </Tabs>
                    </div>
                </div>
            </div>
        </section>
    )
}