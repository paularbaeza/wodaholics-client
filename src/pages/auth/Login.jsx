import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { loginService } from "../../services/auth.services";

import { AuthContext } from "../../context/auth.context";

function Login() {

  const { authenticateUser } = useContext(AuthContext)

  const navigate = useNavigate()

  const [access, setAccess] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("")

  const handleAccessChange = (event) => {
    setAccess(event.target.value)}

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)}

  const handleLogin = async (event) => {
    event.preventDefault();
    const user = {
      access: access,
      password: password
    }

    try {
      
      const response = await loginService(user)

      const authToken = response.data.authToken

      localStorage.setItem("authToken", authToken)

      authenticateUser()
      navigate ("/home")

    } catch (error) {
      if (error.response.status === 400) {
        setErrorMessage(error.response.data.errorMessage)
      } else {
        navigate("/error")
      }
    }

  };

  return (
    <div>

      <h1>Log In</h1>

      <form onSubmit={handleLogin}>
        <label>Username or email:</label>
        <input
          type="access"
          name="access"
          value={access}
          onChange={handleAccessChange}
        />
        <br />
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
        />
        <br />
        {errorMessage ? <p>{errorMessage}</p> : null}
        <br />
        <button type="submit">Log in!</button>
      </form>
      
    </div>
  );
}

export default Login;
