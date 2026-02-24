import { usePokemons } from '../hooks/usePokemons'
import { useScroll } from '../hooks/useScroll'
import Loading from '../components/common/Loading'
import ErrorModal from '../components/common/ErrorModal'
import PokemonCard from '../components/pokemon/PokemonCard'
import FiltersBar from '../components/filters/FiltersBar'

export default function Pokemons() {
  const { pokemons, loading, error, setFilterByName, setFilterByType } = usePokemons()
  const { limit } = useScroll(10, 10)

  if (loading) return <Loading message="Cargando pokemons..." />
  if (error) return <ErrorModal message={error.message} />

  return (
    <>
      <FiltersBar setFilterByName={setFilterByName} setFilterByType={setFilterByType} />
      <section className="flex gap-8 flex-wrap p-4 justify-center">
        {pokemons &&
          pokemons.slice(0, limit).map((pokemon) => {
            return <PokemonCard pokemon={pokemon} key={pokemon.id} />
          })}
      </section>
    </>
  )
}
