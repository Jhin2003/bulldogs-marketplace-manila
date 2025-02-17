import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Alert.scss"; // Import SCSS file

const Alert = () => {
  return (
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      className="custom-toast-container" // Apply SCSS styles
    />
  );
};

// Function to trigger toast
export const showAlert = (message, type = "success") => {
  toast[type](message); // Supports "success", "error", "info", etc.
};

export default Alert;