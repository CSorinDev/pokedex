import FilterByName from './FilterByName'

export default function FiltersBar({ setFilterByName }) {
  return (
    <section className="flex justify-center w-full my-4">
      <FilterByName setFilterByName={setFilterByName} />
    </section>
  )
}
