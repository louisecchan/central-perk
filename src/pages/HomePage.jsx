import React from "react";
import { Link } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";

function HomePage() {
  return (
    <MainLayout>
      <div className="bg-light p-5 mt-4 rounded-3">
        <h1>
          Welcome to Central Perk - <br />
          the POS for coffee shops.
        </h1>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolor
          laborum quae aperiam repellat suscipit delectus cumque quos excepturi
          sapiente maxime! Voluptate, porro? Aspernatur rerum necessitatibus
          nulla qui pariatur placeat inventore.
        </p>
        <p>If you have an issue, call 020 7101 7661 anytime.</p>
        <Link to="/pos" className="btn btn-primary">
          Click here to sell items
        </Link>
      </div>
    </MainLayout>
  );
}

export default HomePage;
