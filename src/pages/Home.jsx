import { useEffect, useState } from "react"
import PokemonsSection from "../components/PokemonsSection"
import Loading from "../components/Loading"

export default function Home() {
    const [data, setData] = useState(null)
    const [pokemons, setPokemons] = useState([])
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)
    const [api, setApi] = useState("https://pokeapi.co/api/v2/pokemon")

    useEffect(() => {
        setLoading(true)
        const fetchPokemons = async () => {
            try {
                const response = await fetch(api)
                const data = await response.json()
                setData(data)
                const pokemons = await Promise.all(
                    data.results.map(async (pokemon) => {
                        const response = await fetch(pokemon.url)
                        const data = await response.json()
                        return data
                    })
                )
                setPokemons(pokemons)
            } catch (error) {
                setError(error)
            } finally {
                setLoading(false)
            }
        }
        fetchPokemons()
    }, [])

    if (loading) {
        return <Loading />
    }

    if (error) {
        return <p>error: {error.message}</p>
    }

    return (
        <PokemonsSection pokemons={pokemons} />
    )
}