import React from 'react'

const ContactUs = () => {
  return (
    <div>
      <div className="body-wrapper">
        <div className="container-fluid">
          <div className="card bg-info-subtle shadow-none position-relative overflow-hidden mb-4">
            <div className="card-body px-4 py-3">
              <div className="row align-items-center">
                <div className="col-9">
                  <h4 className="fw-semibold mb-8">Contacts</h4>
                  <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                      <li className="breadcrumb-item">
                        <a
                          className="text-muted text-decoration-none"
                          href="index.html"
                        >
                          Home
                        </a>
                      </li>
                      <li className="breadcrumb-item" aria-current="page">
                        Contacts
                      </li>
                    </ol>
                  </nav>
                </div>
                <div className="col-3">
                  <div className="text-center mb-n5">
                    <img
                      src="/assets/images/breadcrumb/ChatBc.png"
                      alt=""
                      className="img-fluid mb-n4"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="card overflow-hidden chat-application">
            <div className="d-flex align-items-center justify-content-between gap-6 m-3 d-lg-none">
              <button
                className="btn btn-primary d-flex"
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#chat-sidebar"
                aria-controls="chat-sidebar"
              >
                <i className="ti ti-menu-2 fs-5" />
              </button>
              <form className="position-relative w-100">
                <input
                  type="text"
                  className="form-control search-chat py-2 ps-5"
                  id="text-srh"
                  placeholder="Search Contact"
                />
                <i className="ti ti-search position-absolute top-50 start-0 translate-middle-y fs-6 text-dark ms-3" />
              </form>
            </div>
            <div className="d-flex w-100">
              <div className="left-part border-end w-20 flex-shrink-0 d-none d-lg-block">
                <div className="px-9 pt-4 pb-3">
                  <button className="btn btn-primary fw-semibold py-8 w-100">
                    Add New Contact
                  </button>
                </div>
                <ul
                  className="list-group"
                  style={{ height: "calc(100vh - 100px)" }}
                  data-simplebar="init"
                >
                  <div className="simplebar-wrapper" style={{ margin: 0 }}>
                    <div className="simplebar-height-auto-observer-wrapper">
                      <div className="simplebar-height-auto-observer" />
                    </div>
                    <div className="simplebar-mask">
                      <div
                        className="simplebar-offset"
                        style={{ right: 0, bottom: 0 }}
                      >
                        <div
                          className="simplebar-content-wrapper"
                          tabIndex={0}
                          role="region"
                          aria-label="scrollable content"
                          style={{ height: "100%", overflow: "hidden" }}
                        >
                          <div className="simplebar-content" style={{ padding: 0 }}>
                            <li className="list-group-item border-0 p-0 mx-9">
                              <a
                                className="d-flex align-items-center gap-6 list-group-item-action text-dark px-3 py-8 mb-1 rounded-1"
                                href="javascript:void(0)"
                              >
                                <i className="ti ti-inbox fs-5" />
                                All Contacts{" "}
                              </a>
                            </li>
                            <li className="list-group-item border-0 p-0 mx-9">
                              <a
                                className="d-flex align-items-center gap-6 list-group-item-action text-dark px-3 py-8 mb-1 rounded-1"
                                href="javascript:void(0)"
                              >
                                <i className="ti ti-star" />
                                Starred{" "}
                              </a>
                            </li>
                            <li className="list-group-item border-0 p-0 mx-9">
                              <a
                                className="d-flex align-items-center gap-6 list-group-item-action text-dark px-3 py-8 mb-1 rounded-1"
                                href="javascript:void(0)"
                              >
                                <i className="ti ti-file-text fs-5" />
                                Pending{" "}
                              </a>
                            </li>
                            <li className="list-group-item border-0 p-0 mx-9">
                              <a
                                className="d-flex align-items-center gap-6 list-group-item-action text-dark px-3 py-8 mb-1 rounded-1"
                                href="javascript:void(0)"
                              >
                                <i className="ti ti-alert-circle" />
                                Blocked{" "}
                              </a>
                            </li>
                            <li className="border-bottom my-3" />
                            <li className="fw-semibold text-dark text-uppercase mx-9 my-2 px-3 fs-2">
                              CATEGORIES
                            </li>
                            <li className="list-group-item border-0 p-0 mx-9">
                              <a
                                className="d-flex align-items-center gap-6 list-group-item-action text-dark px-3 py-8 mb-1 rounded-1"
                                href="javascript:void(0)"
                              >
                                <i className="ti ti-bookmark fs-5 text-primary" />
                                Engineers{" "}
                              </a>
                            </li>
                            <li className="list-group-item border-0 p-0 mx-9">
                              <a
                                className="d-flex align-items-center gap-6 list-group-item-action text-dark px-3 py-8 mb-1 rounded-1"
                                href="javascript:void(0)"
                              >
                                <i className="ti ti-bookmark fs-5 text-warning" />
                                Support Staff{" "}
                              </a>
                            </li>
                            <li className="list-group-item border-0 p-0 mx-9">
                              <a
                                className="d-flex align-items-center gap-6 list-group-item-action text-dark px-3 py-8 mb-1 rounded-1"
                                href="javascript:void(0)"
                              >
                                <i className="ti ti-bookmark fs-5 text-success" />
                                Sales Team{" "}
                              </a>
                            </li>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className="simplebar-placeholder"
                      style={{ width: 223, height: 370 }}
                    />
                  </div>
                  <div
                    className="simplebar-track simplebar-horizontal"
                    style={{ visibility: "hidden" }}
                  >
                    <div
                      className="simplebar-scrollbar"
                      style={{ width: 0, display: "none" }}
                    />
                  </div>
                  <div
                    className="simplebar-track simplebar-vertical"
                    style={{ visibility: "hidden" }}
                  >
                    <div
                      className="simplebar-scrollbar"
                      style={{ height: 0, display: "none" }}
                    />
                  </div>
                </ul>
              </div>
              <div className="d-flex w-100">
                <div className="min-width-340">
                  <div className="border-end user-chat-box h-100">
                    <div className="px-4 pt-9 pb-6 d-none d-lg-block">
                      <form className="position-relative">
                        <input
                          type="text"
                          className="form-control search-chat py-2 ps-5"
                          id="text-srh"
                          placeholder="Search"
                        />
                        <i className="ti ti-search position-absolute top-50 start-0 translate-middle-y fs-6 text-dark ms-3" />
                      </form>
                    </div>
                    <div className="app-chat">
                      <ul
                        className="chat-users"
                        style={{ height: "calc(100vh - 100px)" }}
                        data-simplebar="init"
                      >
                        <div className="simplebar-wrapper" style={{ margin: 0 }}>
                          <div className="simplebar-height-auto-observer-wrapper">
                            <div className="simplebar-height-auto-observer" />
                          </div>
                          <div className="simplebar-mask">
                            <div
                              className="simplebar-offset"
                              style={{ right: 0, bottom: 0 }}
                            >
                              <div
                                className="simplebar-content-wrapper"
                                tabIndex={0}
                                role="region"
                                aria-label="scrollable content"
                                style={{ height: "100%", overflow: "hidden" }}
                              >
                                <div
                                  className="simplebar-content"
                                  style={{ padding: 0 }}
                                >
                                  <li>
                                    <a
                                      href="javascript:void(0)"
                                      className="px-4 py-3 bg-hover-light-black d-flex align-items-center chat-user bg-light-subtle"
                                      id="chat_user_1"
                                      data-user-id={1}
                                    >
                                      <span className="position-relative">
                                        <img
                                          src="/assets/images/profile/user-4.jpg"
                                          alt="user-4"
                                          width={40}
                                          height={40}
                                          className="rounded-circle"
                                        />
                                      </span>
                                      <div className="ms-6 d-inline-block w-75">
                                        <h6
                                          className="mb-1 fw-semibold chat-title"
                                          data-username="James Anderson"
                                        >
                                          Dr. Bonnie Barstow
                                        </h6>
                                        <span className="fs-2 text-body-color d-block">
                                          barstow@ modernize.com
                                        </span>
                                      </div>
                                    </a>
                                  </li>
                                  <li>
                                    <a
                                      href="javascript:void(0)"
                                      className="px-4 py-3 bg-hover-light-black d-flex align-items-center chat-user"
                                      id="chat_user_2"
                                      data-user-id={2}
                                    >
                                      <span className="position-relative">
                                        <img
                                          src="/assets/images/profile/user-4.jpg"
                                          alt="user4"
                                          width={40}
                                          height={40}
                                          className="rounded-circle"
                                        />
                                      </span>
                                      <div className="ms-6 d-inline-block w-75">
                                        <h6
                                          className="mb-1 fw-semibold chat-title"
                                          data-username="James Anderson"
                                        >
                                          Jonathan Higgins
                                        </h6>
                                        <span className="fs-2 text-body-color d-block">
                                          jonathan_hig@modernize.com
                                        </span>
                                      </div>
                                    </a>
                                  </li>
                                  <li>
                                    <a
                                      href="javascript:void(0)"
                                      className="px-4 py-3 bg-hover-light-black d-flex align-items-center chat-user"
                                      id="chat_user_3"
                                      data-user-id={3}
                                    >
                                      <span className="position-relative">
                                        <img
                                          src="/assets/images/profile/user-3.jpg"
                                          alt="user3"
                                          width={40}
                                          height={40}
                                          className="rounded-circle"
                                        />
                                      </span>
                                      <div className="ms-6 d-inline-block w-75">
                                        <h6
                                          className="mb-1 fw-semibold chat-title"
                                          data-username="James Anderson"
                                        >
                                          Michael Knight
                                        </h6>
                                        <span className="fs-2 text-body-color d-block">
                                          michale-knight@gmail.com
                                        </span>
                                      </div>
                                    </a>
                                  </li>
                                  <li>
                                    <a
                                      href="javascript:void(0)"
                                      className="px-4 py-3 bg-hover-light-black d-flex align-items-center chat-user bg-light"
                                      id="chat_user_4"
                                      data-user-id={4}
                                    >
                                      <span className="position-relative">
                                        <img
                                          src="/assets/images/profile/user-8.jpg"
                                          alt="user8"
                                          width={40}
                                          height={40}
                                          className="rounded-circle"
                                        />
                                      </span>
                                      <div className="ms-6 d-inline-block w-75">
                                        <h6
                                          className="mb-1 fw-semibold chat-title"
                                          data-username="James Anderson"
                                        >
                                          Angus MacGyver
                                        </h6>
                                        <span className="fs-2 text-body-color d-block">
                                          macgyver@gmail.com
                                        </span>
                                      </div>
                                    </a>
                                  </li>
                                  <li>
                                    <a
                                      href="javascript:void(0)"
                                      className="px-4 py-3 bg-hover-light-black d-flex align-items-center chat-user"
                                      id="chat_user_5"
                                      data-user-id={5}
                                    >
                                      <span className="position-relative">
                                        <img
                                          src="/assets/images/profile/user-2.jpg"
                                          alt="user2"
                                          width={40}
                                          height={40}
                                          className="rounded-circle"
                                        />
                                      </span>
                                      <div className="ms-6 d-inline-block w-75">
                                        <h6
                                          className="mb-1 fw-semibold chat-title"
                                          data-username="James Anderson"
                                        >
                                          Rick Wright
                                        </h6>
                                        <span className="fs-2 text-body-color d-block">
                                          rockwright@modernize.com
                                        </span>
                                      </div>
                                    </a>
                                  </li>
                                  <li>
                                    <a
                                      href="javascript:void(0)"
                                      className="px-4 py-3 bg-hover-light-black d-flex align-items-center chat-user"
                                      id="chat_user_6"
                                      data-user-id={6}
                                    >
                                      <span className="position-relative">
                                        <img
                                          src="/assets/images/profile/user-1.jpg"
                                          alt="user1"
                                          width={40}
                                          height={40}
                                          className="rounded-circle"
                                        />
                                      </span>
                                      <div className="ms-6 d-inline-block w-75">
                                        <h6
                                          className="mb-1 fw-semibold chat-title"
                                          data-username="James Anderson"
                                        >
                                          Sledge Hammer
                                        </h6>
                                        <span className="fs-2 text-body-color d-block">
                                          hammer9@gmail.com
                                        </span>
                                      </div>
                                    </a>
                                  </li>
                                  <li>
                                    <a
                                      href="javascript:void(0)"
                                      className="px-4 py-3 bg-hover-light-black d-flex align-items-center chat-user"
                                      id="chat_user_7"
                                      data-user-id={7}
                                    >
                                      <span className="position-relative">
                                        <img
                                          src="/assets/images/profile/user-3.jpg"
                                          alt="user3"
                                          width={40}
                                          height={40}
                                          className="rounded-circle"
                                        />
                                      </span>
                                      <div className="ms-6 d-inline-block w-75">
                                        <h6
                                          className="mb-1 fw-semibold chat-title"
                                          data-username="James Anderson"
                                        >
                                          Peter Thornton
                                        </h6>
                                        <span className="fs-2 text-body-color d-block">
                                          peter293@modernize.com
                                        </span>
                                      </div>
                                    </a>
                                  </li>
                                  <li>
                                    <a
                                      href="javascript:void(0)"
                                      className="px-4 py-3 bg-hover-light-black d-flex align-items-center chat-user"
                                      id="chat_user_8"
                                      data-user-id={8}
                                    >
                                      <span className="position-relative">
                                        <img
                                          src="/assets/images/profile/user-1.jpg"
                                          alt="user1"
                                          width={40}
                                          height={40}
                                          className="rounded-circle"
                                        />
                                      </span>
                                      <div className="ms-6 d-inline-block w-75">
                                        <h6
                                          className="mb-1 fw-semibold chat-title"
                                          data-username="James Anderson"
                                        >
                                          Devon Miles
                                        </h6>
                                        <span className="fs-2 text-body-color d-block">
                                          devon@gmail.com
                                        </span>
                                      </div>
                                    </a>
                                  </li>
                                  <li>
                                    <a
                                      href="javascript:void(0)"
                                      className="px-4 py-3 bg-hover-light-black d-flex align-items-center chat-user"
                                      id="chat_user_9"
                                      data-user-id={9}
                                    >
                                      <span className="position-relative">
                                        <img
                                          src="/assets/images/profile/user-1.jpg"
                                          alt="user1"
                                          width={40}
                                          height={40}
                                          className="rounded-circle"
                                        />
                                      </span>
                                      <div className="ms-6 d-inline-block w-75">
                                        <h6
                                          className="mb-1 fw-semibold chat-title"
                                          data-username="James Anderson"
                                        >
                                          Michael Knight
                                        </h6>
                                        <span className="fs-2 text-body-color d-block">
                                          michael_knight@modernize.com
                                        </span>
                                      </div>
                                    </a>
                                  </li>
                                  <li>
                                    <a
                                      href="javascript:void(0)"
                                      className="px-4 py-3 bg-hover-light-black d-flex align-items-center chat-user"
                                      id="chat_user_10"
                                      data-user-id={10}
                                    >
                                      <span className="position-relative">
                                        <img
                                          src="/assets/images/profile/user-1.jpg"
                                          alt="user1"
                                          width={40}
                                          height={40}
                                          className="rounded-circle"
                                        />
                                      </span>
                                      <div className="ms-6 d-inline-block w-75">
                                        <h6
                                          className="mb-1 fw-semibold chat-title"
                                          data-username="James Anderson"
                                        >
                                          Mike Torello
                                        </h6>
                                        <span className="fs-2 text-body-color d-block">
                                          torello@gmail.com
                                        </span>
                                      </div>
                                    </a>
                                  </li>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div
                            className="simplebar-placeholder"
                            style={{ width: 339, height: 720 }}
                          />
                        </div>
                        <div
                          className="simplebar-track simplebar-horizontal"
                          style={{ visibility: "hidden" }}
                        >
                          <div
                            className="simplebar-scrollbar"
                            style={{ width: 0, display: "none" }}
                          />
                        </div>
                        <div
                          className="simplebar-track simplebar-vertical"
                          style={{ visibility: "hidden" }}
                        >
                          <div
                            className="simplebar-scrollbar"
                            style={{
                              height: 0,
                              transform: "translate3d(0px, 0px, 0px)",
                              display: "none"
                            }}
                          />
                        </div>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="w-100">
                  <div className="chat-container h-100 w-100">
                    <div className="chat-box-inner-part h-100">
                      <div className="chatting-box app-email-chatting-box">
                        <div className="p-9 py-3 border-bottom chat-meta-user d-flex align-items-center justify-content-between chat-active">
                          <h5 className="text-dark mb-0 fs-5">Contact Details</h5>
                          <ul className="list-unstyled mb-0 d-flex align-items-center">
                            <li className="d-lg-none d-block">
                              <a
                                className="text-dark back-btn px-2 fs-5 bg-hover-primary nav-icon-hover position-relative z-index-5"
                                href="javascript:void(0)"
                              >
                                <i className="ti ti-arrow-left" />
                              </a>
                            </li>
                            <li
                              className="position-relative"
                              data-bs-toggle="tooltip"
                              data-bs-placement="top"
                              data-bs-title="important"
                            >
                              <a
                                className="text-dark px-2 fs-5 bg-hover-primary nav-icon-hover position-relative z-index-5"
                                href="javascript:void(0)"
                              >
                                <i className="ti ti-star" />
                              </a>
                            </li>
                            <li
                              className="position-relative"
                              data-bs-toggle="tooltip"
                              data-bs-placement="top"
                              data-bs-title="Edit"
                            >
                              <a
                                className="d-block text-dark px-2 fs-5 bg-hover-primary nav-icon-hover position-relative z-index-5"
                                href="javascript:void(0)"
                              >
                                <i className="ti ti-pencil" />
                              </a>
                            </li>
                            <li
                              className="position-relative"
                              data-bs-toggle="tooltip"
                              data-bs-placement="top"
                              data-bs-title="Delete"
                            >
                              <a
                                className="text-dark px-2 fs-5 bg-hover-primary nav-icon-hover position-relative z-index-5"
                                href="javascript:void(0)"
                              >
                                <i className="ti ti-trash" />
                              </a>
                            </li>
                          </ul>
                        </div>
                        <div className="position-relative overflow-hidden">
                          <div className="position-relative">
                            <div
                              className="chat-box p-9"
                              style={{ height: "calc(100vh - 428px)" }}
                              data-simplebar="init"
                            >
                              <div
                                className="simplebar-wrapper"
                                style={{ margin: "-20px" }}
                              >
                                <div className="simplebar-height-auto-observer-wrapper">
                                  <div className="simplebar-height-auto-observer" />
                                </div>
                                <div className="simplebar-mask">
                                  <div
                                    className="simplebar-offset"
                                    style={{ right: 0, bottom: 0 }}
                                  >
                                    <div
                                      className="simplebar-content-wrapper"
                                      tabIndex={0}
                                      role="region"
                                      aria-label="scrollable content"
                                      style={{
                                        height: "100%",
                                        overflow: "hidden scroll"
                                      }}
                                    >
                                      <div
                                        className="simplebar-content"
                                        style={{ padding: 20 }}
                                      >
                                        <div
                                          className="chat-list chat"
                                          data-user-id={1}
                                        >
                                          <div className="hstack align-items-start mb-7 pb-1 align-items-center justify-content-between">
                                            <div className="d-flex align-items-center gap-3">
                                              <img
                                                src="/assets/images/profile/user-4.jpg"
                                                alt="user4"
                                                width={72}
                                                height={72}
                                                className="rounded-circle"
                                              />
                                              <div>
                                                <h6 className="fw-semibold fs-4 mb-0">
                                                  Dr. Bonnie Barstow{" "}
                                                </h6>
                                                <p className="mb-0">Sales Manager</p>
                                                <p className="mb-0">
                                                  Digital Arc Pvt. Ltd.
                                                </p>
                                              </div>
                                            </div>
                                          </div>
                                          <div className="row">
                                            <div className="col-4 mb-7">
                                              <p className="mb-1 fs-2">
                                                Phone number
                                              </p>
                                              <h6 className="fw-semibold mb-0">
                                                +1 (203) 3458
                                              </h6>
                                            </div>
                                            <div className="col-8 mb-7">
                                              <p className="mb-1 fs-2">
                                                Email address
                                              </p>
                                              <h6 className="fw-semibold mb-0">
                                                alexandra@modernize.com
                                              </h6>
                                            </div>
                                            <div className="col-12 mb-9">
                                              <p className="mb-1 fs-2">Address</p>
                                              <h6 className="fw-semibold mb-0">
                                                312, Imperical Arc, New western corner
                                              </h6>
                                            </div>
                                            <div className="col-4 mb-7">
                                              <p className="mb-1 fs-2">City</p>
                                              <h6 className="fw-semibold mb-0">
                                                New York
                                              </h6>
                                            </div>
                                            <div className="col-8 mb-7">
                                              <p className="mb-1 fs-2">Country</p>
                                              <h6 className="fw-semibold mb-0">
                                                United Stats
                                              </h6>
                                            </div>
                                          </div>
                                          <div className="border-bottom pb-7 mb-4">
                                            <p className="mb-2 fs-2">Notes</p>
                                            <p className="mb-3 text-dark">
                                              Lorem ipsum dolor sit amet, consectetur
                                              adipiscing elit. Quisque bibendum
                                              hendrerit lobortis. Nullam ut lacus
                                              eros. Sed at luctus urna, eu fermentum
                                              diam. In et tristique mauris.
                                            </p>
                                            <p className="mb-0 text-dark">
                                              Ut id ornare metus, sed auctor enim.
                                              Pellentesque nisi magna, laoreet a augue
                                              eget, tempor volutpat diam.
                                            </p>
                                          </div>
                                          <div className="d-flex align-items-center gap-6">
                                            <button
                                              className="btn btn-primary fs-2"
                                              fdprocessedid="pk6kl8"
                                            >
                                              Edit
                                            </button>
                                            <button
                                              className="btn bg-danger-subtle text-danger fs-2"
                                              fdprocessedid="83zpb"
                                            >
                                              Delete
                                            </button>
                                          </div>
                                        </div>
                                        <div
                                          className="chat-list chat"
                                          data-user-id={2}
                                        >
                                          <div className="hstack align-items-start mb-7 pb-1 align-items-center justify-content-between">
                                            <div className="d-flex align-items-center gap-3">
                                              <img
                                                src="/assets/images/profile/user-4.jpg"
                                                alt="user4"
                                                width={72}
                                                height={72}
                                                className="rounded-circle"
                                              />
                                              <div>
                                                <h6 className="fw-semibold fs-4 mb-0">
                                                  Jonathan Higgins
                                                </h6>
                                                <p className="mb-0">Sales Manager</p>
                                                <p className="mb-0">
                                                  Digital Arc Pvt. Ltd.
                                                </p>
                                              </div>
                                            </div>
                                          </div>
                                          <div className="row">
                                            <div className="col-4 mb-7">
                                              <p className="mb-1 fs-2">
                                                Phone number
                                              </p>
                                              <h6 className="fw-semibold mb-0">
                                                +1 (203) 3458
                                              </h6>
                                            </div>
                                            <div className="col-8 mb-7">
                                              <p className="mb-1 fs-2">
                                                Email address
                                              </p>
                                              <h6 className="fw-semibold mb-0">
                                                alexandra@modernize.com
                                              </h6>
                                            </div>
                                            <div className="col-12 mb-9">
                                              <p className="mb-1 fs-2">Address</p>
                                              <h6 className="fw-semibold mb-0">
                                                312, Imperical Arc, New western corner
                                              </h6>
                                            </div>
                                            <div className="col-4 mb-7">
                                              <p className="mb-1 fs-2">City</p>
                                              <h6 className="fw-semibold mb-0">
                                                New York
                                              </h6>
                                            </div>
                                            <div className="col-8 mb-7">
                                              <p className="mb-1 fs-2">Country</p>
                                              <h6 className="fw-semibold mb-0">
                                                United Stats
                                              </h6>
                                            </div>
                                          </div>
                                          <div className="border-bottom pb-7 mb-4">
                                            <p className="mb-2 fs-2">Notes</p>
                                            <p className="mb-3 text-dark">
                                              Lorem ipsum dolor sit amet, consectetur
                                              adipiscing elit. Quisque bibendum
                                              hendrerit lobortis. Nullam ut lacus
                                              eros. Sed at luctus urna, eu fermentum
                                              diam. In et tristique mauris.
                                            </p>
                                            <p className="mb-0 text-dark">
                                              Ut id ornare metus, sed auctor enim.
                                              Pellentesque nisi magna, laoreet a augue
                                              eget, tempor volutpat diam.
                                            </p>
                                          </div>
                                          <div className="d-flex align-items-center gap-6">
                                            <button className="btn btn-primary fs-2">
                                              Edit
                                            </button>
                                            <button className="btn bg-danger-subtle text-danger fs-2">
                                              Delete
                                            </button>
                                          </div>
                                        </div>
                                        <div
                                          className="chat-list chat"
                                          data-user-id={3}
                                        >
                                          <div className="hstack align-items-start mb-7 pb-1 align-items-center justify-content-between">
                                            <div className="d-flex align-items-center gap-3">
                                              <img
                                                src="/assets/images/profile/user-3.jpg"
                                                alt="user3"
                                                width={72}
                                                height={72}
                                                className="rounded-circle"
                                              />
                                              <div>
                                                <h6 className="fw-semibold fs-4 mb-0">
                                                  Michael Knight{" "}
                                                </h6>
                                                <p className="mb-0">Sales Manager</p>
                                                <p className="mb-0">
                                                  Digital Arc Pvt. Ltd.
                                                </p>
                                              </div>
                                            </div>
                                          </div>
                                          <div className="row">
                                            <div className="col-4 mb-7">
                                              <p className="mb-1 fs-2">
                                                Phone number
                                              </p>
                                              <h6 className="fw-semibold mb-0">
                                                +1 (203) 3458
                                              </h6>
                                            </div>
                                            <div className="col-8 mb-7">
                                              <p className="mb-1 fs-2">
                                                Email address
                                              </p>
                                              <h6 className="fw-semibold mb-0">
                                                alexandra@modernize.com
                                              </h6>
                                            </div>
                                            <div className="col-12 mb-9">
                                              <p className="mb-1 fs-2">Address</p>
                                              <h6 className="fw-semibold mb-0">
                                                312, Imperical Arc, New western corner
                                              </h6>
                                            </div>
                                            <div className="col-4 mb-7">
                                              <p className="mb-1 fs-2">City</p>
                                              <h6 className="fw-semibold mb-0">
                                                New York
                                              </h6>
                                            </div>
                                            <div className="col-8 mb-7">
                                              <p className="mb-1 fs-2">Country</p>
                                              <h6 className="fw-semibold mb-0">
                                                United Stats
                                              </h6>
                                            </div>
                                          </div>
                                          <div className="border-bottom pb-7 mb-4">
                                            <p className="mb-2 fs-2">Notes</p>
                                            <p className="mb-3 text-dark">
                                              Lorem ipsum dolor sit amet, consectetur
                                              adipiscing elit. Quisque bibendum
                                              hendrerit lobortis. Nullam ut lacus
                                              eros. Sed at luctus urna, eu fermentum
                                              diam. In et tristique mauris.
                                            </p>
                                            <p className="mb-0 text-dark">
                                              Ut id ornare metus, sed auctor enim.
                                              Pellentesque nisi magna, laoreet a augue
                                              eget, tempor volutpat diam.
                                            </p>
                                          </div>
                                          <div className="d-flex align-items-center gap-6">
                                            <button className="btn btn-primary fs-2">
                                              Edit
                                            </button>
                                            <button className="btn bg-danger-subtle text-danger fs-2">
                                              Delete
                                            </button>
                                          </div>
                                        </div>
                                        <div
                                          className="chat-list chat active-chat"
                                          data-user-id={4}
                                        >
                                          <div className="hstack align-items-start mb-7 pb-1 align-items-center justify-content-between">
                                            <div className="d-flex align-items-center gap-3">
                                              <img
                                                src="/assets/images/profile/user-8.jpg"
                                                alt="user8"
                                                width={72}
                                                height={72}
                                                className="rounded-circle"
                                              />
                                              <div>
                                                <h6 className="fw-semibold fs-4 mb-0">
                                                  Angus MacGyver
                                                </h6>
                                                <p className="mb-0">Sales Manager</p>
                                                <p className="mb-0">
                                                  Digital Arc Pvt. Ltd.
                                                </p>
                                              </div>
                                            </div>
                                          </div>
                                          <div className="row">
                                            <div className="col-4 mb-7">
                                              <p className="mb-1 fs-2">
                                                Phone number
                                              </p>
                                              <h6 className="fw-semibold mb-0">
                                                +1 (203) 3458
                                              </h6>
                                            </div>
                                            <div className="col-8 mb-7">
                                              <p className="mb-1 fs-2">
                                                Email address
                                              </p>
                                              <h6 className="fw-semibold mb-0">
                                                alexandra@modernize.com
                                              </h6>
                                            </div>
                                            <div className="col-12 mb-9">
                                              <p className="mb-1 fs-2">Address</p>
                                              <h6 className="fw-semibold mb-0">
                                                312, Imperical Arc, New western corner
                                              </h6>
                                            </div>
                                            <div className="col-4 mb-7">
                                              <p className="mb-1 fs-2">City</p>
                                              <h6 className="fw-semibold mb-0">
                                                New York
                                              </h6>
                                            </div>
                                            <div className="col-8 mb-7">
                                              <p className="mb-1 fs-2">Country</p>
                                              <h6 className="fw-semibold mb-0">
                                                United Stats
                                              </h6>
                                            </div>
                                          </div>
                                          <div className="border-bottom pb-7 mb-4">
                                            <p className="mb-2 fs-2">Notes</p>
                                            <p className="mb-3 text-dark">
                                              Lorem ipsum dolor sit amet, consectetur
                                              adipiscing elit. Quisque bibendum
                                              hendrerit lobortis. Nullam ut lacus
                                              eros. Sed at luctus urna, eu fermentum
                                              diam. In et tristique mauris.
                                            </p>
                                            <p className="mb-0 text-dark">
                                              Ut id ornare metus, sed auctor enim.
                                              Pellentesque nisi magna, laoreet a augue
                                              eget, tempor volutpat diam.
                                            </p>
                                          </div>
                                          <div className="d-flex align-items-center gap-6">
                                            <button className="btn btn-primary fs-2">
                                              Edit
                                            </button>
                                            <button className="btn bg-danger-subtle text-danger fs-2">
                                              Delete
                                            </button>
                                          </div>
                                        </div>
                                        <div
                                          className="chat-list chat"
                                          data-user-id={5}
                                        >
                                          <div className="hstack align-items-start mb-7 pb-1 align-items-center justify-content-between">
                                            <div className="d-flex align-items-center gap-3">
                                              <img
                                                src="/assets/images/profile/user-2.jpg"
                                                alt="user2"
                                                width={72}
                                                height={72}
                                                className="rounded-circle"
                                              />
                                              <div>
                                                <h6 className="fw-semibold fs-4 mb-0">
                                                  Rick Wright
                                                </h6>
                                                <p className="mb-0">Sales Manager</p>
                                                <p className="mb-0">
                                                  Digital Arc Pvt. Ltd.
                                                </p>
                                              </div>
                                            </div>
                                          </div>
                                          <div className="row">
                                            <div className="col-4 mb-7">
                                              <p className="mb-1 fs-2">
                                                Phone number
                                              </p>
                                              <h6 className="fw-semibold mb-0">
                                                +1 (203) 3458
                                              </h6>
                                            </div>
                                            <div className="col-8 mb-7">
                                              <p className="mb-1 fs-2">
                                                Email address
                                              </p>
                                              <h6 className="fw-semibold mb-0">
                                                alexandra@modernize.com
                                              </h6>
                                            </div>
                                            <div className="col-12 mb-9">
                                              <p className="mb-1 fs-2">Address</p>
                                              <h6 className="fw-semibold mb-0">
                                                312, Imperical Arc, New western corner
                                              </h6>
                                            </div>
                                            <div className="col-4 mb-7">
                                              <p className="mb-1 fs-2">City</p>
                                              <h6 className="fw-semibold mb-0">
                                                New York
                                              </h6>
                                            </div>
                                            <div className="col-8 mb-7">
                                              <p className="mb-1 fs-2">Country</p>
                                              <h6 className="fw-semibold mb-0">
                                                United Stats
                                              </h6>
                                            </div>
                                          </div>
                                          <div className="border-bottom pb-7 mb-4">
                                            <p className="mb-2 fs-2">Notes</p>
                                            <p className="mb-3 text-dark">
                                              Lorem ipsum dolor sit amet, consectetur
                                              adipiscing elit. Quisque bibendum
                                              hendrerit lobortis. Nullam ut lacus
                                              eros. Sed at luctus urna, eu fermentum
                                              diam. In et tristique mauris.
                                            </p>
                                            <p className="mb-0 text-dark">
                                              Ut id ornare metus, sed auctor enim.
                                              Pellentesque nisi magna, laoreet a augue
                                              eget, tempor volutpat diam.
                                            </p>
                                          </div>
                                          <div className="d-flex align-items-center gap-6">
                                            <button className="btn btn-primary fs-2">
                                              Edit
                                            </button>
                                            <button className="btn bg-danger-subtle text-danger fs-2">
                                              Delete
                                            </button>
                                          </div>
                                        </div>
                                        <div
                                          className="chat-list chat"
                                          data-user-id={6}
                                        >
                                          <div className="hstack align-items-start mb-7 pb-1 align-items-center justify-content-between">
                                            <div className="d-flex align-items-center gap-3">
                                              <img
                                                src="/assets/images/profile/user-1.jpg"
                                                alt="user1"
                                                width={72}
                                                height={72}
                                                className="rounded-circle"
                                              />
                                              <div>
                                                <h6 className="fw-semibold fs-4 mb-0">
                                                  Sledge Hammer
                                                </h6>
                                                <p className="mb-0">Sales Manager</p>
                                                <p className="mb-0">
                                                  Digital Arc Pvt. Ltd.
                                                </p>
                                              </div>
                                            </div>
                                          </div>
                                          <div className="row">
                                            <div className="col-4 mb-7">
                                              <p className="mb-1 fs-2">
                                                Phone number
                                              </p>
                                              <h6 className="fw-semibold mb-0">
                                                +1 (203) 3458
                                              </h6>
                                            </div>
                                            <div className="col-8 mb-7">
                                              <p className="mb-1 fs-2">
                                                Email address
                                              </p>
                                              <h6 className="fw-semibold mb-0">
                                                alexandra@modernize.com
                                              </h6>
                                            </div>
                                            <div className="col-12 mb-9">
                                              <p className="mb-1 fs-2">Address</p>
                                              <h6 className="fw-semibold mb-0">
                                                312, Imperical Arc, New western corner
                                              </h6>
                                            </div>
                                            <div className="col-4 mb-7">
                                              <p className="mb-1 fs-2">City</p>
                                              <h6 className="fw-semibold mb-0">
                                                New York
                                              </h6>
                                            </div>
                                            <div className="col-8 mb-7">
                                              <p className="mb-1 fs-2">Country</p>
                                              <h6 className="fw-semibold mb-0">
                                                United Stats
                                              </h6>
                                            </div>
                                          </div>
                                          <div className="border-bottom pb-7 mb-4">
                                            <p className="mb-2 fs-2">Notes</p>
                                            <p className="mb-3 text-dark">
                                              Lorem ipsum dolor sit amet, consectetur
                                              adipiscing elit. Quisque bibendum
                                              hendrerit lobortis. Nullam ut lacus
                                              eros. Sed at luctus urna, eu fermentum
                                              diam. In et tristique mauris.
                                            </p>
                                            <p className="mb-0 text-dark">
                                              Ut id ornare metus, sed auctor enim.
                                              Pellentesque nisi magna, laoreet a augue
                                              eget, tempor volutpat diam.
                                            </p>
                                          </div>
                                          <div className="d-flex align-items-center gap-6">
                                            <button className="btn btn-primary fs-2">
                                              Edit
                                            </button>
                                            <button className="btn bg-danger-subtle text-danger fs-2">
                                              Delete
                                            </button>
                                          </div>
                                        </div>
                                        <div
                                          className="chat-list chat"
                                          data-user-id={7}
                                        >
                                          <div className="hstack align-items-start mb-7 pb-1 align-items-center justify-content-between">
                                            <div className="d-flex align-items-center gap-3">
                                              <img
                                                src="/assets/images/profile/user-3.jpg"
                                                alt="user3"
                                                width={72}
                                                height={72}
                                                className="rounded-circle"
                                              />
                                              <div>
                                                <h6 className="fw-semibold fs-4 mb-0">
                                                  Peter Thornton
                                                </h6>
                                                <p className="mb-0">Sales Manager</p>
                                                <p className="mb-0">
                                                  Digital Arc Pvt. Ltd.
                                                </p>
                                              </div>
                                            </div>
                                          </div>
                                          <div className="row">
                                            <div className="col-4 mb-7">
                                              <p className="mb-1 fs-2">
                                                Phone number
                                              </p>
                                              <h6 className="fw-semibold mb-0">
                                                +1 (203) 3458
                                              </h6>
                                            </div>
                                            <div className="col-8 mb-7">
                                              <p className="mb-1 fs-2">
                                                Email address
                                              </p>
                                              <h6 className="fw-semibold mb-0">
                                                alexandra@modernize.com
                                              </h6>
                                            </div>
                                            <div className="col-12 mb-9">
                                              <p className="mb-1 fs-2">Address</p>
                                              <h6 className="fw-semibold mb-0">
                                                312, Imperical Arc, New western corner
                                              </h6>
                                            </div>
                                            <div className="col-4 mb-7">
                                              <p className="mb-1 fs-2">City</p>
                                              <h6 className="fw-semibold mb-0">
                                                New York
                                              </h6>
                                            </div>
                                            <div className="col-8 mb-7">
                                              <p className="mb-1 fs-2">Country</p>
                                              <h6 className="fw-semibold mb-0">
                                                United Stats
                                              </h6>
                                            </div>
                                          </div>
                                          <div className="border-bottom pb-7 mb-4">
                                            <p className="mb-2 fs-2">Notes</p>
                                            <p className="mb-3 text-dark">
                                              Lorem ipsum dolor sit amet, consectetur
                                              adipiscing elit. Quisque bibendum
                                              hendrerit lobortis. Nullam ut lacus
                                              eros. Sed at luctus urna, eu fermentum
                                              diam. In et tristique mauris.
                                            </p>
                                            <p className="mb-0 text-dark">
                                              Ut id ornare metus, sed auctor enim.
                                              Pellentesque nisi magna, laoreet a augue
                                              eget, tempor volutpat diam.
                                            </p>
                                          </div>
                                          <div className="d-flex align-items-center gap-6">
                                            <button className="btn btn-primary fs-2">
                                              Edit
                                            </button>
                                            <button className="btn bg-danger-subtle text-danger fs-2">
                                              Delete
                                            </button>
                                          </div>
                                        </div>
                                        <div
                                          className="chat-list chat"
                                          data-user-id={8}
                                        >
                                          <div className="hstack align-items-start mb-7 pb-1 align-items-center justify-content-between">
                                            <div className="d-flex align-items-center gap-3">
                                              <img
                                                src="/assets/images/profile/user-1.jpg"
                                                alt="user1"
                                                width={72}
                                                height={72}
                                                className="rounded-circle"
                                              />
                                              <div>
                                                <h6 className="fw-semibold fs-4 mb-0">
                                                  Devon Miles
                                                </h6>
                                                <p className="mb-0">Sales Manager</p>
                                                <p className="mb-0">
                                                  Digital Arc Pvt. Ltd.
                                                </p>
                                              </div>
                                            </div>
                                          </div>
                                          <div className="row">
                                            <div className="col-4 mb-7">
                                              <p className="mb-1 fs-2">
                                                Phone number
                                              </p>
                                              <h6 className="fw-semibold mb-0">
                                                +1 (203) 3458
                                              </h6>
                                            </div>
                                            <div className="col-8 mb-7">
                                              <p className="mb-1 fs-2">
                                                Email address
                                              </p>
                                              <h6 className="fw-semibold mb-0">
                                                alexandra@modernize.com
                                              </h6>
                                            </div>
                                            <div className="col-12 mb-9">
                                              <p className="mb-1 fs-2">Address</p>
                                              <h6 className="fw-semibold mb-0">
                                                312, Imperical Arc, New western corner
                                              </h6>
                                            </div>
                                            <div className="col-4 mb-7">
                                              <p className="mb-1 fs-2">City</p>
                                              <h6 className="fw-semibold mb-0">
                                                New York
                                              </h6>
                                            </div>
                                            <div className="col-8 mb-7">
                                              <p className="mb-1 fs-2">Country</p>
                                              <h6 className="fw-semibold mb-0">
                                                United Stats
                                              </h6>
                                            </div>
                                          </div>
                                          <div className="border-bottom pb-7 mb-4">
                                            <p className="mb-2 fs-2">Notes</p>
                                            <p className="mb-3 text-dark">
                                              Lorem ipsum dolor sit amet, consectetur
                                              adipiscing elit. Quisque bibendum
                                              hendrerit lobortis. Nullam ut lacus
                                              eros. Sed at luctus urna, eu fermentum
                                              diam. In et tristique mauris.
                                            </p>
                                            <p className="mb-0 text-dark">
                                              Ut id ornare metus, sed auctor enim.
                                              Pellentesque nisi magna, laoreet a augue
                                              eget, tempor volutpat diam.
                                            </p>
                                          </div>
                                          <div className="d-flex align-items-center gap-6">
                                            <button className="btn btn-primary fs-2">
                                              Edit
                                            </button>
                                            <button className="btn bg-danger-subtle text-danger fs-2">
                                              Delete
                                            </button>
                                          </div>
                                        </div>
                                        <div
                                          className="chat-list chat"
                                          data-user-id={9}
                                        >
                                          <div className="hstack align-items-start mb-7 pb-1 align-items-center justify-content-between">
                                            <div className="d-flex align-items-center gap-3">
                                              <img
                                                src="../assets/images/profile/user-1.jpg"
                                                alt="user1"
                                                width={72}
                                                height={72}
                                                className="rounded-circle"
                                              />
                                              <div>
                                                <h6 className="fw-semibold fs-4 mb-0">
                                                  Michael Knight
                                                </h6>
                                                <p className="mb-0">Sales Manager</p>
                                                <p className="mb-0">
                                                  Digital Arc Pvt. Ltd.
                                                </p>
                                              </div>
                                            </div>
                                          </div>
                                          <div className="row">
                                            <div className="col-4 mb-7">
                                              <p className="mb-1 fs-2">
                                                Phone number
                                              </p>
                                              <h6 className="fw-semibold mb-0">
                                                +1 (203) 3458
                                              </h6>
                                            </div>
                                            <div className="col-8 mb-7">
                                              <p className="mb-1 fs-2">
                                                Email address
                                              </p>
                                              <h6 className="fw-semibold mb-0">
                                                alexandra@modernize.com
                                              </h6>
                                            </div>
                                            <div className="col-12 mb-9">
                                              <p className="mb-1 fs-2">Address</p>
                                              <h6 className="fw-semibold mb-0">
                                                312, Imperical Arc, New western corner
                                              </h6>
                                            </div>
                                            <div className="col-4 mb-7">
                                              <p className="mb-1 fs-2">City</p>
                                              <h6 className="fw-semibold mb-0">
                                                New York
                                              </h6>
                                            </div>
                                            <div className="col-8 mb-7">
                                              <p className="mb-1 fs-2">Country</p>
                                              <h6 className="fw-semibold mb-0">
                                                United Stats
                                              </h6>
                                            </div>
                                          </div>
                                          <div className="border-bottom pb-7 mb-4">
                                            <p className="mb-2 fs-2">Notes</p>
                                            <p className="mb-3 text-dark">
                                              Lorem ipsum dolor sit amet, consectetur
                                              adipiscing elit. Quisque bibendum
                                              hendrerit lobortis. Nullam ut lacus
                                              eros. Sed at luctus urna, eu fermentum
                                              diam. In et tristique mauris.
                                            </p>
                                            <p className="mb-0 text-dark">
                                              Ut id ornare metus, sed auctor enim.
                                              Pellentesque nisi magna, laoreet a augue
                                              eget, tempor volutpat diam.
                                            </p>
                                          </div>
                                          <div className="d-flex align-items-center gap-6">
                                            <button className="btn btn-primary fs-2">
                                              Edit
                                            </button>
                                            <button className="btn bg-danger-subtle text-danger fs-2">
                                              Delete
                                            </button>
                                          </div>
                                        </div>
                                        <div
                                          className="chat-list chat"
                                          data-user-id={10}
                                        >
                                          <div className="hstack align-items-start mb-7 pb-1 align-items-center justify-content-between">
                                            <div className="d-flex align-items-center gap-3">
                                              <img
                                                src="../assets/images/profile/user-1.jpg"
                                                alt="user1"
                                                width={72}
                                                height={72}
                                                className="rounded-circle"
                                              />
                                              <div>
                                                <h6 className="fw-semibold fs-4 mb-0">
                                                  Mike Torello
                                                </h6>
                                                <p className="mb-0">Sales Manager</p>
                                                <p className="mb-0">
                                                  Digital Arc Pvt. Ltd.
                                                </p>
                                              </div>
                                            </div>
                                          </div>
                                          <div className="row">
                                            <div className="col-4 mb-7">
                                              <p className="mb-1 fs-2">
                                                Phone number
                                              </p>
                                              <h6 className="fw-semibold mb-0">
                                                +1 (203) 3458
                                              </h6>
                                            </div>
                                            <div className="col-8 mb-7">
                                              <p className="mb-1 fs-2">
                                                Email address
                                              </p>
                                              <h6 className="fw-semibold mb-0">
                                                alexandra@modernize.com
                                              </h6>
                                            </div>
                                            <div className="col-12 mb-9">
                                              <p className="mb-1 fs-2">Address</p>
                                              <h6 className="fw-semibold mb-0">
                                                312, Imperical Arc, New western corner
                                              </h6>
                                            </div>
                                            <div className="col-4 mb-7">
                                              <p className="mb-1 fs-2">City</p>
                                              <h6 className="fw-semibold mb-0">
                                                New York
                                              </h6>
                                            </div>
                                            <div className="col-8 mb-7">
                                              <p className="mb-1 fs-2">Country</p>
                                              <h6 className="fw-semibold mb-0">
                                                United Stats
                                              </h6>
                                            </div>
                                          </div>
                                          <div className="border-bottom pb-7 mb-4">
                                            <p className="mb-2 fs-2">Notes</p>
                                            <p className="mb-3 text-dark">
                                              Lorem ipsum dolor sit amet, consectetur
                                              adipiscing elit. Quisque bibendum
                                              hendrerit lobortis. Nullam ut lacus
                                              eros. Sed at luctus urna, eu fermentum
                                              diam. In et tristique mauris.
                                            </p>
                                            <p className="mb-0 text-dark">
                                              Ut id ornare metus, sed auctor enim.
                                              Pellentesque nisi magna, laoreet a augue
                                              eget, tempor volutpat diam.
                                            </p>
                                          </div>
                                          <div className="d-flex align-items-center gap-6">
                                            <button className="btn btn-primary fs-2">
                                              Edit
                                            </button>
                                            <button className="btn bg-danger-subtle text-danger fs-2">
                                              Delete
                                            </button>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div
                                  className="simplebar-placeholder"
                                  style={{ width: "auto", height: 578 }}
                                />
                              </div>
                              <div
                                className="simplebar-track simplebar-horizontal"
                                style={{ visibility: "hidden" }}
                              >
                                <div
                                  className="simplebar-scrollbar"
                                  style={{ width: 0, display: "none" }}
                                />
                              </div>
                              <div
                                className="simplebar-track simplebar-vertical"
                                style={{ visibility: "visible" }}
                              >
                                <div
                                  className="simplebar-scrollbar"
                                  style={{
                                    height: 128,
                                    transform: "translate3d(0px, 0px, 0px)",
                                    display: "block"
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="offcanvas user-chat-box offcanvas-end"
                tabIndex={-1}
                id="chat-sidebar"
                aria-labelledby="offcanvasExampleLabel"
              >
                <div className="offcanvas-header">
                  <h5 className="offcanvas-title" id="offcanvasExampleLabel">
                    {" "}
                    Contact{" "}
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                  />
                </div>
                <div className="px-9 pt-4 pb-3">
                  <button className="btn btn-primary fw-semibold py-8 w-100">
                    Add New Contact
                  </button>
                </div>
                <ul
                  className="list-group"
                  style={{ height: "calc(100vh - 150px)" }}
                  data-simplebar="init"
                >
                  <div className="simplebar-wrapper" style={{ margin: 0 }}>
                    <div className="simplebar-height-auto-observer-wrapper">
                      <div className="simplebar-height-auto-observer" />
                    </div>
                    <div className="simplebar-mask">
                      <div
                        className="simplebar-offset"
                        style={{ right: 0, bottom: 0 }}
                      >
                        <div
                          className="simplebar-content-wrapper"
                          tabIndex={0}
                          role="region"
                          aria-label="scrollable content"
                          style={{ height: "100%", overflow: "hidden" }}
                        >
                          <div className="simplebar-content" style={{ padding: 0 }}>
                            <li className="list-group-item border-0 p-0 mx-9">
                              <a
                                className="d-flex align-items-center gap-6 list-group-item-action text-dark px-3 py-8 mb-1 rounded-1"
                                href="javascript:void(0)"
                              >
                                <i className="ti ti-inbox fs-5" />
                                All Contacts{" "}
                              </a>
                            </li>
                            <li className="list-group-item border-0 p-0 mx-9">
                              <a
                                className="d-flex align-items-center gap-6 list-group-item-action text-dark px-3 py-8 mb-1 rounded-1"
                                href="javascript:void(0)"
                              >
                                <i className="ti ti-star" />
                                Starred{" "}
                              </a>
                            </li>
                            <li className="list-group-item border-0 p-0 mx-9">
                              <a
                                className="d-flex align-items-center gap-6 list-group-item-action text-dark px-3 py-8 mb-1 rounded-1"
                                href="javascript:void(0)"
                              >
                                <i className="ti ti-file-text fs-5" />
                                Pening Approval{" "}
                              </a>
                            </li>
                            <li className="list-group-item border-0 p-0 mx-9">
                              <a
                                className="d-flex align-items-center gap-6 list-group-item-action text-dark px-3 py-8 mb-1 rounded-1"
                                href="javascript:void(0)"
                              >
                                <i className="ti ti-alert-circle" />
                                Blocked{" "}
                              </a>
                            </li>
                            <li className="border-bottom my-3" />
                            <li className="fw-semibold text-dark text-uppercase mx-9 my-2 px-3 fs-2">
                              CATEGORIES
                            </li>
                            <li className="list-group-item border-0 p-0 mx-9">
                              <a
                                className="d-flex align-items-center gap-6 list-group-item-action text-dark px-3 py-8 mb-1 rounded-1"
                                href="javascript:void(0)"
                              >
                                <i className="ti ti-bookmark fs-5 text-primary" />
                                Engineers{" "}
                              </a>
                            </li>
                            <li className="list-group-item border-0 p-0 mx-9">
                              <a
                                className="d-flex align-items-center gap-6 list-group-item-action text-dark px-3 py-8 mb-1 rounded-1"
                                href="javascript:void(0)"
                              >
                                <i className="ti ti-bookmark fs-5 text-warning" />
                                Support Staff{" "}
                              </a>
                            </li>
                            <li className="list-group-item border-0 p-0 mx-9">
                              <a
                                className="d-flex align-items-center gap-6 list-group-item-action text-dark px-3 py-8 mb-1 rounded-1"
                                href="javascript:void(0)"
                              >
                                <i className="ti ti-bookmark fs-5 text-success" />
                                Sales Team{" "}
                              </a>
                            </li>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className="simplebar-placeholder"
                      style={{ width: 330, height: 370 }}
                    />
                  </div>
                  <div
                    className="simplebar-track simplebar-horizontal"
                    style={{ visibility: "hidden" }}
                  >
                    <div
                      className="simplebar-scrollbar"
                      style={{ width: 0, display: "none" }}
                    />
                  </div>
                  <div
                    className="simplebar-track simplebar-vertical"
                    style={{ visibility: "hidden" }}
                  >
                    <div
                      className="simplebar-scrollbar"
                      style={{
                        height: 0,
                        display: "none",
                        transform: "translate3d(0px, 0px, 0px)"
                      }}
                    />
                  </div>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactUs
