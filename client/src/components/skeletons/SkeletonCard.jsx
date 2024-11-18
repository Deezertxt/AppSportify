import React from "react";

const SkeletonCard = () => {
    return (
        <div className="w-[200px] space-y-4 p-4 bg-gray-200 rounded-lg animate-pulse">
            <div className="h-48 bg-gray-300 rounded-lg"></div>
            <div className="space-y-3">
                <div className="h-3 bg-gray-300 rounded w-3/5"></div>
                <div className="h-3 bg-gray-300 rounded w-4/5"></div>
                <div className="h-3 bg-gray-300 rounded w-2/5"></div>
            </div>
        </div>
    );
};

export default SkeletonCard;
