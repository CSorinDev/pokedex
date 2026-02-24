export default function FilterByType({setFilterByType}) {
  const types = [
    'normal',
    'fighting',
    'flying',
    'poison',
    'ground',
    'rock',
    'bug',
    'ghost',
    'steel',
    'fire',
    'water',
    'grass',
    'electric',
    'psychic',
    'ice',
    'dragon',
    'dark',
    'fairy',
    'stellar',
  ]

  return (
    <select
      name="pokemon-type"
      className="border py-1 px-2 rounded-full text-white"
      onChange={(e) => setFilterByType(e.target.value)}
    >
      <option className="text-black" value="">All</option>
      {types.map((type) => (
        <option key={type} className="text-black" value={type}>
          {type}
        </option>
      ))}
    </select>
  )
}
