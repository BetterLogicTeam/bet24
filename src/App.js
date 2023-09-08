import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Dashboard from "./Components/Dashboard/Dashboard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./Components/Login/Login";
import Forgot from "./Components/Login/Forgot";
import Football_scorebaord from "./Components/FootballScoreboard/Football_scorebaord";
import Football_Matches from "./Components/Matches/Football_Matches";
import Registration from "./Components/Registration/Registration";
import Tennis_scoreboard from "./Components/TennisScoreboard/Tennis_scoreboard";
import Tennis_Matches from "./Components/Matches/Tennis_Matches";
import Live_Matches from "./Components/Matches/Live_Matches";
import Scoreboard from "./Components/Scoreboard/Scoreboard";
import Home from "./Components/Home/Home";
import Bet_History_Drop from "./Components/Dropdown/BetHistory";
import ProfitLoss from "./Components/Dropdown/ProfitLoss";
import Statement from "./Components/Dropdown/AllStatement";
import Unsellected from "./Components/Dropdown/UnsellectedBet";
import Change_Password from "./Components/Dropdown/ChangePassword";
import Button_value from "./Components/Dropdown/Button_Value";
import Level_Income from "./Components/Income Reports/Level_Income";
import Direct_Income from "./Components/Income Reports/Direct_Income";

function App() {
  return (
    <BrowserRouter>
      {/* <Navbar/> */}
      <div className="App_Main">
        <ToastContainer />
        <Toaster position="top-center" reverseOrder={false} />
        <Routes>
          <Route path="/Dashboard/:name/:type" element={<Dashboard />} />
          <Route path="/Registration" element={<Registration />} />

          <Route path="/Live_Matches" element={<Live_Matches />} />
          <Route
            path="/scoreboard/:CompetitionID/:eventType"
            element={<Scoreboard />}
          />
          <Route path="/Tennis_Matches" element={<Tennis_Matches />} />

          <Route
            path="/Tennis/:CompetitionID/:eventType"
            element={<Tennis_scoreboard />}
          />
          <Route path="/Football_Matches" element={<Football_Matches />} />

          <Route
            path="/Soccer/:CompetitionID/:eventType"
            element={<Football_scorebaord />}
          />

          <Route path="/" element={<Home />} />

          <Route path="/Login" element={<Login />} />
          <Route path="/Forgot" element={<Forgot />} />
          <Route path="/Bet_History_Drop" element={<Bet_History_Drop />} />
          <Route path="/ProfitLoss" element={<ProfitLoss />} />
          <Route path="/Statement" element={<Statement />} />
          <Route path="/Unsellected" element={<Unsellected />} />
          <Route path="/Change_Password" element={<Change_Password />} />
          <Route path="/Button_value" element={<Button_value />} />
          <Route path="/Level_Income" element={<Level_Income />} />
          <Route path="/Direct_Income" element={<Direct_Income />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
