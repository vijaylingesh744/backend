import React, { useState, useEffect } from 'react';
import FetchData from '../../fetch-api/Apifetch';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { ref, push, get, onValue, off } from 'firebase/database';
import { db } from '../../../firebase';
import Modal from 'react-bootstrap/Modal';
import { validateForm } from '../../utils/Function.js';
import BuinessParner from './Split/BuinessParner.js';
const Chats = () => {
  const { id } = useParams();
  const location = useLocation()
  const {state} = location;
  const [ProjectList, setProjectList] = useState([]);
  const [CurrentProject, setCurrentProject] = useState({});
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('User')))
  const navigate = useNavigate()
  useEffect(() => {
    listProjects(id);
    console.log(state);
  }, []);

  const [Eventform, setEventform] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    bp_id: CurrentProject?.bp_id,
    client_id: CurrentProject?.user_id,
    project_id: CurrentProject?._id,
  })

  const handleSubmit = async () => {
    try {
      var object = {
        ...Eventform,
        bp_id: CurrentProject?.bp_id,
        client_id: CurrentProject?.user_id,
        project_id: CurrentProject?._id,
      }
      if (!validateForm(object)) {
        alert("error")
        return;
      }
      const res = await FetchData("event", 'POST', JSON.stringify(object), false, false);
      handleClose();
    } catch (error) {
      console.error("Error fetching event:", error.message);
    }
  }

  const HandleChanger = (e) => {
    const { name, value } = e.target;
    setEventform({ ...Eventform, [name]: value })
  }

  const [show, setShow] = useState(false);
  const handleShow = (item) => {
    setShow(true);
  };
  const handleClose = () => {
    setShow(false);
  };

  const AddModal = () => {
    return (
      <Modal show={show} onHide={handleClose} className='modal-xl' size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Add Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <div className="p-2 text-bg-light text-center">Project ID:{CurrentProject?.project_id}</div>
            <div className='my-3'>
              <label>Title</label>
              <input type="text" name="title"
                value={Eventform.title}
                onChange={HandleChanger}
                className="form-control" />
            </div>
            <div className='mb-3'>
              <label>Description</label>
              <input type="text" name="description"
                value={Eventform.description}
                onChange={HandleChanger}
                className="form-control" />
            </div>
            <div className='mb-3'>
              <div className="row">
                <div className='col-6'>
                  <label>Date</label>
                  <input type="date" name="date"
                    value={Eventform.date}
                    onChange={HandleChanger}
                    className="form-control" />
                </div>
                <div className='col-6'>
                  <label>Time</label>
                  <input type="time" name="time"
                    value={Eventform.time}
                    onChange={HandleChanger}
                    className="form-control" />
                </div>
              </div>
            </div>
            <div className='my-3'>
              <button className='btn btn-primary'
                onClick={handleSubmit}
              >Submit</button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    )
  }

  const listProjects = async (id) => {
    try {
      const res = await FetchData(`list/project/${id}`, 'GET', null, true, false);
      if (res.status) {
        setProjectList(res.data);
        setCurrentProject(res.data[0])
        console.log(res.data[0]);
        setSelectedItem(res.data[0]?.userdata)
        setSelectedChat({
          project_id:res.data[0]?.project_id,
          user_id:res.data[0]?.userdata._id,
          email:res.data[0]?.userdata?.gmail
        })
      }
    } catch (error) {
      console.error("Error fetching user list:", error.message);
    }
  }


  const [node, setNode] = useState('');
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState('');
  const [selectedItem, setSelectedItem] = useState({});
  const [selectedChat, setSelectedChat] = useState({});

  useEffect(() => {
    fetch()
  }, [])

  const fetch = async (id = node) => {
    const data = await getAllMessages(id)
    setMessages(data)
  }
  const chatData = async (id = selectedItem?._id) => {
    const data = {
      sender: user._id,
      receive: id,
    }
    const res = await FetchData(`chatlist/add`, 'POST', JSON.stringify(data), true, false);
    setNode(res.data.nodeId);
    fetch(res.data.nodeId)
  }

  const getAllMessages = async (nodeId = node) => {
    console.log("nodeID,", nodeId)
    const dbName = `chats/${nodeId}`;
    const messagesRef = ref(db, dbName);
    const snapshot = await get(messagesRef);
    const messagesWithIds = [];
    snapshot.forEach(childSnapshot => {
      const messageId = childSnapshot.key;
      const messageData = childSnapshot.val();
      messagesWithIds.push({ id: messageId, ...messageData });
    });
    return messagesWithIds;
  };


  const listenForNewMessages = (nodeId = node, callback) => {
    const dbName = `chats/${nodeId}`;
    const messagesRef = ref(db, dbName);

    // Set up a listener to receive real-time updates
    const listenerCallback = (snapshot) => {
      const messagesWithIds = [];
      snapshot.forEach(childSnapshot => {
        const messageId = childSnapshot.key;
        const messageData = childSnapshot.val();
        messagesWithIds.push({ id: messageId, ...messageData });
      });
      callback(messagesWithIds);
    };

    // Add the listener
    onValue(messagesRef, listenerCallback);

    // Return the function to remove the listener
    return () => {
      off(messagesRef, listenerCallback);
    };
  };

  useEffect(() => {
    const unsubscribe = listenForNewMessages(node, (messages) => {
      chatData();
    });
    return () => {
      unsubscribe();
    };
  }, [node]);


  const sendMessage = async () => {
    if (messageText.trim() !== '') {
      const messagesRef = ref(db, `chats/${node}`);
      push(messagesRef, {
        _id: Date.parse(new Date()),
        chatID: user._id + selectedItem?._id, //user id+ business user id
        text: messageText,
        image: '',
        video: '',
        audio: '',
        type: 0,
        createdAt: new Date().toString(),
        date: new Date().toLocaleString().split(',')[0],
        time: new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit' }),
        user: {
          _id: user._id,
          name: user.first_name,
          profile: user?.randomprofile
        },
        senderId: user._id,
        receiverId: selectedItem?._id
      });
      fetch(node)
      setMessageText('');
    }
  };

  const [slide, setSlide] = useState(1);
  const [showBusinessPart, setshowBusinessPart] = useState(true);
  const SideBar = () => {
    return (
      <div className="w-30 d-none d-lg-block border-end user-chat-box">
        <div className="px-4 pt-9 pb-6">
          <div className="d-flex align-items-center justify-content-between mb-3">
            <div className="d-flex align-items-center">
              <div className="position-relative">
                <img
                  src="../assets/images/profile/user-1.jpg"
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
                <h6 className="fw-semibold mb-2">{user.first_name} {user.last_name}</h6>
                <p className="mb-0 fs-2">Tester</p>
              </div>
            </div>
            <div className="dropdown">
              <a className="text-dark fs-6 nav-icon-hover"
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
            style={{ maxHeight: "calc(100vh - 100px)" }}
            data-simplebar="init">
            <div className="simplebar-wrapper" style={{ margin: 0, height: "58vh" }}>
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
                      <li
                        onClick={() =>{ 
                          setSlide(2)
                          setSelectedItem(null)
                        }}
                      >
                        <a
                          href="javascript:void(0)"
                          className={`px-4 py-3 bg-hover-light-black d-flex align-items-start justify-content-between chat-user ${null == selectedItem ? "bg-light-subtle" : ""}`}
                          id="chat_user_1"
                          data-user-id={1}
                        >
                          <div className="d-flex align-items-center">
                            <span className="position-relative">
                              <img
                                src="http://connect-client.qcodesinfotech.com/images/icons/bpart.png"
                                alt="user1"
                                width={48}
                                height={48}
                                className="rounded-circle"
                              />
                              <span className="position-absolute bottom-0 end-0 p-1 badge rounded-pill bg-success">
                                <span className="visually-hidden">New alerts</span>
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
                      {ProjectList.map((item) => (
                        <li  onClick={() => {
                          if(item.status == 0){
                            console.log(selectedChat);
                            return
                          }
                          setSelectedChat({
                            project_id:item?.project_id,
                            user_id:item?.userdata?._id,
                            email:item?.userdata?.gmail
                          })
                          setCurrentProject(item)
                          setSelectedItem(item?.userdata)
                          setSlide(1)
                          chatData(item?.userdata._id)
                        }}>
                          <a
                            href="javascript:void(0)"
                            className={`px-4 py-3 bg-hover-light-black d-flex align-items-start justify-content-between chat-user ${item?.userdata._id == selectedItem?._id ? "bg-light-subtle" : ""}`}
                            id="chat_user_1"
                            data-user-id={1}
                          >
                            <div className="d-flex align-items-center">
                              <span className="position-relative">
                                <img
                                  src={`http://connect-client.qcodesinfotech.com/images/profile/img0${item?.userdata?.randomprofile}.png`}
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
                                  data-username="James Anderson">
                                  {item?.userdata.first_name}
                                  {" "}
                                  {item?.userdata.last_name}
                                </h6>
                                {item.status !== 0 ?(
                                <span className="fs-3 text-truncate text-body-color d-block">
                                  {item?.userdata.user_type == "0" ? "Buyer" : "Seller"}
                                </span>
                                ):(
                                  <span className="fs-3 text-truncate text-danger text-body-color d-block">
                                  Waiting for Approval
                                </span>
                                )
  }
                              </div>
                            </div>
                            {/* <p className="fs-2 mb-0 text-muted">15 mins</p> */}
                          </a>
                        </li>
                      ))}
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
    )
  }

  const ChatView = () => {
    return (
      <div
        className="simplebar-wrapper"
        style={{ margin: "-20px" }}
      >
        <div className="simplebar-height-auto-observer-wrapper">
          <div className="simplebar-height-auto-observer" />
        </div>
        <div className="simplebar-mask" style={{ background: "#e7e7e7" }}>
          <div
            className="simplebar-offset"
            style={{ right: 0, bottom: 0 }}
          >
            <div
              className="simplebar-content-wrapper"
              tabIndex={0}
              role="region"
              aria-label="scrollable content"
              style={{ height: "100%", overflow: "scroll" }}>
              <div
                className="simplebar-content"
                style={{ padding: 20 }}
              ><div
                className="chat-list chat active-chat"
                data-user-id={1}
              >
                  {messages.map(message => (
                    <div className={`hstack gap-3 align-items-start mb-7 ${message.senderId === user._id ? "justify-content-end" : "justify-content-start"}`}><div>
                      <h6 className="fs-2 text-muted">
                        {message.user?.name}, {message.time}
                      </h6>
                      <div
                        className="p-2 rounded-1 fs-3"
                        style={{
                          backgroundColor: "#2D2B70",
                          color: "white",
                        }}>{message.text}</div>
                    </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="body-wrapper">
      <div className="container-fluid">
        {AddModal()}
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
            {SideBar()}
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
                {slide == 1 ? (
                  <div className="chatting-box d-block">
                    <div className="p-9 border-bottom chat-meta-user d-flex align-items-center justify-content-between">
                      <div className="hstack gap-3 current-chat-user-name"
                        style={{ cursor: "pointer" }}
                        onClick={() => window.location.href = "/alldetails/" + selectedItem._id}
                      >
                        <div className="position-relative"
                        >
                          <img
                            src={`http://connect-client.qcodesinfotech.com/images/profile/img0${selectedItem?.randomprofile}.png`}
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
                          <p className="mb-0 h5 uppercase">
                            {selectedItem?.first_name}
                            {" "}
                            {selectedItem?.last_name}
                          </p>
                        </div>
                      </div>
                      <ul className="list-unstyled mb-0 d-flex align-items-center">
                        <li>
                          <a
                            className="text-dark px-2 fs-7 bg-hover-primary nav-icon-hover position-relative z-index-5"
                            href="javascript:void(0)"
                            onClick={() => {navigate('/project-invoice',{state:selectedChat})}}
                          >
                            <i className="ti ti-archive" />

                          </a>
                        </li>
                        <li>
                          <a
                            className="text-dark px-2 fs-7 bg-hover-primary nav-icon-hover position-relative z-index-5"
                            href="javascript:void(0)"
                          ><i className="ti ti-video" />
                          </a>
                        </li>
                        {selectedChat?.user_id !== state && <li>
                          <a className="chat-menu text-dark px-2 fs-7 bg-hover-primary nav-icon-hover position-relative z-index-5"
                            href="javascript:void(0)"
                            onClick={() => {
                              navigate('/progress', {
                                state: CurrentProject
                              })
                            }}
                          >
                            <i className="ti ti-menu-2" /></a>
                        </li>
                        }
                      </ul>
                    </div>

                    <div className="d-flex parent-chat-box">
                      <div className="chat-box w-xs-100">
                        <div
                          className="p-9"
                          style={{ height: "60vh", maxHeight: "60vh" }}
                          data-simplebar="init"
                        >
                          {ChatView()}

                        </div>
                        <div className="px-9 py-6 chat-send-message-footer" style={{ border: "1px solid grey" }}>
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
                                value={messageText} onChange={e => setMessageText(e.target.value)}
                                onKeyPress={(e) => {
                                  if (e.key === 'Enter') {
                                    sendMessage();
                                  }
                                }}
                                fdprocessedid="0p3op"
                              />
                            </div>
                            <ul className="list-unstyledn mb-0 d-flex align-items-center">
                              <li>
                                <a className="text-dark px-2 fs-7 bg-hover-primary nav-icon-hover position-relative z-index-5"
                                  href="javascript:void(0)">
                                  <i className="ti ti-photo-plus" />
                                </a>
                              </li>
                              <li>
                                <a
                                  className="text-dark px-2 fs-7 bg-hover-primary nav-icon-hover position-relative z-index-5"
                                  href="javascript:void(0)" >
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
                ) : (
                  <div className="chatting-box d-block">
                    <div className="p-9 border-bottom chat-meta-user d-flex align-items-center justify-content-between">
                      <div className="hstack gap-3 current-chat-user-name"
                        style={{ cursor: "pointer" }}
                      >
                        <div className="position-relative"
                        >
                          <img
                            src={`http://connect-client.qcodesinfotech.com/images/icons/bpart.png`}
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
                          <p className="mb-0 h5 uppercase">
                            Business Partner
                          </p>
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
                          ><i className="ti ti-video" />
                          </a>
                        </li>
                        <li>
                          <a className="chat-menu text-dark px-2 fs-7 bg-hover-primary nav-icon-hover position-relative z-index-5"
                            href="javascript:void(0)"
                            onClick={()=>setshowBusinessPart(!showBusinessPart)}
                          >
                            <i className="ti ti-menu-2" /></a>
                        </li>
                      </ul>
                    </div>
                    <div style={{ height: "60vh"}}>
                    <div style={{display:showBusinessPart?"none":"block"}}>
                      <BuinessParner />
                    </div>
                    </div>
                    <div className="px-9 py-6 chat-send-message-footer" style={{ border: "1px solid grey" }}>
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
                          />
                        </div>
                        <ul className="list-unstyledn mb-0 d-flex align-items-center">
                          <li>
                            <a className="text-dark px-2 fs-7 bg-hover-primary nav-icon-hover position-relative z-index-5"
                              href="javascript:void(0)">
                              <i className="ti ti-photo-plus" />
                            </a>
                          </li>
                          <li>
                            <a
                              className="text-dark px-2 fs-7 bg-hover-primary nav-icon-hover position-relative z-index-5"
                              href="javascript:void(0)" >
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
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Chats
