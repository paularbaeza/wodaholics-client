import { useEffect, useState } from "react";
import { getProfileDataService, changeProfileDataService } from "../../services/profile.services";

import { Link, useNavigate } from "react-router-dom";

function MyProfile() {
  const [profileData, setProfileData] = useState(null);
  const [isFetching, setIsFetching] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    getProfileData();
  }, []);

  const getProfileData = async () => {
    try {
      const response = await getProfileDataService();
      setProfileData(response.data);
      console.log(response.data);
      setIsFetching(false);
    } catch (error) {
      navigate("/error");
    }
  };

  const handleInfoChange = async() => {
    try{
      await changeProfileDataService()
    }catch (error) {
      navigate("/error");
    }
  }

  if (isFetching === true) {
    return <h3>Loading Fav Wods List</h3>;
  }

  const { username, email, img } = profileData;

  return (
    <div>
      <h1>My profile</h1>
      <img src={img} width="150px" alt="profile" />
      <p>{username}</p>
      <p>{email}</p>
      <button onClick={handleInfoChange}>Edit information</button>
    </div>
  );
}

export default MyProfile;
