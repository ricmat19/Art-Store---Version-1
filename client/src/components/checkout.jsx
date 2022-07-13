import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import OrderSummaryC from "./orderSummary";
import HeaderC from "./header";
import FooterC from "./footer";
import IndexAPI from "../apis/indexAPI";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const CheckoutC = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [cart, setCart] = useState([]);
  const [cartPrices, setCartPrices] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [email, setEmail] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [suite, setSuite] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [phone, setPhone] = useState("");

  const emailInput = useRef(null);
  const firstNameInput = useRef(null);
  const lastNameInput = useRef(null);
  const addressInput = useRef(null);
  const suiteInput = useRef(null);
  const cityInput = useRef(null);
  const stateInput = useRef(null);
  const zipcodeInput = useRef(null);
  const phoneInput = useRef(null);

  const history = useHistory();

  let cartPriceArray = [];
  let sub = 0;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const cartResponse = await IndexAPI.get(`/cart`);

        for (let i = 0; i < cartResponse.data.data.cart.length; i++) {
          let itemSummaryPrice =
            cartResponse.data.data.cart[i].price *
            cartResponse.data.data.qty[i];
          cartPriceArray.push(parseInt(itemSummaryPrice));
        }

        for (let i = 0; i < cartResponse.data.data.cart.length; i++) {
          if (cartResponse.data.data.cart[i].imagekey !== null) {
            let imagesResponse = await IndexAPI.get(
              `/images/${cartResponse.data.data.cart[i].imagekey}`,
              {
                responseType: "arraybuffer",
              }
            ).then((response) =>
              Buffer.from(response.data, "binary").toString("base64")
            );

            cartResponse.data.data.cart[i].imageBuffer = imagesResponse;
          }
        }

        setCartPrices(cartPriceArray);

        sub = cartPriceArray.reduce(function (a, b) {
          return a + b;
        }, 0);
        setSubtotal(sub);

        setCart(cartResponse.data.data.cart);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  const handlePayment = async (e) => {
    e.preventDefault();

    const { err, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });
    if (!err && paymentMethod !== undefined) {
      try {
        await IndexAPI.put(`/cart/deleteAll`);

        history.push("/");
      } catch (err) {
        console.log(err);
      }
    }
  };

  const cardElementOptions = {
    style: {
      base: {
        fontFamily: "Rajdhani",
      },
    },
    hidePostalCode: true,
  };

  return (
    <div>
      <HeaderC />
      <div className="checkout-div">
        <form className="checkout-info" onSubmit={handlePayment}>
          <h1>checkout information</h1>
          <div className="checkout-info-div">
            <div className="checkout-email-div">
              <input
                type="email"
                ref={emailInput}
                value={email}
                name="email"
                placeholder="email"
                required
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div className="two-column-div">
              <input
                type="text"
                ref={firstNameInput}
                value={firstname}
                name="firstname"
                placeholder="First Name"
                required
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
              />
              <input
                type="text"
                ref={lastNameInput}
                value={lastname}
                name="lastname"
                placeholder="Last Name"
                required
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
              />
            </div>
            <div className="checkout-address-div">
              <input
                type="text"
                ref={addressInput}
                value={address}
                name="address"
                placeholder="Address"
                required
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
              />
            </div>
            <div className="checkout-suite-div">
              <input
                type="text"
                ref={suiteInput}
                value={suite}
                name="suite"
                placeholder="apartment, suite, etc. (optional)"
                onChange={(e) => {
                  setSuite(e.target.value);
                }}
              />
            </div>
            <div className="three-column-div">
              <input
                type="text"
                ref={cityInput}
                value={city}
                name="city"
                placeholder="city"
                required
                onChange={(e) => {
                  setCity(e.target.value);
                }}
              />
              <select
                ref={stateInput}
                value={state}
                name="state"
                placeholder="state"
                required
                onChange={(e) => {
                  setState(e.target.value);
                }}
              >
                <option>Alabama</option>
                <option>Alaska</option>
                <option>Arizona</option>
                <option>Arkansas</option>
                <option>California</option>
                <option>Colorado</option>
                <option>Connecticut</option>
                <option>Delaware</option>
                <option>Florida</option>
                <option>Georgia</option>
                <option>Hawaii</option>
                <option>Idaho</option>
                <option>Illinois</option>
                <option>Indiana</option>
                <option>Iowa</option>
                <option>Kansas</option>
                <option>Kentucky</option>
                <option>Louisiana</option>
                <option>Maine</option>
                <option>Maryland</option>
                <option>Massachusetts</option>
                <option>Michigan</option>
                <option>Minnesota</option>
                <option>Mississippi</option>
                <option>Missouri</option>
                <option>Montana</option>
                <option>Nebraska</option>
                <option>Nevada</option>
                <option>New Hampshire</option>
                <option>New Jersey</option>
                <option>New Mexico</option>
                <option>New York</option>
                <option>North Carolina</option>
                <option>North Dakota</option>
                <option>Ohio</option>
                <option>Oklahoma</option>
                <option>Oregon</option>
                <option>Pennsylvania</option>
                <option>Rhode Island</option>
                <option>South Carolina</option>
                <option>South Dakota</option>
                <option>Tennessee</option>
                <option>Texas</option>
                <option>Utah</option>
                <option>Vermont</option>
                <option>Virginia</option>
                <option>Washington</option>
                <option>West Virginia</option>
                <option>Wisconsin</option>
                <option>Wyoming</option>
              </select>
              <input
                type="number"
                ref={zipcodeInput}
                value={zipcode}
                name="zipcode"
                placeholder="ZIP code"
                required
                onChange={(e) => {
                  setZipcode(e.target.value);
                }}
              />
            </div>
            <div className="checkout-phone-div">
              <input
                type="tel"
                ref={phoneInput}
                value={phone}
                name="phone"
                placeholder="phone (optional)"
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
              />
            </div>
          </div>
          <div>
            <h1>payment information</h1>
            <div>
              <div>
                <div className="grid payment-input">
                  <CardElement
                    className="card-element"
                    options={cardElementOptions}
                  />
                </div>
                <div className="grid payment-input">
                  <input type="text" placeholder="name on card" required />
                </div>
                <div className="two-column-div checkout-disclaimer-container">
                  <input type="checkbox" required />
                  <div className="align-justify">
                    By clicking the button below, you are accepting that no real
                    purchases will be made, no payments will be processed, and
                    no personal information, such as: names, addresses, and
                    credit card information will be used.
                  </div>
                </div>
                <div className="credit-card-option">
                  <button className="justify-right">pay</button>
                </div>
              </div>
            </div>
          </div>
        </form>
        <div className="order-summary-container">
          <OrderSummaryC
            cartProducts={cart}
            cartPrices={cartPrices}
            subtotal={subtotal}
          />
        </div>
      </div>
      <FooterC />
    </div>
  );
};

export default CheckoutC;
