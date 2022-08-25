import {
  getBenchmarksOfUsersService,
} from "../../services/benchmark.services";
import { getUsersInfoService } from "../../services/profile.services";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import BenchmarksList from "../../Components/BenchmarksList";
import FriendsList from "../../Components/FriendsList";
import FavWodsList from "../../Components/FavWodsList";


function UsersProfile() {
  const navigate = useNavigate();

  const { userId } = useParams();

  const [benchmarks, setBenchmarks] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [userInfo, setUserInfo] = useState([]);
  const [isFriendsListShowed, setIsFriendsListShowed] = useState(false);
  const [isBenchmarksListShowed, setIsBenchmarksListShowed] = useState(false);
  const [isFavWodsListShowed, setIsFavWodsListShowed] = useState(false);

  useEffect(() => {
    getUserInfo();
    setIsFriendsListShowed(false)
  }, [userId]);

  //*traer los benchmarks de otros usuarios
  const getUserInfo = async (event) => {
    try {
      const response = await getBenchmarksOfUsersService(userId);
      setBenchmarks(response.data);

      const response2 = await getUsersInfoService(userId);
      setUserInfo(response2.data);
      setIsFetching(false);
      
    } catch (error) {
      navigate("/error");
    }
  };

  console.log(userInfo)


  if (isFetching === true) {
    return <h3>Loading user's benchmarks</h3>;
  }

  const showBenchmarks = () => {
    setIsBenchmarksListShowed(!isBenchmarksListShowed);
    if( isFriendsListShowed ){
      setIsFriendsListShowed(false)
    }
    if(isFavWodsListShowed){
      setIsFavWodsListShowed(false)
    }
  }

  const showFavWods = () => {
    setIsFavWodsListShowed(!isFavWodsListShowed);
    if( isFriendsListShowed ){
      setIsFriendsListShowed(false)
    }
    if(isBenchmarksListShowed){
      setIsBenchmarksListShowed(false)
    }

  }

  const showFriends = () => {
    setIsFriendsListShowed(!isFriendsListShowed);
    if( isBenchmarksListShowed ){
      setIsBenchmarksListShowed(false)
    }
    if(isFavWodsListShowed){
      setIsFavWodsListShowed(false)
    }
  }

  //* traer la info de usuarios

  const { username, role, img, favWods, friends } = userInfo;

  return (
    <div className="blackboard-bg" id="user-profile">
      <img src={img} alt="profile" width="150px" />
      <h1>{username}</h1>
      <p id="role">{role}</p>
      <div id="profile-btns">
      <button onClick={showFriends}>
          {isFriendsListShowed === true ? "x" : "Friends"}
        </button>
       

        <button onClick={showBenchmarks}>
          {isBenchmarksListShowed === true ? "x" : "Benchmarks"}
        </button>
       
        <button onClick={showFavWods}>
          {isFavWodsListShowed === true ? "x" : "Favorites Wods"}
        </button>
       
        </div>
        {isFriendsListShowed === true ? (
          <FriendsList
            toggleFriendsFunction={showFriends}
            friends={friends}
          />
        ) : null}

        {isBenchmarksListShowed === true ? (
          <BenchmarksList
            toggleBenchmarksFunction={showBenchmarks}
            benchmarks = {benchmarks}

          />
        ) : null}
        
        {isFavWodsListShowed === true ? (
          <FavWodsList
            toggleFormFunction={showFavWods} 
            favWods={favWods}

          />
        ) : null}

        
    </div>
  );
}

export default UsersProfile;
