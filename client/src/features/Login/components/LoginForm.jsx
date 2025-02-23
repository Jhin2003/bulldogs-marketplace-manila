import { useState } from "react";
import { authenticateLogin } from "../../../service/api";
import { Navigate, useNavigate } from "react-router-dom";
import "./LoginForm.scss";

import { validateInputs } from "../../../utils/validate";



const LoginForm = ({ toggleMode, userData, handleChange, handleLogin }) => {

  const [errors, setErrors] = useState({}); // Add state for errors

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate input fields
    const validationErrors = validateInputs(userData, true); // true = Login mode
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors); // Update errors state
      return;
    }
    handleLogin(e); // Call login function if no validation errors
  };

  return (
    <>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="login-text-wrapper">
          <p>Hello Nationalian</p>
          <p>Please Enter your credentials</p>
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
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
            id="password"
            name="password"
            value={userData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
          />
          {errors.password && <p className="error-text">{errors.password}</p>}
        </div>

        <button type="submit" className="login-button">
          Login
        </button>

        <p className="toggle-text">
          Don't have an account? <span className="toggle-link" onClick={toggleMode}>Sign Up</span>
        </p>
      </form>
    </>
  );
};

export default LoginForm;