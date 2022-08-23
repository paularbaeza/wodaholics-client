import { Link} from "react-router-dom";

function Ranking(props) {
    const {topScores, getTopScores} = props
console.log(topScores)
    if(topScores.length === 1){
        return <div className="highscores">
            
            <div>
            <p>🥇</p>
            <Link to= {`/benchmarks/${topScores[0].user[0]._id}`}><img src={topScores[0].user[0].img} alt="user" width="100px"/></Link>
            <p className="ranking-username">{topScores[0].user[0].username}</p>
            <p>{topScores[0].score}</p>
            </div>
    
            </div>
    }
    if (topScores.length === 2 ){
        return <div className="highscores">
        <div>
        <p>🥇</p>
        <Link to= {`/benchmarks/${topScores[0].user[0]._id}`}><img src={topScores[0].user[0].img} alt="user" width="100px"/></Link>
        <p className="ranking-username">{topScores[0].user[0].username}</p>
        <p>{topScores[0].score}</p>
        </div>
        <div>
        <p>🥈 </p>
        <Link to= {`/benchmarks/${topScores[1].user[0]._id}`}><img src={topScores[1].user[0].img} alt="user" width="100px"/></Link>
        <p className="ranking-username">{topScores[1].user[0].username}</p>
        <p>{topScores[1].score}</p>
        </div>
        </div>
      }

      if (topScores.length >= 3){
        return <div className="highscores">

<div>
        <p>🥇</p>
        <Link to= {`/benchmarks/${topScores[0].user[0]._id}`}><img src={topScores[0].user[0].img} alt="user" width="100px"/></Link>
        <p className="ranking-username">{topScores[0].user[0].username}</p>
        <p>{topScores[0].score}</p>
        </div>
        <div>
        <p>🥈 </p>
        <Link to= {`/benchmarks/${topScores[1].user[0]._id}`}><img src={topScores[1].user[0].img} alt="user" width="100px"/></Link>
        <p className="ranking-username">{topScores[1].user[0].username}</p>
        <p>{topScores[1].score}</p>
        </div>
        <div>
        <p>🥉 </p>
        <Link to= {`/benchmarks/${topScores[2].user[0]._id}`}><img src={topScores[2].user[0].img} alt="user" width="100px"/></Link>
        <p className="ranking-username">{topScores[2].user[0].username}</p>
        <p>{topScores[2].score}</p>
        </div>
        </div>
      }
  }
  


export default Ranking