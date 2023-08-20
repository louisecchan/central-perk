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
            A simple POS system built for coffee shops of all shapes and sizes.{" "}
            <span className="contact-text">
              Have questions? Call us at 020 7101 7661 any time.
            </span>
          </p>
          <br />
          <div className="start-btn">
            <Link to="/pos" className="btn fadeInUp animated animatedFadeInUp">
              <h2>Click Here to Start</h2>
            </Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default HomePage;
