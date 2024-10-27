import React from "react";
import { SearchResult } from "./SearchResult";

export const SearchResultsList = ({results}) => {
    return (
        <>
            <div className="results-list w-full bg-gray flex flex-col shadow-none rounded-lg mt-4 max-h-[300px] overflow-y-scroll">
              {
                results.map((result, id) => {
                    return <SearchResult result={result} key={id} />
                })
              }
            </div>
        </>
    );
};
