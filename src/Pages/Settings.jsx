import React from "react";
import Navbar from "./navbar/Navbar";

function Settings() {
  return (

   <div className="d-flex" >
    <div><Navbar/></div>
    <div className="m-3 flex-grow-1" >
      Welcome to Instagram Clone, our beta version app for testing and feedback!
      🚀 Enjoy creating and sharing posts, with upcoming features like messaging
      💬, post/comment deletion 🗑️, editing 📝, and username changes 🔄. Stay
      tuned for exciting updates! Go to
      <a href="/" className="text-primary fw-bold" > HomePage.</a>
    </div>
   </div>
  );
}

export default Settings;
