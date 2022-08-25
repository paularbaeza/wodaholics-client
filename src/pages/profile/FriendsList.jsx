import { useEffect, useState } from "react";
import {
  getAllFriendsService,
  deleteFriendService,
} from "../../services/profile.services";
import { Link, useNavigate } from "react-router-dom";

function FriendsList() {
  const [friendsList, setFriendsList] = useState("");
  const [isFetching, setIsFetching] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    getFriends();
  }, []);

  //*traer todos los amigos del usuario conectado

  const getFriends = async () => {
    try {
      const response = await getAllFriendsService();
      setFriendsList(response.data);
      setIsFetching(false);
    } catch (error) {
      navigate("/error");
    }
  };

  //*eliminar amigos de la lista de amigos
  
  const deleteFriend = async (userId) => {
    try {
        await deleteFriendService(userId)
        getFriends()
    } catch (error) {
      navigate("/error");
    }
  };

  if (isFetching === true) {
    return <h3>Loading Friends List</h3>;
  }

  return (
    <div className="blackboard-bg">
    <h2 className="dirt-font">My friends</h2>
    <div id="friends-list">
      {friendsList.map((eachFriend) => {
        return (
          <div id="each-friend" key={eachFriend._id}>
            
          <Link to= {`/profile/${eachFriend._id}`}><img src={eachFriend.img} width="150px" alt="profile" /></Link>
            <p>{eachFriend.username}</p>
            <button onClick={() => deleteFriend(eachFriend._id)}>Delete</button>
          </div>
        );
      })}
    </div>
    </div>
  );
}

export default FriendsList;
