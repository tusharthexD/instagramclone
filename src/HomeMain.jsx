import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./Pages/navbar/Navbar";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import Home from "./Pages/auth/HomePage/Home";


function HomeMain() {
    const [name, setName] = useState("");
    const navigate = useNavigate();

    axios.defaults.withCredentials = true;

    useEffect(() => {
    //  try {
    //   axios
    //   .get("/api/islogged")
    //   .then((res) => {
    //     console.log(res);
    //     if (res.data.isLoggedin) {
    //       setName(res.data.user);
    //       sessionStorage.setItem('username', res.data.user)
    //       sessionStorage.setItem('profile', res.data.profile)
    //     } else {
    //       sessionStorage.clear()
    //       navigate("/login");
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    //  } catch (error) {
    //   console.log(error);
    //  }
    }, [LogOut]);

    function getPost(){
     
    }
   
    
    function LogOut() {
      axios.get("/api/logout");
      navigate("/");
    }
    // if (name) {
      return (
          <div className="d-flex position-relative " >
          <div>
            <Navbar />
          </div>
          <div className="col-12 col-md-8 flex-grow-1" >
            <Home getPost={getPost} />
          </div>
          </div>
      );
    // } else {
    //   <div>Technical error</div>
    // }
}

export default HomeMain