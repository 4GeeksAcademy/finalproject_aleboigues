
import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState("");

    const handleSearch = (event) => {
        event.preventDefault();
        onSearch(query);
    };

    return (
        <form onSubmit={handleSearch}>
            <input 
                type="text" 
                placeholder="Buscar personaje..." 
                value={query} 
                onChange={(e) => setQuery(e.target.value)} 
            />
            <button type="submit">Buscar</button>
        </form>
    );
};

export default SearchBar;
