import React, { useState } from 'react';
import { authenticateSignup } from '../service/api';
import './Signup.scss';  // Import the SCSS file

const SignUp = ({isLogin, toggleMode }) => {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const signupUser = async (e) => {
    e.preventDefault();
    try {
      const response = await authenticateSignup(userData);
      console.log('User created successfully:', response);
      toggleMode();
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  return (
    <div className="signup-container">
      <h2 className="signup-heading">Sign Up</h2>
      <form className="signup-form" onSubmit={signupUser}>
        <input
          className="signup-input"
          type="text"
          name="username"
          value={userData.username}
          onChange={handleChange}
          placeholder="Username"
          required
        />
        <input
          className="signup-input"
          type="email"
          name="email"
          value={userData.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <input
          className="signup-input"
          type="password"
          name="password"
          value={userData.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />
        <input
          className="signup-input"
          type="password"
          name="confirmPassword"
          value={userData.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm Password"
          required
        />
        <button className="signup-button" type="submit">
          Signup
        </button>
        <p className="toggle-text">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
              <span className="toggle-link" onClick={toggleMode}>
                {isLogin ? "Sign Up" : "Login"}
              </span>
            </p>
      </form>
    </div>
  );
};

export default SignUp;
