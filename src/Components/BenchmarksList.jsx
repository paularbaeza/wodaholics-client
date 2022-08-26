import { Link } from "react-router-dom";

function BenchmarksList(props) {
  const { benchmarks } = props;
  return (
    <div className="user-lists">
      {" "}
      {benchmarks.map((eachBenchmark) => {
        return (
          <div className="each-benchmark" key={eachBenchmark._id}>
            <Link
              to={`/${eachBenchmark.wod[0]._id}/details`}
              className="no-decoration-link"
            >
              <h3 className="dirt-font-links">{eachBenchmark.wod[0].name}</h3>
              <p>{eachBenchmark.score}</p>
              <p>{eachBenchmark.date}</p>
            </Link>
          </div>
        );
      })}
    </div>
  );
}

export default BenchmarksList;
