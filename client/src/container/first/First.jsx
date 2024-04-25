import React from "react";
import Header from "../../component/Header";
import "./First.css";
function First() {
  return (
    <>
      <Header />

      <div className="page">
        {/* Blurred background image */}
        <div className="blurred-background"></div>
        {/* Clear content */}
        <div className="content">
          <section className="section-hero">
            <div className="container grid grid-two-cols">
              <div className="hero-content">
                <p style={{ fontSize: "170%" }}>PracUniMart</p>
                <h1>Welcome To My Ecommerce Website</h1>
                <p>
                  Unlock your academic potential with PracUniMart – Your
                  one-stop shop for practical products tailored to your
                  university needs.
                </p>
                <a href="/contact">
                  <button
                    className="btn"
                    style={{
                      backgroundColor: "white",
                      color: "black",
                      padding: "7px 30px 20px 40px",
                      fontSize: "15px",
                      borderRadius: "20px",
                    }}
                  >
                    connect now
                  </button>
                </a>
                <a href="/services">
                  <button
                    className="btn secondary-btn"
                    style={{
                      backgroundColor: "yellow",
                      fontSize: "15px",
                      padding: "7px 30px 20px 40px",
                      borderRadius: "20px",
                      marginLeft: "50px",
                      color: "black",
                    }}
                  >
                    learn more
                  </button>
                </a>
              </div>
              {/* hero image */}
              <div className="hero-image">
                {/* <img
                  src="https://freepngimg.com/thumb/shopping/8-2-shopping-high-quality-png-thumb.png"
                  className="img-responsive"
                  alt="coding together"
                  width="400"
                  height="500"
                /> */}
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

export default First;
