import axios from "axios";
import React, { useEffect, useState, useRef } from "react";

function OpenStory(props) {
  const id = props.id;
  const [story, setStory] = useState(null);
  const videoRef = useRef(null);
  const imageRef = useRef(null);
  const [mute, setMute] = useState(true);


    useEffect(() => {
    const fetchData = async () => {
      const res = axios.get("/api/story/" + id).then((e) => {
        setStory(e.data);
      });
    };

   fetchData();

  }, []);

  useEffect(() => {
    if (story) {
      if(story.type === 'photo') {
        const slideInterval = setInterval(() => {
         props.timer()
        }, 5000); // Change slide every 5 seconds
    
        // Clear interval on component unmount
        return () => clearInterval(slideInterval);
       }
    }
  }, [story]);


  function handleMute() {
    setMute((p) => !p);
  }

  function onTimeUpdate(e){
  if(e.target.currentTime >= e.target.duration){
    props.timer()
  };
  }
 

  if (story) {
    return (
      <div>
        <div className="d-flex ms-3 position-absolute align-items-center mt-3">
          <img
            src={story.profile ? story.profile : "/blankProfile.png"}
            className="profile"
            style={{ height: "40px" }}
            alt=""
          />
          <p className="fw-bold text-white ms-2">{story.username}</p>
        </div>
  
        {story.type === "video" ? (
          <video
           autoPlay
            muted={mute}
            onClick={handleMute}
            onTimeUpdate={onTimeUpdate}
            ref={videoRef}
            src={story.story}
            className="w-100 object-fit-cover"
          ></video>
        ) : (
          <img ref={imageRef} src={story.story} className="w-100" alt="" />
        )}
      </div>
    );
  }
}

export default OpenStory;
