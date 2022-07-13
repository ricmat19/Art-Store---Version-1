import React, { useState, useRef } from "react";
import IndexAPI from "../../apis/indexAPI";

const AdminCreateProductC = () => {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [images, setImages] = useState(null);
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [info, setInfo] = useState("");

  const titleInput = useRef(null);
  const typeInput = useRef(null);
  const quantityInput = useRef(null);
  const priceInput = useRef(null);
  const infoInput = useRef(null);

  //insures that the .env file is only run in a development environment and not a production environment
  if (process.env.NODE_ENV !== "production") {
    //requires the the .env file configuration be run first hiding all info hidden via the .env file
    require("dotenv").config();
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let formData = new FormData();

      formData.append("title", title);
      formData.append("product", type);
      formData.append("images", images);
      formData.append("quantity", quantity);
      formData.append("price", price);
      formData.append("info", info);

      await IndexAPI.post("/admin/create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));

      titleInput.current.value = "";
      typeInput.current.value = "";
      quantityInput.current.value = "";
      priceInput.current.value = "";
      infoInput.current.value = "";
    } catch (err) {
      console.log(err);
    }
  };

  let displayedImage = "../../images/loading.svg";
  if (images !== null) {
    displayedImage = URL.createObjectURL(images);
  }

  return (
    <div className="admin-item-div">
      <div className="admin-image-div">
        <div className="justify-center">
          <img className="big-image" src={displayedImage} alt="product" />
        </div>
      </div>
      <form
        className="admin-form"
        action="/admin/create"
        method="POST"
        encType="multipart/form-data"
      >
        <div className="grid">
          <h1>Create</h1>
        </div>
        <div className="admin-form-field">
          <label className="align-left">Title:</label>
          <input
            value={title}
            ref={titleInput}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            name="name"
            required
          />
        </div>
        <div className="admin-form-field">
          <div>
            <label className="align-left">Type:</label>
          </div>
          <div className="radio-div">
            <div>
              <label className="radio">2D Print</label>
              <input
                value={type}
                ref={typeInput}
                onChange={() => setType("print")}
                type="radio"
                name="product"
              />
            </div>
            <div>
              <label className="radio">3D Model</label>
              <input
                value={type}
                ref={typeInput}
                onChange={() => setType("model")}
                type="radio"
                name="product"
              />
            </div>
            <div>
              <label className="radio">Comic</label>
              <input
                value={type}
                ref={typeInput}
                onChange={() => setType("comic")}
                type="radio"
                name="product"
                required
              />
            </div>
          </div>
        </div>
        <div className="admin-form-field">
          <label className="align-left">Images:</label>
          <input
            type="file"
            onChange={(e) => setImages(e.target.files[0])}
            name="images"
            required
          />
        </div>
        <div className="admin-form-field">
          <label className="align-left">Quantity:</label>
          <input
            value={quantity}
            ref={quantityInput}
            onChange={(e) => setQuantity(e.target.value)}
            type="number"
            name="quantity"
            required
          />
        </div>
        <div className="admin-form-field">
          <label className="align-left">Price:</label>
          <input
            value={price}
            ref={priceInput}
            onChange={(e) => setPrice(e.target.value)}
            type="number"
            name="price"
            required
          />
        </div>
        <div className="admin-form-field">
          <label className="align-left">Info:</label>
          <textarea
            value={info}
            ref={infoInput}
            onChange={(e) => setInfo(e.target.value)}
            name="message"
            rows="5"
            required
          ></textarea>
        </div>
        <div className="admin-form-button">
          <div></div>
          <div>
            <button onClick={handleSubmit} type="submit">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AdminCreateProductC;
