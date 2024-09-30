import React, { useEffect, useState } from 'react'
import { useRef } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { BASE_URL } from '../../../../utils/ApiRoute';
import { capitalizeFirstLetter, handleImageError, Imagesource } from '../../../../utils/Function';
import io from 'socket.io-client';
import FetchData from '../../../../fetch-api/Apifetch';
import { Modal } from 'react-bootstrap';
import { SingleImageCropper, SingleImageCropper1 } from '../../PostData/ImageModel';
import imageCompression from 'browser-image-compression'; // Import image compression library
import Registration from '../../../layout/Registration';
import BP_Profile from '../../../layout/BP-Profile';

const socket = io(BASE_URL);
const Leftside = ({connectdata , connect ,listConnect}) => {
    const { id } = useParams();
    const location = useLocation()
    const { state } = location
    const navigate = useNavigate()
    const [userData , setuserData]= useState()
    const [image, setImage] = useState({});
    const [profile, setProfile] = useState("");
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('LOGINDATA'))?.user)
    const fileInputRef = useRef(null);
    const [Show, setShow] = useState(false)
    const [isModalOpen, setIsModal] = useState(false);
    const [formData, setFormData] = useState({
        sender: user?._id,
        receive: id
    })

    useEffect(() => {
      
      getUserData()
    }, []);
    const getUserData = async () => {
      try{
              const res = await FetchData("detail/user/"+id, 'GET', null, true, false);
              setuserData(res.data)
              console.log(res.data);
              setImage({
                  url:res.data?.user?.profile
              })
              console.log(res.data?.user?.profile);
      
          }
          catch(err){
              console.log(err);
          }
  }

    const openModal = () => {
        setIsModal(true);
        imagecropmodal();
      };
      const modalclose = () => {
        setIsModal(false);
        setImage({
          url: userData?.user?.profile
      })
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      }

      const handleConnectUser = async () => {
        try {
            const res = await FetchData('userconnect/add', "POST", JSON.stringify(formData), false, false)          
            listConnect()
        } catch (err) {
            console.log(err);
        }
    }
      const handleDisconnectUser = async () => {
        try {
            const res = await FetchData(`deleteconnect/${connectdata?._id}`, "GET", null, false, false)
            listConnect()
        } catch (err) {
            console.log(err);
        }
    }
    
      const updateLocalstorage = async () => {
        try{
            const res = await FetchData("detail/user/"+ user?._id, 'GET', null, true, false);
          if (res.success) {
            localStorage.setItem("LOGINDATA", JSON.stringify(res.data))
            Swal.fire({
              title: 'Great!',
              text: 'Profile picture updated',
              timer: 2000
            })
          }
        }catch(err){
            console.log(err);
        }
      }

      // useEffect(() => {
      //   const handleStorageChange = (event) => {
      //     if (event.key === 'LOGINDATA') {
      //       setUser(JSON.parse(event.newValue)?.user);
      //     }
      //   };
    
      //   // Add event listener for storage changes
      //   window.addEventListener('storage', handleStorageChange);
      //   // Cleanup event listener on component unmount
      //   return () => {
      //     window.removeEventListener('storage', handleStorageChange);
      //   };
      // }, []);

      const UpdateProfileImage = async (image) =>{
        const formData = new FormData()
        formData.append('Profile', image)
        formData.append('user_id',user?._id)
        try{
            const res = await FetchData("user/profile?bgicon=false", "POST", formData, true, true)
            if(res.success){
              updateLocalstorage()
            }
        }catch(err){
            console.log(err);
        }
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    }

    const handleFileChange2 = async (e) => {
        console.log("File change event:", e.target.files);
        const file = e.target.files[0];
        if (file) {
          const compressedFile = await compressImage(file);
          // setProfile(compressedFile)
          const reader = new FileReader();
          reader.onloadend = () => {

                setImage({ type: "image", url: reader.result });
                openModal()
          };
          reader.readAsDataURL(file);
        }
      };
      const MAX_FILE_SIZE_KB = 400;
      const compressImage = async (file) => {
        const options = {
          maxSizeMB: MAX_FILE_SIZE_KB / 1024, // Convert maximum file size to megabytes
          useWebWorker: true, // Use web worker for better performance
        };
      
        try {
          const compressedFile = await imageCompression(file, options);
          console.log('Original file size:', file.size / 1024, 'KB');
          console.log('Compressed file size:', compressedFile.size / 1024, 'KB');
          return compressedFile;
        } catch (error) {
          console.error('Error compressing image:', error);
          throw error;
        }
      } 


      const datareturn =(item)=>{
        console.log(item)
        // UpdateProfileImage(item)
      }
      const imagecropmodal = () => {
    
    
        return (
            <div>
          <Modal show={isModalOpen}  className="modelfilter"  >
            <Modal.Body className="my-0">
              <SingleImageCropper1
                imageUrl={image?.url}
                onClose={modalclose}
                // setCroppedImage={setProfile}
                setCroppedImage={datareturn}
                // setCroppedImage={(croppedImage) => ApplyImage(croppedImage)}
                setViewImage={setImage}
                onSet={ApplyImage}
              />
            </Modal.Body>
          </Modal>
          </div>
        );
      };

      const ApplyImage = async (item) => {
        console.log(profile);
        setIsModal(false)
        UpdateProfileImage(item);
      };

      useEffect(()=>{
        console.log(profile);
      },[profile])

      const OpenPopup = async () => {
        Swal.fire({
            title: connect ? 'Disconnect?' : 'Connect',
            html: `<span style="font-size: 16px; font-weight: bold;">${connect ? `Remove connection with ${userData?.user?.first_name}` : `Connect with ${userData?.user?.first_name}`}</span>`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#4535C1',
            cancelButtonColor: '#d33',
            confirmButtonText: connect ? 'Yes, Remove!' : 'Yes, Connect!',
            cancelButtonText: connect ? 'Cancel' : 'Later',
            customClass: {
                confirmButton: 'swal2-confirm-custom',
                cancelButton: 'swal2-cancel-custom',
                title: 'swal2-title',
            },
            iconHtml: `<img src="${Imagesource(image.url)}" style="width: 60px; height: 60px; border:none; border-radius: 50%;" />`,
        }).then((result) =>{
            socket.emit('sendNotification', {...formData,["con"]:!connect}); 
            if (result.isConfirmed) {
                if (connect) { handleDisconnectUser() }
                else { handleConnectUser() }
            }
        });
    }

  return (
<aside id='left-aside' className="mt-5 mt-lg-0 pt-4 pt-lg-0" style={{display:'block',gridArea:'initial'}}>
            <div className='card align-items-center border shadow-sm pb-4'>
            <div className='d-flex container-fluid pt-2 justify-content-end w-100'>
              <img src='/images/icons/profiledetails.png' width={25} onClick={()=>setShow(true)} role='button'/>
            </div>
              <img 
              className="mt-4 shadow-sm"
              src={`${userData?.user?.profile !== '/images/profile/add-user.png' ? `${Imagesource(image.url)}` : `/images/profile/img0${user?.randomprofile}.png`}`}
              alt="Profile picture"
              style={{ width: 120, height: 120 ,borderRadius:'50%',cursor:'pointer',objectFit:'fill'}}
              onClick={() => {if(user?._id === userData?.user?._id){
              document.getElementById("imageInput").click();
              }
              }}
              onError={handleImageError}
              />
              <input type="file" id="imageInput" style={{ display: "none" }}onChange={handleFileChange2}ref={fileInputRef}/>

              <span className="fontsubtitle mt-3 text-dark1 font-weight-bold">{userData?.user?.first_name}{" "}{userData?.user?.last_name}</span>
              <p className="fontcontent1 text-dark1 mb-1">
                {capitalizeFirstLetter(userData?.user?.designation || "Designation")}</p>
              <p className="fontcontent1 mb-1 text-secondary1">
                {userData?.user?.city}, {userData?.user?.country}</p>
              <p className="fontcontent2 mb-2 text-secondary1">
                500+ connections</p>

                <div className="d-flex flex-column justify-content-center">
                <div className="d-flex mt-3">
                  {id != user?._id && (
                  <button disabled={!connect && connectdata?.status != "2"}
                    className="btn btn-connect fontcontent1 font-weight-bold m-1 px-3 py-1"
                    onClick={() =>navigate("/chats", { state: connectdata })}>
                      Chat</button>   
                  )}
                  {id != user?._id ? (
                  <button className="btn btn-connect fontcontent1 font-weight-bold m-1 px-3 py-1"
                    onClick={() => OpenPopup()}>
                       {!connect? "Let's Connect": connectdata?.status == "0"? "Request sent": "connected"}
                              </button>) : (
                              <button className="btn btn-connect fontcontent1 font-weight-bold m-1 px-3 py-1"
                                onClick={() => navigate("/profile")}>
                                <i class="fa fa-pencil text-white fonthint " aria-hidden="true"></i>
                                &nbsp;Edit Profile
                              </button>
                            )}
                          </div>
                        </div>
            </div>
            {/* <div className='card align-items-start border shadow-sm pb-4 mt-2 pt-3 px-3'>
            <span className="fontsubtitle mt-lg-3 text-dark1 font-weight-bold">About</span>
            <span className="fontsubtitle mt-lg-3 text-dark1 font-weight-normal">Lorem ipsum dolor sit amet, </span>
            <ul className='w-100 mt-lg-3 ml-3 ' style={{listStyle:'disc'}}>
              <li className='py-2 text-secondary1 fontcontent1'>consectetur adipiscing elit.</li>
              <li className='py-2 text-secondary1 fontcontent1'>consectetur adipiscing elit.</li>
              <li className='py-2 text-secondary1 fontcontent1'>consectetur adipiscing elit.</li>
            </ul>
            <span className='py-2 text-secondary1 fontcontent1'>Maecenas imperdiet tortor ullamcorper turpis sodales, sagittis porta nisl condimentum.</span>

            <span className='py-2 text-secondary1 w-100 text-end fontcontent2'>see more</span>
            </div> */}
            {imagecropmodal()} 
            <BP_Profile SetShow={setShow} show={Show} id={id}/>
        </aside>
  )
}

export default Leftside