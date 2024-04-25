import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../navbar/Navbar";

function Explore() {
  const [explore, setExplore] = useState([]);
  const [search, setSearch] = useState(null);
  const [result, setResult] = useState([]);

  function findUser(e) {
    const value = e.target.value.toLowerCase()
    setSearch(value);
  }
  useEffect(() => {
    axios.post("https://instaclonebe-rfqu.onrender.com/api/search", { search: search}).then((res) => {
      if (search) {
        setResult(res.data);
      } else {
        setResult([]);
      }
    });
  }, [search]);

  useEffect(() => {
    axios.get("https://instaclonebe-rfqu.onrender.com/api/posts").then((res) => {
      setExplore(res.data);
    });
  }, []);

  return (
    <div className="d-flex" >
      <div><Navbar /></div>
      <div className="col-md-9 flex-grow-1 d-flex flex-column align-items-center">
        <div className="d-md-none mt-3 w-100 p-2">
          <input
            onChange={findUser}
            placeholder="  Search.."
            className="col-12 border-0 bg-body-secondary rounded p-1 px-2"
            maxLength={30}
            type="text"
          />
          {search ? <div className="mt-3 position-absolute bg-light col-7 p-2 rounded" >
            {result.map((e,index) => {
              return (
               <Link key={index} to={"/"+e.username} >
                <div className="d-flex align-items-center">
                  <img
                    src={e.profile ? e.profile : "/blankProfile.png"}
                    className="rounded-circle me-2"
                    style={{ height: "40px" }}
                    alt=""
                  />
                  <p className="fw-bolder">{e.username}</p>
                </div></Link>
              );
            })}
          </div> : null }
        </div>
        <div className="d-flex flex-wrap justify-content-center pt-4 p-2 p-md-5 ">
          {explore.map((e) => {
            return (
              <Link key={e.id} className="col-3" to={"/post/" + e.id}>
                <img
                  style={{ width: "100%", aspectRatio: 1 }}
                  className="border border-2 object-fit-cover"
                  src={e.post}
                  alt=""
                />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Explore;
