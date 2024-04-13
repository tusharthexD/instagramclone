import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button, Zoom } from "@mui/material";
import Navbar from "../navbar/Navbar";
import GridOnRoundedIcon from "@mui/icons-material/GridOnRounded";
import SlowMotionVideoRoundedIcon from "@mui/icons-material/SlowMotionVideoRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import Login from "../auth/Login";
import UploadStory from "../story/UploadStory";
import AddCircleIcon from '@mui/icons-material/AddCircle';

function Profile() {

  const { id } = useParams();
  const navigate = useNavigate()
  const [result, setResult] = useState();
  const [posts, setPosts] = useState(false);
  const [follow, setFollow] = useState(false);
  const [loggedIn, isLoggedIn] = useState(false);
  const [loginScreen, HideLogin] = useState(false);
  const [myProfile, setMyProfile] = useState(false);
  const [story, showStory] = useState(false)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    axios.post("https://instaclonebe-rfqu.onrender.com/api/profile", { id: id }).then((res) => {
    if (!res.data) navigate('/')
    else{
      setResult(res.data.user);
      setFollow(res.data.isFollowed);
      isLoggedIn(res.data.isLoggedin);
      setMyProfile(res.data.myProfile);}
    });
    axios.post("https://instaclonebe-rfqu.onrender.com/api/profile/posts", { id: id }).then((res) => {
      if (res.data.length !== 0) {
        setPosts(res.data);
      }
    });
  }, [follow, loginScreen]);

  function followUser() {
    if (loggedIn) {
      if (!follow) {
        //if user follow
        axios
          .post("https://instaclonebe-rfqu.onrender.com/api/follow", { user: id })
          .then((res) => setFollow(true));
        
      } else {
        //if user unfollow
        axios
          .post("https://instaclonebe-rfqu.onrender.com/api/unfollow", { user: id })
          .then((res) => setFollow(false));
        
      }
    } else {
      HideLogin(true);
    }
  }

  function loginCb() {
    HideLogin(false);
  }

  function uploadStory(){
    showStory(p=> !p)
  }
  if (result) {
    return (
      <div className="d-flex">
      
        {loggedIn ? <div className="position-sticky" ><Navbar /></div> : null}
  
        {loginScreen ? <Login callBack={loginCb} /> : null}
  
        <div className="col-12 col-md-8 flex-grow-1 d-flex flex-column align-items-center">
          <div className="profileSec col-12 d-flex align-items-center pb-5 mt-4">
            <div className="ms-4 col-2">
            <div className="position-relative z-n1" >
              <img
                className="col-12 rounded-circle"
                src={result.profile? result.profile : '/blankProfile.png'}
                alt=""
              />
              {myProfile ? <AddCircleIcon onClick={uploadStory} className=" position-absolute end-0 bottom-0 text-primary" /> : null}
              </div>
            </div>
            <div className="ms-5 col-7">
              <div className="d-flex flex-column align-items-md-center flex-md-row mb-3 text-start">
                <p className="fw-bold float-start">{result.username}</p>
                <div className="ms-md-5 mt-2 mt-md-0 d-flex justify-content-between col-9 col-sm-6">
                  {myProfile ? (
                    <Button href="/profile/edit" style={{ textTransform: "none" }} className="py-1 rounded-3 text-white bg-secondary">
                      Edit Profile
                    </Button>
                  ) : (
                    <Button style={{ textTransform: "none" }} onClick={followUser} className="py-1 rounded-3 text-white bg-primary">{follow ? "Following" : "Follow"}
                    </Button>
                  )}
  
                  <Button style={{ textTransform: "none" }} className="py-1 rounded-3 text-white bg-secondary">
                    Message
                  </Button>
                </div>
              </div>
             
              {/* <Zoom in={uploadStory} > */}
                {story ? <div className="position-absolute top-50 start-50 translate-middle bg light w-100" ><UploadStory closeStory={uploadStory} /></div> : null}
              {/* </Zoom> */}
  
              <div className="d-none d-md-flex mb-2">
                <p className="me-3">{posts.length} post</p>
                <p className="me-3">
                  {result.followers ? result.followers.length : 0} followers
                </p>
                <p className="me-3">
                  {result.following ? result.following.length : 0} following
                </p>
              </div>
              <div>
                <p className="fw-bold">{result.fname + " " + result.lname}</p>
                <a href={"https://"+result.website} className="text-primary-emphasis" target="_blank" >{result.website}</a>
                <p>{result.bio}</p>
              </div>
            </div>
          </div>
          <div className="col-12 border-top py-3 d-md-none d-flex px-3 justify-content-between">
                <p >{posts.length} post</p>
                <p >
                     {result.followers ? result.followers.length : 0} followers</p>
                <p >
                         {result.following ? result.following.length : 0} following</p>
          </div>
          <div className="col-12 border-top d-flex justify-content-center">
            <div className="col-12 d-flex col-md-5 justify-content-between">
              <Button className="text-dark">
                <GridOnRoundedIcon className="d-md-none fs-2" />
                <GridOnRoundedIcon className="d-none me-1 d-md-block fs-6" />
                <p className="d-none d-md-block" >POSTS</p>
              </Button>
              <Button className="text-dark">
                <SlowMotionVideoRoundedIcon className="d-md-none fs-2" />
                <SlowMotionVideoRoundedIcon className="d-none me-1 d-md-block fs-6" />
                <p className="d-none d-md-block" >SAVED</p>
              </Button>
              <Button className="text-dark">
                <PersonRoundedIcon className="d-md-none fs-2"/>
                <PersonRoundedIcon className="d-none me-1 d-md-block fs-6"/>
                <p className="d-none d-md-block" >TAGGED</p>
              </Button>
            </div>
          </div>
          <div className="d-flex flex-wrap justify-content-center pt-4 p-2 p-md-5 ">
            {posts? (
              posts.map((e) => {
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
              })
            ) : (
              <p>No post</p>
            )}    
          </div>
        </div>
      </div>
    );
    
  } else {
   return  <div className="w-100 h-100">
   {loading? <div className="h-100 bg-light position-relative d-flex justify-content-center align-items-center" >
   <div className="spinner-border m-5" style={{height : "100px", width : "100px"}} role="status"></div></div> : null }
 </div>
  }
  
}

export default Profile;
