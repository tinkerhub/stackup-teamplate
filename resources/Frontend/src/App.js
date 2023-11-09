import "./App.css";
import { Route, Routes } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import Homepage from "./pages/Homepage";
import Mainpage from "./pages/Mainpage";
import TestPage from "./components/others/testpage";
import ProfilePage from "./components/others/profile";
import LeaderboardPage from "./components/others/leaderboard";
import UploadQuestionPage from "./components/others/upload";

function App() {
  return (
    <ChakraProvider>
      <span className="App">
        <Routes>
          <Route path="/" element={<Homepage />} exact />
          <Route path="/main" element={<Mainpage />} />
          <Route path="/testpage" element={<TestPage />} exact />
          <Route path="/profile" element={<ProfilePage />} exact />
          <Route path="/leaderboard" element={<LeaderboardPage />} exact />
          <Route path="/uploadQuestion" element={<UploadQuestionPage />} exact />
        </Routes>
      </span>
    </ChakraProvider>
  );
}

export default App;
