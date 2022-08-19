import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { createBenchmarkService } from "../services/benchmark.services";

function AddBenchmarkForm(props) {
  const navigate = useNavigate();
  const { wodId } = useParams();
  const { toggleFormFunction, category, getBenchmarks } = props;
    //console.log(props)
  //console.log(wodId)

  const [score, setScore] = useState(null);
  const [date, setDate] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleScoreChange = (event) => {
    //console.log(event.target.value)
    setScore(event.target.value);
  };

  const handleDateChange = (event) => {
    //console.log(event.target.value)
    setDate(event.target.value);
  };

  const handleBenchmark = async (event) => {
    event.preventDefault();

    const newBenchmark = {
      wod: wodId,
      score: score,
      date: date,
    };

    try {
      await createBenchmarkService(wodId, newBenchmark);
      toggleFormFunction();
      getBenchmarks()
    } catch (error) {
      if (error.response.status === 400) {
        console.log(error.response.data.errorMessage);
        setErrorMessage(error.response.data.errorMessage);
      } else {
        navigate("/error");
      }
    }
  };


  return (
    <div>
      <form onSubmit={handleBenchmark}>
        <label htmlFor="score">Score:</label>
        <input
          type={category === "for time" ? "time" : "text"}
          name="score"
          value={score}
          onChange={handleScoreChange}
          placeholder={category === "for time" ? "00:00" : 0}
        />
        <label htmlFor="score">{category === "max-kg" && "KG"}{(category === "AMRAP" || category=== "EMOM") && "reps"}</label>
        <br />
        <br />
        <label htmlFor="date">Date</label>
        <input
          type="date"
          name="date"
          value={date}
          onChange={handleDateChange}
        />

        <br />
        {errorMessage ? <p>{errorMessage}</p> : null}
        <br />
        <button>Add Benchmark</button>
      </form>
    </div>
  );
}

export default AddBenchmarkForm;