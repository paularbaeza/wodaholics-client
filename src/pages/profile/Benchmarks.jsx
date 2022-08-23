import { useEffect, useState } from "react";
import {
  getAllMyBenchmarksService,
  getAllUserBenchmarks,
} from "../../services/profile.services.js";
import { deleteBenchmarkService } from "../../services/benchmark.services.js";
import { Link, useNavigate } from "react-router-dom";
import EditBenchmarkForm from "../../Components/EditBenchmarkForm.jsx";



function Benchmarks() {

  const [benchmarksList, setBenchmarksList] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  const [isFormShowed, setIsFormShowed] = useState(false);
  const [benchmarkId, setBenchmarId]= useState (null)


  const navigate = useNavigate();

  useEffect(() => {
    getBenchmarks();
  }, []);



  const getBenchmarks = async () => {
    try {
      const response = await getAllMyBenchmarksService();
      setBenchmarksList(response.data);
      setIsFetching(false);
    } catch (error) {
      navigate("/error");
    }
  };

  const handleDelete = async (benchmarkId) => {
    try {
        await deleteBenchmarkService(benchmarkId)
        getBenchmarks()
    } catch (error) {
      navigate("/error");
    }
  };


  const toggleFormShowing = (eachBenchmarkId) => {
    setIsFormShowed(!isFormShowed);
  };

  if (isFetching === true) {
    return <h3>Loading Benchmark List</h3>;
  }

  return (
    <div>
    <h1>My benchmarks</h1>
    
    {benchmarksList.map((eachBenchmark)=> {
    return <div key={eachBenchmark._id}>
    <p>{eachBenchmark.wod[0].name}</p>
    <p>{eachBenchmark.score}</p>
    <button key={eachBenchmark._id} onClick={()=> toggleFormShowing(eachBenchmark._id)}>
          {isFormShowed === true ? "x" : "Edit"}
        </button>
        {isFormShowed === true ? (
          <EditBenchmarkForm
            toggleFormFunction={toggleFormShowing}
            getBenchmarks={getBenchmarks}
            benchmarkId={eachBenchmark._id}
            category={eachBenchmark.wod[0].category}
          />
        ) : null}
      
    <button onClick={() => handleDelete(eachBenchmark._id)}>Delete</button>
    </div>
    })}
    
    </div>
  )
}

export default Benchmarks