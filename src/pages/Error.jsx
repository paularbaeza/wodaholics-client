import { Link } from "react-router-dom";

function Error() {
  return (
    <div className="blackboard-bg">
      <div className="error-notfound">
        <h1>Sorry, there was un unexpected error.</h1>
        <h1>Go home and try again.</h1>
        <Link to="/">
          <button className="landing-btn">Home page</button>
        </Link>
      </div>
    </div>
  );
}

export default Error;
