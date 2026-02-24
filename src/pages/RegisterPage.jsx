import { Link } from 'react-router'
import useRegister from '../hooks/useRegister'

export default function RegisterPage() {
  const {
    username,
    setUsername,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    error,
    loading,
    handleSubmit,
  } = useRegister()

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 gap-4 border px-20 py-12 max-w-fit mx-auto place-items-center shadow-lg shadow-white/50 rounded-xl backdrop-brightness-75"
    >
      <h1 className="text-center text-xl">¡Únete!</h1>
      <p className="text-center text-sm mb-4">Crea una cuenta nueva</p>

      <input
        type="text"
        placeholder="Nombre"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="border py-1 px-2 rounded-lg outline-0 ring-white focus:ring-2 transition-all"
        required
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border py-1 px-2 rounded-lg outline-0 ring-white focus:ring-2 transition-all"
        required
      />
      <input
        type="password"
        placeholder="Confirmar contraseña"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className="border py-1 px-2 rounded-lg outline-0 ring-white focus:ring-2 transition-all"
      />
      <button
        disabled={loading}
        className={`py-1 px-2 mt-4 bg-white/80 text-black rounded-lg transition-all shadow-sm shadow-white ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white cursor-pointer'}`}
        type="submit"
      >
        {loading ? 'Registrando...' : 'Registrar'}
      </button>
      {error && (
        <p className="text-red-500 text-sm max-w-xs text-center">
          {error}
        </p>
      )}
      <p className="mt-4">
        ¿Ya tienes cuenta?{' '}
        <Link className="underline font-bold" to="/login">
          Inicia sesión
        </Link>
      </p>
    </form>
  )
}
