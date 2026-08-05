import React from "react";

const Login = () => {
  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">

      <div className="card shadow p-4" style={{ width: "400px" }}>

        <div className="text-center mb-4">
          <h2>🎱 CueMaster</h2>
          <p className="text-muted">
            Smart Snooker Club Management
          </p>
        </div>

        <form>

          <div className="mb-3">
            <label className="form-label">
              Username
            </label>

            <input
              type="text"
              className="form-control"
              placeholder="Enter Username"
            />
          </div>

          <div className="mb-4">
            <label className="form-label">
              Password
            </label>

            <input
              type="password"
              className="form-control"
              placeholder="Enter Password"
            />
          </div>

          <button
            className="btn btn-dark w-100"
          >
            Login
          </button>

        </form>

      </div>

    </div>
  );
};

export default Login;