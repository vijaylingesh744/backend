import React, { startTransition, useEffect, useState } from "react";
import Header from "../layout/Header";
import "../FeedPage/style/style.css";
import Leftside from "./layout/Leftside";
import Rightside from "../FeedPage/UserDetail/layout/Rightside";
import FetchData from "../../fetch-api/Apifetch";
import { handleImageError, Imagesource, Splittext } from "../../utils/Function";
import { ChatSuggest, RightShimmer } from "../layout/Shimmer";
import { useNavigate } from "react-router-dom";
import "./Style/style.css";
import { BASE_URL } from '../../utils/ApiRoute';
import { toast } from "react-toastify";
import io from 'socket.io-client';
import Swal from "sweetalert2";
import BottomNavbar from "../layout/BottomNavbar";
import { Modal } from "react-bootstrap";
const socket = io(BASE_URL);
const Connection = () => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("LOGINDATA"))?.user
  );
  const navigate = useNavigate();
  const [Limit, setLimit] = useState(3);
  const [PageLists, setPageLists] = useState([]);
  const [ClientNotification, setClientNotification] = useState([]);
  const [viewstate, setviewstate] = useState(0);
  const [requested, setRequested] = useState([]);
  const [ChatUser, setChatUser] = useState([]);
  const [ChatSearchUser, setChatSearchUser] = useState([]);
  const [allreceivedconnections, setallreceivedconnections] = useState([]);
  const [allreceivedSearchconnections, setallreceivedSearchconnections] = useState([]);
  const [loader, setloader] = useState(false);
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    UserFollowed();
    onReqConnection();
    ClientNotify();
  }, []);
  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    if (searchTerm === '') {
      setChatUser(ChatSearchUser);
      setallreceivedconnections(allreceivedSearchconnections)
    } else {
      if (viewstate == 0) {
        const filteredUsers = ChatSearchUser.filter((user) => {
          const fullName = `${user.first_name} ${user.last_name}`.toLowerCase();
          return fullName.includes(searchTerm);
        });
        setChatUser(filteredUsers);
      } else if (viewstate == 2) {
        const filteredConnections = allreceivedSearchconnections.filter((user) => { return user.matchedField === "senderData" && user.status !== 1; });
        const filteredUsers = filteredConnections.filter((user) => {
          const fullName = `${user?.receiveDetails?.first_name} ${user?.receiveDetails?.last_name}`.toLowerCase();
          return fullName.includes(searchTerm);
        });
        setallreceivedconnections(filteredUsers)
      }
    }
  };
  const onReqConnection = async () => {
    const res = await FetchData(
      `userConnectlist/${user?._id}`,
      "GET",
      null,
      true,
      false
    );
    if (res.data) {
      const filteredConnectionList = res.data
        .filter((item) => item.status == 1)
        .map((item) => {
          if (item.matchedField === "senderData") {
            item.receiveDetails.userRemoveId = item._id;
            return item.receiveDetails; // Extract receiveDetails if matchedField is senderData
          } else if (item.matchedField === "receiverData") {
            item.senderDetails.userRemoveId = item._id;
            return item.senderDetails; // Extract senderDetails if matchedField is receiverData
          }
          return null; // Handle any other cases (optional)
        })
        .filter((item) => item !== null); // Filter out any null values
      setChatUser(filteredConnectionList);
      setChatSearchUser(filteredConnectionList)
      setallreceivedconnections(res.data);
      setallreceivedSearchconnections(res.data)
      const filteredConnectionList2 = res.data
        .filter((item) => item.status == 0)
        .map((item) => {
          if (item.matchedField === "senderData") {
            item.receiveDetails.userRemoveId = item._id;
            return item.receiveDetails; // Extract receiveDetails if matchedField is senderData
          } else if (item.matchedField === "receiverData") {
            item.senderDetails.userRemoveId = item._id;
            return item.senderDetails; // Extract senderDetails if matchedField is receiverData
          }
          return null; // Handle any other cases (optional)
        })
        .filter((item) => item !== null); // Filter out any null values
      setRequested(filteredConnectionList2);
      console.log(allreceivedconnections);
    }
  };
  const ClientNotify = async () => {
    setloader(true);
    try {
      const res = await FetchData(
        `client_notify/${user?._id}/3`,
        "GET",
        null,
        true,
        false
      );
      if (res.success) {
        const filterData = res.data.filter(
          (item) => item.user_id !== user?._id
        );
        setClientNotification(filterData);
        setloader(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const UserFollowed = async () => {
    try {
      const res = await FetchData(
        "user/follow/" + user?._id,
        "GET",
        null,
        false,
        false
      );
      if (res.status) {
        setPageLists(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const HandleUpdate = async (id, node) => {
    const res = await FetchData(
      `cloneupdateconnect/${node}/${id}`,
      "GET",
      null,
      true,
      false
    );
    if (res.status) {
      UserFollowed();
      onReqConnection();
      ClientNotify();
      socket.emit('sendConnection', { rec_id: id, user: user._id })
      toast.success("Connection updated successfully")
    }
  }
  const handleDisconnectUser = async (id) => {
    try {
      const res = await FetchData(
        `deleteconnect/${id}`,
        "GET",
        null,
        false,
        false
      );
      onReqConnection();
    } catch (err) {
      console.log(err);
    }
  };
  const OpenPopup = async (id) => {
    Swal.fire({
      title: 'Disconnect?',
      html: `<span style="font-size: 16px; font-weight: bold;">${`Are you sure?`}</span>`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#4535C1',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Remove!',
      cancelButtonText: 'Later',
      customClass: {
        // confirmButton: 'swal2-confirm-custom',
        // cancelButton: 'swal2-cancel-custom',
        // title: 'swal2-title',
        confirmButton: 'swal2-confirm-logout-custom',
        cancelButton: 'swal2-cancel-logout-custom',
        title: 'swal2-title',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        handleDisconnectUser(id);
      }
    });
  }
  const EmptyCard = () => {
    return (
      <div
        className="container-fluid w-100 d-flex justify-content-center align-items-center"
        style={{ height: "200px" }}
      >
        <div className="w-100 d-flex align-items-center row-gap-1 flex-column justify-content-center">
          <span className="fontsubtitle font-weight-bold text-dark1">
            No connection yet?
          </span>
          <a
            onClick={() => {
              startTransition(() => {
                navigate("/main");
              });
            }}
          >
            <span
              className="fontsubtitle font-weight-1 text-connect1"
              role="button"
            >
              Let's Start connecting
            </span>
          </a>
          <span className="fontcontent2 font-weight-light text-secondary1">
            Find more people
          </span>
        </div>
      </div>
    )
  }
  const handleClose = () => {
    setShowModal(false);
  };
  return (
    <div>
      <header id="main-header">
        <Header />
      </header>
      <div
        className="feed_doublecontainer"
        style={{ display: 'grid' }}
      >
        <section id="ads"></section>
        <div id="main-wrapper " className="px-0 mt-5 mt-lg-0">
          <main id="main-section" className="pr-lg-3 mt-2 mt-lg-0">
            <div className="container-fluid bg-white rounded shadow-sm w-100">
              <div className="d-flex align-items-center justify-content-between" style={{ borderBottom: "1px solid lightgrey" }}>
                <div className="container d-flex px-lg-3 px-0">
                  <div
                    className={`w-50 d-flex justify-content-center ${viewstate == 0 && "activestop"} py-3`}
                    role="button"
                    onClick={() => setviewstate(0)}
                  >
                    <span className="fontsubtitle">My Connections ({ChatUser.length})</span>
                  </div>
                  <div
                    className={`w-50 d-flex justify-content-center ${viewstate == 1 && "activestop"
                      } py-3`}
                    role="button"
                    onClick={() => setviewstate(1)}
                  >
                    <span
                      className="fontsubtitle"
                      style={{ width: "max-content" }}
                    >
                      Received ({allreceivedconnections.filter((item) => item.matchedField === "receiverData" && item.status != 1).length})
                    </span>
                  </div>
                  <div
                    className={`w-50 d-flex justify-content-center ${viewstate == 2 && "activestop"} py-3`}
                    role="button"
                    onClick={() => setviewstate(2)}
                  >
                    <span className="fontsubtitle">Sent ({allreceivedconnections.filter((item) => item.matchedField === "senderData" && item.status != 1).length})</span>
                  </div>
                </div>
                <div className="d-none d-md-block d-lg-block">
                  <input placeholder={"Search Here"} onChange={handleSearch} style={{ height: '2rem' }} className='text-dark bg-light col-12 mr-5 border rounded-01' />
                </div>
              </div>
              <div className="container-fluid pb-2 mt-3">
                {viewstate === 0 ? (
                  ChatUser && ChatUser.length > 0 ? (
                    <>
                      {ChatUser.slice(0, Limit).map((item) => (
                        <div
                          key={item._id} // Add a key for each mapped item
                          className="d-flex align-items-center justify-content-between px-3 py-2 border-bottom"
                        >
                          <div className="d-flex column-gap-3 w-75"
                            role="button"
                            onClick={() => navigate("/user/" + item?._id)}
                          >
                            <img
                              className="rounded-circle mt-2"
                              src={`${item?.profile
                                ? `${Imagesource(item?.profile)}`
                                : `/images/profile/img0${item?.randomprofile}.png`
                                }`}
                              onError={handleImageError}
                              height={50}
                              style={{ width: '50px', minWidth: '50px' }}
                            />
                            <div className="d-flex flex-column">
                              <span className="fontcontent1 text-dark1 font-weight-1 mb-n1">
                                {item?.first_name} {item?.last_name}
                              </span>
                              <span className="font-weight-light font-weight-normal text-secondary1 fontcontent2 ">
                                {item?.designation}
                              </span>
                              <p className="font-weight-light font-weight-normal fonttext text-secondary1" >{item?.about ? Splittext(item?.about, 20) : '---'}</p>
                            </div>
                          </div>
                          <div className="d-flex column-gap-2 flex-column flex-lg-row  row-gap-2">
                            <button
                              className="btn btn-connect rounded-01 fonthint py-1"
                              onClick={() =>
                                (window.location.href = "/chats")
                              } style={{ fontWeight: "600", minWidth: "65px" }}
                            >Message
                            </button>
                            <button
                              className="btn btn-outline-connect rounded-01 fonthint py-1"
                              onClick={() =>
                                (window.location.href = "/user/" + item._id)
                              } style={{ fontWeight: "600", minWidth: "65px" }}
                            >
                              View
                            </button>
                          </div>
                        </div>
                      ))}
                      {ChatUser.length > 3 && (
                        <div className="d-flex justify-content-center py-3 column-gap-4">
                          <span
                            role="button"
                            className="text-connect1 fontsubtitle"
                            onClick={() => setLimit(Limit + 5)}
                          >
                            View more
                          </span>
                          <span
                            role="button"
                            className="text-connect1 fontsubtitle"
                            onClick={() => setLimit(3)}
                          >
                            View less
                          </span>
                        </div>
                      )}
                    </>
                  ) : (
                    <EmptyCard />
                  )
                ) :
                  viewstate === 1 ? (
                    allreceivedconnections &&
                      allreceivedconnections.length > 0 ? (
                      allreceivedconnections
                        .filter((item) => item.matchedField === "receiverData" && item.status != 1)
                        .slice(0, Limit).length > 0 ? (
                        <>
                          {allreceivedconnections
                            .filter((item) => item.matchedField === "receiverData" && item.status != 1)
                            .slice(0, Limit)
                            .map((item) => (
                              <div className="d-flex align-items-center justify-content-between px-3 py-2">
                                <div className="d-flex column-gap-3 w-75" role="button"
                                  onClick={() => navigate("/user/" + item?.senderDetails?._id)}
                                >
                                  <img
                                    className="rounded-circle"
                                    src={`${item?.senderDetails?.profile
                                      ? `${Imagesource(
                                        item?.senderDetails?.profile
                                      )}`
                                      : `/images/profile/img0${item?.senderDetails?.randomprofile}.png`
                                      }`}
                                    onError={handleImageError}
                                    width={50}
                                    height={50}
                                    style={{ minWidth: '50px' }}
                                  />
                                  <div className="d-flex flex-column">
                                    <span className="fontcontent1 text-dark1 font-weight-1 mb-n1">
                                      {item?.senderDetails?.first_name}{" "}
                                      {item?.senderDetails?.last_name}
                                    </span>
                                    <span className="font-weight-light font-weight-normal text-secondary1 fontcontent1">
                                      {item?.senderDetails?.designation}
                                    </span>
                                    <p className="font-weight-light font-weight-normal fonttext text-secondary1 " >{item?.senderDetails.about ? Splittext(item?.senderDetails.about, 20) : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.'}</p>
                                  </div>
                                </div>
                                {item.status == 0 ? (
                                  <div className="d-flex">
                                    <button className='btn btn-connect rounded-01 fonthint mr-1 py-1'
                                      onClick={() => HandleUpdate("1", item.nodeId)}
                                      style={{ fontWeight: '600', minWidth: '65px' }} >
                                      Accept
                                    </button>
                                    <button className='btn btn-outline-connect rounded-01 fonthint py-1'
                                      onClick={() => HandleUpdate("2", item.nodeId)}
                                      style={{ fontWeight: '600', minWidth: '65px' }} >
                                      Reject
                                    </button>
                                  </div>
                                ) : (
                                  <button className='btn btn-outline-connect rounded-01 fonthint '
                                    onClick={() => window.location.href = "/chats"}
                                    style={{ fontWeight: '600', minWidth: '65px' }} >
                                    Chat
                                  </button>
                                )}
                              </div>
                            ))}
                          {allreceivedconnections
                            .filter((item) => item.matchedField === "receiverData" && item.status != 1).length > 3 && (
                              <div className="d-flex justify-content-center py-3 column-gap-4">
                                <span
                                  className="text-connect1 fontsubtitle"
                                  role="button"
                                  onClick={() => setLimit(Limit + 5)}
                                >
                                  View more
                                </span>
                                <span
                                  className="text-connect1 fontsubtitle"
                                  onClick={() => setLimit(3)}
                                  role="button"
                                >
                                  View less
                                </span>
                              </div>
                            )}
                        </>
                      ) : (
                        <EmptyCard />
                      )
                    ) : (
                      <EmptyCard />
                    )
                  ) : allreceivedconnections &&
                    allreceivedconnections.length > 0 ? (
                    allreceivedconnections
                      .filter((item) => item.matchedField === "senderData" && item.status != 1)
                      .slice(0, Limit).length > 0 ? (
                      <>
                        {allreceivedconnections
                          .filter((item) => item.matchedField === "senderData" && item.status != 1)
                          .slice(0, Limit)
                          .map((item) => (
                            <div className="d-flex align-items-center justify-content-between px-3 py-2">
                              <div className="d-flex column-gap-3 w-75" role="button"
                                onClick={() => navigate("/user/" + item?.receiveDetails?._id)}
                              >
                                <img
                                  className="rounded-circle"
                                  src={`${item?.receiveDetails?.profile
                                    ? `${Imagesource(
                                      item?.receiveDetails?.profile
                                    )}`
                                    : `/images/profile/img0${item?.receiveDetails?.randomprofile}.png`
                                    }`}
                                  onError={handleImageError}
                                  width={50}
                                  height={50}
                                  style={{ minWidth: "50px" }}
                                />
                                <div className="d-flex flex-column">
                                  <span className="fontcontent1 text-dark1 font-weight-1 mb-n1 ">
                                    {item?.receiveDetails?.first_name}{" "}
                                    {item?.receiveDetails?.last_name}
                                  </span>
                                  <span className="font-weight-light font-weight-normal text-secondary1 fontcontent2">
                                    {item?.receiveDetails?.designation || "--"}
                                  </span>
                                  <p className="font-weight-light font-weight-normal fonttext text-secondary1" >{item?.receiveDetails?.about ? Splittext(item?.receiveDetails?.about, 20) : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.'}</p>
                                </div>
                              </div>
                              {item?.status === 1 ? (
                                <button
                                  className="btn btn-connect rounded-01 fonthint py-1"
                                  onClick={() => (window.location.href = "/chats")}
                                  style={{ fontWeight: "600", minWidth: "65px" }}
                                >
                                  Message
                                </button>
                              ) : (
                                <button className="btn btn-outline-connect rounded-01 fonthint py-1"
                                  onClick={() =>
                                    OpenPopup(item._id)
                                  } style={{ fontWeight: "600", minWidth: "65px" }}>
                                  Request sent
                                </button>
                              )}
                            </div>
                          ))}
                        {allreceivedconnections
                          .filter((item) => item.matchedField === "senderData" && item.status != 1).length > 3 && (
                            <div className="d-flex justify-content-center py-3 column-gap-4">
                              <span
                                className="text-connect1 fontsubtitle"
                                onClick={() => setLimit(Limit + 5)}
                                role="button"
                              >
                                View more
                              </span>
                              <span
                                className="text-connect1 fontsubtitle"
                                onClick={() => setLimit(3)}
                                role="button"
                              >
                                View less
                              </span>
                            </div>
                          )}
                      </>
                    ) : (
                      <EmptyCard />
                    )
                  ) : (
                    <EmptyCard />
                  )}
              </div>
            </div>
            <div className="container-fluid bg-white rounded shadow-sm w-100 px-0 mt-3">
              <div className="d-flex align-items-center p-3 justify-content-between">
                <span className="fontsubtitle font-weight-1 text-dark1">
                  Recommended Connections
                </span>
                <span className="text-secondary1 fontsubtitle" role='button' onClick={() => { startTransition(() => (navigate('/main'))) }}>View all</span>
              </div>
              <div className="container-fluid pb-2 mt-2">
                {ClientNotification.length && ClientNotification.length > 0 ? (
                  <div className="row justify-content-center px-lg-5">
                    {ClientNotification.slice(0, 6).map((item) => (
                      <div className="col-12 col-lg-4 col-md-6 d-flex justify-content-center mb-4">
                        <div className="text-center p-2 shadow-sm"
                          style={{
                            borderRadius: '10px', position: 'relative',
                            width: "210px", height: "230px",maxHeight:'230px',maxWidth:'210px',
                          border: "1px solid lightgray"
                          }}>
                          <div className="card-body p-1 justify-content-around card mb-0 h-100 shadow-none align-items-center">
                            <img
                              src={`${item?.userdata?.profile
                                ? `${Imagesource(item?.userdata?.profile)}`
                                : `/images/profile/img0${item?.userdata?.randomprofile}.png`
                                }`}
                              onError={handleImageError}
                              className="rounded-circle"
                              alt="Profile"
                              style={{ width: '70px', height: '70px', objectFit: 'fill' }}
                            />
                            <div className="w-100 text-center">
                            <p className="mb-0 "
                              style={{
                                color: "#323232", textOverflow: "ellipsis", overflow: "hidden",
                                fontWeight: "500",
                                whiteSpace: "nowrap", fontSize: "16px"
                              }}>
                              {item?.userdata?.first_name}&nbsp;{item?.userdata?.last_name}
                            </p>
                            <p className="fontcontent2 text-secondary2 mb-1"
                              style={{
                                textOverflow: "ellipsis",
                                fontSize: "13px",
                                overflow: "hidden", whiteSpace: "nowrap"
                              }}>
                              {item?.userdata?.designation}{item?.userdata?.designation ? "" : `---`}
                            </p>
                            <p className="fonthint text-secondary1 mb-2"
                              style={{
                                textOverflow: "ellipsis",
                                overflow: "hidden", whiteSpace: "nowrap"
                              }}>
                              {item?.userdata?.city}{item?.userdata?.country ? "" : `---`}
                            </p>

                            </div>
                            <button
                              onClick={() => navigate(`/user/` + item.userdata._id)}
                              style={{fontSize:"16px",fontWeight:"400"}}
                              className="btn btn-outline-connect w-50 rounded-pill fonthint py-1">
                              View
                            </button>
                            <div style={{ position: 'absolute', top: '15px', right: '15px' }}>
                              <i className="bi bi-three-dots"></i>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <EmptyCard />
                )}
              </div>
            </div>
          </main>
        </div>
        <div className="d-none d-md-block d-lg-block">
          <Rightside pages={PageLists} />
        </div>
      </div>
      <Modal
        show={showModal}
        onHide={handleClose}
        className="modelfilter modal-xl modaltop feed-modal"
        size="lgg"
      >
        <Modal.Body className="px-0 pt-0 pb-0" style={{ backgroundColor: "transparent", alignContent: "center" }}>
          <div>
          </div>
        </Modal.Body>
      </Modal>
      <BottomNavbar />
    </div>
  );
};
export default Connection;
