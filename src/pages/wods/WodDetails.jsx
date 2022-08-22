import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { getWodDetailsService } from "../../services/wod.services";
import {
  getAllBenchmarksService,
  getHighscoresService, getUserBenchmarksOfAWod
} from "../../services/benchmark.services";
import {
  addFavWodService,
  deleteFavWodService,
} from "../../services/wod.services";
import AddBenchmarkForm from "../../Components/AddBenchmarkForm";
import { getFavWodsService } from "../../services/profile.services";
import LineChart from "../../Components/LineChart";

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

//* traer mis benchmarks de este wod
  const getMyBenchmarks = async () => {
    try {
      const response = await getUserBenchmarksOfAWod(wodId);
      //console.log(response.data)
      const benchmarksArr = response.data
      const onlyScores = benchmarksArr.map((eachBenchmark)=> {
        return eachBenchmark.score
      })
      //console.log(onlyScores)
      setUserBenchmarks(onlyScores);
      const onlyDates = benchmarksArr.map((eachBenchmark)=> {
        return eachBenchmark.date
      })
      //console.log(onlyDates)
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
//console.log(topScores)
  const handleRanking = () => {

    if(topScores.length === 1){
    return <div className="highscores">
        
        <div>
        <p>🥇</p>
        <img src={topScores[0].user[0].img} alt="user" width="100px"/>
        <p>{topScores[0].user[0].username}</p>
        <p>{topScores[0].score}</p>
        </div>

        </div>
        }
      if (topScores.length === 2 ){
        return <div className="highscores">
        <div>
        <p>🥇</p>
        <img src={topScores[0].user[0].img} alt="user" width="100px"/>
        <p>{topScores[0].user[0].username}</p>
        <p>{topScores[0].score}</p>
        </div>
        <div>
        <p>🥈 </p>
        <img src={topScores[1].user[0].img} alt="user" width="100px"/>
        <p>{topScores[1].user[0].username}</p>
        <p>{topScores[1].score}</p>
        </div>
        </div>
      }

      if (topScores.length >= 3){
        return <div className="highscores">

<div>
        <p>🥇</p>
        <img src={topScores[0].user[0].img} alt="user" width="100px"/>
        <p>{topScores[0].user[0].username}</p>
        <p>{topScores[0].score}</p>
        </div>
        <div>
        <p>🥈 </p>
        <img src={topScores[1].user[0].img} alt="user" width="100px"/>
        <p>{topScores[1].user[0].username}</p>
        <p>{topScores[1].score}</p>
        </div>
        <div>
        <p>🥉 </p>
        <img src={topScores[2].user[0].img} alt="user" width="100px"/>
        <p>{topScores[2].user[0].username}</p>
        <p>{topScores[2].score}</p>
        </div>
        </div>
      }
  }

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
        {handleRanking()}

        <LineChart userBenchmarks={userBenchmarks} dateOfBenchmark={dateOfBenchmark}/>


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
