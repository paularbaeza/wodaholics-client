import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AddBenchmarkForm from "../../Components/AddBenchmarkForm";
import LineChart from "../../Components/LineChart";
import Ranking from "../../Components/Ranking";
import MyBestTime from "../../Components/MyBestTime";

//all services
import {
  getHighscoresService,
  getUserBenchmarksOfAWod,
} from "../../services/benchmark.services";
import {
  addFavWodService,
  deleteFavWodService,
  getWodDetailsService,
} from "../../services/wod.services";
import { getFavWodsService } from "../../services/profile.services";

function WodDetails() {
  const navigate = useNavigate();

  const { wodId } = useParams();

  const [allWodDetails, setAllWodDetails] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [isFormShowed, setIsFormShowed] = useState(false);

  const [topScores, setTopScores] = useState([]);
  const [isFav, setIsFav] = useState(false);

  const [userBenchmarks, setUserBenchmarks] = useState([]);
  const [dateOfBenchmark, setDateOfBenchmark] = useState([]);

  useEffect(() => {
    getWodDetails();

  }, []);

  //* traer los detalles del wod

  const getWodDetails = async () => {
    try {
      const response = await getWodDetailsService(wodId);
      setAllWodDetails(response.data);

      const response2 = await getHighscoresService(wodId);
      setTopScores(response2.data);
      
      const response3 = await getUserBenchmarksOfAWod(wodId);
      const benchmarksArr = response3.data;
      const onlyScores = benchmarksArr.map((eachBenchmark) => {
        return eachBenchmark.score;
      });
      setUserBenchmarks(onlyScores);
      setIsFetching(false);

      const onlyDates = benchmarksArr.map((eachBenchmark) => {
        return eachBenchmark.date;
      });
      setDateOfBenchmark(onlyDates);
      setIsFetching(false);

      setIsFetching(false);
    } catch (error) {
      navigate("/error");
    }
  };
  
  console.log(topScores)

  //*traer las mejores puntuaciones del wod
 

  //* traer mis benchmarks de este wod para la gráfica
  

  if (isFetching === true) {
    return <h3>Loading wod details</h3>;
  }

  const toggleFormShowing = () => {
    setIsFormShowed(!isFormShowed);
  };

  const {
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


  handleFavButton();

  return (
    <div>
      <div id="wod-explanation">
      <div id="wodname-favbtn">
        <h1 className="wodType">{name} </h1>
        <button
          onClick={addFav}
          style={{ fontSize: 35, background: "none", border: "none" }}
        >
          {isFav === true ? "❤️" : "🤍"}
        </button>
</div>
        <h4>{description}</h4>
        {exercises.map((eachExercise) => {
          return (
            <p key={eachExercise._id} id="exercises">
              - {eachExercise}
            </p>
          );
        })}
        <Ranking topScores={topScores}/>

        {userBenchmarks.length !== 0 &&
          dateOfBenchmark.length !== 0 &&
          category !== "for time" && (
            <div id="line-chart">
            <LineChart
              userBenchmarks={userBenchmarks}
              dateOfBenchmark={dateOfBenchmark}
              chartFunction={getWodDetails}
            />
            </div>
          )}
        {userBenchmarks.length >= 1 &&
          dateOfBenchmark.length >= 1 &&
          category === "for time" && <MyBestTime />}

        <br />
        <button className="benchmark-btn" onClick={toggleFormShowing}>
          {isFormShowed === true ? "x" : "Add benchmark"}
        </button>
        {isFormShowed === true ? (
          <AddBenchmarkForm
            toggleFormFunction={toggleFormShowing}
            category={category}
            getTopScores={getWodDetails}
          />
        ) : null}
      </div>
    </div>
  );
}

export default WodDetails;
