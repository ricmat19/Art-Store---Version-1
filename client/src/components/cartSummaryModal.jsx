import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const CartSummaryModalC = (props) => {
  const [cartFull, setCartFull] = useState(false);
  const [cartQty, setCartQty] = useState(0);
  const [cartCost, setCartCost] = useState(0);
  const [cartModal, setCartModal] = useState("inactive-cart cart-modal");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setCartFull(props.cartState);
        setCartQty(props.cartQty);
        setCartCost(props.cartCost);

        if (cartFull === false) {
          setCartModal("inactive-cart cart-modal");
        } else {
          setCartModal("active-cart cart-modal");
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  });

  return (
    <a href="/cart">
      <div className={cartModal}>
        <i className="fas fa-shopping-cart cart-icon"></i>
        <div className="cart-quantity-div">
          <div>{cartQty}</div>
          <label>items</label>
        </div>
        <div className="total-price">${cartCost}</div>
      </div>
    </a>
  );
};

CartSummaryModalC.propTypes = {
  cartState: PropTypes.bool,
  cartQty: PropTypes.number,
  cartCost: PropTypes.number,
};

export default CartSummaryModalC;
