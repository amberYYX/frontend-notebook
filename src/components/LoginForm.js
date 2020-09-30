import React from "react";

const LoginForm = ({
  username,
  password,
  handleUsernameInput,
  handlePasswordInput,
  handleLogin,
}) => {
  return (
    <div>
      <h2>Log in</h2>
      <form onSubmit={handleLogin}>
        <p>
          username:{" "}
          <input
            value={username}
            type="text"
            onChange={handleUsernameInput}
          ></input>
        </p>
        <p>
          password:{" "}
          <input
            value={password}
            type="password"
            onChange={handlePasswordInput}
          ></input>
        </p>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default LoginForm;
