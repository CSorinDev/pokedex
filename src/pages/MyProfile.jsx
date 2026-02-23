import { useNavigate } from "react-router"
import { useAuth } from "../context/AuthContext"

export default function MyProfile() {
    const navigate = useNavigate()
    const { logout } = useAuth()

    const closeSession = () => {
        logout()
        navigate("/login")
    }

    return (
        <section className="grid place-items-center">
            <button
                className="py-1 px-2 bg-linear-to-r from-red-500 to-red-700 hover:contrast-125 transition-all rounded-lg cursor-pointer"
                onClick={closeSession}
            >
                Cerrar Sesión
            </button>
        </section>
    )
}