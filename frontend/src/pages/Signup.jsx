import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";
import illustration from "../assets/Signup.svg";
import { signupUser } from "../api/axios"; 


const SignupPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await signupUser(formData);
      console.log("Signup success:", response);
      alert("User registered successfully!");
      navigate("/login"); // move to login after success
    } catch (error) {
      console.error("Signup failed:", error);
      alert("Signup failed: " + (error?.error || "Please try again"));
    }
  };

  return (
    <div className="input-form-page">
      <div className="form-illustration">
        <img src={illustration} alt="Signup Illustration" />
      </div>
      <div className="input-form-container">
        <div className="title-container">
          <h2>Sign Up</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              placeholder="Choose a username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="btn-row">
            <button type="reset" className="reset-btn">Reset</button>
            <button type="submit" className="submit-btn">Sign Up</button>
          </div>
        </form>
        <p className="redirect-text">
          Already have an account?{" "}
          <span className="redirect-link" onClick={() => navigate("/login")}>
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
