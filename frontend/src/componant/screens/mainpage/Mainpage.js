import React, { useEffect, useState } from "react";
import Header from "../layout/SubHeader";
import './styles/styles.css'
import buy from './Assets/buy-home.svg'
import boths from './Assets/Both.svg'
import FetchData from "../../fetch-api/Apifetch";
import '../newRegister/Style/configure.css'
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from "../../utils/ApiRoute";
import { toast } from "react-toastify";

const Mainpage = () => {
  const [selectedButton, setSelectedButton] = useState(3);
  const [ClientNotification, setClientNotification] = useState([]);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('LOGINDATA'))?.user);

  const navigate = useNavigate()
  const handleSelect = (button) => {
    if (button == 0) {
      ClientNotify(button)
      setSelectedButton(button)
    } else {
      setSelectedButton(button)
      window.location.href='/recommend-connection'
    }
  };
  const [searchText, setSearchText] = useState('');
  const [CheckGICTC, setCheckGICTC] = useState(false);
  const [GICTCText, setGICTCText] = useState("");

  const handleSubmit = async () => {
    if (!GICTCText) {
      toast.error("Enter Your GICTC Code")
      return
    }
    const res = await FetchData("check_code/" + GICTCText, "GET", null, null);
    if (res?.success) {
      setCheckGICTC(true)
      UsetUpdate(1)
    } else {
      toast.error("Invalid code. Enter the correct code")
    }
  }

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const filteredNotifications = ClientNotification.filter(item =>
    item.title.toLowerCase().includes(searchText.toLowerCase())
  );

  useEffect(() => {
    localStorage.removeItem('VERIFYDATA');
    if(user?.first_login ==1){
      // navigate('/recommend-connection');
    }
    UsetUpdate()
  }, [])
  const UsetUpdate = async (gictcstatus = null) => {
    var data = {}
    if (gictcstatus == null) {
      data = {
        first_login: 1,
        registerType: 'USER'
      }
    } else {
      data = {
        gictc_status: gictcstatus,
        registerType: 'USER'
      }
    }
    try {
      const res = await FetchData(`update/user/${user._id}`, 'POST', JSON.stringify(data), false, false)
      if (res.success) {
      }
    } catch (error) {
      console.log(error)
    }
  }
  const ClientNotify = async (id) => {
    try {
      const res = await FetchData(`list/page?id=1`, 'GET', null, false, false)
      if (res.success) {
        setClientNotification(res.data)
        console.log(res.data);
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleNext = async () => {
    if (selectedPage.length > 0) {
      const followPromises = selectedPage.map(item => AddFollow(item));
      await Promise.all(followPromises);
      navigate('/recommend-connection');
    } else {
      navigate('/recommend-connection');
    }
  };
  const AddFollow = async (Id) => {
    const dataObject = {
      user_id: user?._id,
      userdata: {
        first_name: user?.first_name,
        last_name: user?.last_name,
        gmail: user?.gmail
      }
    };
    const res = await FetchData("add/follow/" + Id, 'POST', JSON.stringify(dataObject), false, false);
    return res
  };
  const [selectedPage, setSelectedPage] = useState([]);
  const handleCheckboxClick = (e, ID) => {
    if (e.target.checked) {
      setSelectedPage([...selectedPage, ID]);
    } else {
      setSelectedPage(
        selectedPage.filter(pId => pId !== ID)
      );
    }
  };
  return (
    <div>
      <header id="sub-main-header">
        <Header />
      </header>
      <div className="container-fluid" style={{ height: '90vh' }} >
        <div className="row mx-lg-4 my-lg-3 mt-3 shadow" style={{ backgroundColor: '#ffff', height: '95%', borderRadius: '30px' }}>
          <div className="col-lg-6 col-sm-12 px-0 h-100">
            <div className="w-100 m-lg-2 h-100">
              <div className="px-4 pt-2">
                <h4>Congratulations {user.first_name}, Welcome to the CS Community! </h4>
                <p className='foncontent1 text-dark1'>Explore endless business opportunities with the AI-powered Sami Assistant.</p>
              </div>
              <div className="p-lg-4">
                <div className='row mt-3 mt-lg-0'>
                  <div class="col-12 w-100"
                    style={{ maxHeight: '50vh', overflowY: 'scroll' }}
                  >
                    <p className='font-weight-bold text-center text-dark mb-0'>Are you a GICTC Member?</p>
                    <div className="d-flex justify-content-between flex-column">
                      <div className=' d-flex justify-content-center mt-4' >
                        <div className='w-75 w-sm-90' >
                          <div className={`w-100 p-0 d-flex justify-content-center align-items-center py-4 px-5  ${false == 0 ? 'active' : ''}`} role='button'
                            onClick={() => handleSelect(0)} style={{ borderRadius: '10px', textAlign: 'center', backgroundColor: selectedButton == 0 ? "#4535C1" : "#4535C1", display: "flex", }}>
                            {/* <div className='rounded-circle p-2' style={{ width: 60, height: 60, backgroundColor: false ? '#fff' : '' }}>
                              <img src={buy} className='m-1' style={{ width: "30px" }} />
                            </div> */}
                            <label className="text-center mx-3 px-3 " role='button' style={{ color: selectedButton == 0 ? '#fff' : '#fff', fontWeight: "600", fontSize: 16, marginBottom: '-1%' }}>Yes, I am a GICTC Member.</label>
                          </div>
                        </div>
                      </div>
                      {selectedButton != 0 && (
                        <div className='d-flex justify-content-center mt-4' >
                          <div className='w-75 w-sm-90' style={{ textAlign: '-webkit-center' }}>
                            <div className={`align-items-center justify-content-center py-4 px-5  ${false == 1 ? 'active' : ''}`} role='button' onClick={() => handleSelect(1)}
                              style={{
                                borderRadius: '10px',
                                backgroundColor: selectedButton == 1 ? "#4535C1" : "#4535C1",
                                display: "flex",
                              }} >
                              {/* <div className='rounded-circle p-2' style={{ width: 60, height: 60, backgroundColor: false ? '#fff' : '' }}>
                                <img src={boths} className='m-1' style={{ width: "30px" }} />
                              </div> */}
                              <label className="text-center mx-3 px-3 " role='button' style={{ color: selectedButton == 1 ? '#fff' : '#fff', fontWeight: "600", fontSize: 16, marginBottom: '-1%' }}>No, I am Not a GICTC Member.</label>
                            </div>
                          </div>
                        </div>)}
                    </div>
                    {selectedButton == 0 && ClientNotification.length > 0 &&
                      <div className="container-fluid w-85 px-4 mt-4 align-items-center d-flex flex-row">
                        {!CheckGICTC ? (
                          <div class="d-flex flex-column row-gap-3 form-inline w-100 position-relative" style={{ inset: '4px' }}>
                            <div className="w-100 d-flex justify-content-center">
                              <input class="form-control mr-sm-2 w-75 rounded-pill"
                                type="search" placeholder="Enter GICTC Code"
                                aria-label="Search"
                                style={{ width: "200px" }}
                                value={GICTCText}
                                onChange={(e) => setGICTCText(e.target.value)}
                              />
                            </div>
                            <div className="d-flex column-gap-2">
                              <button className="btn btn-outline-connect1 rounded-pill"
                                role="button"
                                onClick={() => {
                                  setCheckGICTC(false)
                                  setSelectedButton(3)
                                }}>
                                  Back
                              </button>
                              <button
                                onClick={handleSubmit}
                                class="btn btn-connect text-white rounded-pill d-mg-block d-lg-block my-2 my-sm-0" type="submit">
                                Submit
                              </button>
                            </div>
                          </div>
                        ):(
                          <div class="form-inline d-flex justify-content-around w-100 position-relative" style={{ inset: '4px' }}>

                            <div className="w-75 d-flex justify-content-center">
                              <input class="form-control mr-sm-2 w-100 rounded-pill" type="search" placeholder="Search" aria-label="Search"
                                value={searchText}
                                onChange={handleSearchChange} />
                            </div>
                            <div className="d-flex column-gap-2">
                              <button className="btn btn-outline-connect1 rounded-pill"
                                role="button"
                                onClick={() => {
                                  setCheckGICTC(false)
                                  setSelectedButton(3)
                                }}
                              >Back</button>
                            </div>
                          </div>
                        )}
                      </div>
                    }
                    {selectedButton == 0 &&
                      <div className="px-4 pt-3"
                      // style={{maxHeight:"700px",overflowY:"scroll"}}
                      >
                        {selectedButton == 0 && filteredNotifications.length > 0 ?
                          (CheckGICTC && filteredNotifications.map(item => (
                            <div className="bg-white container my-1 py-0 w-100" >
                              <div style={{ borderBottom: "1px solid rgba(128, 128, 128, 0.38)" }}>
                                <div className="d-flex flex-row align-items-center py-2">
                                  <div className="" style={{ margin: "20px" }}>
                                    <div class="form-check">
                                      <input class="form-check-input border-dark" type="checkbox"
                                        onClick={(e) => handleCheckboxClick(e, item._id)}
                                        value={item._id} id="flexCheckDefault" />
                                    </div>
                                  </div>
                                  <img
                                    src={BASE_URL + item.profile_icon}
                                    className="blog-img"
                                    alt="image"
                                    style={{ objectFit: "contain" }}
                                  />
                                  <div className="mx-2 my-auto w-50">
                                    <h3 className="mb-1" style={{ fontSize: 12, fontWeight: 600 }}>
                                      {item.title}
                                    </h3>
                                    <p className="fontcontent2 text-secondary1 mb-0">
                                      {item?.industry_data?.title}
                                     </p>
                                  </div>

                                </div>
                              </div>
                            </div>
                          ))) : (
                            <div className="bg-white container d-flex justify-content-between my-1 mx-2 py-0 w-100">
                            </div>
                          )}
                      </div>
                    }

                  </div>
                  {CheckGICTC && selectedButton == 0 &&
                    <div className="d-flex justify-content-center column-gap-2 mt-5">
                      <button className="btn btn-outline-connect1 rounded-pill"
                        role="button"
                        onClick={() => {
                          setCheckGICTC(false)
                          setSelectedButton(3)
                        }}
                      >Back</button>
                      <button onClick={() => handleNext()} style={{
                        display: selectedButton != 3 ? "block" : "none"
                      }} className='btn btn-connect1 rounded-pill text-white fontsubtitle w-25'>
                        Join
                      </button>
                    </div>
                  }
                </div>
              </div>
            </div>
          </div>
          <div className="col-6  p-0 colorimage d-none d-md-block d-lg-block" style={{ overflow: "hidden", borderRadius: '0px 30px 30px 0px' }}>
            <div className='d-lg-flex d-md-flex d-none h-100 justify-content-center align-items-center'>
              <img src={"/images/icons/logo.png"} style={{ borderRadius: "0% 5% 5% 0%", width: "300px", height: '190px' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Mainpage;
