import React, { useState, useEffect } from "react";
import NavBtn from "./NavBtn";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import SlowMotionVideoOutlinedIcon from "@mui/icons-material/SlowMotionVideoOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import InstagramIcon from '@mui/icons-material/Instagram';
import axios from "axios";
import AddPost from '../addpost/AddPost'
import Search from "../explore/Search";
import { Button, Slide , Zoom } from '@mui/material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

const fs = { fontSize : 32 }

function Navbar() {
    const [addPost, setAddPost] = useState(false)
    const [expanded , isExpanded] = useState(false)
    const [name, setName] = useState(false)
    const [more, setMore] = useState(false)
    const [notification, setNotifications] = useState(false)

    useEffect(() => {
      axios
        .get("/api/islogged")
        .then((res) => {
          if (res.data.isLoggedin) {
            setName(res.data);
          } else {
           setName(false) 
          }
        })
        .catch((err) => {
          console.log(err);
        });
    
    }, []);

    function newPost(){
      setAddPost(p=>!p)
    }

    function openSearch(){
     isExpanded(p=>!p)
    }
    function notifications(){
      setNotifications(p => !p)
    }
    function logout(){
     axios.get('/api/logout')
     
    }

if (name) {
  return (
    <div className="position-sticky top-0 start-0 col-12 z-3" >
    <Zoom in={addPost} ><div><AddPost closeAddPostTab={newPost} /></div></Zoom>
     <Slide in={expanded} direction="right" ><div><Search closeSearch={()=>isExpanded(false)}/></div></Slide>

      <div className="navbar right-0 d-none d-md-flex p-2 flex-column flex-nowrap bg-secondary-subtle float-start">
        <div className="w-75 mt-3 d-none d-lg-block ">
          <img src="/instagram-text.png" className="w-75 float-start" alt="" />
        </div>
       <InstagramIcon className="d-lg-none mt-3" sx={fs} />
       <div className="d-flex flex-column w-100 p-lg-3">

       <NavBtn text="Home" icon=<HomeIcon sx={fs} /> link="/"/>
  
  <NavBtn fun={openSearch} text="search" icon=<SearchIcon sx={fs} /> link="#" />
  
  <NavBtn text="Explore" icon=<ExploreOutlinedIcon sx={fs} /> link="/explore"/>
   
  <NavBtn text="reels" icon=<SlowMotionVideoOutlinedIcon sx={fs} /> link="/reels"/>
   
  <NavBtn  text="messages" icon=<EmailOutlinedIcon sx={fs} /> link="/messages"/>
   
  <NavBtn fun={notifications} text="Notifications" icon=<FavoriteBorderOutlinedIcon sx={fs} /> link='#'/>
  
  <NavBtn fun={newPost} text="create" icon=<AddBoxOutlinedIcon sx={fs} /> link="" />
  
  <NavBtn text="profile" icon=<img src={sessionStorage.profile != "null" ? sessionStorage.profile : "/blankProfile.png"} id="navProfile" className="rounded-circle" /> link={"/"+sessionStorage.username} />
  
       </div>

       <Zoom in={notification} className="position-absolute bg-light p-5 rounded-2" >
          <div className="text-center p-5 bg-light positions-absolute top-0" >No Notifications</div>
         </Zoom>
       <div className="p-lg-3 w-100 position-relative">
         <NavBtn fun={()=>setMore(p=>!p)} text="more" icon={<MenuOutlinedIcon fontSize="large" />} link="#"  />
        <Zoom in={more}><div className="position-absolute bottom-100 p-2 d-flex flex-column bg-light rounded" style={{width: '250px'}} >
          <Button href="/Settings" className="text-dark" >Settings</Button>
          <Button onClick={logout} href="/" className=" text-dark" >Logout</Button>
         </div></Zoom>
       </div>
     </div>
     <div className="d-flex position-fixed w-100 justify-content-between bottom-0 py-2 border-top d-md-none px-sm-4 bg-light" >
      <Button href="/" ><HomeIcon className="fs-1 text-dark"/></Button>
      <Button href="/explore"><ExploreOutlinedIcon className="fs-1 text-dark"/></Button>
      <Button href="/reels"><SlowMotionVideoOutlinedIcon className="fs-1 text-dark"/></Button>
      <Button onClick={newPost} ><AddBoxOutlinedIcon className="fs-1 text-dark"/></Button>
      <Button href="/messages" ><EmailOutlinedIcon className="fs-1 text-dark"/></Button>
      <Button href={"/"+sessionStorage.username} ><img src={sessionStorage.profile != "null" ? sessionStorage.profile : "/blankProfile.png"} className="rounded-circle" style={{height: '30px'}} /></Button>

     </div>
     </div>
   ); 
} else {
  return null
}

  }

export default Navbar;
