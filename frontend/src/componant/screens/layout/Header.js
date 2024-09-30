import React, { startTransition, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import "../FeedPage/style/style.css";
import "./Style/Alert.css";
import { CheckGuest, handleImageError, RedirectRoute, updateData } from '../../utils/Function';
import { BASE_URL } from '../../utils/ApiRoute';
import io from 'socket.io-client';
import ModalPopup from '../../utils/ModalPopup';
import {ListBadgeCount} from '../chatPage/function/chatSeen'
import { Container } from 'react-bootstrap';
import AlertModal from '../../utils/AlertModal';
const socket = io(BASE_URL);
const Header = ({ handleShow, setTitle, dataList }) => {
  const { t } = useTranslation();
  const location = useLocation();
  const currentRoute = location.pathname;
  const [logoutmodel, setLogoutmodel] = useState(false);
  const [showAlert, setShowAlert] = useState(localStorage.getItem('notify'))
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("LOGINDATA"))?.user)
  const [showModal, setShowModal] = useState(false);
  const [Search, setSearch] = useState("")
  const [ChatCount, setChatCount] = useState(0)
  const navigate = useNavigate();
  useEffect(() => {
    if (location.pathname == '/notify') {
      setShowAlert(false)
      localStorage.removeItem('notify')
    }
  }, [])

  useEffect(() => {
    const fetchBadgeCount = async () => {
        try {
            const count = await ListBadgeCount(user._id);
            setChatCount(count);
        } catch (error) {
            console.error("Error fetching badge count:", error);
            setChatCount(0); // Handle the error case
        }
    };

    fetchBadgeCount();
}, [user._id]);

  // /list_page
  useEffect(() => {
    socket.on(user?._id + "N", (NotifyData) => {
      if ((NotifyData.receive == user?._id) && NotifyData.con) {
        setShowAlert(true)
        localStorage.setItem('notify', true)
      } else if (NotifyData.con) {
        setShowAlert(false)
      }
    });
    return () => {
      socket.off(user?._id + "N");
    };
  }, []);

  useEffect(() => {
    socket.on(user?._id, (data) => {
      updateData()
    });
    return () => {
      socket.off(user?._id);
    };
  }, []);
  const HeaderArr = [
    {
      Title: "Feeds",
      IconComponent: currentRoute != '/feed-page' ? "/images/icons/home.png" : "/images/icons/home1.png",
      Href: "/feed-page"
    },
    {
      Title: `Chats`,
      IconComponent: currentRoute != '/chats' ? "/images/icons/Chats.png" : "/images/icons/Chats1.png",
      Href: "/chats"
    },

    {
      Title: "Connections",
      IconComponent: currentRoute != '/connections' ? "/images/icons/1Link.png" : "/images/icons/link.png",
      Href: "/connections"
    },
    {
      Title: "Pages",
      IconComponent: currentRoute != '/list_page' ? "/images/icons/page.png" : '/images/icons/pages.png',
      Href: "/list_page"
    },
    {
      Title: "Notifications",
      IconComponent: currentRoute != '/notify' ? "/images/icons/Notify.png" : showAlert ? "/images/icons/Notifyalert.png" : '/images/icons/Notify1.png',
      Href: "/notify"
    },
  ];
  const handleLogout = () => {
    // Swal.fire({
    //   title: 'Are you sure?',
    //   html: '<span style="font-size: 16px; font-weight: bold;">You will be logged out!</span>',
    //   icon: 'warning',
    //   showCancelButton: true,
    //   confirmButtonColor: '#4535C1',
    //   cancelButtonColor: '#d33',
    //   confirmButtonText: 'Logout!',
    //   cancelButtonText: 'Cancel',
    //   customClass: {
    //     confirmButton: 'swal2-confirm-logout-custom',
    //     cancelButton: 'swal2-cancel-logout-custom',
    //     title: 'swal2-title',
    //   },
    //   iconHtml: '<img src="images/icons/log-out.png" style="width: 60px; height: 60px; border:"none" border-radius: 50%;" />',
    // }).then((result) => {
    //   if (result.isConfirmed) {
    //     localStorage.removeItem('VERIFYDATA');
    //     localStorage.removeItem('TRANSACTIONLOGIN');
    //     localStorage.removeItem("LOGINDATA");
    //     RedirectRoute("");
    //   }
    // });
    setShowModal(true)
  };

  const Logoutaccount = () => {
    localStorage.removeItem('VERIFYDATA');
    localStorage.removeItem('TRANSACTIONLOGIN');
    localStorage.removeItem("LOGINDATA");
    RedirectRoute("");
  }

  const UserCheck = () => {
    if (Search.length == 0) return false;
    window.location.href = "/searchresult?search=" + Search
  }

  return (
    <div style={{ display: "flex" }}>
      <div className='search-bar-container'>
        <img id="header-logo" src="/images/icons/logo.png" alt="LinkedIn" />
        <div>
          <div className="align-items-center  mr-4">
            <span className='position-absolute text-white' role="button" style={{ left: '2%' }}
              onClick={() => UserCheck()}
            >
              <i className='fa fa-search text-dark1'
                style={{ color: "#4535C1" }}
              />
            </span>
            <input placeholder={"Search Here"}
              onChange={e => {
                if (currentRoute === '/pavilion') {
                  setTitle(e.target.value);
                  dataList(2);
                } else {
                  setSearch(e.target.value)
                }
              }}
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  UserCheck();
                }
              }}
              className='text-dark'
            />
          </div>
        </div>
      </div>

      <nav>
        <ul style={{ gap: '1px' }}>
          {HeaderArr.map((item, index) => (
            <li style={{ minWidth: '85px' }} onClick={() => { startTransition(() => { navigate(item.Href) }) }} key={index}>
              <div
              className='position-relative'
              >
              {item.Title =="Chats" && ChatCount!= 0  &&
              (<span class="badge-danger fontcontent2 position-absolute rounded-pill"
                style={{    
                  top: "5px",
                  right: "20px",
                  padding:"0.2px 5px"
                }}>{ChatCount}</span>)}
                <img src={item.IconComponent} width={35} height={35} />
                <span className={`nav-item-text fontcontent1 text-center ${currentRoute === item.Href ? "activestop1" : "notactivestop"}`} style={{ minWidth: '50px' }}>{item.Title}</span>
              </div>
            </li>
          ))}
        </ul>
      </nav>
      <div style={{ maxWidth: 'fit-content', width: '20%' }}
        className="ml-2"
        onClick={() => {
          if (CheckGuest()) {
            navigate('/login')
          }
          else { setLogoutmodel(!logoutmodel) }
        }} onMouseLeave={() => setLogoutmodel(false)}>
        <div className='justify-content-end align-items-end flex-row w-100'>
          <span className="nav-item-text d-flex flex-column align-items-center" style={{ cursor: "pointer" }}>
            <img
              src={`${user?.profile ? `${BASE_URL + user?.profile}` : `/images/profile/img0${user?.randomprofile}.png`}`}
              className="rounded-circle"
              width={30}
              height={30}
              alt=""
              onError={handleImageError}
            />
          </span>
          <span className='align-content-center d-flex fonthint ml-1 pb-1' role="button" style={{ width: 'max-content' }}>
            {CheckGuest() ? 'Login' : 'Me'} 	<i className="fa fa-angle-down p-1" />
          </span>
        </div>
        <div
          className={`card P-3 ${logoutmodel ? 'd-none d-md-block d-lg-block' : 'd-none'}`}
          style={{
            position: 'absolute', top: "40px", right: "30px",
            width: '300PX',
            // display: logoutmodel ? "block" : 'none', 
            zIndex: 999
          }}>
          <div className="d-flex p-3 " style={{ flexDirection: 'column' }}>
            <h6 className='mb-4'>User Profile</h6>
            <div>
              <span>
                <img
                  src={`${user?.profile ? `${BASE_URL + user?.profile}` : `/images/profile/img0${user?.randomprofile}.png`}`}
                  className="rounded-circle"
                  width={60}
                  height={60}
                  alt=""
                  onError={handleImageError}
                  role='button'
                  onClick={() => navigate(`/user/${user?._id}`)}
                />
              </span>
              <div className="ms-3 d-flex flex-column ml-3 w-75" style={{ fontSize: '14px' }}>
                <span className="" role='button' onClick={() => navigate(`/user/${user?._id}`)}>{user?.first_name}&nbsp;{user?.last_name}</span>
                <span className="">{user?.user_type === "0" ? 'Buyer' : user?.user_type === "2" ? 'Seller' : user?.user_type === "1" ? "Business Partner" : "Select User"}</span>
                <p className="">
                  <i className="ti ti-mail fs-4" />{user?.gmail}
                </p>
              </div>
            </div>
            <hr />
            <div className='w-100' style={{ fontSize: "14px" }}>
              <ul className="list-group list-group-flush w-100 text-center" style={{ cursor: 'pointer' }}>
                <li className="list-group-item d-flex align-items-center" onClick={() => startTransition(() => { navigate('/profile') })}>
                  <img src="/images/icons/Adduser.png" width={22} />
                  <span className='ml-3'>My Profile</span>
                </li>
                <li className="list-group-item d-flex align-items-center" onClick={() => startTransition(() => { navigate('/subscribe') })}>
                  <img src="/images/icons/subscribe.png" width={22} />
                  <span className='ml-3'>Subscription</span>
                </li>
                <li className="list-group-item d-flex align-items-center" onClick={() => startTransition(() => { navigate('/add_page') })}>
                  <img src="/images/icons/pagecreate.png" width={22} />
                  <span className='ml-3'>Create my page</span>
                </li>
                {user?.user_type != "-1" &&
                  <li className="list-group-item d-flex  align-items-center"
                    onClick={() => {
                      if (localStorage.getItem('TRANSACTIONLOGIN')) { window.location.href = "/bp/dashboard" }
                      else { window.location.href = "/bp/login" }
                    }}>
                    <img src="/images/icons/Dashboard.png" width={22} />
                    <span className='ml-3'>Network</span>
                  </li>}
                <li className="list-group-item d-flex  align-items-center"
                  onClick={() => window.location.href = "/transaction"}>
                  <img src="/bp-assets/images/logos/Projects1.png" width={22} />
                  <span className='ml-3'>Transactions</span>
                </li>
              </ul>
            </div>
            <div className='w-100 mt-2'>
              <button className='btn w-100 btn-outline-success'
                onClick={() => {
                  handleLogout()
                }} >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className={`card ${logoutmodel ? 'd-block d-md-none d-lg-none' : 'd-none'}`} style={{ position: 'absolute', top: "40px", right: "20px", width: '275px', height: 'auto', zIndex: 999 }}>
        <div className="d-flex p-3 w-100" style={{ flexDirection: 'column' }}>
          <h6 className='mb-4'>User Profile</h6>
          <div className='w-100'>
            <span>
              <img
                src={`${user?.profile ? `${BASE_URL + user?.profile}` : `/images/profile/img0${user?.randomprofile}.png`}`}
                className="rounded-circle"
                width={60}
                height={60}
                alt=""
                onError={handleImageError}
                role='button'
                onClick={() => navigate(`/user/${user?._id}`)}
              />
            </span>
            <div className="ms-3 d-flex flex-column ml-3 w-75" style={{ fontSize: '14px' }}>
              <span className="" onClick={() => navigate(`/user/${user?._id}`)}>{user?.first_name}&nbsp;{user?.last_name}</span>
              <span className="">{user?.user_type == 0 ? 'Buyer' : user?.user_type == 2 ? 'Seller' : "Business Partner"}</span>
              <p className="">
                <i className="ti ti-mail fs-4" />{user?.gmail}
              </p>
            </div>
          </div>
          <hr />
          <div className='w-100' style={{ fontSize: "14px" }}>
            <ul className="list-group list-group-flush w-100 text-center" style={{ cursor: 'pointer' }}>
              <li className="list-group-item d-flex align-items-center" onClick={() => navigate('/profile')}>
                <img src="/images/icons/Adduser.png" width={22} />
                <span className='ml-3'>My Profile</span>
              </li>
              <li className="list-group-item d-flex align-items-center" onClick={() => navigate('/subscribe')}>
                <img src="/images/icons/subscribe.png" width={22} />
                <span className='ml-3'>Subscription</span>
              </li>
              <li className="list-group-item d-flex align-items-center" onClick={() => navigate('/add_page')}>
                <img src="/images/icons/pagecreate.png" width={22} />
                <span className='ml-3'>Create my page</span>
              </li>
              {user?.user_type == 1 &&
                <li className="list-group-item d-flex  align-items-center"
                  onClick={() => window.location.href = "/bp/dashboard"}>
                  <img src="/images/icons/Dashboard.png" width={22} />
                  <span className='ml-3'>Dashboard</span>
                </li>}
            </ul>
          </div>
          <div className='w-100 mt-2'>
            <button className='btn w-100 btn-outline-success' onClick={handleLogout} >
              Logout
            </button>
          </div>
        </div>
      </div>
      <AlertModal
        icon={"/images/icons/log-out.png"}
        title={"Are you sure?"}
        desc={"you will be logged out!"}
        submitText={"Logout"}
        submitAction={Logoutaccount}
        setShowModal={setShowModal}
        showModal={showModal}
      />
      {/* {showModal && (
        <ModalPopup setShowModal={setShowModal} showModal={showModal}>
          <div className='container-fluid d-flex flex-column align-items-center justify-content-center'>
            <div className='w-100 d-flex justify-content-end'><i onClick={() => setShowModal(false)} class="fa fa-times fontsubtitle" aria-hidden="true"></i></div>
            <img src="/images/icons/log-out.png" style={{ width: '60px', height: '60px', border: "none", borderRadius: '50%' }} />
            <h3 className="fontmdtitle text-dark1 mt-3">Are you sure?</h3>
            <span className="fontsubtitle text-dark1 mt-1">you will be logged out!</span>
            <div className="mt-3 d-flex justify-content-center column-gap-3">
              <button className="fontsubtitle btn btn-outline-danger rounded-pill px-3 py-1" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="fontsubtitle btn btn-connect1 rounded-pill px-3 py-1" onClick={() => Logoutaccount()}>Logout</button>
            </div>
          </div>
        </ModalPopup>
      )} */}
    </div>
  );
};
export default Header;
