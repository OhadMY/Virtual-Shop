const jwt = require("jsonwebtoken");

function verifyUser(req, res, next) {
  try {
    const token = req.headers["authorization"];
    // const token = req.headers.cookie.split("=")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
      if (err) {
        return res.status(401).send(err);
      }
      req.user = payload;
      next();
    });
  } catch (error) {
    if (error) {
      return res.status(401).send({ error: "No connected User" });
    }
    next();
  }
}

function verifyAdmin(req, res, next) {
  // if user type is 0, it means the user is not an admin
  if (req.user.user.userType === 0) return res.status(401).send("Not an admin");
  next();
}

module.exports = { verifyUser, verifyAdmin };
