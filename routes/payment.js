const express = require("express");
const router = express.Router();

//insures that the .env file is only run in a development environment and not a production environment
if (process.env.NODE_ENV !== "production") {
  //requires the the .env file configuration be run first hiding all info hidden via the .env file
  require("dotenv").config();
}

const stripe = require("stripe")(process.env.STRIPESECRET);

router.post("/payment", async (req, res) => {
  let { amount, id } = req.body;

  try {
    await stripe.paymentIntents.create({
      amount: amount,
      currency: "USD",
      description: "???",
      payment_method: id,
      confirm: true,
    });

    res.status(201).json({
      status: "success",
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
