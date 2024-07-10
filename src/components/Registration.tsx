import { Link } from "react-router-dom";
import "../sass/signup.scss";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface User {
  username: string;
  email: string;
  password: string;
}

const Authorization = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const history = useNavigate();

  const label = document.querySelector("label");

  const handleSumbit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.includes("@")) {
      if (label) {
        label.style.visibility = "visible";
      }
      setError("Invalid email, try again");
      return;
    }

    if (password.length <= 6) {
      if (label) {
        label.style.visibility = "visible";
      }
      setError("The password should be at least 6 characters long");
    }

    if (!checkPasswords()) {
      setError("Passwords do not match");
      return;
    }

    const user: User = { username, email, password };

    fetch("http://localhost:8000/users", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(user),
    })
      .then(() => {
        console.log("Success");
        setError("");
        history("/authorization");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const checkPasswords = (): boolean => {
    return password === confirmPassword;
  };

  return (
    <div className="signup-wrapper">
      <form onSubmit={handleSumbit}>
        <div className="signup">
          <h1>Registration</h1>
          <input
            type="text"
            placeholder="Enter Your Username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <br />
          <input
            type="text"
            placeholder="Enter Your Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
          <input
            type="password"
            placeholder="Repeat Your Password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <label className="voidLabel">{error}</label>
          <button type="submit">Sign Up</button>
          <Link to="/authorization">Already have an account?</Link>
        </div>
      </form>
    </div>
  );
};

export default Authorization;
