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

router.put("/closecart/:shoppingCartId", verifyUser, async (req, res) => {
  try {
    const { shoppingCartId } = req.params;
    myQuery(`SET SQL_SAFE_UPDATES = 0;`);
    const lastClosedCart = await myQuery(
      `UPDATE shoppingCarts SET cartStatus=1 WHERE cartStatus=0 AND shoppingCartId=${shoppingCartId};`
    );
    myQuery(`SET SQL_SAFE_UPDATES = 1;`);
    res.status(200).send(lastClosedCart);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/usercart/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const usercart = await myQuery(
      `SELECT * FROM shoppingCarts WHERE userCartId = ${userId} AND cartStatus=0`
    );
    if (usercart.length === 0) {
      await myQuery(
        `INSERT INTO shoppingCarts (userCartId) VALUES (${userId});`
      );
      const newcart = await myQuery(
        `SELECT * FROM shoppingCarts WHERE userCartId = ${userId} AND cartStatus=0`
      );
      res.status(200).send(newcart);
    } else res.status(200).send(usercart);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/totalprice/:shoppingCartId", async (req, res) => {
  const { shoppingCartId } = req.params;
  try {
    const totalPrice = await myQuery(
      `SELECT SUM(prodInCart.quantity * products.prodPrice) AS Total 
      FROM prodInCart JOIN products ON prodInCart.prodCartId = products.prodId WHERE cartId=${shoppingCartId} GROUP BY prodInCart.cartId ;`
    );
    res.status(200).send(totalPrice);
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
