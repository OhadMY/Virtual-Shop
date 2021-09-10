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
      invoice,
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
    const dateCounter = await myQuery(
      `SELECT count(deliveryDate) as count FROM orders WHERE deliveryDate="${deliveryDate}";`
    );
    console.log("Test result", dateCounter[0].count);
    if (dateCounter[0].count >= 3) {
      return res
        .status(400)
        .send("Date already booked, please select a different date");
    } else {
      invoiceData = invoice;
      const newOrder = await myQuery(
        `INSERT INTO orders (userId,cartId,totalPrice,deliveryCity,deliveryStreet,deliveryDate,creditCard) VALUES (${userId},${cartId},${totalPrice},"${deliveryCity}","${deliveryStreet}","${deliveryDate}",${creditCard})`
      );

      res.status(200).send(newOrder);
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

let invoiceData;

router.get("/invoice", (req, res, next) => {
  const stream = res.writeHead(200, {
    "Content-Type": "application/pdf",
    "Content-Disposition": "attachment;filename=invoice.pdf",
  });
  pdfService.buildPDF(
    (chunk) => stream.write(chunk),
    () => stream.end(),
    invoiceData
  );
  invoiceData = "";
});

router.get("/carts/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const carts = await myQuery(
      `SELECT count(userCartId) AS Carts FROM shoppingCarts WHERE userCartId=${userId}`
    );
    res.status(200).send(carts);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
