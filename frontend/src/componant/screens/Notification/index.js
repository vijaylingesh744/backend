import React, { useEffect, useState } from "react";
import Header from "../layout/SubHeader";
import Swal from "sweetalert2";
import FetchData from "../../fetch-api/Apifetch";
import "./style.css";
import { Modal } from "react-bootstrap";
import InvoiceModal from "../Function/InvoiceModal";
import { handleImageError, RedirectRoute } from "../../utils/Function";
import BottomNavbar from "../layout/BottomNavbar";
import { BPNotify, renderInvoiceCard } from "./Split/BPNotify";
import { BASE_URL } from "../../utils/ApiRoute";
import Leftside from '../../screens/FeedPage/PostData/LeftSide';

const Index = () => {
  const [NotifyList, setNotifyList] = useState([]);
  const [invoicenotify, setinvoicenotify] = useState([]);
  const [TransactionId, setTransactionId] = useState();
  const [filteredData, setFilteredData] = useState([]);
  const [ListNotification, setListNotification] = useState([]);
  const [TabInvoice, setTabInvoice] = useState([
    {
      id: Date.now(),
      product: "",
      quantity: "",
      amount: "",
    },
  ]);
  const [invoiceData, setInvoiceData] = useState({
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
    setInvoiceData((previnvoiceData) => ({
      ...previnvoiceData,
      invoiceNo: "INV-" + generateInvoiceNumber(7),
      transactionNo: "CONSQ-" + generateInvoiceNumber(12)
    }));
  }, []);

  function generateInvoiceNumber(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }
    return result;
  }
  const [selectoption, setSelectoption] = useState(0);
  const [ModalView, setModalView] = useState(false);
  const [formData, setFormData] = useState({
    user_id: "",
    bp_id: "",
    project_id: "",
  });
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("LOGINDATA"))?.user
  );


  const HandleShareInvoice = async () => {
    setModalView(false)
    const updatedInvoiceData = {
      ...invoiceData,
      receiverCharges: TabInvoice
    };
    try {
      const res = await FetchData(`updateinvoiceItem/${TransactionId}`, "POST", JSON.stringify(updatedInvoiceData), false, false)
      dataList();
    } catch (err) {
      console.log(err);
    }
  }

  const handleTransactionId = async (item) => {
    setModalView(true);
    setTransactionId(item?.transaction_id)
    setInvoiceData((previnvoiceData) => ({
      ...previnvoiceData,
      client_id: item?.client_id,
    }));
  }


  useEffect(() => {
    dataList();
    fetchNotifyList()
  }, []);
  const fetchNotifyList = async () => {
    try {
      const res = await FetchData(`notify_list/${user?._id}`, 'GET', null, true, false);
      if (res.success) {
        // console.log("res.data", res.data);
        // setListNotification(res.data);
      }
    } catch (error) {
      console.error("Error fetching user list:", error.message);
    }
  };

  const dataList = async () => {
    // const res = await FetchData("list/connection/" + user?._id, "GET", null, false, false);
    // const connection = res.data;
    // setNotifyList(connection);
    const res1 = await FetchData("othernotify/" + user?._id, "GET", null, false, false);
    const invoice = res1.invoice;
    setinvoicenotify(invoice)
    // const Listvalue = res.data;
    // setFilteredData(Listvalue.filter((item) => item.status === 0));
  };

  useEffect(() => {
    const total = TabInvoice.reduce((acc, item) => {
      const itemAmount = parseFloat(item.amount) || 0;
      return acc + itemAmount;
    }, 0);

    setInvoiceData(prevInvoiceData => ({
      ...prevInvoiceData,
      amount: total
    }));
  }, [TabInvoice]);

  const Aleartmessage = async (item, status) => {

    var objectdata = {
      ...formData,
      user_id: item?.user_id,
      bp_id: item?.bp_id,
      project_id: item?.project_id,
    }
    setFormData(objectdata);
    try {
      var URLsite = `update/connection/${status}`;
      const res = await FetchData(
        URLsite,
        "POST",
        JSON.stringify(objectdata),
        true,
        false
      );
      if (res) {
        setSelectoption(status);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Status updated Sucessfully",
          showConfirmButton: false,
          timer: 1500,
        });
        if (status == 1) {
          // window.location.href = "/chats";
        }
      } else {
        console.error("Error:", res.message);
      }
      dataList();
    } catch (error) {
      console.error("Error:", error.message);
    }
    //   }
    // });
  };

  const [activeTab, setActiveTab] = useState("All");
  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };



  const renderNoNotifications = () => (
    <div className="container-fluid w-100" style={{ height: '50vh' }}>
      <div className="d-flex justify-content-center flex-column h-100 align-items-center">
        <img src='images/feed_images/bell.png' style={{width:"350px"}} />
      </div>
    </div>
  );




  const tabs = ["All", "Project", "Client"];
  return (
    <div>
      <header id="main-header">
        <Header />
      </header>
      <div className="feed_doublecontainer" style={{ display: "grid" }}>
        <section id="ads"></section>
        {/* <div id="left-aside" className="d-none d-md-block d-lg-block"></div> */}
        <div id="main-wrapper " className='mb-2 pr-lg-3'>
          <main id="main-section" >
            <div className="container-fluid  px-0 ">
              <div
                className="py-3 px-4 bg-white bg-light rounded-top-3  d-flex justify-content-between"
                style={{ boxShadow: "#e9ecef 1px 2px 3px 0px" }}
              >
                <span
                  className=""
                  style={{ fontWeight: "600", fontSize: "16px" }}
                >
                  Notification list
                </span>
                <span className="bg-blue" style={{ color: "#4783F8" }}>
                  Mark all as read
                </span>
              </div>
              <ul className="nav px-1">
                {tabs.map((tab) => (
                  <li className="nav-item" key={tab}>
                    <a className={`nav-link text-connect1 py-3 ${activeTab === tab ? "active" : ""}`}
                      href="#"
                      onClick={() => handleTabClick(tab)}>
                      {tab}
                    </a>
                  </li>
                ))}
              </ul>
              <div
                className="card p-lg-3 p-0 mt-3 show active"
                id="home"
                role="tabpanel"
                aria-labelledby="home-tab">
                {(activeTab === "All" || activeTab === "Client") && (
                  <>
                    {invoicenotify.map(item => renderInvoiceCard(item, handleTransactionId))}
                  </>
                )}
                {((activeTab === "All" && NotifyList.length === 0 && invoicenotify.length === 0 && ListNotification.length === 0) ||
                  (activeTab === "Project" && NotifyList.length === 0) ||
                  (activeTab === "Client" && invoicenotify.length === 0 && ListNotification.length === 0)) && renderNoNotifications()}
              </div>
            </div>
          </main>
        </div>
        <div className="d-none d-md-block d-lg-block">
          <Leftside />
        </div>
      </div>
      <BottomNavbar />

      <InvoiceModal
        ModalView={ModalView}
        setModalView={setModalView}
        invoiceData={invoiceData}
        TabInvoice={TabInvoice}
        setTabInvoice={setTabInvoice}
        HandleShareInvoice={HandleShareInvoice}
        setinvoicedata={setInvoiceData}
      />

    </div>
  );
};

export default Index;
