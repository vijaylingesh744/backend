import { useEffect, useRef, useState } from "react";
import ReactCrop, {
  centerCrop,
  convertToPixelCrop,
  makeAspectCrop,
} from "react-image-crop";
const ASPECT_RATIO = 1;
export const ImageCropper = ({ imageUrl, onClose, selectedFiles, indexval, setSelectedFiles ,Demo}) => {
  const imgRef = useRef(null);

  const [imgSrc, setImgSrc] = useState(imageUrl);
  // const [demo, setDemo] = useState(selectedFiles);

  const [crop, setCrop] = useState();

  const Imagecropper = async() =>{
    const pixelCrop = {
      x: crop.x * imgRef.current.naturalWidth / 100,
      y: crop.y * imgRef.current.naturalHeight / 100,
      width: crop.width * imgRef.current.naturalWidth / 100,
      height: crop.height * imgRef.current.naturalHeight / 100,
    };
    // const pixelCrop = convertToPixelCrop(
    //   crop,
    //   imgRef.current.width,
    //   imgRef.current.height
    // );

    // Create a canvas to draw the cropped image
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    // Set canvas dimensions to match the cropped area
    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;

    // Draw the cropped image onto the canvas
    ctx.drawImage(
      imgRef.current,
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height,
      0,
      0,
      pixelCrop.width,
      pixelCrop.height
    );
    // Get the data URL of the cropped image
    const croppedImageUrl = canvas.toDataURL();
    setImgSrc(croppedImageUrl);
    console.log(selectedFiles);
    selectedFiles[indexval - 1].preview = croppedImageUrl
    var cropimage = await fetch(croppedImageUrl).then(response => response.blob())
    selectedFiles[indexval - 1].file = cropimage;
    setSelectedFiles(selectedFiles)
    onClose();  
  }
  const CloseModal =async()=>{
    onClose()
  }

  const onImageLoad = (e) => {
    const { width, height } = e.currentTarget;
    const cropWidthInPercent = (width) * 100;

    const crop = makeAspectCrop(
      {
        unit: "%",
        width: cropWidthInPercent,
      },
      ASPECT_RATIO,
      width,
      height
    );
    const centeredCrop = centerCrop(crop, width, height);
    setCrop(centeredCrop);
  };

  const undoClick = async () => {
    var data = selectedFiles
    data[indexval-1]= Demo[indexval-1]
    setSelectedFiles(data)
    onClose();
  }

  return (
    <>
      <div className="photo-modal">
        <div className="modal-content card">
          {imgSrc && (
            <div className="flex flex-column" style={{display:'flex'}}>
              <ReactCrop
                crop={crop}
                onChange={(pixelCrop, percentCrop) => setCrop(percentCrop)}
                keepSelection
                aspect={0} // Set aspect ratio to 1 for a square crop
              >
                <img
                  ref={imgRef}
                  src={imgSrc}
                  alt="Upload"
                  style={{ maxHeight: "40vh" }}
                  onLoad={onImageLoad}
                />
              </ReactCrop>
              <div className="d-flex justify-content-center column-gap-2">
              <button className="btn btn-warning " onClick={undoClick}>
                  Undo
                </button>
                <button
                  className="btn btn-primary "
                  onClick={Imagecropper}
                >Crop Image
                </button >
                <button className="btn btn-dark  " onClick={CloseModal}>
                  close
                </button>
              </div>
            </div>
          )} 
        </div>
      </div>
    </>
  );
};


