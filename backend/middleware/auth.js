const jwt = require("jsonwebtoken");

const SECRET = process.env.JWT_SECRET;

const auth = (req, res, next) => {
  const header = req.headers.authorization;

  if (!header) return res.sendStatus(401);

  const token = header.split(" ")[1];

  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded;
    next();
  } catch {
    return res.sendStatus(403);
  }
};

module.exports = auth;