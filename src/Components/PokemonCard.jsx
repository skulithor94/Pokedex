import { capitalizeFirstLetter } from '../Services/HelperClasses';

export default function PokemonCard(props) {

    function handleHoverFigure(e, data){
        var audio = new Audio(`./cries-old/${e.currentTarget.id}.mp3`);
        audio.play();
      }

    let pokemon = props.pokemon;
    return (
        <figure className="bg-green-light rounded-xl p-8 transform transition duration-500 hover:scale-110 border-2 border-gray-600" id={pokemon['id']} onClick={handleHoverFigure}>
            <img className="w-32 h-32 rounded-full mx-auto" src={pokemon['sprites']['front_default']} alt="" width="384" height="512" />
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
    )
}