import React, { useEffect, useState, useRef } from "react";
import { Redirect } from "react-router";
import ReactPaginate from "react-paginate";
import { useParams } from "react-router-dom";
import IndexAPI from "../../apis/indexAPI";
import AdminHeaderC from "./header";
import AdminCreateProductC from "./createProduct";
import AdminUpdateProductC from "./updateProduct";
import AdminDeleteProductC from "./deleteProduct";
import FooterC from "../footer";

const AdminProductsC = () => {
  const { product } = useParams();
  console.log(product)
  const [loginStatus, setLoginStatus] = useState(true);
  const [createProductModal, setCreateProductModal] = useState("modal-bg");
  const [updateItem, setUpdateItem] = useState("");
  const [updateProductModal, setUpdateProductModal] = useState("modal-bg");
  const [deleteItem, setDeleteItem] = useState("");
  const [deleteProductModal, setDeleteProductModal] = useState("modal-bg");
  const [products, setProducts] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);

  const itemsPerPage = 9;
  const pagesVisted = pageNumber * itemsPerPage;

  const displayCreateProductModal = () => {
    setCreateProductModal("modal-bg active");
  };

  const displayUpdateProductModal = (id) => {
    setUpdateItem(id);
    setUpdateProductModal("modal-bg active");
  };

  const displayDeleteProductModal = (id) => {
    setDeleteItem(id);
    setDeleteProductModal("modal-bg active");
  };

  const createProductRef = useRef();
  const updateProductRef = useRef();
  const deleteProductRef = useRef();

  const displayItems = products
    .slice(pagesVisted, pagesVisted + itemsPerPage)
    .map((item) => {
      return (
        <div key={item.id}>
          <div className="pointer">
            <div className="products-item">
              <img
                className="products-thumbnail"
                src={item.imagekey}
                alt="Thumbnail"
              />
            </div>
            <div className="products-thumbnail-footer">
              <h3 className="align-center">{item.title}</h3>
              <h3 className="align-center">${item.price}.00</h3>
            </div>
          </div>
          <div>
            <div className="admin-products-button-div">
              <div>
                <button
                  onClick={() => displayDeleteProductModal(item.id)}
                  className="delete"
                >
                  Delete
                </button>
              </div>
              <div>
                <button
                  onClick={() => displayUpdateProductModal(item.id)}
                  type="submit"
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    });

  const pageCount = Math.ceil(products.length / itemsPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const loginResponse = await IndexAPI.get(`/login`);
        setLoginStatus(loginResponse.data.data.loggedIn);

        document.addEventListener("mousedown", (event) => {
          if (createProductRef.current !== null) {
            if (!createProductRef.current.contains(event.target)) {
              setCreateProductModal("modal-bg");
            }
          }
          if (updateProductRef.current !== null) {
            if (!updateProductRef.current.contains(event.target)) {
              setUpdateProductModal("modal-bg");
            }
          }
          if (deleteProductRef.current !== null) {
            if (!deleteProductRef.current.contains(event.target)) {
              setDeleteProductModal("modal-bg");
            }
          }
        });

        const productResponse = await IndexAPI.get(
          `/admin/products`
        );
        console.log(productResponse);
        setProducts(productResponse.data.data.products);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  if (loginStatus) {
    return (
      <div>
        <AdminHeaderC />
        <div className={createProductModal}>
          <div ref={createProductRef} className="create-product-container">
            <AdminCreateProductC />
          </div>
        </div>
        <div className={updateProductModal}>
          <div ref={updateProductRef} className="update-product-container">
            <AdminUpdateProductC
              updateItem={updateItem}
            />
          </div>
        </div>
        <div className={deleteProductModal}>
          <div ref={deleteProductRef} className="delete-product-container">
            <AdminDeleteProductC
              deleteItem={deleteItem}
              products={products}
              setProducts={setProducts}
            />
          </div>
        </div>
        <div className="main-body">
          <div>
            <div className="align-center">
              <h1>store</h1>
            </div>
            <div className="plus-icon-div">
              <span onClick={displayCreateProductModal}>
                <i className="fas fa-plus plus-icon"></i>
              </span>
            </div>
            {/* <div className="align-center subtitle-div">
          <a className="no-decoration" href="/admin/products/print">
            <h2>2D Prints</h2>
          </a>
          <a className="no-decoration" href="/admin/products/model">
            <h2>3D Models</h2>
          </a>
          <a className="no-decoration" href="/admin/products/comic">
            <h2>Comics</h2>
          </a>
          </div> */}
            <div className="products-menu">{displayItems}</div>
            <ReactPaginate
              previousLabel={"prev"}
              nextLabel={"next"}
              pageCount={pageCount}
              onPageChange={changePage}
              containerClassName={"paginationButtons"}
              previousLinkClassName={"prevButton"}
              nextLinkClassName={"nextButton"}
              disabledClassName={"disabledButton"}
              activeClassName={"activeButton"}
            />
          </div>
          <FooterC />
        </div>
      </div>
    );
  } else {
    return <Redirect to="/admin/login" />;
  }
};

export default AdminProductsC;
