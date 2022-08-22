import service from "./config.services";

const createBenchmarkService = (wodId, newBenchmark) => {
  return service.post(`benchmarks/${wodId}`, newBenchmark);
};

const getAllBenchmarksService = (wodId) => {
  return service.get (`benchmarks/${wodId}`)
}

const getHigherBenchmarksService = (wodId) => {
  return service.get (`benchmarks/${wodId}/higher`)
}

const getLowerTimesService = (wodId) => {
  return service.get (`benchmarks/${wodId}/lower-time`)
}

const getAllUserBenchmarksService = (userId) => {
  return service.get (`benchmarks/${userId}`)
}



export { createBenchmarkService, getAllBenchmarksService, getHigherBenchmarksService, getLowerTimesService, getAllUserBenchmarksService };
