import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [wrongPsw, setWrongPsw] = useState("");
  const [login, setLogin] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const SubmitLogin = async (event) => {
    event.preventDefault();
    await axios.post("/api/login", login).then((res) => {
      
    if (res.data.token) {
      sessionStorage.setItem("token", res.data.token);
      navigate('/')
    }
      setWrongPsw(res.data.message)
    });
  };

  function HandleEvent(e) {
    const { name, value } = e.target;

    setLogin((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  return (
    <div className="col-10 col-md-5 col-lg-3 m-auto border border-1 mt-5">
      <form method="post" className="m-4" onSubmit={SubmitLogin}>
      <div className="d-flex justify-content-center my-3" ><img src="/instagram-text.png" alt="" style={{width:'200px'}} className="" /></div>
        <div className="form-group">
          <label htmlFor="email">Username</label>
          <input
            name="username"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            placeholder="User Name"
            onChange={HandleEvent}
          />
          <small id="emailHelp" className="form-text text-muted">
         Username that you have used while registration.
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            id="password"
            placeholder="Password"
            onChange={HandleEvent}
          />
         <p className="text-center text-danger mt-5 mb-2" ><small>{wrongPsw}</small></p>
        </div>
      
        <button type="submit" className="btn mt-2 btn-primary col-12">
          Login
        </button>
        <p className="text-center my-3" >--------OR--------</p>
          <a href="/reset/password" ><p className="text-center" ><small>Forgotten your password?</small></p></a>

        <div className="border border-1 mt-3 p-3 text-center">
          <p>
            Don't have an account?{" "}
            <a href="/register" className="fw-bold text-primary">
              Sign up
            </a>
          </p>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
