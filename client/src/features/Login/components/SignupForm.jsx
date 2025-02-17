import React, { useState } from "react";
import { authenticateSignup } from "../../../service/api";
import "./SignupForm.scss"; // Import the SCSS file

const SignupForm = ({ toggleMode, userData, handleChange, handleSignup }) => {
  return (
    <form className="signup-form">
      <div className="signup-text-wrapper">
        <p>Signup</p>
      </div>
      
      <div className="form-group">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          value={userData.username}
          onChange={handleChange}
          placeholder="Enter your username"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          value={userData.email}
          onChange={handleChange}
          placeholder="Enter your Email"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          value={userData.password}
          onChange={handleChange}
          placeholder="Enter your password"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          name="confirmPassword"
          value={userData.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm Password"
          required
        />
      </div>
      <button className="signup-button" onClick={handleSignup}>
        Signup
      </button>
      <p className="toggle-text">
        Have have an account?{" "}
        <span className="toggle-link" onClick={toggleMode}>
          Login
        </span>
      </p>
    </form>
  );
};

export default SignupForm;
