import React from 'react'
import { IconButton, Button } from "@mui/material";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

function SelectPost(props) {

  return (
    <div className="z-1 col-10 col-sm-8 col-xl-6 h-75 overflow-hidden position-fixed uploadPost top-50 start-50 translate-middle border border-2 rounded-4 bg-light">
    <div className="position-relative border border-0 border-bottom">
      <IconButton onClick={props.closeTab} >
        <CloseRoundedIcon />
      </IconButton>
      <p className="mb-0 position-absolute start-50 top-50 translate-middle">Create New Post</p>
    </div>
    <div className="d-flex flex-column align-items-center position-absolute top-50 start-50 translate-middle mb-0">
      <AddPhotoAlternateOutlinedIcon
        className="mb-5"
        sx={{ fontSize: 120, stroke: "#ffffff", strokeWidth: 0.8 }}
      />
      <input
        type="file"
        id="post"
        className="d-none"
        accept="image/*,video/*"
        onInput={props.selectImage}
        
      />
      <label className="btn bg-primary text-white mt-0" htmlFor="post">
        Select From Computer
      </label>
    </div>
  </div>

  )
}

export default SelectPost