import { useState } from 'react';
import { loginUser } from "../api/axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx"; // ✅ import context
import "./Login.css";
import loginIllustration from "../assets/login.svg";

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth(); // ✅ get login function from context

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    try {
      const res = await loginUser(email, password);

      // Save tokens to localStorage
      localStorage.setItem('accessToken', res.access_token);
      localStorage.setItem('refreshToken', res.refresh_token);

      login(); // ✅ update context so Navbar updates
      navigate('/home');
    } catch (err) {
      if (typeof err === 'string') {
        setErrorMsg(err);
      } else if (err.error) {
        setErrorMsg(err.error);
      } else {
        setErrorMsg('Login failed');
      }
    }
  };

  return (
    <div className="login-page">
      <div className="login-illustration">
        <img src={loginIllustration} alt="Login Illustration" />
      </div>
      <div className="login-form-container">
        <div className="login-title">
          <h2>Login</h2>
        </div>
        {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              autoComplete="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit" className="login-btn">Login</button>
        </form>
        <p className="redirect-text">
          Don't have an account?{" "}
          <span className="redirect-link" onClick={() => navigate("/signup")}>
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;

