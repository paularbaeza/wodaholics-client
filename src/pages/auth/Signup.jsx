import { useState } from "react";
import { useNavigate } from "react-router-dom"
import { signupService } from "../../services/auth.services";




function Signup() {

    const navigate = useNavigate()

    const [username, setUsername] = useState ("")
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("")


    const handleUsernameChange = (event) => {
        setUsername(event.target.value)}

    const handleEmailChange = (event) => {
        setEmail(event.target.value)}
    const handlePasswordChange = (event) => 
    {setPassword(event.target.value)};


    const handleSignup = async (event) => {
        event.preventDefault();

        const user = {
          username: username,
          email: email,
          password: password
        }
    

    try {
    await signupService(user)
      navigate("/login")
    }catch (error){

        if (error.response.status === 400) {
          setErrorMessage(error.response.data.errorMessage)
        } else {
          navigate("/error")
        }
    }
}
  return (
    <div id="signup" className="blackboard-bg">

    <h1 className="dirt-font">Sign Up</h1>

    <form onSubmit={handleSignup}>
    <div className="login-input">
      <label>Name:</label>
      <input
        type="text"
        name="username"
        value={username}
        onChange={handleUsernameChange}
      />
      </div>
      <br />
      <div className="login-input">
      <label>Email:</label>
      <input
        type="email"
        name="email"
        value={email}
        onChange={handleEmailChange}
      />
      </div>
      <br />
      <div className="login-input">
      <label>Password:</label>
      <input
        type="password"
        name="password"
        value={password}
        onChange={handlePasswordChange}
      />
      </div>
      <br />
      {errorMessage ? <p>{errorMessage}</p> : null}
      <br />
      <button type="submit">Sign up!</button>
    </form>
    
  </div>
  )
}

export default Signup