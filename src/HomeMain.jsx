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
const token = sessionStorage.getItem('token');

     try {
      await axios.get("https://instaclonebe-rfqu.onrender.com/api/",{
        headers: {
    Authorization: token ? `Bearer ${token}` : '', // Include Authorization header if token exists
  }
      })
         .then((res) => {
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
   return <div className="position-absolute top-50 start-50 translate-middle" >Application is loading Please Wait...
    {!name ?  <div className="h-100 w-100 position-absolute d-flex justify-content-center align-items-center z-3" ><div className="spinner-border" style={{height:"20px",width:"20px"}} role="status"></div></div> : null}
   
   </div>
  }
}

export default HomeMain;
