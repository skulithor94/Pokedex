import { capitalizeFirstLetter } from '../Services/HelperClasses';
import { useEffect, useContext } from 'react';
import PokemonDetailIsOpenContext from './PokemonDetailIsOpenContext';
import WaveSurfer from 'wavesurfer.js';


export default function PokemonDetailModal(props) {
    let pokemon = props.pokemon;
    let { isOpen, setIsOpen } = useContext(PokemonDetailIsOpenContext);
    let wavesurfer = null;

    function toggleModal() {
        const modal = document.querySelector('.modal')
        modal.classList.toggle('opacity-0')
        modal.classList.toggle('pointer-events-none')
        setIsOpen(false);
    }

    function playCry() {
        if (wavesurfer !== null)
            wavesurfer.play();
    }

    useEffect(() => {
        wavesurfer = WaveSurfer.create({
            container: '#waveform',
            barWidth: 2,
            barHeight: 1, // the height of the wave
            barGap: null
        });



        
        // var audio = new Audio(`./cries-old/${pokemon['id']}.mp3`);
        wavesurfer.load(`./cries-old/${pokemon['id']}.mp3`);
        wavesurfer.play();

        const modal = document.querySelector('.modal')
        modal.classList.toggle('opacity-0')
        modal.classList.toggle('pointer-events-none')
    }, []);

    useEffect(() => {
        if (!isOpen)
            return;
    }, [isOpen]);

    return (
        <div>
            <div className="z-10 modal opacity-0 pointer-events-none absolute w-full h-full top-0 left-0 flex items-center justify-center">
                <div onClick={toggleModal} className="modal-overlay absolute w-full h-full bg-black opacity-25 top-0 left-0 cursor-pointer"></div>
                <div className="grid bg-yellow-mustard rounded-xl absolute w-1/2 h-64 shadow-lg text-2xl ">
                    <div className="rounded-t-xl grid grid-cols-3">
                        <div>
                            <img className="w-32 h-32 bg-purple-100 rounded-full mx-auto" src={`./pokemon-images/${pokemon['id']}.png`} alt="" width="384" height="512" />
                        </div>
                        <div className=" col-span-2">
                            <h1 className="text-lg font-semibold">
                                #{pokemon['id']} {capitalizeFirstLetter(pokemon['name'])}
                            </h1>
                        </div>
                    </div>
                    <div className="grid grid-cols-12">
                        <button onClick={playCry}><i className="fa fa-play fa-2x text-white" id="play-btn"></i></button>
                        <div id="waveform" className="col-span-10"></div>
                    </div>
                    {/* <div className="bg-green-light rounded-b-xl">3</div> */}
                </div>
            </div>
        </div>
    )
}

