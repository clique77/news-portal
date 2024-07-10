import React, { useEffect, useState } from "react";
import "../sass/userinfo.scss";

interface UserInfoProps {
  username: string | null;
}

interface User {
  username: string;
  password: string;
  email: string;
}

const UserInfo: React.FC<UserInfoProps> = ({ username }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isShowPassword, setShowPassword] = useState<boolean>(false);

  const showPassword = () => {
    setShowPassword(!isShowPassword);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/users?username=${username}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data: User[] = await response.json();
        if (data.length > 0) {
          setUser(data[0]);
        } else {
          setUser(null);
        }
      } catch (error: unknown) {
        console.error("Error fetching user:");
      }
    };

    fetchData();
  }, [username]);

  if (!user) {
    return <div className="user-info">Loading...</div>;
  }

  const maskedPassword = `${user.password.slice(
    0,
    3
  )}******${user.password.slice(-5)}`;

  return (
    <div className="user-wrapper">
      {" "}
      <div className="user-info">
        <h2>User Info</h2>
        <p>
          <span>Username:</span> {user.username}
        </p>
        <p>
          <span>Email:</span> {user.email}
        </p>
        <p>
          <span>Password:</span>{" "}
          {isShowPassword ? user.password : maskedPassword}
        </p>
        <div className="button-wrapper">
          <button onClick={showPassword}>Show password</button>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
