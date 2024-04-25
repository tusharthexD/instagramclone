import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IconButton, Slide } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded";
import SendSharpIcon from "@mui/icons-material/SendSharp";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import DoneIcon from "@mui/icons-material/Done";
import axios from "axios";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Navbar from "../../navbar/Navbar";
import { Waypoint } from "react-waypoint";
import ReactPlayer from "react-player";
import HorizontalRuleRoundedIcon from "@mui/icons-material/HorizontalRuleRounded";

const Reel = ({ videos }) => {
  const post = videos;
  const [like, setLike] = useState(false);
  const [save, setSave] = useState(false);
  const [likes, addLike] = useState(post.likes.length);
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [CmtSec, setCmtSec] = useState(null);
  const comments = post.comments;
  const token = sessionStorage.getItem('token');

  const [comment, setComment] = useState({ addcmt: "" });

  const handleEnterViewport = (e) => {
    setIsPlaying(true);
  };

  const handleLeaveViewport = (e) => {
    setIsPlaying(false);
  };

  function handleTap() {
    setIsPlaying((p) => !p);
  }

  useEffect(() => {
    if (likes) {
      let result = post.likes.find((e) => e == sessionStorage.username);
      if (result) {
        setLike(true);
      }
    }
  }, []);

  async function submitComment() {
    await axios.post("https://instaclonebe-rfqu.onrender.com/api/addcommentReel/" + post.id, comment,
    {headers: {
    Authorization: token ? `Bearer ${token}` : '', // Include Authorization header if token exists
  }});
    setComment({ addcmt: "" });
  }

  function likeDislike() {
    if (like == false) {
      axios.get("https://instaclonebe-rfqu.onrender.com/api/likeReel/" + post.id,
      {headers: {
    Authorization: token ? `Bearer ${token}` : '', // Include Authorization header if token exists
  }}).then((res) => {
        setLike(res.data);
        addLike((p) => p + 1);
      });
    } else {
      axios.get("https://instaclonebe-rfqu.onrender.com/api/dislikeReel/" + post.id,
      {headers: {
    Authorization: token ? `Bearer ${token}` : '', // Include Authorization header if token exists
  }}).then((res) => {
        setLike(res.data);
        addLike((p) => p - 1);
      });
    }
  }

  function commnt() {
    setCmtSec((p) => !p);
  }

  return (
    <div className="reel">
      <Waypoint
        onEnter={handleEnterViewport}
        onLeave={handleLeaveViewport}
        bottomOffset="200px"
        topOffset="200px"
      >
        <div className="bg-dark d-flex align-items-center justify-content-center reelDiv">
          <Slide direction="up" in={CmtSec}>
            <div className="col-12 bottom-0 h-75 bg-light position-absolute d-flex flex-column align-items-center z-3 rounded-3">
              <div
                className="col-2 mt-3 bg-dark rounded"
                style={{ height: "5px" }}
                onClick={commnt}
              ></div>
              <p className="fw-bold border-bottom text-center mt-3 w-100 pb-2">
                Comments
              </p>
              <div className="h-100 w-100 overflow-y-scroll ">
                {comments.map((e) => {
                  let cmt = JSON.parse(e);
                  return (
                    <div className="d-flex p-2 border-bottom">
                      <img
                        src={cmt.profile || "/blankProfile.png"}
                        className="rounded-circle me-2"
                        style={{ height: "30px" }}
                        alt=""
                      />
                      <div>
                        <p className="fw-bold">{cmt.username}</p>
                        <p>{cmt.addcmt}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="d-flex col-12 p-2 align-items-center">
                <img
                  src={
                    sessionStorage.profile
                      ? sessionStorage.profile
                      : "/blankProfile.png"
                  }
                  className="rounded-circle me-2"
                  style={{ height: "40px" }}
                  alt=""
                />
                <div className="w-100 d-flex align-items-center rounded-5 border border-3 px-2">
                  <input
                    type="text"
                    value={comment.addcmt}
                    placeholder="Add your comment..."
                    className="w-100 border-0 bg-transparent"
                    onChange={(e) => setComment({ addcmt: e.target.value })}
                    style={{ height: "40px" }}
                  />
                  {comment.addcmt.length > 0 ? (
                    <DoneIcon onClick={submitComment} />
                  ) : null}
                </div>
              </div>
            </div>
          </Slide>
          <ReactPlayer
            url={post.post}
            playing={isPlaying}
            loop
            muted={isMuted}
            className="video"
            playsinline 
            onClick={handleTap}
            onEnded={() => handleVideoChange(index + 1)}
          />
          <div className="z-3 d-flex position-absolute align-items-center me-2 mb-2 text-light end-0 bottom-0 flex-column">
            <IconButton className="text-white pb-1" onClick={likeDislike}>
              {like ? <FavoriteIcon color="warning" /> : <FavoriteBorderIcon />}
            </IconButton>
            <small className="pb-2">{likes}</small>
            <IconButton className="text-white pb-1" onClick={commnt}>
              <ChatBubbleOutlineRoundedIcon />
            </IconButton>
            <small className="pb-2">{post.comments.length}</small>
            <IconButton className="text-white" onClick={() => {}}>
              <SendSharpIcon />
            </IconButton>
            <IconButton
              className="text-white"
              onClick={() => setSave((p) => !p)}
            >
              {save ? <BookmarkIcon /> : <BookmarkBorderIcon />}
            </IconButton>
            <IconButton className="text-white mt-4">
              <MoreHorizIcon />
            </IconButton>
          </div>

          <div className="position-absolute bottom-0 col-10 start-0 z-2 pb-2">
            <div className="d-flex p-2 align-items-center text-white">
              <img
                className="rounded-circle me-2"
                style={{ width: "30px", height: "30px" }}
                src={post.profile != null ? post.profile : "/blankProfile.png"}
                alt=""
              />
              <p className="fw-bolder mb-1">{post.username}</p>
            </div>
            <small className="ps-3 text-light">
              {post.caption ? post.caption : null}
            </small>
          </div>
        </div>
      </Waypoint>
    </div>
  );
};

export default Reel;
