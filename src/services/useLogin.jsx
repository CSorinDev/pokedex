import { useState } from 'react'
import { useNavigate } from 'react-router'
import { useAuth } from '../context/AuthContext'
import { loginService } from './authService'

export const useLogin = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { login } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const data = await loginService(username, password)
      // El token ya se guarda solo en la cookie por el navegador
      login(data.username)
      // Redirigimos a la página principal (Home) o a la de pokemons
      navigate('/')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return {
    username,
    setUsername,
    password,
    setPassword,
    error,
    loading,
    handleSubmit,
  }
}
