import { useNavigate } from 'react-router'
import { typeColor, typeStyle } from '../../styles/TypeStyle.jsx'
import InfoIcon from '../../assets/icons/InfoIcon.jsx'
import HeartIcon from '../../assets/icons/HeartIcon.jsx'
import { useAuth } from '../../context/AuthContext.jsx'

export default function PokemonCard({ pokemon }) {
  const navigate = useNavigate()
  const { token, favorites, setFavorites } = useAuth()

  // Comprobamos si el pokemon actual ya está en nuestra lista de favoritos guardada en el contexto
  const isFavorite = favorites.some((fav) => fav.name === pokemon.name)

  async function addToFavorites(pokemon) {
    if (!token) {
      alert('¡Debes iniciar sesión para añadir a favoritos!')
      return
    }

    try {
      const response = await fetch('http://localhost:3000/api/favorites', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ pokemon }),
      })
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Error al añadir a favoritos')
      }

      if (data.action === 'removed') {
        setFavorites((prev) => prev.filter((p) => p.name !== pokemon.name))
      } else {
        setFavorites((prev) => [...prev, data.pokemon])
      }
    } catch (err) {
      alert(err.message)
    }
  }

  return (
    <article
      className={`h-96 shadow-lg shadow-gray-700 w-60 p-4 rounded-lg flex flex-col items-center gap-6 justify-between group
                ${typeStyle[pokemon.types[0].type.name]}`}
    >
      <div className="flex justify-between w-full relative">
        <p className="capitalize text-xl">{pokemon.name}</p>
        <HeartIcon
          className={`hover:scale-125 transition-all cursor-pointer ${isFavorite ? 'text-red-500 hover:text-red-400' : 'hover:text-red-500'}`}
          onClickFunction={() => addToFavorites(pokemon)}
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
