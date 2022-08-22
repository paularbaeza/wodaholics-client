import service from "./config.services";

const createBenchmarkService = (wodId, newBenchmark) => {
  return service.post(`benchmarks/${wodId}`, newBenchmark);
};

const getAllBenchmarksService = (wodId) => {
  return service.get (`benchmarks/${wodId}`)
}

// const getHigherBenchmarksService = (wodId) => {
//   return service.get (`benchmarks/${wodId}/higher`)
// }

// const getLowerTimesService = (wodId) => {
//   return service.get (`benchmarks/${wodId}/lower-time`)
// }

const getAllUserBenchmarksService = (userId) => {
  return service.get (`benchmarks/${userId}`)
}

const getHighscoresService = (wodId) =>{
  return service.get (`benchmarks/${wodId}/highscores`)
}


export { createBenchmarkService, getAllBenchmarksService, getHighscoresService, getAllUserBenchmarksService };
