import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import StorySection from "./StorySection";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';


function StoryContainer() {
  const [stories, setStories] = useState([]);
  const { id } = useParams()
  const storiesRef = useRef([]);
  const containerRef = useRef(null);
  const [activeStoryIndex, setActiveStoryIndex] = useState(0);

  const handleStoryClick = (index) => {
    setActiveStoryIndex(index);

  };

  const scrollToActiveSlideCenter = () => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const activeSlide = container.childNodes[activeStoryIndex];
    if (!activeSlide) return;

    const containerWidth = container.offsetWidth;
    const activeSlideWidth = activeSlide.offsetWidth;
    const scrollLeft = activeSlide.offsetLeft - (containerWidth / 2) + (activeSlideWidth / 2);

    container.scrollTo({
      left: scrollLeft,
      behavior: 'smooth'
    });
  };

  // Scroll to center of active slide when activeStoryIndex changes
  useEffect(() => {
    scrollToActiveSlideCenter();
  }, [activeStoryIndex]);

  useEffect(() => {
    const fetchData = async () => {
      await axios.get("https://instaclonebe-rfqu.onrender.com/api/stories").then((e) => {
        const resultArray = [];

        // Iterate through the dataArray
        e.data.forEach((item) => {
          const { username, profile, id } = item;

          // Check if the username exists in the resultArray
          const existingUser = resultArray.find(
            (user) => user.username === username
          );
          if (existingUser) {
            // If the username exists, push the id to its array
            existingUser.id.push(id);
          } else {
            // If the username doesn't exist, create a new object and push it to the resultArray
            resultArray.push({ username, profile, id: [id] });
          }
        });
        
        const foundArray = resultArray.findIndex(e => { //to find the index and set the index
          return e.id.includes(id);
        });
        setActiveStoryIndex(foundArray)
        setStories(resultArray);
  
      });
    };

    fetchData();
  }, []);

function nextStory(e){
  if(stories.length - 1 > activeStoryIndex){
    if (e) {
      e.stopPropagation(); 
    }
    setActiveStoryIndex(activeStoryIndex + 1)

  }
}
function prevStory(e){
if (activeStoryIndex > 0) {
  if (e) {
    e.stopPropagation(); 
  }
  setActiveStoryIndex(p=> p-1)
}
}

if (stories) {
  return (
   <div className="vh-100">
   <a href="/" className="position-absolute end-0 m-1 me-4" ><CloseRoundedIcon /></a>
    <div ref={containerRef} className="vh-100 vw-100 overflow-y-hidden d-none d-md-flex border-danger border" style={{padding: `0 ${window.innerWidth / 5}px`, gap: '5px'}} >
      {stories.map((e, index) => (
        <div
          onClick={() => handleStoryClick(index)}
          className="p-0"
          key={index}
          style={{
            transform: activeStoryIndex === index ? "scale(1)" : "scale(0.5)",
            margin: activeStoryIndex === index ? '0px 50px' : '100px 1px',
            filter: activeStoryIndex === index ? 'blur(0)' : 'blur(2px)',
            
            transition: "transform 0.3s ease",
          }}
          ref={(el) => (storiesRef.current[index] = el)}
        >
          <StorySection
          active={activeStoryIndex}
            key={index}
            index={index}
            username={e.username}
            profile={e.profile}
            data={e.id}
            nextStory={nextStory}
            prevStory={prevStory}

          />
        </div>
      ))}


</div>
 <div className="d-md-none d-flex vh-100 vw-100 overflow-hidden">
 <div className="vh-100 vw-100 overflow-hidden d-flex border-danger border" >
      {stories.map((e, index) => (
        activeStoryIndex === index ?  <div
          className="p-0 col-12"
          key={index}
          style={{
            transition: "transform 0.3s ease",
          }}
        >
          <StorySection
          active={activeStoryIndex}
            key={index}
            index={index}
            username={e.username}
            profile={e.profile}
            data={e.id}
            nextStory={nextStory}
            prevStory={prevStory}
          />
        </div>: null
      ))}


</div>
 </div>
   </div>
  );
} else {
  return null
}
  
}
export default StoryContainer;