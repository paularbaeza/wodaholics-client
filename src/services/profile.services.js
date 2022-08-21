import service from "./config.services";

const getAllFriendsService = () => {
  return service.get("/profile/friends");
};

const deleteFriendService = (userId) => {
    return service.post (`/profile/${userId}/delete-friend`)
}

export { getAllFriendsService, deleteFriendService};
