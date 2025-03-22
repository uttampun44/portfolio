"use client"
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import FrontLayout from "layout/FrontLayout";
import React, { useState } from "react";

type postResponse = {
    id: number,
    title: string,
    mini_title: string,
    tags: string,
    content: string,
    image: File,
}

export default function Blog() {

    const url = process.env.NEXT_PUBLIC_API_URL;
    const [posts, setPosts] = useState<postResponse[]>([]);

    const fetchBlogs = async (): Promise<any> => {
        const response = await axios.get(`${url}/api/blogs`);
        setPosts(response.data.posts);
        return response.data;
    }

    useQuery({
        queryKey: ["posts"],
        queryFn: fetchBlogs,
        refetchOnMount: false,
    });


    return (
        <FrontLayout>
            <div className="blogContainer max-w-main-max-width mx-auto lg:py-20">
                <div className="row flex mb-10">

                    <div className="blogBox  bg-white dark:bg-black dark:border-slate-500 rounded-md p-5 lg:my-20">
                        <div className="grid grid-cols-3 gap-4">
                            {
                                posts.map((post: postResponse) => (
                                    <React.Fragment key={post.id}>
                                       
                                        <div className="grid-One border-[1px] p-5 rounded-lg hover:scale-105 transition-all cursor-pointer">
                                            <div className="blogRow">
                                                <img src={`${url}/storage/${post.image}`} alt="blog image" className="w-full h-auto" style={{ objectFit: "cover", borderRadius: "8px" }} />
                                            </div>
                                            <div className="title my-2">
                                                <h1 className="text-2xl font-bold">{post.title}</h1>
                                            </div>
                                            <div className="blogRow flex justify-between">
                                                <p className="text-[#64607D] text-sm font-medium">{post.mini_title}</p>
                                            </div>
                                        </div>
                                    </React.Fragment>
                                ))
                            }
                        </div>
                    </div>

                </div>
            </div>
        </FrontLayout>
    )
}