import { useState } from "react"
import { useNavigate, Link } from "react-router"
import { useAuth } from "../context/AuthContext"

export default function Login() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const { login } = useAuth()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        try {
            const response = await fetch("http://localhost:3000/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username, password })
            })
            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || "Error al iniciar sesión")
            }

            // Guardamos el token en localStorage para mantener la sesión
            login(data.token, data.username)

            // Redirigimos a la página principal (Home) o a la de pokemons
            navigate("/")
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 border px-20 py-12 max-w-fit mx-auto place-items-center shadow-xl shadow-white/50 rounded-xl">
            <h1 className="text-center text-xl">¡Bienvenido!</h1>
            <p className="text-center text-sm mb-4">Inicia sesión para continuar</p>
            {error && <p className="text-red-500 text-sm max-w-xs text-center">{error}</p>}
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
            <button
                disabled={loading}
                className={`py-1 px-2 mt-4 bg-white/80 text-black rounded-lg transition-all shadow-sm shadow-white ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white cursor-pointer'}`}
                type="submit"
            >
                {loading ? "Iniciando..." : "Iniciar Sesión"}
            </button>
            <p className="mt-4">¿No tienes cuenta? <Link className="underline font-bold" to="/register">Regístrate</Link></p>
        </form>
    )
}
