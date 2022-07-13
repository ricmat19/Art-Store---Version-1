import React, { useEffect, useState } from "react";
import IndexAPI from "../apis/indexAPI";

const StoreMenuC = () => {
  const [setProducts] = useState([]);
  const [twoDImage, setTwoDImage] = useState("");
  const [threeDImage, setThreeDImage] = useState("");
  const [comicImage, setComicImage] = useState("");

  let productResponse;
  useEffect(() => {
    const fetchData = async () => {
      try {
        productResponse = await IndexAPI.get(`/products`);

        for (let i = 0; i < productResponse.data.data.products.length; i++) {
          if (productResponse.data.data.products[i].imagekey !== null) {
            let imagesResponse = await IndexAPI.get(
              `/images/${productResponse.data.data.products[i].imagekey}`,
              {
                responseType: "arraybuffer",
              }
            ).then((response) =>
              Buffer.from(response.data, "binary").toString("base64")
            );

            if (
              productResponse.data.data.products[i].primary_image &&
              productResponse.data.data.products[i].product === "print"
            ) {
              setTwoDImage(`data:image/png;base64,${imagesResponse}`);
            }
            if (
              productResponse.data.data.products[i].primary_image &&
              productResponse.data.data.products[i].product === "model"
            ) {
              setThreeDImage(`data:image/png;base64,${imagesResponse}`);
            }
            if (
              productResponse.data.data.products[i].primary_image &&
              productResponse.data.data.products[i].product === "comic"
            ) {
              setComicImage(`data:image/png;base64,${imagesResponse}`);
            }
          }
        }
        setProducts(productResponse.data.data.products);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Store</h1>
      <div className="store-menu">
        <a href="products/print">
          <div className="menu-item">
            <div className="menu-image-div">
              <img className="menu-image" src={twoDImage} alt="2D Print" />
            </div>
            <h2>2D Prints</h2>
          </div>
        </a>
        <a href="products/model">
          <div className="menu-item">
            <div className="menu-image-div">
              <img className="menu-image" src={threeDImage} alt="3D Model" />
            </div>
            <h2>3D Models</h2>
          </div>
        </a>
        <a href="products/comic">
          <div className="menu-item">
            <div className="menu-image-div">
              <img className="menu-image" src={comicImage} alt="Comic" />
            </div>
            <h2>Comics</h2>
          </div>
        </a>
      </div>
    </div>
  );
};

export default StoreMenuC;
