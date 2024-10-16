import React from "react";
import { FiBookmark } from "react-icons/fi";

const AudioDetails = ({ title, author }) => (
    <div className="flex items-center">
        <div className="flex flex-col mr-4">
            <h1 className="text-2xl font-semibold">{title}</h1>
            <p className="text-white">{author}</p>
        </div>
        <FiBookmark className="text-2xl cursor-pointer hover:text-blue-500 transition" />
    </div>
);

export default AudioDetails;

