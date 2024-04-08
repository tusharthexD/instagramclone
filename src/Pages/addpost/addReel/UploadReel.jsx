import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import RangeSlider from "./RangeSlider";
import { IconButton } from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import MoodRoundedIcon from "@mui/icons-material/MoodRounded";
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../../firebase";
import { v1 } from "uuid";


function UploadReel(props) {
  const [video, setVideo] = useState(null);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(1);
  const [videoUrl, setVideoUrl] = useState(null);
  const videoRef = useRef(null);
  const [duration, setDuration] = useState(null);
  const [thumbnails, setThumbnails] = useState([]);

  const [caption, setCaption] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const [loading, setLoading] = useState(true)
  const [Success, setSuccess] = useState(false)

  function hello(e) {
    setCaption((prev) => prev + e.native);
  }

  useEffect(() => {
    const file = props.video
    setVideo(file);
    if (file) {
      const video = document.createElement("video");
      video.preload = "metadata";
      video.onloadedmetadata = async () => {
        setDuration(video.duration.toFixed(2));
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        const thumbnailInterval = video.duration / 6; // Get 10 thumbnails
        const extractedThumbnails = [];

        for (let i = 0; i < 6; i++) {
          video.currentTime = thumbnailInterval * i;
          await new Promise(resolve => video.addEventListener('seeked', resolve));
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          context.drawImage(video, 0, 0, canvas.width, canvas.height);
          extractedThumbnails.push(canvas.toDataURL('image/png'));
        }

        setThumbnails(extractedThumbnails);
        setLoading(false)
      };
      const url = URL.createObjectURL(file);
      video.src = url;
      setVideoUrl(url);
    }
  }, [])


  const handleLoadedMetadata = () => {
    if (videoRef.current && videoRef.current.duration) {
      setEnd(videoRef.current.duration);
    }
  };

  const handleSubmit = async (e) => {
    // e.preventDefault();
    console.log('im calling');
    const formData = new FormData();
    formData.append("video", video);
    formData.append("start", start);
    formData.append("end", end);

    try {
      const response = await axios.post("/api/trim", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        responseType: "blob",
      });
      const id = v1()
       
      const trimmedVideo = new File([response.data], 'trimmed.mp4', { type: 'video/mp4' });
      console.log(trimmedVideo);
      const videoRef = ref(storage,"reel/"+ id + ".mp4");
 await uploadBytes(videoRef, trimmedVideo).then((e) =>
        getDownloadURL(videoRef).then(async (e) => {
          await axios
            .post("/api/addreel", {
              id: id,
              post: e,
              caption: caption,
            })
            .then((res) => {
              if (res.status === 200) console.log('success'); setSuccess(p=>!p);
            });
        }))
   
     
    } catch (error) {
      console.error("Error trimming video:", error);
    }
  };
  function changeDuration(e) {
    setStart(e[0]);
    setEnd(e[1]);
    if (videoRef.current) {
      videoRef.current.currentTime = start; // Play from 30 seconds
      videoRef.current.play(); // Start playback
    }
  }
  const handleTimeUpdate = () => {
    if (videoRef.current.currentTime >= end) {
      videoRef.current.pause();
    }
  };



  return (
    <div>
<div className="z-1 col-11 col-sm-10 col-md-8 col-xl-7 overflow-hidden h-75 position-fixed top-50 start-50 translate-middle border border-2 rounded-4 bg-light">
{loading? 
<div className="position-fixed bg-light w-100 h-100 z-3 d-flex justify-content-center align-items-center" >
<CloseRoundedIcon className="position-absolute end-0 top-0" onClick={props.closeReel} />
 {Success? <CheckRoundedIcon className="position-absolute top-50 start-50 translate-middle" style={{fontSize:'100px'}} />: null}
  {!Success ? <div className="spinner-border" style={{height:"200px",width:"200px"}} role="status"></div> : null}
  </div> : null }

      <div className="d-flex position-relative justify-content-between align-items-center border border-0 border-bottom">
        <IconButton onClick={props.goBack}>
          <CloseRoundedIcon />
        </IconButton>
        <p className="mb-0">Video Trimmer</p>
        <p
          className="btn mb-0 text-primary"
          onClick={() =>{handleSubmit(); setLoading(true)}}
        >
          Next
        </p>
      </div>
      <div className="cropperDiv bg-dark d-flex flex-md-row">
        <div className="col-md-6 col-5 d-flex align-items-center justify-content-center">  
        <video
        className="mh-100 w-100 object-fit-contain"
        id="ReelVideo"
        src={videoUrl}
        ref={videoRef}
        onLoadedMetadata={handleLoadedMetadata}
        onTimeUpdate={handleTimeUpdate}
      ></video>
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
          {duration ? (
        <RangeSlider end={duration} thumbnails={thumbnails} changeDuration={changeDuration} />
      ) : null}
      

        </div>
      </div>
    </div>
    </div>
  );
}

export default UploadReel;
