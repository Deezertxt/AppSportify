import React from "react";

export const SearchResult = ({ result }) => {
    return <div className="px-5 py-2 hover:bg-[#efefef]">{result.name}</div>;
};
