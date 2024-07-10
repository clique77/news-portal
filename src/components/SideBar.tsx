import React from "react";
import { Link } from "react-router-dom";
import "../sass/sidebar.scss";

interface SideBarProps {
  showSideBar: boolean;
  username: string | null;
  onLogout: () => void;
}

const SideBar: React.FC<SideBarProps> = ({
  showSideBar,
  username,
  onLogout,
}) => {
  const handleLogout = () => {
    localStorage.removeItem("username");
    onLogout();
  };

  return (
    <div className={showSideBar ? "side-bar active" : "side-bar"}>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/bbc">BBC News</Link>
        </li>
        <li>
          <Link to="/about">About me</Link>
        </li>
        {username ? (
          <>
            <li>
              <Link to="/user">
                <span>
                  Welcome,
                  <br /> {username}!
                </span>
              </Link>
            </li>
            <li>
              <Link to="">
                <button onClick={handleLogout}>Log out</button>
              </Link>
            </li>
          </>
        ) : (
          <li>
            <Link to="/authorization">Log in</Link>
          </li>
        )}
      </ul>
    </div>
  );
};

export default SideBar;
