const router = require("express").Router();
const { myQuery } = require("../db");
const { verifyUser, verifyAdmin } = require("../helpers/verifyUser");

router.get("/", verifyUser, async (req, res) => {
  try {
    const products = await myQuery("SELECT * FROM products;");
    res.status(200).send(products);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/:prodCategoryId", verifyUser, async (req, res) => {
  try {
    const { prodCategoryId } = req.params;
    const products = await myQuery(
      `SELECT * FROM products WHERE categoryId=${prodCategoryId}`
    );
    res.status(200).send(products);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/newproduct", verifyUser, verifyAdmin, async (req, res) => {
  try {
    const { categoryId, prodName, prodPrice, prodImage } = req.body;
    if (!categoryId || !prodName || !prodPrice || !prodImage) {
      return res.status(400).send("Missing some info...");
    }
    const newProd = await myQuery(
      `INSERT INTO products (categoryId,prodName,prodPrice,prodImage) VALUES (${categoryId},"${prodName}","${prodPrice}","${prodImage}")`
    );
    res.status(200).send(newProd);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.put(
  "/editproduct/:prodId",
  verifyUser,
  verifyAdmin,
  async (req, res) => {
    try {
      const { prodId } = req.params;
      const { categoryId, prodName, prodPrice, prodImage } = req.body;
      if (!categoryId || !prodName || !prodPrice || !prodImage) {
        return res.status(400).send("Missing some info...");
      }
      const editProd = await myQuery(
        `UPDATE products SET categoryId=${categoryId}, prodName="${prodName}",prodPrice=${prodPrice},prodImage="${prodImage}" WHERE prodId=${prodId};`
      );
      res.status(200).send(editProd);
    } catch (error) {
      res.status(500).send(error);
    }
  }
);

module.exports = router;
