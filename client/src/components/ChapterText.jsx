import React from "react";

const ChapterText = ({ text, fontSize }) => {
    return (
        <div style={{ fontSize }} className="text-gray-900 p-4 overflow-y-auto h-96">
            {text}
        </div>
    );
};

export default ChapterText;