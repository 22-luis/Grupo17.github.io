import React from "react";
import axios from 'axios';
import { useState } from "react";
import { Modal } from '@material-ui/core'
import { ThumbUpIcon, AnnotationIcon, EyeIcon, PencilIcon } from "@heroicons/react/solid";


const Posts = ({ username, struct }) => {
    const {
        _id, user, image, title, description, likes, comments, active,
    } = struct;

    const [like, setLike] = useState(likes.some(it => it.username === username));
    const [likesNumber, setLikesNumber] = useState(likes.length);
    const [activeState, setActiveState] = useState();
    const [insert, setInsert] = useState(false);

    const OpenClose = () => {
        setInsert(!insert);
    }
    const bodyUpdate = (
        <div className="flex justify-center  mt-60 ">
            <div className="px-4 py-6 sm:px-0 ">
                <div className="border-4  border-gray-800 rounded-lg h-90 w-80">
                    <div>
                        <div className="md:grid md:grid-cols-2 md:gap-6">
                            <div className="mt-5 md:mt-0 md:col-span-2">
                                <form action="#" method="PUT" /*onSubmit={onSubmit}*/>
                                    <div className="shadow sm:rounded-md sm:overflow-hidden">
                                        <div className="px-4 py-5 bg-white space-y-6 sm:p-6 w-80">
                                            <div className="grid grid-cols-3 gap-6">
                                                <div className="col-span-3 sm:col-span-2">
                                                    <label
                                                        htmlFor="company-website"
                                                        className="block text-sm font-medium text-gray-700"
                                                    >
                                                        Nombre
                                                    </label>
                                                    <div className="mt-1 flex rounded-md shadow-sm">
                                                        <input
                                                            type="text"
                                                            name="company-website"
                                                            id="company-website"
                                                            className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                                                            placeholder={title}
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <div>
                                                <label
                                                    htmlFor="about"
                                                    className="block text-sm font-medium text-gray-700"
                                                >
                                                    Descripcion
                                                </label>
                                                <div className="mt-1">
                                                    <textarea
                                                        id="about"
                                                        name="about"
                                                        rows={3}
                                                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                                                        placeholder={description}
                                                        defaultValue={""}
                                                    /* onChange={(e) => onChange(e, setDescripcion)}*/
                                                    />
                                                </div>
                                                <p className="mt-2 text-sm text-gray-500">
                                                    Brief description of the product. URLs are
                                                    hyperlinked.
                                                </p>
                                            </div>
                                        </div>
                                        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                            <button onClick={OpenClose}
                                                type="submit"
                                                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                            >
                                                Change
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

    async function patchLike() {
        try {
            const { put } = axios.patch(`https://posts-pw2021.herokuapp.com/api/v1/post/like/` + _id, null, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

            if (!like) {
                setLikesNumber(likesNumber + 1);
                setLike(false);
            } else {

                setLikesNumber(likesNumber - 1);
                setLike(true);
            }

        } catch (error) {
            console.log(error);
        }
    }

    async function patchActive() {
        try {
            const { put } = axios.patch(`https://posts-pw2021.herokuapp.com/api/v1/post/toggle/` + _id, null, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

            if (!activeState) {
                setActiveState(true);
            } else {
                setActiveState(false);
            }
            console.log(put)
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
                <button type="button" className="ml-2" onClick={patchActive}>
                    <EyeIcon className={` w-5 h-5 text-gray-700 ml-20 ${activeState && 'text-indigo-800'}`} />
                </button>
                <button className="ml-4" onClick={OpenClose}>
                    <PencilIcon className=" w-5 h-5 text-gray-700 " />
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
                        <ThumbUpIcon className={`w-5 h-5 text-gray-700 ${like && 'text-indigo-800'}`} />Likes {likesNumber}
                    </button>
                    <button type="button" className="text-gray-700 flex">
                        <AnnotationIcon className=" w-5 h-5 text-gray-700" />Comments
                    </button>
                </div>
            </div>
            <Modal open={insert} onClose={OpenClose}>
                {bodyUpdate}
            </Modal>
        </div>
    )
}

export default Posts;