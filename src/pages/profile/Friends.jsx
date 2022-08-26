import { useEffect, useState } from "react";
import {
  getAllFriendsService,
  deleteFriendService,
} from "../../services/profile.services";
import { Link, useNavigate } from "react-router-dom";

function Friends() {
  const [friendsList, setFriendsList] = useState("");
  const [isFetching, setIsFetching] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    getFriends();
  }, []);

  //get user's friends

  const getFriends = async () => {
    try {
      const response = await getAllFriendsService();
      setFriendsList(response.data);
      setIsFetching(false);
    } catch (error) {
      navigate("/error");
    }
  };

  //delete a friend from the list

  const deleteFriend = async (userId) => {
    try {
      await deleteFriendService(userId);
      getFriends();
    } catch (error) {
      navigate("/error");
    }
  };

  if (isFetching === true) {
    return <h3>...Loading the list of friends...</h3>;
  }

  return (
    <div className="blackboard-bg">
      <h2 className="dirt-font">My friends</h2>
      <div id="friends-list">
        {friendsList.map((eachFriendInProfile) => {
          return (
            <div id="each-friend" key={eachFriendInProfile._id}>
              <Link to={`/profile/${eachFriendInProfile._id}`}>
                <img src={eachFriendInProfile.img} alt="profile" />
              </Link>
              <p>{eachFriendInProfile.username}</p>
              <button onClick={() => deleteFriend(eachFriendInProfile._id)}>
                Delete
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Friends;
