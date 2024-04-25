import React, { useEffect, useMemo, useState } from "react";
import Header from "../../../component/Header";
import { useLocation, useNavigate } from "react-router-dom";

import "./UserProduct.css";
// import ROUTES from "../../../navigation/Routes";

import ROUTES from "../../../navigation/Routes";

function useQuery() {
  const { search } = useLocation();
  //esme URL kai parameter ate hai
  return useMemo(() => {
    return new URLSearchParams(search);
    //URLSearchParams kai through us parameter ko handel kar sakte hai
  }, [search]);
}
function UserProduct() {
  const queryParam = useQuery();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  function getAll() {
    fetch(`http://localhost:8000/product?departmentId=` + queryParam.get("id"))
      .then((res) => res.json()) // Convert the response to JSON
      .then((res) => {
        console.log("This product Page data =", res.prodData);
        setProducts(res.prodData);
      });
  }

  useEffect(() => {
    getAll();
  }, []);
  //query string ke liye hame hook banana padega

  return (
    <>
      <Header />

      <section className="topCss">
        <div className="container py-5 cardcss">
          <div className="row cardcss">
            {products.map((data) => (
              <div
                key={data._id}
                className="col-md-12 col-lg-3 mb-5 mb-lg-1 m-6 p-3 MPCss"
              >
                <div className="card">
                  <img
                    src={`http://localhost:8000/${data.images[0]}`}
                    className="card-img-top"
                    alt={data.name}
                    style={{
                      height: "200px",
                      objectFit: "cover",
                    }}
                  />
                  <div className="card-body">
                    <h5 className="card-title text-center">{data.name}</h5>

                    <div className="d-flex justify-content-between">
                      <span>Price:</span>
                      <span>${data.price}</span>
                    </div>

                    <div className="d-flex justify-content-between">
                      <span style={{ color: "red" }}>Available:</span>
                      <span>{data.qty}</span>
                    </div>
                    <br />
                    <button
                      className="btn btn-info"
                      onClick={() => {
                        navigate(
                          ROUTES.productDetail.name +
                            "?id=" +
                            data._id +
                            "&name=" +
                            data.name
                        );
                      }}
                      style={{ backgroundColor: "rgb(255, 0, 81)" }}
                    >
                      View Product
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default UserProduct;
