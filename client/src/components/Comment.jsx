import React from "react";

export const Comment = ({ comment }) => {
    return (
        <div id="comment" className="flex">
            <div id="comment-image-container">
                <img
                    src="../public/diavlo.jpg"
                    className="size-[50px] rounded-full mx-2 my-6"
                />
            </div>
            <div id="comment-rigth-apart" className=" my-4 w-full mx-4">
                <div id="comment-content" className=""> 
                    <div id="comment-author" className="font-semibold text-xl">
                        {comment.username}
                    </div>
                    <div>
                        {comment.createdAt}
                    </div>
                </div>
                <div id="comment-text">
                    {comment.body}
                </div>
            </div>
        </div>
    );
};
