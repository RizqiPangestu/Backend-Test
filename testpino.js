require("dotenv").config()
const jwt = require('jsonwebtoken')
process.env['TOKEN_KEY'] = 'aku'
console.log(process.env.TOKEN_KEY)