import React, { Component, useCallback, useState } from "react";
import "./Searchbar.css";
import axios from "axios";

export const SearchBar = ({ onCharactersChange }) => {
  const [searchBy, setSearchBy] = useState("name"); // You can change this to "comic"
  const [searching, setSearching] = useState(false);
  const [query, setQuery] = useState("");

  const onSearch = useCallback(async () => {
    setSearching(true);
    let url;
    if (searchBy === 'name') {
      url = `https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${query}&limit=10&apikey=c70bee055661b1eabc28f40a0fea1796&hash=1fb53ea11fb2c416560dbeccb40e01fc`;
    } else if (searchBy === 'comic') {
      url = `https://gateway.marvel.com:443/v1/public/characters?comics=${query}&limit=10&apikey=c70bee055661b1eabc28f40a0fea1796&hash=1fb53ea11fb2c416560dbeccb40e01fc`;
    } else {
      url = `https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${query}&limit=10&apikey=c70bee055661b1eabc28f40a0fea1796&hash=1fb53ea11fb2c416560dbeccb40e01fc`;
    }
    const res = await axios(url);
    const characters = await res.data.data.results;
    onCharactersChange(characters);
    setSearching(false);
  }, [query, onCharactersChange, searchBy]);

  const onQueryChange = useCallback((q) => {
    setQuery(q);
  }, []);

  return (
    <header className="SearchBar">
      <section className="left-side">
        <div className="logo">
          <a href="/">
            <img src="/logomarvel.png" alt="Marvel Logo" />
          </a>
        </div>
      </section>
      <section className="rigth-side">
        <input
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Search..."
        />
        <button onClick={onSearch}>
          Search
        </button>
        {searching && <span>I am searching</span>}
      </section>
    </header>
  );
};
export default SearchBar;
