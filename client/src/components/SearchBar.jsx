import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchBar() {
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleViewAllClick = () => {
        if (searchTerm.trim()) {
            navigate(`/results?search=${encodeURIComponent(searchTerm)}`);
        }
    };

    return (
        <div className="search-bar">
            <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Search audiobooks..."
                className="search-input"
            />
            <button onClick={handleViewAllClick} className="view-all-button">
                View All
            </button>
        </div>
    );
}

export default SearchBar;

