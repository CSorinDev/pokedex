const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
  // Intentamos obtener el token de la cookie o de la cabecera Authorization
  const token = req.cookies.token || req.header('Authorization')?.split(' ')[1]

  if (!token)
    return res
      .status(401)
      .json({ error: 'Acceso denegado. Necesitas iniciar sesión.' })

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET)
    req.user = verified // Contiene el ID del usuario
    next()
  } catch (error) {
    res.status(400).json({ error: 'Token expirado o no válido' })
  }
}

module.exports = verifyToken
