require('dotenv').config()
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const sequelize = require('./config/db')

const app = express()

// Middlewares
app.use(cookieParser())
app.use(
  cors({
    origin: 'http://localhost:5173', // Ajusta esto si tu React corre en otro puerto
    credentials: true,
  })
)
app.use(express.json({ limit: '10mb' }))

// Rutas
const authRoutes = require('./routes/auth')
const favoritesRoutes = require('./routes/favorites')

app.use('/api/auth', authRoutes)
app.use('/api/favorites', favoritesRoutes)

// Relaciones de Base de Datos
const User = require('./models/User')
const Pokemon = require('./models/Pokemon')

User.hasMany(Pokemon)
Pokemon.belongsTo(User)

// Sincronizar MySQL y arrancar
const PORT = process.env.PORT || 3000

sequelize
  .sync({ alter: true })
  .then(() => {
    console.log('✅ Base de datos MySQL conectada')
    app.listen(PORT, () =>
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`)
    )
  })
  .catch((err) => console.error('❌ Error de base de datos:', err))
