/**
 * ARCHIVO PRINCIPAL DEL BACKEND
 * Aquí se configura el servidor Express, los middlewares globales y las conexiones a la base de datos.
 */
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const sequelize = require('./config/db')

const app = express()

// --- MIDDLEWARES GLOBALES ---

// cookie-parser: Permite al servidor leer las cookies que envía el navegador en las cabeceras.
app.use(cookieParser())

// cors: Configura quién puede conectarse a este servidor. En este caso, permitimos a nuestro frontend de React.
app.use(
  cors({
    origin: 'http://localhost:5173', // Solo permitimos peticiones de nuestro frontend
    credentials: true, // NECESARIO para que el navegador acepte y envíe las Cookies HttpOnly
  })
)

// express.json: Permite que el servidor entienda datos en formato JSON enviados en el cuerpo (body) de las peticiones.
app.use(express.json({ limit: '10mb' }))

// --- DEFINICIÓN DE RUTAS ---
const authRoutes = require('./routes/auth')
const favoritesRoutes = require('./routes/favorites')

app.use('/api/auth', authRoutes) // Gestión de usuarios (login, registro, logout)
app.use('/api/favorites', favoritesRoutes) // Gestión de pokémons favoritos (protegido por token)

// --- RELACIONES DE LA BASE DE DATOS ---
const User = require('./models/User')
const Pokemon = require('./models/Pokemon')

// Definimos que un Usuario puede tener muchos Pokémons favoritos, y cada Pokémon pertenece a un Usuario.
User.hasMany(Pokemon)
Pokemon.belongsTo(User)

// --- ARRANQUE DEL SERVIDOR ---
const PORT = process.env.PORT || 3000

// Sincronizamos los modelos con la base de datos MySQL (crea las tablas si no existen)
sequelize
  .sync({ alter: true })
  .then(() => {
    console.log('✅ Base de datos MySQL conectada')
    // Iniciamos el servidor para escuchar peticiones en el puerto configurado
    app.listen(PORT, () =>
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`)
    )
  })
  .catch((err) => console.error('❌ Error de base de datos:', err))
