import React, { useState } from "react";
import "./LoginPage.scss"; // Import the CSS file
import { authenticateLogin, authenticateSignup } from "../service/api";
import { validateInputs } from "../utils/validate";
import SignupForm from "../features/Login/components/SignupForm";
import LoginForm from "../features/Login/components/LoginForm";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import {jwtDecode} from "jwt-decode";


const LoginPage = () => {
  const navigate = useNavigate();
  const { login , user} = useUser(); // Assuming login is a function that sets the user context

  const [isLogin, setIsLogin] = useState(true); // Toggle between login and signup
  const [errors, setErrors] = useState({}); // Store validation errors

  const toggleMode = () => {
    setIsLogin((prevIsLogin) => !prevIsLogin);
    setErrors({}); // Clear errors when switching modes
  };

  // User data state
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "", // Only needed for signup
  });

  // Validate inputs
  const validateInputs = () => {
    const newErrors = {};

    if (!isLogin) {
      if (userData.username.trim().length < 3) {
        newErrors.username = "Username must be at least 3 characters long.";
      }
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userData.email)) {
      newErrors.email = "Invalid email format.";
    }

    if (userData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long.";
    }

    if (!isLogin && userData.password !== userData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  // Handle input changes
  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle signup
  const handleSignup = async (e) => {
    e.preventDefault();
    

    try {
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

  // Handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateInputs()) return; // Stop if validation fails

    try {
      const { token } = await authenticateLogin(userData);
      const decodedUser = jwtDecode(token)
      login(token);
      if(decodedUser.role == "admin"){
        navigate("/admin", { replace: true });
      }else{
        navigate("/", { replace: true });
      }
     
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
            <img src={'./b.svg'} alt="Brand Logo" />
          </div>
        </div>

        {isLogin ? (
          <LoginForm
            toggleMode={toggleMode}
            userData={userData}
            handleChange={handleChange}
            handleLogin={handleLogin}
            errors={errors} // Pass validation errors
          />
        ) : (
          <SignupForm
            toggleMode={toggleMode}
            userData={userData}
            handleChange={handleChange}
            handleSignup={handleSignup}
            errors={errors} // Pass validation errors
          />
        )}
      </div>

      <div className="login-image-container">
        <img
          className="login-image"
          src="./bg.png"
          alt="login"
        />
      </div>
    </div>
  );
};

export default LoginPage;
