import React, { useEffect, useState } from 'react';
import logo from './Pokemonlogo.png';
import './App.css';
import axios from 'axios';
import './Services/HelperClasses';
import { capitalizeFirstLetter } from './Services/HelperClasses';

function App() {
  let [allPokemon, setAllPokemon] = useState([]);
  let [pokemonCount, setPokemonCount] = useState(0);
  let [offset, setOffset] = useState(0);
  let [currentPokemonList, setCurrentPokemonList] = useState([]);
  let [currentPokemonListDetail, setCurrentPokemonListDetail] = useState([]);

  useEffect(() => {
    axios.get(`https://pokeapi.co/api/v2/pokemon`)
      .then(res => {
        setAllPokemon(res.data.results);
        setCurrentPokemonList(res.data.results);
        setPokemonCount(res.data.count);
        setOffset(20);
      })
  }, []);

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

  function handleScroll() {
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;
    axios.get(`https://pokeapi.co/api/v2/pokemon/?limit=20&offset=${offset}`)
      .then(res => {
        setAllPokemon(allPokemon.concat(res.data.results));
        setCurrentPokemonList(res.data.results);
        setOffset(offset + 20);
      })
  }

  return (
    <div className="App bg-skyblue">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>The Pokédex of the future</h1>
      </header>
      <div id="scrollableDiv" className="grid grid-flow-row grid-cols-6 gap-5 md:grid-cols-4 sm:grid-cols-2 xs:grid-cols-1">

        {currentPokemonListDetail.map((pokemon, key) => {
          return (
            <figure className="bg-green-light rounded-xl p-8 transform transition duration-500 hover:scale-110 border-2 border-gray-600" key={key}>
              <img className="w-32 h-32 rounded-full mx-auto" src={pokemon['sprites']['front_default']} alt="" width="384" height="512" />
              <div className="pt-6 space-y-4">
                <blockquote>
                  <p className="text-lg font-semibold">
                    {capitalizeFirstLetter(pokemon['name'])}
                  </p>

                </blockquote>
                <div className="px-6 py-4">
                  <span className="inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker mr-2">{capitalizeFirstLetter(pokemon['types'][0]['type']['name'])}</span>
                  {
                    pokemon['types'][1] ? <span className="inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker mr-2">{capitalizeFirstLetter(pokemon['types'][1]['type']['name'])}</span> : null
                  }
                  {
                    pokemon['types'][2] ? <span className="inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker mr-2">{capitalizeFirstLetter(pokemon['types'][2]['type']['name'])}</span> : null
                  }
                </div>
              </div>
            </figure>)
        })}
      </div>
    </div>
  );
}

export default App;