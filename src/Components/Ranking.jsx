import { Link } from "react-router-dom";
import gold from "../assets/images/gold.png";
import silver from "../assets/images/silver.png";
import bronze from "../assets/images/bronze.png";

function Ranking(props) {
  const { topScores } = props;
  if (topScores.length === 1) {
    return (
      <div>
        <h1>Top Athletes</h1>
        <div className="highscores">
          <div>
            <img src={gold} alt="gold" width="40px" />
            <br />

            <Link to={`/benchmarks/${topScores[0].user[0]._id}`}>
              <img src={topScores[0].user[0].img} alt="user" width="100px" />
            </Link>
            <p className="ranking-username">{topScores[0].user[0].username}</p>
            <p>{topScores[0].score}</p>
          </div>
        </div>
      </div>
    );
  }
  if (topScores.length === 2) {
    return (
      <div>
        <h1>Ranking</h1>
        <div className="highscores">
        <div>
          <img src={gold} alt="gold" width="40px" />
          <br />
          <Link to={`/benchmarks/${topScores[0].user[0]._id}`}>
            <img src={topScores[0].user[0].img} alt="user" width="150px" />
          </Link>
          <p className="ranking-username">{topScores[0].user[0].username}</p>
          <p>{topScores[0].score}</p>
        </div>
        <div>
          <img src={silver} alt="silver" width="40px" />
          <br />
          <Link to={`/benchmarks/${topScores[1].user[0]._id}`}>
            <img src={topScores[1].user[0].img} alt="user" width="150px" />
          </Link>
          <p className="ranking-username">{topScores[1].user[0].username}</p>
          <p>{topScores[1].score}</p>
        </div>
      </div>
      </div>
    );
  }

  if (topScores.length >= 3) {
    return (
      <div>
        <h1>Ranking</h1>
        <div className="highscores">
          <div>
            <img src={gold} alt="gold" width="40px" />
            <br />
            <Link to={`/benchmarks/${topScores[0].user[0]._id}`}>
              <img src={topScores[0].user[0].img} alt="user" width="100px" />
            </Link>
            <p className="ranking-username">{topScores[0].user[0].username}</p>
            <p>{topScores[0].score}</p>
          </div>
          <div>
            <img src={silver} alt="silver" width="40px" />
            <br />
            <Link to={`/benchmarks/${topScores[1].user[0]._id}`}>
              <img src={topScores[1].user[0].img} alt="user" width="100px" />
            </Link>
            <p className="ranking-username">{topScores[1].user[0].username}</p>
            <p>{topScores[1].score}</p>
          </div>
          <div>
            <img src={bronze} alt="bronze" width="40px" />
            <br />
            <Link to={`/benchmarks/${topScores[2].user[0]._id}`}>
              <img src={topScores[2].user[0].img} alt="user" width="100px" />
            </Link>
            <p className="ranking-username">{topScores[2].user[0].username}</p>
            <p>{topScores[2].score}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Ranking;
