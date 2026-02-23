require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/db');
const authRoutes = require('./routes/auth');

const app = express();

// Middlewares
app.use(cors()); // ¡VITAL para que React se pueda conectar!
app.use(express.json()); // Para poder leer los JSON que envíe React

// Rutas
app.use('/api/auth', authRoutes);

// Sincronizar MySQL y arrancar
const PORT = process.env.PORT || 3000;

sequelize.sync({ alter: true })
    .then(() => {
        console.log('✅ Base de datos MySQL conectada');
        app.listen(PORT, () => console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`));
    })
    .catch(err => console.error('❌ Error de base de datos:', err));