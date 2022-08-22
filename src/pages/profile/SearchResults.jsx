import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { searchUsersService } from "../../services/profile.services";

function SearchResults() {
  const { search } = useParams();

  const [userSearch, setUserSearch] = useState(null);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    filterFriends();
  }, [search]);

  const filterFriends = async () => {
    let response = await searchUsersService();
    //console.log(response.data);
    let users = response.data;
    let searchResults = users.filter((eachUser) => {
      return eachUser.username.includes(search);
    });
    setUserSearch(searchResults);
    setIsFetching(false);
  };

  if (isFetching === true) {
    return <h3>Search in process...</h3>;
  }

  return (
    <div>
      <h1>Search results</h1>
      {userSearch.map((eachUser) => {
        return (
          <div key={eachUser._id}>
            <img src={eachUser.img} alt="user" width="150px" />
            <p>{eachUser.role}</p>
            <p>{eachUser.username}</p>
          </div>
        );
      })}
    </div>
  );
}

export default SearchResults;
