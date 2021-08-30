// import sequelize
const { Sequelize } = require('sequelize');
 
// create connection
var connection = new Sequelize('dummy', 'root', 'password', {
    host: 'localhost',
    dialect: 'mysql'
});
 
// try {
//     await connection.authenticate();
//     console.log('Connection has been established successfully.');
//   } catch (error) {
//     console.error('Unable to connect to the database:', error);
// }

// export connection
module.exports = connection;