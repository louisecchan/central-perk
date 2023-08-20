import React from "react";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MainLayout({ children }) {
  return (
    <div>
      <header>
        <nav className="navbar">
          <div className="container">
            <Link to="/" className="navbar-brand">
              Central Perk
            </Link>
          </div>
        </nav>
      </header>
      <main>
        <div className="container mt-3">{children}</div>
        <ToastContainer hideProgressBar={true} />
      </main>
    </div>
  );
}

export default MainLayout;
