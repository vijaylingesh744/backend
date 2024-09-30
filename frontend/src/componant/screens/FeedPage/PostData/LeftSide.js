import React, { startTransition, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import '../style/style.css'
import { t } from 'i18next';
import { capitalizeFirstLetter, CheckGuest, handleImageError, Imagesource, slugify, truncateMiddle } from '../../../utils/Function';
import { BASE_URL } from '../../../utils/ApiRoute';
import FetchData from '../../../fetch-api/Apifetch';
import { RightShimmer } from '../../layout/Shimmer';
const LeftSide = () => {
  const location = useLocation()
  const path = location.pathname
  const UserImg = ["img01.png", "img02.png", "img03.png", "img04.png", "img05.png"]
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('LOGINDATA')).user);
  const [userdata, setUserData] = useState(JSON.parse(localStorage.getItem('LOGINDATA')));
  const [ClientNotification, setClientNotification] = useState([]);
  const [data, setData] = useState(() => {
  const storedData = localStorage.getItem('LOGINDATA');
    return storedData ? JSON.parse(storedData) : null;
  });
  const [PageList, setPageList] = useState([])
  const navigate = useNavigate()
  useEffect(() => {
    percentage()
  }, [data]);

  useEffect(() => {
    UserFollowed()
    ClientNotify()
    GetCount()
  }, [])
  const [count, setCount] = useState(0);
  const [UserCount, setUserCount] = useState(0)
  const GetCount = async()=>{
      const res = await FetchData(`user_count`, "GET", null, false, false);
      if (res.data) {
          setUserCount(res.data)
      }
  }
  const percentage = () => {
    const hasBankInfo = data.BankInfoData != null;
    const hasCompanyName = Array.isArray(data.BusinessInfoData) && data.BusinessInfoData[0]?.company_name != null;
    const hasBusinessRegister = Array.isArray(data.License) && data.License[0]?.BusinessRegister != null;

    const count = [hasBankInfo, hasCompanyName, hasBusinessRegister].filter(Boolean).length;

    console.log(count + 1);
    setCount(count + 1);
  };
  const ClientNotify = async () => {
    try {
      const res = await FetchData(`client_notify/${user?._id}/3`, 'GET', null, true, false)
      if (res.success) {
        console.log("Res::::", res);
        const filterData = res.data.filter(item => item.user_id !== user?._id)
        setClientNotification(filterData)
      }
    } catch (error) {
      console.log(error)
    }
  }


  const UserFollowed = async () => {
    try {
      const res = await FetchData('user/follow/' + user?._id, "GET", null, false, false);
      console.log(res);
      if (res.status) {
        if (res.status) {
          if ([null, 0].includes(user?.gictc_status)) {
            const filteredData = res.data.filter(
              (item) => item.title && !item.title.includes("GICTC")
            );
            setPageList(filteredData);
            console.log(filteredData);
          } else {
            setPageList(res.data)
            //   setPage(res.data);
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div id="left-aside-wrapper p-4">
        <aside id="left-aside" className=''>
          <div id="profile-card" className="bg-white position-relative" style={{ borderRadius: "14px", border: "0.5px solid #dbdbdb" }}>
            <div id="background" className='position-absolute' />
            <div id="profile-info" className='align-items-center position-relative mb-4' style={{ top: '16px' }}>
              <div className='d-flex flex-column w-100 px-3 pb-3' style={{ maxWidth: '100%', borderBottom: "0.5px solid lightgrey" }}>
                <img
                  onClick={() => navigate(`/user/${user?._id}`)}
                  src={`${user?.profile ? `${BASE_URL + user?.profile}` : `/images/profile/img0${user?.randomprofile}.png`}`}
                  alt="Profile picture"
                  className='position-relative mt-2'
                  onError={handleImageError} />

                <div className='d-flex w-100 flex-column mt-2 px-1'>
                  <span id="profile-name" className="fontcontent1 font-weight-bold"  >
                    {user && user?.first_name + " " + user?.last_name}
                  </span>

                  <span className="fontcontent2 text-secondary1">
                    {capitalizeFirstLetter(user?.designation ? user?.designation : "Designation")}
                    <br className='mt-1' />
                  </span>
                </div>

                <div className='d-flex w-100 justify-content-between mt-3 px-1'>
                  <span className='text-secondary1 fontcontent2'>Connections</span>
                  <span className='text-secondary1 fontcontent2'>{user?.totalconnection}</span>
                </div>

                {/* <div className='d-flex w-100 justify-content-between mt-2 px-1'>
                  <span className='text-secondary1 fontcontent2'>Profile views</span>
                  <span className='text-secondary1 fontcontent2'>1.3K</span>
                </div> */}
              </div>

              <div className='w-100 d-flex justify-content-center px-3'>
                <button
                  className='btn w-100 fontsubtitle text-dark1'
                  style={{ background: '#ffc960', borderRadius: "14px", padding: "10px" }}
                  onClick={() => navigate("/user/" + user._id)}
                >
                  View Profile
                </button>
              </div>
            </div>

            {/* {count != 4 && */}
            {false &&
              <div className='d-flex flex-column align-items-center pb-4'>
                <div className='step-item '>
                  <div >
                    <div className=' text-start d-flex align-items-center column-gap-1' style={{ width: 130, maxWidth: 200 }}>
                      <div > <div className='rounded-circle d-flex justify-content-center align-items-center' style={{ width: 20, height: 20, background: "#89C541", position: "relative", top: '0px', color: 'white' }}><img src='/images/icons/check (10).png' style={{ width: '50%' }} /></div> </div>
                      <div className='position-relative' style={{ top: '-10px' }}>
                        <div className='font-weight-light' style={{ fontSize: 10, fontWeight: 500, position: "relative", top: '9px' }}>Step 1</div>
                        <div style={{ fontSize: 12, fontWeight: 500, position: "relative", top: '9px' }}>Personal Info</div>
                        <div className='font-weight-light' style={{ fontSize: 10, fontWeight: 500, position: "relative", top: '9px', color: '#89C541' }}>Completed</div>
                      </div>
                    </div>
                  </div>
                  <div className='line-tag-ver'></div>
                </div>
                <div className='step-item '>
                  <div >
                    <div className=' text-start d-flex align-items-center column-gap-1' style={{ width: 130, maxWidth: 200 }}>
                      <div > <div className='rounded-circle d-flex justify-content-center align-items-center' style={{ width: 20, height: 20, background: "#89C541", position: "relative", top: '0px', color: 'white' }}>
                        {count > 2 ? (
                          <div className='d-flex justify-content-center align-items-center'><img src='/images/icons/check (10).png' style={{ width: '50%' }} /></div>
                        ) : count == 1 ? (
                          <div className="rounded-circle" style={{ width: '10px', height: '10px', background: "white" }}></div>
                        ) : (
                          <div></div>
                        )
                        }</div> </div>
                      <div className='position-relative' style={{ top: '-10px' }}>
                        <div className='font-weight-light' style={{ fontSize: 10, fontWeight: 500, position: "relative", top: '9px' }}>Step 2</div>
                        <div style={{ fontSize: 12, fontWeight: 500, position: "relative", top: '9px' }}>Business Info</div>
                        {count > 2 ? (
                          <div className='font-weight-light' style={{ fontSize: 10, fontWeight: 500, position: "relative", top: '9px', color: '#89C541' }}>Completed</div>
                        ) : (
                          <div className='font-weight-light' style={{ fontSize: 10, fontWeight: 500, position: "relative", top: '9px', color: '#7193D5' }}>Pending</div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className='line-tag-ver'></div>
                </div>
                <div className='step-item '>
                  <div >
                    <div className=' text-start d-flex align-items-center column-gap-1' style={{ width: 130, maxWidth: 200 }}>
                      <div > <div className='rounded-circle d-flex justify-content-center align-items-center' style={{ width: 20, height: 20, background: "#89C541", position: "relative", top: '0px', color: 'white' }}>
                        {count > 2 ? (
                          <div className='d-flex justify-content-center align-items-center'><img src='/images/icons/check (10).png' style={{ width: '50%' }} /></div>
                        ) : count == 2 ? (
                          <div className="rounded-circle" style={{ width: '10px', height: '10px', background: "white" }}></div>
                        ) : (
                          <div></div>
                        )
                        }
                      </div> </div>
                      <div className='position-relative' style={{ top: '-10px' }}>
                        <div className='font-weight-light' style={{ fontSize: 10, fontWeight: 500, position: "relative", top: '9px' }}>Step 3</div>
                        <div style={{ fontSize: 12, fontWeight: 500, position: "relative", top: '9px' }}>Verify Document</div>
                        {count > 2 ? (
                          <div className='font-weight-light' style={{ fontSize: 10, fontWeight: 500, position: "relative", top: '9px', color: '#89C541' }}>Completed</div>
                        ) : (
                          <div className='font-weight-light' style={{ fontSize: 10, fontWeight: 500, position: "relative", top: '9px', color: '#7193D5' }}>Pending</div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className='line-tag-ver'></div>
                </div>
                <div className='step-item'>
                  <div >
                    <div className=' text-start d-flex align-items-center column-gap-1' style={{ width: 130, maxWidth: 200 }}>
                      <div > <div className='rounded-circle d-flex justify-content-center align-items-center' style={{ width: 20, height: 20, background: "#89C541", position: "relative", top: '0px', color: 'white' }}>
                        {count == 4 ? (
                          <div className='d-flex justify-content-center align-items-center'><img src='/images/icons/check (10).png' style={{ width: '50%' }} /></div>
                        ) : count == 3 ? (
                          <div className="rounded-circle" style={{ width: '10px', height: '10px', background: "white" }}></div>
                        ) : (
                          <div></div>
                        )
                        }
                      </div> </div>
                      <div className='position-relative' style={{ top: '-10px' }}>
                        <div className='font-weight-light' style={{ fontSize: 10, fontWeight: 500, position: "relative", top: '9px' }}>Step 4</div>
                        <div style={{ fontSize: 12, fontWeight: 500, position: "relative", top: '9px' }}>Bank Info</div>
                        {count == 4 ? (
                          <div className='font-weight-light' style={{ fontSize: 10, fontWeight: 500, position: "relative", top: '9px', color: '#89C541' }}>Completed</div>
                        ) : (
                          <div className='font-weight-light' style={{ fontSize: 10, fontWeight: 500, position: "relative", top: '9px', color: '#7193D5' }}>Pending</div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            }
          </div>
          {path == '/feed-page' &&
          <>
          
            <div className='container-fluid py-2 px-0 newsbox mt-3 position-sticky' >
              <div className='px-3 pb-2' style={{ borderBottom: '0.5px solid lightgrey' }}>
                <div className='py-2 '>
                  <img src='/images/icons/newicon.png' className='' alt='image' style={{ objectFit: 'contain', width: '30px', height: '30px' }} />
                  <span className='mb-0 ml-3 text-secondary1 fontcontent2' role="button"
                    onClick={() => navigate("/connections")}
                  >My Connections</span>
                </div>
                <div className='py-2'>
                  <img src='/images/icons/newicon2.png' className='' alt='image' style={{ objectFit: 'contain', width: '30px', height: '30px' }} />
                  <span className='mb-0 ml-3 text-secondary1 fontcontent2' role="button"
                   onClick={() => navigate("/list_page")}
                  >My Pages</span>
                </div>
                <div className='py-2'>
                  <img src='/images/icons/newicon1.png' className='' alt='image' style={{ objectFit: 'contain', width: '30px', height: '30px' }} />
                  <span className='mb-0 ml-3 text-secondary1 fontcontent2' role="button"
                    onClick={() => navigate("/notify")}
                  >Notifications</span>
                </div>
              </div>
              <div className='d-flex justify-content-center py-2'>
                <span className='fontcontent1 text-secondary1 font-weight-light'>Discover More</span>
              </div>
            </div>
            <div className='container-fluid px-0 newsbox mt-3 pb-3 position-sticky
             d-flex justify-content-center flex-column align-items-center'  
             style={{top:'60px'}}>
              <div className='card w-90 mt-2 bg-connect mb-1'>
              <div className='px-3 pb-2 position-sticky' style={{top:'60px'}}>
                <div className='py-2 d-flex justify-content-center mb-1'>
                  <img src='/images/feed_images/total_user.png' className='mb-0 mt-2 rounded-circle' alt='image' style={{ objectFit: 'cover',
                     width: '60px', height: '60px' }} />
                </div>
                {/* <h2 className='text-center btn-outline-connect-2 mb-1' style={{fontSize:"17px"}}>{UserCount}</h2> */}
                <div className='d-flex justify-content-between align-items-center pb-2 border-bottom-light'><p className='text-white mb-1 fontcontent2'>Total no of users in <br/>"Connect Souq"</p>
                <p className='text-white mb-1 fontcontent2 text-center'>{UserCount}</p>
                </div>
                <div className='d-flex justify-content-between align-items-center mt-2'><p className='text-white mb-1 fonthint'>Review for our <br />Services</p>
                <span className="d-flex my-2 name2">
                    {Array(5)
                      .fill()
                      .map((_, index) => (
                        <i
                          key={index}
                          className="fas fa-star fonthint"
                          aria-hidden="true"
                          style={{ color: "yellow" }}
                        />
                      ))}
                  </span>
                </div>
                
                {/* <button class="btn btn-connect rounded-01 fonthint py-1" style="font-weight: 600; min-width: 65px;">Message</button> */}
              </div>
              </div>
              <p className='text-secondary1 fontcontent2 text-center px-4'>“People are joining Connect Souq. 
                You can invite others to join”</p>

                <button className='btn btn-connect py-1 px-3 rounded-1 fonthint'>Invite</button>
            </div>
            </>
          }
         

          <div className='container-fluid bg-transparent d-none'>
            <div className='d-flex flex-wrap mt-3 px-2 column-gap-1 moreoptions row-gap-3 justify-content-around'>
              <span className='text-secondary1 fontcontent2'>about</span>
              <span className='text-secondary1 fontcontent2' >advertisement</span>
              <span className='text-secondary1 fontcontent2'>helpCenter</span>
              <span className='text-secondary1 fontcontent2'>privacyTerms</span>
              <span className='text-secondary1 fontcontent2'>adChoices</span>
              <span className='text-secondary1 fontcontent2'>advertising</span>
              <span className='text-secondary1 fontcontent2'>businessServices</span>
              <span className='text-secondary1 fontcontent2'>getApp</span>
              <span className='text-secondary1 fontcontent2'>more</span>
            </div>
          </div>

          {ClientNotification.length == 0 && (path == '/demo-feed-page' || path.includes('user/')) &&
            <RightShimmer />
          }
          {ClientNotification.length > 0 && (path == '/demo-feed-page' || path.includes('user/')) &&
            <div style={{ position: "sticky", right: 0, top: 60 }}>
              <div className='container-fluid py-4 newsbox mt-3' >
                <h3 className='fontsubtitle mb-1' style={{ color: "#4535C1" }}>Recommended Connections</h3>
                {ClientNotification && ClientNotification.slice(0, 4).map((item, index) => (
                  <div style={{ borderBottom: "1px solid #80808061" }}>
                    <div className='d-flex flex-row py-2'>
                      <img src={Imagesource(item?.userdata?.profile)} onError={handleImageError} className='blog-img' alt='image' style={{ objectFit: 'contain' }} />
                      <div className='mx-2 my-auto w-40'>
                        <h3 className='mb-0' style={{ fontSize: '12px', fontWeight: '600', whiteSpace: 'nowrap', width: '90%', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item?.userdata?.first_name}&nbsp;{item?.userdata?.last_name}</h3>
                        <span className='newsfeed1 mb-0 fonttitle mb-0 fonthint'> {item?.userdata?.totalconnection} connections </span>
                        <p className='newsfeed1 mb-0 fonttitle mb-0 fonthint'>
                          {item.userdata.user_type == 0 ? "Buyer" : item.userdata.user_type == 2 ? 'Seller' : item.userdata.user_type == 1 ? 'Business Partner' : 'Select User'}
                        </p>

                      </div>
                      <div className='' style={{ margin: 'auto' }}>
                        <button onClick={() => navigate(`/user/` + item.userdata._id)} className='btn btn-connect d-flex justify-content-center text-center fonthint rounded-01 py-1' style={{ fontWeight: '700' }}>
                          View
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          }
          {/* { location.pathname == '/feed-page' && PageList.length > 0 &&
<div>
          <div className=" container-fluid py-3 newsbox">
            <h3 className="fontsubtitle mb-1" style={{ color: "#4535C1" }}>
              Following pages
            </h3>
            {PageList &&
              PageList.slice(0, 3).map((item, index) => (
                <div
                  style={{
                    borderBottom:
                    PageList.length != index + 1 ? "1px solid #80808061" : "none",
                  }}
                >
                  <div
                    className="d-flex flex-row py-3 align-items-end"
                    // onClick={()=>navigate('/pages',{state:item})}
                  >
                    <img
                      src={BASE_URL + item?.profile_icon}
                      className="blog-img"
                      alt="image"
                      style={{ objectFit: "contain" }}
                    />
                    <div
                      className="mx-2 my-auto w-50"
                      style={{ cursor: "pointer", maxWidth: "45%" }}
                      onClick={() =>
                        // navigate(`/pages/${item._id}`, { state: item})
                        (window.location.href = `/pages/${slugify(
                          item?.title
                        )}`)
                      }
                    >
                      <h3
                        className="mb-1 text-dark1"
                        style={{
                          fontSize: "12px",
                          fontWeight: "500",
                          width: "165%",
                          //  whiteSpace: 'nowrap',
                          // textOverflow: 'ellipsis', width: '100%', overflow: 'hidden'
                        }}
                      >
                        {item?.title}
                      </h3>
                      <p
                        className="mb-0 fonthint"
                        //  style={{whiteSpace: 'nowrap',
                        //     textOverflow: 'ellipsis', width: '100%', overflow: 'hidden'}}
                      >
                        {item.industry_data?.title}
                      </p>
                      <p className="newsfeed1 mb-0 fonthint">
                        {item?.page_follow_data?.length}&nbsp;Followers
                      </p>
                    </div>
                    <div className="">
                      <button
                        onClick={() => {
                          if (CheckGuest()) {
                            console.log("Guest");
                            //  navigate('/pages', { state: {...item,...{page_data:item}} })
                            window.location.href = `/pages/${slugify(
                              item?.title
                            )}`;
                          } 
                        //   else {
                        //     removeconnection(item?.page_follow_data_id);
                        //   }
                        }}
                        className="btn btn-outline-connect p-1 rounded-01 d-flex justify-content-center text-center fonthint"
                        style={{ fontWeight: "600", maxWidth: "65px" }}
                      >
                        Following
                      </button>
                    </div>
                  </div>
                </div>
              ))}

            {PageList.length > 3 && (
              <div className="d-flex justify-content-center pt-3" role="button">
                <span
                  className="fontcontent1 font-weight-normal text-dark1"
                  onClick={() => {
                    startTransition(() => {
                      navigate(`/list_page`);
                    });
                  }}
                >
                  See all pages
                </span>
              </div>
            )}
          </div>
        </div>
} */}
        </aside>
      </div>
    </>
  )
}
export default LeftSide