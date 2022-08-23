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
    try {
      await changeProfileDataService();
      getProfileData();
    } catch (error) {
      navigate("/error");
    }
  };

  const handleImgUpload = async (event) => {

    const form = new FormData()
    form.append("image", event.target.files[0])
    //image tiene que ser el mismo nombre que el uploader.single del BE

    try {
      const response = await uploadService(form);
      setImageUrl(response.data)
    } catch {
      navigate("/error");
    }
  };


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
      <label for="image" class="form-label"></label>
      <input
        class="form-control"
        name="image"
        type="file"
        id="formFile"
      ></input>
      <br></br>
      <button onClick={handleInfoChange}>Edit information</button>

      <div>
        <h5>Añade una imagen:</h5>
        <input type="file" onChange={handleImgUpload} />
      </div>
      <img src={imageUrl.imageUrl} alt="imagen" width="150" />
    </div>
  );
}

export default MyProfile;
