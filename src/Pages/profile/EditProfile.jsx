import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "../navbar/Navbar";
import Cropper from "react-easy-crop";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
// import { base64ToBlob } from "../AddPost/RenderedImg";
import { base64ToBlob } from '../addpost/RenderedImg'
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import imageCompression from "browser-image-compression";
import { storage } from "../../firebase";

function EditProfile() {
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
  const [profile, setProfile] = useState(null)
  const [photo, setPhoto] = useState(null)
  const [loading, setLoading] = useState(false)


  const [user, setUser] = useState(null);
 let navigate = useNavigate()

  useEffect(() => {
    axios.get("/api/profile/edit").then((res) => {
      setUser(res.data);
      setLoading(true)
    });
  }, []);

  function handleEvent(e) {
    let {name, value} = e.target
   setUser(p=>{
   return {...p, [name] : value}
   })
  }
  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setProfile(croppedAreaPixels);
  };

  function selectPhoto(e){
    const enteredImage = e.target.files[0];

    let file = new FileReader();
    file.onload = (e) => {
      setPhoto(e.target.result);
    };
    file.readAsDataURL(enteredImage);
  }

  function croppedImage(e) {
    crop(photo, e.width, e.height, e.x, e.y);
    setPhoto(null);
    function crop(url, width, height, x, y) {
      const inputImage = new Image();

      inputImage.onload = () => {
        const inputWidth = width;
        const inputHeight = height;

        let outputWidth = inputWidth;
        let outputHeight = inputHeight;

        const outputX = -x;
        const outputY = -y;

        const outputImage = document.createElement("canvas");

        outputImage.width = outputWidth;
        outputImage.height = outputHeight;

        const ctx = outputImage.getContext("2d");
        ctx.drawImage(inputImage, outputX, outputY);

        const canvas = outputImage;

        const img = new Image();
        img.src = canvas.toDataURL();
        setUser(p=>{
            return {...p, profile : img.src}
            })
      };

      inputImage.src = url;
    }
  }

async function uploadImage() {
  setLoading(false)
   if (profile) {
     const imageFile = base64ToBlob(user.profile, "image/jpeg");
     const imageRef = ref(storage,"profile/"+user.username+ ".jpg");
 
     const options = {
       maxSizeMB: 0.5,
       maxWidthOrHeight: 200,
       useWebWorker: true,
     };
     
     try {
       const compressedFile = await imageCompression(imageFile, options);
 
       await uploadBytes(imageRef, compressedFile).then((e) =>
         getDownloadURL(imageRef).then(async (e) => {
             user.profile = e
             sessionStorage.profile = e
          axios.post('/api/profile/edit',user).then(res=>{
           if (res.data == "Changes Saved") {
            navigate("/"+user.username)
           }
           else{
            navigate('/profile/edit')
           }
          })
         })
       );
     } catch (error) {
       console.log(error);
     }
   } else {
    axios.post('/api/profile/edit',user).then(res=>{
      if (res.data == "Changes Saved") {
        navigate("/"+user.username)
       }
       else{
        navigate('/profile/edit')
       }
     })
   }
  }
if (loading) {
  
    if (user) {
      return (
        <div className="d-flex">
          <div>
            <Navbar />
          </div>
          <div className="pt-5 flex-grow-1 px-2 px-md-5">
  
          {photo?<div>
          <p className="btn z-3 position-absolute bg-primary" onClick={()=>croppedImage(profile)}>Next</p>
          <Cropper
              className="cropper"
              image={photo}
              crop={crop}
              zoom={zoom}
              aspect={1}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
            /></div>:null}
  
            <h5 className="fw-bolder">Edit Profile</h5>
            <div className="bg-body-secondary rounded-5 p-3 overflow-hidden d-flex justify-content-between align-items-center mt-3">
              <img
                src={user.profile ? user.profile : "/blankProfile.png"}
                className="col-2 rounded-circle"
                alt=""
              />
              <input type="file" name="profile" hidden id="profile" accept="image/*" onChange={selectPhoto} />
              <label
                htmlFor="profile"
                className="bg-primary rounded px-2 py-2 text-white h-25 fw-bold"
              >
                Change Profile
              </label>
            </div>
            <h5 className="mt-3 fw-bold">Name</h5>
            <div className="d-flex flex-column flex-md-row col-12 col-md-8">
              <input
                type="text"
                onChange={handleEvent}
                value={user.fname}
                name="fname"
                id="fname"
                className="col-12 col-sm-4 rounded-3 p-1"
                maxLength={12}
                placeholder="First"
              />
  
              <input
                type="text"
                onChange={handleEvent}
                value={user.lname}
                name="lname"
                id="lname"
                className="col-12 col-sm-4 mt-2 mt-md-0 ms-md-2 rounded-3 p-1"
                maxLength={12}
                placeholder="Last"
              />
            </div>
  
            <h5 className="fw-bolder mt-4">Website</h5>
            <input
              onChange={handleEvent}
              value={user.website}
              name="website"
              id="website"
              className="col-12 col-sm-8 rounded-4 p-2"
              maxLength={50}
              rows="2"
            />
  
            <div>
            <h5 className="fw-bolder mt-3">Bio</h5>
  
            <textarea
              onChange={handleEvent}
              value={user.bio}
              name="bio"
              id="bio"
              className="col-12 col-sm-8 rounded-4 p-2"
              maxLength={50}
              rows="2"
            ></textarea>
            </div>
            <Button onClick={uploadImage} className="bg-primary fw-bold text-light rounded-2" >Save</Button>
          </div>
        </div>
      );
    } else {
      navigate('/')
    }
} else {
    return  <div className="w-100 h-100">
    <div className="h-100 bg-light position-relative d-flex justify-content-center align-items-center" >
    <div className="spinner-border m-5" style={{height : "100px", width : "100px"}} role="status"></div></div>
  </div>
}
}

export default EditProfile;
