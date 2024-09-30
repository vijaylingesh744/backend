import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'
import { BASE_URL } from '../../../utils/ApiRoute';
import FetchData from '../../../fetch-api/Apifetch';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

const EditModal = ({item,modal,setModal}) => {
    const [selectedItems, setselectedItems] = useState(item);
     useEffect(()=>{
      var dataItem = item;
        setselectedItems(dataItem)
     },[item])
    const Icon = { cursor: "pointer", width: '18px', margin: "10px" }
    const handleInputChange =(e)=>{
       const {name,value} = e.target;
       setselectedItems({...selectedItems,[name]:value})
    }
    const resizeImage = (file, maxWidth, maxHeight) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          const reader = new FileReader();
          reader.onload = () => {
            img.src = reader.result;
          };
          reader.onerror = (error) => reject(error);
          img.onload = () => {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            let width = img.width;
            let height = img.height;
    
            if (width > maxWidth) {
              height *= maxWidth / width;
              width = maxWidth;
            }
            if (height > maxHeight) {
              width *= maxHeight / height;
              height = maxHeight;
            }
    
            canvas.width = width;
            canvas.height = height;
            ctx.drawImage(img, 0, 0, width, height);
            
            canvas.toBlob((blob) => {
              resolve(blob);
            }, "image/jpeg");
          };
          reader.readAsDataURL(file);
        });
      };



    const fileUploadAndResize = async (e) => {
        const files = Array.from(e.target.files); // Convert FileList to array
        try {
          const formData = new FormData();
            await Promise.all(files.map(async (selectedFile) => {
              const resizedBlob = await resizeImage(selectedFile, 720, 720);
              formData.append("mediaUrls", resizedBlob, selectedFile.name); // Ensure proper naming
          }));
          const res = await FetchData("uploadimages", "POST", formData, false, true);
          if (res) {
            const media_url = Array.isArray(res.url) ? res.url : [res.url];
            setselectedItems((prevValues) => ({
              ...prevValues,
              media_url: [
                ...(prevValues.media_url || []), 
                ...media_url // Add new 
              ] // Adjust as needed if images
            }));     
          }
        } catch (error){
          console.error("IMAGE UPLOAD ERR", error);
        }
      };
    
    const handleImageRemove = async (image) => {
        try{
          const res = await FetchData("removeimage", "POST", JSON.stringify({image}), false, false);
          if (res) {
            const filteredImages = selectedItems.media_url.filter((item) => item != image);
            setselectedItems({ ...selectedItems, media_url: filteredImages });  
          }
        }catch(error){
            const filteredImages = selectedItems.media_url.filter((item) => item != image);
            setselectedItems({ ...selectedItems, media_url: filteredImages });  
          console.error("REMOVE IMAGE ERR", error);
        }
    };
    

    const UpdatePost = async () => {
        
        try {
            const token = true; // Replace with your actual authentication token
            const formselect = new FormData();
            const dataField = {
                id:item._id,
                posted_by: selectedItems?.posted_by,
                description: selectedItems?.description,
                media_type: selectedItems.media_url.length === 0?"0": "1",
                media_url: selectedItems.media_url?.filter(data => data !=""),
                page_id: selectedItems.page_id,
            }
            if (!dataField.description && selectedItems.media_url.length === 0) {
                toast.error("please enter mandatory fields");
                return
            }
            formselect.append("data", JSON.stringify(dataField));
            const res = await FetchData("update/pagepost", 'POST', formselect, token, true);
            if (res.status) {
                // toast.success("Post Added Successfully");
                Swal.fire({
                    title: 'Posted',
                    html: `<span style="font-size: 16px; font-weight: bold;">Post upload complete.</span>`,
                    icon: 'warning',
                    customClass: {
                        title: 'swal2-title',
                    },
                    iconHtml: `<img src="http://connect-souq.qcodesinfotech.com/images/icons/laugh.png" style="width: 60px; height: 60px; border:none; border-radius: 50%;" />`,
                    timer: 2000, // Close the modal after 2 seconds
                    timerProgressBar: true, // Show a progress bar for the timer
                    showConfirmButton: false, // Hide the confirm button
                    showCancelButton: false // Hide the cancel button
                });
                window.location.reload()
            } else {
                toast.error("Please Check data")
            }
            return null;
        } catch (error) {
            toast.success(error.message);
            return null;
        }
    }


  return (
    <div>
       <Modal show={modal} onHide={setModal} className="modelfilter modal-xl h-auto" size="md1">
                <Modal.Header className='justify-content-end pt-1'>
                <span style={{cursor:'pointer'}} 
                onClick={()=>setModal(false)}
                ><i class="fa fa-times" aria-hidden="true"></i></span>
                </Modal.Header>
        <Modal.Body className="pt-0">
            
        <div className={`d-flex px-3 justify-content-center`}>
               <div><p className={`text-capitalize fontsubtitle font-weight-bold  text-connect mb-0 `} >Edit Post</p>
               </div>
            </div>
               <div id="share-box">
               <div className="p-1">
                   <div className="selected-photos">
                       {selectedItems?.media_url?.filter(item=>item !="").map((selectedFile, index) => (
                           <div 
                           key={index}
                            className="selected-photo-container">
                               <div className='bg-white rounded-circle crossdiv'>
                                   <i className="fa fa-times" aria-hidden="true" 
                                   onClick={() => handleImageRemove(selectedFile)}
                                   ></i>
                               </div>
                               {/* {selectedFile.type == "video" ?(
                               <video
                               src={selectedFile.preview}
                               alt={`Selected Video ${index + 1}`}
                               className="selected-photo"
                               autoPlay
                               muted
                               controls
                               />):( */}
                                <img
                                   src={BASE_URL+selectedFile}
                                   alt={`Selected Photo ${index + 1}`}
                                   className="selected-photo"
                                //    onClick={() => openModal(selectedFile.preview, index + 1)}
                               /> 
                               {/* )} */}
                           </div>
                       ))} 
                   </div>
                   <form>
                       <div>
                           <textarea 
                               type="text"
                               className="form-control"
                               id="recipient-name"
                               name="description"
                               onChange={(e)=>handleInputChange(e)}
                                value={selectedItems?.description}
                               placeholder='Whats on your mind'
                               style={{ height: 124, border: 'none',width: '100%', wrap: 'hard',border:"0.5px solid #ededed" }}
                           />
                       </div>
                       <div className='container-fluid d-flex column-gap-2 py-3'>
                        </div>
                       <div className="d-flex justify-content-between align-items-center">
                           <div className='d-flex justify-content-around'>
                               <div className="input">
                                   <label htmlFor="photoInput">
                                       <img
                                           className="upload"
                                           src="/images/icons/photo.png"
                                           alt="Upload Icon"
                                           style={Icon}
                                       />
                                   </label>
                                   <input
                                       type="file"
                                       id="photoInput"
                                       multiple
                                       style={{ display: 'none' }}
                                       accept="image/*"
                                       onChange={fileUploadAndResize}
                                   />
                               </div>
                               <div className="input">
                                   <label htmlFor="fileInput">
                                       <img
                                           src="/images/icons/laugh.png"
                                           alt="Upload Icon" style={Icon}
                                       />
                                   </label>
                               </div>
                               <div className="input">
                                   <label htmlFor="fileInput">
                                       <img
                                           src="/images/icons/attach.png"
                                           alt="Upload Icon" style={Icon}
                                       />
                                   </label>
                               </div>
                           </div>
                           <button
                               type="button"
                            //    disabled={!textarea && !selectedItems.length || !AddPostbtn}
                               onClick={UpdatePost}
                               className="btn btn-connect text-white py-1 m-3 rounded-01"
                               style={{
                                   backgroundColor: "#4535C1",
                                   border: "cadetblue",
                                   width: 75,
                                   height: 35
                               }}
                           >
                               <strong>Post</strong>
                           </button>
                       </div>
                   </form>
               </div>
           </div> 
         

        
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default EditModal
