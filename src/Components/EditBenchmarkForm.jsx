import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { updateBenchmarkService } from "../services/benchmark.services";

function EditBenchmarkForm(props) {
  const navigate = useNavigate();
  const { toggleFormFunction, getBenchmarks, benchmarkId, category } = props;




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

    const updatedBenchmark = {
      score: score,
      date: date,
    };

    try {
      await updateBenchmarkService(benchmarkId, updatedBenchmark);
      toggleFormFunction();
      getBenchmarks();
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
      <form >
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
        <button  onClick={handleBenchmark} className="benchmark-form-btn">Edit Benchmark</button>
      </form>
    </div>
  );
}

export default EditBenchmarkForm;
