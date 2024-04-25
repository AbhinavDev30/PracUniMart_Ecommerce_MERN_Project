import React, { useEffect, useState } from "react";
import Header from "../../../component/Header";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../../navigation/Routes";
import "./Home.css";

function Home() {
  const [universities, setUniversities] = useState([]);
  const navigate = useNavigate();
  function getAll() {
    fetch("http://localhost:8000/university")
      .then((response) => response.json())
      .then((res) => {
        // console.log(res); // Log the response to see what data you are getting
        console.log(res);
        setUniversities(res); // Assuming the data is directly in the response
      })
      .catch((error) => {
        console.error("Failed to fetch universities", error);
      });
  }
  useEffect(() => {
    getAll();
  }, []);

  return (
    <>
      <Header />

      <section className="topCss">
        <div className="container py-5 mx-auto  Cardcss">
          <div className="row text-center  innerCardcss">
            {universities.map((data) => (
              <div
                key={data._id}
                className="col-md-12 col-lg-3 mb-5 mb-lg-1 m-7 p-3 MPCardcss"
              >
                <div className="card">
                  <img
                    src={`http://localhost:8000/${data.image}`}
                    className="card-img-top"
                    alt={data.name}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{data.name}</h5>
                    <button
                      className="btn btn-info"
                      onClick={() => {
                        navigate(
                          ROUTES.department.name +
                            "?id=" +
                            data._id +
                            "&name=" +
                            data.name
                        );
                      }}
                      style={{ backgroundColor: "rgb(255, 0, 81)" }}
                    >
                      View Department
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* <section
        style={{
          backgroundImage: `url('https://images.pexels.com/photos/715134/pexels-photo-715134.jpeg?auto=compress&cs=tinysrgb&w=600')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundColor: "#00004d",
          backdropFilter: "blur(20px)", // Adjust the blur intensity as needed
        }}
      >
        <div className="container py-5 mx-auto">
          <div className="row text-center  ">
            {universities.map((data) => (
              <div
                key={data._id}
                className="col-md-12 col-lg-3 mb-5 mb-lg-1 m-7 p-3"
              >
                <div className="card">
                  <img
                    src={`http://localhost:8000/${data.image}`}
                    className="card-img-top"
                    alt={data.name}
                    style={{ height: "300px", objectFit: "cover" }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{data.name}</h5>
                    <button
                      className="btn btn-info"
                      onClick={() => {
                        navigate(
                          ROUTES.department.name +
                            "?id=" +
                            data._id +
                            "&name=" +
                            data.name
                        );
                      }}
                    >
                      View Department
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}
    </>
  );
}

export default Home;
