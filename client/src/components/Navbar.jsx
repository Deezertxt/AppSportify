import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import React, { useState} from "react";

import { SearchResultsList } from "../components/SearchResultsList";


function Navbar() {
    const [results, setResults] = useState([]);
    return (
        <nav className="bg-[#F0F9F9] text-white text-lg mt-[25px] lg:flex-row pt-4 px-10">
            <div className="px-[50px]">
                <SearchBar setResults={setResults}/>
            </div>
            <div className="m-0 pl-[55px]">
                <SearchResultsList results={results}/>
            </div>
        </nav>
    );
}

export default Navbar;