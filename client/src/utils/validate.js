export const validateInputs = (userData, isLogin) => {
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
  
    return newErrors; // Return errors object
  };