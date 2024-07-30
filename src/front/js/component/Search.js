import React, { useState } from 'react';

const Search = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleSearch = (event) => {
        event.preventDefault();
        onSearch(query);
    };

    return (
        <form onSubmit={handleSearch}>
            <input 
                type="text" 
                placeholder="Buscar personajes, capítulos o lugares..." 
                value={query} 
                onChange={(e) => setQuery(e.target.value)} 
            />
            <button type="submit">Buscar</button>
        </form>
    );
};

export default Search;
