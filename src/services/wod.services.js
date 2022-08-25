import service from "./config.services";

const getWodsListService = (type) => {
  return service.get(`wods/${type}`);
};

const getWodDetailsService = (wodId) => {
  return service.get(`wods/${wodId}/details`);
};


const deleteFavWodService = (wodId) => {
  return service.post (`/wods/${wodId}/delete-fav`)
}

const addFavWodService = (wodId) => {
return service.post (`/wods/${wodId}/add-fav`)
}

const getRandomWodService = () => {
  return service.get ("/wods/random/get/")
}


export { getWodsListService, getWodDetailsService, deleteFavWodService, addFavWodService, getRandomWodService };
