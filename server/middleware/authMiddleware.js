const jwt = require("jsonwebtoken");




const SECRET_KEY = process.env.JWT_SECRET_KEY || "your_jwt_secret";


// Middleware to verify JWT
const authenticate = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1]; // Get token from "Bearer <token>"
  
  if (!token) {
    return res.status(401).json({ message: "Access denied, no token provided" });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded; // Store decoded user data in request object
    console.log("Authenticated", req.user)
   
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

// Middleware to authorize specific roles
const authorize = (roles = []) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied" });
    }
    next();
  };
};

module.exports = { authenticate, authorize };