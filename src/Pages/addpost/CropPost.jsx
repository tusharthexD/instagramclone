import React, { useState } from 'react'
import Cropper from "react-easy-crop";
import { IconButton, Button } from "@mui/material";
import CropFreeRoundedIcon from "@mui/icons-material/CropFreeRounded";
import CropPortraitIcon from "@mui/icons-material/CropPortrait";
import Crop169Icon from "@mui/icons-material/Crop169";
import CropDinIcon from "@mui/icons-material/CropDin";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";

function CropPost(props) {

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [ratio, setRatio] = useState(1)
  const [photo, setPhoto] = useState(null)
  const [showRatio, hideRatio] = useState(false)

  
  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setPhoto(croppedAreaPixels);
  };

  return (
    <div className="z-1 col-10 col-sm-8 col-xl-6 h-75 overflow-hidden position-fixed uploadPost top-50 start-50 translate-middle border border-2 rounded-4 bg-light">
         <div className="d-flex justify-content-between align-items-center border border-0 border-bottom">
      <IconButton onClick={props.goBack} >
        <ArrowBackRoundedIcon />
      </IconButton>
      <p className="mb-0">Crop</p>
      <p className="btn mb-0 text-primary" onClick={()=>props.croppedImage(photo)}>
        Next
      </p>
    </div>
        <div className="cropperDiv bg-light position-relative">
          <Cropper
            className="cropper"
            image={props.baseImage}
            crop={crop}
            zoom={zoom}
            aspect={ratio}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
          />
            <CropFreeRoundedIcon className='position-absolute m-2' onClick={()=>hideRatio(p=>!p)} />
          {showRatio ? <div className="position-absolute bg-dark mt-5 d-flex flex-column rounded text-white" >
          <Button onClick={()=>setRatio(1)} name='1/1' endIcon={<CropDinIcon />} color="inherit" >1:1</Button>
          <Button onClick={()=>setRatio(4/5)} name='4/5' endIcon={<CropPortraitIcon />} color="inherit" >4:5</Button>
          <Button onClick={()=>setRatio(16/9)} name='16/9' endIcon={<Crop169Icon />} color="inherit" >16:9</Button>
          </div> : null}
          
        </div>
    </div>
  )
}

export default CropPost