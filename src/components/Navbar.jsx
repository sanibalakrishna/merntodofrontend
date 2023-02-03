import React from "react";
import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

function Navbar() {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const handleClick = () => {
    logout();
  };
  return (
    <header className="headercontainer">
      <div className="container">
        <Link to="/">
          <h1>Todo Buddy</h1>
        </Link>
      </div>
      <nav>
        {user && (
          <div>
            <span>{user.name}</span>
            <button onClick={handleClick}>Logout</button>
          </div>
        )}
        {!user && (
          <div>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign-up</Link>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Navbar;
