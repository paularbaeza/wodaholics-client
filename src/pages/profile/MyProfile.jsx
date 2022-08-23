import { useEffect, useState } from "react";
import {
  getProfileDataService,
  changeProfileDataService,
} from "../../services/profile.services";

import { Link, useNavigate } from "react-router-dom";
import { uploadService } from "../../services/upload.services";

function MyProfile() {
  const [profileData, setProfileData] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [isFetching, setIsFetching] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    getProfileData();
  }, []);

  const getProfileData = async () => {
    try {
      const response = await getProfileDataService();
      setProfileData(response.data);
      setIsFetching(false);
    } catch (error) {
      navigate("/error");
    }
  };

  const handleInfoChange = async () => {

    const updatedProfile= {
      img:imageUrl.imageUrl
    }
    try {
      await changeProfileDataService(updatedProfile);

      getProfileData();
    } catch (error) {
      navigate("/error");
    }
  };

  const handleImgUpload = async (event) => {
    const form = new FormData();
    form.append("image", event.target.files[0]);

    try {
      const response = await uploadService(form);
      setImageUrl(response.data);
    } catch {
      navigate("/error");
    }
  };
  if (isFetching === true) {
    return <h3>Loading Fav Wods List</h3>;
  }

  const { username, email, img } = profileData;

  return (
    <div id="profile-info">
      <h1>My profile</h1>
      <img src={img} width="150px" alt="profile" />
      <h3>{username}</h3>
      <p>{email}</p>

      <br></br>

      <div>
        <input type="file" onChange={handleImgUpload} />
        <br />
        <button className="benchmark-form-btn" onClick={ handleInfoChange}>Edit picture</button>
      </div>
    </div>
  );
}

export default MyProfile;
