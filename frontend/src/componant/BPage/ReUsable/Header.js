import React, { startTransition, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2';
import { BASE_URL, CLIENT_URL } from '../../utils/ApiRoute';
import { CheckGuest, RedirectRoute, handleImageError } from '../../utils/Function';
import "../../screens/FeedPage/style/style.css";
import "../../screens/layout/Style/Alert.css";
import './style/style.css';
const Header = () => {
  const location = useLocation();
  const currentRoute = location.pathname;
  const navigate = useNavigate();
  const [logoutmodel, setLogoutmodel] = useState(false);
  const [user, setuserInfo] = useState(JSON.parse(localStorage.getItem('LOGINDATA')).user);
  
  const HandleLogout = () => {
    Swal.fire({
      title: "Are you sure you want to logout your account?",
      showCancelButton: true,
      confirmButtonText: "Logout",
      denyButtonText: "Cancel"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Logout!", "Redirecting to login...", "success");
        localStorage.removeItem("User");
        setTimeout(() => {
          window.location.href = CLIENT_URL;
        }, 1000);
      }
    });
  };

  const handleLogout = () => {
    Swal.fire({
      title: 'Logout from Transaction module?',
      html: '<span style="font-size: 16px; font-weight: bold;">Redirected to community page</span>',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#4535C1',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes!',
      cancelButtonText: 'Cancel',
      customClass: {
        confirmButton: 'swal2-confirm-custom',
        cancelButton: 'swal2-cancel-custom',
        title: 'swal2-title',
      },
      iconHtml: '<img src="/images/icons/shutdown.png" style="width: 60px; height: 60px; border:"none" border-radius: 50%;" />',
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('VERIFYDATA');
        localStorage.removeItem('TRANSACTIONLOGIN');
        RedirectRoute("/feed-page");
      }
    });
  };
  const BpArr = [
    {
      Title: "Dashboard",
      IconComponent: "/bp-assets/images/logos/dashboard.png",
      Href: '/bp/dashboard'
    },
    {
      Title: "CS Vault",
      IconComponent: '/bp-assets/images/logos/link2.png',
      Href: "/bp/cs-vault"
    },
    {
      Title: "Chat",
      IconComponent: '/bp-assets/images/logos/Business CS.png',
      Href: "/bp/chatgroup"
    },
    {
      Title: "Projects",
      IconComponent: '/bp-assets/images/logos/Business CS.png',
      Href: "/bp/project-connection"
      // Href: "/bp/chatgroup"
    }, 
    {
      Title: 'Transactions',
      IconComponent: '/bp-assets/images/logos/Transaction.png',
      Href:'/transaction'
    },
    {
      Title: "Notifications",
      IconComponent: '/bp-assets/images/logos/bell.png',
      Href: "/bp/notification"
    },
  ];

  const ClientArr = [
    {
      Title: "Dashboard",
      IconComponent: "/bp-assets/images/logos/dashboard.png",
      Href: '/bp/dashboard'
    },
    {
      Title: "Projects",
      IconComponent: '/bp-assets/images/logos/Business CS.png',
      Href: "/bp/project-connection"
      // Href: "/bp/chatgroup"
    }, 
    {
      Title: "Find a BP",
      IconComponent: '/bp-assets/images/logos/link2.png',
      Href: "/bp/find_business"
    },
    // {
    //   Title: "Chat",
    //   IconComponent: '/bp-assets/images/logos/Business CS.png',
    //   Href: "/bp/chatgroup"
    // },
    {
      Title: 'Transactions',
      IconComponent: '/bp-assets/images/logos/Transaction.png',
      Href:'/transaction'
    } ,
    {
      Title: "Notifications",
      IconComponent: '/bp-assets/images/logos/bell.png',
      Href: "/bp/notification"
    }, 
  ]
  return (
    <div style={{ display: "flex" }}>
      <div>
        <img id="header-logo" src="/assets/images/connectlogowhite.png" alt="LinkedIn" />
        <nav>
          <ul style={{ gap: '1px' }}>
            { (user?.user_type == 0 || user?.user_type == 2) && ClientArr.map((item, index) => (
              <li className="py-2 px-3" onClick={() => { startTransition(() => { navigate(item.Href) }) }} key={index}>
                <div className={currentRoute === item.Href ? "active" : ""}>
                  <span className="nav-item-text font-weight-bold fontcontent2 text-white">{item.Title}</span>
                </div>
              </li>
            ))}
            { (user?.user_type == 1) && BpArr.map((item, index) => (
              <li className="py-2 px-3" onClick={() => { startTransition(() => { navigate(item.Href) }) }} key={index}>
                <div className={currentRoute === item.Href ? "active" : ""}>
                  <span className="nav-item-text font-weight-bold fontcontent2 text-white">{item.Title}</span>
                </div>
              </li>
            ))}
          </ul>
        </nav>
        {BpArr.map((item, index) => (
          <img src={item.IconComponent} className="p-2  d-none" key={index} />
        ))}
        <div>
          <div className="ml-4 align-items-center justify-content-end column-gap-1 mr-5">
            <input placeholder={"Search Here"}
              onChange={e => {
                if (currentRoute === '/pavilion') {
                  console.log(e.target.value);
                  // setTitle(e.target.value);
                  // dataList(2);
                }
              }} />
          </div>
          <div style={{ maxWidth: 'fit-content', width: '20%' }} 
                onMouseLeave={() => setLogoutmodel(false)}
          >
            <div className='justify-content-end align-items-end flex-column w-100'
            onClick={() => {
              if (CheckGuest()) {
                navigate('/login')
              }
              else { setLogoutmodel(!logoutmodel) }
            }} 
            >
              <span className="nav-item-text d-flex flex-column align-items-center" style={{ cursor: "pointer" }}>
                <img
                  src={`${user?.profile ? `${BASE_URL + user?.profile}` : `/images/profile/img0${user?.randomprofile}.png`}`}
                  className="rounded-circle"
                  width={30}
                  height={30}
                  alt=""
                  onError={handleImageError}
                />
                <span className='m-0 fontcontent1 font-weight-bold text-white' style={{ width: 'max-content' }}>
                  {CheckGuest() ? 'Login' : user?.first_name.length > 7 ? `${user?.first_name.substring(0, 7)}...` : user?.first_name}
                </span>
              </span>
            </div>
            <div className='card P-3' style={{ position: 'absolute', top: "40px", right: "-40px", width: '300PX', display: logoutmodel ? "block" : 'none', zIndex: 999 }}>
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
                  <div className="ms-3 d-flex flex-column ml-3" style={{ fontSize: '14px' }}>
                    <span className="" role='button' onClick={() => navigate(`/user/${user?._id}`)}>{user?.first_name}&nbsp;{user?.last_name}</span>
                    <span className="">{user?.user_type == 0 ? 'Buyer' : user?.user_type == 2 ? 'Seller' : user?.user_type == 1 ? "Business Partner" : "Select User"}</span>
                    <p className="">
                      <i className="ti ti-mail fs-4" />{user?.gmail}
                    </p>
                  </div>
                </div>
                <hr />
                <div className='w-100' style={{ fontSize: "14px" }}>
                  <ul className="list-group list-group-flush w-100 text-center" style={{ cursor: 'pointer' }}>
                    <li className="list-group-item d-flex align-items-center" onClick={() => navigate('/bp/profile')}>
                      <img src="/images/icons/Adduser.png" width={22} />
                      <span className='ml-3'>My Profile</span>
                    </li>
                    <li className="list-group-item d-flex align-items-center" onClick={() => navigate('/subscribe')}>
                      <img src="/images/icons/subscribe.png" width={22} />
                      <span className='ml-3'>Subscription</span>
                    </li>
                    <li className="list-group-item d-flex align-items-center" onClick={() => navigate('/add_page')}>
                      <img src="/images/icons/pagecreate.png" width={22} />
                      <span className='ml-3'>Pages</span>
                    </li>
                    {user?.user_type == 1 &&
                      <li className="list-group-item d-flex  align-items-center"
                        onClick={() => window.location.href = "/bp/dashboard"}>
                        <img src="/images/icons/Dashboard.png" width={22} />
                        <span className='ml-3'>Network</span>
                      </li>}
                    {user?.user_type == 1 &&
                      <li className="list-group-item d-flex  align-items-center"
                        onClick={() => window.location.href = "/transaction"}>
                        <img src="/bp-assets/images/logos/Projects1.png" width={22} />
                        <span className='ml-3'>Transactions</span>
                      </li>}
                    {user?.user_type == 1 &&
                      <li className="list-group-item d-flex  align-items-center"
                        onClick={() => window.location.href = "/bp/user"}>
                        <img src="/bp-assets/images/logos/AddUser.png" width={22} />
                        <span className='ml-3'>Add User</span>
                      </li>}
                  </ul>
                </div>
                <div className='w-100 mt-2'>
                  <button className='btn w-100 btn-outline-success'
                    onClick={() =>{handleLogout() }}>
                    Logout
                  </button>
                </div>
              </div>
            </div>
            <div className='align-items-center d-flex px-5'
              onClick={() => window.location.href = "/feed-page"}
              style={{ cursor: "pointer" }}>
              <i className="fa fa-home" style={{ color: "white", fontSize: "22px" }} />
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
                onClick={() => navigate(`/user/${user?._id}`)} />
            </span>
            <div className="ms-3 d-flex flex-column ml-3" style={{ fontSize: '14px' }}>
              <span className="" onClick={() => navigate(`/user/${user?._id}`)}>{user?.first_name}&nbsp;{user?.last_name}</span>
              <span className="">{user?.user_type == 0 ? 'Buyer' : user?.user_type == 2 ? 'Seller' : user?.user_type == 1 ? "Business Partner" : "Select User"}</span>
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
                <span className='ml-3'>Pages</span>
              </li>
              {user?.user_type == 1 &&
                <li className="list-group-item d-flex  align-items-center"
                  onClick={() => window.location.href = "/bp/dashboard"}>
                  <img src="/images/icons/Dashboard.png" width={22} />
                  <span className='ml-3'>Network</span>
                </li>
              }

              {user?.user_type == 1 &&
                <li className="list-group-item d-flex  align-items-center"
                  onClick={() => window.location.href = "/bp/transaction"}>
                  <img src="/bp-assets/images/logos/Projects1.png" width={22} />
                  <span className='ml-3'>Transactions</span>
                </li>
                }
              {user?.user_type == 1 &&
                <li className="list-group-item d-flex  align-items-center"
                  onClick={() => window.location.href = "/bp/user"}>
                  <img src="/bp-assets/images/logos/Projects1.png" width={22} />
                  <span className='ml-3'>Add User</span>
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
    </div>
  )
}

export default Header
