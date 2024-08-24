import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const NavProfile = () => {
  const { user, logout } = useAuth();
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();
  const handleShowMenu = () => {
    setShowMenu((prev) => !prev);
  };
  const logOutUser = () => {
    logout();
    navigate("/");
  };
  return (
    <>
      <div className="dropdown" onClick={handleShowMenu}>
        <div className="btn d-flex dropdown-toggle align-items-center">
          <div className="me-2">{user.email}</div>
        </div>
        <div className={"w-100 dropdown-menu" + (showMenu ? " show" : "")}>
          <button onClick={logOutUser} className="dropdown-item">
            Log out
          </button>
        </div>
      </div>
    </>
  );
};

export default NavProfile;
