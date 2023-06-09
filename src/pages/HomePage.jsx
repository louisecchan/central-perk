import React from "react";
import { Link } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import "./homePage.css";

function HomePage() {
  return (
    <MainLayout>
      <div className="container-main">
        <div className="bg-light p-5 m-5 rounded-3">
          <h1>Welcome to Central Perk POS</h1>
          <br />
          <p className="pos-desc-1">
            The bespoke POS system built for coffee shops of all shapes and
            sizes.
            {/* <br /> If you have an issue, call 020 7101 7661 anytime. */}
          </p>
          <p className="pos-desc-1 pos-desc-2">
            If you have an issue, call 020 7101 7661 anytime.
          </p>
          <br />
          <br />
          <br />
          <Link to="/pos" className="btn fadeInUp animated animatedFadeInUp">
            Click here to start
          </Link>
        </div>
      </div>
    </MainLayout>
  );
}

export default HomePage;
