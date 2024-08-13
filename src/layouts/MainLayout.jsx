import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MainLayout({ children }) {
    const location = useLocation();

    const navbarBrandStyle = {
        marginLeft: location.pathname === "/" ? "0" : "-4.9rem",
        "@media (max-width: 420px)": {
            marginLeft: location.pathname === "/" ? "0" : "-2.2rem",
        },
    };

    return (
    <div>
      <header>
        <nav className="navbar">
          <div className="container">
            <Link to="/" className="navbar-brand" style={navbarBrandStyle}>
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
