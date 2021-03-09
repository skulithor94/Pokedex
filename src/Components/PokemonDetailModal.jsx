import { capitalizeFirstLetter } from '../Services/HelperClasses';
import { useState, useEffect, useContext } from 'react';
import PokemonDetailIsOpenContext from './PokemonDetailIsOpenContext';

export default function PokemonDetailModal(props) {
    let pokemon = props.pokemon;
    let {isOpen, setIsOpen} = useContext(PokemonDetailIsOpenContext);

    function toggleModal() {
        const modal = document.querySelector('.modal')
        modal.classList.toggle('opacity-0')
        modal.classList.toggle('pointer-events-none')
        setIsOpen(false);
    }

    useEffect(() => {
        const modal = document.querySelector('.modal')
         modal.classList.toggle('opacity-0')
         modal.classList.toggle('pointer-events-none')
    }, []);

    useEffect(() => {
        if(!isOpen)
            return;
    }, [isOpen]);


    return (
        <div>
            <div className="z-10 modal opacity-0 pointer-events-none absolute w-full h-full top-0 left-0 flex items-center justify-center">
                <div onClick={toggleModal} className="modal-overlay absolute w-full h-full bg-black opacity-25 top-0 left-0 cursor-pointer"></div>
                <div className="grid bg-yellow-mustard rounded-xl absolute w-1/2 h-64 shadow-lg text-2xl ">
                    <div className="bg-white rounded-t-xl grid grid-cols-3">
                        <div>
                            <img className="w-32 h-32 rounded-full mx-auto" src={`./pokemon-images/${pokemon['id']}.png`} alt="" width="384" height="512" />
                        </div>
                        <div className="bg-indigo-700 col-span-2">2</div>
                    </div>
                    <div className="bg-indigo-400 ">2</div>
                    <div className="bg-green-light rounded-b-xl">3</div>
                </div>
            </div>
        </div>
    )
}