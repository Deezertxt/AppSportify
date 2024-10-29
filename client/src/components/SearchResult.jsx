import React from "react";
import Card from "./Card";

export const SearchResult = ({ result }) => {
    return <div className="px-5 py-2 hover:bg-[#efefef]">{result.title}</div>;
};
