const router = require("express").Router();
const { myQuery } = require("../db");
const { verifyUser } = require("../helpers/verifyUser");

router.get("/totalorders", async (req, res) => {
  try {
    const totalorders = await myQuery(
      "SELECT COUNT(orderId) AS Total FROM orders;"
    );
    const total = totalorders[0]["Total"];
    res.status(200).send(total.toString());
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
