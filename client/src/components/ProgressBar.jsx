import React from "react";

const ProgressBar = ({ progress, totalDuration, onProgressChange }) => {
    const handleProgressClick = (event) => {
        const rect = event.target.getBoundingClientRect();
        const offsetX = event.clientX - rect.left;
        const newProgress = (offsetX / rect.width) * 100;
        onProgressChange(newProgress);
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    };

    return (
        <div className="w-full flex items-center">
            <span className="text-white">{formatTime((progress / 100) * totalDuration)}</span>
            <div
                className="flex-grow h-2 bg-gray-300 rounded-full relative mx-4 cursor-pointer"
                onClick={handleProgressClick}
                style={{ position: "relative" }}
            >
                <div
                    className="bg-green-500 h-full rounded-full"
                    style={{ width: `${progress}%` }}
                ></div>
            </div>
            <span className="text-white">{formatTime(totalDuration)}</span>
        </div>
    );
};

export default ProgressBar;