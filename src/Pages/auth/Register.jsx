import DoneIcon from "@mui/icons-material/Done";
import { IconButton } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'

function Register() {

  const navigate = useNavigate()
  const [wrongPsw, setWrongPsw] = useState("");
  const [login, setLogin] = useState({
    username: "",
    password: "",
  });
  const [OTP, setOtp] = useState(false);

  const SubmitLogin = async (event) => {
    event.preventDefault()
    let psw1 = event.target.password1.value;
    let psw = event.target.password.value;
    if (psw1 === psw) {
      await axios
        .post("https://instaclonebe-rfqu.onrender.com/api/register", login)
        .then((res) => {
          if (res.data == 'USER CREATED') {
            navigate('/')
          } else {
            setWrongPsw(res.data)
          }
        });
    } else {
      setWrongPsw("Password should be same");
      setLogin((prev) => {
        return { ...prev, password: "" };
      });
    }
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

  async function EmailRegistration(e) {
    const response = await axios.post("https://instaclonebe-rfqu.onrender.com/api/emailRegistration", login);
    console.log(response.data);
    if (response.data === true) {
      console.log(response.data);
      setOtp(true);
    }
  }

  return (
    <div className="col-md-5 m-auto mt-5">
      <p className="text-center">{wrongPsw}</p>
      <form onSubmit={SubmitLogin} className="m-4">
        <div className="form-group ">
          <label htmlFor="username">Username</label>
          <input
            name="username"
            className="form-control"
            id="username"
            aria-describedby="emailHelp"
            placeholder="Username"
            onChange={HandleEvent}
          />
          <label htmlFor="email">Email address</label>
          <div
            className="w-100 d-flex align-items-center"
          >
            <input
              type="email"
              name="email"
              className="form-control"
              id="email"
              disabled={OTP}
              aria-describedby="emailHelp"
              placeholder="Email"
              onChange={HandleEvent}
            />
            {!OTP ? (
              <IconButton
                onClick={EmailRegistration}
                className="bg-primary rounded-3 ms-3 text-white h-100"
              >
                <DoneIcon className="fs-2" />
              </IconButton>
            ) : null}
          </div>
          {OTP ?
            <div>
              <small>Enter four digit code we sent to {login.email}</small>
              <input
                type="text"
                name="OTP"
                className="form-control"
                id="OTP"
                maxLength={4}
                placeholder="Enter 4 digit code"
                onChange={HandleEvent}
              />
            </div>
            : null}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password1"
            className="form-control"
            placeholder="Password"
          />
          <label htmlFor="password">Re Type Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            id="password"
            placeholder="Re-enter Password"
            value={login.password}
            onChange={HandleEvent}
          />
        </div>
        <button
          type="submit"
          disabled={!OTP}
          className="btn btn-primary float-right mt-2"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Register;
