import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

import { getWodsListService } from "../../services/wod.services";

function WodsList() {
  const navigate = useNavigate();

  const { type } = useParams();

  const [allWods, setAllWods] = useState([]);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    getWods();
  }, [type]);

  //get list of wods

  const getWods = async () => {
    try {
      const response = await getWodsListService(type);
      setAllWods(response.data);
      setIsFetching(false);
    } catch (error) {
      navigate("/error");
    }
  };

  if (isFetching === true) {
    return <h3>...Loading List of wods...</h3>;
  }

  //asign id depending on category

  const handleId = () => {
    if (type === "girls") {
      return "the-girls";
    } else if (type === "heroes") {
      return "heroes";
    } else if (type === "weights") return "weights";
  };

  return (
    <div id={handleId()}>
      <h1 className="wodType">{type.toUpperCase()}</h1>
      <div id="wods-list">
        {allWods.map((eachWod) => {
          return (
            <Link
              to={`/${eachWod._id}/details`}
              key={eachWod._id}
              id="each-wod-list"
            >
              <p key={eachWod._id} id="wod-list-link">
                {eachWod.name}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default WodsList;
