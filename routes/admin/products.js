const express = require("express");
const router = express.Router();
const db = require("../../db");

//Get all products items
router.get("/admin/products", async (req, res) => {
  try {
    const products = await db.query("SELECT * FROM products");

    res.status(200).json({
      status: "success",
      results: products.rows.length,
      data: {
        products: products.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

//Get all products items
router.get("/admin/products/:product", async (req, res) => {
  try {
    const product = await db.query("SELECT * FROM products WHERE PRODUCT=$1", [
      req.params.product,
    ]);
    console.log(product)
    res.status(200).json({
      status: "success",
      results: product.rows.length,
      data: {
        product: product.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

//Delete a products item
router.delete("/admin/delete/:id", async (req, res) => {
  try {
    await db.query("DELETE FROM products WHERE id = $1", [req.params.id]);
    res.status(204).json({
      status: "success",
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
