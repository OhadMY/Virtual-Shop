const router = require("express").Router();
const { myQuery } = require("../db");
const { verifyUser, verifyAdmin } = require("../helpers/verifyUser");

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

router.post("/addproduct/:prodId", verifyUser, async (req, res) => {
  try {
    const { prodId } = req.params;
    const { cartId, quantity } = req.body;
    if (!quantity || !cartId) {
      return res.status(400).send("Missing some info...");
    }
    const newProd = await myQuery(
      `INSERT INTO ProdInCart (cartId,quantity,prodCartId) VALUES (${cartId},${quantity},${prodId})`
    );
    res.status(200).send(newProd);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete("/deleteproduct/:prodInCart", verifyUser, async (req, res) => {
  try {
    const { prodInCart } = req.params;
    const newProd = await myQuery(
      `DELETE FROM prodInCart WHERE prodInCartId = ${prodInCart}`
    );
    res.status(200).send(newProd);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.put("/addoneprod/:prodInCart", verifyUser, async (req, res) => {
  try {
    const { prodInCart } = req.params;
    const newProd = await myQuery(
      `UPDATE ProdInCart SET quantity=quantity+1 WHERE prodInCartId = ${prodInCart}`
    );
    res.status(200).send(newProd);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.put("/removeoneprod/:prodInCart", verifyUser, async (req, res) => {
  try {
    const { prodInCart } = req.params;
    const newProd = await myQuery(
      `DELETE FROM prodInCart WHERE prodInCartId = ${prodInCart}`
    );
    // const newProd = await myQuery(
    //   `UPDATE ProdInCart SET quantity=quantity-1 WHERE prodInCartId = ${prodInCart}`
    // );
    res.status(200).send(newProd);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
