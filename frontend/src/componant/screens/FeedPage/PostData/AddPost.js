import React, { useEffect, useState } from 'react';
import FetchData from '../../../fetch-api/Apifetch';
import { toast } from 'react-toastify';
import { handleImageError, handleImagePageError, Imagesource, validateForm } from '../../../utils/Function';
import PhotoModal from './ImageModel';
import { useTranslation } from 'react-i18next';
import imageCompression from 'browser-image-compression'; // Import image compression library
import { Modal } from "react-bootstrap";
import { CheckGuest } from "../../../utils/Function"
import ReactPlaceholderTyping from 'react-placeholder-typing'
import { BASE_URL } from '../../../utils/ApiRoute';
import Swal from 'sweetalert2';

const AddPost = ({ existing }) => {
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
    const [LookingFor, setLookingFor] = useState();
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

    useEffect(() => {
        if (existing !== 0) {
            setStage(1)
        } else {
            setStage(0)
        }
    }, [existing]);
    useEffect(() => {
        if (user?._id) {
            onReqUserFollowingPage(user?._id);
        }
    }, [user]);

    const openModal = (photoUrl, index) => {
        setSelectedPhotoUrl(photoUrl);
        setModalOpen(index);
    };

    const openModalvideo = (photoUrl) => {
        setSelectedPhotoUrl(photoUrl);
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
            let dataField = {
                posted_by: user?._id,
                description: textarea,
                // tags: tag,
                media_type: !selectedFiles[0]?.file ? "0" : "1",
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

            selectedFiles.map(async (selectedFile, index) => {
                if (selectedFile.type === "image") {
                    formselect.append("mediaUrls", selectedFile.file, `image${index}.png`);
                } else if (selectedFile.type === "video") {
                    formselect.append("mediaUrls", selectedFile.file, `video${index}.mp4`);
                }
            });

            let url = "post";
            console.log("pageID", pageID)
            if (pageID) {
                url = "add/pagepost"
                dataField.page_id = pageID;
            }
            formselect.append("data", JSON.stringify(dataField));
            const res = await FetchData(url, 'POST', formselect, token, true);
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
        setModalView(false);
        handleGroupSelect();
        setSettings(0);
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

    const [settings, setSettings] = useState(0);
    const [pageID, setPageID] = useState();
    const [pageName, setPageName] = useState();
    const [pageItem, setPageItem] = useState([]);
    const [showSettingsModal, setShowSettingsModal] = useState(false);
    const [showGroupModal, setShowGroupModal] = useState(false);

    const toggleModal = () => {
        setShowSettingsModal(!showSettingsModal);
    };

    const openGroupModal = () => {
        setShowGroupModal(true);
        setSettings(1)
    };

    const closeGroupModal = () => { setShowGroupModal(false); };

    const onReqUserFollowingPage = async (ID) => {
        try {
            const res = await FetchData(`post/page/${ID}`, "GET", null, false, false);
            setPageItem(res.data);
            console.log(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleGroupSelect = (group) => {
        if (group) {
            setPageID(group?._id);
            setPageName(group?.title);
        } else {
            setPageID();
            setPageName();
        }
    };

    return (
        <div className='mb-3'>
            <div
                className="card px-3 pt-3 pb-2"
                onClick={() => {
                    if (!CheckGuest()) {
                        setModalView(true)
                    } else if (!CheckGuest()) {
                        showMaxAlert()
                    }
                }}
                style={{ cursor: "pointer", borderRadius: "14px" }}>
                <div className='d-flex'>
                    <div>
                        <img src={`${user?.profile ? `${BASE_URL + user?.profile}` : `/images/profile/img0${user?.randomprofile}.png`}`}
                            onError={handleImageError}
                            style={{ width: "48px", height: "48px", borderRadius: "50%", }} />
                    </div>
                    <ReactPlaceholderTyping
                        placeholders={placeholders}
                        fontFamily={'Roboto'}
                        containerStyle={{ borderRadius: '10px', marginLeft: '10px', border: "0.5px solid #ededed" }}
                        inputStyle={{ fontSize: '1rem', width: '100%' }}
                    />
                </div>
                <div className='d-flex justify-content-around pt-3' >
                    <div className='d-flex column-gap-1 align-items-center'>
                        <div
                            className='rounded-circle d-flex justify-content-center align-items-center '
                            style={{ width: '35px', height: '35px' }}>
                            <img src='/images/icons/camera-icon.png' className="w-50 h-50" style={{ width: '' }} />
                        </div>
                        <span className="text-connect1 font-weight-normal fontcontent1">Photo</span>
                    </div>
                    <div className='d-flex column-gap-1 align-items-center'>
                        <div
                            className='rounded-circle d-flex justify-content-center align-items-center '
                            style={{ width: '35px', height: '35px' }}>
                            <img src='/images/icons/play-button.png' className="w-50 h-50 ml-1" style={{ width: '' }} />
                        </div>
                        <span className="text-connect1 font-weight-normal fontcontent1">Video</span>
                    </div>
                    <div className='d-flex column-gap-1 align-items-center'>
                        <div
                            className='rounded-circle d-flex justify-content-center align-items-center '
                            style={{ width: '35px', height: '35px' }}>
                            <img src='/images/icons/event-icon.png' className="w-50 h-50" style={{ width: '' }} />
                        </div>
                        <span className="text-connect1 font-weight-normal fontcontent1">Event</span>
                    </div>
                    <div className='d-flex column-gap-1 align-items-center'>
                        <div
                            className='rounded-circle d-flex justify-content-center align-items-center '
                            style={{ width: '35px', height: '35px' }}>
                            <img src='/images/icons/article-icon.png' className="w-50 h-50" style={{ width: '' }} />
                        </div>
                        <span className="text-connect1 font-weight-normal fontcontent1">Article</span>
                    </div>
                </div>
            </div>

            <Modal show={false} className="modelfilter modal-xl h-auto" size="md1">
                <Modal.Header className='justify-content-end pt-1'>
                    <span style={{ cursor: 'pointer' }} onClick={() => closeModals()}><i class="fa fa-times" aria-hidden="true"></i></span>
                </Modal.Header>
                <Modal.Body className="pt-0">

                    <div className={`d-flex px-3 ${stage == 0 ? 'justify-content-between' : 'justify-content-center'}`}>
                        <div ><p className={`text-capitalize fontsubtitle font-weight-bold  ${stage == 0 ? 'text-dark1 ' : 'text-connect mb-0'} `} >{stage == 0 ? 'Help us to understand you better, Please let us know the reasons for posting. ' : 'Create post'}</p>
                            {stage == 0 && <span className='fontsubtitle font-weight-bold'>Are You</span>}
                        </div>
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
                                                        src="images/icons/photo.png"
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
                                                        src="images/icons/laugh.png"
                                                        alt="Upload Icon" style={Icon}
                                                    />
                                                </label>
                                            </div>
                                            <div className="input">
                                                <label htmlFor="fileInput">
                                                    <img
                                                        src="images/icons/attach.png"
                                                        alt="Upload Icon" style={Icon}
                                                    />
                                                </label>
                                            </div>
                                        </div>
                                        <button
                                            type="button"
                                            disabled={!textarea.trim() && !selectedFiles.length || !AddPostbtn}
                                            onClick={AddPost}
                                            className="btn btn-connect text-white py-1 m-3 rounded-01"
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

            <Modal show={ModalView} onHide={closeModals} className="modelfilter mode mx-auto post-modal-container">
                <Modal.Header closeButton>
                    <div className="container">
                        <div className="d-flex align-items-center">
                            <img
                                src={`${user?.profile ? `${BASE_URL + user?.profile}` : `/images/profile/img0${user?.randomprofile}.png`}`}
                                onError={handleImageError}
                                alt="User Profile"
                                className="rounded-circle"
                                style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                            />

                            <div className="ms-2">
                                <div className='flex-row d-flex align-items-center' onClick={toggleModal}>
                                    <h6 className="mb-0 pl-0">{user?.first_name + " " + user?.last_name}</h6>
                                    <i className="fa fa-caret-down text-black ml-2"></i>
                                </div>
                                <p className="text-muted mb-0" style={{ fontSize: '12px' }}>Post to {pageName ? pageName : "public"}</p>
                            </div>
                        </div>
                    </div>
                </Modal.Header>
                <Modal.Body className="post-madal-boday" style={{ overflowY: "scroll", maxHeight: "80vh" }}>
                    <div className="container mb-3">
                        {stage == 1 ? (
                            <div>
                                {/* Post TextArea */}
                                <div className="mt-3 post-text-area-container">
                                    <textarea
                                        className="form-control"
                                        rows="3"
                                        placeholder="What do you want to talk about?"
                                        id="recipient-name"
                                        onChange={handleInputChange}
                                        style={{
                                            resize: 'none',
                                            border: 'none',
                                            outline: 'none',
                                            fontSize: '16px'
                                        }}
                                    ></textarea>
                                </div>

                                <div id="share-box" className="p-1">
                                    <div className="selected-photos">
                                        {selectedFiles.map((selectedFile, index) => (
                                            <div key={index} className="selected-photo-container">
                                                <div className='bg-white rounded-circle crossdiv'>
                                                    <i className="fa fa-times" aria-hidden="true" onClick={() => removeSelectedFile(index)}></i>
                                                </div>
                                                {selectedFile.type === "video" ? (
                                                    <video
                                                        src={selectedFile.preview}
                                                        alt={`Selected Video ${index + 1}`}
                                                        className="selected-photo"
                                                        autoPlay
                                                        muted
                                                        controls
                                                    />
                                                ) : (
                                                    <img
                                                        src={selectedFile.preview}
                                                        alt={`Selected Photo ${index + 1}`}
                                                        className="selected-photo"
                                                        onClick={() => openModal(selectedFile.preview, index + 1)}
                                                    />
                                                )}
                                            </div>
                                        ))}

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
                                </div>

                                {/* Action Buttons */}
                                <div className="d-flex justify-content-between align-items-center mt-3">
                                    <div className="d-flex">
                                        <label htmlFor="file-upload-input">
                                            <i className="fa fa-camera me-3" style={{ fontSize: '20px', cursor: 'pointer' }}></i>
                                        </label>
                                        <input type="file" id="file-upload-input" multiple style={{ display: 'none' }} accept="image/*" onChange={handleFileChange} />
                                        <i className="fa fa-calendar me-3" style={{ fontSize: '20px', cursor: 'pointer' }}></i>
                                        <i className="fa fa-gear me-3" style={{ fontSize: '20px', cursor: 'pointer' }}></i>
                                        <i className="fa fa-plus-circle me-3" style={{ fontSize: '20px', cursor: 'pointer' }}></i>
                                    </div>


                                    {/* Post Button (disabled by default) */}
                                    <button
                                        className="btn btn-connect"
                                        type='button'
                                        disabled={!textarea.trim() && !selectedFiles.length || !AddPostbtn}
                                        onClick={AddPost}
                                        style={{ borderRadius: '20px' }}
                                    >
                                        Post
                                    </button>
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
                    </div>
                </Modal.Body>
            </Modal>

            {/* Settings Modal */}
            <Modal show={showSettingsModal} onHide={toggleModal} centered size='mdd'>
                <Modal.Header closeButton>
                    <Modal.Title style={{ width: "100%", display: "flex", justifyContent: "center" }}>Post settings</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ height: "40vh" }}>
                    <p>Who can see your post?</p>

                    <div className="group-item" onClick={() => { setSettings(0); handleGroupSelect() }}>
                        <div className="d-flex align-items-center mb-2 border p-2 py-4" style={{ justifyContent: "center" }}>
                            <div className='mx-2 mr-4'>
                                <input type="radio" checked={settings == 0} style={{ accentColor: "#4535C1", width: "20px", height: "20px" }} />
                            </div>
                            <div className='d-flex flex-column ml-2' style={{ width: "85%" }}>
                                <h6 className="mb-0 pl-0">Public</h6>
                                <small className="text-muted">Anyone on or off Connectsouq</small>
                            </div>
                        </div>
                    </div>

                    <div className="group-item" onClick={() => {openGroupModal() }}>
                        <div className="d-flex align-items-center mb-2 border p-2 py-4" style={{ justifyContent: "center" }}>
                            <div className='mx-2 mr-4'>
                                <input type="radio" checked={settings == 1} style={{ accentColor: "#4535C1", width: "20px", height: "20px" }} />
                            </div>
                            <div className='d-flex flex-column ml-2' style={{ width: "85%" }}>
                                <h6 className="mb-0 pl-0">Group</h6>
                                <small className="text-muted">Group people's only see this</small>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button onClick={toggleModal} className="btn btn-back" style={{ borderColor: "red", color: "red", borderRadius: '20px' }}>Back</button>
                    <button onClick={toggleModal} style={{ borderRadius: '20px' }} className="btn btn-connect">Done</button>
                </Modal.Footer>
            </Modal>

            {/* Groups Modal */}
            <Modal show={showGroupModal} animation={false} onHide={() => { closeGroupModal(); handleGroupSelect(); }} centered size='mdd'>
                <Modal.Header closeButton>
                    <Modal.Title style={{ width: "100%", display: "flex", justifyContent: "center" }}>Select a Group</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ height: "40vh", overflowY: "scroll" }}>
                    {pageItem && pageItem.length > 0 && pageItem.map((group) => (
                        <div key={group._id} className="group-item" onClick={() => handleGroupSelect(group)}>
                            <div className="d-flex align-items-center mb-2 border p-2 py-3" style={{ justifyContent: "center" }}>
                                <div className='mx-2 mr-4'>
                                    <input type="checkbox" checked={group._id == pageID} style={{ accentColor: "#4535C1", width: "20px", height: "20px" }} />
                                </div>
                                <img
                                    src={`${BASE_URL + group.profile_icon}`}
                                    onError={handleImagePageError}
                                    alt={group.title}
                                    style={{ width: 50, height: 50, marginRight: 10, border: "1px solid #f5f5f5", borderRadius: "5px", objectFit: "cover" }}
                                />
                                <div className='d-flex flex-column' style={{ width: "80%" }}>
                                    <h6 className="mb-0 pl-0">{group.title}</h6>
                                    <small
                                        className="text-muted"
                                        style={{ textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}
                                    >{group.description}</small>
                                </div>
                            </div>
                        </div>
                    ))}
                </Modal.Body>
                <Modal.Footer>
                    <button onClick={() => {
                        closeGroupModal();
                        handleGroupSelect();
                    }}
                        className="btn btn-back"
                        style={{ borderColor: "red", color: "red", borderRadius: '20px' }}

                    >Back</button>
                    <button onClick={() => {
                        closeGroupModal();
                        setShowSettingsModal(false);
                    }}
                        style={{ borderRadius: '20px' }}
                        className="btn btn-connect">Done</button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default AddPost;
