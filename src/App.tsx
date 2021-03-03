import React, { useEffect, useState } from 'react';
import logo from './Pokemonlogo.png';
import './App.css';
import axios from 'axios';
import './Services/HelperClasses';
import { capitalizeFirstLetter } from './Services/HelperClasses';

function App() {
  let [sprite, setSprite] = useState("");
  let [allPokemon, setAllPokemon] = useState([]);
  let [pokemonCount, setPokemonCount] = useState(0);
  let [offset, setOffset] = useState(0);

  useEffect(() => {
    if(offset === 0){
    axios.get(`https://pokeapi.co/api/v2/pokemon`)
      .then(res => {
        setAllPokemon(res.data.results);
        setPokemonCount(res.data.count);
        setOffset(20);
      })
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  function handleScroll() {
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;
    axios.get(`https://pokeapi.co/api/v2/pokemon/?limit=20&offset=${offset}`)
      .then(res => {
        setAllPokemon(allPokemon.concat(res.data.results));
        setOffset(offset+20);
      })
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>The Pokédex of the future</h1>
      </header>
      <div id="scrollableDiv" className="grid grid-flow-row grid-cols-6 gap-4 md:grid-cols-4 sm:grid-cols-2 xs:grid-cols-1">

          {allPokemon.map((pokemon, key) => {
            return (<figure className="bg-gray-100 rounded-xl p-8" key={key}>
              <img className="w-32 h-32 rounded-full mx-auto" src={logo} alt="" width="384" height="512" />
              <div className="pt-6 space-y-4">
                <blockquote>
                  <p className="text-lg font-semibold">
                    {capitalizeFirstLetter(pokemon['name'])}
                  </p>

                </blockquote>
                <figcaption className="font-medium">
                  <div>
                    {pokemon['url']}
                  </div>
                  <div>
                  </div>
                </figcaption>
              </div>
            </figure>)
          })}
      </div>

      {/* 
        {allPokemon.map((pokemon, key) => {
          return (<figure className="bg-gray-100 rounded-xl p-8" key={key}>
          <img className="w-32 h-32 rounded-full mx-auto" src={logo} alt="" width="384" height="512" />
          <div className="pt-6 space-y-4">
            <blockquote>
              <p className="text-lg font-semibold">
                {capitalizeFirstLetter(pokemon['name'])}
            </p>
            
            </blockquote>
            <figcaption className="font-medium">
              <div>
              {pokemon['url']}
            </div>
              <div>
            </div>
            </figcaption>
          </div>
        </figure>)
})}
         */}

      {/* <div className="min-h-screen  py-6 flex flex-col justify-center sm:py-12">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
          <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
            <div className="max-w-md mx-auto">
              <div>
                <img src={sprite} className="h-7 sm:h-8" />
              </div>
              <div className="divide-y divide-gray-200">
                <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                  <p>An advanced online playground for Tailwind CSS, including support for things like:</p>
                  <ul className="list-disc space-y-2">
                    <li className="flex items-start">
                      <span className="h-6 flex items-center sm:h-7">
                        <svg className="flex-shrink-0 h-5 w-5 text-cyan-500" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </span>
                      <p className="ml-2">
                        Customizing your
                  <code className="text-sm font-bold text-gray-900">tailwind.config.js</code> file
                </p>
                    </li>
                    <li className="flex items-start">
                      <span className="h-6 flex items-center sm:h-7">
                        <svg className="flex-shrink-0 h-5 w-5 text-cyan-500" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </span>
                      <p className="ml-2">
                        Extracting classes with
                  <code className="text-sm font-bold text-gray-900">@apply</code>
                      </p>
                    </li>
                    <li className="flex items-start">
                      <span className="h-6 flex items-center sm:h-7">
                        <svg className="flex-shrink-0 h-5 w-5 text-cyan-500" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </span>
                      <p className="ml-2">Code completion with instant preview</p>
                    </li>
                  </ul>
                  <p>Perfect for learning how the framework works, prototyping a new idea, or creating a demo to share online.</p>
                </div>
                <div className="pt-6 text-base leading-6 font-bold sm:text-lg sm:leading-7">
                  <p>Want to dig deeper into Tailwind?</p>
                  <p>
                    <a href="https://tailwindcss.com/docs" className="text-cyan-600 hover:text-cyan-700"> Read the docs &rarr; </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}

    </div>
  );
}

export default App;
