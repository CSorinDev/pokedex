const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// REGISTRO DE USUARIO
router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Encriptar contraseña
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Guardar en MySQL
        await User.create({ username, password: hashedPassword });

        res.status(201).json({ message: '¡Entrenador registrado con éxito!' });
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({ error: 'Ese nombre de usuario ya está ocupado' });
        }
        res.status(500).json({ error: 'Error al registrar' });
    }
});

// LOGIN DE USUARIO
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Buscar usuario
        const user = await User.findOne({ where: { username } });
        if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

        // Comparar contraseñas
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: 'Contraseña incorrecta' });

        // Generar Token (JWT)
        const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '2h' });

        // Devolvemos el token y el nombre de usuario para que React lo use
        res.json({ token, username: user.username, message: '¡Login exitoso!' });
    } catch (error) {
        res.status(500).json({ error: 'Error en el servidor' });
    }
});

module.exports = router;
