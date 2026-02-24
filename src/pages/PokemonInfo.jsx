import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router'
import { typeColor } from '../styles/TypeStyle'
import Loading from '../components/common/Loading'
import XIcon from '../assets/icons/XIcon'

export default function PokemonInfo() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [pokemon, setPokemon] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)

    const fetchPokemon = async () => {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon/' + id)
        const data = await response.json()
        setPokemon(data)
      } catch (error) {
        setError(error)
      } finally {
        setLoading(false)
      }
    }
    fetchPokemon()
  }, [])

  if (loading) {
    return <Loading />
  }

  if (error) {
    return <p>error: {error.message}</p>
  }

  return (
    <article className="flex flex-col items-center gap-4 max-w-fit mx-auto">
      <XIcon
        className="cursor-pointer self-end fill-red-500 scale-150 hover:scale-125 transition-all duration-300"
        onClickFunction={() => navigate('/pokemons')}
      />
      <h1 className="capitalize text-2xl">
        {pokemon.id}. &nbsp;
        {pokemon.name}
      </h1>
      <img
        src={pokemon.sprites.other.dream_world.front_default}
        alt={`${pokemon.name} sprite`}
        className="max-h-80"
      />
      <div className="flex gap-4">
        {pokemon.types.map((type) => (
          <p
            className={`capitalize ${typeColor[type.type.name]} rounded-full px-2 shadow-sm shadow-gray-700`}
            key={type.slot}
          >
            {type.type.name}
          </p>
        ))}
      </div>
      <div className="flex gap-4">
        {pokemon.abilities.map((ability) => (
          <p
            className="capitalize border py-1 px-2 rounded-full bg-gray-500"
            key={ability.slot}
          >
            {ability.ability.name}
          </p>
        ))}
      </div>
      <div className="flex gap-4">
        {pokemon.stats.map((stat) => (
          <p className="capitalize" key={stat.slot}>
            {stat.stat.name}: {stat.base_stat}
          </p>
        ))}
      </div>
    </article>
  )
}
