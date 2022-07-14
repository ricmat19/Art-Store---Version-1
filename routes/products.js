const express = require("express");
const router = express.Router();
const db = require("../db");
// const { getFileStream } = require("../util/s3");

// router.get("/images/:key", async (req, res) => {
//   try {
//     const key = req.params.key;
//     const readStream = getFileStream(key);
//     readStream.pipe(res);
//   } catch (err) {
//     console.log(err);
//   }
// });

//Get all products items
router.get("/products", async (req, res) => {
  try {
    const products = await db.query("SELECT * FROM products");
    console.log(products)

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

//Get all products items of a certain type
router.get("/products/:product", async (req, res) => {
  try {
    const product = await db.query(
      "SELECT * FROM products WHERE PRODUCT=$1 ORDER BY qty DESC",
      [req.params.product]
    );

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

//Get a specific products item
router.get("/products/:product/:id", async (req, res) => {
  try {
    const item = await db.query(`SELECT * FROM products WHERE id=$1`, [
      req.params.id,
    ]);
    res.status(200).json({
      status: "success",
      results: item.rows.length,
      data: {
        item: item.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
