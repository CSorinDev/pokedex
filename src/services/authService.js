// export the login logic to be able to use it inside a custom hook or another component
export const loginService = async (username, password) => {
  const response = await fetch('http://localhost:3000/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.error || 'Error al iniciar sesión')
  }

  return data
}
