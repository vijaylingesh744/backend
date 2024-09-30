import React from 'react'

const ChatList = () => {
    return (
        <div>
            <div className="container-fluid">
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
    <div className="d-flex">
      <div className="w-30 d-none d-lg-block border-end user-chat-box">
        <div className="px-4 pt-9 pb-6">
          <div className="d-flex align-items-center justify-content-between mb-3">
            <div className="d-flex align-items-center">
              <div className="position-relative">
                <img
                  src="/bp-assets/images/profile/user-1.jpg"
                  alt="user1"
                  width={54}
                  height={54}
                  className="rounded-circle"
                />
                <span className="position-absolute bottom-0 end-0 p-1 badge rounded-pill bg-success">
                  <span className="visually-hidden">New alerts</span>
                </span>
              </div>
              <div className="ms-3">
                <h6 className="fw-semibold mb-2">Sara Kumar</h6>
                <p className="mb-0 fs-2">Tester</p>
              </div>
            </div>
            <div className="dropdown">
              <a
                className="text-dark fs-6 nav-icon-hover"
                aria-expanded="false">
                <i className="ti ti-dots-vertical" />
              </a>
            </div>
          </div>
          <form className="position-relative mb-4">
            <input
              type="text"
              className="form-control search-chat py-2 ps-5"
              id="text-srh"
              placeholder="Search Contact"
            />
            <i className="ti ti-search position-absolute top-50 start-0 translate-middle-y fs-6 text-dark ms-3" />
          </form>
        </div>
        <div className="app-chat">
          <ul
            className="chat-users mb-0"
            data-simplebar="init"
            style={{ maxHeight: "calc(-100px + 100vh)" }}
          >
            <div
              className="simplebar-wrapper"
              style={{ margin: 0, height: "58vh" }}
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
                  >
                    <div className="simplebar-content" style={{ padding: 0 }}>
                      <li>
                        <a
                          href="javascript:void(0)"
                          className="px-4 py-3 bg-hover-light-black d-flex align-items-start justify-content-between chat-user "
                          id="chat_user_1"
                          data-user-id={1}
                        >
                          <div className="d-flex align-items-center">
                            <span className="position-relative">
                              <img
                                src="/images/icons/bpart.png"
                                alt="user1"
                                width={48}
                                height={48}
                                className="rounded-circle"
                              />
                              <span className="position-absolute bottom-0 end-0 p-1 badge rounded-pill bg-success">
                                <span className="visually-hidden">
                                  New alerts
                                </span>
                              </span>
                            </span>
                            <div className="ms-3 d-inline-block w-75">
                              <h6
                                className="mb-1 fw-semibold chat-title"
                                data-username="James Anderson"
                              >
                                Business Community
                              </h6>
                              <span className="fs-3 text-truncate text-body-color d-block">
                                business partner members
                              </span>
                            </div>
                          </div>
                        </a>
                      </li>
                      <li>
                        <a
                          href="javascript:void(0)"
                          className="px-4 py-3 bg-hover-light-black d-flex align-items-start justify-content-between chat-user bg-light-subtle"
                          id="chat_user_1"
                          data-user-id={1}
                        >
                          <div className="d-flex align-items-center">
                            <span className="position-relative">
                              <img
                                src="/images/profile/img02.png"
                                alt="user1"
                                width={48}
                                height={48}
                                className="rounded-circle"
                              />
                              <span className="position-absolute bottom-0 end-0 p-1 badge rounded-pill bg-success">
                                <span className="visually-hidden">
                                  New alerts
                                </span>
                              </span>
                            </span>
                            <div className="ms-3 d-inline-block w-75">
                              <h6
                                className="mb-1 fw-semibold chat-title"
                                data-username="James Anderson"
                              >
                                Arun Kumar
                              </h6>
                              <span className="fs-3 text-truncate text-body-color d-block">
                                Buyer
                              </span>
                            </div>
                          </div>
                        </a>
                      </li>
                      <li>
                        <a
                          href="javascript:void(0)"
                          className="px-4 py-3 bg-hover-light-black d-flex align-items-start justify-content-between chat-user "
                          id="chat_user_1"
                          data-user-id={1}
                        >
                          <div className="d-flex align-items-center">
                            <span className="position-relative">
                              <img
                                src="/images/profile/img03.png"
                                alt="user1"
                                width={48}
                                height={48}
                                className="rounded-circle"
                              />
                              <span className="position-absolute bottom-0 end-0 p-1 badge rounded-pill bg-success">
                                <span className="visually-hidden">
                                  New alerts
                                </span>
                              </span>
                            </span>
                            <div className="ms-3 d-inline-block w-75">
                              <h6
                                className="mb-1 fw-semibold chat-title"
                                data-username="James Anderson"
                              >
                                one example
                              </h6>
                              <span className="fs-3 text-truncate text-body-color d-block">
                                Seller
                              </span>
                            </div>
                          </div>
                        </a>
                      </li>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="simplebar-placeholder"
                style={{ width: 336, height: 160 }}
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
      <div className="w-70 w-xs-100 chat-container">
        <div className="chat-box-inner-part h-100">
          <div className="chat-not-selected h-100 d-none">
            <div className="d-flex align-items-center justify-content-center h-100 p-5">
              <div className="text-center">
                <span className="text-primary">
                  <i className="ti ti-message-dots fs-10" />
                </span>
                <h6 className="mt-2">Open chat from the list</h6>
              </div>
            </div>
          </div>
          <div className="chatting-box d-block">
            <div className="p-9 border-bottom chat-meta-user d-flex align-items-center justify-content-between">
              <div
                className="hstack gap-3 current-chat-user-name"
                style={{ cursor: "pointer" }}
              >
                <div className="position-relative">
                  <img
                    src="/images/profile/img02.png"
                    alt="user1"
                    width={48}
                    height={48}
                    className="rounded-circle"
                  />
                  <span className="position-absolute bottom-0 end-0 p-1 badge rounded-pill bg-success">
                    <span className="visually-hidden">New alerts</span>
                  </span>
                </div>
                <div>
                  <h6 className="mb-1 name fw-semibold" />
                  <p className="mb-0 h5 uppercase">Arun Kumar</p>
                </div>
              </div>
              <ul className="list-unstyled mb-0 d-flex align-items-center">
                <li>
                  <a
                    className="text-dark px-2 fs-7 bg-hover-primary nav-icon-hover position-relative z-index-5"
                    href="javascript:void(0)"
                  >
                    <i className="ti ti-archive" />
                  </a>
                </li>
                <li>
                  <a
                    className="text-dark px-2 fs-7 bg-hover-primary nav-icon-hover position-relative z-index-5"
                    href="javascript:void(0)"
                  >
                    <i className="ti ti-video" />
                  </a>
                </li>
                <li>
                  <a
                    className="chat-menu text-dark px-2 fs-7 bg-hover-primary nav-icon-hover position-relative z-index-5"
                    href="javascript:void(0)"
                  >
                    <i className="ti ti-menu-2" />
                  </a>
                </li>
              </ul>
            </div>
            <div className="d-flex parent-chat-box">
              <div className="chat-box w-xs-100">
                <div
                  className="p-9"
                  data-simplebar="init"
                  style={{ height: "60vh", maxHeight: "60vh" }}
                >
                  <div
                    className="simplebar-wrapper"
                    style={{ margin: "-20px" }}
                  >
                    <div className="simplebar-height-auto-observer-wrapper">
                      <div className="simplebar-height-auto-observer" />
                    </div>
                    <div
                      className="simplebar-mask"
                      style={{ background: "rgb(231, 231, 231)" }}
                    >
                      <div
                        className="simplebar-offset"
                        style={{ right: 0, bottom: 0 }}
                      >
                        <div
                          className="simplebar-content-wrapper"
                          tabIndex={0}
                          role="region"
                          aria-label="scrollable content"
                          style={{ height: "100%", overflow: "scroll" }}
                        >
                          <div
                            className="simplebar-content"
                            style={{ padding: 20 }}
                          >
                            <div
                              className="chat-list chat active-chat"
                              data-user-id={1}
                            >
                              <div className="hstack gap-3 align-items-start mb-7 justify-content-end">
                                <div>
                                  <h6 className="fs-2 text-muted">
                                    Sara, 12:20 PM
                                  </h6>
                                  <div
                                    className="p-2 rounded-1 fs-3"
                                    style={{
                                      backgroundColor: "rgb(45, 43, 112)",
                                      color: "white"
                                    }}
                                  >
                                    jj
                                  </div>
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
                  className="px-9 py-6 chat-send-message-footer"
                  style={{ border: "1px solid grey" }}
                >
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center gap-2 w-85">
                      <a
                        className="position-relative nav-icon-hover z-index-5"
                        href="javascript:void(0)"
                      >
                        <i className="ti ti-mood-smile text-dark bg-hover-primary fs-7" />
                      </a>
                      <input
                        type="text"
                        className="form-control message-type-box text-muted border-0 p-0 ms-2"
                        placeholder="Type a Message"
                        fdprocessedid="0p3op"
                        defaultValue=""
                      />
                    </div>
                    <ul className="list-unstyledn mb-0 d-flex align-items-center">
                      <li>
                        <a
                          className="text-dark px-2 fs-7 bg-hover-primary nav-icon-hover position-relative z-index-5"
                          href="javascript:void(0)"
                        >
                          <i className="ti ti-photo-plus" />
                        </a>
                      </li>
                      <li>
                        <a
                          className="text-dark px-2 fs-7 bg-hover-primary nav-icon-hover position-relative z-index-5"
                          href="javascript:void(0)"
                        >
                          <i className="ti ti-paperclip" />
                        </a>
                      </li>
                      <li>
                        <a
                          className="text-dark px-2 fs-7 bg-hover-primary nav-icon-hover position-relative z-index-5"
                          href="javascript:void(0)"
                        >
                          <i className="ti ti-microphone" />
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</div>
)
}

export default ChatList
