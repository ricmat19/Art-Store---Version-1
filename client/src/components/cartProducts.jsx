import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import IndexAPI from "../apis/indexAPI";
import PropTypes from "prop-types";

const CartProductsC = (props) => {
  const [prices, setPrices] = useState([]);
  const [cart, setCart] = useState([]);
  const [cartQty, setCartQty] = useState([]);
  const [subtotal, setSubtotal] = useState();
  const [hasQty, setHasQty] = useState(false);

  const history = useHistory();

  let sub = 0;
  let priceArray = [];
  let qtyArray = [];
  useEffect(() => {
    const fetchData = async () => {
      try {
        const cartResponse = await IndexAPI.get(`/cart`);

        // for (let i = 0; i < cartResponse.data.data.cart.length; i++) {
        //   if (cartResponse.data.data.cart[i].imagekey !== null) {
        //     let imagesResponse = await IndexAPI.get(
        //       `/images/${cartResponse.data.data.cart[i].imagekey}`,
        //       {
        //         responseType: "arraybuffer",
        //       }
        //     ).then((response) =>
        //       Buffer.from(response.data, "binary").toString("base64")
        //     );

        //     cartResponse.data.data.cart[i].imageBuffer = imagesResponse;
        //   }
        // }
        setCart(cartResponse.data.data.cart);

        if (cartResponse.data.data.cart.length === 0) {
          sub = 0;
          // } else if (priceArray.length === 0) {
          //   for (let i = 0; i < cartResponse.data.data.cart.length; i++) {
          //     sub += parseInt(cartResponse.data.data.cart[i].price);
          //   }
        } else {
          sub = priceArray.reduce(function (a, b) {
            return a + b;
          }, 0);
        }

        if (prices.length === 0) {
          setSubtotal(sub);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [props]);

  const deleteFromCart = async (id) => {
    try {
      await IndexAPI.put("/cart/delete", {
        id: id,
      });

      const cartResponse = await IndexAPI.get(`/cart`);
      props.setCart(cartResponse.data.data.cart);

      if (cartResponse.data.data.cart.length === 0) {
        sub = 0;
      } else {
        for (let i = 0; i < cartResponse.data.data.cart.length; i++) {
          sub += parseInt(cartResponse.data.data.cart[i].price);
        }
      }
      setSubtotal(sub);

      const resetPricesArray = [];
      for (let i = 0; i < cartResponse.data.data.cart.length; i++) {
        resetPricesArray.push(parseInt(cartResponse.data.data.cart[i].price));
      }
      setPrices(resetPricesArray);
    } catch (err) {
      console.log(err);
    }
  };

  const setItemQty = async (item, e) => {
    try {
      setPrices(priceArray);
      for (let i = 0; i < cart.length; i++) {
        if (cart[i].id === item.id) {
          priceArray[i] = cart[i].price * e;
        } else {
          if (prices[i] !== undefined) {
            priceArray[i] = prices[i];
          } else {
            // priceArray[i] = parseInt(cart[i].price);
            priceArray[i] = 0;
          }
        }
        setPrices(priceArray);

        if (cart[i].id === item.id) {
          qtyArray[i] = parseInt(e);
        } else {
          if (cartQty[i] !== undefined) {
            qtyArray[i] = cartQty[i];
          } else {
            qtyArray[i] = 0;
          }
        }
        setCartQty(qtyArray);

        for (let i = 0; i < qtyArray.length; i++) {
          if (qtyArray[i] <= 0 || isNaN(qtyArray[i])) {
            setHasQty(false);
            break;
          } else {
            setHasQty(true);
          }
        }
      }

      await IndexAPI.put("/cart/quantity", {
        cartQty: qtyArray,
      });

      sub = 0;
      sub = priceArray.reduce(function (a, b) {
        return a + b;
      }, 0);
      setSubtotal(sub);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="full-height">
      {cart &&
        cart.map((item) => {
          // priceArray.push(parseInt(item.price));
          // let itemPrice = ``;
          // if (prices[index] === undefined) {
          //   itemPrice = item.price;
          // } else {
          //   itemPrice = prices[index];
          // }
          return (
            <div key={item.id}>
              <div className="cart-item-details">
                <div className="cart-item-info">
                  <span
                    className="pointer"
                    onClick={() => deleteFromCart(item.id)}
                  >
                    <h3>X</h3>
                  </span>
                  <span className="cart-item-div">
                    <img
                      className="cart-item-thumbnail"
                      src={item.imagekey}
                      alt="Thumbnail"
                    />
                  </span>
                  <div className="cart-item-title">{item.title}</div>
                </div>
                <div className="cart-item-qty">
                  <input
                    onChange={(event) => setItemQty(item, event.target.value)}
                    className="item-qty-input"
                    type="number"
                    min="1"
                    placeholder="0"
                  />
                </div>
                <div className="align-right">
                  <span>${item.price}.00</span>
                </div>
              </div>
              <hr className="no-margin" />
            </div>
          );
        })}
      <div className="align-right subtotal-div">
        <span>subtotal</span>
        <span>${subtotal}.00</span>
      </div>
      {hasQty ? (
        <div className="align-right no-margin">
          <button>
            <div onClick={() => history.push("/checkout")}>Checkout</div>
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

CartProductsC.propTypes = {
  cart: PropTypes.array,
  setCart: PropTypes.func,
};

export default CartProductsC;
