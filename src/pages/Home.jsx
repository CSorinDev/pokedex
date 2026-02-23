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
    }, [api])

    if (loading) {
        return <Loading />
    }

    if (error) {
        return <p>error: {error.message}</p>
    }

    function changePage(ev) {
        const url = ev.target.value

        if (url) {
            setApi(url)
        }
    }

    return (
        <>
            <section className="flex justify-center gap-4 my-8">
                <button
                    onClick={changePage}
                    value={data.previous}
                    className={`py-2 px-4 rounded-lg bg-blue-500
                        ${!data.previous ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                >
                    Anterior
                </button>
                <button
                    onClick={changePage}
                    value={data.next}
                    className={`py-2 px-4 rounded-lg bg-blue-500
                        ${!data.next ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                >
                    Siguiente
                </button>
            </section>
            <PokemonsSection onClick={(ev) => changePage(ev)} pokemons={pokemons} />
        </>
    )
}