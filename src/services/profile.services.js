import service from "./config.services";

const getAllFriendsService = () => {
  return service.get("/profile/friends");
};

const deleteFriendService = (userId) => {
    return service.post (`/profile/${userId}/delete-friend`)
}

const addFriendService = (userId) => {
  return service.post (`/profile/${userId}/delete-friend`)
}

const getFavWodsService = () => {
  return service.get("/profile/fav-wods");
};



export { getAllFriendsService, deleteFriendService, addFriendService, getFavWodsService};
