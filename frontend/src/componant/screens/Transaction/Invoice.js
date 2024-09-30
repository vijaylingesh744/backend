import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import FetchData from '../../fetch-api/Apifetch';
import Header from '../layout/SubHeader';
import './style/invoice.css'
import InvoiceModal from "../Function/InvoiceModal";
import { generateInvoiceNumber } from '../chatPage/Layout/Common';
import BottomNavbar from '../layout/BottomNavbar';
import Showinvoice from '../Function/Showinvoice';
import { Modal } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
const Invoice = () => {
  const location = useLocation()
  const { state } = location;
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('LOGINDATA'))?.user);
  const [Invoicedata, setInvoicedata] = useState();
  const [ModalView, setModalView] = useState(false);
  const [ModalView1, setModalView1] = useState(false);
  const [ShowData, setShowData] = useState()
  const [errors, setErrors] = useState({});
  const [ismodalOpen, setismodalOpen] = useState(false);
  const [TabInvoice, setTabInvoice] = useState([
    {
      product: "",
      quantity: "",
      amount: "",
    },
  ]);
  const [ShareInvoiceData, setShareInvoiceData] = useState({
    receiverCharges: '',
    amount: '',
    bp_charges: '',
    csFee: '0',
    tax: '0',
    currency: '',
    invoiceNo: '',
    transactionNo: '',
    client_id: state?.receive,
    senderId: user?._id,
    receiverId: state?.receive,
    projectId: state?.project_data?._id
  })
  const hidemodal = () => {
    setismodalOpen(false)
  }
  const [formData, setformData] = useState({
    card_no: '',
    expiry: '',
    cvv: '',
  });
  const handleInputChangepersonal = (e) => {
    const { name, value } = e.target;
    let error = '';
    setErrors({ ...errors, [name]: error });
    setformData({ ...formData, [name]: value });
  }
  const InputField = (label, name, type, value, onChange, placeholder, caplatize, col) => (
    <div className={`outlined-input ${name == 'card_number' ? 'px-0' : ''} col-lg-${col} col-12 mb-2 mt-3 inputs-form`}>
      <label htmlFor={`exampleInput${name}`} className=" mr-3 fontcontent1 titleproof" style={{ fontWeight: "500", color: 'grey' }}>
        {label}
      </label>
      <input
        type="text"
        className="fontcontent1 w-100"
        name={name}
        value={value}
        style={{ color: 'black', height: '2.5rem' }}
        onChange={(e) => {
          let inputValue = e.target.value.replace(/\D/g, ''); // Remove non-digit characters
          if (inputValue.length > 16) {
            inputValue = inputValue.slice(0, 16); // Ensure it does not exceed 16 digits
          }
          // Format the input value to have spaces between every 4 digits
          inputValue = inputValue.replace(/(.{4})/g, '$1 ').trim();
          onChange({ target: { name: e.target.name, value: inputValue } });
        }}
        placeholder=" "
      />
    </div>
  );
  const SelectOption = (title, col = 4, name, type, value, onChange) => {
    var options = []
    var con = true
    let defaultValue = "";
    // if (name == "user_type") {
    //     options = [
    //         "Buyer",
    //         "Seller",
    //         "Business Partner",
    //     ]
    //     if (value === "0") {
    //     defaultValue = "Buyer";
    // } else if (value === "1") {
    //     defaultValue = "Business Partner";
    // } else if (value === "2") {
    //     defaultValue = "Seller";
    // }
    // } else
    if (name == "month") {
      console.log(value);
      options = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
      ]
    }
    else if (name == "year") {
      options = [
        "2024",
        "2025",
        "2026",
        "2027",
        "2028",
        "2029",
        "2030",
        "2031",
      ]
    }
    else {
      con = false
    }
    return (
      <div className={`col-lg-${col} col-${col} mb-2 mt-3 outlined-input inputs-form`}>
        <label htmlFor={`exampleInput${title}`} className="form-label mr-3 fontcontent1" style={{ fontWeight: "500", color: 'grey' }}>
          {title}
        </label>
        <select
          name={name}
          value={con ? (defaultValue || value) : value}
          className='form-control rounded fontcontent1'
          onChange={onChange}
          style={{ color: 'black', border: '1px solid #767676' }}>
          <option value={""}>&nbsp;</option>
          {options.map(item => (
            con ? <option value={item}>{item}</option> : <option value={item.userdata._id}>
              {item.userdata.first_name} {item.userdata.last_name}
            </option>
          ))}
        </select>
      </div>
    )
  }
  useEffect(() => {
    console.log(state)
    listtransaction(state?.project_data?._id)
  }, []);
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
  const updateShareInvoiceData = (updatedData) => {
    setShareInvoiceData((prevData) => ({
      ...prevData,
      ...updatedData,
    }));
  };
  useEffect(() => {
    setShareInvoiceData((previnvoiceData) => ({
      ...previnvoiceData,
      invoiceNo: "INV-" + generateInvoiceNumber(7),
      transactionNo: "CONSQ-" + generateInvoiceNumber(12)
    }));
  }, []);
  const RiseInvoice = async (data) => {
    setModalView(true)
    setShareInvoiceData((previnvoiceData) => ({
      ...previnvoiceData,
      csFee: "",
      tax: ""
    }));
    setTabInvoice([
      {
        product: "",
        quantity: "",
        amount: "",
      }])
  }
  const HandleShareInvoice = async () => {
    setModalView(false)
    var updatedInvoiceData = {
      ...ShareInvoiceData,
      receiverCharges: TabInvoice
    };
    if (state.matchedField == "receiverData") {
      updatedInvoiceData.client_id = state.sender
      updatedInvoiceData.receiverId = state.sender
    } else {
      updatedInvoiceData.client_id = state.receive
      updatedInvoiceData.receiverId = state.receive
    }
    try {
      const res = await FetchData(`invoice_trans/add`, "POST", JSON.stringify(updatedInvoiceData), false, false)
      console.log(res);
      listtransaction()
      setShareInvoiceData({
        receiverCharges: '',
        amount: '',
        bp_charges: '',
        csFee: '0',
        tax: '0',
        currency: '',
        invoiceNo: '',
        transactionNo: '',
        senderId: user?._id,
      })
      setTabInvoice([
        {
          product: "",
          quantity: "",
          amount: "",
        }])
      setShareInvoiceData((previnvoiceData) => ({
        ...previnvoiceData,
        invoiceNo: "INV-" + generateInvoiceNumber(7),
        transactionNo: "CONSQ-" + generateInvoiceNumber(12)
      }));
    } catch (err) {
      console.log(err);
    }
  }
  const listtransaction = async (project_id = state?.project_data?._id) => {
    try {
      var res = {}
      if (state?.users?.user_type === "1") {
        var whoiam = user?._id == state?.receive ? state?.sender : state?.receive
        res = await FetchData(`listtransaction/${user?._id}/${whoiam}/2/0`, 'GET', null, true, false)
      } else {
        res = await FetchData(`listtransaction/${user?._id}/${state?.matchedField == "senderData" ? state?.receive : state?.sender}/2/${project_id}`, 'GET', null, true, false)
      }
      if (res.status) {
        console.log('res.data', res.data)
        setInvoicedata(res.data)
      }
    } catch (error) {
      console.log(error)
    }
  }
  const [Active, setActive] = useState(1)
  const GetUpdate = (Item) => {
    setModalView(true)
    console.log("Item", Item)
    setShareInvoiceData((previnvoiceData) => ({
      ...previnvoiceData,
      csFee: Item.csFee,
      tax: Item.tax
    }));
    setTabInvoice(Item.receiverCharges)
  }
  const PayInvoice = async (value) => {
    // setModalView1(true)
    setismodalOpen(true)
    console.log(value)
    setformData({
      ...formData,
      sender_id: value?.client_id,
      transaction_id: value?._id,
      user_id: value?.senderId
    })
    setShowData(value)
  }
  const ViewInvoice = async (value) => {
    setModalView1(true)
    // setismodalOpen(true)
    console.log(value)
    setformData({
      ...formData,
      sender_id: value?.client_id,
      transaction_id: value?._id,
      user_id: value?.senderId
    })
    setShowData(value)
  }
  const settlePayment = async () => {
    console.log(formData);
    try {
      const res = await FetchData('addpayment', 'POST', JSON.stringify(formData), false, false)
      console.log(res);
      if (res.status) {
        Swal.fire({
          title: 'Payment Success',
          html: `<span style="font-size: 16px; font-weight: bold;">Your Invoice payment is complete.</span>`,
          icon: 'success',
          customClass: {
            title: 'swal2-title',
          },
          iconHtml: `<img src="http://connect-souq.qcodesinfotech.com/images/icons/laugh.png" style="width: 60px; height: 60px; border:none; border-radius: 50%;" />`,
          timer: 2000, // Close the modal after 2 seconds
          timerProgressBar: true, // Show a progress bar for the timer
          showConfirmButton: false, // Hide the confirm button
          showCancelButton: false // Hide the cancel button
        });
      }
    } catch (err) {
      toast.error(err.message);
    }
  }
  return (
    <div>
      <Modal show={ismodalOpen} onHide={hidemodal} className="modelfilter modal-lg mx-auto" size="lg1">
        <Modal.Body>
          <div className="container-fluid row">
            <div className="col-6">
              <div className="container-fluid py-4">
                <span className="fontsubtitle text-dark1 font-weight-bold mb-2" style={{ letterSpacing: '0.6px' }}>Checkout</span>
                <p className="fontcontent1 text-secondary1 mb-3">a checkout is a counter where you pay for things you are buying</p>
                <span className="font-weight-bold fontsubtitle text-dark1" style={{ letterSpacing: '0.6px' }}>Payment method</span>
                <div className="d-flex justify-content-around mt-3 column-gap-3">
                  <label className="border border-info px-3 py-2 w-50 d-flex align-items-center column-gap-2" htmlFor="flexRadioDefault1" style={{ cursor: 'pointer' }}>
                    <input className="form-check-input radioinput" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                    <img src="/images/icons/credit-card.png" width={25} height={25} alt="Credit card" />
                    <span className="form-check-label">
                      Credit card
                    </span>
                  </label>
                  <label className="border border-info px-3 py-2 w-50 d-flex align-items-center column-gap-2" htmlFor="flexRadioDefault2" style={{ cursor: 'pointer' }}>
                    <input className="form-check-input radioinput" type="radio" name="flexRadioDefault" id="flexRadioDefault2" />
                    <img src="/images/icons/paypal.png" width={25} height={25} alt="Credit card" />
                    <span className="form-check-label">
                      Paypal
                    </span>
                  </label>
                  {/* <div className="border border-info px-3 py-2 w-50">
                    <div class="form-check ">
                      <input class="form-check-input " type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                      <div className="d-flex column-gap-2 align-items-center"><img src="/images/icons/paypal.png" width={25} height={25} />
                        <label class="form-check-label" for="flexRadioDefault1">
                          Paypal
                        </label>
                      </div>
                    </div></div> */}
                </div>
                <div className="mt-5">
                  {InputField('Card Number', 'card_no', 'text', formData.card_no, handleInputChangepersonal, 'xxxx xxxx xxxx xxxx', false, 12)}
                  <div className="row container mx-0 px-0">
                    {SelectOption('Month', 4, 'month', 'text', formData.expiry, handleInputChangepersonal)}
                    {SelectOption('Year', 4, 'year', 'text', formData.year, handleInputChangepersonal)}
                    {InputField('CVV', 'cvv', 'text', formData.cvv, handleInputChangepersonal, 'xxx', false, 4)}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-6 pt-4">
              <span className="fontsubtitle text-dark1">Invoice Details</span>
              <div className="container-fluid py-2 mt-2 border card">
                <div className='invoice-grid px-2 py-3 border-bottom'>
                  <div className="product text-dark1">Product Name</div>
                  <div className="quantity text-dark1">Quantity</div>
                  <div className="price text-dark1">Price</div>
                </div>
                <div className='w-100' style={{ height: 200, overflowY: 'scroll', overflowX: 'hidden' }}>
                  {ShowData?.receiverCharges && ShowData?.receiverCharges.map(item => (
                    <div className='invoice-grid px-2 py-2 mt-2'>
                      <div className="product">{item.product}</div>
                      <div className="quantity">{item.quantity}</div>
                      <div className="price">{item.amount}</div>
                    </div>
                  ))}
                </div>
                <div className='invoice-grid px-2 mt-2'>
                  <div className="product">Connect souq tax</div>
                  <div className="quantity"> </div>
                  <div className="price">{ShowData?.csFee}</div>
                </div>
                <div className='invoice-grid px-2 mt-2'>
                  <div className="product">Tax</div>
                  <div className="quantity"> </div>
                  <div className="price">{ShowData?.tax}</div>
                </div>
                <div className='invoice-grid px-2 py-2 mt-2'>
                  <div className="product">Total Amount</div>
                  <div className="quantity"> </div>
                  <div className="price">{ShowData?.amount}.00</div>
                </div>
              </div>
            </div>
            <div className='d-flex w-100 justify-content-center align-items-center'>
              {ShowData?.receiverId == user?._id ?(
              <button className='btn btn-connect ' onClick={() => settlePayment()}>Pay Amount</button>
              ):(
                <button className='btn btn-connect ' onClick={() => setismodalOpen(false)}>Back</button>
              )}
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <header id="sub-main-header">
        <Header />
      </header>
      <div className='row mt-3 mx-0'>
        <div className='col-lg-8 offset-lg-2 col-12 px-1'>
          <div className='container-fluid rounded d-flex w-100 py-1 bg-white justify-content-between align-items-center' style={{ height: 50, boxShadow: '0px 2px 2px 1px lightgrey' }}>
            <span className='fontsubtitle font-weight-bold'>Invoices</span>
            <div className='d-flex column-gap-2 align-items-center'>
              <img src='/images/icons/settings.png' width={20} height={20} />
              <button className='btn btn-outline-success ' onClick={() => { RiseInvoice() }}>+ Add</button>
            </div>
          </div>
          <div className='container-fluid d-flex py-3 px-1'>
            <div className={`${Active == 0 && "active"} mx-1 py-2 `} style={{ cursor: "pointer" }} onClick={() => setActive(0)}>
              <span className='fontsubtitle font-weight-bold'>Paid</span>
            </div>
            <div className={`${Active == 1 && "active"} mx-1 py-2`} style={{ cursor: "pointer" }} onClick={() => setActive(1)}>
              <span className='fontsubtitle font-weight-bold'>Unpaid</span>
            </div>
          </div>
          <div className='card border-0 w-100 ' style={{ height: 'auto' }}>
            {Invoicedata && Invoicedata.map((item, index) => (
              <div key={index} className='d-flex border justify-content-around align-items-center py-3'>
                <p className='fontsubtitle font-weight-bold mb-1 text-center d-none d-md-block d-lg-block w-10' style={{ color: '#4535C1' }}>{index + 1}</p>
                <div className="w-25 text-center">
                  <p className='fontsubtitle font-weight-bold mb-1' style={{ color: '#4535C1' }}>{item?.invoiceNo}</p>
                  <p className='fontcontent2 text-secondary1 mb-0'>15/06/2024</p>
                </div>
                <div className="w-25 text-center">
                  <p className='fontsubtitle font-weight-bold mb-1' style={{ color: '#4535C1' }}>Total: {item?.amount}</p>
                  <p className='fontcontent2 text-secondary1 mb-0'>25/06/2024</p>
                </div>
                <div className="w-10 text-center">
                  <div style={{ background: '#CDFFE8', color: '#56E0A1' }} className="px-2 py-1 rounded fontcontent1">You</div>
                  {/* <div style={{background:'#FEE7EE', color:'#E7A3B8'}} className="px-2 py-1 rounded fontcontent1">BP</div> */}
                  {/* <div style={{background:'#FFFBA3', color:'#D3CB0A'}} className="px-2 py-1 rounded fontcontent1">BUYER</div> */}
                  {/* <div style={{background:'#CFC8FD', color:'#7B6CE0'}} className="px-2 py-1 rounded fonthint">SELLER</div> */}
                </div>
                <div className="d-flex flex-column flex-lg-row w-25 justify-content-center">
                  {item.senderId == user?._id &&
                    <button className='btn py-1 fontsubtitle font-weight-bold text-white mx-1' onClick={() => ViewInvoice(item)} style={{ background: '#4535C1' }}>
                      View
                    </button>
                  }
                  {item.receiverId == user?._id &&
                    <button className='btn py-1 fontsubtitle font-weight-bold text-white mx-1' onClick={() => {
                      if (item.status != 2) { PayInvoice(item) }
                      else {
                        toast.warning("Payment already completed")
                      }
                    }
                    } style={{ background: '#4535C1' }}>
                      {item.status === 2 ? "Paid" : "Pay"}
                    </button>
                  }
                  {item.senderId == user?._id &&
                    <button className='btn py-1 fontsubtitle font-weight-bold text-white mx-1' style={{ background: '#4535C1' }}
                      onClick={() => GetUpdate(item)}
                    >
                      Edit
                    </button>
                  }
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <BottomNavbar />
      <InvoiceModal
        ModalView={ModalView}
        setModalView={setModalView}
        invoiceData={ShareInvoiceData}
        TabInvoice={TabInvoice}
        setTabInvoice={setTabInvoice}
        HandleShareInvoice={HandleShareInvoice}
        updateShareInvoiceData={updateShareInvoiceData}
      />
      <Showinvoice
        data={ShowData}
        ModalView={ModalView1}
        setModalView={setModalView1}
        setpaymodal={setismodalOpen}
      />
      <BottomNavbar />
    </div>
  )
}
export default Invoice
