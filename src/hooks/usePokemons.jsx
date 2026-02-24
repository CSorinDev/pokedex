import { useEffect, useState } from 'react'

let cachedPokemons = null

export const usePokemons = () => {
  const api = 'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0'
  const [pokemons, setPokemons] = useState(cachedPokemons || [])
  const [loading, setLoading] = useState(!cachedPokemons)
  const [error, setError] = useState(null)
  const [filterByName, setFilterByName] = useState('')
  const [filterByType, setFilterByType] = useState('')

  useEffect(() => {
    if (cachedPokemons) return
    setError(null)

    const getPokemons = async () => {
      try {
        const res = await fetch(api)
        const data = await res.json()
        const pokemonsData = await Promise.all(
          data.results.map(async (pokemon) => {
            const response = await fetch(pokemon.url)
            const data = await response.json()
            return data
          })
        )
        cachedPokemons = pokemonsData
        setPokemons(pokemonsData)
      } catch (e) {
        setError(e)
      } finally {
        setLoading(false)
      }
    }
    getPokemons()
  }, [])

  let filteredPokemons = pokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(filterByName.toLowerCase())
  )

  if (filterByType) {
    filteredPokemons = filteredPokemons.filter((pokemon) =>
      pokemon.types.some((type) => type.type.name === filterByType)
    )
  }

  return {
    pokemons: filteredPokemons,
    loading,
    error,
    setFilterByName,
    setFilterByType,
  }
}
