import { Link } from "react-router-dom";

function FavWodsList(props) {
  const { favWods } = props;
  return (
    <div className="user-lists">
      {favWods.map((eachFavWod) => {
        return (
          <div className="each-benchmark" key={eachFavWod._id}>
            <Link
              to={`/${eachFavWod._id}/details`}
              className="no-decoration-link"
            >
              <h3 className="dirt-font-links">{eachFavWod.name}</h3>
            </Link>
          </div>
        );
      })}
    </div>
  );
}

export default FavWodsList;
