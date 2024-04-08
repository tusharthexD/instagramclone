import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from "./Pages/auth/LoginPage";
import HomeMain from './HomeMain';
import OpenPost from './Pages/openpost/OpenPost';
import OpenReel from './Pages/openpost/OpenReel';
import Message from './Pages/message/Message';
import Explore from './Pages/explore/Explore';
import Profile from './Pages/profile/Profile';
import Register from './Pages/auth/Register';
import EditProfile from './Pages/profile/EditProfile';
import ReelContainer from './Pages/auth/HomePage/ReelContainer';
import ForgetPsw from './Pages/auth/ForgetPsw';
import UploadStory from './Pages/story/UploadStory';
import StoryContainer from './Pages/story/openstory/StoryContainer';


function App() {
 
return <Router>
         <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<Register />} />
            <Route exact path="/" element={<HomeMain/>} />
            <Route path="/:id" element={<Profile />} />
            <Route path="/post/:id" element={<OpenPost />} />
            <Route path="/reel/:id" element={<OpenReel />} />
            <Route path="/reels/" element={<ReelContainer />} />
            <Route path="/open" element={<OpenPost />} />
            <Route path="/messages" element={<Message />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/profile/edit" element={<EditProfile />} />
            <Route path="/reset/password" element={<ForgetPsw />} />
            <Route path='/stories/:id' element={<StoryContainer/>} />
            <Route path='/upload/story' element={<UploadStory/>} />
         </Routes>
       </Router>
}

export default App;
