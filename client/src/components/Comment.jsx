import React, { useState } from "react";
import { BiLike, BiSolidLike } from "react-icons/bi";
export const Comment = ({ comment, currentUser }) => {
    const [contador, setContador] = useState(0);

    const handleClickLike = () => {
        const a = contador + 1;
        setContador(a);
        console.log("id de usuario", currentUser);
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

            <div className="">
                <button onClick={() => handleClickLike()}>
                    {(contador / 2) % 0 ? (
                        <BiSolidLike size={30} />
                        
                    ) : (
                        <BiLike size={30} />
                    )}

                    {comment.rating}
                </button>
            </div>
        </div>
    );
};
