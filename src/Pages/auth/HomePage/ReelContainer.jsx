import React, { useState, useEffect } from 'react';
import Reel from './Reel';
import axios from 'axios';
import Navbar from '../../navbar/Navbar';

function ReelContainer() {
const [videos, setReels] = useState([])

useEffect(()=>{
axios.get("/api/reels").then((res) => setReels(res.data));

},[])

return (
 <div>
 <div  ><Navbar/></div>
  <div className='reel-container'>
    {videos.map((e,index)=>{
       return <Reel key={index} videos={e} />
    })}
  </div>
  </div>
);
};

export default ReelContainer;
