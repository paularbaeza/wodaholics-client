import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import Logo1 from "../assets/images/logo1.png";

function LandingPage() {
  const { isUserActive } = useContext(AuthContext);

  return (
    <div id="landing-page">
      <img src={Logo1} alt="wodaholics"></img>
      <p>Everything you need</p>
      <p>to keep track of your progress</p>
      <br />
      <Link to={isUserActive ? "/home" : "/login"}>
        <button className="landing-btn">Enter</button>
      </Link>
    </div>
  );
}

export default LandingPage;
