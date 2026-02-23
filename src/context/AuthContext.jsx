import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    useEffect(() => {
        // Al cargar la app, comprobamos si hay una sesión guardada
        const savedUser = localStorage.getItem("username");
        const savedToken = localStorage.getItem("token");

        if (savedUser && savedToken) {
            setUser(savedUser);
            setToken(savedToken);
        }
    }, []);

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
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

// Hook personalizado para usar el contexto de forma más limpia
export const useAuth = () => {
    return useContext(AuthContext);
};
