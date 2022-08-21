import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";

import { AuthContext } from "../context/auth.context";


import Button from "../../node_modules/@mui/material/Button";
import Menu from "../../node_modules/@mui/material/Menu";
import MenuItem from "../../node_modules/@mui/material/MenuItem";

function NavBar() {
  const navigate = useNavigate();

  const { isUserActive, user, authenticateUser } = useContext(AuthContext);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorEl2, setAnchorEl2] = React.useState(null)

  const openWods = Boolean(anchorEl);
  const openProfile = Boolean(anchorEl2);


  const handleWodsClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleWodsClose = () => {
    setAnchorEl(null);
  };

  const handleProfileClick = (event) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleProfileClose = () => {
    setAnchorEl2(null);
  };
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    authenticateUser();
    navigate("/");
  };

  if (isUserActive === true) {
    return (
      <div className="nav-bar">
        <Link to="/home" className="link-home">
          Home
        </Link>

        <div>
          <Button
            id="demo-positioned-button"
            aria-controls={openWods ? "demo-positioned-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={openWods ? "true" : undefined}
            onClick={handleWodsClick}
          >
            Train now
          </Button>
          <Menu
            id="demo-positioned-menu"
            aria-labelledby="demo-positioned-button"
            anchorEl={anchorEl}
            open={openWods}
            onClose={handleWodsClose}
            anchorOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
          >
            <MenuItem onClick={handleWodsClose}>
              <Link to="/wods/heroes" className="link-dropdown">
                Heroes
              </Link>
            </MenuItem>
            <MenuItem onClick={handleWodsClose}>
              <Link to="/wods/girls" className="link-dropdown">
                The Girls
              </Link>
            </MenuItem>
            <MenuItem onClick={handleWodsClose}>
              <Link to="/wods/weights" className="link-dropdown">
                Weights
              </Link>
            </MenuItem>
          </Menu>
        </div>

        <div>
          <Button
            id="demo-positioned-button"
            aria-controls={openProfile ? "demo-positioned-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={openProfile ? "true" : undefined}
            onClick={handleProfileClick}
          >
            <img src={user.img} width="12%" border-radius="15px" alt="profile" />
          </Button>
          <Menu
            id="demo-positioned-menu"
            aria-labelledby="demo-positioned-button"
            anchorEl={anchorEl2}
            open={openProfile}
            onClose={handleProfileClose}
            anchorOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
          >
            <p className="link-dropdown">{user.username}</p>
            <MenuItem onClick={handleProfileClose}>
              <Link to="/profile" className="link-dropdown">
                My Profile
              </Link>
            </MenuItem>
            <MenuItem onClick={handleProfileClose}>
              <Link to="/profile/friends" className="link-dropdown">
                My Friends
              </Link>
            </MenuItem>
            <MenuItem onClick={handleProfileClose}>
              <Link to="/profile/benchmarks" className="link-dropdown">
                My Benchmarks
              </Link>
            </MenuItem>
            <MenuItem onClick={handleProfileClose}>
              <Link to="/profile/fav-wods" className="link-dropdown">
                My Wods
              </Link>
            </MenuItem>
            <MenuItem onClick={handleProfileClose}>
              <button onClick={handleLogout} >
                Log out
              </button>
            </MenuItem>
          </Menu>
        </div>

      </div>
    );
  } else {
    return (
      <div className="nav-bar">
        <Link to="/signup" className="link-home">
          Sign up
        </Link>
        <Link to="/login" className="link-home">
          Log in
        </Link>
      </div>
    );
  }
}

export default NavBar;
