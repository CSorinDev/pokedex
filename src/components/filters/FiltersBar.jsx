import FilterByName from './FilterByName'
import FilterByType from './FilterByType'

export default function FiltersBar({ setFilterByName, setFilterByType }) {
  return (
    <section className="flex justify-center gap-8 w-full my-4">
      <FilterByName setFilterByName={setFilterByName} />
      <FilterByType setFilterByType={setFilterByType} />
    </section>
  )
}
