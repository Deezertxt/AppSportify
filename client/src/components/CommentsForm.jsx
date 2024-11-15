import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
export const CommentsForm = ({ handleSubmit, submitLabel }) => {
    const [text, setText] = useState("");
    const [rating, setRating] = useState(null);
    const [rateColor, setColor] = useState(null)
    const onSubmit = (event) => {
        event.preventDefault();
        handleSubmit(text);
    };

    return (
        <div className="py-2">
            <div id="estrellas" className="flex py-2 ml-14">
                {[...Array(5)].map((star, index) => {
                    const currentRate = index + 1;
                    return (
                        <>
                            <label className="px-2">
                                <input
                                    type="radio"
                                    name="rate"
                                    value={currentRate}
                                    onClick={() => setRating(currentRate)}
                                    className="absolute items-center"
                                />
                                <FaStar size={40} color={currentRate <= (rateColor || rating)? "yellow": "grey"}/>
                            </label>
                        </>
                    );
                })}
            </div>
            <div className="flex">
                <div>
                    <img
                        src="../public/diavlo.jpg"
                        className="size-[50px] rounded-full m-2"
                    />
                </div>
                <div className="flex-col">
                    <form onSubmit={onSubmit} className="">
                        <textarea
                            className="w-[600px] h-[100px] rounded-xl border border-solid border-gray-500 resize-none px-2 py-1"
                            id="comment-form-textarea"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                        />
                    </form>
                    <div className="justify-end items-end">
                        <button
                            id="comment-form-button"
                            className="bg-[#1693AE] px-4 my-3 py-1 rounded-xl"
                        >
                            {submitLabel}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
