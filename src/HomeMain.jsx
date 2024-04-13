import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./Pages/navbar/Navbar";
import axios from "axios";
import { Link, useNavigate} from "react-router-dom";
import Home from "./Pages/auth/HomePage/Home";

function HomeMain() {
  const [name, setName] = useState("");
  const navigate = useNavigate();


  useEffect(() => {
    const fetchData = async () => {
      axios.defaults.withCredentials = true;
     await axios.get("https://instagramclone-drab.vercel.app/api/")
        .then((res) => {
          console.log(res.data);
          if (res.data.isLoggedin) {
            setName(res.data.user);
            sessionStorage.setItem("username", res.data.user);
            sessionStorage.setItem("profile", res.data.profile);
          } else {
            sessionStorage.clear();
            navigate("/login");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };

    fetchData();
  }, [LogOut]);

  function getPost() {}

  function LogOut() {
    axios.get("https://instaclonebe-rfqu.onrender.com/api/logout");
    navigate("/");
  }
  if (name) {
  return (
    <div className="d-flex position-relative ">
      <div>
        <Navbar />
      </div>
      <div className="col-12 col-md-8 flex-grow-1">
        <Home getPost={getPost} />
      </div>
    </div>
  );
  } else {
    <div>Technical error</div>
  }
}

export default HomeMain;
