import React from 'react';
import './Navbar.css';

const Navbar = ({ userType, userName }) => {
    return (
      <nav className="navbar">
        <div className="navbar-user-left">
          <span className="user-name">Edudox Nexus</span>
        </div>
        <div className="navbar-links-right">
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/contact">Contact</a></li>
            <li><a href="/logout" className="logout-btn">Logout</a></li>
          </ul>
        </div>
      </nav>
    );
  };

export default Navbar;