import React, { useEffect, useState, useCallback } from 'react';
import logo from './Pokemonlogo.png';
import './App.css';
import axios from 'axios';
import './Services/HelperClasses';
import PokemonCard from './Components/PokemonCard';

const offsetConst = 32;
const limit = 32;

function App() {
  let [allPokemon, setAllPokemon] = useState([]);
  // let [pokemonCount, setPokemonCount] = useState(0);
  let [offset, setOffset] = useState(0);
  let [currentPokemonList, setCurrentPokemonList] = useState([]);
  let [currentPokemonListDetail, setCurrentPokemonListDetail] = useState([]);

  useEffect(() => {
    axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${0}`)
      .then(res => {
        setAllPokemon(res.data.results);
        setCurrentPokemonList(res.data.results);
        // setPokemonCount(res.data.count);
        setOffset(offsetConst);
      });
  }, []);

  const handleScroll = useCallback(() => {
    if (window.innerHeight + document.documentElement.scrollTop - 1000 !== document.documentElement.offsetHeight - 1000) return;
    axios.get(`https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`)
      .then(res => {
        setAllPokemon(allPokemon.concat(res.data.results));
        setCurrentPokemonList(res.data.results);
        setOffset(offset + offsetConst);
      })
  }, [allPokemon, offset]);

  useEffect(() => {
    (async function getPokemon() {
      for await (let pokemon of currentPokemonList) {
        let res = await axios.get(`${pokemon['url']}`);
        setCurrentPokemonListDetail((currentPokemonListDetail) => [...currentPokemonListDetail, res.data]);
      }
    })();
  }, [currentPokemonList]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <div className="App bg-skyblue">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>The Pokédex of the future</h1>
      </header>
      <div id="scrollableDiv" className="grid grid-flow-row grid-cols-6 gap-5 md:grid-cols-4 sm:grid-cols-2 xs:grid-cols-1">
        {currentPokemonListDetail.map((pokemon, key) => {
          return (
            <PokemonCard pokemon={pokemon} key={key}></PokemonCard>
          )
        })}
      </div>
    </div>
  );
}

export default App;