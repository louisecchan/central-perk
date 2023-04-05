import React from "react";
import { Link } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";

function HomePage() {
  return (
    <MainLayout>
      <div className="bg-light p-5 m-5 rounded-3">
        <h1>
          Welcome to Central Perk Point of Sale - <br />
          The POS system that's easy to set up and use.
        </h1>
        <br />
        <p>
          The bespoke POS system built for coffee shops of all shapes and sizes.
        </p>
        <p>If you have an issue, call 020 7101 7661 anytime.</p>
        <br />
        <Link to="/pos" className="btn btn-dark">
          Click here to sell items
        </Link>
      </div>
    </MainLayout>
  );
}

export default HomePage;
