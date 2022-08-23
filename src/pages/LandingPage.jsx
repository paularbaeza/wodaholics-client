import React from 'react'
import {Link} from "react-router-dom"
import { useContext } from "react";
import { AuthContext } from "../context/auth.context"
import Logo from "../assets/images/logo.png"

function LandingPage() {

  const { isUserActive, user, authenticateUser } = useContext(AuthContext);


    return(
    <div id="landing-page">
    <img src={Logo} alt="wodaholics"></img>
    <br />
    <Link to={isUserActive? "/home": "/login"}><button className='landing-btn'>Enter</button></Link>
    </div>
    )
  
}

export default LandingPage