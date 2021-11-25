import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { ThumbUpIcon, AnnotationIcon, HeartIcon } from "@heroicons/react/outline";


const Posts = () => {

    const [post, setPost] = useState({ status: 'DONE', data: null,});

    useEffect(() => {
        async function getPost() {
            const { data: response } = await axios.get('https://posts-pw2021.herokuapp.com/api/v1/post/all?limit=12&page=0', { 
                headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });

        setPost({ status: 'DONE', data: response.data });
    }

            getPost();
        
    }, []); 

console.log(post);
    return (
        <div className="border-4 border-dashed border-gray-200 rounded-lg h-full m-2 flex flex-wrap justify-center">
           { 
            post.data && post.data.map((it) =>
           <div className="flex flex-col bg-gray-300 bg-opacity-30 rounded-2xl w-80 h-full p-4 text-white my-4 ml-3 mr-3">
                <div className="w-full flex space-around font-bold text-black flex-row">
                    <h1 className="w-1/2">
                        {it.user?.username}
                    </h1>

                    <HeartIcon className=" w-5 h-5 text-gray-700 ml-32" />

                </div>
                {
                    it.image && <img className="w-full h-40 object-cover my-2 rounded-2xl" src={it.image} alt="imagen cualquiera" />
                }
                <div>
                    <h1 className="text-gray-700">{it.title}</h1>
                    <h4 className="text-gray-700">{it.description}</h4>
                    <div className="w-full  flex ">
                        <button className="flex flex-col justify-center mr-40 ml-6 text-gray-700">
                            <ThumbUpIcon className=" w-5 h-5 text-gray-700" />Like
                        </button>
                        <button className="text-gray-700">
                            <AnnotationIcon className=" w-5 h-5 text-gray-700" />Comment
                        </button>
                    </div>
                </div>
            </div>
            )}
        </div>
    )
}

export default Posts;