import { Link, Navigate } from "react-router-dom";
import { useState } from "react";
import axiosInstance from "../../services/axios";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/slices/authSlice";

function Login() {
  const username = useSelector((state) => state.auth.username);

  const [formState, setFormState] = useState({
    username: "",
    password: "",
  });

  const dispatch = useDispatch();

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

      // user = {id, username, name, email, password}
      const user = resGetUser.data[0];
      // action = { payload : {id, username, name, email, password} }
      // login : action creator
      const action = login(user);

      // dispatch mengirim object "action" ke reducer kemudian disimpan di state
      dispatch(action);
      // simpan data login di localStorage
      const userInfo = { id: user.id, username: user.username };
      const strUserInfo = JSON.stringify(userInfo);
      localStorage.setItem("userInfo", strUserInfo);
    } catch (error) {
      console.log({ error });
    }
  };

  // jika sudah login, diarahkan ke home page
  if (username) return <Navigate to="/" replace />;

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
