import { useEffect, useState } from "react";
import {
  getFavWodsService,
} from "../../services/profile.services";

import {
  deleteFavWodService,
} from "../../services/wod.services";

import { Link, useNavigate } from "react-router-dom";

function FavWods() {
  const [favWodsList, setFavWodsList] = useState(null);
  const [isFetching, setIsFetching] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    getFavWods();
  }, []);

  const getFavWods = async () => {
    try {
      const response = await getFavWodsService();
      //console.log(response.data);
      setFavWodsList(response.data);
      setIsFetching(false);
    } catch (error) {
      navigate("/error");
    }
  };

  const deleteFavWod = async (wodId) => {
    try {
      await deleteFavWodService(wodId);
      //console.log(response.data)
      getFavWods();
    } catch (error) {
      navigate("/error");
    }
  };

  if (isFetching === true) {
    return <h3>Loading Fav Wods List</h3>;
  }

  return (
    <div>
      <h2>My favWods</h2>
      {favWodsList.map((eachWod) => {
        return (
          <div key={eachWod._id}>
            <Link to={`/${eachWod._id}/details`}>{eachWod.name}</Link>
            <button onClick={() => deleteFavWod(eachWod._id)}>Delete</button>
          </div>
        );
      })}
    </div>
  );
}

export default FavWods
