//*comprobar si el usuario tiene benchmarks que mostrar

function UserBenchmarks(props) {

    const {benchmarks} = props

            if (benchmarks.length === 0){
    
            return <div className="error-notfound">  <h1>"This user hasn't added any benchmark yet"</h1></div>
        }
        else{
            return <div className="user-benchmarks">
            
            {benchmarks.map((eachBenchmark) => {
                return <div className="each-benchmark" key={eachBenchmark._id}>
                <h3>{eachBenchmark.wod[0].name}</h3>
                <p>{eachBenchmark.score}</p>
                <p>{eachBenchmark.date}</p>
        
                </div>
            })}
            </div>
        }
        
    }
  


export default UserBenchmarks