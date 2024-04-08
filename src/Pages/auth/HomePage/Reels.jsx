
import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';

const Reels = ({videos, index}) => {


  return (
    <div className='rounded-1' >
          {/* <video
            src={videos.post}
            autoplay={currentVideoIndex === index}
            muted={index !== currentVideoIndex}
            loop  
           className='h-100'
          /> */}
    </div>
  );
};

export default Reels;
