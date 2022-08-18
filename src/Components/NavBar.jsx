import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";

import { AuthContext } from "../context/auth.context";

//Bootstrap
import Dropdown from 'react-bootstrap/Dropdown';


function NavBar() {
  const navigate = useNavigate();

  const { isUserActive, user, authenticateUser } = useContext(AuthContext);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    authenticateUser();
    navigate("/");
  };

  if (isUserActive === true) {
    return (
        
      <div className="nav-bar">

      
        <Link to="/home" className="link-home">Home</Link>
        <Link to="/wods/heroes" className="link-home">Heroes</Link>
        <Link to="/wods/girls" className="link-home">The Girls</Link>
        <Link to="/wods/weights" className="link-home">Weights</Link>
        
        <p>{user.username}</p>
        <button onClick={handleLogout} className="navbar-btn">Log out</button>
   
      </div>
    );
  } else {
    return (
      <div className="nav-bar">
        <Link to="/signup" className="link-home">Sign up</Link>
        <Link to="/login" className="link-home">Log in</Link>
      </div>
    );
  }
}

export default NavBar;
