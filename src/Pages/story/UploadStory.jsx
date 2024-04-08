import React, { useState, useRef } from "react";
import VideoStory from "./VideoStory";
import PhotoStory from "./PhotoStory";
import BrokenImageOutlinedIcon from "@mui/icons-material/BrokenImageOutlined";
import CloseRounded from "@mui/icons-material/CloseRounded";
import axios from "axios";
import Navbar from "../navbar/Navbar";

function UploadStory(props) {
  const [video, setVideo] = useState(null);
  const [image, setImage] = useState(null);
  const [showInput, hideInput] = useState(true);
  const [type, setType] = useState(null);
  const [result, setResult] = useState(null);

  async function handleInput(e) {
    const file = e.target.files[0];
    if (file.type === "video/mp4") {
      setType("video");
      setVideo(file);
    } else {
      const fs = new FileReader();
      setType("photo");
      fs.onload = (e) => {
        setImage(e.target.result);
      };
      fs.readAsDataURL(file);
    }
    hideInput(false);
  }

  function closeStory() {
    setImage(null);
    setVideo(null);
    hideInput(true);
  }
  async function uploadStory(story, id) {
    const response = await axios.post("/api/uploadstory", {
      story: story,
      id: id,
      type: type,
    });
    setResult(response.data);
    closeStory();
  }
  function closeStorySection(params) {
    props.closeStory()
    setResult(null);
  }
  return (
    <div className="d-flex">
      <div className="flex-grow-1 position-relative">
        {showInput ? (
          <div className="col-6 position-absolute top-50 start-50 translate-middle d-flex bg-white border rounded-2 pt-0 flex-column align-items-center">
            <div className="border-bottom w-100 text-center p-2">
              <CloseRounded
                onClick={closeStorySection}
                className="position-absolute end-0 me-2"
              />
              <p>Upload Story</p>
            </div>
            <BrokenImageOutlinedIcon
              className="mt-4"
              style={{ fontSize: "150px", stroke: "white", strokeWidth: "1px" }}
            />
            <label htmlFor="Story" className="btn bg-primary text-light mb-5">
              Select Photo/Video
            </label>
            <input
              type="file"
              id="Story"
              className="d-none"
              accept="image/*,video/*"
              onChange={handleInput}
            />
            <p className="mb-2">{result}</p>
          </div>
        ) : null}

        <div className="">
          {image ? (
            <PhotoStory src={image} Close={closeStory} upload={uploadStory} />
          ) : null}
          {video ? (
            <VideoStory src={video} Close={closeStory} upload={uploadStory} />
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default UploadStory;
