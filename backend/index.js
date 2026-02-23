require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/db');

const app = express();

// Middlewares
app.use(cors()); // ¡VITAL para que React se pueda conectar!
app.use(express.json({ limit: '10mb' })); // Para poder leer los JSON grandes que envíe React

// Rutas
const authRoutes = require('./routes/auth');
const favoritesRoutes = require('./routes/favorites');

app.use('/api/auth', authRoutes);
app.use('/api/favorites', favoritesRoutes);

// Relaciones de Base de Datos
const User = require('./models/User');
const Pokemon = require('./models/Pokemon');

User.hasMany(Pokemon);
Pokemon.belongsTo(User);

// Sincronizar MySQL y arrancar
const PORT = process.env.PORT || 3000;

sequelize.sync({ alter: true })
    .then(() => {
        console.log('✅ Base de datos MySQL conectada');
        app.listen(PORT, () => console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`));
    })
    .catch(err => console.error('❌ Error de base de datos:', err));
