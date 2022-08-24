import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AddBenchmarkForm from "../../Components/AddBenchmarkForm";
import LineChart from "../../Components/LineChart";
import Ranking from "../../Components/Ranking";
import MyBestTime from "../../Components/MyBestTime";
import { useContext } from "react";

import { AuthContext } from "../../context/auth.context";

//all services
import {
  getHighscoresService,
  getUserBenchmarksOfAWod,
} from "../../services/benchmark.services";
import {
  addFavWodService,
  deleteFavWodService,
  getWodDetailsService,
} from "../../services/wod.services";
import { getFavWodsService } from "../../services/profile.services";
import {
  createCommentService,
  getCommentsOfWodService,
  deleteOwnCommentService,
} from "../../services/comment.services";

function WodDetails() {
  const navigate = useNavigate();

  const { wodId } = useParams();

  const [allWodDetails, setAllWodDetails] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [isFormShowed, setIsFormShowed] = useState(false);

  const [topScores, setTopScores] = useState([]);
  const [isFav, setIsFav] = useState(false);

  const [userBenchmarks, setUserBenchmarks] = useState([]);
  const [dateOfBenchmark, setDateOfBenchmark] = useState([]);
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const { user } = useContext(AuthContext);

  useEffect(() => {
    getWodDetails();
    //getMyBenchmarks();
    getTopScores();
  }, []);

  //* traer los detalles del wod

  const getWodDetails = async () => {
    try {
      const response = await getWodDetailsService(wodId);
      const response2 = await getCommentsOfWodService(wodId);
      const response3 = await getUserBenchmarksOfAWod(wodId);

      setAllWodDetails(response.data);
      const benchmarksArr = response3.data;
      const onlyScores = benchmarksArr.map((eachBenchmark) => {
        return eachBenchmark.score;
      });

      setAllComments(response2.data);

      setUserBenchmarks(onlyScores);

      const onlyDates = benchmarksArr.map((eachBenchmark) => {
        return eachBenchmark.date;
      });
      setDateOfBenchmark(onlyDates);
      setIsFetching(false);
    } catch (error) {
      navigate("/error");
    }
  };

  //*traer las mejores puntuaciones del wod
  const getTopScores = async () => {
    try {
      const response = await getHighscoresService(wodId);
      setTopScores(response.data);
    } catch (error) {
      navigate("/error");
    }
  };

  //* traer mis benchmarks de este wod para la gráfica
  // const getMyBenchmarks = async () => {
  //   try {
  //     const response = await getUserBenchmarksOfAWod(wodId);
  //     const benchmarksArr = response.data;
  //     const onlyScores = benchmarksArr.map((eachBenchmark) => {
  //       return eachBenchmark.score;
  //     });
  //     setUserBenchmarks(onlyScores);

  //     const onlyDates = benchmarksArr.map((eachBenchmark) => {
  //       return eachBenchmark.date;
  //     });
  //     setDateOfBenchmark(onlyDates);

  //   } catch (error) {
  //     navigate("/error");
  //   }
  // };

  if (isFetching === true) {
    return <h3>Loading wod details</h3>;
  }

  const toggleFormShowing = () => {
    setIsFormShowed(!isFormShowed);
  };

  const { name, category, description, exercises, equipment, _id } =
    allWodDetails;

  //* añadir/eliminar de favoritos
  const addFav = async () => {
    try {
      if (isFav === true) {
        await deleteFavWodService(_id);
      } else if (isFav === false) {
        await addFavWodService(_id);
      }
    } catch (error) {
      navigate("/error");
    }
  };

  const handleFavButton = async () => {
    try {
      const response = await getFavWodsService();
      const favWods = response.data;
      let isWodFav = favWods.filter((favWods) => favWods._id === _id);
      if (isWodFav.length === 1) {
        setIsFav(true);
      } else {
        setIsFav(false);
      }
    } catch (error) {
      navigate("/error");
    }
  };

  handleFavButton();

  //*funciones para los comentarios

  const handleComment = async (event) => {
    event.preventDefault();

    const newComment = {
      title: title,
      comment: comment,
    };
    try {
      await createCommentService(wodId, newComment);
      setComment("");
      setTitle("");
      getWodDetails();
    } catch (error) {
      if (error.response.status === 400) {
        console.log(error.response.data.errorMessage);
        setErrorMessage(error.response.data.errorMessage);
      } else {
        navigate("/error");
      }
    }
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const deleteOwnComment = async (commentId) => {
    await deleteOwnCommentService(commentId);
    getWodDetails();
  };

  return (
    <div>
      <div className="blackboard-bg">
        <div id="wodname-favbtn">
          <h1 className="wodType">{name} </h1>
          <button
            onClick={addFav}
            style={{ fontSize: 35, background: "none", border: "none" }}
          >
            {isFav === true ? "❤️" : "🤍"}
          </button>
        </div>
        <h4>{description}</h4>
        {exercises.map((eachExercise) => {
          return (
            <p key={eachExercise._id} id="exercises">
              - {eachExercise}
            </p>
          );
        })}
        <Ranking topScores={topScores} />

        {userBenchmarks.length !== 0 &&
          dateOfBenchmark.length !== 0 &&
          category !== "for time" && (
            <div id="line-chart">
              <LineChart
                userBenchmarks={userBenchmarks}
                dateOfBenchmark={dateOfBenchmark}
              />
            </div>
          )}
        {userBenchmarks.length >= 1 &&
          dateOfBenchmark.length >= 1 &&
          category === "for time" && <MyBestTime />}

        <br />
        <button className="benchmark-btn" onClick={toggleFormShowing}>
          {isFormShowed === true ? "x" : "Add benchmark"}
        </button>
        {isFormShowed === true ? (
          <AddBenchmarkForm
            toggleFormFunction={toggleFormShowing}
            category={category}
            getTopScores={getTopScores}
          />
        ) : null}

        <div id="comments">
          {allComments.map((eachComment) => {
            return (
              <div id="each-comment">
                <div id="username-img">
                  <img src={eachComment.user[0].img} alt="profile" />
                  <p className="bold">{eachComment.user[0].username}</p>
                </div>
                <p className="bold">{eachComment.title}</p>
                <p>{eachComment.comment}</p>
                {eachComment.user[0]._id === user._id && (
                  <button
                    onClick={() => deleteOwnComment(eachComment._id)}
                    id="delete-comment-btn"
                  >
                    Delete
                  </button>
                )}
              </div>
            );
          })}
        </div>

        <form onSubmit={handleComment} id="comment-form">
          <div id="comments">
            <input
              type="text"
              name="score"
              value={title}
              onChange={handleTitleChange}
              placeholder="  Title"
            />
          </div>
          <div id="comment">
            <input
              type="text"
              name="comment"
              value={comment}
              placeholder="  Comment"
              onChange={handleCommentChange}
            />
          </div>
          <div id="error-message">
            {errorMessage ? <p>{errorMessage}</p> : null}
          </div>
          <button className="benchmark-form-btn">Add Comment</button>
        </form>
      </div>
    </div>
  );
}

export default WodDetails;
