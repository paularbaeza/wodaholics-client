import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";

import { AuthContext } from "../context/auth.context";

//Bootstrap
import Button from "../../node_modules/@mui/material/Button";
import Menu from '../../node_modules/@mui/material/Menu';
import MenuItem from '../../node_modules/@mui/material/MenuItem';



function NavBar() {
  const navigate = useNavigate();

  const { isUserActive, user, authenticateUser } = useContext(AuthContext);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  }

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    authenticateUser();
    navigate("/");
  };

  if (isUserActive === true) {
    return (
        
      <div className="nav-bar">

      
        <Link to="/home" className="link-home">Home</Link>

        <div>
      <Button
        id="demo-positioned-button"
        aria-controls={open ? 'demo-positioned-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        Train now
      </Button>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      > 
        <MenuItem onClick={handleClose}><Link to="/wods/heroes" className="link-dropdown">Heroes</Link></MenuItem>
        <MenuItem onClick={handleClose}><Link to="/wods/girls" className="link-dropdown">The Girls</Link></MenuItem>
        <MenuItem onClick={handleClose}><Link to="/wods/weights" className="link-dropdown">Weights</Link></MenuItem>
       
      </Menu>
    </div>


        
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
