import service from "./config.services";

const getAllFriendsService = () => {
  return service.get("/profile/friends");
};

const deleteFriendService = (userId) => {
  return service.post(`/profile/${userId}/delete-friend`);
};

const addFriendService = (userId) => {
  return service.post(`/profile/${userId}/delete-friend`);
};

const getFavWodsService = () => {
  return service.get("/profile/fav-wods");
};

const getProfileDataService = () => {
  return service.get("/profile/info");
};

const changeProfileDataService = () => {
  return service.patch("/profile/info");
};

const searchUsersService = () => {
  return service.get ("profile/search-users")
}

export {
  getAllFriendsService,
  deleteFriendService,
  addFriendService,
  getFavWodsService,
  getProfileDataService,
  changeProfileDataService,
  searchUsersService
};
