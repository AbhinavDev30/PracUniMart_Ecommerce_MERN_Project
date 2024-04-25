// import React, { useEffect, useMemo, useState } from "react";
import Header from "../../../component/Header";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./UserProductDetail.css";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";

// import axios from "axios";

function UserProductDetail() {
  let queryParam = useQuery();
  const navigate = useNavigate();
  const [productsDetails, setProductDetails] = useState([]);

  function useQuery() {
    const { search } = useLocation();
    const queryParams = useMemo(() => {
      return new URLSearchParams(search);
    }, [search]);
    console.log("ID:", queryParams.get("id"));
    return queryParams;
  }
  console.log("Query Param", queryParam.get("id"));
  function getAll() {
    axios
      .get(`http://localhost:8000/productDetails?id=${queryParam.get("id")}`)
      .then((res) => {
        console.log("This is product detail", res.data.prodData);
        setProductDetails(res.data.prodData); // Set the state with the JSON data
      })
      .catch((e) => {
        console.log("Data not found", e);
      });
  }

  useEffect(() => {
    getAll();
  }, []);

  //Post to cart

  let userid = localStorage.getItem("id");
  console.log("This is user id", userid);

  async function postToCart() {
    try {
      const response = await fetch("http://localhost:8000/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userid,
          productId: productsDetails._id,
        }),
      });

      if (response.ok) {
        alert("Product added to cart successfully");
      } else {
        console.log("Failed to add product to cart");
      }
    } catch (error) {
      console.error("Cart error: " + error.message);
    }
  }

  console.log("This is productDetail.Id", productsDetails._id);

  return (
    <>
      <Header />
      <section className="topCss">
        <div className="container ">
          <div className="card">
            <div className="container-fliud">
              <div className="wrapper row">
                <div className="preview col-md-6">
                  <div className="preview-pic tab-content">
                    <div
                      className="tab-pane active"
                      //   id="pic-1"
                    >
                      <img
                        src={`http://localhost:8000/${productsDetails.images}`}
                        // src="https://images.pexels.com/photos/2678059/pexels-photo-2678059.jpeg?auto=compress&cs=tinysrgb&w=600"
                        alt="Product Preview 1"
                        height="350   "
                        width="100"
                      />
                    </div>
                  </div>

                  <ul className="preview-thumbnail nav nav-tabs">
                    <li className="active">
                      <Link data-target="#pic-1" data-toggle="tab">
                        <img
                          src={`http://localhost:8000/${productsDetails.images}`}
                          // src="https://images.pexels.com/photos/2678059/pexels-photo-2678059.jpeg?auto=compress&cs=tinysrgb&w=600"
                          alt="Thumbnail 1"
                          height="100"
                          width="100"
                        />
                      </Link>
                    </li>
                    <li>
                      <Link data-target="#pic-2" data-toggle="tab">
                        <img
                          src={`http://localhost:8000/${productsDetails.images}`}
                          // src="https://images.pexels.com/photos/2678059/pexels-photo-2678059.jpeg?auto=compress&cs=tinysrgb&w=600"
                          alt="Thumbnail 2"
                          height="100"
                          width="100"
                        />
                      </Link>
                    </li>
                    <li>
                      <Link data-target="#pic-3" data-toggle="tab">
                        <img
                          src={`http://localhost:8000/${productsDetails.images}`}
                          // src="https://images.pexels.com/photos/2678059/pexels-photo-2678059.jpeg?auto=compress&cs=tinysrgb&w=600"
                          alt="Thumbnail 3"
                          height="100"
                          width="100"
                        />
                      </Link>
                    </li>
                    <li>
                      <Link data-target="#pic-4" data-toggle="tab">
                        <img
                          src={`http://localhost:8000/${productsDetails.images}`}
                          // src="https://images.pexels.com/photos/2678059/pexels-photo-2678059.jpeg?auto=compress&cs=tinysrgb&w=600"
                          alt="Thumbnail 4"
                          height="100"
                          width="100"
                        />
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="details col-md-6">
                  <h3 className="product-title">{productsDetails.name}</h3>
                  <div className="rating">
                    <div className="stars">
                      <span className="fa fa-star checked"></span>
                      <span className="fa fa-star checked"></span>
                      <span className="fa fa-star checked"></span>
                      <span className="fa fa-star"></span>
                      <span className="fa fa-star"></span>
                    </div>
                    <span className="review-no">41 reviews</span>
                  </div>
                  <p className="product-description">
                    {productsDetails.description}
                  </p>
                  <h4 className="price">
                    current price: <span>${productsDetails.price}</span>
                  </h4>
                  <p className="vote">
                    <strong>91%</strong> of buyers enjoyed this product!{" "}
                    <strong>(87 votes)</strong>
                  </p>

                  <br />
                  <div className="action">
                    <button
                      className="add-to-cart btn btn-default"
                      type="button"
                      onClick={postToCart}
                    >
                      add to cart
                    </button>
                    <button className="like btn btn-default" type="button">
                      <span className="fa fa-heart"></span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default UserProductDetail;
