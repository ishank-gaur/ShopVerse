import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import "./Navbar.css";
import profileImage from "../assets/profile.svg";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // clears token + updates state
    navigate("/login");
  };

  return (
    <header className="navbar">
      <div className="navbar-brand">ShopVerse</div>

      <div className="hamburger" onClick={() => setIsOpen(!isOpen)}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>

      <nav className={`nav-links ${isOpen ? "active" : ""}`}>  
        <a href="#contact" onClick={() => setIsOpen(false)}>Contact</a>

        {!isLoggedIn && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">SignUp</Link>
            <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
          </>
        )}

        {isLoggedIn && ( 
          <>
            <Link to="/cart">Cart</Link>
            <Link
  to="/login"
  onClick={() => {
    logout();
    setIsOpen(false); // Close hamburger if open
  }}
  className="logout-link"
>
  Logout
</Link>

          </>
        )}

        <img src={profileImage} alt="profile" />
      </nav>
    </header>
  );
};

export default Navbar;
