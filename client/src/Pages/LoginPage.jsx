import React, { useState } from "react";
import "./LoginPage.scss"; // Import the CSS file
import { authenticateLogin, authenticateSignup } from "../service/api";
import SignupForm from "../features/Login/components/SignupForm";
import LoginForm from "../features/Login/components/LoginForm";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

const LoginPage = () => {
  const navigate = useNavigate();

  const { login } = useUser(); // Assuming login is a function that sets the user context

  const [isLogin, setIsLogin] = useState(true); // State to toggle between login and signup

  const toggleMode = () => {
    setIsLogin((prevIsLogin) => !prevIsLogin);
  };

  // State for user data (email, password, etc.)
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "", // Only needed for signup
  });

  // Handle input changes for both forms
  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle signup action
  const handleSignup = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      if (userData.password !== userData.confirmPassword) {
        // Handle password mismatch case
        alert("Passwords do not match.");
        return;
      }
      const response = await authenticateSignup(userData);
      if (response) {
        console.log("User signed up successfully:", response);
        toggleMode();
      }
    } catch (e) {
      console.error("Signup failed:", e);
      alert("Signup failed. Please try again.");
    }
  };

  // Handle login action
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      // Call API for login
      const {token} = await authenticateLogin(userData);
      login(token);
      navigate("/", { replace: true });
    } catch (e) {
      console.error("Login failed:", e);
      alert("Login failed. Please check your credentials.");
    }
  };

 
    
   return (
  <div className="main-container">
       
    <div className="login-container">
    <div className="brand-div">
      <div className="brand-img-wrapper">
        <img src={'./b.svg'} alt="Brand Logo"/>
      </div>
   </div>
   
      {isLogin ? (
        <LoginForm
          toggleMode={toggleMode}
          userData={userData}
          handleChange={handleChange}
          handleLogin={handleLogin}
        />
      ) : (
        <SignupForm
          toggleMode={toggleMode}
          userData={userData}
          handleChange={handleChange}
          handleSignup={handleSignup}
        />
      )}
    </div>
    <div className="login-image-container">
      <img
        className="login-image"
        src="https://i.pinimg.com/736x/d8/28/a5/d828a58754cb41e8f594d88b7fd9a95b.jpg"
        alt="login"
      />
    </div>
  </div>
);
    
  
};

export default LoginPage;
