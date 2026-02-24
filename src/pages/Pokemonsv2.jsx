import { usePokemons } from '../hooks/usePokemons'
import { useScroll } from '../hooks/useScroll'
import Loading from '../components/Loading'
import ErrorModal from '../components/ErrorModal'
import PokemonCard from '../components/PokemonCard'
import FiltersBar from '../components/FiltersBar'

export default function Pokemonsv2() {
  const { pokemons, loading, error, setFilterByName } = usePokemons()
  const { limit } = useScroll(10, 10)

  if (loading) return <Loading message="Cargando pokemons..." />
  if (error) return <ErrorModal message={error.message} />

  return (
    <>
      <FiltersBar setFilterByName={setFilterByName} />
      <section className="flex gap-8 flex-wrap p-4 justify-center">
        {pokemons &&
          pokemons.slice(0, limit).map((pokemon) => {
            return <PokemonCard pokemon={pokemon} key={pokemon.id} />
          })}
      </section>
    </>
  )
}
