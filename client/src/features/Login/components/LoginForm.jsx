import { useState } from "react";
import { authenticateLogin } from "../../../service/api";
import { Navigate, useNavigate } from "react-router-dom";
import "./LoginForm.scss"
const LoginForm = ({ toggleMode, userData, handleChange, handleLogin}) => {


  return (
    <>
    
    <form className="login-form">
    
    <div className="login-text-wrapper">
      <p>Hello Nationalian</p>
      <p>Please Enter your credentials</p>
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email" // Add this attribute
          value={userData.email}
          onChange={handleChange}
          placeholder="Enter your email"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password" // Add this attribute
          value={userData.password}
          onChange={handleChange}
          placeholder="Enter your password"
          required
        />
      </div>
      <button className="login-button" onClick={handleLogin}>
        Login
      </button>
      <p className="toggle-text">Don't have an account? <span className="toggle-link"  onClick={toggleMode} >Sign Up</span></p>
    </form>

    </>
  );
};

export default LoginForm;
