import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  searchUsersService,
  addFriendService,
} from "../services/profile.services";

function SearchResults() {
  const { search } = useParams();
  const navigate = useNavigate();

  const [userSearch, setUserSearch] = useState(null);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    filterFriends();
  }, [search]);

  const filterFriends = async () => {
    let response = await searchUsersService();
    let users = response.data;
    let searchResults = users.filter((eachUser) => {
      return eachUser.username.includes(search);
    });
    setUserSearch(searchResults);
    setIsFetching(false);
  };

  const handleFriend = async (userId) => {
    try {
      await addFriendService(userId);
      navigate("/profile/friends");
    } catch (error) {
      navigate("/error");
    }
  };

  if (isFetching === true) {
    return <h3>Search in process...</h3>;
  }

  return (
    <div>
      <h1 className="h1-search">Search results for "{search}"</h1>
      <div id="search-results">
        {userSearch.map((eachUser) => {
          return (
            <div key={eachUser._id} id="each-user">
              <Link to={`/benchmarks/${eachUser._id}`}>
                <img src={eachUser.img} alt="user" width="100px" />
              </Link>
              <p>{eachUser.role}</p>
              <p className="username">{eachUser.username}</p>
              <button onClick={() => handleFriend(eachUser._id)}>
                Add friend
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SearchResults;
