import React, { useState } from "react";

export const CommentsForm = ({ handleSubmit, submitLabel }) => {
    const [text, setText] = useState("");

    const onSubmit = (event) => {
        event.preventDefault();
        handleSubmit(text);
    };

    return (
        <div className="flex">
            <form onSubmit={onSubmit} className="">
                <input
                    className="bg-[#FFD4D4] w-full"
                    id="comment-form-textarea"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                <button id="comment-form-button" className="bg-[#1693AE] px-4 my-3 py-1 rounded-xl justify-end">
                    {submitLabel}
                </button>
            </form>
        </div>
    );
};
