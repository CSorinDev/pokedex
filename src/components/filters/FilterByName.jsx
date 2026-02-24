import SearchIcon from '../../assets/icons/SearchIcon'

export default function FilterByName({ setFilterByName }) {
  const handleChange = (e) => {
    setFilterByName(e.target.value)
  }

  return (
    <div className="relative">
      <SearchIcon className="absolute top-1/2 -translate-y-1/2 left-2" />
      <input
        type="text"
        placeholder="Buscar pokemon..."
        onChange={handleChange}
        className='outline-0 ring-1 ring-white/50 focus:ring-2 focus:ring-white transition-all py-1 pl-10 pr-2 rounded-full'
      />
    </div>
  )
}
