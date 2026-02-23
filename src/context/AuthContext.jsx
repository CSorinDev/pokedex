import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        // Al cargar la app, comprobamos si hay una sesión guardada
        const savedUser = localStorage.getItem("username");
        const savedToken = localStorage.getItem("token");

        if (savedUser && savedToken) {
            setUser(savedUser);
            setToken(savedToken);
        }
    }, []);

    useEffect(() => {
        if (token) {
            // Cuando haya token, nos traemos los favoritos de MySQL
            fetch("http://localhost:3000/api/favorites", {
                headers: { "Authorization": `Bearer ${token}` }
            })
                .then(res => res.json())
                .then(data => {
                    if (Array.isArray(data)) setFavorites(data)
                })
                .catch(err => console.error("Error cargando favoritos:", err));
        } else {
            setFavorites([]);
        }
    }, [token]);

    const login = (newToken, newUser) => {
        // Guardamos en estado
        setToken(newToken);
        setUser(newUser);

        // Persistimos en localStorage
        localStorage.setItem("token", newToken);
        localStorage.setItem("username", newUser);
    };

    const logout = () => {
        // Limpiamos el estado
        setUser(null);
        setToken(null);

        // Limpiamos el localStorage
        localStorage.removeItem("token");
        localStorage.removeItem("username");
    };

    return (
        <AuthContext.Provider value={{ user, token, favorites, setFavorites, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

// Hook personalizado para usar el contexto de forma más limpia
export const useAuth = () => {
    return useContext(AuthContext);
};
