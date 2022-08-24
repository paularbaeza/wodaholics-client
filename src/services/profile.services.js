import service from "./config.services";

const getAllFriendsService = () => {
  return service.get("/profile/friends");
};

const getAllFriendsIdsService = () => {
  return service.get("/profile/friendsIds");
};

const deleteFriendService = (userId) => {
  return service.post(`/profile/${userId}/delete-friend`);
};

const addFriendService = (userId) => {
  return service.post(`/profile/${userId}/add-friend`);
};

const getFavWodsService = () => {
  return service.get("/profile/fav-wods");
};

const getProfileDataService = () => {
  return service.get("/profile/info");
};

const changeProfileDataService = (updatedProfile) => {
  return service.patch("/profile/info", updatedProfile);
};

const searchUsersService = () => {
  return service.get ("profile/search-users")
}

const getAllMyBenchmarksService = () => {
 return service.get ("profile/mybenchmarks")
}

const getUsersInfoService = (userId) => {
  return service.get (`/profile/${userId}/info`)

}




const getUserBenchmarksOfFavWods = (userId, wodId) => {
  return service.get (`/profile/${userId}/${wodId}/benchmarks`)

}

export {
  getAllFriendsService,
  deleteFriendService,
  addFriendService,
  getFavWodsService,
  getProfileDataService,
  changeProfileDataService,
  searchUsersService,
  getAllMyBenchmarksService,
  getAllFriendsIdsService,
  getUsersInfoService,
  getUserBenchmarksOfFavWods
};
