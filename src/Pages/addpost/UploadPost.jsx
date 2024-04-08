import React, { useState } from "react";
import IconButton from '@mui/material/IconButton';
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import MoodRoundedIcon from "@mui/icons-material/MoodRounded";

function UploadPost(props) {
  const [caption, setCaption] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const [loading, setLoading] = useState(false)

  function hello(e) {
    setCaption((prev) => prev + e.native);
  }

  return (
    <div className="z-1 col-11 col-sm-10 col-md-8 col-xl-7 overflow-hidden h-75 position-fixed uploadPost top-50 start-50 translate-middle border border-2 rounded-4 bg-light">
      <div className="d-flex justify-content-between align-items-center border border-0 border-bottom">
        <IconButton onClick={props.goBack}>
          <CloseRoundedIcon />
        </IconButton>
        <p className="mb-0">Crop</p>
        <p
          className="btn mb-0 text-primary"
          onClick={() =>{props.uploadImage(caption); setLoading(true)}}
        >
          Next
        </p>
      </div>
      <div className="cropperDiv bg-dark d-flex d-md-flex">
        <div className="col-md-7 d-flex align-items-center justify-content-center">  
          <img
            className="w-100 object-fit-scale"
            src={props.finalImage}
            alt=""
          />
        </div>
        <div className="bg-light w-100">

          <div className="d-flex m-2 align-items-center">
            <img
              className="rounded-circle me-2"
              style={{ width: "30px", height: "30px" }}
              src={sessionStorage.profile != "null" ? sessionStorage.profile :'/blankProfile.png'}
              alt=""
            />
            <p className="fw-bolder mb-1">{sessionStorage.username}</p>
          </div>
          <div>
            <textarea
              onChange={(e) => setCaption(e.target.value)}
              value={caption}
              maxLength={100}
              className="border-0 w-100 h-25 p-2 bg-transparent"
              name="caption"
              placeholder="Write a caption..."
              id=""
              rows="4"
            ></textarea>
            <IconButton onClick={() => setShowEmoji((prev) => !prev)}>
              <MoodRoundedIcon />
            </IconButton>
            {showEmoji ? <Picker data={data} onEmojiSelect={hello} /> : null}
          </div>
          {loading? <div className="spinner-border m-5" role="status"></div> : null }
      

        </div>
      </div>
    </div>
  );
}

export default UploadPost;
