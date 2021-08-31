const { Sequelize } = require('sequelize');
const bcrypt = require('bcrypt')
var connection = require('../config/connection.js')
 
// init DataTypes
const { DataTypes } = Sequelize;
 
// Define schema
var Users = connection.define('Users', {
  // Define attributes
  user_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING
  },
  password: {
    type: DataTypes.STRING
  },
  token:{
    type: DataTypes.STRING
  }
},{
  // Freeze Table Name
  freezeTableName: true
});

var Favourites = connection.define('Favourites', {
    // Define attributes
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
      type: DataTypes.STRING
    },
    poster_url:{
      type: DataTypes.STRING
    },
    user_id: {
      type: DataTypes.INTEGER
    }
  },{
    // Freeze Table Name
    freezeTableName: true
  });
 
// Export models
const database = {};
database.users = Users;
database.favourites = Favourites;
module.exports = database