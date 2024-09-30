import React, { useEffect, useState, useRef } from 'react'
import Header from '../layout/SubHeader';
import './style/chatscreen.css'
import '../Transaction/style/config.css';
import FetchData from '../../fetch-api/Apifetch';
import Bp from '../layout/BP-Profile';
import { RatingVeiw, RatingViewOne, AddRatingReview } from "./Layout/Review"
import { ChatView } from "./Layout/UserChat"
import { UserList } from "./Layout/LeftSide"
import { ReportBP } from './Layout/Report';
import { BASE_URL } from "../../utils/ApiRoute"
import { Paymentsuccess, generateInvoiceNumber } from './Layout/Common';
import { fetchAndDisplayMessages, UpdateAsSeenMessage } from './function/chatSeen.js'
import InvoiceModal from "../Function/InvoiceModal";
import { useNavigate } from 'react-router-dom';
import BottomNavbar from '../layout/BottomNavbar';
import { handleImageError, TimeFormat ,Linkcheck} from '../../utils/Function';
import { ref, push, get, onValue, off } from 'firebase/database';
import { db } from '../../../firebase.js';
import { handleImageRemove, fileUploadAndResize } from "./function/Chatfunction.js"
function Chatscreen() {
  const [NotifyActive, setNotifyActive] = useState(-4)
  const [selectedItems, setselectedItems] = useState([]);

  const navigate = useNavigate()
  const UserImg = ["img01.png", "img02.png", "img03.png", "img04.png", "img05.png"]
  const [Swipe, setSwipe] = useState(0)
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('LOGINDATA'))?.user);
  const [selectedItem, setSelectedItem] = useState();
  const [ClientNotification, setClientNotification] = useState([]);
  const [ChatUser, setChatUser] = useState([]);
  const [node, setNode] = useState('');
  const [ModalView, setModalView] = useState(false);
  const [messages, setMessages] = useState([]);
  const [ViewBP, setViewBP] = useState(false);
  const [messageText, setMessageText] = useState('');
  const chatContainerRef = useRef(null);
  const [ResponsiveView, setResponsiveView] = useState(false);
  const [showReply, setshowReply] = useState(false);
  const [TabInvoice, setTabInvoice] = useState([
    {
      id: Date.now(),
      product: "",
      quantity: "",
      amount: "",
    },
  ]);
  const [dropdown, setDropdown] = useState(false);
  const [Invoicedata, setInvoicedata] = useState();
  const [apiResponseReceived, setApiResponseReceived] = useState(false);
  const [paymentDetails, setpaymentDetails] = useState();
  const [ShareInvoiceData, setShareInvoiceData] = useState({
    receiverCharges: '',
    amount: '',
    bp_charges: '',
    csFee: '',
    tax: '',
    currency: '',
    invoiceNo: '',
    transactionNo: '',
    client_id: ''
  })
  useEffect(() => {
    const total = TabInvoice.reduce((acc, item) => {
      const itemAmount = parseFloat(item.amount) || 0;
      return acc + itemAmount;
    }, 0);

    setShareInvoiceData(prevInvoiceData => ({
      ...prevInvoiceData,
      amount: total
    }));
  }, [TabInvoice]);

  useEffect(() => {
    setShareInvoiceData((previnvoiceData) => ({
      ...previnvoiceData,
      invoiceNo: "INV-" + generateInvoiceNumber(7),
      transactionNo: "CONSQ-" + generateInvoiceNumber(12)
    }));
  }, []);

  useEffect(() => {
    ClientNotify();
    ListChat()
    fetch()
  }, [])

  useEffect(() => {
    if (selectedItem?.users?._id) {
      chatData(selectedItem?.nodeId)
    }
  }, [selectedItem]);

  const fetch = async (id = node) => {
    const data = await getAllMessages(id)
    setMessages(data)
  }

  const chatData = async (id = selectedItem?.nodeId) => {
    setNode(id);
    fetch(id)
  }

  const getAllMessages = async (nodeId = node) => {
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
    const listenerCallback = (snapshot) => {
      const messagesWithIds = [];
      snapshot.forEach(childSnapshot => {
        const messageId = childSnapshot.key;
        const messageData = childSnapshot.val();
        messagesWithIds.push({ id: messageId, ...messageData });
      });
      callback(messagesWithIds);
    };
    onValue(messagesRef, listenerCallback);

    UpdateAsSeenMessage(nodeId, user._id.toString())
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
    if (messageText.trim() !== '' || selectedItems.length > 0) {
      const messagesRef = ref(db, `chats/${node}`);
      push(messagesRef, {
        _id: Date.parse(new Date()),
        chatID: user._id + selectedItem?._id, //user id+ business user id
        text: messageText,
        image: selectedItems.length > 0 ? BASE_URL + selectedItems[0] : "",
        video: '',
        audio: '',

        type: selectedItems.length > 0 ? 1 : 0,
        createdAt: new Date().toString(),
        date: new Date().toLocaleString().split(',')[0],
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        user: {
          _id: user._id,
          name: user.first_name,
          profile: user?.randomprofile
        },
        senderId: user._id,
        receiverId: selectedItem?.users?._id,
        seendata: {
          status: false,
          user: selectedItem?.users?._id
        },
      });
      LastMsg(node, user.first_name + ": " + messageText)
      fetch(node)
      setMessageText('');
      setselectedItems([])
    }
  };

  const LastMsg = async (node, msg) => {
    try {
      const res = await FetchData(`last_msg`, 'POST', JSON.stringify({ nodeId: node, last_msg: msg }), true, false)
      console.log(res)
    } catch (err) {
      console.log(err)
    }
  }

  const ListChat = async () => {
    const res = await FetchData(`chatlist/${user._id}`, 'GET', null, true, false)
    if (res.status) {
      var list = res.data.filter(item => item.status == 1);
      if (list.length != 0 && user.first_login != 0) {
        setSelectedItem(list[0]);
      }
      const results = await Promise.all(list.flatMap(item => fetchAndDisplayMessages(item.nodeId, user._id.toString())));
      const userListArray = list.map(user => {
        const chatCount = results.find(chat => chat.nodeId === user.nodeId);
        return {
          ...user,
          chatCount: chatCount ? chatCount.count : 0
        };
      });
      setChatUser(userListArray)
    }
  }

  const logger = (msg) => {
    setshowReply(!showReply)
  }

  useEffect(() => {
    if (chatContainerRef.current) {
      const lastMessage = chatContainerRef.current.querySelector('.chat-messages > span:last-child');
      if (lastMessage) {
        lastMessage.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [messages]);

  useEffect(() => {
    setDropdown(false)
  }, [Swipe]);

  const HandleShareInvoice = async () => {
    setModalView(false)
    const updatedInvoiceData = {
      ...ShareInvoiceData,
      receiverCharges: TabInvoice
    };
    try {
      const res = await FetchData(`invoice_trans/add`, "POST", JSON.stringify(updatedInvoiceData), false, false)
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  }

  const listtransaction = async (project_id) => {
    setSwipe(4);
    try {
      const res = await FetchData(`listtransaction/${user?._id}/2/${project_id}`, 'GET', null, true, false)
      if (res.status) {
        setInvoicedata(res.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const ClientNotify = async () => {
    try {
      const res = await FetchData(`client_notify/${user?._id}/1`, 'GET', null, true, false)
      if (res.success) {
        console.log("Res::::", res);
        const filterData = res.data.filter(item => item.user_id !== user?._id)
        setClientNotification(filterData)
        setApiResponseReceived(true)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const [timeElapsed, setTimeElapsed] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeElapsed(prev => prev + 100);
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const handlePayment = async (payselected) => {
    try {
      const res = await FetchData(`updateinvoice/${payselected?._id}`, 'GET', null, true, false)
      if (res.status) {
        setSwipe(8)
        setpaymentDetails(res.data)
      }
    } catch (err) {
      console.log(err);
    }
  }

  const AddReview = (value) => {
    setSelectedItem(value)
    setSwipe(6)
  }

  const UserChat = () => {
    return (
      <div id="main-wrapper background4" className=" d-block">
        <div
          className="container-fluid rounded-2 d-flex justify-content-between py-2 pl-4 background shadow-sm"
          style={{ position: "sticky", top: "0%" }}>
          <div className="d-flex column-gap-2 align-items-center"
          >
            <img src="/images/icons/arrow.png" style={{ width: 20, height: 20 }} onClick={() => {
              if (ResponsiveView) {
                setResponsiveView(!ResponsiveView)
              }
            }} />
            <img
              src={`${selectedItem?.users?.profile ? `${BASE_URL + selectedItem?.users?.profile}` : `/images/profile/img0${selectedItem?.users?.randomprofile}.png`}`}
              onError={handleImageError}
              style={{ width: 33, height: 33, borderRadius: '50%' }} />
            <div
              onClick={() => navigate("/user/" + selectedItem?.users?._id)}
              className="d-flex flex-column">
              <span className="chatname">{selectedItem?.users?.first_name + " " + selectedItem?.users?.last_name}</span>
              <span className="chatactive">last seen 3 hours ago</span>
            </div>
          </div>
          <div className="d-flex justify-content-between align-items-center column-gap-3">

          </div>
        </div>
        <div ref={chatContainerRef} className="chat-container container-fluid background1 mt-1 py-3">
          <div class="chat-messages">
            <p className="chattime text-center">Today 12:27 PM</p>
            {Array.isArray(messages) && messages.map(message => (
              <>
                {message.type == 0 ? (
                  <span className={'px-3 pt-2 my-2 pb-1 ' + (message.senderId === user._id ? 'user-message' : 'bot-message')} onClick={() => { logger(message) }}>
                    {/* {message.text} */}
                    <Linkcheck content={message?.text?.replace(/\n/g, '<br>')} rtl={false} />
                   
                    <p className={'mb-0 mx-25 pt-2 pb-1 ' + (message.senderId === user._id ? 'usermessagetime' : 'botmessagetime')}>{message?.createdAt && TimeFormat(new Date(message?.createdAt).toLocaleTimeString())}</p>
                  </span>
                ) :
                  (
                    <div className={'px-1 pt-1 my-2 pb-1 d-flex flex-column ' + (message.senderId === user._id ? 'user-message' : 'bot-message')} onClick={() => { logger(message) }}>
                      <img src={message.image} alt="" style={{ maxWidth: "200px", maxHeight: "300px" }} />
                      <Linkcheck content={message?.text?.replace(/\n/g, '<br>')} rtl={false} />
                   
                      <p className={'mb-0 mx-25 pt-2 pb-1 ' + (message.senderId === user._id ? 'usermessagetime' : 'botmessagetime')}>{message?.createdAt && TimeFormat(new Date(message?.createdAt).toLocaleTimeString())}</p>
                    </div>
                  )}
              </>
            ))}
          </div>
        </div>
        <div className="container-fluid background mt-1 position-fix">
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
          <div className="d-flex inputback align-items-center justify-content-around px-2 bg-white column-gap-3">
            <input type="file" id="attachfile" name="Attachfile" hidden
              onChange={(e) => fileUploadAndResize(e, setselectedItems, selectedItems)}
            />
            <label htmlFor="attachfile">
              <img label="Attachfile" src="/images/icons/attach.png"
                style={{ width: 20, height: 20 }} />
            </label>
            <input
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

            <button style={{ width: 40, height: 40 }} className="sendbutton d-flex align-items-center justify-content-center" onClick={sendMessage}>
              <img
                src="/images/icons/paper-plane 1.png"
                style={{ width: 16, height: 16 }}
              />
            </button>
          </div>
        </div>
      </div>
    )
  }

  const invoice = () => {
    return (
      <div className=''>
        <div className="align-items-center background4 column-gap-2 d-flex p-2 border border-left-0" style={{ width: "99%" }}>
          <img src="/images/icons/arrow.png" style={{ width: 20, height: 20 }} onClick={() => setSwipe(2)} />
          <div className="d-flex flex-column gap1 ">
            <span className="name1grey">Project Id : {"(" + selectedItem?.project_data?.project_id + ")"} </span>
          </div>
        </div>
        <div className='card my-2 border-0 d-flex flex-lg-row p-3 align-items-center justify-content-center' style={{ width: '99%', height: 'auto', background: 'rgb(138, 197, 63)' }}>
          <div className='d-flex column-gap-3 align-items-center flex-column'>
            <img src={`/images/profile/${UserImg[selectedItem?.users?.randomprofile]}`} style={{ width: 40, height: 40 }} />

            <div>
              <span className="chatname" style={{ color: 'white' }}>{selectedItem?.users?.first_name + " " + selectedItem?.users?.last_name}</span>
            </div>
          </div>
        </div>
        <div className='row ml-0 mr-0' >
          <div className="card d-flex flex-column col-8 p-4" style={{ height: '60vh', overflow: 'scroll' }}>
            {Invoicedata && Invoicedata.length !== 0 ? (
              Invoicedata.map(value => (
                <div>
                  <div className='container-fluid w-100'>
                    <h3 className='w-100 d-flex justify-content-end fonttitle' style={{ color: "#8ac43f" }}>INVOICE</h3>
                    <div className='float-right w-100' style={{ textAlign: "end" }}>
                      <p className='mb-0 fontcontent1'>{value.invoiceNo}</p>
                      <p className='mb-0 fontcontent1'>{value.transactionNo}</p>
                      <p className='fontcontent1'>Date:24/12/2024</p>

                    </div>

                    {/* <p className='fontcontent1'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum posuere lobortis porta. Nullam maximus justo at nisl interdum eleifend.</p> */}
                    <table class="table">
                      <thead>
                        <tr>
                          <th scope="col">S.No</th>
                          <th scope="col">Product</th>
                          <th scope="col">Quantity</th>
                          <th scope="col">Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          value.receiverCharges.map((item, index) => (


                            <tr key={index}>
                              <th scope="row">{index + 1}</th>
                              <td>{item.product}</td>
                              <td>{item.quantity}</td>
                              <td>{item.amount}</td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                    <div className='mt-4 w-100'>
                      <button className='btn text-white border-0 rounded fontsubtitle font-weight-bold w-25 float-right' style={{ background: value.status === 1 ? '#4535C1' : 'rgb(117 125 108)' }} onClick={() => { handlePayment(value) }}>{value.status === 2 ? "Paid" : "Pay"}</button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className='card mx-3 border-0 d-flex p-3 align-items-center justify-content-center' style={{ width: '100%', height: 'auto', background: '#F8F8F8' }}>
                <img src="images/busi_images/noData1.png" width="300px" className='mt-4' alt="No Data" />
                <p className="mt-4 h5 font-weight-bold fontsubtitle" style={{ color: "#2D2B70" }}>No Invoice Found!</p>
              </div>
            )}
          </div>

          <div className='col-4 '>
            <div className='card d-flex p-4 align-items-start' style={{ border: '1px solid #D8D8D8 ' }}>

              <div className='w-100 d-flex justify-content-center'><img src={`/images/profile/${UserImg[selectedItem?.users?.randomprofile]}`} style={{ width: 80, height: 80 }} /></div>
              <span className='fontcontent1 font-weight-normal mt-3 ml-4'><b>Business Partner:</b> {selectedItem?.users?.first_name + " " + selectedItem?.users?.last_name}</span>
              <span className='fontcontent1 font-weight-normal mt-3 ml-4' ><b>Phone:</b> {selectedItem?.users?.phone}</span>
              <span className='fontcontent1 font-weight-normal mt-3 ml-4'><b>Email:</b> {selectedItem?.users?.gmail}</span>
              <span className='fontcontent1 font-weight-normal mt-3 ml-4'><b>City:</b> {selectedItem?.users?.city}</span>
              <span className='fontcontent1 font-weight-normal mt-3 ml-4'><b>Country:</b> {selectedItem?.users?.country}</span>


            </div>

          </div>
        </div>
      </div>
    )
  }

  const SouqStatus = [
    "Proposal sent",
    "Proposal Negotiation",
    "Requested a Demo",
    "KT Transferred",
    "Shipping the Product",
    "Deal Closed Successfully",
  ]

  const ClassActive = (id) => {
    return id <= selectedItem?.project_data?.StageId ? "active" : ""
  }

  return (
    <div>
      <header id="main-header">
        <Header />
      </header>
      <div className="feed_doublecontainer reverse" style={{ display: "grid", maxHeight: '100vh' }}>
        <section id="ads"></section>
        <aside id="left-aside" className={`d-block pt-2 px-3 mt-lg-0 pt-lg-0 px-lg-0 ${!ResponsiveView ? 'd-block' : 'd-none d-md-block d-lg-block'}`}style={{ gridArea: 'initial' }} >
          <div className={`background1 rounded-2 user-list-con chat-list mx-0 mx-lg-1 px-1 w-100 w-sm-100 py-3 `}>
            <UserList
              setSwipe={setSwipe}
              ChatUser={ChatUser}
              setNotifyActive={setNotifyActive}
              NotifyActive={NotifyActive}
              setSelectedItem={setSelectedItem}
              UserImg={UserImg}
              user={user}
              setResponsiveView={setResponsiveView}
            />
          </div>
        </aside>

        <div id="main-wrapper1font change" >
          <main id="main-section" className='mt-2 mt-lg-0 mx-lg-3 px-2 px-lg-0'>
            <div className="d-flex justify-content-center mx-auto  px-sm-2 my-0 " >
              <div className={`background1 rounded-2 chat-list m-0 px-0  py-0 ${Swipe == 0 ? !ResponsiveView ? 'd-none d-md-block d-lg-block' : 'd-block' : 'd-none slide-out'}`}>
                <ChatView
                  setSwipe={setSwipe}
                  timeElapsed={timeElapsed}
                  user={user}
                  apiResponseReceived={apiResponseReceived}
                  ClientNotification={ClientNotification}
                  UserImg={UserImg}
                  setSelectedItem={setSelectedItem}
                  setResponsiveView={setResponsiveView}
                />
              </div>
              <div className={`background1 rounded-2 chat-list m-0 px-0  ${Swipe === 12 ? 'slide-in' : 'd-none'}`}>
                <RatingVeiw
                  setSwipe={setSwipe}
                  selectedItem={selectedItem}
                  SouqStatus={SouqStatus}
                  ClassActive={ClassActive}
                  UserImg={UserImg}
                  setNotifyActive={setNotifyActive}
                />
              </div>
              <div className={`background1 rounded-2 chat-list m-0 px-0  ${Swipe === 1 ? 'slide-in' : 'd-none'}`}>
                <RatingViewOne
                  setSwipe={setSwipe}
                  selectedItem={selectedItem}
                  SouqStatus={SouqStatus}
                  ClassActive={ClassActive}
                  UserImg={UserImg}
                  setNotifyActive={setNotifyActive}
                />
              </div>
              <div className={`background1 rounded-2 chat-list m-0 px-0 py-0 ${Swipe == 2 ? !ResponsiveView ? 'd-none d-md-block d-lg-block' : 'd-block' : 'd-none slide-out'}`}>
                {UserChat()}
              </div>
              <div className={`background1 rounded-2 chat-list m-0 px-0 py-0 ${Swipe == 4 ? 'd-block' : 'd-none slide-out'}`}>
                {invoice()}
              </div>
              <div className={`background1 rounded-2 chat-list m-0 px-0 py-0 ${Swipe == 8 ? 'd-block' : 'd-none slide-out'}`}>
                <Paymentsuccess selectedItem={selectedItem}
                  paymentDetails={paymentDetails}
                  listtransaction={listtransaction}
                  UserImg={UserImg}
                  setSwipe={setSwipe}
                />
              </div>
              <div className={`background1 rounded-2 chat-list m-0 px-0 py-0 ${Swipe == 7 ? 'd-block' : 'd-none slide-out'}`}>
                <ReportBP setSwipe={setSwipe}
                  selectedItem={selectedItem} UserImg={UserImg} />
              </div>

              <div className={`background1 rounded-2 chat-list m-0 px-0 py-0 ${Swipe == 6 ? 'd-block' : 'd-none slide-out'}`}>
                <AddRatingReview
                  setSwipe={setSwipe}
                  selectedItem={selectedItem}
                  setNotifyActive={setNotifyActive}
                  setSelectedItem={setSelectedItem}
                  UserImg={UserImg} />
              </div>
              {selectedItem &&
                <Bp SetShow={setViewBP} show={ViewBP} id={selectedItem?.users?._id} />
              }
              <InvoiceModal
                ModalView={ModalView}
                setModalView={setModalView}
                invoiceData={ShareInvoiceData}
                TabInvoice={TabInvoice}
                setTabInvoice={setTabInvoice}
                HandleShareInvoice={HandleShareInvoice}
              />
            </div>
          </main>
        </div>
      </div>
      <BottomNavbar />
    </div>
  );
}
export default Chatscreen
