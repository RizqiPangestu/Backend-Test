const jwt = require("jsonwebtoken");
require("dotenv").config()

const config = process.env.TOKEN_KEY;

const verifyToken = (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers["authorization"];
  console.log(token)
  console.log(config)

  if (!token) {
    return res.send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, config);
    console.log("decoded %s",decoded.password)
    req.user = decoded;
  } catch (err) {
    return res.send(err);
  }
  return next();
};

module.exports = verifyToken;