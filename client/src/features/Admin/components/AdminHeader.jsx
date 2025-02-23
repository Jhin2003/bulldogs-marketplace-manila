import "./AdminHeader.scss"
import { useUser } from "../../../context/UserContext";

import { useNavigate } from "react-router-dom";
const AdminHeader = () => {

    const navigate = useNavigate()


const { user,logout } = useUser();

  const handleLogout = () => {
    
    logout()
    navigate("/login");
  }
  return(
    <div className="admin-header">
        <p>{user.username}</p>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default AdminHeader