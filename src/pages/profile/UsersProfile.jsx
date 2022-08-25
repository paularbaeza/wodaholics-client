import {
  getBenchmarksOfUsersService,
} from "../../services/benchmark.services";
import { getUsersInfoService } from "../../services/profile.services";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import BenchmarksList from "../../Components/BenchmarksList";
import FriendsList from "../../Components/FriendsList";
import FavWodsList from "../../Components/FavWodsList";
import {
  addFriendService,
  getAllFriendsService,
  deleteFriendService,
} from "../../services/profile.services";


function UsersProfile() {
  const navigate = useNavigate();

  const { userId } = useParams();

  const [benchmarks, setBenchmarks] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [userInfo, setUserInfo] = useState([]);
  const [isFriendsListShowed, setIsFriendsListShowed] = useState(false);
  const [isBenchmarksListShowed, setIsBenchmarksListShowed] = useState(false);
  const [isFavWodsListShowed, setIsFavWodsListShowed] = useState(false);
  const [friendList, setFriendsList] = useState([]);


  useEffect(() => {
    getUserInfo();
    setIsFriendsListShowed(false)
    getFriendsList();

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



  const handleFriendBtn = async () => {
    try {
      const response = await getAllFriendsService();
      const userFriends = response.data;
      const userId = userInfo._id
      const friendsIds = userFriends.map((eachFriend) => {
        return eachFriend._id;
      });
      if (response && friendsIds.includes(userId)) {
        await deleteFriendService(userId);
        getFriendsList()
      } else {
        await addFriendService(userId);
        getFriendsList()
      }
    } catch (error) {
      navigate("/error");
    }
  };


  //* traer la info de usuarios

  const { username, role, img, favWods, friends,_id } = userInfo;

  return (
    <div className="blackboard-bg" id="user-profile">
      <img src={img} alt="profile" />
      <h1>{username}</h1>
      <p id="role">{role}</p>
      <button onClick={()=> handleFriendBtn()} id={ friendList.includes(_id)? "deletefriend-btn": "addfriend-btn"}>
                {friendList.includes(_id)
                  ? "Delete friend" 
                  : "Add friend"}
              </button>
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
