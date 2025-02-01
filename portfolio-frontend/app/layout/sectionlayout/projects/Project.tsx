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
import { useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";


type reactResponse = {
    id: number,
    name: string,
    image: string,
    link: string,
}

type laravelResponse = {
    id: number,
    name: string,
    image: string,
    link: string,
}

type allProjectsResponse = {
    id: number,
    name: string,
    image: string,
    link: string,
}



export default function Project() {

    const url = process.env.NEXT_PUBLIC_API_URL;

    const [react, setReact] = useState<reactResponse[]>([]);
    const [laravel, setLaravel] = useState<laravelResponse[]>([]);
    const [all_projects, setAllProjects] = useState<allProjectsResponse[]>([]);

    const fetchUsers = async () => {
        const response = await axios.get(`${url}/api/home`);

        setReact(response.data.react);
        setLaravel(response.data.laravel);
        setAllProjects(response.data.all_projects);
        return response;
    }



    const { isLoading, isError, error } = useQuery({
        queryFn: fetchUsers,
        queryKey: ["react", "laravel", "all_projects"],
        refetchOnWindowFocus: false,
        staleTime: 30000
    })

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

                                    {
                                        all_projects.map((item: allProjectsResponse, index) => (
                                            <Card className=" px-4 rounded-md cursor-pointer" key={index}>

                                                <div className="image bg-bg-card" >
                                                    <img src={`${url}/storage/${item.image}`}  alt="saintstream"   />
                                                </div>
                                                <div className="detail grid gap-y-1 text-left my-1 text-2xl font-poppins font-bold">
                                                    <h6 className="text-primary-text-color font-poppins text-lg font-">{item.name}</h6>
                                                    <p className="text-wrap"> Fullstack Authentication Movie App</p>
                                                    <Button className="bg-primary-text-color !p-2 text-white rounded-md w-24 text-lg font-poppins">  <Link href={item.link} aria-label="movie-app" className="text-base font-normal" target="__blank">View</Link></Button>
                                                </div>


                                            </Card>
                                        ))
                                    }



                                </div>

                            </TabPanel>
                            <TabPanel>

                                {/* react */}
                                <div className="projectGrid grid grid-cols-3 max-md:grid max-md:grid-cols-1 max-md:gap-y-4 gap-x-4 my-4">
                                    {
                                        react.map((item: reactResponse, index) => (
                                            <Card className=" px-4 rounded-md cursor-pointer" key={index}>

                                                <div className="image bg-bg-card" >
                                                    <img src={`${url}/storage/${item.image}`}  alt="saintstream"  />
                                                </div>
                                                <div className="detail grid gap-y-1 text-left my-1 text-2xl font-poppins font-bold">
                                                    <h6 className="text-primary-text-color font-poppins text-lg font-">{item.name}</h6>
                                                    <p className="text-wrap"> Fullstack Authentication Movie App</p>
                                                    <Button className="bg-primary-text-color !p-2 text-white rounded-md w-24 text-lg font-poppins">  <Link href={item.link} aria-label="movie-app" className="text-base font-normal" target="__blank">View</Link></Button>
                                                </div>


                                            </Card>
                                        ))
                                    }


                                </div>
                            </TabPanel>


                            <TabPanel>
                                {/* laravel */}
                                <div className="projectGrid grid grid-cols-3 max-md:grid max-md:grid-cols-1 max-md:gap-y-4 gap-x-4 my-4">
                                    {
                                        laravel.map((item: laravelResponse, index) => (
                                            <Card className=" px-4 rounded-md" key={index}> 
                                                <div className="image bg-bg-card" >
                                                    <img src={`${url}/storage/${item.image}`}  alt="saintstream"  />
                                                </div>
                                                <div className="detail grid gap-y-1 text-left my-1 text-2xl font-bold">
                                                    <h6 className="text-primary-text-color  text-lg font-">{item.name}</h6>
                                                    <p className="text-wrap">{item.name}</p>
                                                    <Button className="bg-primary-text-color !p-2 text-white rounded-md w-24 text-lg font-normal"> <Link href={item.link} aria-label="movie-app" className="text-base font-normal" target="__blank">View</Link></Button>
                                                </div>
                                            </Card>
                                        ))
                                    }
                                   
                                </div>
                            </TabPanel>

                        </Tabs>
                    </div>
                </div>
            </div>
        </section>
    )
}