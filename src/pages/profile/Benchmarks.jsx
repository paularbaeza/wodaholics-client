import { useEffect, useState } from "react";
import {
  getAllMyBenchmarksService,
  getAllUserBenchmarks,
} from "../../services/profile.services.js";

import { Link, useNavigate } from "react-router-dom";



function Benchmarks() {

  const [benchmarksList, setBenchmarksList] = useState(null);
  const [isFetching, setIsFetching] = useState(true);

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

  
  const deleteBenchmark = async (benchmarkId) => {
    try {
        await deleteBenchmark(benchmarkId)
        getBenchmarks()
    } catch (error) {
      navigate("/error");
    }
  };

  if (isFetching === true) {
    return <h3>Loading Benchmark List</h3>;
  }

  return (
    <div>
    <h1>My benchmarks</h1>
    
    {benchmarksList.map((eachBenchmark)=> {
    return <div>
    <p>{eachBenchmark.wod[0].name}</p>
    <p>{eachBenchmark.score}</p>
    </div>
    })}
    
    </div>
  )
}

export default Benchmarks