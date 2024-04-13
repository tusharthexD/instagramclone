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
     try {
      await axios.get("/api/",{
         headers: {
           Authorization: `Bearer ${sessionStorage.token}`,
         },
       })
         .then((res) => {
           console.log(res.data);
           if (res.data.isLoggedin) {
             setName(true);
             sessionStorage.setItem("username", res.data.username);
             sessionStorage.setItem("profile", res.data.profile);
           } else {
            
             sessionStorage.clear();
             navigate("/login");
           }
         })
         .catch((err) => {
           console.log(err);
         });
     } catch (error) {
      navigate("/login");
     }
    };

    fetchData();
  }, [LogOut]);

  function getPost() {}

  function LogOut() {
    sessionStorage.clear()
    navigate("/login");
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
    <div className="position-absolute">Technical error</div>
  }
}

export default HomeMain;
