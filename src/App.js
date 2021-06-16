import React, { useCallback } from "react";
import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { Card } from "./Components/Card/Card";
import SearchBar from "./Components/Searchbar/Searchbar";

function App() {
  const [searchedCharacters, setSearchedCharacters] = useState([]);
  const [starredCharacters, setStarredCharacters] = useState([]);
  const [actualStarredCharacters, setActualStarredCharacters] = useState([]);

  const onSearchedChanged = useCallback((characters) => {
    setSearchedCharacters(characters);
  }, [])

  const onStar = useCallback((name) => {
    let newStarred;
    if (starredCharacters.includes(name)) {
      newStarred = starredCharacters.filter((c) => c !== name)
    } else {
      newStarred = [...starredCharacters, name];
    }
    setStarredCharacters(newStarred);
    localStorage.setItem('marvel', JSON.stringify(newStarred));
  }, [starredCharacters])

  const getCharacter = useCallback(async (id) => {
    const res = await axios
      .get(
        `https://gateway.marvel.com:443/v1/public/characters/${id}?ts=1&apikey=9ab3f4223305129d78c4e31277c69318&hash=1fb53ea11fb2c416560dbeccb40e01fc`
      )
    if (res.data.data.results && res.data.data.results[0]) {
      return res.data.data.results[0]
    }
    return {};
  }, [])

  useEffect(() => {
    Promise.all(starredCharacters.map((id) => getCharacter(id))).then(fullfilled => {
      setActualStarredCharacters(fullfilled);
    })
  }, [starredCharacters, getCharacter]);

  useEffect(() => {
    const localList = localStorage.getItem('marvel');
    if (localList) {
      const arr = JSON.parse(localList);
      if (Array.isArray(arr)) {
        setStarredCharacters(arr);
      }
    }
  }, []);

  const getRandomCharacter = useCallback(async () => {
    const alphabet = "abcdefghijklmnopqrstuvwxyz"
    const randomLetter = alphabet[Math.floor(Math.random() * alphabet.length)]
    const res = await axios.get(`https://gateway.marvel.com:443/v1/public/characters?ts=1&nameStartsWith=${randomLetter}&limit=100&apikey=c70bee055661b1eabc28f40a0fea1796&hash=1fb53ea11fb2c416560dbeccb40e01fc`)

    const list = res.data.data.results;
    const n = Math.floor(Math.random() * list.length)
    return list[n]
}, [])

useEffect(() => {
    Promise.all([1,2,3,4,5,6,8,9].map((id) => getRandomCharacter())).then(fullfilled => {
        setSearchedCharacters(fullfilled);
    })
}, [])

  return (
    <div className="App">
      <SearchBar onCharactersChange={onSearchedChanged}/>

      <div className="grid">
        {searchedCharacters.map((per) => (
          <div className="col" key={per.id}>
            <Card personaje={per} onStar={onStar} />
          </div>
        ))}
      </div>
      <h2>Favorites</h2>
      {starredCharacters.map((c) => <div>{c}</div>)}
      <div className="grid">
        {actualStarredCharacters.map((per) => (
          <div className="col" key={per.id}>
            <Card personaje={per} onStar={onStar} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

