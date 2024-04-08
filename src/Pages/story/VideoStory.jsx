import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { v1 } from "uuid";
import { storage } from "../../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import CloseRounded from "@mui/icons-material/CloseRounded";
import ArrowBackRounded from "@mui/icons-material/ArrowBackRounded";
import ArrowForwardRounded from "@mui/icons-material/ArrowForwardRounded";

function VideoStory(props) {
  const [video, setVideo] = useState(null);
  const [show, setShow] = useState(null);
  const [end, setEnd] = useState(15);
  const videoRef = useRef(null);
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    const url = URL.createObjectURL(props.src);
    setVideo(props.src);
    setShow(url);
  }, []);


  async function loadMetaData() {
    if (videoRef.current && videoRef.current.duration) {
        videoRef.current.play()
      if (videoRef.current.duration < 15) {
        setEnd(videoRef.current.duration);
      }
    }
  
  }
  function StopVideo(e) {
    const currentTime = videoRef.current.currentTime;
    if (currentTime > 15) {
      videoRef.current.pause();
    }
  }
 async function uploadStory(){
  setLoading(false)
    const formData = new FormData();
    formData.append("video", video);
    formData.append("start", 0);
    formData.append("end", end);

    const response = await axios.post("/api/trim", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      responseType: "blob",
    });

    const trimmedVideo = new File([response.data], "trimmed.mp4", {
      type: "video/mp4",
    });
    let id = v1()
    const videoRefrence = ref(storage, "story/" + id + ".mp4");
    await uploadBytes(videoRefrence, trimmedVideo).then((e) =>
      getDownloadURL(videoRefrence).then(async (e) => {
        setLoading(true)
        props.upload(e, id)
      })
    );
  }

  return (
    <div className="h-100 w-100 d-flex justify-content-center bg-secondary w-100" >
    <div className="bg-light position-relative overflow-hidden" style={{height: window.innerHeight, width : window.innerHeight * 9/16}} >
    {!loading ?  <div className="h-100 w-100 bg-light position-absolute d-flex justify-content-center align-items-center z-3" ><div className="spinner-border" style={{height:"200px",width:"200px"}} role="status"></div></div> : null}

      <video
        src={show}
        className="object-fit-scale"
        width='100%'
        ref={videoRef}
        onTimeUpdate={StopVideo}
        onLoadedMetadata={loadMetaData}
        loop>
            This Browser doesn't support video tag
        </video>
        <CloseRounded onClick={props.Close} className="position-absolute top-0 start-0 m-2 text-light fs-2"  style={{WebkitFilter : 'drop-shadow(1px 2px 2px #222)' , filter: "drop-shadow(-1px 1px 6px #000)"}} type="button" />
        <ArrowForwardRounded onClick={uploadStory} className="position-absolute top-0 end-0 m-2 text-light fs-2"  style={{WebkitFilter : 'drop-shadow(1px 2px 2px #222)' , filter: "drop-shadow(-1px 1px 6px #000)"}} type="button" />
     </div>  
    </div>
    
  );
}

export default VideoStory;
