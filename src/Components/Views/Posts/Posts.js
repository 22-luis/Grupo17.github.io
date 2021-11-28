import React from "react";
import { useState } from "react";
import axios from "axios";
import { ThumbUpIcon, AnnotationIcon, HeartIcon, DotsVerticalIcon } from "@heroicons/react/solid";


const Posts = ({ username, struct }) => {

    const {
        _id, user, image, title, description, likes, comments,
    } = struct;

    const [like, setLike] = useState(likes.some(it => it.username === username ));
    const [likesNumber, setLikesNumber] = useState(likes.length);
    const [favorite, setFavorite] = useState(false);

    async function patchLike() {
        try {
            const { put } = axios.patch(`https://posts-pw2021.herokuapp.com/api/v1/post/like/`+ _id, null, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

            if (!like) {
                setLikesNumber(likesNumber + 1);
                setLike(true);
            } else {
      
                setLikesNumber(likesNumber - 1);
                setLike(false);
            }

        } catch (error) {
            console.log(error);
        }
    }

    async function patchFavorite() {
        try {
            const { put } = axios.patch(`https://posts-pw2021.herokuapp.com/api/v1/post/fav/`+ _id, null, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

            if (!favorite) {
                setFavorite(true);
            } else {
                setFavorite(false);
            }

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="flex flex-col bg-gray-300 bg-opacity-30 rounded-2xl w-80 h-full p-4 text-white my-4 ml-3 mr-3">
            <div className="w-full flex space-around font-bold text-black flex-row">
                <h1 className="w-1/2 text-indigo-800">
                    {user?.username}
                </h1>
                <button type="button" className="ml-24" onClick={patchFavorite}>
                    <HeartIcon className={` w-5 h-5 text-gray-700 ml-20 ${favorite && 'text-indigo-800' }`} />
                </button>
                <button type="button">
                    <DotsVerticalIcon className=" w-5 h-5 text-gray-700 " />
                </button>
            </div>
            {
                image && <img className="w-full h-40 object-cover my-2 rounded-2xl" src={image} alt="image post" />
            }
            <div>
                <h1 className="text-gray-900 italic font-semibold ">{title}</h1>
                <h4 className="text-gray-700">{description}</h4>
                <div className="w-full  flex mt-2">
                    <button type="button" className={`flex justify-center mr-32  text-gray-700 ${like && 'text-indigo-800'}`} onClick={patchLike}>
                        <ThumbUpIcon className={`w-5 h-5 text-gray-700 ${like && 'text-indigo-800'}` }/>Likes {likesNumber}
                    </button>
                    <button type="button" className="text-gray-700 flex">
                        <AnnotationIcon className=" w-5 h-5 text-gray-700" />Comments 
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Posts;