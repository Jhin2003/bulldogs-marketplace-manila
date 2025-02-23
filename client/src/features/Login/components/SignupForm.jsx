import React, { useState } from "react";
import "./SignupForm.scss"; // Import the SCSS file
import { validateInputs } from "../../../utils/validate";

const SignupForm = ({ toggleMode, userData, handleChange, handleSignup }) => {
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission

    const newErrors = validateInputs(userData, false); // false for Signup
    if (Object.keys(newErrors).length === 0) {
      handleSignup(e); // Proceed only if no errors
    } else {
      setErrors(newErrors);
    }
  };

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
        {errors.username && <p className="error-text">{errors.username}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          value={userData.email}
          onChange={handleChange}
          placeholder="Enter your email"
          required
        />
        {errors.email && <p className="error-text">{errors.email}</p>}
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
        {errors.password && <p className="error-text">{errors.password}</p>}
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
        {errors.confirmPassword && (
          <p className="error-text">{errors.confirmPassword}</p>
        )}
      </div>

      <button className="signup-button" onClick={handleSubmit}>
        Signup
      </button>
      <p className="toggle-text">
        Already have an account?{" "}
        <span className="toggle-link" onClick={toggleMode}>
          Login
        </span>
      </p>
    </form>
  );
};

export default SignupForm;
