import { typeColor, typeStyle } from '../../styles/TypeStyle.jsx'
import InfoIcon from '../../assets/icons/InfoIcon.jsx'
import HeartIcon from '../../assets/icons/HeartIcon.jsx'
import { usePokemonCard } from '../../hooks/usePokemonCard.jsx'
import { useNavigate } from 'react-router'

export default function PokemonCard({ pokemon }) {
  const { isFavorite, addToFavorites } = usePokemonCard(pokemon)
  const navigate = useNavigate()

  return (
    <article
      className={`h-96 shadow-lg shadow-gray-700 w-60 p-4 rounded-lg flex flex-col items-center gap-6 justify-between group
                ${typeStyle[pokemon.types[0].type.name]}`}
    >
      <div className="flex justify-between w-full relative">
        <p className="capitalize text-xl">{pokemon.name}</p>
        <HeartIcon
          className={`hover:scale-125 transition-all cursor-pointer ${isFavorite ? 'text-red-500 hover:text-red-400' : 'hover:text-red-500'}`}
          onClickFunction={addToFavorites}
        />
      </div>
      <img
        src={pokemon.sprites.other.dream_world.front_default}
        alt={`${pokemon.name} sprite`}
        className="group-hover:drop-shadow-black transition-all duration-300 drop-shadow-xl drop-shadow-transparent max-h-60 flex-1 py-6"
      />
      <div className="flex justify-between w-full">
        {pokemon.types.map((type) => (
          <p
            className={`capitalize ${typeColor[type.type.name]} rounded-full px-2 shadow-sm shadow-gray-700 `}
            key={type.slot}
          >
            {type.type.name}
          </p>
        ))}
        <InfoIcon
          className="cursor-pointer hover:scale-125 transition-all duration-300"
          onClickFunction={() => navigate('/pokemon/' + pokemon.id)}
        />
      </div>
    </article>
  )
}
