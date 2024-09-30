import React,{useState,useEffect} from 'react'
import {CLIENT_URL} from '../utils/ApiRoute'
import {useNavigate,useLocation} from 'react-router-dom'

function BPSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [SideBarList,setSideBarList] = useState()
  const [User,setUser] = useState(JSON.parse(localStorage.getItem('User')))
  var ItemList =[
    {
      icon:"ti ti-dashboard",
      name:"Dashboard",
      href:'/'
    },   
    {
      icon:"ti ti-user",
      name:"Users",
      href:'/users'
    },
    {
      icon:"ti ti-receipt",
      name:"GICTC Code",
      href:'/g_code'
    },
    {
      icon:"ti ti-ti ti-file-text",
      name:"subscripion",
      href:'/subscriptions'
    },
    {
      icon:"ti ti-calendar",
      name:"Follow Up & Lead",
      href:'/calender'
    },
    {
      icon:"ti ti-ti ti-file-text",
      name:"G-pavilion",
      href:'/pavilion-cate'
    },
    {
      icon: "ti ti-layout", 
      name: "Industries",
      href: '/industry'
    },

    {
      icon:"ti ti-aperture",
      name:"Support",
      href:'/support'
    }
  ]; 
  const SidebarItems = [
    {
      icon: "ti ti-user-circle",
      name: "Account Setting",
      href: 'settings'
    }, 
  ];
  
return (
<>
<aside className="left-sidebar with-vertical"  style={{background:User?.user_type=='3'?"#6242BD":"#7c8fac"}}>
  <div className="brand-logo d-flex align-items-center justify-content-between">
    <a href="" className="text-nowrap logo-img pt-2 pl-4">
      <img
        src="/assets/images/logos/connectlogowhite.png"
        className="dark-logo"
        alt="Logo-Dark"
        width={"50%"}
        height={"10%"}
      />
    </a>
    <a
      href="javascript:void(0)"
      className="sidebartoggler ms-auto text-decoration-none fs-5 d-block d-xl-none"
    >
      <i className="ti ti-x" />
    </a>
  </div>
  <nav className="sidebar-nav scroll-sidebar" data-simplebar="">
    <ul id="sidebarnav">
      <li className="nav-small-cap">
        <i className="ti ti-dots nav-small-cap-icon fs-4" />
        <span className="hide-menu">Home</span>
      </li>
     
     {ItemList && ItemList.map((item)=>(
      <li className="sidebar-item" style={{cursor:'pointer'}}>
      <a className={`sidebar-link text-white ${location.pathname===item.href?"active":"in-active"}`}  onClick={()=>{ navigate(item.href)}} 
      aria-expanded="false">
        <span>
          <i className={item.icon} />
        </span>
        <span className="hide-menu">{item.name}</span>
      </a>
    </li>
     ))}

      <li className="nav-small-cap">
        <i className="ti ti-dots nav-small-cap-icon fs-4" />
        <span className="hide-menu">Setting</span>
      </li>
      {SidebarItems.map((item, index) => (
        <li className="sidebar-item" key={index}>
          <a className="sidebar-link text-white" href={item.href} aria-expanded="false">
            <span>
              <i className={item.icon} />
            </span>
            <span className="hide-menu">{item.name}</span>
          </a>
        </li>
      ))}
    </ul>
  </nav>
  <div className="fixed-profile p-3 mx-4 mb-2 bg-secondary-subtle rounded mt-3">
    <div className="hstack gap-3">
      <div className="john-img">
        <img
          src="/assets/images/profile/user-1.jpg"
          className="rounded-circle"
          width={40}
          height={40}
          alt=""
        />
      </div>
      <div className="john-title text-white">
        <h6 className="mb-0 fs-4 fw-semibold text-white">qcodesinfotech</h6>
        <span className="fs-2">Designer</span>
      </div>
    </div>
  </div>
</aside>
</>
)
}

export default BPSidebar
