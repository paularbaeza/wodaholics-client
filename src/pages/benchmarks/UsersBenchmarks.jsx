import { getBenchmarksOfUsersService } from "../../services/benchmark.services";
import { getUsersInfoService } from "../../services/profile.services";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import UserBenchmarks from "../../Components/UserBenchmarks";

function UsersBenchmarks() {
  const navigate = useNavigate();

  const { userId } = useParams();

  const [benchmarks, setBenchmarks] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [userInfo, setUserInfo] = useState([]);

  useEffect(() => {
    getUserInfo();
  }, []);

  //*traer los benchmarks de otros usuarios
  const getUserInfo = async () => {
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

  if (isFetching === true) {
    return <h3>Loading user's benchmarks</h3>;
  }

  //* traer la info de usuarios

  const { username, role, img, favWods, friends } = userInfo;

  return (
    <div className="blackboard-bg" id="user-profile">
      <img src={img} alt="profile" width="150px" />
      <h1>{username}</h1>
      <p id="role">{role}</p>

      <UserBenchmarks benchmarks={benchmarks} />
    </div>
  );
}

export default UsersBenchmarks;
