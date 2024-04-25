import React, { useEffect, useMemo, useState } from "react";
import Header from "../../../component/Header";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import ROUTES from "../../../navigation/Routes";
import "./UserDepartment.css";
function useQuery() {
  const { search } = useLocation();
  //esme URL kai parameter ate hai
  return useMemo(() => {
    return new URLSearchParams(search);
    //URLSearchParams kai through us parameter ko handel kar sakte hai
  }, [search]);
}
function UserDepartment() {
  const queryParam = useQuery();
  const navigate = useNavigate();
  const [departments, setDepartments] = useState([]);

  function getAll() {
    fetch(
      "http://localhost:8000/department?universityId=" + queryParam.get("id")
    )
      .then((res) => {
        return res.json(); // Convert the response body to JSON
      })
      .then((data) => {
        console.log("This is admin department", data);
        console.log("This is admin ", data.depData);
        setDepartments(data.depData); // Assuming data is an array inside 'depData'
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  // console.log("Hello, UserDepartment");

  useEffect(() => {
    getAll();
  }, []);

  return (
    <>
      <Header />
      <section className="topCss">
        <div className="container py-5 cardcss">
          <div className="row ">
            {departments.map((data) => (
              <div
                key={data._id}
                className="col-md-12 col-lg-3 mb-5 mb-lg-1 m-7 p-3 MPCss"
              >
                <div className="card">
                  <img
                    src={`http://localhost:8000/${data.image}`}
                    className="card-img-top"
                    alt={data.name}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <div className="card-body">
                    <h5 className="card-title text-center">{data.name}</h5>
                    <button
                      className="btn btn-info"
                      onClick={() => {
                        navigate(
                          ROUTES.product.name +
                            "?id=" +
                            data._id +
                            "&name=" +
                            data.name
                        );
                      }}
                      style={{
                        marginLeft: "15px",
                        backgroundColor: "rgb(255, 0, 81)",
                      }}
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

export default UserDepartment;
