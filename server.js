const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const path = require("path");
const app = express();
const adminLoginRouter = require("./routes/admin/login")
const adminProductsRouter = require("./routes/admin/products");
const adminCreateRouter = require("./routes/admin/create");
const adminUpdateRouter = require("./routes/admin/update");
const productsRouter = require("./routes/products");
const contactRouter = require("./routes/contact");
const usersRouter = require("./routes/users");
const cartRouter = require("./routes/cart");
const paymentRouter = require("./routes/payment");
const shipmentRouter = require("./routes/shipment");

//allows for different domains to communicate
app.use(
  cors({
    origin: [process.env.ORIGIN, process.env.REACT_APP_ARTSTORE_API],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    key: "user",
    secret: [process.env.COOKIE_KEY],
    resave: false,
    saveUninitialized: false,
  })
);

//Middleware: Puts the json data in a pages body in a req object, parses the data
app.use(express.json());

//Middleware: Logging
app.use(morgan("dev"));

// app.use(
//   cookieSession({
//     keys: [process.env.COOKIE_SESSION],
//   })
// );

app.use(adminLoginRouter);
app.use(adminProductsRouter);
app.use(adminCreateRouter);
app.use(adminUpdateRouter);
app.use(productsRouter);
app.use(contactRouter);
app.use(usersRouter);
app.use(cartRouter);
app.use(paymentRouter);
app.use(shipmentRouter);

//Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  require("dotenv").config();

  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(process.env.PORT, function () {
  console.log("Server Running on port: " + process.env.PORT);
});