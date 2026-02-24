const jwt = require('jsonwebtoken')

/**
 * MIDDLEWARE DE VERIFICACIÓN DE TOKEN
 * Se intercepta la petición antes de llegar al controlador para asegurar que el usuario esté autenticado.
 */
const verifyToken = (req, res, next) => {
  // Intentamos obtener el token de dos sitios:
  // 1. De las cookies (sistema actual HttpOnly)
  // 2. De la cabecera Authorization (por si se usa desde herramientas de testing como Postman)
  const token = req.cookies.token || req.header('Authorization')?.split(' ')[1]

  // Si no hay token, cortamos la petición aquí mismo
  if (!token)
    return res
      .status(401)
      .json({ error: 'Acceso denegado. Necesitas iniciar sesión.' })

  try {
    // Verificamos que el token sea válido y no haya expirado usando la clave secreta
    const verified = jwt.verify(token, process.env.JWT_SECRET)
    // Guardamos los datos del usuario extraídos del token en el objeto 'req' para que las siguientes funciones puedan usarlos
    req.user = verified
    next() // Continuamos hacia la siguiente función (el controlador)
  } catch (error) {
    res.status(400).json({ error: 'Token expirado o no válido' })
  }
}

module.exports = verifyToken
