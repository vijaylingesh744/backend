import React, { useEffect,useState } from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2';
import { useUserContext } from './Context';
import { CLIENT_URL } from '../utils/ApiRoute'

const Header = () => {
  const [userInfo, setUserInfo] = useState({});

  const {userRoute, setRoute } = useUserContext();
  const HandleLogout = () => {
    Swal.fire({
      title: "Are you sure you want to logout your account?",
      showCancelButton: true,
      confirmButtonText: "Logout",
      denyButtonText: "Cancel"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Logout!", "Redirecting to login...", "success");
         setRoute(null);
        localStorage.removeItem("User");
        setTimeout(() => {
          window.location.href = CLIENT_URL;
        }, 1000); 
      }
    });
  };
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('User'));
    console.log(userData)
    setUserInfo(userData);
  }, []);
  return (
  <header className="topbar">
  <div className="with-vertical">
    <nav className="navbar navbar-expand-lg p-0">
      <ul className="navbar-nav">
        <li className="nav-item">
          <a
            className="nav-link sidebartoggler nav-icon-hover ms-n3"
            id="headerCollapse"
            href="javascript:void(0)">
              <i className="ti ti-menu-2" />
          </a>
        </li>
        <li className="nav-item d-none d-lg-block">
          <a
            className="nav-link nav-icon-hover"
            href="javascript:void(0)"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            <i className="ti ti-search" />
          </a>
        </li>
      </ul>
      <ul className="navbar-nav quick-links d-none d-lg-flex">
        <li className="nav-item dropdown-hover d-none d-lg-block">
          <a className="nav-link" href="/my-project">
            Chat
          </a>
        </li>
        <li className="nav-item dropdown-hover d-none d-lg-block">
          <a className="nav-link" href="calender">
             Calendar
          </a>
        </li>
      </ul>
      <div className="d-block d-lg-none">
        <a href="index" className="text-nowrap logo-img">
          {/* <img
            src="/assets/images/logos/C_logo.png"
            className="dark-logo"
            alt="Logo-Dark"
          /> */}
          <img
            src="/assets/images/logos/C_logo.png"
            className="light-logo"
            alt="Logo-light"
            height="50px"
            width="75px"
          />
        </a>
      </div>
      <a
        className="navbar-toggler nav-icon-hover p-0 border-0"
        href="javascript:void(0)"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="p-2">
          <i className="ti ti-dots fs-7" />
        </span>
      </a>
      <div
        className="collapse navbar-collapse justify-content-end"
        id="navbarNav"
      >
        <div className="d-flex align-items-center justify-content-between">
          <a
            href="javascript:void(0)"
            className="nav-link d-flex d-lg-none align-items-center justify-content-center"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#mobilenavbar"
            aria-controls="offcanvasWithBothOptions"
          >
            <i className="ti ti-align-justified fs-7" />
          </a>
          <ul className="navbar-nav flex-row ms-auto align-items-center justify-content-center">
            <li className="nav-item dropdown">
              <a
                className="nav-link nav-icon-hover"
                href="javascript:void(0)"
                id="drop2"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  src="/assets/images/svgs/icon-flag-en.svg"
                  alt=""
                  width="20px"
                  height="20px"
                  className="rounded-circle object-fit-cover round-20"
                />
              </a>
              <div
                className="dropdown-menu dropdown-menu-end dropdown-menu-animate-up"
                aria-labelledby="drop2"
              >
                <div className="message-body">
                  <a
                    href="javascript:void(0)"
                    className="d-flex align-items-center gap-2 py-3 px-4 dropdown-item"
                  >
                    <div className="position-relative">
                      <img
                        src="/assets/images/svgs/icon-flag-en.svg"
                        alt=""
                        width="20px"
                        height="20px"
                        className="rounded-circle object-fit-cover round-20"
                      />
                    </div>
                    <p className="mb-0 fs-3">English (UK)</p>
                  </a>
                  <a
                    href="javascript:void(0)"
                    className="d-flex align-items-center gap-2 py-3 px-4 dropdown-item"
                  >
                    <div className="position-relative">
                      <img
                        src="/assets/images/svgs/icon-flag-cn.svg"
                        alt=""
                        width="20px"
                        height="20px"
                        className="rounded-circle object-fit-cover round-20"
                      />
                    </div>
                    <p className="mb-0 fs-3">中国人 (Chinese)</p>
                  </a>
                  <a
                    href="javascript:void(0)"
                    className="d-flex align-items-center gap-2 py-3 px-4 dropdown-item"
                  >
                    <div className="position-relative">
                      <img
                        src="/assets/images/svgs/icon-flag-fr.svg"
                        alt=""
                        width="20px"
                        height="20px"
                        className="rounded-circle object-fit-cover round-20"
                      />
                    </div>
                    <p className="mb-0 fs-3">français (French)</p>
                  </a>
                  <a
                    href="javascript:void(0)"
                    className="d-flex align-items-center gap-2 py-3 px-4 dropdown-item"
                  >
                    <div className="position-relative">
                      <img
                        src="/assets/images/svgs/icon-flag-sa.svg"
                        alt=""
                        width="20px"
                        height="20px"
                        className="rounded-circle object-fit-cover round-20"
                      />
                    </div>
                    <p className="mb-0 fs-3">عربي (Arabic)</p>
                  </a>
                </div>
              </div>
            </li>
            <li className="nav-item">
              <a 
                className="nav-link position-relative nav-icon-hover"
                href="javascript:void(0)">
                <i className="ti ti-basket" />
                <span className="popup-badge rounded-pill bg-danger text-white fs-2">
                  2
                </span>
              </a>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link pe-0"
                href="javascript:void(0)"
                id="drop1"
                data-bs-toggle="dropdown"
                aria-expanded="false">
                <div className="d-flex align-items-center">
                  <div className="user-profile-img">
                    <img
                      src="/assets/images/profile/user-1.jpg"
                      className="rounded-circle"
                      width={35}
                      height={35}
                      alt=""
                    />
                  </div>
                </div>
              </a>
              <div
                className="dropdown-menu content-dd dropdown-menu-end dropdown-menu-animate-up"
                aria-labelledby="drop1"
              >
                <div
                  className="profile-dropdown position-relative"
                  data-simplebar=""
                >
                  <div className="py-3 px-7 pb-0">
                    <h5 className="mb-0 fs-5 fw-semibold">User Profile</h5>
                  </div>
                  <div className="d-flex align-items-center py-9 mx-7 border-bottom">
                    <img
                      src="/assets/images/profile/user-1.jpg"
                      className="rounded-circle"
                      width={80}
                      height={80}
                      alt=""
                    />
                    <div className="ms-3">
                      <h5 className="mb-1 fs-3">{userInfo?.first_name} {userInfo?.last_name}</h5>
                      <span className="mb-1 d-block">

                      {userInfo?.user_type==3?"Super Admin" :"Business Partner" }
                      </span>
                      <p className="mb-0 d-flex align-items-center gap-2">
                        <i className="ti ti-mail fs-4" />{userInfo?.gmail}
                      </p>
                    </div>
                  </div>
                  <div className="message-body">
                    <a
                      href="#"
                      className="py-8 px-7 mt-8 d-flex align-items-center"
                    >
                      <span className="d-flex align-items-center justify-content-center text-bg-light rounded-1 p-6">
                        <img
                          src="/assets/images/svgs/icon-account.svg"
                          alt=""
                          width={24}
                          height={24}
                        />
                      </span>
                      <div className="w-75 d-inline-block v-middle ps-3">
                        <h6 className="mb-1 fs-3 fw-semibold lh-base">
                          My Profile
                        </h6>
                        <span className="fs-2 d-block text-body-secondary">
                          Account Settings
                        </span>
                      </div>
                    </a>
                    <a
                      href="#"
                      className="py-8 px-7 d-flex align-items-center"
                    >
                      <span className="d-flex align-items-center justify-content-center text-bg-light rounded-1 p-6">
                        <img
                          src="/assets/images/svgs/icon-inbox.svg"
                          alt=""
                          width={24}
                          height={24}
                        />
                      </span>
                      <div className="w-75 d-inline-block v-middle ps-3">
                        <h6 className="mb-1 fs-3 fw-semibold lh-base">
                          My Inbox
                        </h6>
                        <span className="fs-2 d-block text-body-secondary">
                          Messages &amp; Emails
                        </span>
                      </div>
                    </a>
                    <a
                      href="#"
                      className="py-8 px-7 d-flex align-items-center"
                    >
                      <span className="d-flex align-items-center justify-content-center text-bg-light rounded-1 p-6">
                        <img
                          src="/assets/images/svgs/icon-tasks.svg"
                          alt=""
                          width={24}
                          height={24}
                        />
                      </span>
                      <div className="w-75 d-inline-block v-middle ps-3">
                        <h6 className="mb-1 fs-3 fw-semibold lh-base">
                          My Task
                        </h6>
                        <span className="fs-2 d-block text-body-secondary">
                          To-do and Daily Tasks
                        </span>
                      </div>
                    </a>
                  </div>
                  <div className="d-grid py-4 px-7 pt-8">
                    <a
                    onClick={()=>HandleLogout()}
                      className="btn btn-outline-primary"
                    >
                      Log Out
                    </a>
                  </div>
                </div>
              </div>
            </li>
            {/* ------------------------------- */}
            {/* end profile Dropdown */}
            {/* ------------------------------- */}
          </ul>
        </div>
      </div>
    </nav>
    {/* ---------------------------------- */}
    {/* End Vertical Layout Header */}
    {/* ---------------------------------- */}
    {/* ------------------------------- */}
    {/* apps Dropdown in Small screen */}
    {/* ------------------------------- */}
    {/*  Mobilenavbar */}
    <div
      className="offcanvas offcanvas-start"
      data-bs-scroll="true"
      tabIndex={-1}
      id="mobilenavbar"
      aria-labelledby="offcanvasWithBothOptionsLabel"
    >
      <nav className="sidebar-nav scroll-sidebar">
        <div className="offcanvas-header justify-content-between">
          <img
            src="/assets/images/logos/favicon.ico"
            alt=""
            className="img-fluid"
          />
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          />
        </div>
        <div
          className="offcanvas-body"
          data-simplebar=""
          style={{ height: "calc(100vh - 80px)" }}
        >
          <ul id="sidebarnav">
            <li className="sidebar-item">
              <a
                className="sidebar-link has-arrow"
                href="javascript:void(0)"
                aria-expanded="false"
              >
                <span>
                  <i className="ti ti-apps" />
                </span>
                <span className="hide-menu">Apps</span>
              </a>
              <ul aria-expanded="false" className="collapse first-level my-3">
                <li className="sidebar-item py-2">
                  <a href="#" className="d-flex align-items-center">
                    <div className="text-bg-light rounded-1 me-3 p-6 d-flex align-items-center justify-content-center">
                      <img
                        src="/assets/images/svgs/icon-dd-chat.svg"
                        alt=""
                        className="img-fluid"
                        width={24}
                        height={24}
                      />
                    </div>
                    <div className="d-inline-block">
                      <h6 className="mb-1 bg-hover-primary">
                        Chat Application
                      </h6>
                      <span className="fs-2 d-block fw-normal text-muted">
                        New messages arrived
                      </span>
                    </div>
                  </a>
                </li>
                <li className="sidebar-item py-2">
                  <a
                    href="#"
                    className="d-flex align-items-center"
                  >
                    <div className="text-bg-light rounded-1 me-3 p-6 d-flex align-items-center justify-content-center">
                      <img
                        src="/assets/images/svgs/icon-dd-invoice.svg"
                        alt=""
                        className="img-fluid"
                        width={24}
                        height={24}
                      />
                    </div>
                    <div className="d-inline-block">
                      <h6 className="mb-1 bg-hover-primary">Invoice App</h6>
                      <span className="fs-2 d-block fw-normal text-muted">
                        Get latest invoice
                      </span>
                    </div>
                  </a>
                </li>
                <li className="sidebar-item py-2">
                  <a
                    href="#"
                    className="d-flex align-items-center"
                  >
                    <div className="text-bg-light rounded-1 me-3 p-6 d-flex align-items-center justify-content-center">
                      <img
                        src="/assets/images/svgs/icon-dd-mobile.svg"
                        alt=""
                        className="img-fluid"
                        width={24}
                        height={24}
                      />
                    </div>
                    <div className="d-inline-block">
                      <h6 className="mb-1 bg-hover-primary">
                        Contact Application
                      </h6>
                      <span className="fs-2 d-block fw-normal text-muted">
                        2 Unsaved Contacts
                      </span>
                    </div>
                  </a>
                </li>
                <li className="sidebar-item py-2">
                  <a
                    href="app-email"
                    className="d-flex align-items-center"
                  >
                    <div className="text-bg-light rounded-1 me-3 p-6 d-flex align-items-center justify-content-center">
                      <img
                        src="/assets/images/svgs/icon-dd-message-box.svg"
                        alt=""
                        className="img-fluid"
                        width={24}
                        height={24}
                      />
                    </div>
                    <div className="d-inline-block">
                      <h6 className="mb-1 bg-hover-primary">Email App</h6>
                      <span className="fs-2 d-block fw-normal text-muted">
                        Get new emails
                      </span>
                    </div>
                  </a>
                </li>
                <li className="sidebar-item py-2">
                  <a
                    href="#"
                    className="d-flex align-items-center"
                  >
                    <div className="text-bg-light rounded-1 me-3 p-6 d-flex align-items-center justify-content-center">
                      <img
                        src="/assets/images/svgs/icon-dd-cart.svg"
                        alt=""
                        className="img-fluid"
                        width={24}
                        height={24}
                      />
                    </div>
                    <div className="d-inline-block">
                      <h6 className="mb-1 bg-hover-primary">User Profile</h6>
                      <span className="fs-2 d-block fw-normal text-muted">
                        learn more information
                      </span>
                    </div>
                  </a>
                </li>
                <li className="sidebar-item py-2">
                  <a
                    href=" calender"
                    className="d-flex align-items-center"
                  >
                    <div className="text-bg-light rounded-1 me-3 p-6 d-flex align-items-center justify-content-center">
                      <img
                        src="/assets/images/svgs/icon-dd-date.svg"
                        alt=""
                        className="img-fluid"
                        width={24}
                        height={24}
                      />
                    </div>
                    <div className="d-inline-block">
                      <h6 className="mb-1 bg-hover-primary"> Calender App</h6>
                      <span className="fs-2 d-block fw-normal text-muted">
                        Get dates
                      </span>
                    </div>
                  </a>
                </li>
                <li className="sidebar-item py-2">
                  <a
                    href="app-contact2"
                    className="d-flex align-items-center"
                  >
                    <div className="text-bg-light rounded-1 me-3 p-6 d-flex align-items-center justify-content-center">
                      <img
                        src="/assets/images/svgs/icon-dd-lifebuoy.svg"
                        alt=""
                        className="img-fluid"
                        width={24}
                        height={24}
                      />
                    </div>
                    <div className="d-inline-block">
                      <h6 className="mb-1 bg-hover-primary">
                        Contact List Table
                      </h6>
                      <span className="fs-2 d-block fw-normal text-muted">
                        Add new contact
                      </span>
                    </div>
                  </a>
                </li>
                <li className="sidebar-item py-2">
                  <a
                    href="app-notes"
                    className="d-flex align-items-center"
                  >
                    <div className="text-bg-light rounded-1 me-3 p-6 d-flex align-items-center justify-content-center">
                      <img
                        src="/assets/images/svgs/icon-dd-application.svg"
                        alt=""
                        className="img-fluid"
                        width={24}
                        height={24}
                      />
                    </div>
                    <div className="d-inline-block">
                      <h6 className="mb-1 bg-hover-primary">
                        Notes Application
                      </h6>
                      <span className="fs-2 d-block fw-normal text-muted">
                        To-do and Daily tasks
                      </span>
                    </div>
                  </a>
                </li>
                <ul className="px-8 mt-7 mb-4">
                  <li className="sidebar-item mb-3">
                    <h5 className="fs-5 fw-semibold">Quick Links</h5>
                  </li>
                  <li className="sidebar-item py-2">
                    <a
                      className="fw-semibold text-dark"
                      href="#"
                    >
                      Pricing Page
                    </a>
                  </li>
                  <li className="sidebar-item py-2">
                    <a
                      className="fw-semibold text-dark"
                      href="#"
                    >
                      Authentication Design
                    </a>
                  </li>
                  <li className="sidebar-item py-2">
                    <a
                      className="fw-semibold text-dark"
                      href="#"
                    >
                      Register Now
                    </a>
                  </li>
                  <li className="sidebar-item py-2">
                    <a
                      className="fw-semibold text-dark"
                      href="#"
                    >
                      404 Error Page
                    </a>
                  </li>
                  <li className="sidebar-item py-2">
                    <a className="fw-semibold text-dark" href="app-notes">
                      Notes App
                    </a>
                  </li>
                  <li className="sidebar-item py-2">
                    <a
                      className="fw-semibold text-dark"
                      href="#"
                    >
                      User Application
                    </a>
                  </li>
                  <li className="sidebar-item py-2">
                    <a
                      className="fw-semibold text-dark"
                      href="#"
                    >
                      Account Settings
                    </a>
                  </li>
                </ul>
              </ul>
            </li>
            <li className="sidebar-item">
              <a
                className="sidebar-link"
                href="app-chat"
                aria-expanded="false"
              >
                <span>
                  <i className="ti ti-message-dots" />
                </span>
                <span className="hide-menu">Chat</span>
              </a>
            </li>
            <li className="sidebar-item">
              <a
                className="sidebar-link"
                href=" calender"
                aria-expanded="false"
              >
                <span>
                  <i className="ti ti- calender" />
                </span>
                <span className="hide-menu"> Calender</span>
              </a>
            </li>
            <li className="sidebar-item">
              <a
                className="sidebar-link"
                href="app-email"
                aria-expanded="false"
              >
                <span>
                  <i className="ti ti-mail" />
                </span>
                <span className="hide-menu">Email</span>
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  </div>
  <div className="app-header with-horizontal">
    <nav className="navbar navbar-expand-xl container-fluid p-0">
      <ul className="navbar-nav">
        <li className="nav-item d-block d-xl-none">
          <a
            className="nav-link sidebartoggler ms-n3"
            id="sidebarCollapse"
            href="javascript:void(0)"
          >
            <i className="ti ti-menu-2" />
          </a>
        </li>
        <li className="nav-item d-none d-xl-block">
          <a href="index" className="text-nowrap nav-link">
            <img
              src="/assets/images/logos/C_logo.png"
              className="dark-logo"
              width={180}
              alt=""
            />
            <img
              src="/assets/images/logos/C_logo.png"
              className="light-logo"
              width={180}
              alt=""
            />
          </a>
        </li>
        <li className="nav-item d-none d-xl-block">
          <a
            className="nav-link nav-icon-hover"
            href="javascript:void(0)"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            <i className="ti ti-search" />
          </a>
        </li>
      </ul>
      <ul className="navbar-nav quick-links d-none d-xl-flex">
        {/* ------------------------------- */}
        {/* start apps Dropdown */}
        {/* ------------------------------- */}
        <li className="nav-item dropdown hover-dd d-none d-lg-block">
          <a
            className="nav-link"
            href="javascript:void(0)"
            data-bs-toggle="dropdown"
          >
            Apps
            <span className="mt-1">
              <i className="ti ti-chevron-down fs-3" />
            </span>
          </a>
          <div className="dropdown-menu dropdown-menu-nav dropdown-menu-animate-up py-0">
            <div className="row">
              <div className="col-8">
                <div className="ps-7 pt-7">
                  <div className="border-bottom">
                    <div className="row">
                      <div className="col-6">
                        <div className="position-relative">
                          <a
                            href="app-chat"
                            className="d-flex align-items-center pb-9 position-relative"
                          >
                            <div className="text-bg-light rounded-1 me-3 p-6 d-flex align-items-center justify-content-center">
                              <img
                                src="/assets/images/svgs/icon-dd-chat.svg"
                                alt=""
                                className="img-fluid"
                                width={24}
                                height={24}
                              />
                            </div>
                            <div className="d-inline-block">
                              <h6 className="mb-1 fw-semibold fs-3">
                                Chat Application
                              </h6>
                              <span className="fs-2 d-block text-body-secondary">
                                New messages arrived
                              </span>
                            </div>
                          </a>
                          <a
                            href="app-invoice"
                            className="d-flex align-items-center pb-9 position-relative"
                          >
                            <div className="text-bg-light rounded-1 me-3 p-6 d-flex align-items-center justify-content-center">
                              <img
                                src="/assets/images/svgs/icon-dd-invoice.svg"
                                alt=""
                                className="img-fluid"
                                width={24}
                                height={24}
                              />
                            </div>
                            <div className="d-inline-block">
                              <h6 className="mb-1 fw-semibold fs-3">
                                Invoice App
                              </h6>
                              <span className="fs-2 d-block text-body-secondary">
                                Get latest invoice
                              </span>
                            </div>
                          </a>
                          <a
                            href="app-contact2"
                            className="d-flex align-items-center pb-9 position-relative"
                          >
                            <div className="text-bg-light rounded-1 me-3 p-6 d-flex align-items-center justify-content-center">
                              <img
                                src="/assets/images/svgs/icon-dd-mobile.svg"
                                alt=""
                                className="img-fluid"
                                width={24}
                                height={24}
                              />
                            </div>
                            <div className="d-inline-block">
                              <h6 className="mb-1 fw-semibold fs-3">
                                Contact Application
                              </h6>
                              <span className="fs-2 d-block text-body-secondary">
                                2 Unsaved Contacts
                              </span>
                            </div>
                          </a>
                          <a
                            href="app-email"
                            className="d-flex align-items-center pb-9 position-relative"
                          >
                            <div className="text-bg-light rounded-1 me-3 p-6 d-flex align-items-center justify-content-center">
                              <img
                                src="/assets/images/svgs/icon-dd-message-box.svg"
                                alt=""
                                className="img-fluid"
                                width={24}
                                height={24}
                              />
                            </div>
                            <div className="d-inline-block">
                              <h6 className="mb-1 fw-semibold fs-3">
                                Email App
                              </h6>
                              <span className="fs-2 d-block text-body-secondary">
                                Get new emails
                              </span>
                            </div>
                          </a>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="position-relative">
                          <a
                            href="#"
                            className="d-flex align-items-center pb-9 position-relative"
                          >
                            <div className="text-bg-light rounded-1 me-3 p-6 d-flex align-items-center justify-content-center">
                              <img
                                src="/assets/images/svgs/icon-dd-cart.svg"
                                alt=""
                                className="img-fluid"
                                width={24}
                                height={24}
                              />
                            </div>
                            <div className="d-inline-block">
                              <h6 className="mb-1 fw-semibold fs-3">
                                User Profile
                              </h6>
                              <span className="fs-2 d-block text-body-secondary">
                                learn more information
                              </span>
                            </div>
                          </a>
                          <a
                            href="  calender"
                            className="d-flex align-items-center pb-9 position-relative"
                          >
                            <div className="text-bg-light rounded-1 me-3 p-6 d-flex align-items-center justify-content-center">
                              <img
                                src="/assets/images/svgs/icon-dd-date.svg"
                                alt=""
                                className="img-fluid"
                                width={24}
                                height={24}
                              />
                            </div>
                            <div className="d-inline-block">
                              <h6 className="mb-1 fw-semibold fs-3">
                                 Calender App
                              </h6>
                              <span className="fs-2 d-block text-body-secondary">
                                Get dates
                              </span>
                            </div>
                          </a>
                          <a
                            href="app-contact"
                            className="d-flex align-items-center pb-9 position-relative"
                          >
                            <div className="text-bg-light rounded-1 me-3 p-6 d-flex align-items-center justify-content-center">
                              <img
                                src="/assets/images/svgs/icon-dd-lifebuoy.svg"
                                alt=""
                                className="img-fluid"
                                width={24}
                                height={24}
                              />
                            </div>
                            <div className="d-inline-block">
                              <h6 className="mb-1 fw-semibold fs-3">
                                Contact List Table
                              </h6>
                              <span className="fs-2 d-block text-body-secondary">
                                Add new contact
                              </span>
                            </div>
                          </a>
                          <a
                            href="app-notes"
                            className="d-flex align-items-center pb-9 position-relative"
                          >
                            <div className="text-bg-light rounded-1 me-3 p-6 d-flex align-items-center justify-content-center">
                              <img
                                src="/assets/images/svgs/icon-dd-application.svg"
                                alt=""
                                className="img-fluid"
                                width={24}
                                height={24}
                              />
                            </div>
                            <div className="d-inline-block">
                              <h6 className="mb-1 fw-semibold fs-3">
                                Notes Application
                              </h6>
                              <span className="fs-2 d-block text-body-secondary">
                                To-do and Daily tasks
                              </span>
                            </div>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row align-items-center py-3">
                    <div className="col-8">
                      <a
                        className="fw-semibold text-dark d-flex align-items-center lh-1"
                        href="index.html#"
                      >
                        <i className="ti ti-help fs-6 me-2" />
                        Frequently Asked Questions
                      </a>
                    </div>
                    <div className="col-4">
                      <div className="d-flex justify-content-end pe-4">
                        <button className="btn btn-primary">Check</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-4 ms-n4">
                <div className="position-relative p-7 border-start h-100">
                  <h5 className="fs-5 mb-9 fw-semibold">Quick Links</h5>
                  <ul className="">
                    <li className="mb-3">
                      <a
                        className="fw-semibold bg-hover-primary"
                        href="#"
                      >
                        Pricing Page
                      </a>
                    </li>
                    <li className="mb-3">
                      <a
                        className="fw-semibold bg-hover-primary"
                        href="#"
                      >
                        Authentication Design
                      </a>
                    </li>
                    <li className="mb-3">
                      <a
                        className="fw-semibold bg-hover-primary"
                        href="#"
                      >
                        Register Now
                      </a>
                    </li>
                    <li className="mb-3">
                      <a
                        className="fw-semibold bg-hover-primary"
                        href="#"
                      >
                        404 Error Page
                      </a>
                    </li>
                    <li className="mb-3">
                      <a
                        className="fw-semibold bg-hover-primary"
                        href="app-notes"
                      >
                        Notes App
                      </a>
                    </li>
                    <li className="mb-3">
                      <a
                        className="fw-semibold bg-hover-primary"
                        href="#"
                      >
                        User Application
                      </a>
                    </li>
                    <li className="mb-3">
                      <a
                        className="fw-semibold bg-hover-primary"
                        href="#"
                      >
                        Account Settings
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </li>
        {/* ------------------------------- */}
        {/* end apps Dropdown */}
        {/* ------------------------------- */}
        <li className="nav-item dropdown-hover d-none d-lg-block">
          <a className="nav-link" href="app-chat">
            Chat
          </a>
        </li>
        <li className="nav-item dropdown-hover d-none d-lg-block">
          <a className="nav-link" href="  calender">
             Calender
          </a>
        </li>
        <li className="nav-item dropdown-hover d-none d-lg-block">
          <a className="nav-link" href="app-email">
            Email
          </a>
        </li>
      </ul>
      <div className="d-block d-xl-none">
        <a href="index" className="text-nowrap nav-link">
          <img src="/assets/images/logos/C_logo.png" width={180} alt="" />
        </a>
      </div>
      <a
        className="navbar-toggler nav-icon-hover p-0 border-0"
        href="javascript:void(0)"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="p-2">
          <i className="ti ti-dots fs-7" />
        </span>
      </a>
      <div
        className="collapse navbar-collapse justify-content-end"
        id="navbarNav"
      >
        <div className="d-flex align-items-center justify-content-between px-0 px-xl-8">
          <a
            href="javascript:void(0)"
            className="nav-link round-40 p-1 ps-0 d-flex d-xl-none align-items-center justify-content-center"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#mobilenavbar"
            aria-controls="offcanvasWithBothOptions"
          >
            <i className="ti ti-align-justified fs-7" />
          </a>
          <ul className="navbar-nav flex-row ms-auto align-items-center justify-content-center">
            {/* ------------------------------- */}
            {/* start language Dropdown */}
            {/* ------------------------------- */}
            <li className="nav-item dropdown">
              <a
                className="nav-link nav-icon-hover"
                href="javascript:void(0)"
                id="drop2"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  src="/assets/images/svgs/icon-flag-en.svg"
                  alt=""
                  width="20px"
                  height="20px"
                  className="rounded-circle object-fit-cover round-20"
                />
              </a>
              <div
                className="dropdown-menu dropdown-menu-end dropdown-menu-animate-up"
                aria-labelledby="drop2"
              >
                <div className="message-body">
                  <a
                    href="javascript:void(0)"
                    className="d-flex align-items-center gap-2 py-3 px-4 dropdown-item"
                  >
                    <div className="position-relative">
                      <img
                        src="/assets/images/svgs/icon-flag-en.svg"
                        alt=""
                        width="20px"
                        height="20px"
                        className="rounded-circle object-fit-cover round-20"
                      />
                    </div>
                    <p className="mb-0 fs-3">English (UK)</p>
                  </a>
                  <a
                    href="javascript:void(0)"
                    className="d-flex align-items-center gap-2 py-3 px-4 dropdown-item"
                  >
                    <div className="position-relative">
                      <img
                        src="/assets/images/svgs/icon-flag-cn.svg"
                        alt=""
                        width="20px"
                        height="20px"
                        className="rounded-circle object-fit-cover round-20"
                      />
                    </div>
                    <p className="mb-0 fs-3">中国人 (Chinese)</p>
                  </a>
                  <a
                    href="javascript:void(0)"
                    className="d-flex align-items-center gap-2 py-3 px-4 dropdown-item"
                  >
                    <div className="position-relative">
                      <img
                        src="/assets/images/svgs/icon-flag-fr.svg"
                        alt=""
                        width="20px"
                        height="20px"
                        className="rounded-circle object-fit-cover round-20"
                      />
                    </div>
                    <p className="mb-0 fs-3">français (French)</p>
                  </a>
                  <a
                    href="javascript:void(0)"
                    className="d-flex align-items-center gap-2 py-3 px-4 dropdown-item"
                  >
                    <div className="position-relative">
                      <img
                        src="/assets/images/svgs/icon-flag-sa.svg"
                        alt=""
                        width="20px"
                        height="20px"
                        className="rounded-circle object-fit-cover round-20"
                      />
                    </div>
                    <p className="mb-0 fs-3">عربي (Arabic)</p>
                  </a>
                </div>
              </div>
            </li>
            {/* ------------------------------- */}
            {/* end language Dropdown */}
            {/* ------------------------------- */}
            {/* ------------------------------- */}
            {/* start shopping cart Dropdown */}
            {/* ------------------------------- */}
            <li className="nav-item">
              <a
                className="nav-link position-relative nav-icon-hover"
                href="javascript:void(0)"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasRight"
                aria-controls="offcanvasRight"
              >
                <i className="ti ti-basket" />
                <span className="popup-badge rounded-pill bg-danger text-white fs-2">
                  2
                </span>
              </a>
            </li>
            {/* ------------------------------- */}
            {/* end shopping cart Dropdown */}
            {/* ------------------------------- */}
            {/* ------------------------------- */}
            {/* start notification Dropdown */}
            {/* ------------------------------- */}
            <li className="nav-item dropdown">
              <a
                className="nav-link nav-icon-hover"
                href="javascript:void(0)"
                id="drop2"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="ti ti-bell-ringing" />
                <div className="notification bg-primary rounded-circle" />
              </a>
              <div
                className="dropdown-menu content-dd dropdown-menu-end dropdown-menu-animate-up"
                aria-labelledby="drop2"
              >
                <div className="d-flex align-items-center justify-content-between py-3 px-7">
                  <h5 className="mb-0 fs-5 fw-semibold">Notifications</h5>
                  <span className="badge text-bg-primary rounded-4 px-3 py-1 lh-sm">
                    5 new
                  </span>
                </div>
                <div className="message-body" data-simplebar="">
                  <a
                    href="javascript:void(0)"
                    className="py-6 px-7 d-flex align-items-center dropdown-item"
                  >
                    <span className="me-3">
                      <img
                        src="/assets/images/profile/user-1.jpg"
                        alt="user"
                        className="rounded-circle"
                        width={48}
                        height={48}
                      />
                    </span>
                    <div className="w-75 d-inline-block v-middle">
                      <h6 className="mb-1 fw-semibold lh-base">
                        Roman Joined the Team!
                      </h6>
                      <span className="fs-2 d-block text-body-secondary">
                        Congratulate him
                      </span>
                    </div>
                  </a>
                  <a
                    href="javascript:void(0)"
                    className="py-6 px-7 d-flex align-items-center dropdown-item"
                  >
                    <span className="me-3">
                      <img
                        src="/assets/images/profile/user-2.jpg"
                        alt="user"
                        className="rounded-circle"
                        width={48}
                        height={48}
                      />
                    </span>
                    <div className="w-75 d-inline-block v-middle">
                      <h6 className="mb-1 fw-semibold lh-base">New message</h6>
                      <span className="fs-2 d-block text-body-secondary">
                        Salma sent you new message
                      </span>
                    </div>
                  </a>
                  <a
                    href="javascript:void(0)"
                    className="py-6 px-7 d-flex align-items-center dropdown-item"
                  >
                    <span className="me-3">
                      <img
                        src="/assets/images/profile/user-3.jpg"
                        alt="user"
                        className="rounded-circle"
                        width={48}
                        height={48}
                      />
                    </span>
                    <div className="w-75 d-inline-block v-middle">
                      <h6 className="mb-1 fw-semibold lh-base">
                        Bianca sent payment
                      </h6>
                      <span className="fs-2 d-block text-body-secondary">
                        Check your earnings
                      </span>
                    </div>
                  </a>
                  <a
                    href="javascript:void(0)"
                    className="py-6 px-7 d-flex align-items-center dropdown-item"
                  >
                    <span className="me-3">
                      <img
                        src="/assets/images/profile/user-4.jpg"
                        alt="user"
                        className="rounded-circle"
                        width={48}
                        height={48}
                      />
                    </span>
                    <div className="w-75 d-inline-block v-middle">
                      <h6 className="mb-1 fw-semibold lh-base">
                        Jolly completed tasks
                      </h6>
                      <span className="fs-2 d-block text-body-secondary">
                        Assign her new tasks
                      </span>
                    </div>
                  </a>
                  <a
                    href="javascript:void(0)"
                    className="py-6 px-7 d-flex align-items-center dropdown-item"
                  >
                    <span className="me-3">
                      <img
                        src="/assets/images/profile/user-5.jpg"
                        alt="user"
                        className="rounded-circle"
                        width={48}
                        height={48}
                      />
                    </span>
                    <div className="w-75 d-inline-block v-middle">
                      <h6 className="mb-1 fw-semibold lh-base">
                        John received payment
                      </h6>
                      <span className="fs-2 d-block text-body-secondary">
                        $230 deducted from account
                      </span>
                    </div>
                  </a>
                  <a
                    href="javascript:void(0)"
                    className="py-6 px-7 d-flex align-items-center dropdown-item"
                  >
                    <span className="me-3">
                      <img
                        src="/assets/images/profile/user-1.jpg"
                        alt="user"
                        className="rounded-circle"
                        width={48}
                        height={48}
                      />
                    </span>
                    <div className="w-75 d-inline-block v-middle">
                      <h6 className="mb-1 fw-semibold lh-base">
                        Roman Joined the Team!
                      </h6>
                      <span className="fs-2 d-block text-body-secondary">
                        Congratulate him
                      </span>
                    </div>
                  </a>
                </div>
                <div className="py-6 px-7 mb-1">
                  <button className="btn btn-outline-primary w-100">
                    See All Notifications
                  </button>
                </div>
              </div>
            </li>
            {/* ------------------------------- */}
            {/* end notification Dropdown */}
            {/* ------------------------------- */}
            {/* ------------------------------- */}
            {/* start profile Dropdown */}
            {/* ------------------------------- */}
            <li className="nav-item dropdown">
              <a
                className="nav-link pe-0"
                href="javascript:void(0)"
                id="drop1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <div className="d-flex align-items-center">
                  <div className="user-profile-img">
                    <img
                      src="/assets/images/profile/user-1.jpg"
                      className="rounded-circle"
                      width={35}
                      height={35}
                      alt=""
                    />
                  </div>
                </div>
              </a>
              <div
                className="dropdown-menu content-dd dropdown-menu-end dropdown-menu-animate-up"
                aria-labelledby="drop1"
              >
                <div
                  className="profile-dropdown position-relative"
                  data-simplebar=""
                >
                  <div className="py-3 px-7 pb-0">
                    <h5 className="mb-0 fs-5 fw-semibold">User Profile</h5>
                  </div>
                  <div className="d-flex align-items-center py-9 mx-7 border-bottom">
                    <img
                      src="/assets/images/profile/user-1.jpg"
                      className="rounded-circle"
                      width={80}
                      height={80}
                      alt=""
                    />
                    <div className="ms-3">
                      <h5 className="mb-1 fs-3">qcodesinfotech</h5>
                      <span className="mb-1 d-block">Designer</span>
                      <p className="mb-0 d-flex align-items-center gap-2">
                        <i className="ti ti-mail fs-4" /> info@qcodesinfotech.com
                      </p>
                    </div>
                  </div>
                  <div className="message-body">
                    <a
                      href="#"
                      className="py-8 px-7 mt-8 d-flex align-items-center"
                    >
                      <span className="d-flex align-items-center justify-content-center text-bg-light rounded-1 p-6">
                        <img
                          src="/assets/images/svgs/icon-account.svg"
                          alt=""
                          width={24}
                          height={24}
                        />
                      </span>
                      <div className="w-75 d-inline-block v-middle ps-3">
                        <h6 className="mb-1 fs-3 fw-semibold lh-base">
                          My Profile
                        </h6>
                        <span className="fs-2 d-block text-body-secondary">
                          Account Settings
                        </span>
                      </div>
                    </a>
                    <a
                      href="app-email"
                      className="py-8 px-7 d-flex align-items-center"
                    >
                      <span className="d-flex align-items-center justify-content-center text-bg-light rounded-1 p-6">
                        <img
                          src="/assets/images/svgs/icon-inbox.svg"
                          alt=""
                          width={24}
                          height={24}
                        />
                      </span>
                      <div className="w-75 d-inline-block v-middle ps-3">
                        <h6 className="mb-1 fs-3 fw-semibold lh-base">
                          My Inbox
                        </h6>
                        <span className="fs-2 d-block text-body-secondary">
                          Messages &amp; Emails
                        </span>
                      </div>
                    </a>
                    <a
                      href="app-notes"
                      className="py-8 px-7 d-flex align-items-center"
                    >
                      <span className="d-flex align-items-center justify-content-center text-bg-light rounded-1 p-6">
                        <img
                          src="/assets/images/svgs/icon-tasks.svg"
                          alt=""
                          width={24}
                          height={24}
                        />
                      </span>
                      <div className="w-75 d-inline-block v-middle ps-3">
                        <h6 className="mb-1 fs-3 fw-semibold lh-base">
                          My Task
                        </h6>
                        <span className="fs-2 d-block text-body-secondary">
                          To-do and Daily Tasks
                        </span>
                      </div>
                    </a>
                  </div>
                  <div className="d-grid py-4 px-7 pt-8">
                    <div className="upgrade-plan bg-primary-subtle position-relative overflow-hidden rounded-4 p-4 mb-9">
                      <div className="row">
                        <div className="col-6">
                          <h5 className="fs-4 mb-3 w-50 fw-semibold">
                            Unlimited Access
                          </h5>
                          <button className="btn btn-primary">Upgrade</button>
                        </div>
                        <div className="col-6">
                          <div className="m-n4 unlimited-img">
                            <img
                              src="/assets/images/backgrounds/unlimited-bg.png"
                              alt=""
                              className="w-100"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <a
                      href="#"
                      className="btn btn-outline-primary"
                    >
                      Log Out
                    </a>
                  </div>
                </div>
              </div>
            </li>
            {/* ------------------------------- */}
            {/* end profile Dropdown */}
            {/* ------------------------------- */}
          </ul>
        </div>
      </div>
    </nav>
  </div>
</header>

  )
}

export default Header
