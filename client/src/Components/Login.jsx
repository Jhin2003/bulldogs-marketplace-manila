import React, { useState } from "react";
import "./Login.scss"; // Import the CSS file
import { authenticateLogin } from "../service/api";
import SignUp from "./Signup";

import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

const Login = () => {
  const navigate = useNavigate();

  const { login } = useUser();

  const [isLogin, setIsLogin] = useState(true); // State to toggle between login and signup

  const [userData, setUserData] = useState({
    email: "",
    password: "",
  }); // State for password input

  const toggleMode = () => setIsLogin(!isLogin);

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      console.log(userData.email);
      const response = await authenticateLogin(userData);
      console.log("User created successfully:", response);
      login(response);
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  return (
    <>
      <div className="login-container">
     
        {isLogin ? (
          
          <form className="login-form" onSubmit={handleLogin}>
             <div className = "brand-div">
             Bulldogs Marketplace
             </div>
        
            <h2>Login</h2>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
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
              <label htmlFor="password">Password:</label>
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
            <button type="submit" className="btn-login">
              Login
            </button>
            <p className="toggle-text">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
              <span className="toggle-link" onClick={toggleMode}>
                {isLogin ? "Sign Up" : "Login"}
              </span>
            </p>
          </form>
            
        ) : (
        
            <SignUp isLogin = {isLogin} toggleMode={toggleMode} />
           
          
        )}

        <div className="login-image-container">
          <img className = "login-image" src="https://www.technocrazed.com/wp-content/uploads/2015/12/Blue-Wallpaper-For-Background-27.jpg" alt="login-image" />
        </div>
      </div>
    </>
  );
};

export default Login;
