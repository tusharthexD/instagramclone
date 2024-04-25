import React, { useState, useEffect } from 'react';
import Reel from './Reel';
import axios from 'axios';
import Navbar from '../../navbar/Navbar';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { useNavigate } from 'react-router-dom';

function ReelContainer() {
const [videos, setReels] = useState([])
const navigate = useNavigate()

function closeReels(){
  navigate('/')
}

useEffect(()=>{
axios.get("https://instaclonebe-rfqu.onrender.com/api/reels").then((res) => setReels(res.data));

},[])

return (
 <div>
 <div  ><Navbar/></div>
  <div className='reel-container'>
    <CloseRoundedIcon className='z-3 position-absolute top0 end-0 m-2' onClick={closeReels} />
    {videos.map((e,index)=>{
       return <Reel key={index} videos={e} />
    })}
  </div>
  </div>
);
};

export default ReelContainer;
