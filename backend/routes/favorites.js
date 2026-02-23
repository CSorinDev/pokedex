const express = require('express');
const verifyToken = require('../middleware/verifyToken');
const Pokemon = require('../models/Pokemon');

const router = express.Router();

router.post('/', verifyToken, async (req, res) => {
    try {
        const { pokemon } = req.body;
        const userId = req.user.id;

        // Formatear los datos que vienen de la PokéAPI al formato de nuestra DB
        const types = pokemon.types.map(t => t.type.name).join(', ');
        const abilities = pokemon.abilities.map(a => a.ability.name).join(', ');
        const stats = pokemon.stats.map(s => `${s.stat.name}:${s.base_stat}`).join(', ');

        // Comprobar si ya lo tiene en favoritos
        const existingFav = await Pokemon.findOne({
            where: { name: pokemon.name, UserId: userId }
        });

        if (existingFav) {
            // eliminar si existe
            await existingFav.destroy();
            return res.status(200).json({ message: 'Pokémon eliminado de favoritos', action: 'removed', name: pokemon.name });
        }

        const newFav = await Pokemon.create({
            name: pokemon.name,
            image: pokemon.sprites.other.dream_world.front_default || pokemon.sprites.front_default,
            types,
            abilities,
            stats,
            UserId: userId
        });

        res.status(201).json({ message: 'Pokémon añadido a favoritos', pokemon: newFav });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al añadir a favoritos' });
    }
});

// Obtener todos los favoritos del usuario logueado
router.get('/', verifyToken, async (req, res) => {
    try {
        const userId = req.user.id;
        const favorites = await Pokemon.findAll({ where: { UserId: userId } });
        res.status(200).json(favorites);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener favoritos' });
    }
});

module.exports = router;
