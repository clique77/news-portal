import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../sass/signup.scss";

interface User {
  username: string;
  password: string;
  name: string;
  email: string;
}

interface AuthorizationProps {
  onLogin: (username: string, password: string, email: string) => void;
}

const Authorization: React.FC<AuthorizationProps> = ({ onLogin }) => {
  const history = useNavigate();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleSumbit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError("");

    try {
      const response = await fetch("http://localhost:8000/users");
      const data: User[] = await response.json();

      const matcheduser = data.find(
        (user) => user.username === username && user.password === password
      );

      if (matcheduser) {
        onLogin(username, password, matcheduser.email);
        localStorage.setItem("username", username);
        history("/");
        alert("Successfully logged in!");
      } else {
        const label = document.querySelector("label");
        if (label) {
          label.style.visibility = "visible";
        }
        setError("Invalid username or password");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="signup-wrapper">
      <form onSubmit={handleSumbit}>
        <div className="signup">
          <h1>Welcome Back!</h1>
          <input
            type="text"
            placeholder="Enter Your Username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <br />
          <input
            type="password"
            placeholder="Enter Your Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <label className="voidLabel">{error}</label>
          <button type="submit">Sign Up</button>
          <Link to="/registration">Don't have an account?</Link>
        </div>
      </form>
    </div>
  );
};

export default Authorization;
