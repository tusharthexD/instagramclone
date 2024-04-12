import React, {useState} from 'react'
import axios from 'axios';

function Login(props) {
    const [login , setLogin] = useState({})
    const [loginmsg, setLoginMg] =useState(null)
  axios.defaults.withCredentials = true;


    const SubmitLogin = async (event) => {
        event.preventDefault();
        await axios.post("https://instaclonebe-rfqu.onrender.com/api/login", login).then((res) => {
           setLoginMg(res.data);
           props.callBack()
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
    <form method="post" className="position-absolute mt-5 start-50 translate-middle-x z-3 bg-light p-3 rounded" onSubmit={SubmitLogin}>
    {loginmsg ? <p>{loginmsg}</p> : null}
    <div className="form-group">
      <label htmlFor="email">Email address</label>
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
    </div>
    <button type="submit" className="btn mt-2 btn-primary float-right">
      Login
    </button>
  </form>
  )
}

export default Login