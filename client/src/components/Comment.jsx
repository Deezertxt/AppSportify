import React, { useEffect, useState } from "react";
import { BiLike, BiSolidLike } from "react-icons/bi";
import { likeFeedback } from "../api/api";
export const Comment = ({ comment, currentUser }) => {
    const [contador, setContador] = useState(comment.likes);
    const [liked, setLiked] = useState(false)
    const handleClickLike = () => {
        //likeFeedback(comment)
        //console.log("id de usuario", currentUser);
        console.log("comentario: ", comment);
        if (liked) {
            setLiked(false)
            // const a = contador - 1;
            // setContador(a)
        }else{
            setLiked(true)
            // const a = contador + 1;
            // setContador(a)
            likeFeedback(comment.id)
        }
        console.log(liked);
    };

    return (
        <div id="comment" className="">
            <div className="flex">
                <div id="comment-image-container">
                    <img
                        src={comment.user.profilePicUrl}
                        className="size-[50px] rounded-full mx-2 my-6"
                    />
                </div>
                <div id="comment-rigth-apart" className=" my-4 w-full mx-4">
                    <div id="comment-content" className="">
                        <div
                            id="comment-author"
                            className="font-semibold text-xl"
                        >
                            {comment.user.username}
                        </div>
                        <div>{comment.createdAt}</div>
                    </div>
                    <div id="comment-text">{comment.comment}</div>
                </div>
            </div>

            <div className="flex mx-20">
                <button onClick={() => handleClickLike()}>
                    {liked ? (
                        <BiSolidLike size={30} />
                        
                    ) : (
                        <BiLike size={30} />
                    )}

                   
                </button>
                <div className="mx-2">
                    {contador}
                </div>
            </div>
        </div>
    );
};
