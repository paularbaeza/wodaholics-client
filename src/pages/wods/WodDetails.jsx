import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

import { getWodDetailsService } from "../../services/wod.services";
import {
  getAllBenchmarksService,
  getHighscoresService, getUserBenchmarksOfAWod, 
} from "../../services/benchmark.services";
import {
  addFavWodService,
  deleteFavWodService,
} from "../../services/wod.services";
import AddBenchmarkForm from "../../Components/AddBenchmarkForm";
import { getFavWodsService } from "../../services/profile.services";
import LineChart from "../../Components/LineChart";
import Ranking from "../../Components/Ranking";
import MyBestTime from "../../Components/MyBestTime";
import UsersBenchmarks from "../benchmarks/UsersBenchmarks";

function WodDetails() {
  const navigate = useNavigate();

  const { wodId } = useParams();

  const [allWodDetails, setAllWodDetails] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  const [isFormShowed, setIsFormShowed] = useState(false);

  const [topScores, setTopScores] = useState([]);
  const [isFav, setIsFav] = useState(false);

  const [userBenchmarks, setUserBenchmarks] = useState([]);
  const [dateOfBenchmark, setDateOfBenchmark] = useState([])

  useEffect(() => {
    getWodDetails();

    getTopScores();
    getMyBenchmarks();
  }, []);

  //* traer los detalles del wod

  const getWodDetails = async () => {
    try {
      const response = await getWodDetailsService(wodId);
      setAllWodDetails(response.data);
      getTopScores(response.data);
      setIsFetching(false);
    } catch (error) {
      navigate("/error");
    }
  };



  //*traer las mejores puntuaciones del wod
  const getTopScores = async () => {
    try {
      const response = await getHighscoresService(wodId);
      setTopScores(response.data);
    } catch (error) {
      navigate("/error");
    }
  };

//* traer mis benchmarks de este wod para la gráfica
  const getMyBenchmarks = async () => {
    try {
      const response = await getUserBenchmarksOfAWod(wodId);
      const benchmarksArr = response.data
      const onlyScores = benchmarksArr.map((eachBenchmark)=> {
        return eachBenchmark.score
      })
      setUserBenchmarks(onlyScores);
      const onlyDates = benchmarksArr.map((eachBenchmark)=> {
        return eachBenchmark.date
      })
      setDateOfBenchmark(onlyDates);
    } catch (error) {
      navigate("/error");
    }
  }

  if (isFetching === true) {
    return <h3>Loading wod details</h3>;
  }

  const toggleFormShowing = () => {
    setIsFormShowed(!isFormShowed);
  };

  const {
    creator,
    wodType,
    name,
    category,
    description,
    exercises,
    equipment,
    _id,
  } = allWodDetails;

  const addFav = async () => {
    try {
      if (isFav === true) {
        await deleteFavWodService(_id);
      } else if (isFav === false) {
        await addFavWodService(_id);
      }
      handleFavButton();
    } catch (error) {
      navigate("/error");
    }
  };

  const handleFavButton = async () => {
    try {
      const response = await getFavWodsService();
      const favWods = response.data;
      let isWodFav = favWods.filter((favWods) => favWods._id === _id);
      if (isWodFav.length === 1) {
        setIsFav(true);
      } else {
        setIsFav(false);
      }
    } catch (error) {
      navigate("/error");
    }
  };

  //console.log(userBenchmarks)

  handleFavButton();

  return (
    <div>
      <div id="wod-explanation">
        <h1 className="wodType">{name} </h1>
        <button
          onClick={addFav}
          style={{ fontSize: 35, background: "none", border: "none" }}
        >
          {isFav === true ? "❤️" : "🤍"}
        </button>
        
        <h4>{description}</h4>
        {exercises.map((eachExercise) => {
          return (
            <p key={eachExercise._id} id="exercises">
              - {eachExercise}
            </p>
          );
        })}
        <Ranking topScores={topScores}/>

        {userBenchmarks.length !== 0 && dateOfBenchmark.length !== 0 && category !== "for time" && <LineChart userBenchmarks={userBenchmarks} dateOfBenchmark={dateOfBenchmark} chartFunction={getMyBenchmarks}/>}
        {userBenchmarks.length >=1 && dateOfBenchmark.length >=1 && category === "for time" && <MyBestTime/>}
        

        <br />
        <button className="benchmark-btn" onClick={toggleFormShowing}>
          {isFormShowed === true ? "x" : "Add benchmark"}
        </button>
        {isFormShowed === true ? (
          <AddBenchmarkForm
            chartFunction = {getMyBenchmarks}
            toggleFormFunction={toggleFormShowing}
            category={category}
            getTopScores={getTopScores}
          />
        ) : null}
      </div>
    </div>
  );
}

export default WodDetails;
