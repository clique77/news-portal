import React, { useState } from "react";
import NavBar from "./components/NavBar";
import News from "./components/News";
import SideBar from "./components/SideBar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import BBCNewsComponent from "./components/BBCNewsComponent";
import "./App.scss";
import Registration from "./components/Registration";
import Authorization from "./components/Authorization";
import UserInfo from "./components/UserInfo";

const App: React.FC = () => {
  const [showSideBar, setShowSideBar] = useState<boolean>(false);
  const [username, setUsername] = useState<string | null>(() => {
    const storedUsername = localStorage.getItem("username");
    return storedUsername || "";
  });

  const handleLogin = (loggedUsername: string) => {
    setUsername(loggedUsername);
  };

  const toggleSideBar = () => {
    setShowSideBar(!showSideBar);
  };

  const handleLogout = () => {
    localStorage.removeItem("username");
    setUsername(null);
    window.location.reload();
    window.location.href = "/";
  };

  return (
    <div className="App">
      <Router>
        <NavBar toggleSideBar={toggleSideBar} />
        <SideBar
          showSideBar={showSideBar}
          username={username}
          onLogout={handleLogout}
        />
        <Routes>
          <Route path="/" element={<News />} />
          <Route path="/bbc" element={<BBCNewsComponent />} />
          <Route path="/registration" element={<Registration />} />
          <Route
            path="/authorization"
            element={<Authorization onLogin={handleLogin} />}
          />
          <Route path="/user" element={<UserInfo username={username} />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
