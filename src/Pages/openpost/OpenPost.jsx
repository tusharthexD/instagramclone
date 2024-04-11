import React, { useState, useEffect } from "react";
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
import Navbar from "../navbar/Navbar";

function OpenPost() {
const { id } = useParams();
const navigate = useNavigate()
const [post, setPost] = useState(null)
const [like, setLike] = useState(false);
const [save, setSave] = useState(false);
const [likes, addLike] = useState(0);

const [comment, setComment] = useState({ addcmt: "" });

useEffect(()=>{
  if (id){
    axios.get('https://instaclonebe-rfqu.onrender.com/api/post/'+id).then((res)=>{
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
        navigate('/')
      }
  }
  )
  }
},[likes,comment])

  


 async function submitComment() {
      await axios.post("https://instaclonebe-rfqu.onrender.com/api/addcomment/" + post.id, comment);
      setComment({addcmt: ''})
    }

function likeDislike(){
if (like == false) {
  axios.get('https://instaclonebe-rfqu.onrender.com/api/like/'+post.id).then(res=>{
    setLike(res.data)
    addLike(p=> p + 1);
  })
}
else{
  axios.get('https://instaclonebe-rfqu.onrender.com/api/dislike/'+post.id).then(res=>{
    setLike(res.data)
    addLike(p=> p - 1);
  })
} 
  }
    
if (post) {
    return (
      <div className='postWindow bg-opacity-75 d-flex' >
       <CloseRoundedIcon className="position-absolute end-0 top-0 m-2" onClick={()=>navigate(-1)} />
       <div><Navbar/></div>
      <div className="d-flex col-12 col-md-8 flex-grow-1 align-items-center justify-content-center mb-5 mb-md-0" >
       <div className='overflow-hidden post bg-light d-flex flex-column flex-md-row col-12 col-md-10 rounded-3 border border-1' >
      <p className="text-center w-100 border-bottom py-2 d-md-none" >Post</p>     <div className="d-flex d-md-none p-2 align-items-center border-bottom">
              <img
                className="rounded-circle me-2"
                style={{ width: "30px", height: "30px" }}
                // src={post.profile != null ? post.profile : '/blankProfile.png'}
                 src="/blankProfile.png"
                alt=""
              />
              <p className="fw-bolder mb-1">{post.username}</p>
            </div>
        <div className='mh-100 col-12 col-md-6 d-flex align-items-center bg-dark' >
        <img className='w-100' src={post.post} alt="" /></div>
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
           <div className="d-flex p-2 border-bottom" > 
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
            
            <IconButton >
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
      </div>
    )
} else {
  return <p>loading</p>
}
}

export default OpenPost