import service from "./config.services";

const createBenchmarkService = (wodId, newBenchmark) => {
  return service.post(`benchmarks/${wodId}`, newBenchmark);
};

const getAllBenchmarksService = (wodId) => {
  return service.get (`benchmarks/${wodId}`)
}



export { createBenchmarkService, getAllBenchmarksService };
