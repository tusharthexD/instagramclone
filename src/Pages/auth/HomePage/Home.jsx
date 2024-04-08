import React, { useState, useEffect } from "react";
import Post from "./Post";
import axios from "axios";
import Stories from "../../story/openstory/Stories";
import { useParams } from "react-router-dom";


function Home(props) {
  const [data, setData] = useState([]);
  const [stories, setStories] = useState([])
  ;
  const { id } = useParams();

  useEffect(() => {
const fetchData = async ()=>{
  if (id) {
     await axios.get("/api/post/" + id).then((res) => {
        if (res.data) {
          hidePost(true);
          setPost(res.data);
        } else {
          navigate("/");
        }
      });
    }
   await axios.get("/api/posts").then((res) => setData(res.data));
   await axios.get("/api/stories").then((res) => {
    const resultArray = [];

res.data.forEach(item => {
  const { username, profile, id , story} = item;

  // Check if the username exists in the resultArray
  const existingUser = resultArray.find(user => user.username === username);
  if (existingUser) {
    // If the username exists, push the id to its array
    existingUser.id.push(id);
  } else {
    // If the username doesn't exist, create a new object and push it to the resultArray
    resultArray.push({ username, profile, id: [id] });
  }
});

// Now resultArray will contain an array of objects where each object contains username, profile link, and an array of associated data
setStories(resultArray);
   });


}
fetchData()

  }, [id]);


  function closePostTab() {
    hidePost(false);
  }

  function updatePage() {
    console.log("update");
  }


  return (
    <div>
      <div className="Stories d-flex pt-3 mb-4 ms-3 overflow-x-scroll">
       {stories.map((e, index)=>{
        return  <Stories key={index} id={e.id} username={e.username} profile={e.profile} />
       })}
       
      </div>

      {!data ? (
        <div
          class="ms-4 card col-md-8 col-lg-6 pb-1 mb-5 border-bottom"
          aria-hidden="true"
        >
          <svg
            class="bd-placeholder-img card-img-top"
            width="100%"
            height="350"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="100%" height="100%" fill="#868e96"></rect>
          </svg>
          <div class="card-body">
            <p class="card-text placeholder-glow d-flex flex-column">
              <span class="mb-1 placeholder col-3"></span>
              <span class="mb-1 placeholder col-7"></span>
              <span class="mb-1 placeholder col-4"></span>
              <span class="mb-1 placeholder col-12"></span>
            </p>
          </div>
        </div>
      ) : null}
    <div className="d-flex flex-column align-items-center" >
        {data.map((e, index) => (
          <Post
            key={index}
            id={e.id}
            username={e.username}
            profile={e.profile}
            post={e.post}
            likes={e.likes}
            caption={e.caption}
            comment={e.comments}
            updatePage={updatePage}
            openSend={() => console.log("hello")}
          />
        ))}
        </div>
    </div>
  );
}

export default Home;
