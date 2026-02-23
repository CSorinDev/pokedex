const { DataTypes } = require("sequelize")
const sequelize = require("../config/db")

const Pokemon = sequelize.define("Pokemon", {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false
    },
    types: {
        type: DataTypes.STRING,
        allowNull: false
    },
    abilities: {
        type: DataTypes.STRING,
        allowNull: false
    },
    stats: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: true
})

module.exports = Pokemon