const { Sequelize } = require('sequelize');

const connection = new Sequelize('guiapress', 'root', 'root123', {
    host: 'localhost',
    dialect: 'mysql'
});

//to export the function and use in others js files
module.exports = connection;