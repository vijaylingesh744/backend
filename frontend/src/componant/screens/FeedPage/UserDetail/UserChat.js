import { get, off, onValue, push, ref } from "firebase/database";
import React, { startTransition, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { db } from "../../../../firebase";
import Header from "../../layout/SubHeader";
import '../style/style.css'
import '../../chatPage/style/chatscreen.css';
import { BASE_URL } from "../../../utils/ApiRoute"
import { handleImageRemove, fileUploadAndResize } from "../../chatPage/function/Chatfunction.js"
import LeftSide from '../PostData/LeftSide.js'
import Rightside from "./layout/Rightside";
import FetchData from "../../../fetch-api/Apifetch";
import { TimeFormat,Linkcheck } from "../../../utils/Function.js";
import BottomNavbar from "../../layout/BottomNavbar.js";
const UserChat = () => {
  const location = useLocation();
  const [selectedItems, setselectedItems] = useState([]);
  const [PageLists, setPageLists] = useState([])
  const navigate = useNavigate();
  const { state } = location;
  const queryString = location.search;
  // Extract the value from the query string
  const nodeId = queryString ? queryString.substring(1) : '';
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("LOGINDATA"))?.user
  );
  const chatContainerRef = useRef(null);
  const [messageText, setMessageText] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetch();
    UserFollowed()
  }, []);

  const fetch = async (id = nodeId) => {
    setMessages([])
    const data = await getAllMessages(id);
    setMessages(data);
  };

  useEffect(() => {
    const unsubscribe = listenForNewMessages(nodeId, setMessages);

    return () => {
      unsubscribe(); // Clean up the listener when the component unmounts
    };
  }, [nodeId]);
  useEffect(() => {
    if (chatContainerRef.current) {
      const lastMessage = chatContainerRef.current.querySelector('.chat-messages > span:last-child');
      if (lastMessage) {
        lastMessage.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [messages]);


  const getAllMessages = async (nodeId = nodeId) => {
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
  const listenForNewMessages = (nodeId = nodeId, callback) => {
    const dbName = `chats/${nodeId}`;
    const messagesRef = ref(db, dbName);

    const listenerCallback = (snapshot) => {
      if (snapshot.exists()) {
        const messagesWithIds = [];
        snapshot.forEach((childSnapshot) => {
          const messageId = childSnapshot.key;
          const messageData = childSnapshot.val();
          messagesWithIds.push({ id: messageId, ...messageData });
        });
        callback(messagesWithIds);
      } else {
        console.log("No data available");
      }
    };

    onValue(messagesRef, listenerCallback, (error) => {
      console.error("Error fetching messages: ", error);
    });

    return () => {
      off(messagesRef, listenerCallback);
    };
  };
  const sendMessage = async () => {
    if (messageText.trim() !== '' || selectedItems.length > 0) {
      const messagesRef = ref(db, `chats/${nodeId}`);
      push(messagesRef, {
        _id: Date.parse(new Date()),
        chatID: nodeId + user?._id, //user id+ business user id
        text: messageText,
        image: selectedItems.length > 0 ? BASE_URL + selectedItems[0] : "",
        video: '',
        audio: '',
        type: selectedItems.length > 0 ? 1 : 0,
        createdAt: new Date().toString(),
        date: new Date().toLocaleString().split(",")[0],
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        user: {
          _id: user._id,
          name: user.first_name + " " + user.last_name,
          profile: user?.randomprofile,
        },
        senderId: nodeId,
        receiverId: user?._id,
      });
      console.log("messagesRef", messagesRef);
      fetch(nodeId);
      setMessageText("");
      setselectedItems([])
    }
  };

  const UserFollowed = async (pageId) => {
    try {
      const res = await FetchData('user/follow/' + user?._id, "GET", null, false, false);
      console.log(res);
      if (res.status) {
        const altered = res.data.filter(item => item?._id !== pageId)
        setPageLists(altered)
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
      <header id="main-header">
        <Header />
      </header>
      <div className="feed_container" style={{ display: "grid" }}>
        <section id='ads'></section>

        <LeftSide />

        <div id="main-wrapper" className='mt-5 mt-lg-0'>
          <main id="main-section" className='mt-2 mt-lg-0'>
            <div className="container-fluid d-flex justify-content-between rounded-top-2 py-2 pl-4 background" style={{ position: "sticky" }}>
              <div className="d-flex column-gap-2 align-items-center">
                <img
                  src={state?.profile}
                  style={{ width: 45, height: 45, objectFit: 'contain' }}
                />
                <div className="d-flex flex-column">
                  <span className="chatname fontsubtitle text-dark1">{state?.title}</span>
                  <span className="chatactive"></span>
                </div>
              </div>
              <div className="d-flex justify-content-between align-items-center" style={{ columnGap: 25 }} >

              </div>
            </div>

            <div ref={chatContainerRef} className="chat-container container-fluid background1 mt-1 py-3" style={{ height: '68vh', maxHeight: '68vh' }}>
              <div class="chat-messages">
                <p className="chattime text-center text-secondary1 fontcontent2">Today 12:27 PM</p>
                <>
                  {Array.isArray(messages) && messages.map(message => (
                    <>
                      {message.type == 0 ? (
                        <span className={'px-3 pt-2 my-2 pb-1 ' + (message.receiverId === user._id ? 'user-message' : 'bot-message')} >
                          <p className="font-weight-bold mb-1" onClick={() => {
                            startTransition(() => {
                              navigate(`/user/${message.user._id}`)
                            })
                          }}>{message.user.name}</p>
                          <Linkcheck content={message?.text?.replace(/\n/g, '<br>')} rtl={false} />
                          <p className={'mb-0 mx-25 pt-2 pb-1 ' + (message.receiverId === user._id ? 'usermessagetime' : 'botmessagetime')}>{message?.createdAt && TimeFormat(new Date(message?.createdAt).toLocaleTimeString())}</p>
                        </span>
                      ) :
                        (
                          <div className={'px-1 pt-1 my-2 pb-1 d-flex flex-column ' + (message.receiverId === user._id ? 'user-message' : 'bot-message')} >
                            <img src={message.image} alt="" style={{ maxWidth: "200px", maxHeight: "300px" }} />
                            <Linkcheck content={message?.text?.replace(/\n/g, '<br>')} rtl={false} />
                            <p className={'mb-0 mx-25 pt-2 pb-1 ' + (message.receiverId === user._id ? 'usermessagetime' : 'botmessagetime')}>{message?.createdAt && TimeFormat(new Date(message?.createdAt).toLocaleTimeString())}</p>
                          </div>
                        )}
                    </>
                  ))}
                </>
              </div>
            </div>
            <div className="container-fluid background mt-1 rounded-bottom-2 position-fix">
              {selectedItems?.filter(item => item != "").map((selectedFile, index) => (
                <div
                  key={index}
                  className="selected-photo-container w-25">
                  <div className='bg-white rounded-circle crossdiv'>
                    <i className="fa fa-times" aria-hidden="true"
                      onClick={() => handleImageRemove(selectedFile, setselectedItems, selectedItems)}
                    ></i>
                  </div>
                  <img
                    src={BASE_URL + selectedFile}
                    alt={`Selected Photo ${index + 1}`}
                    className="selected-photo"
                  />

                </div>
              ))}
              <div className="d-flex inputback align-items-center justify-content-start px-2 bg-white column-gap-4">
                <input type="file" id="attachfile" name="Attachfile" hidden
                  onChange={(e) => fileUploadAndResize(e, setselectedItems, selectedItems)}
                />
                <label htmlFor="attachfile">
                  <img label="Attachfile" src="/images/icons/attach.png"
                    style={{ width: 20, height: 20 }} />
                </label>            <input
                  type="text"
                  className="bg-white"
                  placeholder="Type a message..."
                  value={messageText} onChange={e => setMessageText(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      sendMessage();
                    }
                  }}
                  defaultValue="Hi Great, thanks"
                />

                <button
                  style={{ width: 40, height: 40 }}
                  className="sendbutton d-flex align-items-center justify-content-center" onClick={sendMessage}>
                  <img
                    src="/images/icons/paper-plane 1.png"
                    style={{ width: 16, height: 16 }}
                  />
                </button>
              </div>
            </div>
          </main>
        </div>

        <div className="d-none d-md-block d-lg-block">
          <Rightside pages={PageLists} />
        </div>
      </div>

      <BottomNavbar />
    </div>
  );
};

export default UserChat;
