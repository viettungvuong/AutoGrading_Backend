const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  // token cho jwt
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) return res.status(401).json({ error: "Unauthorized" });
    req.user = decoded;
    next();
  });
};

const generateRandomKey = () => {
  return crypto.randomBytes(32).toString("hex");
};

module.exports = {
  verifyToken,
  generateRandomKey,
};
