import service from "./config.services";

const createBenchmarkService = (wodId, newBenchmark) => {
  return service.post(`benchmarks/${wodId}`, newBenchmark);
};

const deleteBenchmarkService = (benchmarkId) => {
  return service.delete(`benchmarks/${benchmarkId}`)
}

const updateBenchmarkService = (benchmarkId, updatedBenchmark) => {
  return service.patch(`benchmarks/${benchmarkId}`, updatedBenchmark)
}

const getAllBenchmarksService = (wodId) => {
  return service.get (`benchmarks/${wodId}`)
}


const getAllUserBenchmarksService = (userId) => {
  return service.get (`benchmarks/${userId}`)
}

const getHighscoresService = (wodId) =>{
  return service.get (`benchmarks/${wodId}/highscores`)
}

const getUserBenchmarksOfAWod = (wodId) => {
  return service.get (`benchmarks/${wodId}/all`)
}


export { createBenchmarkService, getAllBenchmarksService, getHighscoresService, getAllUserBenchmarksService,getUserBenchmarksOfAWod, deleteBenchmarkService, updateBenchmarkService };
