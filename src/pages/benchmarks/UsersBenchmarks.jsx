import {
  getBenchmarksOfUsersService,
} from "../../services/benchmark.services";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function UsersBenchmarks() {
  const navigate = useNavigate();

  const { userId } = useParams();

  const [userBenchmarks, setUserBenchmarks] = useState([]);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    getUserBenchmarks();
  }, []);


//*traer los benchmarks de otros usuarios
  const getUserBenchmarks = async () => {
    try {
      const response = await getBenchmarksOfUsersService(userId);
      setUserBenchmarks(response.data);
      setIsFetching(false);
    } catch (error) {
      navigate("/error");
    }
  };

  if (isFetching === true) {
    return <h3>Loading user's benchmarks</h3>;
  }

//*comprobar si el usuario tiene benchmarks que mostrar

const handleBenchmarks = () => {

    if (userBenchmarks.length === 0){
        return <h1>"This user hasn't added any benchmark yet"</h1>
    }
    else{
        return <div><h1>{userBenchmarks[0].user[0].username}</h1>
        {userBenchmarks.map((eachBenchmark) => {
            return <div key={eachBenchmark._id}>
            <h3>{eachBenchmark.wod[0].name}</h3>
            <p>{eachBenchmark.score}</p>
            <p>{eachBenchmark.date}</p>
    
            </div>
        })}
        </div>
    }
    
}
  
  return <div>
    {handleBenchmarks()}


  </div>;
}

export default UsersBenchmarks;
