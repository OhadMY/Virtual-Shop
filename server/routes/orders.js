const router = require("express").Router();
const { myQuery } = require("../db");
const { verifyUser } = require("../helpers/verifyUser");
const pdfService = require("../service/pdf-service");

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

router.post("/neworder", verifyUser, async (req, res) => {
  try {
    const {
      userId,
      cartId,
      totalPrice,
      deliveryCity,
      deliveryStreet,
      deliveryDate,
      creditCard,
    } = req.body;
    if (
      !userId ||
      !cartId ||
      !totalPrice ||
      !deliveryCity ||
      !deliveryStreet ||
      !deliveryDate ||
      !creditCard
    ) {
      return res.status(400).send("Missing some info...");
    }
    const newProd = await myQuery(
      `INSERT INTO orders (userId,cartId,totalPrice,deliveryCity,deliveryStreet,deliveryDate,creditCard) VALUES (${userId},${cartId},${totalPrice},"${deliveryCity}","${deliveryStreet}","${deliveryDate}",${creditCard})`
    );
    res.status(200).send(newProd);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/invoice", (req, res, next) => {
  const stream = res.writeHead(200, {
    "Content-Type": "application/pdf",
    "Content-Disposition": "attachment;filename=invoice.pdf",
  });

  pdfService.buildPDF(
    (chunk) => stream.write(chunk),
    () => stream.end()
  );
});

module.exports = router;
