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
import { Wfbp ,Paymentsuccess,generateInvoiceNumber} from './Layout/Common';
import InvoiceModal from "../Function/InvoiceModal";
import { useNavigate } from 'react-router-dom';
import BottomNavbar from '../layout/BottomNavbar';
import { handleImageError } from '../../utils/Function';
import io from 'socket.io-client';
import {BASE_URL} from "../../utils/ApiRoute"
const socket = io(BASE_URL);
function Chatscreen() {
  const [NotifyActive, setNotifyActive] = useState(-4)
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
  },[]);
  useEffect(() => {
    socket.emit('sendMessage', node); 
    const handleMessage = (messageData) => {
      console.log("Received MessageData", messageData);
      const filteredMessages = Array.isArray(messageData) && messageData.filter((message) => {
        return message.nodeId == node;
      });

      setMessages(filteredMessages);
    };
    socket.on('message', handleMessage);

  },[node]);

  useEffect(() => {
    chatData()
  }, [selectedItem])


  const chatData = async () => {
    const data = {
      sender: user?._id,
      receive: selectedItem?.users?._id,
    }
    if(selectedItem?.matchedField == "senderData" || selectedItem?.matchedField == "receiverData") {
      const res = await FetchData(`userconnect/add`, 'POST', JSON.stringify(data), true, false);
      setNode(res.data.nodeId);
      socket.emit('sendMessage', res.data.nodeId); 
    }else{
      const res = await FetchData(`chatlist/add`, 'POST', JSON.stringify(data), true, false);
      setNode(res.data.nodeId);
      socket.emit('sendMessage', res.data.nodeId); 
    }
  }
  const ListChat = async () => {
    const res = await FetchData(`chatlist/${user._id}`, 'GET', null, true, false)
    if (res.status) {
      var list = res.data;
      if(list.length == 0 && user.first_login == 0){

      }else{
        setSelectedItem(res.data[0]);
      }
      setChatUser(res.data)
    }
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



  const sendMessage = async () => {
    if (messageText.trim() !== '') {
      const DataObject ={
        _id: Date.parse(new Date()),
        chatID: user?._id + selectedItem?.users._id, //user id+ business user id
        text: messageText,
        image: '',
        video: '',
        audio: '',
        type: 0,
        createdAt: new Date().toString(),
        date: new Date().toLocaleString().split(',')[0],
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        user: {
          _id: user._id,
          name: user.first_name,
          profile: user?.randomprofile
        },
        senderId: user._id,
        receiverId: selectedItem?.users._id
      }
      DataObject.nodeId =node
      const res = await FetchData(`add-message`, 'POST', JSON.stringify(DataObject), true, false)
      socket.emit('sendMessage', node); 
      setMessageText('');
    }
  };
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
        console.log('res.data', res.data)
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
        setClientNotification(res.data)
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
    }catch(err){
      console.log(err);
    }
  }

  const AddReview = (value) => {
    console.log(value);
    setSelectedItem(value)
    setSwipe(6)
  }

  const UserChat = () => {
    return (
      <div id="main-wrapper background4" className=" d-block">
        <div
          className="container-fluid rounded-2 d-flex justify-content-between py-2 pl-4 background shadow-sm"
          style={{ position: "sticky", top: "-1%" }}>
          <div className="d-flex column-gap-2 align-items-center" onClick={() => {
            if(ResponsiveView){
              setResponsiveView(!ResponsiveView)
            }else{
            setViewBP(true)
            }
            }}>
            <img
            src={`${selectedItem?.users?.profile ? `${BASE_URL + selectedItem?.users?.profile}` : `/images/profile/img0${selectedItem?.users?.randomprofile}.png`}`} 
            // src={`/images/profile/${UserImg[selectedItem?.users?.randomprofile]}`}
            onError={handleImageError}
              style={{ width: 33, height: 33, borderRadius:'50%' }} />
            <div className="d-flex flex-column">
              <span className="chatname">{selectedItem?.users?.first_name + " " + selectedItem?.users?.last_name}</span>
              <span className="chatactive">last seen 3 hours ago</span>
            </div>
          </div>
          <div className="d-flex justify-content-between align-items-center column-gap-3">
            <img
              src="/images/icons/call (3) 1.png"
              className="mt-1"
              style={{ width: 16, height: 16 }}
            />
            <img
              src="/images/icons/zoom.png"
              className="mb-0"
              style={{ width: 22, height: 22 }}
            />
            <span onClick={() => { setDropdown(!dropdown) }}>
              <i className="fa fa-info-circle" aria-hidden="true" />
            </span>
            {dropdown &&
              <ul className='position-absolute bg-white px-3 droppop fontcontent1' >
                <li className='fontcontent1' style={{
                  borderBottom: "1px solid rgb(245, 248, 251)",
                  cursor: "pointer",
                  padding: "5px 0px"
                }}>
                  Media
                </li>
                <li  className='fontcontent1' 
                  onClick={() => { setSwipe(1) }}
                  style={{
                    borderBottom: "1px solid rgb(245, 248, 251)", cursor: "pointer", padding: "5px 0px"
                  }}>
                  Status/Progress
                </li>
                  <li className='fontcontent1'  style={{ borderBottom: "none", cursor: "pointer", padding: "5px 0px" }} onClick={() => {
                    navigate('/invoice',{state:selectedItem})
                    }}>
                    Invoice
                  </li>
                <li className='fontcontent1'  style={{ borderBottom: "none", cursor: "pointer", padding: "5px 0px" }} onClick={() => { AddReview(selectedItem) }}>
                  Reviews and Ratings
                </li>
                <li className='fontcontent1'  style={{ borderBottom: "none", cursor: "pointer", padding: "5px 0px", color: "red" }} onClick={() => { setSwipe(7) }}>
                  Report
                </li>
              </ul>
            }
          </div>
        </div>
        <div ref={chatContainerRef} className="chat-container container-fluid background1 mt-1 py-3">
          <div class="chat-messages">
            <p className="chattime text-center">Today 12:27 PM</p>
            {Array.isArray(messages) && messages.map(message => (
              <span className={'px-3 pt-2 my-2 pb-1 ' + (message.senderId === user._id ? 'user-message' : 'bot-message')} >
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
              value={messageText} onChange={e => setMessageText(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  sendMessage();
                }
              }}
              defaultValue="Hi Great, thanks"
            />
            <img src="/images/icons/laugh.png" style={{ width: 20, height: 20 }} />
            <img
              src="/images/icons/microphone-black-shape 1.png"
              style={{ width: 20, height: 20 }}
            />
            <button className="sendbutton d-flex align-items-center justify-content-center" onClick={sendMessage}>
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

                    <p className='fontcontent1'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum posuere lobortis porta. Nullam maximus justo at nisl interdum eleifend.</p>
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
                // <div key={value.invoiceNo} className='card d-flex p-3 align-items-center justify-content-between mb-2' style={{ width: '100%', height: 'auto', background: '#ffffff', border: '2px solid #D8D8D8' }}>
                //     <div className='d-flex justify-content-between w-100 m-1'>
                //         <span className='fontsubtitle font-weight-bold'>Invoice Number</span><span className='fontsubtitle font-weight-bold'>{value.invoiceNo}</span>
                //     </div>
                //     <div className='d-flex justify-content-between w-100 m-1'>
                //         <span className='fontcontent1 font-weight-normal'>Mode of payment</span><span className='fontcontent1 font-weight-normal'>{value.mop}</span>
                //     </div>
                //     <div className='d-flex justify-content-between w-100 m-1'>
                //         <span className='fontcontent1 font-weight-normal'>Currency</span><span className='fontcontent1 font-weight-normal'>{value.currency}</span>
                //     </div>
                //     <div className='d-flex justify-content-between w-100 m-1'>
                //         <span className='fontcontent1 font-weight-normal'>Transaction number</span><span className='fontcontent1 font-weight-normal'>{value.transactionNo}</span>
                //     </div>
                //     <div className='w-100'>
                //         <div className='d-flex justify-content-between my-2'>
                //             <span className='fontsubtitle font-weight-bold'>Total Amount</span> <span className='fontsubtitle font-weight-bold'>${value.amount}</span>
                //         </div>
                //     </div>
                //     <div className='w-100'>
                //         <div className='d-flex justify-content-between my-2'>
                //             <span className='fontcontent1 font-weight-normal'>Remarks</span> <span className='fontcontent1 font-weight-normal'>{value.remark}</span>
                //         </div>
                //     </div>
                //     <div className='mt-4 w-100'>
                //         <button className='btn text-white border-0 rounded fontsubtitle font-weight-bold w-25' style={{ background: value.status === 1 ? '#4535C1' : 'rgb(117 125 108)' }} onClick={() => { handlePayment(value) }}>{value.status === 2 ? "Paid" : "Pay"}</button>
                //     </div>
                // </div>
              ))
            ) : (
              <div className='card mx-3 border-0 d-flex p-3 align-items-center justify-content-center' style={{ width: '100%', height: 'auto', background: '#F8F8F8' }}>
                <img src="images/busi_images/noData1.png" width="300px" className='mt-4' alt="No Data" />
                <p className="mt-4 h5 font-weight-bold fontsubtitle" style={{ color: "#2D2B70" }}>No Invoice Found!</p>
              </div>

              //             <div>
              //                <div className='container-fluid w-100'>
              //                <h3 className='w-100 d-flex justify-content-end fonttitle' style={{color:"#8ac43f"}}>INVOICE</h3>
              //                <div className='float-right w-100' style={{textAlign:"end"}}>
              //                   <p className='mb-0 fontcontent1'>INV-VUHADCY</p>
              //                   <p className='mb-0 fontcontent1'>CONSQ-BIRLBLTECUHK</p>
              //                   <p className='fontcontent1'>Date:24/12/2024</p>

              //                </div>

              //                 <p className='fontcontent1'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum posuere lobortis porta. Nullam maximus justo at nisl interdum eleifend.</p>
              //                 <table class="table">
              //       <thead>
              //     <tr>
              //       <th scope="col">S.No</th>
              //       <th scope="col">Product</th>
              //       <th scope="col">Quantity</th>
              //       <th scope="col">Amount</th>
              //     </tr>
              //   </thead>
              //   <tbody>
              //     {
              //       demodata.map((item,index)=>(


              // <tr key={index}>
              //         <th scope="row">{item.number}</th>
              //         <td>{item.product}</td>
              //         <td>{item.quantity}</td>
              //         <td>{item.amount}</td>
              //       </tr>
              //       ))}
              //   </tbody>
              // </table>
              //             </div>
              //             </div>

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
    <div className="feed_container" style={{ display: "grid",maxHeight:'100vh'}}>
                <section id="ads"></section>
                <aside id="left-aside" className="">
                <div className={`w-100 mx-1 ${!ResponsiveView ? 'd-block':'d-none d-md-block d-lg-block'}`}>
                  <div className="card p-4 bg-white shadow-sm row-gap-2 align-items-center" >
                  <img src={`${user?.profile ? `${BASE_URL + user?.profile}` : `/images/profile/img0${user?.randomprofile}.png`}`}
                  onError={handleImageError}
                  style={{borderRadius:'50%',width:'100px',height:'100px'}}
                  />
                  <span className='text-dark1 fontsubtitle font-weight-bold mt-3'>{user?.first_name}&nbsp;{user?.last_name}</span>
                  </div>
                </div>
                <div className={`background1 mt-2 chat-list mx-1 px-1 w-100 w-sm-100 py-3 ${!ResponsiveView ? 'd-block':'d-none d-md-block d-lg-block'}`} style={{height:'auto',maxHeight:'53vh'}}>
          <UserList
            setSwipe={setSwipe}
            ChatUser={ChatUser}
            setNotifyActive={setNotifyActive}
            setSelectedItem={setSelectedItem}
            UserImg={UserImg}
            user={user}
            setResponsiveView = {setResponsiveView}
          />
          </div>
          </aside>
          <div id="main-wrapper1font change" className='mt-5 mt-lg-0 '>
                    <main id="main-section" className='mt-2 mt-lg-0 mx-lg-3'>
                    <div className="d-flex justify-content-center mx-auto  px-sm-2 my-0 " >
        {/* <div className={`background1 chat-list mx-1 px-1 w-25 w-sm-100 py-3 ${!ResponsiveView ? 'd-block':'d-none d-md-block d-lg-block'}`}>
          <UserList
            setSwipe={setSwipe}
            ChatUser={ChatUser}
            setNotifyActive={setNotifyActive}
            setSelectedItem={setSelectedItem}
            UserImg={UserImg}
            user={user}
            setResponsiveView = {setResponsiveView}
          />
        </div> */}
        <div className={`background1 rounded-2 chat-list m-0 px-0  py-0 ${Swipe == 0 ? !ResponsiveView ? 'd-none d-md-block d-lg-block': 'd-block' : 'd-none slide-out'}`}>
          <ChatView
            setSwipe={setSwipe}
            timeElapsed={timeElapsed}
            user={user}
            apiResponseReceived={apiResponseReceived}
            ClientNotification={ClientNotification}
            UserImg={UserImg}
            setSelectedItem={setSelectedItem}
            setResponsiveView = {setResponsiveView}
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
        <div className={`background1 rounded-2 chat-list m-0 px-0 py-0 ${Swipe == 2 ? !ResponsiveView ? 'd-none d-md-block d-lg-block': 'd-block'  : 'd-none slide-out'}`}>
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
        <div className={`background1 rounded-2 chat-list m-0 px-0 py-0 ${Swipe == 3 ? 'd-block' : 'd-none slide-out'}`}>
          <Wfbp selectedItem={selectedItem} UserImg={UserImg} setViewBP={setViewBP} />
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
      {/* 
      <div className="d-flex justify-content-center mx-auto px-lg-4 px-2 my-0 my-lg-3 py-4" >
        <div className={`background1 chat-list mx-1 px-1 w-25 w-sm-100 py-3 ${!ResponsiveView ? 'd-block':'d-none d-md-block d-lg-block'}`}>
          <UserList
            setSwipe={setSwipe}
            ChatUser={ChatUser}
            setNotifyActive={setNotifyActive}
            setSelectedItem={setSelectedItem}
            UserImg={UserImg}
            user={user}
            setResponsiveView = {setResponsiveView}
          />
        </div>
        <div className={`background1 chat-list m-0 px-0  py-0 ${Swipe == 0 ? !ResponsiveView ? 'd-none d-md-block d-lg-block': 'd-block' : 'd-none slide-out'}`}>
          <ChatView
            setSwipe={setSwipe}
            timeElapsed={timeElapsed}
            user={user}
            apiResponseReceived={apiResponseReceived}
            ClientNotification={ClientNotification}
            UserImg={UserImg}
            setSelectedItem={setSelectedItem}
            setResponsiveView = {setResponsiveView}
          />
        </div>
        <div className={`background1 chat-list m-0 px-0  ${Swipe === 12 ? 'slide-in' : 'd-none'}`}>
          <RatingVeiw
            setSwipe={setSwipe}
            selectedItem={selectedItem}
            SouqStatus={SouqStatus}
            ClassActive={ClassActive}
            UserImg={UserImg}
            setNotifyActive={setNotifyActive}
          />
        </div>
        <div className={`background1 chat-list m-0 px-0  ${Swipe === 1 ? 'slide-in' : 'd-none'}`}>
          <RatingViewOne
            setSwipe={setSwipe}
            selectedItem={selectedItem}
            SouqStatus={SouqStatus}
            ClassActive={ClassActive}
            UserImg={UserImg}
            setNotifyActive={setNotifyActive}
          />
        </div>
        <div className={`background1 chat-list m-0 px-0 py-0 ${Swipe == 2 ? !ResponsiveView ? 'd-none d-md-block d-lg-block': 'd-block'  : 'd-none slide-out'}`}>
          {UserChat()}
        </div>
        <div className={`background1 chat-list m-0 px-0 py-0 ${Swipe == 4 ? 'd-block' : 'd-none slide-out'}`}>
          {invoice()}
        </div>
        <div className={`background1 chat-list m-0 px-0 py-0 ${Swipe == 8 ? 'd-block' : 'd-none slide-out'}`}>
          <Paymentsuccess selectedItem={selectedItem} 
          paymentDetails={paymentDetails} 
          listtransaction={listtransaction}
          UserImg={UserImg}
          setSwipe={setSwipe}
          />
        </div>
        <div className={`background1 chat-list m-0 px-0 py-0 ${Swipe == 7 ? 'd-block' : 'd-none slide-out'}`}>
          <ReportBP setSwipe={setSwipe}
            selectedItem={selectedItem} UserImg={UserImg} />
        </div>
        <div className={`background1 chat-list m-0 px-0 py-0 ${Swipe == 3 ? 'd-block' : 'd-none slide-out'}`}>
          <Wfbp selectedItem={selectedItem} UserImg={UserImg} setViewBP={setViewBP} />
        </div>
        <div className={`background1 chat-list m-0 px-0 py-0 ${Swipe == 6 ? 'd-block' : 'd-none slide-out'}`}>
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
      </div> */}
      <BottomNavbar />            
    </div>
  );
}
export default Chatscreen
