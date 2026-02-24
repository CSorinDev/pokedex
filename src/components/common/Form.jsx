import { Link } from 'react-router'

export default function Form({
  handleSubmit,
  title,
  description,
  inputs,
  error,
  loading,
  subtitle,
  subtitleLink,
  subtitleText,
}) {
  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 gap-4 border px-20 py-12 max-w-fit mx-auto place-items-center shadow-lg shadow-white/50 rounded-xl backdrop-brightness-75"
    >
      <h1 className="text-center text-xl">{title}</h1>
      <p className="text-center text-sm">{description}</p>
      {error && (
        <p className="text-red-500 text-sm max-w-xs text-center">{error}</p>
      )}
      {inputs.map((input) => (
        <input
          name={input.name}
          {...input}
          key={input.name}
          className="border py-1 px-2 rounded-lg outline-0 ring-white focus:ring-2 transition-all"
        />
      ))}
      <button
        disabled={loading}
        className={`py-1 px-2 mt-4 bg-white/80 text-black rounded-lg transition-all shadow-sm shadow-white ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white cursor-pointer'}`}
        type="submit"
      >
        {loading ? 'Iniciando...' : 'Iniciar Sesión'}
      </button>
      {subtitle && subtitleLink && (
        <p className="mt-4">
          {subtitle}
          <Link className="underline font-bold" to={subtitleLink}>
            {subtitleText}
          </Link>
        </p>
      )}
    </form>
  )
}
