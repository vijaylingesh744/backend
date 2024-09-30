import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import FetchData from '../../fetch-api/Apifetch';

const BottomNavbar = () => {

  const location = useLocation();
  const currentRoute = location.pathname;
  const [showAlert, setShowAlert] = useState(false)
  const [ShowSidebar, setShowSidebar] = useState(false)
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("LOGINDATA"))?.user)
  const navigate = useNavigate();
  const [scrolling, setScrolling] = useState(true);
  const UserImg = ["img01.png", "img02.png", "img03.png", "img04.png", "img05.png"]

  useEffect(() => {
    ListConnection()
    let timeout = null;

    const handleScroll = () => {
      setScrolling(true);
      if (timeout) {
        clearTimeout(timeout);
      }
      timeout = setTimeout(() => {
        setScrolling(false);
      }, 2000);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('wheel', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', handleScroll);
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, []);

  const ListConnection = async () => {

    try {
      const res = await FetchData("list/connection/" + user._id, 'GET', null, false, false)
      if (res.status) {
        const filteredData = res.data.filter(item => item.status === 0);
        if (filteredData.length != 0) {
          setShowAlert(true)
        }

      }
    } catch (err) {
      console.log(err);
    }
  }

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
    // {
    //   Title: "G pavilion",
    //   IconComponent: currentRoute === '/pavilion' ? "/images/icons/pavilion.png" : "/images/icons/pavilion1.png",
    //   Href: "/pavilion"
    // },
    // {
    //   Title: "Subscribe",
    //   IconComponent: "/images/icons/subscribe.png",
    //   Href: "/subscribe"
    // },
    // {
    //   IconComponent: "/bp-assets/images/logos/Transaction.png",
    //   Title: "Transaction",
    //   Href: '/transaction'
    // },
  ];
  //scrolling ? '0%' : '-10%'
  return (
    <div className='container-fluid px-0 d-flex bg-white d-block d-md-none d-lg-none justify-content-around ' style={{ bottom: "0%", height: 'fit-content', borderTop: "1px solid gray", position: 'fixed', transition: 'bottom 0.5s ease-in-out', zIndex: 9999 }}>
      {HeaderArr.map((item, index) => (
        <div className={`${currentRoute === item.Href ? "actives1" : ""} d-flex flex-column align-items-center w-25 py-2`} onClick={() => { window.location.href = item.Href; }} key={index}>
          <img src={item.IconComponent} style={{ width: '25px' }} />
          <span className={`nav-item-text ${currentRoute === item.Href ? "navactive1" : ""}`}>{item.Title}</span>
        </div>
      ))}

    </div>
  )
}

export default BottomNavbar
