import React, { useEffect, useState } from "react";
import CartProductsC from "./cartProducts";
import HeaderC from "./header";
import FooterC from "./footer";
import IndexAPI from "../apis/indexAPI";

const CartC = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cartResponse = await IndexAPI.get(`/cart`);

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
        setCart(cartResponse.data.data.cart);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <HeaderC cartQty={cart.length} />
      <div className="main-body">
        <div>
          <div className="align-center">
            <h1>Shopping Cart</h1>
          </div>
          <div className="cart-table">
            <div className="table-headers">
              <h3>item</h3>
              <h3 className="align-center">quantity</h3>
              <h3 className="align-right">price</h3>
            </div>
            <hr className="no-margin" />
            <div className="full-height">
              <CartProductsC setCart={setCart} />
            </div>
          </div>
        </div>
        <FooterC />
      </div>
    </div>
  );
};

export default CartC;
