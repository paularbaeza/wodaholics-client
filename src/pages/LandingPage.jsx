import React from 'react'
import {Link} from "react-router-dom"
import { useContext } from "react";
import { AuthContext } from "../context/auth.context"

function LandingPage() {

  const { isUserActive, user, authenticateUser } = useContext(AuthContext);


    return(
    <div id="landing-page">
    <h1>WODAHOLICS</h1>
    <h3>Everything you need to keep track of your progress</h3>
    <Link to={isUserActive? "/home": "/login"}><button>Enter</button></Link>
    </div>
    )
  
}

export default LandingPage