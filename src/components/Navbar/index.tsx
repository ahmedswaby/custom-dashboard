import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./index.css";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="/">Dashboard</Link>
        </div>
        <button className="navbar-toggle" onClick={toggleMenu}>
          ☰
        </button>
        <ul className={`navbar-links ${isMenuOpen ? "active" : ""}`}>
          <li>
            <Link to="/" onClick={() => setIsMenuOpen(false)}>
              Orders Overview
            </Link>
          </li>
          <li>
            <Link to="/user-management" onClick={() => setIsMenuOpen(false)}>
              User Management
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
