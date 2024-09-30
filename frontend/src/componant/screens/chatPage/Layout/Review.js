import { async } from '@firebase/util'
import React, { startTransition, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Rating } from 'react-simple-star-rating'
import { toast } from 'react-toastify'
import FetchData from '../../../fetch-api/Apifetch'
import { checkBusinessInfo } from '../../../utils/Function'
import './style/layout.css';
import io from 'socket.io-client';
import { BASE_URL } from '../../../utils/ApiRoute'

const socket = io(BASE_URL);

export const RatingViewOne = ({ setSwipe,
  selectedItem,
  SouqStatus,
  ClassActive,
  UserImg,
  setNotifyActive }) => {
  const getIcon = (index) => {
    const stageId = selectedItem?.project_data?.StageId;
    if (index + 1 < stageId) {
      return <img src='/images/icons/check (10).png' style={{ width: '10px', height: '10px' }} />;
    } else if (index + 1 === stageId) {
      return <div className='rounded-circle' style={{ width: '10px', height: '10px', background: 'white' }}></div>;
    } else {
      return null;
    }
  };
  useEffect(() => {
    console.log(SouqStatus);
  }, []);
  return (
    <div>
      <div className="align-items-center background4 column-gap-2 d-flex p-2 border border-left-0">
        <img src="/images/icons/arrow.png" style={{ width: 20, height: 20 }} onClick={() => setSwipe(2)} />
        <img src={`/images/profile/${UserImg[selectedItem?.users?.randomprofile]}`} style={{ width: 50, height: 50 }} />
        <div className="d-flex flex-column gap1">
          <span className="name1grey">{selectedItem?.users?.first_name + " " + selectedItem?.users?.last_name} </span>
          <span className="name2">$10M+ Sales</span>
          <span className="name2">3 Coins </span>
        </div>
      </div>
      <div className="px-1 py-2 ">
        <div
          className="m-0 p-1 row"
          style={{
            backgroundColor: "rgb(255, 255, 255)",
            boxShadow: "#00000087 0px 6px 11px -9px"
          }}>
          <div className="d-flex col-12">
            <div className='d-flex flex-column align-items-center w-100'>
              <div className='step-item1'>
                <div >
                  <div className=' text-start d-flex align-items-center column-gap-4' style={{ width: 170, maxWidth: 200 }}>
                    <div > <div className='rounded-circle d-flex justify-content-center align-items-center' style={{ width: 20, height: 20, background: "#89C541", position: "relative", top: '9px', color: 'white' }}><img src='/images/icons/check (10).png' style={{ width: '10px', height: '10px' }} /></div> </div>
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 500, position: "relative", top: '9px' }}>Request accepted</div>
                      {/* <div className='font-weight-light' style={{ fontSize: 10, fontWeight: 500,position: "relative",top: '9px',color:'#89C541'}}>Completed</div> */}
                    </div>
                  </div>
                </div>
                <div className='line-tag-ver1'></div>
              </div>
              {/* {SouqStatus.map((item, index) => (
                              <div className='step-item1 '>
                              <div >
                                <div className=' text-start d-flex align-items-center column-gap-4' style={{ width: 170, maxWidth: 200 }}>
                                <div > <div className={`rounded-circle d-flex justify-content-center align-items-center ${ClassActive(index + 1)}`}  style={{width:20,height:20,background:"#89C541",position: "relative",top: '9px',color:'white'}}><i className="fa fa-solid fa-circle text-white" aria-hidden="true" /></div> </div>
                                   <div> 
                                    <div style={{ fontSize: 12, fontWeight: 500,position: "relative",top: '9px' }}>{item}</div>
                                   </div>
                                </div>
                            </div>
                            <div className='line-tag-ver1'></div>
                        </div>
                            ))} */}
              {/* {SouqStatus.map((item, index) => (
                <div className='step-item1' key={index}>
                  <div className='text-start d-flex align-items-center column-gap-4' style={{ width: 170, maxWidth: 200 }}>
                    <div>
                      <div className={`rounded-circle d-flex justify-content-center align-items-center ${ClassActive(index + 1)}`} style={{ width: 20, height: 20, background: "#89C541", position: "relative", top: '9px', color: 'white' }}>
                        {getIcon(index)}
                      </div>
                    </div>
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 500, position: "relative", top: '9px' }}>{item}</div>
                    </div>
                  </div>
                  <div className='line-tag-ver1'></div>
                </div>
              ))} */}
              {SouqStatus.map((item, index) => {
                const stageId = selectedItem?.project_data?.StageId;
                const isActive = index + 1 <= stageId;
                const isActives = index + 2 <= stageId;
                const backgroundColor = isActive ? "#89C541" : "#CDCDCD";
                const borderColor = isActives ? "#89C541" : "#CDCDCD";
                return (
                  <div className='step-item1' key={index}>
                    <div className='text-start d-flex align-items-center column-gap-4' style={{ width: 170, maxWidth: 200 }}>
                      <div>
                        <div className={`rounded-circle d-flex justify-content-center align-items-center ${ClassActive(index + 1)}`} style={{ width: 20, height: 20, background: backgroundColor, position: "relative", top: '9px', color: 'white' }}>
                          {getIcon(index)}
                        </div>
                      </div>
                      <div>
                        <div style={{ fontSize: 12, fontWeight: 500, position: "relative", top: '9px', width: 'max-content' }}>{item}</div>
                      </div>
                    </div>
                    <div className='line-tag-ver1' style={{ borderLeftColor: borderColor, borderLeftWidth: '2px', borderLeftStyle: 'solid' }}></div>
                  </div>
                );
              })}
              {/* <div className='step-item '>
                                  <div >
                                    <div className=' text-start d-flex align-items-center column-gap-1' style={{ width: 130, maxWidth: 200 }}>
                                    <div > <div className='rounded-circle d-flex justify-content-center align-items-center'  style={{width:20,height:20,background:"#89C541",position: "relative",top: '9px',color:'white'}}>
                                    {count > 2 ? (
                                            <div><i className="fa fa-check text-white" aria-hidden="true"></i></div>
                                        ) : count == 1 ? (
                                            <div className="rounded-circle" style={{width:'10px',height:'10px',background:"white"}}></div>   
                                            ):(
                                            <div></div>   
                                        )
                                            }</div> </div>
                                       <div> 
                                        <div className='font-weight-light' style={{ fontSize: 10, fontWeight: 500,position: "relative",top: '9px' }}>Step 2</div>
                                        <div style={{ fontSize: 12, fontWeight: 500,position: "relative",top: '9px' }}>Business Info</div>
                                        {count > 2 ? (
                                         <div className='font-weight-light' style={{ fontSize: 10, fontWeight: 500,position: "relative",top: '9px',color:'#89C541'}}>Completed</div> 
                                        ):(
                                          <div className='font-weight-light' style={{ fontSize: 10, fontWeight: 500,position: "relative",top: '9px',color:'#7193D5'}}>Pending</div> 
                                        )}
                                       </div>
                                    </div>
                                </div>
                                <div className='line-tag-ver'></div>
                            </div>
                                <div className='step-item '>
                                  <div >
                                    <div className=' text-start d-flex align-items-center column-gap-1' style={{ width: 130, maxWidth: 200 }}>
                                    <div > <div className='rounded-circle d-flex justify-content-center align-items-center'  style={{width:20,height:20,background:"#89C541",position: "relative",top: '9px',color:'white'}}>
                                        {count > 2 ? (
                                            <div><i className="fa fa-check text-white" aria-hidden="true"></i></div>
                                        ): count == 2 ? (
                                            <div className="rounded-circle" style={{width:'10px',height:'10px',background:"white"}}></div>   
                                            ):(
                                            <div></div>   
                                        )
                                        }
                                        </div> </div>
                                       <div> 
                                        <div className='font-weight-light' style={{ fontSize: 10, fontWeight: 500,position: "relative",top: '9px' }}>Step 3</div>
                                        <div style={{ fontSize: 12, fontWeight: 500,position: "relative",top: '9px' }}>Verify Document</div>
                                        {count > 2 ? (
                                         <div className='font-weight-light' style={{ fontSize: 10, fontWeight: 500,position: "relative",top: '9px',color:'#89C541'}}>Completed</div> 
                                        ):(
                                          <div className='font-weight-light' style={{ fontSize: 10, fontWeight: 500,position: "relative",top: '9px',color:'#7193D5'}}>Pending</div> 
                                        )}   
                                        </div>
                                    </div>
                                </div>
                                <div className='line-tag-ver'></div>
                            </div>
                                <div className='step-item '>
                                  <div >
                                    <div className=' text-start d-flex align-items-center column-gap-1' style={{ width: 130, maxWidth: 200 }}>
                                    <div > <div className='rounded-circle d-flex justify-content-center align-items-center'  style={{width:20,height:20,background:"#89C541",position: "relative",top: '9px',color:'white'}}>
                                    {count == 4 ? (
                                            <div><i className="fa fa-check text-white" aria-hidden="true"></i></div>
                                        ): count == 3 ? (
                                            <div className="rounded-circle" style={{width:'10px',height:'10px',background:"white"}}></div>   
                                            ):(
                                            <div></div>   
                                        )
                                        }
                                        </div> </div>
                                       <div> 
                                        <div className='font-weight-light' style={{ fontSize: 10, fontWeight: 500,position: "relative",top: '9px' }}>Step 4</div>
                                        <div style={{ fontSize: 12, fontWeight: 500,position: "relative",top: '9px' }}>Bank Info</div>
                                        {count == 4 ? (
                                         <div className='font-weight-light' style={{ fontSize: 10, fontWeight: 500,position: "relative",top: '9px',color:'#89C541'}}>Completed</div> 
                                        ):(
                                          <div className='font-weight-light' style={{ fontSize: 10, fontWeight: 500,position: "relative",top: '9px',color:'#7193D5'}}>Pending</div> 
                                        )}    
                                   </div>
                                    </div>
                                </div>
                            </div> */}
              {/* {SouqStatus.map((item, index) => (
                            <div className='step-item '>
                                  <div >
                                    <div className=' text-start d-flex align-items-center column-gap-1' style={{ width: 130, maxWidth: 200 }}>
                                    <div className={`step-number ${ClassActive(index + 1)}`}> <div className='rounded-circle'  style={{width:20,height:20,background:"#89C541",position: "relative",top: '9px' }}></div> </div>
                                       <div> 
                                        <div className='font-weight-light' style={{ fontSize: 10, fontWeight: 500,position: "relative",top: '9px' }}>Step {item.step}</div>
                                        <div style={{ fontSize: 12, fontWeight: 500,position: "relative",top: '9px' }}>{item.title}</div>
                                       </div>
                                    </div>
                                </div>
                                <div className='line-tag'></div>
                            </div>
                        ))} */}
            </div>
            {/* {SouqStatus.map((item, index) => (
                <div className='step-item mt-5'>
                  <div className='line-tag'></div>
                  <div >
                    <div className={`step-number ${ClassActive(index + 1)}`}> <i className="fa fa-check text-white" aria-hidden="true"></i></div>
                    <div className='pt-5 mb-5 text-start' style={{ width: 140, maxWidth: 200 }}>
                      <div style={{ fontSize: 12, fontWeight: 500 }}>{item}</div>
                    </div>
                  </div>
                </div>
              ))} */}
          </div>
        </div>
      </div>
    </div>
  )
}
export const RatingVeiw = ({ setSwipe,
  selectedItem,
  UserImg,
  setNotifyActive }) => {
  const [counts, setCounts] = useState([0, 0, 0, 0, 0]);
  const navigate = useNavigate()
  const [userData, setUser] = useState(JSON.parse(localStorage.getItem("LOGINDATA"))?.user)
  const Businessinfo = JSON.parse(localStorage.getItem("LOGINDATA"))?.BusinessInfoData;
  useEffect(() => {
    if (selectedItem?._id) {
      showRatingAndReview()
    }
  }, [selectedItem]);
  const showRatingAndReview = async () => {
    console.log(selectedItem);
    try {
      const res = await FetchData(`review/${selectedItem?._id}`, 'GET', null, true, false);
      console.log(res);
      const newCounts = [0, 0, 0, 0, 0];
      res.data.forEach(item => {
        const rating = parseInt(item.rating);
        if (rating >= 1 && rating <= 5) {
          newCounts[rating - 1]++;
        }
      });
      setCounts(newCounts);
    } catch (err) {
      console.log(err);
    }
  }
  const totalRatings = counts.reduce((acc, count) => acc + count, 0);
  const checkRequiredData = async (id) => {
    const data = {
      sender: userData?._id,
      receive: id,
    }
    const res = await FetchData(`chatlist/add`, 'POST', JSON.stringify(data), true, false);
    const agreedata = {
      name: userData?.first_name + " " + userData?.last_name,
      bp_id: id,
      buyer_seller: userData?.user_type,
      user_id: userData?._id,
      sector: Businessinfo?.company_name || "nil",
      city: userData?.city || '',
      country: userData?.country || '',
      phone: userData?.phone || '123456',
      commision: "Percentage",
      valid_to: new Date().toISOString().slice(0, 10),
      valid_from: new Date().toISOString().slice(0, 10),
    };
    const formdata = new FormData();
    formdata.append("data", JSON.stringify(agreedata));
    try {
      const res = await FetchData('agreement', 'POST', formdata, true, true);
      socket.emit('sendNotification',{...data,["con"]:true})
      window.location.reload()
    } catch (error) {
      console.log("Error in fetching data: " + error.message);
    }
    // var present = await checkBusinessInfo()
    // console.log(present)
    //   if (true) {
    //     // Logic to move to the next page
    //     console.log("All required data is present. Moving to the next page...");
    //     navigate(`/terms/${id}`)
    //     // For example, you might use history.push("/nextPage") if you're using react-router
    // } else {
    //     // Show alert
    //     toast.warning("Please fill in all required fields before proceeding.");
    //     navigate(`/profile`)
    // }
  }
  return (
    <>
      <div className="border m-0 container d-flex justify-content-between py-2 rounded-0 background4">
        <div className="d-flex column-gap-2 align-items-center">
          <img src="/images/icons/arrow.png" style={{ width: 20, height: 20 }} onClick={() => setSwipe(0)} />
          <img src={`/images/profile/${UserImg[selectedItem?.randomprofile]}`} style={{ width: 50, height: 50 }} />
          <div className="d-flex flex-column gap">
            <span className="name1grey">{selectedItem?.first_name + " " + selectedItem?.last_name} </span>
            <span className="name2">$10M+ Sales</span>
            <span className="name2">3 Coins </span>
          </div>
        </div>
      </div>
      <div className="chat-container container-fluid mt-1 py-3">
        <div className="chat-messages">
          <h3 className="font-weight-bold mb-4 fonttitle">Rating and Reviews</h3>
          <div className="container d-flex justify-content-center py-1 align-items-center mb-4 flex-wrap">
            <div className="d-flex flex-column justify-content-center px-4"
              style={{ borderRight: "1px solid grey" }}
            >
              <p className="font-weight-bold">Total Reviews</p>
              <h1>10.0K</h1>
              <p style={{ color: "grey" }}>Growth in Reveiws on This year </p>
            </div>
            <div className="d-flex flex-column justify-content-center px-4"
              style={{ borderRight: "1px solid grey" }}
            ><p className="font-weight-bold">Average Rating</p>
              <div className="align-items-center d-flex">
                <h1>4.1</h1>
                <span className="d-flex">
                  {Array(5).fill().map((_, i) => (
                    <i className="fas fa-star" style={{ color: i < 4 ? "yellow" : null }} />
                  ))}
                </span>
              </div>
              <p style={{ color: "grey" }}>Average Rating on this year</p>
            </div>
            <div>
              <div className="d-flex flex-column-reverse  gap align-items-end px-4">
                {Array(5).fill().map((_, index) => {
                  const percentage = totalRatings ? (counts[index] / totalRatings) * 200 : 0;
                  return (
                    <div key={index} className="d-flex justify-content-around align-items-center range-slider column-gap-2">
                      <span>{index + 1}</span>
                      <div>
                        <div className="range" style={{ backgroundImage: `linear-gradient(to right, #4535C1 ${percentage}%, #D9D9D9 ${percentage}%)` }}></div>
                      </div>
                      {/* <span>Count: {counts[index]}</span> */}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="  p-3 d-flex" style={{ borderRadius: "10px" }}>
            <div>
              <img src="/images/profile/img02.png" width="70px" />
            </div>
            <div className='ml-3 mb-0'>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <p className='mb-0 font-weight-bold fontsubtitle'>Jhone Deo</p>
                <a href='' ><i class="fa fa-ellipsis-v" aria-hidden="true"></i></a>
              </div>
              <p className='fontcontent1'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat</p>
            </div>
          </div>
          <div className="  p-3 d-flex" style={{ borderRadius: "10px" }}>
            <div>
              <img src="/images/profile/img02.png" width="70px" />
            </div>
            <div className='ml-3 mb-0'>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <p className='mb-0 font-weight-bold fontsubtitle'>Jhone Deo</p>
                <a href='' ><i class="fa fa-ellipsis-v" aria-hidden="true"></i></a>
              </div>
              <p className='fontcontent1'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat</p>
            </div>
          </div>
        </div>
        <div className='d-flex justify-content-center mt-3'>
          <button className="btn w-25 mx-1 d-flex justify-content-center align-items-center"
            style={{
              width: "240px", height: "50px",
              background: "#F0F0F0"
            }}
            onClick={(e) => {
              setSwipe(0)
              setNotifyActive(-4)
            }}
          >
            Cancel
          </button>
          <button className="btn text-white w-25 mx-1 d-flex justify-content-center align-items-center"
            style={{
              width: "240px", height: "50px",
              background: "#4535C1"
            }}
            onClick={() => {
              startTransition(()=>{ 
            navigate(`/terms/${selectedItem?._id}`)})
          }
        }
          >
            Lets Connect
          </button>
        </div>
      </div>
    </>
  )
}
export const AddRatingReview = ({ setSwipe,
  selectedItem,
  SouqStatus,
  ClassActive,
  UserImg,
  setNotifyActive }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("LOGINDATA"))?.user)
  const [rating, setRating] = useState(0)
  const [formdata, setformdata] = useState({
    bp_id: selectedItem?.users?._id,
    user_id: user?._id,
    rating: 0,
    review: ""
  });
  const handleRating = (rate) => {
    setRating(rate)
    setformdata(prevFormdata => ({
      ...prevFormdata,
      rating: rate,
      bp_id: selectedItem?.users?._id
    }));
    // other logic
  }
  const onPointerEnter = () => console.log('Enter')
  const onPointerLeave = () => console.log('Leave')
  const onPointerMove = (value, index) => console.log(value, index)
  const handleRatingReview = async () => {
    try {
      const res = await FetchData("review", 'POST', JSON.stringify(formdata), true, false)
      if (res.success) {
        setSwipe(2)
        setformdata({})
      }
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <>
      <div id="main-wrapper background4" className=" d-block h-100">
        <div
          className="container-fluid row d-flex justify-content-between py-2 pl-4 background"
          style={{ position: "sticky", top: "-1%" }}>
          <div className="d-flex column-gap-2 align-items-center" >
            <img src="/images/icons/arrow.png" style={{ width: 20, height: 20 }} onClick={() => setSwipe(2)} />
            <img src={`/images/profile/${UserImg[selectedItem?.users?.randomprofile]}`}
              style={{ width: 33, height: 33 }} />
            <div className="d-flex flex-column">
              <span className="chatname">{selectedItem?.users?.first_name + " " + selectedItem?.users?.last_name}</span>
            </div>
          </div>
        </div>
        <div className='col-12 py-5 mt-5 bg-light rounded'>
          <form className='d-flex flex-column align-items-center'>
            <div>
              <div className="form-group d-flex flex-column align-items-center ">
                <label className="fs-1 fw-semibold fontsubtitle font-weight-bold">Add Rating:</label>
                <div className="Rating_star_icons fs-2 ">
                  <Rating
                    onClick={handleRating}
                    onPointerEnter={onPointerEnter}
                    onPointerLeave={onPointerLeave}
                    onPointerMove={onPointerMove}
                  /* Available Props */
                  />
                </div>
              </div>
            </div>
            <div className='w-60'>
              <div className="form-group d-flex flex-column align-items-center">
                <label className="fs-1 fw-semibold fontsubtitle font-weight-bold">Add Comment:</label>
                <textarea className="form-control w-100 my-2 fontsubtitle" placeholder='give feedback to your business partner' onChange={(e) => {
                  setformdata({ ...formdata, ['review']: e.target.value })
                }} rows="3"></textarea>
              </div>
            </div>
            <button type="button" onClick={() => { handleRatingReview() }} className="btn px-5 py-2 fs-5 text-white" style={{ background: "#4535C1" }}>Submit</button>
          </form>
        </div>
      </div>
    </>
  )
}