import { getBestTimeOfUserService } from "../services/benchmark.services";
import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

function MyBestTime() {
  const navigate = useNavigate();
  const {wodId} = useParams()

  const [bestTime, setBestTime] = useState([]);

  useEffect(() => {
    getBestTime();
  }, []);

  const getBestTime = async () => {
    try {

        const response = await getBestTimeOfUserService(wodId)
        setBestTime(response.data)

    } catch (error) {
      navigate("/error");
    }
  };
  return (
    <div>
      <h1>MY BEST TIME</h1>
      <p>{bestTime[0].score}</p>
      <p>{bestTime[0].date}</p>

    </div>
  );
}

export default MyBestTime;
