import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { getWodDetailsService } from "../../services/wod.services";
import {
  getAllBenchmarksService,
} from "../../services/benchmark.services";

import AddBenchmarkForm from "../../Components/AddBenchmarkForm";

function WodDetails() {
  const navigate = useNavigate();

  const { wodId } = useParams();

  const [allWodDetails, setAllWodDetails] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  const [isFormShowed, setIsFormShowed] = useState(false)

  const [benchmark, setBenchmark] = useState([]);

  useEffect(() => {
    getWodDetails();
    getBenchmarks();
  }, []);
  
  
  //* traer los detalles del wod

  const getWodDetails = async () => {
    try {
      const response = await getWodDetailsService(wodId);
      //console.log(response.data)
      setAllWodDetails(response.data);
      setIsFetching(false);
    } catch (error) {
      navigate("/error");
    }
  };

  //*traer los benchmarks del wod
  const getBenchmarks = async () => {
    try {
      const response = await getAllBenchmarksService(wodId);
      setBenchmark(response.data);
    } catch (error) {
      navigate("/error");
    }
  };
  //console.log(benchmark)

  if (isFetching === true) {
    return <h3>Loading wod details</h3>;
  }


  const toggleFormShowing=() => {
        setIsFormShowed(!isFormShowed)
  }

  const { creator, wodType, name, category, description, exercises, equipment, _id } =
    allWodDetails;

    //console.log(allWodDetails)

    return (
    <div>
    <div id="wod-explanation">
      <h1 className="wodType">{name} </h1>
      <h4>{description}</h4>
      {exercises.map((eachExercise) => {
        return <p key= {eachExercise._id} id="exercises">- {eachExercise}</p>;
      })}
      </div>
      <h4>{benchmark.length !== 0 ? "Benchmarks:" : "" }</h4>
      {benchmark.map((eachBenchmark) => {
        
        return (
          <div>
            <p>User: {eachBenchmark.user[0].username}</p>
            <p>Score: {eachBenchmark.score}</p>
            <p>Date: {eachBenchmark.date}</p>
          </div>
        );
      })}

      <br />
      <button onClick={toggleFormShowing}>{isFormShowed===true? "X" :"Add benchmark"}</button>
      {isFormShowed === true ? <AddBenchmarkForm toggleFormFunction={toggleFormShowing} category={category} getBenchmarks={getBenchmarks}/>: null}

      </div>
  );
}

export default WodDetails;
