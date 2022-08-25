import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import EditBenchmarkForm from "../../Components/EditBenchmarkForm.jsx";
//all services
import { getAllMyBenchmarksService } from "../../services/profile.services.js";
import { deleteBenchmarkService } from "../../services/benchmark.services.js";


function Benchmarks() {
  const [benchmarksList, setBenchmarksList] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  const [benchmarkId, setBenchmarkId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    getBenchmarks();
  }, []);

  console.log(benchmarkId);

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
      await deleteBenchmarkService(benchmarkId);
      getBenchmarks();
    } catch (error) {
      navigate("/error");
    }
  };

  const handleFormShowing = (benchmarkFormId) => {
    if (benchmarkId !== benchmarkFormId) {
      setBenchmarkId(benchmarkFormId);
    } else if (benchmarkFormId === benchmarkId) {
      setBenchmarkId("");
    }
  };

  if (isFetching === true) {
    return <h3>Loading Benchmark List</h3>;
  }

  return (
    <div id="my-benchmarks" className="blackboard-bg">
      <h1 className="dirt-font">My benchmarks</h1>
      <div className="user-benchmarks">
        {benchmarksList.map((eachBenchmark) => {
          return (
            <div className="each-benchmark" key={eachBenchmark._id}>
            <Link to={`/${eachBenchmark.wod[0]._id}/details`} className= "no-decoration-link">
              <p  id="wod-name">{eachBenchmark.wod[0].name}</p>
              <p >{eachBenchmark.score}</p>
              <p>{eachBenchmark.date}</p>
              </Link>
              <button
                id="edit-benchmark"
                key={eachBenchmark._id}
                onClick={() => {
                  handleFormShowing(eachBenchmark._id);
                }}
              >
                {eachBenchmark._id === benchmarkId ? "Close" : "Edit"}
              </button>
              {eachBenchmark._id === benchmarkId ? (
                <EditBenchmarkForm
                  getBenchmarks={getBenchmarks}
                  benchmarkId={eachBenchmark._id}
                  setBenchmarkId={setBenchmarkId}
                  category={eachBenchmark.wod[0].category}
                />
              ) : null}

              <button
                id="delete-benchmark"
                onClick={() => handleDelete(eachBenchmark._id)}
              >
                Delete
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Benchmarks;
