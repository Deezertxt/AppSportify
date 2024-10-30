import React from "react";
import { SearchResult } from "./SearchResult";

export const SearchResultsList = ({results}) => {
    return (
        <>
            <div className="results-list flex absolute w-[1000px] bg-white text-black flex-col shadow-none rounded-lg max-h-[300px] overflow-y-scroll z-50">
              {
                results.map((result, id) => {
                    return <SearchResult result={result} key={id} />
                })
              }
            </div>
        </>
    );
};
