const router = require("express").Router();
const { myQuery } = require("../db");

const jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");

router.post("/logout", async (req, res, next) => {
  res.cookie("token", "", {
    httpOnly: true,
  });
  res.status(200).send("Logout Done");
});

router.post("/login", async (req, res) => {
  try {
    // make sure all info exists
    const { eMail, userPassword } = req.body;
    if (!eMail || !userPassword || eMail === "" || userPassword === "") {
      return res.status(400).send({ Error: "Missing some info..." });
    }
    // get users array from db
    const users = await myQuery(`SELECT * FROM users WHERE eMail = "${eMail}"`);
    const user = users[0];
    // make sure eMail registered
    if (!user) {
      return res.status(401).send({ Error: "Invalid Credentials" });
    }
    // make sure passwords match
    const match = await bcrypt.compare(userPassword, user.userPassword);
    if (!match) {
      return res.status(401).send({ Error: "Invalid Credentials" });
    }
    delete user.userPassword;
    // generate token
    const token = jwt.sign(
      {
        user,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );
    // send token
    res.send({ token, user });
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/register", async (req, res) => {
  try {
    // make sure all info exists
    const { userId, firstName, lastName, eMail, userPassword, city, street } =
      req.body;
    if (
      !userId ||
      !firstName ||
      !lastName ||
      !eMail ||
      !userPassword ||
      !city ||
      !street
    ) {
      return res.status(400).send({ Error: "Missing some info..." });
    }
    // make sure that userId is exactly 9 digits long
    const count = (n) => String(Math.abs(n)).length;
    if (count(userId) != 9)
      return res.status(400).send({ Error: "Invalid ID" });
    // make sure email is valid
    let eMailResult = validateEmail(eMail);
    if (!eMailResult)
      return res.status(400).send({ Error: "Invalid E-Mail Adress" });
    // get users array from db
    const users = await myQuery("SELECT * FROM users;");
    // try to find the user
    const user = users.find((user) => user.userId === userId);
    // try to find the user
    const userMail = users.find((user) => user.eMail === eMail);
    // make sure username isnt already in use
    if (user) {
      return res.status(400).send({ Error: "User already exists..." });
    }
    // make sure email isnt already in use
    if (userMail) {
      return res.status(400).send({ Error: "eMail already exists..." });
    }
    // encrypt password
    const hash = await bcrypt.hash(userPassword, 10);
    const newUser = await myQuery(`
    INSERT INTO users (userId, firstName, lastName, eMail, userPassword, city, street) VALUES (${userId},"${firstName}", "${lastName}", "${eMail}", "${hash}", "${city}", "${street}")
    `);
    // create new user shopping cart
    myQuery(`INSERT INTO shoppingCarts (userCartId) VALUES (${userId});`);
    res.status(201).send(newUser);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/idvalidation/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const result = await myQuery(
      `SELECT COUNT(userId) AS userExists FROM users WHERE userId=${userId};`
    );
    const data = result[0].userExists;
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.get("/mailvalidation/:eMail", async (req, res) => {
  const { eMail } = req.params;
  try {
    const result = await myQuery(
      `SELECT COUNT(eMail) AS userExists FROM users WHERE eMail="${eMail}";`
    );
    const data = result[0].userExists;
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

// Mail validation function
function validateEmail(eMailAdress) {
  let eMailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return eMailPattern.test(eMailAdress);
}

module.exports = router;
