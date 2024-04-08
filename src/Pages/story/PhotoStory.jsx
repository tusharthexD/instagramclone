import React, { useState, useRef, useEffect} from 'react'
import AvatarEditor from 'react-avatar-editor'
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import { storage } from '../../firebase';
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { base64ToBlob } from '../addpost/RenderedImg';
import { v1 } from 'uuid';
import imageCompression from 'browser-image-compression';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';


function PhotoStory(props) {
const [scale, setScale] = useState(1)
const [rotate, setRotate] = useState(0)
const [width, setWidth] = useState(window.innerHeight *(9/16))
const [height, setHeight] = useState(window.innerHeight)
const editorRef = useRef(null);
const [loading, setLoading] = useState(true)


useEffect(()=>{
    function handleResize() {
      setHeight(window.innerHeight);
      setWidth(window.innerHeight * (9/16))
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
    
}, [])


const handleDownloadImage = async () => {
    setLoading(false)
  const editor = editorRef.current;

//   Get the canvas element from the editor component
  const canvas = editor.getImage();

  // Get the data URL of the canvas content
  const dataURL = canvas.toDataURL('image/jpeg');

  const imageFile = base64ToBlob(dataURL, "image/jpeg");

  let id = v1();
    const imageRef = ref(storage,"story/"+ id + ".jpg");

    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };
    try {
      const compressedFile = await imageCompression(imageFile, options);

      await uploadBytes(imageRef, compressedFile).then((e) =>
        getDownloadURL(imageRef).then(async (e) => {
            setLoading(true)
         props.upload(e, id)
        })
      );
    } catch (error) {
      console.log(error);
    }
};
    const image = props.src

    function scalePhoto(e){
        // e.preventDefault();
        const delta = e.deltaY; 
        const scaleFactor = delta > 0 ? -0.005 : 0.005; // Decreased scale factor for slower scaling
    const newScale = scale + scaleFactor;

    // Ensure scale remains within the range of 0.1 to 1.9
    if (newScale >= 0.1 && newScale <= 1.9) {
      setScale(newScale);
    };
    }
function rotation(e){
    setRotate(Number(e.target.value))
}

  return (
    <div className='h-100 d-flex justify-content-center bg-secondary w-100' >
    <div className='bg-light position-relative' >
    {!loading ?  <div className="h-100 w-100 bg-light position-absolute d-flex justify-content-center align-items-center z-3" ><div className="spinner-border" style={{height:"200px",width:"200px"}} role="status"></div></div> : null}

    <AvatarEditor
        image={image}
        border={0}
        height={height}
        width={width}
        color={[255, 255, 100, 0.6]} // RGBA
        scale={scale}
        rotate={rotate}
        ref={editorRef}
        onWheel={scalePhoto}
        onTouchMove={scalePhoto}
        backgroundColor="#FFFF00"
        className='border'
      />
      <div className='position-absolute top-50 start-0 translate-middle-x ms-4'>
      <input  type="range" max={360} style={{transform: 'rotate(270deg)'}} onChange={rotation} min={0} onDoubleClick={(e)=> {e.target.value = 0; setRotate(0)}} />
      </div>
           <CloseRoundedIcon style={{WebkitFilter : 'drop-shadow(1px 2px 2px #222)' , filter: "drop-shadow(-1px 1px 6px #000)"}} type="button"  className='position-absolute start-0 m-2 text-light fs-1' onClick={()=>{props.Close()}}/>
           <ArrowForwardRoundedIcon style={{WebkitFilter : 'drop-shadow(1px 2px 2px #222)' , filter: "drop-shadow(-1px 1px 6px #000)"}} type="button"  className='position-absolute end-0 m-2 text-light fs-1' onClick={handleDownloadImage}/>
    </div>

    </div>
  )
}

export default PhotoStory