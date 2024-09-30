import React, { useState, useEffect } from "react";
import FetchData from "../../../fetch-api/Apifetch";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { ref, push, get, onValue, off } from "firebase/database";
import { db } from "../../../../firebase.js";
import Modal from "react-bootstrap/Modal";
import { handleImageError, Imagesource, validateForm } from "../../../utils/Function.js";
import { BASE_URL } from "../../../utils/ApiRoute";
import BuinessParner from "./Split/BuinessParner.js";
import { toast } from "react-toastify";
import "./chartscreen.css"
import LeftSide from "../../../screens/FeedPage/PostData/LeftSide"

const Chats = () => {
  const { id } = useParams();
  const location = useLocation();
  const { state } = location;
  const [ProjectList, setProjectList] = useState([]);
  const [ProjectList1, setProjectList1] = useState([]);
  const [CurrentProject, setCurrentProject] = useState({});
  const [viewproject, setviewProject] = useState();
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("LOGINDATA")).user
  );
  const navigate = useNavigate();
  useEffect(() => {
    // listProjects(id);
    console.log(state);
  }, []);
  const [formData, setFormData] = useState({
    projectId: "",
    bpId: user._id,
    senderId: user._id,
    receiverId: "",
    bpCharges: "",
    email: "",
    mop: "",
    // pInitiation: "",
    transactionNo: "692e2Dce12392817w",
    // dateTime: "",
    remark: "",
    // csFee: "",
    dueDate: "",
    amount: "",
    currency: "",
    invoiceNo: "XBGHJSD",
  });

  const [Eventform, setEventform] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    bp_id: CurrentProject?.bp_id,
    client_id: CurrentProject?.user_id,
    project_id: CurrentProject?._id,
  });

  const listProjects = async (ids) => {
    try {
      const res = await FetchData(
        `list/project/${ids}`,
        "GET",
        null,
        true,
        false
      );
      if (res.status) {
        setProjectList(res.data);
        setviewProject(ids);
        console.log(res.data);
        setSelectedItem(res.data[0]);
        setSelectedChat({
          project_id: res.data[0]?.project_id,
          user_id: res.data[0]?.userdata._id,
          email: res.data[0]?.userdata?.gmail,
        });
        setFormData((prevFormData) => ({
          ...prevFormData,
          receiverId: res.data[0]?.userdata?._id
        }));
      }
    } catch (error) {
      console.error("Error fetching user list:", error.message);
    }
  };

  const [node, setNode] = useState("");
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState("");
  const [selectedItem, setSelectedItem] = useState({});
  const [selectedChat, setSelectedChat] = useState({});

  useEffect(() => {
    listProject()
    fetch();
  }, []);

  const fetch = async (id = node) => {
    const data = await getAllMessages(id);
    setMessages(data);
  };
  const chatData = async (id = selectedItem?.nodeId) => {
    setNode(id);
    fetch(id);
  };

  const getAllMessages = async (nodeId = node) => {
    console.log("nodeID,", nodeId);
    const dbName = `chats/${nodeId}`;
    const messagesRef = ref(db, dbName);
    const snapshot = await get(messagesRef);
    const messagesWithIds = [];
    snapshot.forEach((childSnapshot) => {
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
      snapshot.forEach((childSnapshot) => {
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
    setFormData((prevFormData) => ({
      ...prevFormData,
      invoiceNo: "INV-" + generateInvoiceNumber(7),
      transactionNo: "CONSQ-" + generateInvoiceNumber(12),
      projectId: selectedChat?.project_id, // Replace with actual project ID
      email: selectedChat?.email,
      client_id: selectedChat?.user_id,
    }));
    return () => {
      unsubscribe();
    };
  }, [node]);

  const sendMessage = async () => {
    if (messageText.trim() !== "") {
      const messagesRef = ref(db, `chats/${node}`);
      push(messagesRef, {
        _id: Date.parse(new Date()),
        chatID: user._id + selectedItem?.userdata?._id, //user id+ business user id
        text: messageText,
        image: "",
        video: "",
        audio: "",
        type: 0,
        createdAt: new Date().toString(),
        date: new Date().toLocaleString().split(",")[0],
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        user: {
          _id: user._id,
          name: user.first_name,
          profile: user?.randomprofile,
        },
        senderId: user._id,
        receiverId: selectedItem?.userdata?._id,
      });
      fetch(node);
      setMessageText("");
    }
  };

  const [slide, setSlide] = useState(1);
  const [showBusinessPart, setshowBusinessPart] = useState(true);
  const SideBar = () => {
    return (
      <div className="d-none d-lg-block border-end user-chat-box">
        <div className="px-4 pt-9 pb-6">
          <div className="d-flex align-items-center justify-content-between mb-3">
            <div className="d-flex align-items-center">
              <div className="position-relative">
                <img
                  src={`${user?.profile
                    ? `${BASE_URL + user?.profile}`
                    : `/images/profile/img0${user?.randomprofile}.png`
                    }`}
                  alt="user1"
                  width={54}
                  height={54}
                  onError={handleImageError}
                  className="rounded-circle"
                />
                <span className="position-absolute bottom-0 end-0 p-1 badge rounded-pill bg-success">
                  <span className="visually-hidden">New alerts</span>
                </span>
              </div>
              <div className="ms-3">
                <h6 className="fw-semibold mb-2">
                  {user?.first_name} {user?.last_name}
                </h6>
                <p className="mb-0 fs-2">{user?.designation}</p>
              </div>
            </div>
            <div className="dropdown">
              <a
                className="text-dark fs-6 nav-icon-hover"
                aria-expanded="false"
              >
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
            data-simplebar="init"
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
                      <li
                        onClick={() => {
                          setSlide(2);
                          setSelectedItem(null);
                        }}
                      >
                        <a
                          href="javascript:void(0)"
                          className={`px-2 py-3 bg-hover-light-black d-flex align-items-start justify-content-between chat-user ${null == selectedItem ? "bg-light-subtle" : ""
                            }`}
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
                      {ProjectList.map((item) => (
                        <li
                        style={{cursor:"pointer"}}
                          onClick={() => {
                            if (item.status == 0) {
                              console.log(selectedChat);
                              return;
                            }
                            setSelectedChat({
                              project_id: item?.project_id,
                              user_id: item?.userdata?._id,
                              email: item?.userdata?.gmail,
                            });
                            setCurrentProject(item);
                            setSelectedItem(item);
                            setSlide(1);
                            chatData(item?.userdata._id);
                          }}
                        >
                          <a
                            href="javascript:void(0)"
                            className={`px-3 py-3 bg-hover-light-black d-flex align-items-start justify-content-between chat-user ${item?.userdata._id == selectedItem?.userdata?._id
                              ? "bg-light-subtle"
                              : ""
                              }`}
                            id="chat_user_1"
                            data-user-id={1}
                          >
                            <div className="d-flex align-items-center">
                              <span className="position-relative">
                                <img
                                  src={`${item?.userdata?.profile
                                    ? `${BASE_URL + item?.userdata?.profile}`
                                    : `/images/profile/img0${item?.userdata?.randomprofile}.png`
                                    }`}
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
                                  {item?.userdata.first_name}{" "}
                                  {item?.userdata.last_name}
                                </h6>
                                {item.status !== 0 ? (
                                  <span className="fs-3 text-truncate text-body-color d-block">
                                    {item?.userdata.user_type == "0"
                                      ? "Buyer"
                                      : "Seller"}
                                  </span>
                                ) : (
                                  <span className="fs-3 text-truncate text-danger text-body-color d-block">
                                    Waiting for Approval
                                  </span>
                                )}
                              </div>
                            </div>
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
                  display: "none",
                }}
              />
            </div>
          </ul>
        </div>
      </div>
    );
  };

  const ChatView = () => {
    return (
      <div className="simplebar-wrapper" style={{ margin: "-20px" }}>
        <div className="simplebar-height-auto-observer-wrapper">
          <div className="simplebar-height-auto-observer" />
        </div>
        <div className="simplebar-mask" style={{ background: "#e7e7e7" }}>
          <div className="simplebar-offset" style={{ right: 0, bottom: 0 }}>
            <div
              className="simplebar-content-wrapper"
              tabIndex={0}
              role="region"
              aria-label="scrollable content"
              style={{ height: "100%", overflow: "scroll" }}
            >
              <div className="simplebar-content" style={{ padding: 20 }}>
                <div className="chat-list chat active-chat" data-user-id={1}>
                  {messages.map((message) => (
                    <div
                      className={`hstack gap-3 align-items-start mb-7 ${message.senderId === user._id
                        ? "justify-content-end"
                        : "justify-content-start"
                        }`}
                    >
                      <div>
                        <h6 className="fs-2 text-muted">
                          {message.user?.name}, {message.time}
                        </h6>
                        <div
                          className="p-2 rounded-1 fs-3"
                          style={{
                            backgroundColor: "#2D2B70",
                            color: "white",
                          }}
                        >
                          {message.text}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const listProject = async () => {
    try {
      const res = await FetchData(
        `notify_list/${user?._id}`,
        "GET",
        null,
        true,
        false
      );
      if (res.success) {
        setProjectList1(res.data);
        // alert(res.data.length)
        listProjects(res.data[0]?.project_id)
      }
    } catch (error) {
      console.error("Error fetching user list:", error.message);
    }
  };

  function generateInvoiceNumber(length) {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let result = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }
    return result;
  }

  const setInvoiceData = async () => {
    try {
      const res = await FetchData(
        `transaction/add`,
        "POST",
        JSON.stringify(formData),
        true,
        false
      );
      if (res.status) {
        toast.success("Invoice added successfully");

        setFormData({
          projectId: "",
          bpId: user._id,
          senderId: user._id,
          receiverId: selectedItem?.userdata?._id,
          bpCharges: "",
          email: "",
          mop: "",
          // pInitiation: "",
          transactionNo: "692e2Dce12392817w",
          // dateTime: "",
          remark: "",
          // csFee: "",
          dueDate: "",
          amount: "",
          currency: "",
          invoiceNo: "XBGHJSD",
        });

        // if (state) {
        //     // navigate(`/bp/project-connection/${state?.project_id}`)
        // } else {

        //     setProject(true);
        //     setInvoice(false);
        // }
      }
      //   if (res.success) {
      //     fetchNotifyList()
      //   }
      //   Swal.fire({
      //     title: 'Success!',
      //     text: 'Notification Sent To Customer.',
      //     icon: 'success'
      //   });
    } catch (error) {
      console.error("Error fetching user list:", error.message);
      // setInvoiceButton(false)
      setFormData({
        projectId: "",
        bpId: user._id,
        senderId: user._id,
        receiverId: selectedItem?.userdata?._id,
        bpCharges: "",
        email: "",
        mop: "",
        // pInitiation: "",
        transactionNo: "692e2Dce12392817w",
        // dateTime: "",
        remark: "",
        // csFee: "",
        dueDate: "",
        amount: "",
        currency: "",
        invoiceNo: "XBGHJSD",
      });
    }
  };

  const [changesize, setChangeSize] = useState({
    project: "6",
    user: "0",
    chat: "0",
    profile: "3",
  })
  const ChangeSize = (name, id) => {
    setChangeSize(prevChangesize => ({
      ...prevChangesize,
      [name]: id
    }));
  };

  return (
    <>
      <div className="body-wrapper">
        <div className="container-fluid">
          <div id="main-wrapper" className="mt-5 mt-lg-0">
            <main id="main-section" className="mt-2 mt-lg-0 row">
              <div className={`bg-white col-${changesize.project} ${changesize.project == 6 ? "offset-3" : "offset-0"} p-1 transition-offset transition-width ${changesize.project == 0 ? "d-none" : "block"}`}>
                <div className="p-2">
                  <span className="fontsubtitle font-weight-bold text-dark1 py-2 pl-2">My Projects</span>
                  <form className="position-relative w-100 py-2">
                    <input
                      type="text"
                      className="form-control search-chat py-2 ps-5"
                      id="text-srh"
                      placeholder="Search Project"
                    />
                    <i className="ti ti-search position-absolute top-50 start-0 translate-middle-y fs-6 text-dark ms-3" />
                  </form>
                  <div className="container-fluid px-0 py-3 hidden-scrollbar" >
                    {ProjectList1 && ProjectList1.map((item,index) => (
                      <div className="card shadow-sm px-2 py-3 mb-1"
                      style={{
                        cursor:"pointer",
                        border:changesize?.projectId == index?"2px solid green":"none",
                      }}
                       onClick={() => {
                        listProjects(item.project_id)
                        ChangeSize("project", 3)
                        ChangeSize("user", 6)
                        ChangeSize("chat", 0)
                        ChangeSize("profile", 3)
                        ChangeSize("projectId", index)
                      }}>
                        <div className="card-content">
                          <img src={Imagesource(item?.user?.profile)} onError={handleImageError} width={35} height={35} className='rounded-circle ' />
                          <div className="card shadow-none border-0 mb-0">
                            <span className="fontcontent1 font-weight-bold text-dark1">{item.project.title}</span>
                            <div className="d-flex align-items-center ">
                              <div className="d-flex align-items-center">
                                {Array.from({ length: 4 }, (_, index) => (
                                  <img
                                    key={index} 
                                    src="/images/profile/img00.png"
                                    onError={handleImageError}
                                    width={12} 
                                    height={12} // Adjust height as needed
                                    className="rounded-circle shadow"
                                    style={{ position: 'absolute', left: index * 7 }} 
                                  />
                                ))}
                              </div>
                              <small style={{marginLeft:"40px"}} className="fontsmall font-weight-normal">&nbsp;{item?.connect_project.length} Clients</small>
                            </div>
                          </div>
                          <div>
                            <button className="btn btn-outline-connect text-connect">View</button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className={`bg-white col-${changesize.user} p-1 transition-width ${changesize.user == 0 ? "d-none" : "block"}`}>
                <div className="p-2">
                  <div className="d-flex justify-content-between align-items-center"><span className="fontsubtitle font-weight-bold text-dark1 py-2 pl-2">Projects Chatlist</span>
                    <i class="fa fa-plus pr-2 fontsubtitle text-dark1" aria-hidden="true"
                      onClick={() => navigate(`/bp/cs-vault`, { state: viewproject })}
                    ></i>
                  </div>
                  <form className="position-relative w-100 py-2">
                    <input
                      type="text"
                      className="form-control search-chat py-2 ps-5"
                      id="text-srh"
                      placeholder="Search Project"
                    />
                    <i className="ti ti-search position-absolute top-50 start-0 translate-middle-y fs-6 text-dark ms-3" />
                  </form>
                  <div className="container-fluid px-0 py-3 hidden-scrollbar" >
                    {ProjectList && ProjectList.map((item,index) => (
                      <div className="card shadow-sm  mb-1 p-2"
                      style={{
                        border:changesize?.chatId == index?"2px solid green":"none",
                      }}
                        onClick={() => {
                          ChangeSize("project", 3)
                          if (item.status == 0) {
                            console.log(selectedChat);
                            return;
                          }
                          ChangeSize("chatId", index)
                          ChangeSize("user", 3)
                          ChangeSize("profile", 0)
                          ChangeSize("chat", 6) 
                          setSelectedChat({
                            project_id: item?.project_id,
                            user_id: item?.userdata?._id,
                            email: item?.userdata?.gmail,
                          }); 
                          setCurrentProject(item);
                          setSelectedItem(item);
                          setSlide(1);
                          chatData(item?.userdata._id);
                        }}
                      >
                        <div className="card-content">
                          <img src={Imagesource(item?.userdata?.profile)} onError={handleImageError} width={35} height={35} className='rounded-circle ' />
                          <div className="card shadow-none border-0 mb-0">
                            <span className="fontcontent1 font-weight-bold text-dark1">{item.userdata?.first_name}&nbsp;{item.userdata?.last_name}</span>
                            {item.status !== 0 ? (
                              <span className="fontcontent2 font-weight-normal ">
                                {item?.userdata.user_type == "0"
                                  ? "Buyer"
                                  : "Seller"}
                              </span>
                            ) : (
                              <span className="fs-3 text-truncate text-danger text-body-color d-block">
                                Waiting for Approval
                              </span>
                            )}
                          </div>
                          <div></div>
                        </div>

                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className={`bg-white col-${changesize.chat} p-1 transition-width ${changesize.chat == 0 ? "d-none" : "block"}`}>
                <div className="">
                  <div id="main-wrapper background4" className=" d-block">
                    <div
                      className="container-fluid rounded-2 d-flex justify-content-between py-2 pl-4 background shadow-sm"
                      style={{ position: "sticky", top: "0%" }}
                    >
                      <div className="d-flex column-gap-2 align-items-center">
                        <img
                          src={`${selectedItem?.userdata?.profile ? `${BASE_URL + selectedItem?.userdata?.profile}` : `/images/profile/img0${selectedItem?.userdata?.randomprofile}.png`}`}
                          style={{ width: 33, height: 33, borderRadius: "50%" }}
                        />
                        <div className="d-flex flex-column">
                          <span className="chatname">
                            {selectedItem?.userdata?.first_name}
                            {" "}
                            {selectedItem?.userdata?.last_name}</span>
                          <span className="chatactive">last seen 3 hours ago</span>
                        </div>
                      </div>
                      <div className="d-flex justify-content-between align-items-center column-gap-3">
                        <span style={{cursor:"pointer"}} onClick={() => { setInvoiceData() }}>
                          <i className="fa fa-archive" aria-hidden="true" />
                        </span>
                      </div>
                    </div>
                    <div className="chat-container hidden-scrollbar  container-fluid background1 mt-1 py-3">
                      <div className="chat-messages">
                        <p className="chattime text-center">Today 12:27 PM</p>
                        {Array.isArray(messages) && messages.map(message => (
                          <span className={'px-3 pt-2 my-2 pb-1 ' + (message.senderId === user._id ? 'user-message' : 'bot-message')}>
                            {message.text}
                            <p className={'mb-0 mx-25 pt-2 pb-1 ' + (message.senderId === user._id ? 'usermessagetime' : 'botmessagetime')}>{message.time}</p>
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="container-fluid background mt-1 position-fix">
                      <div className="d-flex inputback align-items-center justify-content-around px-2 bg-white column-gap-3">
                        <img src="/images/icons/attach.png" style={{ width: 20, height: 20 }} />
                        <input
                          type="text"
                          className="bg-white"
                          placeholder="Type a message..."
                          defaultValue=""
                          style={{ border: "none" }}
                          value={messageText} onChange={e => setMessageText(e.target.value)}
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              sendMessage();
                            }
                          }}
                        />
                        {/* <img src="/images/icons/laugh.png" style={{ width: 20, height: 20 }} />
                        <img
                          src="/images/icons/microphone-black-shape 1.png"
                          style={{ width: 20, height: 20 }}
                        /> */}
                        <button className="sendbutton d-flex align-items-center justify-content-center"
                          onClick={() => {
                            sendMessage();
                          }}
                        >
                          <img
                            src="/images/icons/paper-plane 1.png"
                            style={{ width: 16, height: 16 }}
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={`col-${changesize.profile} p-1 transition-width ${changesize.profile == 0 ? "d-none" : "block"}`}>
                <LeftSide />
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chats;
