import {
  getBenchmarksOfUsersService,
  getUserBenchmarksOfAWod,
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

  const getUserBenchmarks = async () => {
    try {
      const response = await getBenchmarksOfUsersService(userId);
      setUserBenchmarks(response.data);
      setIsFetching(false);
    } catch (error) {
      navigate("/error");
    }
  };
  console.log(userBenchmarks);

  if (isFetching === true) {
    return <h3>Loading user's benchmarks</h3>;
  }


const handleBenchmarks = () => {
    if(userBenchmarks.lenght !== 0){
        return <div><h1>{userBenchmarks[0].user[0].username}</h1>
        {userBenchmarks.map((eachBenchmark) => {
            return <div>
            <h3>{eachBenchmark.wod[0].name}</h3>
            <p>{eachBenchmark.score}</p>
            <p>{eachBenchmark.date}</p>
    
            </div>
        })}
        </div>
    }else {
        return "No benchmarks yet"
    }
}
  
  return <div>
    {handleBenchmarks()}


  </div>;
}

export default UsersBenchmarks;
