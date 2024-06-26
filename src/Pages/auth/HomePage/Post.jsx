import React, { useEffect, useState } from "react";
import axios from "axios";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import SendSharpIcon from "@mui/icons-material/SendSharp";
import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { IconButton, Zoom } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import DoneIcon from "@mui/icons-material/Done";
import { Link } from 'react-router-dom';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';


function Post(props) {
  const [like, setLike] = useState(false);
  const [save, setSave] = useState(false);
  const [hideCaption, showCaption] = useState(true);
  const [likes, addLike] = useState(props.likes.length);
  const caption = props.caption;
  const [comment, setComment] = useState({ addcmt: "" });
  const [dltpost,setdltPost] = useState(false)

  const token = sessionStorage.getItem('token');

  async function submitComment() {
    await axios.post("https://instaclonebe-rfqu.onrender.com/api/addcomment/" + props.id, comment,
  {headers: {
    Authorization: token ? `Bearer ${token}` : '', // Include Authorization header if token exists
  }});
    setComment({addcmt: ''})
    props.comment.length = props.comment.length+1
      
  }

function likeDislike(){
if (like == false) {
  axios.get('https://instaclonebe-rfqu.onrender.com/api/like/'+props.id,
  {headers: {
    Authorization: token ? `Bearer ${token}` : '', // Include Authorization header if token exists
  }}).then(res=>{
    setLike(res.data)
    addLike(p=> p + 1);
  })
}
else{
  axios.get('https://instaclonebe-rfqu.onrender.com/api/dislike/'+props.id,
  {headers: {
    Authorization: token ? `Bearer ${token}` : '', // Include Authorization header if token exists
  }}).then(res=>{
    setLike(res.data)
    addLike(p=> p - 1);
  })
} 
  }

  useEffect(()=>{
    if (props.likes) {
    let result = props.likes.find((e)=> e == sessionStorage.username)
    if (result) {
      setLike(true)
    }
    }
  },[])

  function menu(){
setdltPost(p=> !p)
} 

function deletePost(){
const token = sessionStorage.getItem('token');

  axios.post("https://instaclonebe-rfqu.onrender.com/api/deletepost",{id: post.id},{
    headers: {
    Authorization: token ? `Bearer ${token}` : '', // Include Authorization header if token exists
  },
  })
  .then(e=>{
    if(e.data === 'Deleted Successfully'){
      navigate('/')
    } else {
      navigate("/post/"+post.id)
    }
  })
  .catch(err=>console.log(err))
}
  return (
    <div className="m-sm-4 mx-sm-5 col-12 p-2 col-md-8 col-lg-6 pb-1 mb-5 m-1 border-bottom">
      <div className="w-100 d-flex align-items-center pt-2 pb-2 position-relative">
          <img
            src={props.profile? props.profile : "blankProfile.png"}
            id="navProfile"
            className="rounded-circle border border-light me-2"
            alt=""
          />
        <a className="fw-bolder mb-1" role="button" href={"/"+props.username} >{props.username}</a>
        {sessionStorage.username === props.username ? <MoreVertRoundedIcon className="position-absolute end-0" onClick={menu} /> : null}
      </div>
      <Zoom in={dltpost}>
                <div className="rounded-1 d-flex flex-column position-absolute top-50 start-50 translate-middle bg-light p-4 pt-1" >
                  <CloseRoundedIcon className="position-absolute end-0" onClick={()=>{setdltPost(p=>!p)}} />
                  <small>Options</small>
                  <button onClick={deletePost} className="bg-danger btn mt-3" >Delete Post?</button>
                </div>
              </Zoom>
      <img
        src={props.post}
        style={{ maxWidth: "800px",width: '100%' }}
        className="postImg w-100 rounded border"
        alt=""
      />
      <div className="d-flex justify-content-between m-2 ms-0">
        <div className="d-flex w-25 justify-content-between">
          <IconButton 
            onClick={likeDislike}
          >
            {like ? <FavoriteIcon color="warning" /> : <FavoriteBorderIcon />}
          </IconButton>
          <Link to={'/post/'+props.id} >
          <IconButton >
            <ChatBubbleOutlineRoundedIcon />
          </IconButton>
          </Link>
          
          <IconButton onClick={props.openSend}>
            <SendSharpIcon />
          </IconButton>
        </div>
        <IconButton onClick={() => setSave((p) => !p)}>
          {save ? <BookmarkIcon /> : <BookmarkBorderIcon />}
        </IconButton>
      </div>
      <p className="ms-0 fw-bolder mb-1 ">
       {likes} Likes
      </p>
      <p className="ms-0">
        <span className="fw-bolder me-2">{props.username}</span>
        {caption.length < 60 ? caption : hideCaption ? caption.substring(0, 50) : caption}
        {caption.length < 60 ? null : hideCaption ? (
          <span type="button" onClick={() => showCaption(false)}>...more</span>
        ) : null}
      </p>
      <div>
        <p>
          {props.comment.length <= 0
            ? "0 comments."
            : `View all ${props.comment.length} comments.`}
        </p>
        <div className="w-100 d-flex justify-content-between">
          <input
            className="border-0 col-10"
            placeholder="Add a comment..."
            type="text"
            name="comment"
            id="postCommentBar"
            value={comment.addcmt}
            onChange={(e) =>
              setComment({username:"",addcmt:e.target.value})
            }
          />
          {comment.addcmt.length > 0 ? (
            <IconButton
              onClick={() => {
                props.updatePage();
                submitComment();
              }}
            >
              <DoneIcon />
            </IconButton>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default Post;
