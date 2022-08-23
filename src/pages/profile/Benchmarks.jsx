import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EditBenchmarkForm from "../../Components/EditBenchmarkForm.jsx";
//all services
import {
  getAllMyBenchmarksService,
} from "../../services/profile.services.js";
import { deleteBenchmarkService } from "../../services/benchmark.services.js";




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


  const toggleFormShowing = (eachBenchmarkId, benchmarkId) => {
    if(eachBenchmarkId === benchmarkId)
    {setIsFormShowed(!isFormShowed);}
    
  };

  if (isFetching === true) {
    return <h3>Loading Benchmark List</h3>;
  }

  return (
    <div id="my-benchmarks">
    <h1 className="dirt-font">My benchmarks</h1>
    <div className="user-benchmarks">
    
    {benchmarksList.map((eachBenchmark)=> {
    return <div className="each-benchmark" key={eachBenchmark._id}>
    <p id="wod-name">{eachBenchmark.wod[0].name}</p>
    <p>{eachBenchmark.score}</p>
    <button id="edit-benchmark" key={eachBenchmark._id} onClick={()=> toggleFormShowing(eachBenchmark._id)}>
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
      
    <button id="delete-benchmark" onClick={() => handleDelete(eachBenchmark._id)}>Delete</button>
    </div>
    })}
    
    </div>
    </div>
  )
}

export default Benchmarks