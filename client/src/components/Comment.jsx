import React, { useState } from "react";
import { BiLike, BiSolidLike } from "react-icons/bi";
export const Comment = ({ comment }) => {
    const [contador, setContador] = useState(0);

    const handleClick = () => {
        const a = contador + 1;
        setContador(a);
    };

    return (
        <div id="comment" className="">
            <div className="flex">
                <div id="comment-image-container">
                    <img
                        src="../public/diavlo.jpg"
                        className="size-[50px] rounded-full mx-2 my-6"
                    />
                </div>
                <div id="comment-rigth-apart" className=" my-4 w-full mx-4">
                    <div id="comment-content" className="">
                        <div
                            id="comment-author"
                            className="font-semibold text-xl"
                        >
                            {comment.username}
                        </div>
                        <div>{comment.createdAt}</div>
                    </div>
                    <div id="comment-text">{comment.body}</div>
                </div>
            </div>

            <div className="">
                <button onClick={() => handleClick()}>
                    {(contador / 2) % 0 ? (
                        <BiSolidLike size={30} />
                        
                    ) : (
                        <BiLike size={30} />
                    )}

                    {contador}
                </button>
            </div>
        </div>
    );
};
