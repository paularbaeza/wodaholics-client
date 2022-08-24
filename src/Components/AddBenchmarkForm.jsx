import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { createBenchmarkService } from "../services/benchmark.services";

function AddBenchmarkForm(props) {
  const navigate = useNavigate();
  const { wodId } = useParams();
  const { toggleFormFunction, category, chartFunction } = props;


  const [score, setScore] = useState(null);
  const [date, setDate] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleScoreChange = (event) => {
    setScore(event.target.value);
  };

  const handleDateChange = (event) => {
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
      chartFunction()
    } catch (error) {
      if (error.response.status === 400) {
        console.log(error.response.data.errorMessage);
        setErrorMessage(error.response.data.errorMessage);
      } else {
        navigate("/error");
      }
    }
  };

  const handlePlaceholder = () => {
    if (category === "for time") {
      return "00:00";
    } else if (category === "max-kg") {
      return "0";
    } else if (category === "AMRAP" || category === "EMOM") return "0 ";
  };

  return (
    <div id="benchmark-form">
      <form onSubmit={handleBenchmark}>
        <div id="score">
          <label htmlFor="score">Score:</label>
          <input
            type={category === "for time" ? "time" : "text"}
            name="score"
            value={score}
            onChange={handleScoreChange}
            placeholder={handlePlaceholder()}
          />

          <label htmlFor="score">
            {category === "max-kg" && "KG"}
            {(category === "AMRAP" || category === "EMOM") && "reps"}
          </label>
        </div>
        <div id="date">
          <label htmlFor="date">Date</label>
          <input
            type="date"
            name="date"
            value={date}
            onChange={handleDateChange}
          />
        </div>
        <div id="error-message">
          {errorMessage ? <p>{errorMessage}</p> : null}
        </div>
        <button className="benchmark-form-btn">Add Benchmark</button>
      </form>
    </div>
  );
}

export default AddBenchmarkForm;
