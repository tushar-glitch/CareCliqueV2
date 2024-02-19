const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  
  try {
    const token = req.headers.authorization.split(" ")[1];
    const verifyToken = jwt.verify(token, process.env.JWT_KEY);
    if (!verifyToken) {
      return res.status(401).send("Token error");
    }
    console.log('fdsa');
    req.locals = verifyToken.userId;
    next();
  } catch (error) {
    console.log(error);
    return error;
  }
};

module.exports = auth;
