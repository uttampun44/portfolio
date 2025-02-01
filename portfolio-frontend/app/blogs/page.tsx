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
        refetchOnWindowFocus: false,
        refetchOnMount: false,
    });


    return (
        <FrontLayout>
            <div className="blogContainer max-w-main-max-width mx-auto">
                <div className="row flex">

                    <div className="blogBox  bg-white rounded-md p-5">
                        <div className="grid grid-cols-3 gap-4">
                            {
                                posts.slice(0, 2).map((post: postResponse) => (
                                    <React.Fragment key={post.id}>
                                        <div className="grid-one">
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

                                        <div className="grid-Two">
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
                            <div className="gridThree">
                                <div className="blogRow">
                                    {/* <img src={`${url}/storage/${post.image}`} alt="blog image" className="w-full h-auto" style={{ objectFit: "cover", borderRadius: "8px" }} /> */}
                                </div>
                                <div className="title my-2">
                                    {/* <h1 className="text-2xl font-bold">{post.title}</h1> */}
                                </div>
                                <div className="blogRow flex justify-between">
                                    {/* <p className="text-[#64607D] text-sm font-medium">{post.mini_title}</p> */}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </FrontLayout>
    )
}