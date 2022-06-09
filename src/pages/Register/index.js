import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Register() {
  const [formState, setFormState] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    setFormState({ ...formState, [event.target.name]: event.target.value });
  };

  const onRegisterClick = async () => {
    try {
      await axios.post("http://localhost:2104/users", formState);
      alert("Berhasil Register");
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 text-center">
          <h1>Register now!</h1>
          <p className="lead">
            Register now and start shopping in the most affordable ecommerce
            platform
          </p>
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-4 offset-4">
          <div className="card">
            <div className="card-body">
              <h5 className="font-weight-bold mb-3">Register</h5>
              <input
                name="fullName"
                placeholder="Full Name"
                type="text"
                className="form-control my-2"
                value={formState.fullName}
                onChange={handleChange}
              />
              <input
                name="username"
                placeholder="Username"
                type="text"
                className="form-control my-2"
                value={formState.username}
                onChange={handleChange}
              />
              <input
                name="email"
                placeholder="Email"
                type="text"
                className="form-control my-2"
                value={formState.email}
                onChange={handleChange}
              />
              <input
                name="password"
                placeholder="Password"
                type="password"
                className="form-control my-2"
                value={formState.password}
                onChange={handleChange}
              />
              <div className="d-flex flex-row justify-content-between align-items-center">
                <button
                  onClick={onRegisterClick}
                  className="btn btn-primary mt-2"
                >
                  Register
                </button>
                <Link to="/login">Or login</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
