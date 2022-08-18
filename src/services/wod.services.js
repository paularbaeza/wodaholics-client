import service from "./config.services";

const getWodsListService = (type) => {
  return service.get(`wods/${type}`);
};

const getWodDetailsService = (wodId) => {
  return service.get(`wods/${wodId}/details`);
};

export { getWodsListService, getWodDetailsService };
