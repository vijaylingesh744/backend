import React, { useEffect, useState } from 'react';
import FetchData from '../../../fetch-api/Apifetch';
import { toast } from 'react-toastify';
import { handleImageError, validateForm } from '../../../utils/Function';
import PhotoModal from './ImageModel';
import { useTranslation } from 'react-i18next';
import imageCompression from 'browser-image-compression'; // Import image compression library
import { Modal } from "react-bootstrap";
import { CheckGuest } from "../../../utils/Function"
import ReactPlaceholderTyping from 'react-placeholder-typing'
import { BASE_URL } from '../../../utils/ApiRoute';
import Swal from 'sweetalert2';
import { useLocation, useParams } from 'react-router-dom';

const AddPost = ({ PageID }) => {
    const { t } = useTranslation();
    const [AddPostbtn, setAddPostbtn] = useState(true);
    const [textarea, setTextArea] = useState("");
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [demo, setDemo] = useState([]);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('LOGINDATA'))?.user);
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedPhotoUrl, setSelectedPhotoUrl] = useState('');
    const [ModalView, setModalView] = useState(false)
    const [stage, setStage] = useState(1);
    const { id } = useParams()
    const [Tags, setTags] = useState()
    const [SelectedTags, setSelectedTags] = useState([])
    const placeholders = [
        'Looking to buy?',
        'Looking to sell?',
        'Looking to hire?',
        'Looking for a job?',
        'Providing training courses?',
        'Looking for training courses?',
        'A mentor?',
        'Looking for mentoring?',
        'Looking to represent a product or service as a “broker” or “Business Partner”?',
    ];

    const openModal = (photoUrl, index) => {
        setSelectedPhotoUrl(photoUrl);
        setModalOpen(index);
    };
    const openModalvideo = (photoUrl) => {
        setSelectedPhotoUrl(photoUrl);;
    };
    const closeModal = () => {
        setModalOpen(false);
    };
    const MAX_FILE_SIZE_KB = 500; // Maximum file size in kilobytes
    const handleFileChange = async (event) => {
        const files = event.target.files;
        const newSelectedFiles = [];
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            newSelectedFiles.push(file);
            if (file && file.type && file.type.includes('image/')) {
                const compressedFile = await compressImage(file);
                console.log(compressedFile.size);
                const videoFileExists = selectedFiles.some(selectedFile => selectedFile.type === 'video');
                if (!videoFileExists) {
                    if (compressedFile.size / 1024 <= MAX_FILE_SIZE_KB) {
                        setSelectedFiles((prevSelectedFiles) => [
                            ...prevSelectedFiles,
                            { file: compressedFile, preview: URL.createObjectURL(compressedFile), type: "image" },
                        ]);
                        setDemo((prevSelectedFiles) => [
                            ...prevSelectedFiles,
                            { file: compressedFile, preview: URL.createObjectURL(compressedFile), type: "image" },
                        ]);
                    } else {
                        console.error('Compressed image exceeds maximum file size:', compressedFile.size / 1024, 'KB');
                    }
                }
                else {
                    toast.warning('The video limit should be limit 1');
                    return
                }
            }
            // else if (file && file.type && file.type.includes('video/')) {
            //     // Check if there is already a video file in the selectedFiles array
            //     const videoFileExists = selectedFiles.some(selectedFile => selectedFile.type === 'video');
            //     if (!videoFileExists) {
            //         // Handle video file (no compression)
            //         setSelectedFiles((prevSelectedFiles) => [
            //             ...prevSelectedFiles,
            //             { file, preview: URL.createObjectURL(file), type: "video" },
            //         ]);
            //         setDemo((prevSelectedFiles) => [
            //             ...prevSelectedFiles,
            //             { file, preview: URL.createObjectURL(file), type: "video" },
            //         ]);
            //     } else {
            //         toast.warning('The video limit should be limit 1');
            //         return
            //     }
            // } 
            else {
                console.warn('Unsupported file type:', file.type);
            }
        }
    };
    const compressImage = async (file) => {
        const options = {
            maxSizeMB: MAX_FILE_SIZE_KB / 1024, // Convert maximum file size to megabytes
        };
        try {
            // Compress image using imageCompression library
            const compressedFile = await imageCompression(file, options);
            return compressedFile;
        } catch (error) {
            console.error('Image compression failed:', error);
            throw error; // Throw error for handling in calling function
        }
    };
    const handleInputChange = async (event) => {
        setTextArea(event.target.value);
        //     if(event.target.value.length > 2){
        //     const formdata = new FormData();
        //     formdata.append("news_feed", event.target.value);
        //     const requestOptions = {
        //     method: "POST",
        //     body: formdata,
        //     };
        //     const res = await fetch("http://213.210.36.52:8005/predict", requestOptions)
        //     .then((response) => response.text());
        //     var data = res?.split(', ')
        //     console.log(data)
        //     setTags(data)
        //     }
        // else{
        //     setTags(null)
        // }
    };
    const PredictPost = async () => {
        try {
            var data = textarea
            const formdata = new FormData();
            formdata.append("news_feed", data);
            const requestOptions = {
                method: "POST",
                body: formdata,
            };
            const res = await fetch("http://213.210.36.52:8005/predict", requestOptions)
                .then((response) => response.text());
            var data = res?.split(', ')
            console.log(data)
            setTags(data)
            return data;
        } catch (err) {
            console.log("Error")
            return []
        }
    }
    const AddPost = async () => {
        try {
            setModalView(false)
            // const tag = await PredictPost()
            const token = true; // Replace with your actual authentication token
            const formselect = new FormData();
            const dataField = {
                posted_by: user?._id,
                description: textarea,
                // tags: tag,
                media_type: !selectedFiles[0]?.file ? "0" : "1",
                page_id:PageID
            }
            if (!dataField.description && selectedFiles.length == 0) {
                toast.error("please enter mandatory fields");
                return
            }
            if (selectedFiles.length > 5) {
                toast.error("Maximum image Limit is 5");
                return
            }
            setAddPostbtn(false)
            formselect.append("data", JSON.stringify(dataField));
            selectedFiles.map(async (selectedFile, index) => {
                if (selectedFile.type === "image") {
                    formselect.append("mediaUrls", selectedFile.file, `image${index}.png`);
                } else if (selectedFile.type === "video") {
                    formselect.append("mediaUrls", selectedFile.file, `video${index}.mp4`);
                }
            });
            const res = await FetchData("add/pagepost", 'POST', formselect, token, true);
            if (res.status === true) {
                Swal.fire({
                    title: 'Posted',
                    html: `<span style="font-size: 16px; font-weight: bold;">Post upload complete.</span>`,
                    icon: 'warning',
                    customClass:{
                        title:'swal2-title',
                    },
                    iconHtml: `<img src="http://connect-souq.qcodesinfotech.com/images/icons/laugh.png" style="width: 60px; height: 60px; border:none; border-radius: 50%;" />`,
                    timer: 2000, // Close the modal after 2 seconds
                    timerProgressBar: true, // Show a progress bar for the timer
                    showConfirmButton: false, // Hide the confirm button
                    showCancelButton: false // Hide the cancel button
                });
                setAddPostbtn(true)
                window.location.reload()
            } else {
                setAddPostbtn(true)
                toast.error("Please Check data")
            }
            return null;
        } catch (error) {
            setAddPostbtn(true)
            toast.success(error.message);
            return null;
        }
    }
    const removeSelectedFile = (indexToRemove) => {
        const updatedFiles = [...selectedFiles];
        updatedFiles.splice(indexToRemove, 1);
        setSelectedFiles(updatedFiles);
    };
    const Icon = { cursor: "pointer", width: '18px', margin: "10px" }
    const closeModals = () => {
        setModalView(false)
    }
    const GetLookingFor = async (value) => {
        const data = {
            looking_for: value,
            registerType: 'USER'
        }
        try {
            const res = await FetchData(`update/user/${user._id}`, "POST", JSON.stringify(data), true, false)
            setStage(1)
        }
        catch (err) {
            console.log(err);
        }
    }


    // const selectedTag = async(e,item) => {
    //     console.log(e.item);
    //     if (SelectedTags.includes(item)) {
    //         setSelectedTags(SelectedTags.filter((tag) => tag !== item));
    //       } else {
    //         setSelectedTags([...SelectedTags, item]);
    //       }
    //       console.log(SelectedTags);
    // }
    const showMaxAlert = async () => {
        Swal.fire({
            title: 'Reached out!',
            html: `<span style="font-size: 16px; font-weight: bold;">Reached maximum post upload</span>`,
            icon: 'warning',
            customClass: {
                title: 'swal2-title',
            },
            iconHtml: `<img src="http://connect-souq.qcodesinfotech.com/images/icons/laugh.png" style="width: 60px; height: 60px; border:none; border-radius: 50%;" />`,
            timer: 3000, // Close the modal after 2 seconds
            timerProgressBar: true, // Show a progress bar for the timer
            showConfirmButton: false, // Hide the confirm button
            showCancelButton: false // Hide the cancel button
        });
    }
    return (
        <div className='mb-3'>
            {/* <div id="share-box">
                <div className="p-1">
                    <div className="selected-photos">
                        {selectedFiles.map((selectedFile, index) => (
                            <div key={index} className="selected-photo-container">
                                <div className='bg-white rounded-circle crossdiv'>
                                    <i className="fa fa-times" aria-hidden="true" onClick={() => removeSelectedFile(index)}></i>
                                </div>
                                {selectedFile.type == "video" ?(
                                <video
                                src={selectedFile.preview}
                                alt={`Selected Video ${index + 1}`}
                                className="selected-photo"
                                autoPlay
                                muted
                                controls
                                />):(
                                 <img
                                    src={selectedFile.preview}
                                    alt={`Selected Photo ${index + 1}`}
                                    className="selected-photo"
                                    onClick={() => openModal(selectedFile.preview, index + 1)}
                                /> 
                                )}
                            </div>
                        ))}
                        {}
                        {isModalOpen && (
                            <PhotoModal
                                imageUrl={selectedPhotoUrl}
                                onClose={closeModal}
                                selectedFiles={selectedFiles}
                                indexval={isModalOpen}
                                setSelectedFiles={setSelectedFiles}
                                Demo={demo}
                            />
                        )}
                    </div>
                    <form>
                        <div>
                            <textarea 
                                type="text"
                                className="form-control"
                                id="recipient-name"
                                onChange={handleInputChange}
                                placeholder={t('Whats on your mind')}
                                style={{ height: 144, border: 'none',width: '100%', wrap: 'hard' }}
                            />
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
                                        accept="image/*,video/*"
                                        onChange={handleFileChange}
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
                                disabled={!textarea && !selectedFiles.length || !AddPostbtn}
                                onClick={AddPost}
                                className="btn btn-primary m-3"
                                style={{
                                    backgroundColor: "rgb(138, 197, 63)",
                                    border: "cadetblue",
                                    width: 75,
                                    height: 35
                                }}
                            >
                                <strong>{t('post')}</strong>
                            </button>
                        </div>
                    </form>
                </div>
            </div> */}
            <div className="card p-3" onClick={() => {
                if (!CheckGuest()) {
                    setModalView(true)
                } else if (!CheckGuest()) {
                    showMaxAlert()
                }
            }} style={{ cursor: "pointer", borderRadius: "10px" }}>
                <div className='d-flex'>
                    <div>
                        <img src={`${user?.profile ? `${BASE_URL + user?.profile}` : `/images/profile/img0${user?.randomprofile}.png`}`}
                            onError={handleImageError}
                            style={{ width: "40px", height: "40px", borderRadius: "50%", }} />
                    </div>
                    <ReactPlaceholderTyping
                        placeholders={placeholders}
                        fontFamily={'Roboto'}
                        containerStyle={{ borderRadius: '20px', marginLeft: '10px', border: "0.5px solid #ededed" }}
                        inputStyle={{ fontSize: '1rem', width: '100%' }}
                    />
                    {/* <input type='text' className='px-4' placeholder='Start a post' style={{borderRadius:"20px",border:"0.5px solid #ededed",marginLeft:"10px",width:"100%"}} /> */}
                </div>
                <div className='d-flex justify-content-around py-2 mt-2' >
                    <p className='fontsubtitle mb-0'><i class="fa fa-picture-o" aria-hidden="true" style={{ color: "#2172ff" }}></i> Media</p>
                    <p className='fontsubtitle mb-0'><i class="fa fa-file-text" aria-hidden="true" style={{ color: "red" }}></i> Article</p>
                    <p className='fontsubtitle mb-0'><i class="fa fa-calendar" aria-hidden="true" style={{ color: "brown" }}></i> Events</p>
                </div>
            </div>
            <Modal show={ModalView} className="modelfilter modal-xl h-auto" size="sl">
                <Modal.Body>
                    <div className="d-flex justify-content-between px-3">
                        <div className='mb-3'><p className='text-capitalize fontsubtitle font-weight-bold' >{stage == 0 ? 'Help us to understand you better, Please let us know the reasons for posting. ' : 'Create post'}</p>
                            {stage == 0 && <span className='fontsubtitle font-weight-bold'>Are You</span>}
                        </div>
                        <span style={{ cursor: 'pointer' }} onClick={() => closeModals()}><i class="fa fa-times" aria-hidden="true"></i></span>
                    </div>
                    {stage == 1 ? (
                        <div id="share-box">
                            <div className="p-1">
                                <div className="selected-photos">
                                    {selectedFiles.map((selectedFile, index) => (
                                        <div key={index} className="selected-photo-container">
                                            <div className='bg-white rounded-circle crossdiv'>
                                                <i className="fa fa-times" aria-hidden="true" onClick={() => removeSelectedFile(index)}></i>
                                            </div>
                                            {selectedFile.type == "video" ? (
                                                <video
                                                    src={selectedFile.preview}
                                                    alt={`Selected Video ${index + 1}`}
                                                    className="selected-photo"
                                                    autoPlay
                                                    muted
                                                    controls
                                                />) : (
                                                <img
                                                    src={selectedFile.preview}
                                                    alt={`Selected Photo ${index + 1}`}
                                                    className="selected-photo"
                                                    onClick={() => openModal(selectedFile.preview, index + 1)}
                                                />
                                            )}
                                        </div>
                                    ))}
                                    { }
                                    {isModalOpen && (
                                        <PhotoModal
                                            imageUrl={selectedPhotoUrl}
                                            onClose={closeModal}
                                            selectedFiles={selectedFiles}
                                            indexval={isModalOpen}
                                            setSelectedFiles={setSelectedFiles}
                                            Demo={demo}
                                        />
                                    )}
                                </div>
                                <form>
                                    <div>
                                        <textarea
                                            type="text"
                                            className="form-control"
                                            id="recipient-name"
                                            onChange={handleInputChange}
                                            placeholder={t('Whats on your mind')}
                                            style={{ height: 124, border: 'none', width: '100%', wrap: 'hard', border: "0.5px solid #ededed" }}
                                        />
                                    </div>
                                    <div className='container-fluid d-flex column-gap-2 py-3'>
                                        {/* {Tags?.length > 0 && Tags.map((item,index) => (
                            <div className={`bg-${SelectedTags.includes(item) ? 'connect' : 'connect-outline'} rounded px-2`} role='button' onClick={(e) => selectedTag(e, item)}
                            key={index}><span className={`${SelectedTags.includes(item) ? 'text-white':'text-connect'} fontcontent2`}>#{item}</span></div>
                           ))} */}
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
                                                    onChange={handleFileChange}
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
                                            disabled={!textarea.trim() && !selectedFiles.length || !AddPostbtn}
                                            onClick={AddPost}
                                            className="btn btn-primary m-3"
                                            style={{
                                                backgroundColor: "#4535C1",
                                                border: "cadetblue",
                                                width: 75,
                                                height: 35
                                            }}
                                        >
                                            <strong>{t('Post')}</strong>
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    ) : (
                        <div className='container-fluid w-100 h-100'>
                            <div className='row row-gap-2 justify-content-center'>
                                {placeholders.map((item, index) => (
                                    <div className='col-6 col-lg-4 '>
                                        <div className='card py-2 px-2 bg-white border rounded align-items-center justify-content-center hoverer' onClick={() => GetLookingFor(index + 1)} style={{ boxShadow: '1px 2px 1px 1px lightgrey', height: 'auto', minHeight: '57px' }}>
                                            <span className='fontcontent2 text-center'>{item}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </Modal.Body>
            </Modal>
        </div>
    );
};
export default AddPost;
