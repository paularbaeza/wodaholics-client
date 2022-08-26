import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  searchUsersService,
  addFriendService,
  getAllFriendsService,
  deleteFriendService,
} from "../services/profile.services";

function SearchResults() {
  const { search } = useParams();
  const navigate = useNavigate();

  const [userSearch, setUserSearch] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  const [friendList, setFriendsList] = useState([]);

  useEffect(() => {
    filterFriends();
    getFriendsList();
  }, [search]);

  const filterFriends = async () => {
    let response = await searchUsersService();
    let users = response.data;
    let searchResults = users.filter((eachUser) => {
      return (eachUser.username.toLowerCase()).includes(search.toLowerCase());
    });
    setUserSearch(searchResults);
    setIsFetching(false);
  };

  const getFriendsList = async () => {
    try {
      const response = await getAllFriendsService();
      const userFriends = response.data;

      const friendsIds = userFriends.map((eachFriend) => {
        return eachFriend._id;
      });

      setFriendsList(friendsIds);
    } catch (error) {
      navigate("/error");
    }
  };

  const handleFriendBtn = async (userToAddId) => {
    try {
      const response = await getAllFriendsService();
      const userFriends = response.data;

      const friendsIds = userFriends.map((eachFriend) => {
        return eachFriend._id;
      });
      if (response && friendsIds.includes(userToAddId)) {
        await deleteFriendService(userToAddId);
        getFriendsList()
      } else {
        await addFriendService(userToAddId);
        getFriendsList()
      }
    } catch (error) {
      navigate("/error");
    }
  };


  if (isFetching === true) {
    return <h3>Search in process...</h3>;
  }

  return (
    <div className="blackboard-bg">
      <h1 className="h1-search">Search results for "{search}"</h1>
      <div id="search-results">
        {userSearch.map((eachUser) => {
          return (
            <div key={eachUser._id} id="each-user">
              <Link to={`/profile/${eachUser._id}`}>
                <img src={eachUser.img} alt="user" />
              </Link>
              <p>{eachUser.role}</p>
              <p className="username">{eachUser.username}</p>
              <button onClick={() => handleFriendBtn(eachUser._id)} id={ friendList.includes(eachUser._id)? "deletefriend-btn": "addfriend-btn"}>
                {friendList.includes(eachUser._id)
                  ? "Delete friend" 
                  : "Add friend"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SearchResults;
