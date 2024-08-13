import React from "react";
import { Link } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import "./homePage.css";

function HomePage() {
  return (
    <MainLayout>
      <div className="container-main">
        <div className="bg-black p-5 m-5 rounded-3">
          <p className="pos-desc-1">
            Built for cafes.{" "}
            Built for you.
            <span className="contact-text">
            </span>
          </p>
          <br />
          <div className="start-btn">
            <Link to="/pos" className="btn fadeInUp animated animatedFadeInUp">
              <h2>Get Started</h2>
            </Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default HomePage;
