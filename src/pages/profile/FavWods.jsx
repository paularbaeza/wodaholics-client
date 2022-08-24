import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

//services
import {
  getFavWodsService,
} from "../../services/profile.services";
import {
  deleteFavWodService,
} from "../../services/wod.services";


function FavWods() {
  const [favWodsList, setFavWodsList] = useState("");
  const [isFetching, setIsFetching] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    getFavWods();
  }, []);

  const getFavWods = async () => {
    try {
      const response = await getFavWodsService();
      setFavWodsList(response.data);
      setIsFetching(false);
    } catch (error) {
      navigate("/error");
    }
  };

  const deleteFavWod = async (wodId) => {
    try {
      await deleteFavWodService(wodId);
      getFavWods();
    } catch (error) {
      navigate("/error");
    }
  };

  if (isFetching === true) {
    return <h3>Loading Fav Wods List</h3>;
  }

  return (
    <div className="blackboard-bg">
      <h2 className="dirt-font">My favourite wods</h2>
      <div id="all-favWods">
      {favWodsList.map((eachWod) => {
        return (
          <div id="each-favWod" key={eachWod._id}>
            <Link to={`/${eachWod._id}/details`} id="wods-link">{eachWod.name}</Link>
            <Link to={`/${eachWod._id}/details`} ><button id="see-wod">See wod</button></Link>

            <button onClick={() => deleteFavWod(eachWod._id)} id="delete-favWod">Delete</button>
          </div>
        );
      })}
    </div>
    </div>
  );
}

export default FavWods
