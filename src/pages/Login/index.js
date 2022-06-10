import { Link } from "react-router-dom";
import { useState } from "react";
import axiosInstance from "../../services/axios";

function Login() {
  const [formState, setFormState] = useState({
    username: "",
    password: "",
  });

  const handleChange = (event) => {
    setFormState({ ...formState, [event.target.name]: event.target.value });
  };

  const onLoginClick = async () => {
    try {
      const resGetUser = await axiosInstance.get("/users", {
        params: {
          username: formState.username,
          password: formState.password,
        },
      });

      if (!resGetUser.data.length) {
        return alert("Username atau password salah");
      }

      alert("Login Berhasil");
      console.log({ user: resGetUser.data });
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 text-center">
          <h1>Log in now!</h1>
          <p className="lead">
            Log in now and start shopping in the most affordable ecommerce
            platform
          </p>
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-4 offset-4">
          <div className="card">
            <div className="card-body">
              <h5 className="font-weight-bold mb-3">Log in</h5>
              <input
                name="username"
                placeholder="Username"
                type="text"
                className="form-control my-2"
                onChange={handleChange}
              />
              <input
                name="password"
                placeholder="Password"
                type="text"
                className="form-control my-2"
                onChange={handleChange}
              />
              <div className="d-flex flex-row justify-content-between align-items-center">
                <button
                  onClick={onLoginClick}
                  className={`btn btn-primary mt-2 `}
                >
                  Login
                </button>
                <Link to="/register">Or register</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
