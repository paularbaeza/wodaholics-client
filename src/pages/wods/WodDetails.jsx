import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { getWodDetailsService } from "../../services/wod.services";
import {
  getAllBenchmarksService,
  getLowerTimesService,
  getHigherBenchmarksService,
} from "../../services/benchmark.services";
import { addFavWodService, deleteFavWodService } from "../../services/wod.services";
import AddBenchmarkForm from "../../Components/AddBenchmarkForm";
import { getFavWodsService } from "../../services/profile.services";
import LineChart from "../../Components/LineChart";

function WodDetails() {
  const navigate = useNavigate();

  const { wodId } = useParams();

  const [allWodDetails, setAllWodDetails] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  const [isFormShowed, setIsFormShowed] = useState(false);

  const [benchmark, setBenchmark] = useState([]);
  const [topScores, setTopScores] = useState([]);
  const [isFav, setIsFav] = useState(false)

  useEffect(() => {
    getWodDetails();
    getBenchmarks();
    //getTopScores()
  }, []);


  //* traer los detalles del wod

  const getWodDetails = async () => {
    try {
      const response = await getWodDetailsService(wodId);
      setAllWodDetails(response.data);
      getTopScores(response.data)
      setIsFetching(false);
    } catch (error) {
      navigate("/error");
    }
  };

  //*TODO ESTO HACERLO EN GRAFICA Y SOLO LOS DEL USUARIO traer los benchmarks del wod
  const getBenchmarks = async () => {
    try {
      const response = await getAllBenchmarksService(wodId);
      setBenchmark(response.data);
      getTopScores()
    } catch (error) {
      navigate("/error");
    }
  };




  //!traer las mejores puntuaciones del wod
  const getTopScores = async (allWodDetails) => {
    
        try {
          if(allWodDetails!==null){
            if (allWodDetails.category === "for time") {
              const response = await getLowerTimesService(wodId);
              setTopScores(response.data);
      
              console.log("fortimeeee");
              if (
                allWodDetails.category === "max-kg" ||
                allWodDetails.category === "AMRAP" ||
                allWodDetails.category === "EMOM"
              ) {
                const response = await getHigherBenchmarksService(wodId);
                setTopScores(response.data);
              }
            }
          }
          } catch (error) {
            navigate("/error");
          }
        }
    
      
  

  console.log(allWodDetails)
  console.log(topScores);
//getTopScores()

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
    try{ 
        if(isFav===true){
            await deleteFavWodService(_id)
        }else if( isFav===false){
            await addFavWodService(_id);
        }
        handleFavButton()

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
        setIsFav (true);
      } else {
        setIsFav (false);
      }

    } catch (error) {
      navigate("/error");
    }
  };

  handleFavButton();

  return (
    <div>
      <div id="wod-explanation">
        <h1 className="wodType">{name} </h1>
        <button onClick={addFav} style={{fontSize:35, background:"none", border:"none"}}>
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
        <LineChart/>
        <h5>Top Scores:</h5>
        {/* {topScores.map((eachScore)=> {
            return <p>{eachScore.user[0]}</p>
        })} */}
        <h4>{benchmark.length !== 0 ? "Benchmarks:" : ""}</h4>
        {benchmark.map((eachBenchmark) => {
          return (
            <div key={eachBenchmark._id}>
              <p>User: {eachBenchmark.user[0].username}</p>
              <p>Score: {eachBenchmark.score}</p>
              <p>Date: {eachBenchmark.date}</p>
            </div>
          );
        })}

        <br />
        <button className="benchmark-btn" onClick={toggleFormShowing}>
          {isFormShowed === true ? "x" : "Add benchmark"}
        </button>
        {isFormShowed === true ? (
          <AddBenchmarkForm
            toggleFormFunction={toggleFormShowing}
            category={category}
            getBenchmarks={getBenchmarks}
          />
        ) : null}
      </div>
    </div>
  );
}

export default WodDetails;
