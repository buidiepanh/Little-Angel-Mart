import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import LOGO from "../../assets/Logo.jpg";
import "./userDropdown.css";

const userDropdown = () => {
    const navigate = useNavigate();
  const [menuVisible, setMenuVisible] = useState(false);
  const sessionToken = localStorage.getItem("sessionToken");

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const handleLogout = () => {
    localStorage.removeItem("sessionToken");
    navigate("/login");
  };

  return sessionToken ? (
    <div className="user-circle-container">
      <PersonIcon onClick={toggleMenu} className="user-circle-icon" />
      {menuVisible && (
        <div className="dropdown-menu">
            <p>Chào bạn</p>
          <Link to="/profile">Profile</Link>
          <Link to="/settings">Settings</Link>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  ) : null;
};

export default userDropdown;
