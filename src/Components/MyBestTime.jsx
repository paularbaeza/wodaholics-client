import { getBestTimeOfUserService } from "../services/benchmark.services";
import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

function MyBestTime() {
  const navigate = useNavigate();
  const { wodId } = useParams();

  const [bestTime, setBestTime] = useState([]);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    getBestTime();
  }, []);

  //get user's best time in a for time wod
  const getBestTime = async () => {
    try {
      const response = await getBestTimeOfUserService(wodId);
      setBestTime(response.data);
      setIsFetching(false);
    } catch (error) {
      navigate("/error");
    }
  };

  if (isFetching === true) {
    return <h3>...Loading info...</h3>;
  }

  return (
    <div id="best-time">
      <h1>My personal record</h1>
      <p>Time: {bestTime[0].score}</p>
      <p>{bestTime[0].date}</p>
    </div>
  );
}

export default MyBestTime;
