import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import Home from "./routes/home";
import About from "./routes/about";
import Product from "./routes/products";
import Item from "./routes/productDetails";
import Cart from "./routes/cart";
import Checkout from "./routes/stripe";
import Contact from "./routes/contact";
import PageNotFound from "./routes/pageNotFound";
import AdminLogin from "./routes/admin/login";
// import AdminHome from "./routes/admin/home";
import AdminProducts from "./routes/admin/products";

const App = () => {
  const [disclaimerModal, setDisclaimerModal] = useState(
    "modal-bg active"
  );

  const closeDisclaimer = (e) => {
    e.preventDefault();
    setDisclaimerModal("modal-bg");
  };

  return (
    <div>
      {/* Disclaimer Modal */}
      <div className={disclaimerModal}>
        <form>
          <div className="disclaimer-content modal-content">
            <h1 className="header">
              welcome to{" "}
              <span className="logo">
                <span className="logo-first">a</span>rt
                <span className="logo-first">H</span>ouse
              </span>
            </h1>
            <div>
              &quot;
              <span>
                <span className="logo-first">a</span>rt
                <span className="logo-first">H</span>ouse
              </span>
              &quot; is a full-stack E-commerce application built using
              React.js, Node/Express, PostgreSQL, and an AWS S3 Bucket for image
              storage. This application is strictly for demonstrative purposes.
              <hr className="disclaimer-hr" />
              By clicking the button below, you are accepting that no real
              purchases will be made, no payments will be processed, and no
              personal information, such as: names, addresses, and credit card
              information will be used.
            </div>
            <div>
              <button onClick={(e) => closeDisclaimer(e)}>i accept</button>
            </div>
          </div>
        </form>
      </div>
      <Router>
        <Switch>
          {/* <Route exact path="/" component={Home} /> */}
          <Route exact path="/" component={Product} />
          <Route exact path="/about" component={About} />
          {/* <Route exact path="/products/:product" component={Product} /> */}
          <Route exact path="/products/:product/:id" component={Item} />
          <Route export path="/cart" component={Cart} />
          <Route export path="/checkout" component={Checkout} />
          <Route exact path="/contact" component={Contact} />
          <Route exact path="/admin/login" component={AdminLogin} />
          {/* <Route exact path="/admin/home" component={AdminHome} /> */}
          <Route
            exact
            path="/admin/products/:product"
            component={AdminProducts}
          />
          <Route component={PageNotFound} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
