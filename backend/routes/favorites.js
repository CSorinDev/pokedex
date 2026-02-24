const express = require('express')
const verifyToken = require('../middleware/verifyToken')
const Pokemon = require('../models/Pokemon')

const router = express.Router()

/**
 * AÑADIR O ELIMINAR DE FAVORITOS
 * Esta ruta alterna el estado de favorito de un pokémon para el usuario autenticado.
 */
router.post('/', verifyToken, async (req, res) => {
  try {
    const { pokemon } = req.body
    const userId = req.user.id // Obtenido del token verificado por el middleware

    // 1. Formatear datos: La PokéAPI devuelve arrays de objetos, nosotros los convertimos a strings para la DB simple.
    const types = pokemon.types.map((t) => t.type.name).join(', ')
    const abilities = pokemon.abilities.map((a) => a.ability.name).join(', ')
    const stats = pokemon.stats
      .map((s) => `${s.stat.name}:${s.base_stat}`)
      .join(', ')

    // 2. Comprobar si ya existe en favoritos: Buscamos por nombre de Pokémon y por el ID del usuario.
    const existingFav = await Pokemon.findOne({
      where: { name: pokemon.name, UserId: userId },
    })

    if (existingFav) {
      // Si ya existe, el usuario está haciendo "un-favorite", así que lo borramos.
      await existingFav.destroy()
      return res
        .status(200)
        .json({
          message: 'Pokémon eliminado de favoritos',
          action: 'removed',
          name: pokemon.name,
        })
    }

    // 3. Si no existe, lo creamos vinculándolo al usuario logueado.
    const newFav = await Pokemon.create({
      name: pokemon.name,
      image:
        pokemon.sprites.other.dream_world.front_default ||
        pokemon.sprites.front_default,
      types,
      abilities,
      stats,
      UserId: userId,
    })

    res
      .status(201)
      .json({ message: 'Pokémon añadido a favoritos', pokemon: newFav })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al añadir a favoritos' })
  }
})

/**
 * OBTENER FAVORITOS
 * Devuelve la lista de pokémons que el usuario actual ha marcado como favoritos.
 */
router.get('/', verifyToken, async (req, res) => {
  try {
    const userId = req.user.id
    // Buscamos en la base de datos todos los pokémons cuyo UserId coincida con el del token.
    const favorites = await Pokemon.findAll({ where: { UserId: userId } })
    res.status(200).json(favorites)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al obtener favoritos' })
  }
})

module.exports = router
