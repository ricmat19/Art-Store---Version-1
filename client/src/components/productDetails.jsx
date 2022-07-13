import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router";
import IndexAPI from "../apis/indexAPI";
import HeaderC from "./header";
import FooterC from "./footer";

const ProductDetailsC = () => {
  const { product, id } = useParams();
  const [addedModal, setAddedModal] = useState("modal-bg");
  const [imageBuffer, setImageBuffer] = useState("");
  const [, setCart] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState([]);
  const [cartQty, setCartQty] = useState(0);
  const [uniqueItem, setUniqueItem] = useState();

  const history = useHistory();

  const addedRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      try {
        document.addEventListener("mousedown", (event) => {
          if (addedRef.current !== null) {
            if (!addedRef.current.contains(event.target)) {
              setAddedModal("modal-bg");
            }
          }
        });

        const productResponse = await IndexAPI.get(
          `/products/${product}/${id}`
        );

        if (productResponse.data.data.item.imagekey !== null) {
          let imagesResponse = await IndexAPI.get(
            `/images/${productResponse.data.data.item.imagekey}`,
            {
              responseType: "arraybuffer",
            }
          ).then((response) =>
            Buffer.from(response.data, "binary").toString("base64")
          );

          setImageBuffer(`data:image/png;base64,${imagesResponse}`);
        }
        setSelectedProduct(productResponse.data.data.item);

        const cartResponse = await IndexAPI.get(`/cart`);
        setCart(cartResponse.data.data.cart);

        setCartQty(cartResponse.data.data.cart.length);

      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  const addToCart = async (e) => {
    e.preventDefault();
    try {
      const cartPostResponse = await IndexAPI.post("/cart", {
        id: id,
      });
      setUniqueItem(cartPostResponse.data.data.uniqueItem);

      const cartResponse = await IndexAPI.get(`/cart`);
      setCartQty(cartResponse.data.data.cart.length);

      setAddedModal("modal-bg active");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>

      {/* Added to Cart */}
      <div className={addedModal}>
        <form>
          <div ref={addedRef} className="added-content modal-content">
            <h1 className="header">Item Added</h1>
            <div>
              {selectedProduct.title} has {!uniqueItem ? "already" : ""} been
              added to your cart.
            </div>
            <div className="grid two-column-div">
              <button
                className="added-button"
                onClick={() => history.push("/")}
              >
                continue shopping
              </button>
              <button
                className="added-button"
                onClick={() => history.push("/cart")}
              >
                view cart
              </button>
            </div>
          </div>
        </form>
      </div>

      <HeaderC cartQty={cartQty} />
      <div className="main-body">
        <div className="item-details">
          <div className="image-div">
            <div className="justify-center">
              <img
                className="big-image"
                src={imageBuffer}
                alt="product image"
              />
            </div>
          </div>
          <form method="POST" action="/cart">
            <div className="info-div">
              <h1>{selectedProduct && selectedProduct.title}</h1>
              <div className="info-detail-div">
                <label>price:</label>
                <h3 className="top-margin">
                  ${selectedProduct && selectedProduct.price}.00
                </h3>
              </div>
              <div className="info-detail-div">
                <label>info:</label>
                <h3 className="top-margin">
                  {selectedProduct && selectedProduct.info}
                </h3>
              </div>
              <hr className="top-margin" />
              <div className="align-center">
                <button onClick={addToCart}>Add To Cart</button>
              </div>
            </div>
          </form>
        </div>
        <FooterC />
      </div>
    </div>
  );
};

export default ProductDetailsC;
