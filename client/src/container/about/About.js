import React from "react";
import Header from "../../component/Header";
import "./About.css";

function About() {
  return (
    <>
      <Header />
      <section className="about-us">
        <div className="about">
          <img
            src="https://cdn.pixabay.com/photo/2016/12/24/15/23/online-shopping-1929002_1280.png"
            className="pic"
            alt="img"
            style={{ height: "400px", width: "500px" }}
          />
          <div className="text">
            <h2>About Us</h2>
            <h5>
              Front-end Developer & <span>Designer</span>
            </h5>
            <p>
              Certainly! Here's a paragraph for your "About Us" page: Welcome to
              PracUniMart, where convenience meets academia! Founded with a
              passion for simplifying the student experience, we are dedicated
              to providing a seamless platform for students to acquire the
              practical products they need for their academic journey. Whether
              you're a budding engineer, a future biologist, or a creative
              artist, we understand the importance of having the right tools at
              your fingertips. Our user-friendly interface allows you to
              effortlessly select your university and department, ensuring that
              you find exactly what you need tailored to your curriculum
              requirements. At PracUniMart, we strive to be more than just a
              marketplace; we aim to be your trusted partner in academic
              success. Join us in revolutionizing the way students access
              essential resources and empower yourself to excel in your studies.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default About;
