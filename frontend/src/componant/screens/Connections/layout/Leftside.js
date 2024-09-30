import React, { useEffect, useState } from 'react'
import { useNavigate} from 'react-router-dom';
import FetchData from '../../../fetch-api/Apifetch';
import { capitalizeFirstLetter, handleImageError, Imagesource } from '../../../utils/Function';

const Leftside = () => {
    const [userData , setuserData]= useState()
    const [user, setUser]= useState(JSON.parse(localStorage.getItem('LOGINDATA'))?.user)
    const navigate = useNavigate()
    const [image, setImage] = useState({});


    useEffect(() => {     
        getUserData()
    }, []);

    const getUserData = async () => {
        try{
                const res = await FetchData("detail/user/"+user?._id, 'GET', null, true, false);
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
  return (
    <aside id='left-aside' className="mt-5 mt-lg-0 pt-4 pt-lg-0" style={{display:'block',gridArea:'initial'}}>
    <div className='card align-items-center border shadow-sm pb-4'>
      <img 
      className="mt-4 shadow-sm"
      src={`${userData?.user?.profile !==  '/images/profile/add-user.png' ? `${Imagesource(image.url)}` : `/images/profile/img0${user?.randomprofile}.png`}`}
      alt="Profile picture"
      style={{ width: 120, height: 120 ,borderRadius:'50%',cursor:'pointer',objectFit:'fill'}}
      onClick={() => {if(user?._id === userData?.user?._id){
      document.getElementById("imageInput").click();
      }
      }}
      onError={handleImageError}
      />
      {/* <input type="file" id="imageInput" style={{ display: "none" }}onChange={handleFileChange2}ref={fileInputRef}/> */}

      <span className="fontsubtitle mt-3 text-dark1 font-weight-bold">{userData?.user?.first_name}{" "}{userData?.user?.last_name}</span>
      <p className="fontcontent1 text-dark1 mb-1">
        {capitalizeFirstLetter(userData?.user?.designation || "Designation")}</p>
      <p className="fontcontent1 mb-1 text-secondary1">
        {userData?.user?.city}, {userData?.user?.country}</p>
      <p className="fontcontent2 mb-2 text-secondary1">
        500+ connections</p>

        <div className="d-flex flex-column justify-content-center">
        <div className="d-flex mt-3">
          {/* {id != user?._id && (
          <button disabled={!connect && connectdata?.status != "2"}
            className="btn btn-connect fontcontent1 font-weight-bold m-1 px-3 py-1"
            onClick={() =>navigate("/chats", { state: connectdata })}>
              Chat</button>   
          )} */}
          {/* {id != user?._id ? ( */}
          {/* <button className="btn btn-connect fontcontent1 font-weight-bold m-1 px-3 py-1"
            onClick={() => OpenPopup()}>
               {!connect? "Let's Connect": connectdata?.status == "1"? "Request sent": "connected"}
                      </button>) : ( */}
                      <button className="btn btn-connect fontcontent1 font-weight-bold m-1 px-3 py-1"
                        onClick={() => navigate("/profile")}>
                        <i class="fa fa-pencil text-white fonthint " aria-hidden="true"></i>
                        &nbsp;Edit Profile
                      </button>
                    {/* )} */}
                  </div>
                </div>
    </div>
</aside>
  )
}

export default Leftside
