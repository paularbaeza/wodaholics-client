import { Link } from "react-router-dom";


//*comprobar si el usuario tiene benchmarks que mostrar


function UserBenchmarks(props) {

    const {benchmarks} = props

            if (benchmarks.length === 0){
    
            return <div className="error-notfound">  <h1>"This user hasn't added any benchmark yet"</h1></div>
        }
        else{
            return <div className="user-benchmarks">
            
            {benchmarks.map((eachBenchmark) => {
                return <div className="each-benchmark" key={eachBenchmark._id}><Link to={`/${eachBenchmark.wod[0]._id}/details`} className="no-decoration-link">
                <h3 className="dirt-font-links">{eachBenchmark.wod[0].name}</h3>
                <p>{eachBenchmark.score}</p>
                <p>{eachBenchmark.date}</p>
                </Link>
                </div>
            })}
            </div>
        }
        
    }
  


export default UserBenchmarks