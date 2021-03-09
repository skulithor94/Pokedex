import React, { useState, useEffect, useContext } from 'react';
import { capitalizeFirstLetter } from '../Services/HelperClasses';
import PokemonDetailModal from './PokemonDetailModal';
import PokemonDetailIsOpenContext from './PokemonDetailIsOpenContext';

export default function PokemonCard(props) {

    let [isOpen, setIsOpen] = useState(false);
    const value = { isOpen, setIsOpen };

    function handleHoverFigure(e, data) {
        var audio = new Audio(`./cries-old/${e.currentTarget.id}.mp3`);
        setIsOpen(true);
        // console.log("here")
        // audio.play();
        // const modal = document.querySelector('.modal')
        // modal.classList.toggle('opacity-0')
        // modal.classList.toggle('pointer-events-none')

    }

    // useEffect(() => {

    // }, [isModalOpen]);

    let pokemon = props.pokemon;
    return (
        <div>
            <PokemonDetailIsOpenContext.Provider value={value}>
                <figure className="bg-green-light rounded-xl p-8 transform transition duration-500 hover:scale-110 border-2 border-gray-600" id={pokemon['id']} onClick={handleHoverFigure}>
                    <img className="w-32 h-32 rounded-full mx-auto" src={`./pokemon-images/${pokemon['id']}.png`} alt="" width="384" height="512" />
                    <div className="pt-6 space-y-4">
                        <blockquote>
                            <p className="text-lg font-semibold">
                                #{pokemon['id']} {capitalizeFirstLetter(pokemon['name'])}
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
                </figure>

                {isOpen && <PokemonDetailModal pokemon={pokemon}></PokemonDetailModal>}
            </PokemonDetailIsOpenContext.Provider>
        </div>
    )
}