// import React, { useEffect, useState } from "react";
// import AdminHeaderC from "./header";
// import FooterC from "../footer";
// import IndexAPI from "../../apis/indexAPI";

// const HomeC = () => {
//   const [setProducts] = useState([]);
//   const [twoDImage, setTwoDImage] = useState("");
//   const [threeDImage, setThreeDImage] = useState("");
//   const [comicImage, setComicImage] = useState("");

//   useEffect(() => {
//     const fetchData = async () => {
//       try {

//         const productResponse = await IndexAPI.get(`/products`);

//         for (let i = 0; i < productResponse.data.data.products.length; i++) {
//           if (productResponse.data.data.products[i].imagekey !== null) {
//             let imagesResponse = await IndexAPI.get(
//               `/images/${productResponse.data.data.products[i].imagekey}`,
//               {
//                 responseType: "arraybuffer",
//               }
//             ).then((response) =>
//               Buffer.from(response.data, "binary").toString("base64")
//             );

//             if (
//               productResponse.data.data.collection[i].product === "print"
//             ) {
//               setTwoDImage(`data:image/png;base64,${imagesResponse}`);
//             }
//             if (
//               productResponse.data.data.products[i].product === "model"
//             ) {
//               setThreeDImage(`data:image/png;base64,${imagesResponse}`);
//             }
//             if (
//               productResponse.data.data.products[i].product === "comic"
//             ) {
//               setComicImage(`data:image/png;base64,${imagesResponse}`);
//             }
//           }
//         }
//         setProducts(productResponse.data.data.products);
//       } catch (err) {
//         console.log(err);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <div>
//       <AdminHeaderC />
//       <div className="main-body">
//         <a href="products/print">
//           <div className="menu-item">
//             <img className="menu-image" src={twoDImage} alt="2D Print" />
//             <h1>2D Prints</h1>
//           </div>
//         </a>
//         <a href="products/model">
//           <div className="menu-item">
//             <img className="menu-image" src={threeDImage} alt="3D Model" />
//             <h1>3D model</h1>
//           </div>
//         </a>
//         <a href="products/comic">
//           <div className="menu-item">
//             <img className="menu-image" src={comicImage} alt="Comic" />
//             <h1>comics</h1>
//           </div>
//         </a>
//       </div>
//       <FooterC />
//     </div>
//   );
// };

// export default HomeC;
