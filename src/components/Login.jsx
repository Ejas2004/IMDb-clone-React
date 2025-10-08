import React from "react";
import { Lock, Mail, Eye } from "lucide-react";
import "./Login.css";
import Banner from "./Banner";
Banner

function Login() {
  return (
    
    <div className="login-container">
      {/* <a href=""><button id="for-arrow">⬅️<span style={{color:"white"}}>Home</span></button></a> */}
      <div className="login-card">
        <div className="login-header">
          <div className="icon-circle">
            <Lock className="icon-lock" />
          </div>
          <h1 className="welcome-text">Welcome Back</h1>
          <p className="signin-text">Sign in to your account</p>
        </div>

        <div className="login-form">
          <div className="input-group">
            <label>Email Address</label>
            <div className="input-wrapper">
              <Mail className="input-icon" />
              <input type="email" placeholder="you@example.com" />
            </div>
          </div>

          <div className="input-group">
            <label>Password</label>
            <div className="input-wrapper">
              <Lock className="input-icon" />
              <input type="password" placeholder="••••••••" />
              <Eye className="eye-icon" />
            </div>
          </div>

          <button className="signin-btn">Sign In</button>
        </div>

        <div className="divider">
          <span>Or continue with</span>
        </div>

        <div className="social-buttons">
          <button className="social-btn google-btn">Google</button>
          <button className="social-btn facebook-btn">Facebook</button>
        </div>

        <p className="signup-text">
          Don't have an account? <button className="signup-btn">Sign up</button>
        </p>
      </div>
    </div>
  );
}

export default Login;
