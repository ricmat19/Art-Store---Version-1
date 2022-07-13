const express = require("express");
const router = express.Router();
const db = require("../db");

//Add an item to a users cart
router.post("/cart", async (req, res) => {
  try {
    const cart = await db.query(
      "SELECT cart FROM cart WHERE email='ric19mat@gmail.com'"
    );

    let currentCart = cart.rows[0].cart;
    let newItem = req.body.id;

    //Check that new item does not exist in the cart

    let uniqueItem = true;
    if (currentCart !== null) {
      for (let i = 0; i < currentCart.length; i++) {
        if (currentCart[i] === req.body.id) {
          uniqueItem = false;
        }
      }

      if (uniqueItem === true) {
        currentCart.push(newItem);
      }
    } else {
      currentCart = [req.body.id];
    }

    let newCart = await db.query(
      "UPDATE cart SET cart=$1 WHERE email='ric19mat@gmail.com'",
      [currentCart]
    );
    // let newCart = await db.query("UPDATE users SET cart=$1 WHERE email=$2", [
    //   currentCart,
    //   req.session.email,
    // ]);

    res.status(201).json({
      status: "success",
      results: newCart.rows,
      data: {
        cart: newCart.rows,
        uniqueItem: uniqueItem,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

//Get all products items of a certain type
router.get("/cart", async (req, res) => {
  try {
    const cart = await db.query(
      "SELECT * FROM cart WHERE email='ric19mat@gmail.com'"
    );

    const usersCart = [];

    if (cart.rows[0].cart !== null) {
      for (let i = 0; i < cart.rows[0].cart.length; i++) {
        const cartproducts = await db.query(
          "SELECT * FROM products WHERE id=$1",
          [cart.rows[0].cart[i]]
        );
        usersCart.push(cartproducts.rows[0]);
      }
    }

    const qty = await db.query(
      "SELECT qty FROM cart WHERE email='ric19mat@gmail.com'"
    );
    const cartQty = qty.rows[0].qty;

    res.status(200).json({
      status: "success",
      results: usersCart.length,
      data: {
        cart: usersCart,
        qty: cartQty,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

router.put("/cart/quantity", async (req, res) => {
  try {
    await db.query(
      "UPDATE cart SET qty=$1 WHERE email='ric19mat@gmail.com' RETURNING *",
      [req.body.cartQty]
    );

    res.status(201).json({
      status: "success",
    });
  } catch (err) {
    console.log(err);
  }
});

router.put("/cart/delete", async (req, res) => {
  try {
    const cart = await db.query(
      "SELECT cart FROM cart WHERE email='ric19mat@gmail.com'"
    );

    const newCart = [];
    for (let i = 0; i < cart.rows[0].cart.length; i++) {
      if (req.body.id !== cart.rows[0].cart[i]) {
        newCart.push(cart.rows[0].cart[i]);
      }
    }

    let qty = [];
    for (let i = 0; i < newCart.length; i++) {
      qty.push(1);
    }

    if (JSON.stringify(newCart) !== JSON.stringify([])) {
      await db.query(
        "UPDATE cart SET cart=$1, qty=$2 WHERE email='ric19mat@gmail.com' RETURNING *",
        [newCart, qty]
      );
    } else {
      await db.query(
        "UPDATE cart SET cart=(NULL), qty=(NULL) WHERE email='ric19mat@gmail.com' RETURNING *"
      );
    }

    res.status(201).json({
      status: "success",
    });
  } catch (err) {
    console.log(err);
  }
});

router.put("/cart/deleteAll", async (req, res) => {
  try {
    await db.query(
      "UPDATE cart SET cart=(NULL), qty=(NULL) WHERE email='ric19mat@gmail.com' RETURNING *"
    );

    res.status(201).json({
      status: "success",
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
