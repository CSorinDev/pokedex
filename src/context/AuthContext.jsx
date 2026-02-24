import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [favorites, setFavorites] = useState([])

  useEffect(() => {
    // Al cargar la app, comprobamos si hay una sesión guardada (el nombre de usuario)
    const savedUser = localStorage.getItem('username')
    if (savedUser) {
      setUser(savedUser)
    }
  }, [])

  useEffect(() => {
    if (user) {
      // Cuando haya usuario, intentamos traer los favoritos
      // El navegador enviará la cookie automáticamente si existe
      fetch('http://localhost:3000/api/favorites', {
        credentials: 'include',
      })
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data)) setFavorites(data)
        })
        .catch((err) => console.error('Error cargando favoritos:', err))
    } else {
      setFavorites([])
    }
  }, [user])

  const login = (newUser) => {
    // Guardamos el nombre en el estado y localStorage
    setUser(newUser)
    localStorage.setItem('username', newUser)
  }

  const logout = async () => {
    try {
      // Avisamos al backend para que borre la cookie
      await fetch('http://localhost:3000/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      })
    } catch (error) {
      console.error('Error al cerrar sesión:', error)
    } finally {
      // Limpiamos el estado y el localStorage pase lo que pase
      setUser(null)
      localStorage.removeItem('username')
    }
  }

  return (
    <AuthContext.Provider
      value={{ user, favorites, setFavorites, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  )
}

// Hook personalizado para usar el contexto de forma más limpia
export const useAuth = () => {
  return useContext(AuthContext)
}
