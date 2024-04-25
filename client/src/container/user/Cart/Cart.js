import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Cart() {
  const [cartData, setCartData] = useState([]);
  const [quantity, setQuantity] = useState(0);
  let id = localStorage.getItem("id");
  //   console.log("id: " + id);perfect
  //Get Data
  function getAll() {
    try {
      fetch("http://localhost:8000/cart?userid=" + id)
        .then((res) => {
          return res.json(); // Convert the response body to JSON
        })
        .then((data) => {
          // console.log("We have successfully retrived data", data.cartData);
          console.log("data", data);
          setCartData(data.cartData); // Assuming data is an array inside 'cartData'
        });
    } catch (e) {
      console.log("Error :", e);
    }
  }

  useEffect(() => {
    getAll();
  }, []);

  //Delete cart data

  function deleteCartProduct(id) {
    try {
      fetch("http://localhost:8000/cart", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
        }),
      }).then((resp) => {
        if (!resp.ok) {
          console.log("Failed to delete product");
        } else {
          console.log("Do you want to delete this product for your cart?");
          getAll();
        }
      });
    } catch (e) {
      console.log("Error :", e);
    }
  }

  return (
    <>
      <section className="h-100" style={{ backgroundColor: "#eee" }}>
        <div className="container h-100 py-5">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-10">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h3 className="fw-normal mb-0 text-black">Shopping Cart</h3>
                <div>
                  <p className="mb-0">
                    <span className="text-muted">Sort by:</span>{" "}
                    <Link className="text-body">
                      price <i className="fas fa-angle-down mt-1"></i>
                    </Link>
                  </p>
                </div>
              </div>
              {/* /////// */}

              {cartData.map((res) => (
                <div className="card rounded-3 mb-4" key={res._id}>
                  <div className="card-body p-4">
                    <div className="row d-flex justify-content-between align-items-center">
                      <div className="col-md-2 col-lg-2 col-xl-2">
                        <img
                          src={`http://localhost:8000/${res.products.images}`}
                          className="img-fluid rounded-3"
                          alt="Cotton T-shirt"
                        />
                      </div>
                      <div className="col-md-3 col-lg-3 col-xl-3">
                        <p className="lead fw-normal mb-2">
                          {res.products.name}
                        </p>
                        <p>
                          <span className="text-muted">Size: </span>M{" "}
                          <span className="text-muted">Color: </span>Grey
                        </p>
                      </div>
                      <div className="col-md-3 col-lg-3 col-xl-2 d-flex">
                        <button
                          className="btn btn-link px-2"
                          onClick={() => {}}
                        >
                          <i
                            className="fas fa-minus"
                            onClick={() => {
                              // setQuantity(quantity - 1);
                            }}
                          ></i>
                        </button>

                        <input
                          id="form1"
                          min="0"
                          name="quantity"
                          //   value="2"
                          type="number"
                          className="form-control form-control-sm"
                          // value={quantity}
                        ></input>

                        <button
                          className="btn btn-link px-2"
                          onClick={() => {
                            // setQuantity(quantity + 1);
                          }}
                        >
                          <i className="fas fa-plus"></i>
                        </button>
                      </div>
                      <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                        <h5 className="mb-0">$499.00</h5>
                      </div>
                      <div className="col-md-1 col-lg-1 col-xl-1 text-end">
                        <button
                          className="text-danger"
                          onClick={() => {
                            deleteCartProduct(res._id);
                          }}
                        >
                          <i className="fas fa-trash fa-lg"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* ///////// */}
              <div className="card mb-4">
                <div className="card-body p-4 d-flex flex-row">
                  <div className="form-outline flex-fill">
                    <input
                      type="text"
                      id="form1"
                      className="form-control form-control-lg"
                    />
                    <label className="form-label" htmlFor="form1">
                      Discound code
                    </label>
                  </div>
                  <button
                    type="button"
                    className="btn btn-outline-warning btn-lg ms-3"
                  >
                    Apply
                  </button>
                </div>
              </div>

              <div className="card">
                <div className="card-body">
                  <button
                    type="button"
                    className="btn btn-warning btn-block btn-lg"
                  >
                    Proceed to Pay
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Cart;
