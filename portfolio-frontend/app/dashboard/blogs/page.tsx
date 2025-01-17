"use client"

import Button from "components/Button";
import Input from "components/Input";
import Label from "components/Label";
import Modal from "components/Modal";
import Overlary from "components/Overlary";
import Title from "components/Title";
import useToggle from "hooks/useToggle";
import Cookies from "js-cookie";
import AuthenticateNavLink from "layout/authenticatelayout/AuthenticateNavLink";
import AuthenticateSidebar from "layout/authenticatelayout/AuthenticateSidebar";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { Table, Column, HeaderCell, Cell } from 'rsuite-table';
import React, { useMemo, useRef, useState } from "react";
import JoditEditor from 'jodit-react';



type blogPost = {
    title: string,
    content: string,
    image: string,
    link: string,
    blog_category_id: number,
}


export default function Blogs() {


    const token = Cookies.get("token");
    const { isOpen, setIsOpen, } = useToggle();

    const editor = useRef(null);
    const [content, setContent] = useState('');

    const config = useMemo(
        () => ({
            readonly: false,
          
        }),
        []
    );
    


    const methods = useForm<blogPost>({
        defaultValues: {
            title: "",
            content: "",
            image: "",
            link: "",
            blog_category_id: 0
        }
    });


    const handleClick = () => {
        setIsOpen(true);
    };

    const onSubmit: SubmitHandler<blogPost> = async (data) => {
        console.log(data);
    }

    
    return <div>
        {
            token && (
                <AuthenticateNavLink>
                    <AuthenticateSidebar />
                    {
                        isOpen && (
                            <React.Fragment>
                                <Overlary />
                                <Modal className={{
                                    modalContainer: "max-w-lg w-full mx-auto bg-white rounded-md p-5 left-0 top-0 min-h-max translate-y-1/2"
                                }}>
                                    <Label name="Blogs" htmlFor="name" className="text-lg font-bold" />
                                    <FormProvider {...methods}>
                                        <form onSubmit={methods.handleSubmit(onSubmit)} className="flex flex-col gap-y-2 w-full mt-2">
                                            <Input
                                                type="text"

                                                name="name"
                                                placeholder="Title"
                                                className={{
                                                    input: "w-full focus:outline-none border-[1px] border-backend-primary-text-color p-2 rounded-md",
                                                    label: "text-backend-primary-text-color"
                                                }}
                                            />
                                            <Input
                                                type="text"

                                                name="name"
                                                placeholder="Semi Title"
                                                className={{
                                                    input: "w-full focus:outline-none border-[1px] border-backend-primary-text-color p-2 rounded-md",
                                                    label: "text-backend-primary-text-color"
                                                }}
                                            />
                                            
                                            
                                            <Input
                                                type="file"

                                                name="name"
                                                placeholder="Semi Title"
                                                className={{
                                                    input: "w-full focus:outline-none border-[1px] border-backend-primary-text-color p-2 rounded-md",
                                                    label: "text-backend-primary-text-color"
                                                }}
                                            />

                                            <JoditEditor
                                                ref={editor}
                                                value={content}
                                                config={config}
                                                
                                                onBlur={(newContent: string)  => setContent(newContent)}
                                                onChange={(content: string) => {
                                                    console.log(content)
                                                 }}
                                            />

                                            <div className="button my-2">
                                                <Button type="submit" className="bg-bg-backend-secondary-color text-white rounded-md">Submit</Button> <Button className="bg-primary-text-color text-white rounded-md" onClick={() => {
                                                    setIsOpen(false);
                                                }}>Cancel</Button>
                                            </div>
                                        </form>
                                    </FormProvider>
                                </Modal>
                            </React.Fragment>
                        )
                    }
                    <div className="blogsContainer min-h-full  w-full bg-bg-dashboard h-screen lg:p-10 ">
                        <div className="blogBox ml-64 mr-0 bg-white rounded-md p-5">

                            <div className="row flex justify-between items-center text-backend-primary-text-color mb-2">
                                <Title title="Blogs" /> <Button onClick={handleClick} className="bg-bg-backend-secondary-color p-5 rounded-md text-white font-medium">Create Blog</Button>
                            </div>

                            <div className="tableBox">
                                <Table 
                                 cellBordered
                                 bordered
                                >
                                    <Column>
                                        <HeaderCell className="text-primary-text-color">ID</HeaderCell>
                                        <Cell>1</Cell>
                                    </Column>
                                    <Column>
                                        <HeaderCell className="text-primary-text-color">Title</HeaderCell>
                                        <Cell>1</Cell>
                                    </Column>
                                    <Column>
                                        <HeaderCell className="text-primary-text-color">Semi Title</HeaderCell>
                                        <Cell>1</Cell>
                                    </Column>
                                    <Column>
                                        <HeaderCell className="text-primary-text-color">Tags</HeaderCell>
                                        <Cell>1</Cell>
                                    </Column>
                                    <Column>
                                        <HeaderCell className="text-primary-text-color">Image</HeaderCell>
                                        <Cell>1</Cell>
                                    </Column>
                                    <Column>
                                        <HeaderCell className="text-primary-text-color">Content</HeaderCell>
                                        <Cell>1</Cell>
                                    </Column>
                                    <Column>
                                        <HeaderCell className="text-primary-text-color">Blog Category</HeaderCell>
                                        <Cell>1</Cell>
                                    </Column>
                                </Table>
                            </div>
                        </div>
                    </div>
                </AuthenticateNavLink>
            )
        }
    </div>;
}