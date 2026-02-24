import { useNavigate } from 'react-router'
import { useAuth } from '../context/AuthContext'

export function usePokemonCard(pokemon) {
  const navigate = useNavigate()
  const { token, favorites, setFavorites } = useAuth()

  // Comprobamos si el pokemon actual ya está en nuestra lista de favoritos guardada en el contexto
  const isFavorite = favorites.some((fav) => fav.name === pokemon.name)

  async function addToFavorites() {
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

  return { isFavorite, addToFavorites }
}
