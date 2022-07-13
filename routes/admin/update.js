const express = require("express");
const router = express.Router();
const db = require("../../db");

//Get a specific products item for update
router.get("/admin/update/:id", async (req, res) => {
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

// //Update a products item
router.put("/admin/update/:id", async (req, res) => {
  try {
    // if (req.body.primaryImage === "on") {
    //   await db.query(
    //     "UPDATE products SET primaryimage=false WHERE product=$1",
    //     [req.body.type]
    //   );
    // }

    const item = await db.query(
      "UPDATE products SET title=$1, product=$2, qty=$3, price=$4, info=$5 WHERE id=$7",
      [
        req.body.title,
        req.body.type,
        req.body.quantity,
        req.body.price,
        req.body.info,
        // req.body.primaryImage,
        req.params.id,
      ]
    );
    res.status(201).json({
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
