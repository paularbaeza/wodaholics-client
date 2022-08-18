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

  //*añadir benchmark


  const toggleFormShowing=() => {
        setIsFormShowed(!isFormShowed)
  }

  const { creator, wodType, name, description, exercises, equipment, _id } =
    allWodDetails;

  return (
    <div>
      <h1>{name} </h1>
      <h4>{description}</h4>
      {exercises.map((eachExercise) => {
        return <li>{eachExercise}</li>;
      })}
      <h4>Benchmarks:</h4>
      {benchmark.map((eachBenchmark) => {
        return (
          <div>
            <p>User: {eachBenchmark.user}</p>
            <p>Score: {eachBenchmark.score}</p>
            <p>Date: {eachBenchmark.date}</p>
          </div>
        );
      })}

      <br />
      <button onClick={toggleFormShowing}>{isFormShowed===true? "X" :"Add benchmark"}</button>
      {isFormShowed === true ? <AddBenchmarkForm toggleFormFunction={toggleFormShowing}/>: null}

      </div>
  );
}

export default WodDetails;
