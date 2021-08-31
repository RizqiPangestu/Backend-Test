const { Sequelize } = require('sequelize');
 
// create connection
var connection = new Sequelize('dummy', 'root', 'password', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;