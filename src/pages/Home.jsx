import Banner from "../assets/images/banner.png";
import { getRandomWodService } from "../services/wod.services";
import { getFiveRandomUsers } from "../services/profile.services";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Home() {
  const [randomWod, setRandomWod] = useState("");
  const [randomUsers, setRandomUsers] = useState([]);
  const [isFetching, setIsFetching] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    getRandomUsers();
  }, []);

  //get random users
  const getRandomUsers = async () => {
    try {
      const response = await getFiveRandomUsers();
      setRandomUsers(response.data);
      setIsFetching(false);
    } catch (error) {
      navigate("/error");
    }
  };

  //get a random wod
  const getAWod = async () => {
    try {
      const response = await getRandomWodService();
      setRandomWod(response.data);
      const randomWodId = response.data._id;
      navigate(`/${randomWodId}/details`);
    } catch (error) {
      navigate("/error");
    }
  };

  if (isFetching === true) {
    return <h3>...Loading Home page...</h3>;
  }

  return (
    <div className="blackboard-bg">
      <img id="banner" src={Banner} alt="banner" />
      <div id="random-wod">
        <p className="dirt-font">Don't know what to do today?</p>
        <button onClick={getAWod}>Get a random Wod</button>
      </div>
      <p className="dirt-font">Discover users</p>
      <div id="random-users">
        {randomUsers.map((eachUser) => {
          return (
            <div id="each-randomuser">
              <Link to={`/profile/${eachUser._id}`}>
                <img src={eachUser.img} alt={eachUser._id} />
              </Link>
              <p>{eachUser.username}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Home;
