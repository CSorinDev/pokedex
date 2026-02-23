import { useNavigate } from "react-router";
import InfoIcon from "../assets/InfoIcon.jsx"
import { typeColor, typeStyle } from "../styles/TypeStyle.jsx";

export default function PokemonCard({ pokemon }) {
    const navigate = useNavigate();
    return (
        <article
            className={`h-96 shadow-lg shadow-gray-700 w-60 p-4 rounded-lg flex flex-col items-center gap-6 justify-between group
                ${typeStyle[pokemon.types[0].type.name]}`}
        >
            <div className="flex justify-between w-full">
                <p className="capitalize text-xl">{pokemon.name}</p>
                <InfoIcon className="cursor-pointer hover:scale-125 transition-all duration-300" onClickFunction={() => navigate("/pokemon/" + pokemon.id)} />
            </div>
            <img
                src={pokemon.sprites.other.dream_world.front_default}
                alt={`${pokemon.name} sprite`}
                className="group-hover:scale-125 transition-all duration-300 drop-shadow-xl drop-shadow-black max-h-60"
            />
            <div className="flex justify-around w-full">
                {
                    pokemon.types.map(type => (
                        <p
                            className={`capitalize ${typeColor[type.type.name]} rounded-full px-2 shadow-sm shadow-gray-700`}
                            key={type.slot}>
                            {type.type.name}
                        </p>
                    ))
                }
            </div>
        </article>
    )
}