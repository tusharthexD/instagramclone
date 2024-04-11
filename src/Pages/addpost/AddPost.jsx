import React, { useState } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../firebase";
import imageCompression from "browser-image-compression";
import { base64ToBlob } from "./RenderedImg";
import SelectPost from "./SelectPost";
import CropPost from "./CropPost";
import UploadPost from "./UploadPost";
import { v1 } from "uuid";
import axios from "axios";
import UploadReel from "./addReel/UploadReel";


function AddPost(props) {
  const [baseImage, setBaseImage] = useState(null);
  const [finalRenderedImg, setFinalRenderedImg] = useState(null);
  const [reelVideo, setReelVideo] = useState(null)

  function selectImage(e) {
    const enteredFile = e.target.files[0];
if (enteredFile.type === "video/mp4") {
  setReelVideo(enteredFile);

} else {
    let file = new FileReader();
    file.onload = (e) => {
      setBaseImage(e.target.result);
    };
    file.readAsDataURL(enteredFile);
    e.target.value = "";
  }
  }

  function croppedImage(e) {
    crop(baseImage, e.width, e.height, e.x, e.y);
    setBaseImage(null);
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
        setFinalRenderedImg(img.src);
      };

      inputImage.src = url;
    }
  }
  async function uploadImage(caption) {
    const imageFile = base64ToBlob(finalRenderedImg, "image/jpeg");
    let id = v1();
    const imageRef = ref(storage,"post/"+ id + ".jpg");

    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };
    try {
      const compressedFile = await imageCompression(imageFile, options);

      await uploadBytes(imageRef, compressedFile).then((e) =>
        getDownloadURL(imageRef).then(async (e) => {
          await axios
            .post("/api/addpost", {
              id: id,
              username: "tushar",
              post: e,
              caption: caption,
            })
            .then((res) => {
              if (res.status === 200) props.closeAddPostTab();
            });
        })
      );
    } catch (error) {
      console.log(error);
    }
  }
  function goBack() {
    setBaseImage(null);
    setFinalRenderedImg(null);
    setReelVideo(null)
  }

  return (
    <div >
      <SelectPost closeTab={props.closeAddPostTab} selectImage={selectImage} />
     
     {reelVideo? <UploadReel video={reelVideo} goBack={goBack}  closeReel={()=>{setReelVideo(null); props.closeAddPostTab()}} />: null}

      {baseImage ? (
        <CropPost
          baseImage={baseImage}
          goBack={goBack}
          croppedImage={croppedImage}
        />
      ) : null}
      {finalRenderedImg ? (
        <UploadPost
          uploadImage={uploadImage}
          finalImage={finalRenderedImg}
          goBack={goBack}
        />
      ) : null}
    
    </div>
  );
}

export default AddPost;
