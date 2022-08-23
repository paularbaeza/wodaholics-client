import {
  getBenchmarksOfUsersService,
} from "../../services/benchmark.services";
import { getUsersInfoService } from "../../services/profile.services";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function UsersBenchmarks() {
  const navigate = useNavigate();

  const { userId } = useParams();

  const [userBenchmarks, setUserBenchmarks] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [ userInfo, setUserInfo] = useState ([])

  useEffect(() => {
    getUserInfo();
  }, []);


//*traer los benchmarks de otros usuarios
  const getUserInfo = async () => {
    try {
      const response = await getBenchmarksOfUsersService(userId);
      setUserBenchmarks(response.data);
      const response2 = await getUsersInfoService(userId);
      setUserInfo(response2.data);
      setIsFetching(false);
    } catch (error) {
      navigate("/error");
    }
  };

  if (isFetching === true) {
    return <h3>Loading user's benchmarks</h3>;
  }

//* traer la info de usuarios

if (isFetching === true) {
  return <h3>Loading user's benchmarks</h3>;
}

console.log(userBenchmarks)

//*comprobar si el usuario tiene benchmarks que mostrar

const handleBenchmarks = () => {



    if (userBenchmarks.length === 0){

        return <h1>"This user hasn't added any benchmark yet"</h1>
    }
    else{
        return <div>
        
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
  const {username, role, img, favWods, friends} = userInfo
  console.log(userInfo)



  return <div>
  <img src={img} alt="profile" width="150px"/>
  <h1>{username}</h1>
  <p>{role}</p>


    {handleBenchmarks()}


  </div>;
}

export default UsersBenchmarks;