export const SingleImageCropper = ({ imageUrl, onClose, setCroppedImage,setViewImage,onSet }) => {
  const imgRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(imageUrl);
  const [crop, setCrop] = useState();
  const [croparea, setCroparea] = useState(1);


  const Imagecropper = async () => {

    const pixelCrop = {
      x: crop.x * imgRef.current.naturalWidth / 100,
      y: crop.y * imgRef.current.naturalHeight / 100,
      width: crop.width * imgRef.current.naturalWidth / 100,
      height: crop.height * imgRef.current.naturalHeight / 100,
    };
    // const pixelCrop = convertToPixelCrop(
    //   crop,
    //   imgRef.current.width,
    //   imgRef.current.height
    // );

    // Create a canvas to draw the cropped image
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    // Set canvas dimensions to match the cropped area
    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;

    // Draw the cropped image onto the canvas
    ctx.drawImage(
      imgRef.current,
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height,
      0,
      0,
      pixelCrop.width,
      pixelCrop.height
    );
    // Create a blob directly from the canvas
    const croppedImageBlob = await new Promise((resolve) => canvas.toBlob(resolve));
    // setCroppedImage({
    //   croppedImageBlob,
    //   img:{ type: "image", url: canvas.toDataURL() }
    // })
    setCroppedImage(croppedImageBlob);
    setViewImage({ type: "image", url: canvas.toDataURL() }); // Update view image with data URL
    // onClose();
    onSet()
  };

  const onImageLoad = (e) => {
    const { width, height } = e.currentTarget;
    const cropWidthInPercent = (width) * 100;

    const crop = makeAspectCrop(
      {
        unit: "%",
        width: cropWidthInPercent,
      },
      croparea,
      width,
      height
    );
    const centeredCrop = centerCrop(crop, width, height);
    setCrop(centeredCrop);
  };

  const CloseModal = () => {
    onClose();
  };

  return (
    <div className="photo-modal" >
    <button 
  className="btn btn-danger float-right" 
  onClick={() => { CloseModal() }}
  style={{
    backgroundColor: '#dc3545', 
    color: '#fff',              
    border: 'none',   
    // padding: '5px 10px',           
    cursor: 'pointer',         
    // fontSize: '1.2rem',   
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', 
  }}
>
  x
</button>
      <div className="row text-center d-flex justify-content-center" >
  <div className="col-12">
      <div className="modal-content card">
        {imgSrc && (
          <div className="flex flex-column1" style={{display:'flex',justifyContent:'center'}}>
            <ReactCrop
            // aspect={croparea}
              crop={crop}
              onChange={(pixelCrop, percentCrop) => setCrop(percentCrop)}
              keepSelection
               aspect={1} // Set aspect ratio to 1 for a square crop
            >
              <img ref={imgRef} src={imgSrc}
                alt="Upload"
                className="d-flex justify-content-center"
                // style={{ maxHeight: "40vh"}}
                onLoad={onImageLoad}
              />
            </ReactCrop>
          </div>
        )}
       
      </div>
      
      </div>
      <div className="d-flex justify-content-center mt-2 w-75">

              <button className="btn btn-secondary w-100" onClick={()=>CloseModal()}>
              Cancel            
            </button>
              <button className="btn btn-primary w-100" onClick={Imagecropper}>
              Apply            
            </button>
            
            </div>
      {/* <div className="col-4">
<     div className="text-center mt-5" style={{height:'400px'}}>
  <div style={{width:'100%'}}><h4>Crop</h4></div>


<hr />
<div>
 <div  className="m-1 p-1" style={{border:'1px solid #9797a5bd',borderRadius:'15PX'}} onClick={()=>{setCroparea(1)}}>Orginal</div>
 <div className="m-1 p-1"  style={{border:'1px solid #9797a5bd',borderRadius:'25PX'}} onClick={()=>{setCroparea(4/4)}}>Square</div>
 <div  className="m-1 p-1" style={{border:'1px solid #9797a5bd',borderRadius:'15PX'}} onClick={()=>{setCroparea(4/1)}}>4:1</div>
 <div  className="m-1 p-1" style={{border:'1px solid #9797a5bd',borderRadius:'15PX'}} onClick={()=>{setCroparea(3/4)}}>3:4</div>
 <div className="m-1 p-1"  style={{border:'1px solid #9797a5bd',borderRadius:'15PX'}} onClick={()=>{setCroparea(16/9)}}>16:9</div>
</div>

</div>
      <div className="d-flex justify-content-center column-gap-2">
              <button className="btn btn-primary w-100" onClick={Imagecropper}>
              Apply            

            </button>
            
            </div>
      </div> */}
      </div>
    </div>
  );
};
export const SingleImageCropper1 = ({ imageUrl, onClose, setCroppedImage,setViewImage,onSet }) => {
  const imgRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(imageUrl);
  const [crop, setCrop] = useState();
  const [croparea, setCroparea] = useState(1);


  const Imagecropper = async () => {

    const pixelCrop = {
      x: crop.x * imgRef.current.naturalWidth / 100,
      y: crop.y * imgRef.current.naturalHeight / 100,
      width: crop.width * imgRef.current.naturalWidth / 100,
      height: crop.height * imgRef.current.naturalHeight / 100,
    };
    // const pixelCrop = convertToPixelCrop(
    //   crop,
    //   imgRef.current.width,
    //   imgRef.current.height
    // );

    // Create a canvas to draw the cropped image
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    // Set canvas dimensions to match the cropped area
    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;

    // Draw the cropped image onto the canvas
    ctx.drawImage(
      imgRef.current,
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height,
      0,
      0,
      pixelCrop.width,
      pixelCrop.height
    );
    // Create a blob directly from the canvas
    const croppedImageBlob = await new Promise((resolve) => canvas.toBlob(resolve));
    // setCroppedImage({
    //   croppedImageBlob,
    //   img:{type: "image", url: canvas.toDataURL() }
    // })
  
    setCroppedImage(croppedImageBlob);
    setViewImage({ type: "image", url: canvas.toDataURL() }); // Update view image with data URL
    // onClose();
    onSet(croppedImageBlob)
  };

  const onImageLoad = (e) => {
    const { width, height } = e.currentTarget;
    const cropWidthInPercent = (width) * 100;

    const crop = makeAspectCrop(
      {
        unit: "%",
        width: cropWidthInPercent,
      },
      croparea,
      width,
      height
    );
    const centeredCrop = centerCrop(crop, width, height);
    setCrop(centeredCrop);
  };

  const CloseModal = () => {
    onClose();
  };

  return (
    <div className="photo-modal" >
    <button 
  className="btn btn-danger float-right" 
  onClick={() => { CloseModal() }}
  style={{
    backgroundColor: '#dc3545', 
    color: '#fff',              
    border: 'none',   
    // padding: '5px 10px',           
    cursor: 'pointer',         
    // fontSize: '1.2rem',   
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', 
  }}
>
  x
</button>
      <div className="row text-center d-flex justify-content-center" >
  <div className="col-12">
      <div className="modal-content card">
        {imgSrc && (
          <div className="flex flex-column1" style={{display:'flex',justifyContent:'center'}}>
            <ReactCrop
            // aspect={croparea}
              crop={crop}
              onChange={(pixelCrop, percentCrop) => setCrop(percentCrop)}
              keepSelection
               aspect={1} // Set aspect ratio to 1 for a square crop
            >
              <img ref={imgRef} src={imgSrc}
                alt="Upload"
                className="d-flex justify-content-center"
                // style={{ maxHeight: "40vh"}}
                onLoad={onImageLoad}
              />
            </ReactCrop>
          </div>
        )}
       
      </div>
      
      </div>
      <div className="d-flex justify-content-center mt-2 w-75">

              <button className="btn btn-secondary w-100" onClick={()=>CloseModal()}>
              Cancel            
            </button>
              <button className="btn btn-primary w-100" onClick={Imagecropper}>
              Apply            
            </button>
            
            </div>
      {/* <div className="col-4">
<     div className="text-center mt-5" style={{height:'400px'}}>
  <div style={{width:'100%'}}><h4>Crop</h4></div>


<hr />
<div>
 <div  className="m-1 p-1" style={{border:'1px solid #9797a5bd',borderRadius:'15PX'}} onClick={()=>{setCroparea(1)}}>Orginal</div>
 <div className="m-1 p-1"  style={{border:'1px solid #9797a5bd',borderRadius:'25PX'}} onClick={()=>{setCroparea(4/4)}}>Square</div>
 <div  className="m-1 p-1" style={{border:'1px solid #9797a5bd',borderRadius:'15PX'}} onClick={()=>{setCroparea(4/1)}}>4:1</div>
 <div  className="m-1 p-1" style={{border:'1px solid #9797a5bd',borderRadius:'15PX'}} onClick={()=>{setCroparea(3/4)}}>3:4</div>
 <div className="m-1 p-1"  style={{border:'1px solid #9797a5bd',borderRadius:'15PX'}} onClick={()=>{setCroparea(16/9)}}>16:9</div>
</div>

</div>
      <div className="d-flex justify-content-center column-gap-2">
              <button className="btn btn-primary w-100" onClick={Imagecropper}>
              Apply            

            </button>
            
            </div>
      </div> */}
      </div>
    </div>
  );
};
export const SingleImageCropper2 = ({ imageUrl, onClose, setCroppedImage,setViewImage,onSet,modalTitle }) => {
  const imgRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(imageUrl);
  const [crop, setCrop] = useState();
  const [croparea, setCroparea] = useState(1);


  const Imagecropper = async () => {

    const pixelCrop = {
      x: crop.x * imgRef.current.naturalWidth / 100,
      y: crop.y * imgRef.current.naturalHeight / 100,
      width: crop.width * imgRef.current.naturalWidth / 100,
      height: crop.height * imgRef.current.naturalHeight / 100,
    };
    // const pixelCrop = convertToPixelCrop(
    //   crop,
    //   imgRef.current.width,
    //   imgRef.current.height
    // );

    // Create a canvas to draw the cropped image
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    // Set canvas dimensions to match the cropped area
    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;

    // Draw the cropped image onto the canvas
    ctx.drawImage(
      imgRef.current,
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height,
      0,
      0,
      pixelCrop.width,
      pixelCrop.height
    );
    // Create a blob directly from the canvas
    const croppedImageBlob = await new Promise((resolve) => canvas.toBlob(resolve));
    // setCroppedImage({
    //   croppedImageBlob,
    //   img:{ type: "image", url: canvas.toDataURL() }
    // })
    setCroppedImage(croppedImageBlob);
    setViewImage({ type: "image", url: canvas.toDataURL() }); // Update view image with data URL
    // onClose();
    onSet()
  };

  const onImageLoad = (e) => {
    const { width, height } = e.currentTarget;
    const cropWidthInPercent = (width) * 100;

    const crop = makeAspectCrop(
      {
        unit: "%",
        width: cropWidthInPercent,
      },
      croparea,
      width,
      height
    );
    const centeredCrop = centerCrop(crop, width, height);
    setCrop(centeredCrop);
  };

  const CloseModal = () => {
    onClose(modalTitle);
  };

  return (
    <div className="photo-modal" >
    <button 
  className="btn btn-danger float-right" 
  onClick={() => { CloseModal() }}
  style={{
    backgroundColor: '#dc3545', 
    color: '#fff',              
    border: 'none',   
    // padding: '5px 10px',           
    cursor: 'pointer',         
    // fontSize: '1.2rem',   
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', 
  }}
>
  x
</button>
      <div className="row text-center d-flex justify-content-center" >
  <div className="col-12">
      <div className="modal-content card">
        {imgSrc && (
          <div className="flex flex-column1" style={{display:'flex',justifyContent:'center'}}>
            <ReactCrop
            // aspect={croparea}
              crop={crop}
              onChange={(pixelCrop, percentCrop) => setCrop(percentCrop)}
              keepSelection
               aspect={0} // Set aspect ratio to 1 for a square crop
            >
              <img ref={imgRef} src={imgSrc}
                alt="Upload"
                className="d-flex justify-content-center"
                // style={{ maxHeight: "40vh"}}
                onLoad={onImageLoad}
              />
            </ReactCrop>
          </div>
        )}
       
      </div>
      
      </div>
      <div className="d-flex justify-content-center mt-2 w-75">

              <button className="btn btn-secondary w-100" onClick={()=>CloseModal()}>
              Cancel            
            </button>
              <button className="btn btn-primary w-100" onClick={Imagecropper}>
              Apply            
            </button>
            
            </div>
      {/* <div className="col-4">
<     div className="text-center mt-5" style={{height:'400px'}}>
  <div style={{width:'100%'}}><h4>Crop</h4></div>


<hr />
<div>
 <div  className="m-1 p-1" style={{border:'1px solid #9797a5bd',borderRadius:'15PX'}} onClick={()=>{setCroparea(1)}}>Orginal</div>
 <div className="m-1 p-1"  style={{border:'1px solid #9797a5bd',borderRadius:'25PX'}} onClick={()=>{setCroparea(4/4)}}>Square</div>
 <div  className="m-1 p-1" style={{border:'1px solid #9797a5bd',borderRadius:'15PX'}} onClick={()=>{setCroparea(4/1)}}>4:1</div>
 <div  className="m-1 p-1" style={{border:'1px solid #9797a5bd',borderRadius:'15PX'}} onClick={()=>{setCroparea(3/4)}}>3:4</div>
 <div className="m-1 p-1"  style={{border:'1px solid #9797a5bd',borderRadius:'15PX'}} onClick={()=>{setCroparea(16/9)}}>16:9</div>
</div>

</div>
      <div className="d-flex justify-content-center column-gap-2">
              <button className="btn btn-primary w-100" onClick={Imagecropper}>
              Apply            

            </button>
            
            </div>
      </div> */}
      </div>
    </div>
  );
};


export default ImageCropper;