import React from 'react'
import {Link} from "react-router-dom"

function LandingPage() {
  return (
    <div>
    <h1>LandingPage</h1>
    <Link to="/login"><button>Enter</button></Link>
    </div>
  )
}

export default LandingPage