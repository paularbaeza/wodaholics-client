import "./App.css";

import { Routes, Route } from "react-router-dom";
import NavBar from "./Components/NavBar";
import Signup from "./pages/auth/Signup";
import Login from "./pages/auth/Login";
import Home from "./pages/Home";
import Error from "./pages/Error"
import NotFound from "./pages/NotFound"
import WodsList from "./pages/wods/WodsList";
import WodDetails from "./pages/wods/WodDetails";
import LandingPage from "./pages/LandingPage";
import FavWods from "./pages/FriendsList.jsx/FavWods";
import MyProfile from "./pages/FriendsList.jsx/MyProfile";
import Benchmarks from "./pages/FriendsList.jsx/Benchmarks";
import FriendsList from "./pages/FriendsList.jsx/FriendsList";

function App() {
  return (
    <div className="App">
      <NavBar />

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/wods/:type" element={<WodsList />} />
        <Route path="/:wodId/details" element={<WodDetails />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<MyProfile/>} />
        <Route path="/profile/friends" element={<FriendsList/>} />
        <Route path="/profile/fav-wods" element={<FavWods/>} />
        <Route path="/profile/benchmarks" element={<Benchmarks/>} />




        {/* componentes para error handling */}
        <Route path="/error" element={<Error />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
