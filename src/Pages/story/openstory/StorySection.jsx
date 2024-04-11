import React, { useState } from "react";
import OpenStory from "./OpenStory";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";

function StorySection(props) {
  const [number, setNumber] = useState(0);

  function nextStory(e) {
    if (props.data.length - 1 > number) {
      setNumber((p) => p + 1);
      const id = props.data[number];
      window.history.pushState(null, "", "/stories/" + id);
      const navEvent = new PopStateEvent("popstate");
      window.dispatchEvent(navEvent);
    } else {
      props.nextStory(e);
    }
  }
  function prevStory(e) {
    if (number > 0) {
      setNumber((p) => p - 1);
      const id = props.data[number];
      window.history.pushState(null, "", "/stories/" + id);
      const navEvent = new PopStateEvent("popstate");
      window.dispatchEvent(navEvent);
    } else {
      props.prevStory(e);
    }
  }
  function autoStoryUpdate() {
    nextStory();
  }

  return (
    <div className="h-100 px-md-5 position-relative" >
      <div className="h-100 overflow-hidden d-flex justify-content-center">
   {props.active !== props.index ?  
   <div className="position-absolute top-50 start-50 translate-middle z-3 w-100 d-flex flex-column align-items-center justify-content-center">
    <div className="rounded-circle p-2 profile overflow-hidden w-50" style={{aspectRatio : 1}} >
      <img src={props.profile ? props.profile : '/blankProfile.png'} className="w-100 ratio ratio-1x1 rounded-circle" alt="" />
    </div>
     <p className="text-light">{props.username}</p>
   </div> : null}
         {props.active === props.index ?
          <ArrowCircleLeftIcon
            className="opacity-75 z-3 position-absolute top-50 translate-middle-y start-0 fs-1"
            onClick={prevStory}
          /> : null}
      <div
        className="bg-dark overflow-hidden rounded-3 position-relative"
        style={{ aspectRatio: "9/16" }}
      >
        <div
          className="mt-2 w-100 position-absolute d-flex justify-content-between"
          style={{ height: "2px" }}
        >
          {props.data.map((e, index) => {
            return (
              <div
                className="h-100 rounded-1 flex-grow-1 mx-1 storySlides"
                key={index}
                style={
                  number - 1 >= index
                    ? { backgroundColor: "white" }
                    : { backgroundColor: "black" }
                }
              ></div>
            );
          })}
        </div>
        {props.active == props.index
          ? props.data.map((e, index) => {
              return number == index ? (
                <OpenStory
                  id={e}
                  nextstory={nextStory}
                  timer={autoStoryUpdate}
                  playActive={props.active}
                  activeStory={number}
                  key={index}
                />
              ) : null;
            })
          : null}
      </div>
      {props.active === props.index ?
          <ArrowCircleRightIcon
            className="opacity-75 position-absolute top-50 translate-middle-y end-0 fs-1"
            onClick={nextStory}
          /> : null }
    </div>
    </div>
  );
}

export default StorySection;
