import { Link } from "react-router-dom";
import "../sass/NavBar.scss";

interface NavBarProps {
  toggleSideBar: () => void;
}

const NavBar: React.FC<NavBarProps> = ({ toggleSideBar }) => {
  return (
    <div className="nav-bar">
      <div className="name">
        <div className="image-container" onClick={toggleSideBar} />
      </div>
      <div className="other-info">
        <Link to="/">
          <h1 className="main">News</h1>
          <h1 className="portal">Portal</h1>
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
