const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

const router = express.Router()

/**
 * REGISTRO DE USUARIO
 * Crea un nuevo usuario en la base de datos con la contraseña encriptada.
 */
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body

    // Encriptar contraseña: Nunca guardamos contraseñas en texto plano por seguridad.
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Guardar en MySQL usando el modelo Sequelize
    await User.create({ username, password: hashedPassword })

    res.status(201).json({ message: '¡Entrenador registrado con éxito!' })
  } catch (error) {
    // Si el nombre de usuario ya existe, Sequelize lanzará este error de restricción única
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res
        .status(400)
        .json({ error: 'Ese nombre de usuario ya está ocupado' })
    }
    res.status(500).json({ error: 'Error al registrar' })
  }
})

/**
 * LOGIN DE USUARIO
 * Verifica las credenciales y genera una Cookie HttpOnly con el JWT.
 */
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body

    // 1. Buscar si el usuario existe en la DB
    const user = await User.findOne({ where: { username } })
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' })

    // 2. Comparar la contraseña enviada con la encriptada en la base de datos
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch)
      return res.status(400).json({ error: 'Contraseña incorrecta' })

    // 3. Generar el Token (JWT): Contiene el ID y el nombre del usuario
    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '2h' } // El token expira automáticamente en 2 horas
    )

    // 4. Configurar y enviar el token en una Cookie HttpOnly
    res.cookie('token', token, {
      httpOnly: true, // Impide que el JavaScript del frontend pueda leer la cookie (Protección contra XSS)
      secure: process.env.NODE_ENV === 'production', // Solo se envía por HTTPS si estamos en producción
      sameSite: 'strict', // Solo se envía la cookie si la petición viene desde el mismo sitio
      maxAge: 24 * 60 * 60 * 1000, // Tiempo de vida de la cookie: 1 día
    })

    // Enviamos solo el nombre de usuario, el token va oculto en la cookie
    res.json({ username: user.username, message: '¡Login exitoso!' })
  } catch (error) {
    res.status(500).json({ error: 'Error en el servidor' })
  }
})

/**
 * LOGOUT DE USUARIO
 * Borra la cookie de autenticación del navegador.
 */
router.post('/logout', (req, res) => {
  res.clearCookie('token') // Forzamos al navegador a borrar la cookie llamada 'token'
  res.json({ message: 'Sesión cerrada' })
})

module.exports = router
