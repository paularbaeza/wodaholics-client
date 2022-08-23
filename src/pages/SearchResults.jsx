import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { searchUsersService, addFriendService } from "../services/profile.services";

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

const handleFriend = async (userId) =>{
try{
 await addFriendService(userId)
 console.log("friendaddar")
} catch (error) {
  navigate("/error");
}

}

  if (isFetching === true) {
    return <h3>Search in process...</h3>;
  }

  return (
    <div>
      <h1>Search results</h1>
      {userSearch.map((eachUser) => {
        return (
          <div key={eachUser._id}>
          <Link to= {`/benchmarks/${eachUser._id}`}><img src={eachUser.img} alt="user" width="100px"/></Link>
            <p>{eachUser.role}</p>
            <p>{eachUser.username}</p>
            <button onClick={()=>handleFriend(eachUser._id)}>Add friend</button>
          </div>
        );
      })}
    </div>
  );
}

export default SearchResults;
