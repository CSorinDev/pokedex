import PokemonCard from "./PokemonCard"

export default function PokemonsSection({ pokemons }) {
    if (pokemons.length === 0) {
        return <p>No se han encontrado pokémons</p>
    }

    return (
        <section className="flex gap-8 flex-wrap p-4 justify-center">
            {pokemons.map(pokemon => (
                <PokemonCard pokemon={pokemon} key={pokemon.id} />
            ))}
        </section>
    )
}