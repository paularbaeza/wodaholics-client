import Banner from "../assets/images/banner.png";
import { getRandomWodService } from "../services/wod.services";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Home() {
  const [randomWod, setRandomWod] = useState("")

const navigate = useNavigate();

const getAWod = async() =>{
  

  try{

    const response = await getRandomWodService()
    console.log(response.data)
    setRandomWod(response.data)
    const randomWodId= response.data._id
    navigate(`/${randomWodId}/details`)
  }catch (error) {
    navigate("/error");
  }
}


  return (
    <div className="blackboard-bg">
      <img id="banner" src={Banner} alt="banner" />
      <div id="random-wod">
        <p>Don't know what to do today?</p>
        <button onClick={getAWod}>Get a random Wod</button>

        <p>Discover users</p>
      </div>
    </div>
  );
}

export default Home;
