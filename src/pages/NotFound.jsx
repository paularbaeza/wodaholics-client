import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="blackboard-bg">
    <div className="error-notfound">
    <h1>Sorry, you've got lost.</h1>
    <h1>Try to go back and keep exploring the app.</h1>
    <Link to="/"><button className="landing-btn">Home page</button></Link>
    </div>
    </div>
  )
}

export default NotFound