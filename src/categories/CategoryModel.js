const { Sequelize, DataTypes } = require('sequelize');
const connection = require('../database/database');

const Category = connection.define('Categories', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    }, slug: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Category;