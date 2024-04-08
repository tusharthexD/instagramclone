import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useParams} from "react-router-dom";
import { IconButton } from '@mui/material';
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded";
import SendSharpIcon from "@mui/icons-material/SendSharp";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import DoneIcon from "@mui/icons-material/Done";
import axios from "axios";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Navbar from "../navbar/Navbar";

function OpenReel() {
const { id } = useParams();
const navigate = useNavigate()
const [post, setPost] = useState({
  "id": "",
  "username": "",
  "post": "",
  "likes": [],
  "caption": "",
  "comments": [],
  "time": ""
})
const [like, setLike] = useState(false);
const [save, setSave] = useState(false);
const [likes, addLike] = useState(0);
const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);

  const handleTap = () => {
    // Toggle mute status when tapped
    setIsMuted(p=> !p);
    videoRef.current.muted = !isMuted;
  };

const [comment, setComment] = useState({ addcmt: "" });
console.log(id);

useEffect(()=>{
  if (id){
    axios.get('/api/reel/'+id).then(res=>{
      if (res.data) {
        setPost(res.data);
        addLike(res.data.likes.length)
        if (res.data.likes) {
          let result = res.data.likes.find((e)=> e == sessionStorage.username)
          if (result) {
            setLike(true)
          }
          }
      }
      else{
        // navigate('/')
      }
    })
  }
},[likes])

  


 async function submitComment() {
      await axios.post("/api/addcommentReel/" + post.id, comment);
      setComment({addcmt: ''})
    }

function likeDislike(){
if (like == false) {
  axios.get('/api/likeReel/'+post.id).then(res=>{
    setLike(res.data)
    addLike(p=> p + 1);
  })
}
else{
  axios.get('/api/dislikeReel/'+post.id).then(res=>{
    setLike(res.data)
    addLike(p=> p - 1);
  })
} 
  }
    
  return (<div className='postWindow bg-opacity-75 d-flex' >
     <CloseRoundedIcon className="position-absolute end-0 top-0 m-2" onClick={()=>navigate(-1)} />
     <div><Navbar/></div>
    <div className="d-flex col-12 col-md-8 flex-grow-1 align-items-center justify-content-center mb-5 mb-md-0" >
     <div className='overflow-hidden bg-light d-flex flex-column flex-md-row col-12 col-md-10 rounded-3 border border-1' >
    <p className="text-center w-100 border-bottom py-2 d-md-none" >Post</p>
     <div className="d-flex d-md-none p-2 align-items-center border-bottom">
            <img
              className="rounded-circle me-2"
              style={{ width: "30px", height: "30px" }}
              src={post.profile != null ? post.profile : '/blankProfile.png'}
              alt=""
            />
            <p className="fw-bolder mb-1">{post.username}</p>
          </div>
      <div className='col-12 justify-content-center col-md-6 d-flex align-items-center bg-dark' >
      <video className='reel object-fit-contain' src={post.post} alt=""  ref={videoRef} onClick={handleTap} autoPlay muted loop />

      </div>
      <div className="w-100 d-flex flex-column">
          <div className="d-none d-md-flex p-3 align-items-center border-bottom">
            <img
              className="rounded-circle me-2"
              style={{ width: "30px", height: "30px" }}
              src={post.profile != null ? post.profile : '/blankProfile.png'}
              alt=""
            />
            <p className="fw-bolder mb-1">{post.username}</p>
          </div>
       <div className="overflow-y-scroll d-md-block d-none h-50 border-bottom p-2" >
         {post.caption?
         <div className="d-flex p-2 border-bottom text-break" > 
            <img
              className="rounded-circle me-2"
              style={{ width: "40px", height: "40px" }}
              src={post.profile != null ? post.profile : '/blankProfile.png'}
              alt=""/>
          
          <div className="me-3" ><p><span className="fw-bolder me-1">{post.username}</span>
            {post.caption}</p>
            </div>
          </div>
         : null}

          {post.comments.map((e,index)=>{
            let cmt = JSON.parse(e)
         return <div key={index} className="d-flex m-2" > 
            <img
              className="rounded-circle me-2"
              style={{ width: "30px", height: "30px" }}
              src={cmt.profile? cmt.profile : "/blankProfile.png"}
              alt="" />
          
          <div className="me-3" ><p><span className="fw-bolder me-1">{cmt.username}</span>
            {cmt.addcmt}</p>
            </div>
            </div> 
         })}
        </div> 
        <div className="w-100 d-flex justify-content-between p-2" > 
        <div className="d-flex w-25 justify-content-between">
          <IconButton 
            onClick={likeDislike}
          >
            {like ? <FavoriteIcon color="warning" /> : <FavoriteBorderIcon />}
          </IconButton>
          <IconButton >
            <ChatBubbleOutlineRoundedIcon />
          </IconButton>
          
          <IconButton onClick={()=>console.log(sessionStorage)}>
            <SendSharpIcon />
          </IconButton>
        </div>
        <IconButton onClick={() => setSave((p) => !p)}>
          {save ? <BookmarkIcon /> : <BookmarkBorderIcon />}
        </IconButton>
        </div>
        <p className="ms-2 fw-bolder mb-1">
        {likes} Likes
      </p>
      <div className="w-100 p-3 d-flex justify-content-between">
          <input
            className="border-0 col-10"
            placeholder="Add a comment..."
            type="text"
            name="comment"
            id="postCommentBar"
            value={comment.addcmt}
            onChange={(e) =>
              setComment({username: sessionStorage.username, addcmt: e.target.value })
            }
          />
          {comment.addcmt.length > 0 ? (
            <IconButton
              onClick={() => {
                submitComment();
                post.refresh
              }}
            >
              <DoneIcon />
            </IconButton>
          ) : null}
        </div>
      </div>
     </div>
     </div>
    </div>)
}

export default OpenReel