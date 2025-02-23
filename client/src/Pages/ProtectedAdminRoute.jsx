import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../context/UserContext"; // Adjust the path as needed

const ProtectedAdminRoute = () => {
  const { user, isLoading } = useUser();

  if (isLoading) return <p>Loading...</p>;

  // Check if the user is an admin
  return user && user.role === "admin" ? <Outlet /> :   <Navigate to="/login" replace />;;
};

export default ProtectedAdminRoute;