import React, { useState, useEffect, startTransition } from "react";
import "./agreement.css";
import Header from "../layout/Header";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import "../subscription/style/style.css";
import "../chatPage/style/chatscreen.css";
import FetchData from '../../fetch-api/Apifetch';
import { useRef } from "react";
// import Model from "./adfs";
import SignatureCanvas from 'react-signature-canvas'
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Swal from "sweetalert2";
function Agreement() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  // const [agreementSigned, setAgreementSigned] = useState(false);
  const location = useLocation();
  const { id } = useParams();
  const [stage, setStage] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    // fetch();
    getReceiverDetails();
    setModalIsOpen(false);
  }, []);
  const [userData, setUser] = useState(JSON.parse(localStorage.getItem("LOGINDATA"))?.user);
  const Businessinfo = JSON.parse(localStorage.getItem("LOGINDATA"))?.BusinessInfoData;
  const [node, setNode] = useState('');
  const [receiverData, SetReceiverData] = useState();
  const [showContent, setshowContent] = useState(false)
  const [signbutton, setsignbutton] = useState(false);

  // const fetch = async (id = node) => {
  //   const data = await getAllMessages(id)
  //   setMessages(data)
  // }
  const getReceiverDetails = async () => {
    const res = await FetchData(`/detail/user/${id}`, 'GET', null, true, false);
    SetReceiverData(res.data);
    console.log(res.data);
    setaggreementdata({ ...aggrementdata, ...{ Buyer_Business_Partner_name: res.data?.user?.first_name + " " + res.data?.user?.last_name, } })
  }
  // const chatData = async () => {
  //   const data = {
  //     sender: userData?._id,
  //     receive: id,
  //     request_type:1
  //   }
  //   const res = await FetchData(`chatlist/add`, 'POST', JSON.stringify(data), true, false);
  //   setNode(res.data.nodeId);
  //   fetch(res.data.nodeId)
  // }
  const [formData, setFormdate] = useState(
    {
      name: userData?.first_name + " " + userData?.last_name,
      bp_id: id,
      buyer_seller: userData?.user_type,
      user_id: userData?._id,
      sector: Businessinfo?.company_name,
      commision: "Percentage",
      valid_to: new Date().toISOString().slice(0, 10),
      valid_from: new Date().toISOString().slice(0, 10),
      user_signature: "",
      price: "30",
      quantity: ""
    })
  const signatureRef = useRef();
  const clearSignature = () => {
    signatureRef.current.clear();
  };
  const SignAgreement = async () => {

    setsignbutton(true)
    const canvas = document.querySelector('.sigCanvas');
    const signatureURL = canvas.toDataURL('image/png');
    const signatureBlob = await fetch(signatureURL).then(response => response.blob());

    const validateAgreementData = (data) => {

      const requiredFields = [
        "Company_name",
        "Product_details",
        "Product_quantity",
        "Buying_price",
        "Date_of_delivery",
        "Buyer_Business_Partner_name",
        "Business_Partner_commission",
        "Date_of_transaction",
        "document_submitted",
        "Deal_Approved",
        "title",
        "desc"
      ];

      for (const field of requiredFields) {
        if (!data[field]) {
          console.log(field);
          setShowErrors(true);
          return false;
        }
      }

      setShowErrors(false);
      return true;
    };

    if (!formData) {
      alert('Please agree to the terms before signing the agreement.');
      return;
    }

    if (!validateAgreementData(aggrementdata)) {

      setsignbutton(false);

      return;
    }
    const data = { ...aggrementdata, ["content"]: fetchdata };
    const formdata = new FormData();
    formdata.append("data", JSON.stringify(data));
    formdata.append("user_signature", signatureBlob, "signature.png");

    try {
      const res = await FetchData('agreement', 'POST', formdata, true, true);
      // chatData()
      Swal.fire({
        title: 'Request Send',
        html: `<span style="font-size: 16px; font-weight: bold;">Your Aggrement sent to Business Partner.</span>`,
        icon: 'success',
        customClass: {
          title: 'swal2-title',
        },
        timer: 2500, // Close the modal after 2 seconds
        timerProgressBar: true, // Show a progress bar for the timer
        showConfirmButton: false, // Hide the confirm button
        showCancelButton: false // Hide the cancel button
      });
      startTransition(() => {
        navigate('/chats')
      })
      setsignbutton(false);
    } catch (error) {
      console.log("Error in fetching data: " + error.message);
    }
  };

  const [showErrors, setShowErrors] = useState(false);


  const CommonInputField = (name, value, onChange, placeholder, required, showError) => {
    const inputWidth = (value?.length * 4) + 150;
    var inputType = "text"
    if (['phone', 'amount', 'no_of_days', 'percentage_amount', 'no_of_days2', 'no_of_days3',
    ].includes(name)) {
      inputType = "number"
    }
    const maxLength = name === "desc" ? 50 : undefined; // Apply maxLength only if name is "desc"
    return (
      <>
        <input
          name={name}
          type={inputType}
          value={value}
          onChange={onChange}
          maxLength={maxLength} // Restrict the input to 50 characters if name is "desc"
          style={{ width: inputWidth, borderColor: required && !value && showError ? 'red' : '' }}
          placeholder={placeholder}
          className="aggrementinput pl-2 font-weight-bold"
        />
        {required && !value && showError && (
          <label className="input-label" style={{ color: 'red', position: 'absolute', left: 0, top: -20 }}>
            {`Please fill in the required field: ${placeholder}`}
          </label>
        )}
      </>
    );
  };

  const [editorContent, setEditorContent] = useState('');
  const [fetchdata, setFetchdata] = useState([]);
  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    setEditorContent(data);
  };
  const handleAddButtonClick = () => {
    if (editorContent == '') {
      console.log("return");
      return
    }
    console.log("not return");
    setFetchdata([...fetchdata, editorContent])
    setEditorContent('');
    console.log("Editor Content:", editorContent);
  };
  const handleDeleteButtonClick = (index) => {
    const newData = fetchdata.filter((item, i) => i !== index);
    setFetchdata(newData);
  };
  const [aggrementdata, setaggreementdata] = useState({
    name: userData?.first_name + " " + userData?.last_name,
    bp_id: id,
    buyer_seller: userData?.user_type,
    user_id: userData?._id,
    sector: Businessinfo?.company_name || "nil",
    city: userData?.city || '',
    country: userData?.country || '',
    phone: userData?.phone || '123456',
    valid_to: new Date().toISOString().slice(0, 10),
    valid_from: new Date().toISOString().slice(0, 10),
    Buyer_Seller_name: userData?.first_name + " " + userData?.last_name,
    Company_name: "",
    Product_details: "",
    Product_quantity: "",
    Buying_price: "",
    Date_of_delivery: "",
    Buyer_Business_Partner_name: receiverData?.user?.first_name + " " + receiverData?.user?.last_name,
    Business_Partner_commission: "",
    Date_of_transaction: "",
    document_submitted: "",
    Deal_Approved: "",
    title: "",
    desc: "",
    user_signature: "",

  })
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setaggreementdata({
      ...aggrementdata,
      [name]: value,
    });
  };


  return (
    <div>
      <header id="sub-main-header">
        <Header />
      </header>
      <div>
        <div className="container-fluid mt-2" style={{ background: 'white', height: 'auto' }}>
          <div className="container  py-4">
            <div className="pt-2 pb-3 text-center fonttitle font-weight-bold" style={{ color: "#2D2B70", fontWeight: "600" }}>Tri-Party E-Agreement with Escrow</div>
            <>
              <p className="fontcontent1 float-right">
                <strong>Agreement Date:</strong> {formData?.valid_from}
              </p>
              <div className="section">
                <div className="title font-weight-bold mb-2">E-AGREEMENT FOR PURCHASE OF PRODUCTS</div>
                <p className="fontcontent1">
                  This E-Agreement ("Agreement") is made and entered into on
                  {CommonInputField("Date_of_transaction", aggrementdata.Date_of_transaction, handleInputChange, "Date", true, showErrors)}
                  by and between:
                </p>
                <div className="title font-weight-bold mb-2">Project Details</div>
                <p className="fontcontent1">
                  Give Your Project a name
                  {CommonInputField("title", aggrementdata.title, handleInputChange, "Project name", true, showErrors)}
                  &nbsp;and Describe the use of this shortly&nbsp;
                  {CommonInputField("desc", aggrementdata.desc, handleInputChange, "Description", true, showErrors)}

                </p>
                <p className="fontcontent1">
                  {CommonInputField("Buyer_Seller_name", aggrementdata.Buyer_Seller_name, handleInputChange, "Name", true, showErrors)}
                  &nbsp;representing&nbsp;
                  {CommonInputField("Company_name", aggrementdata.Company_name, handleInputChange, "Company name", true, showErrors)}
                  &nbsp;And

                </p>
                <p className="fontcontent1">
                  {CommonInputField("Buyer_Business_Partner_name", aggrementdata.Buyer_Business_Partner_name, handleInputChange, "Business Partner Name", true, showErrors)}
                  ("Business Partner")
                </p>
                <p className="fontcontent1">
                  For the purchase of&nbsp;
                  {CommonInputField("Product_details", aggrementdata.Product_details, handleInputChange, "product Detail", true, showErrors)}
                  &nbsp;("Products") in the quantity of &nbsp;
                  {CommonInputField("Product_quantity", aggrementdata.Product_quantity, handleInputChange, "Product Quantity", true, showErrors)}
                  &nbsp; at a total buying price of &nbsp;
                  {CommonInputField("Buying_price", aggrementdata.Buying_price, handleInputChange, "Buying Price", true, showErrors)}
                </p>
              </div>
              <div className="section">
                <div className="title font-weight-bold">DELIVERY TERMS</div>
                {formData.buyer_seller == 0 ?
                  <p className="fontcontent1">
                    The Products shall be delivered to the Buyer on or before .
                    {CommonInputField("Date_of_delivery", aggrementdata.Date_of_delivery, handleInputChange, "Delivery date", true, showErrors)} from the Seller.
                  </p> :
                  <p className="fontcontent1">
                    The Products shall be delivered to the Buyer on or before .
                    {CommonInputField("Date_of_delivery", aggrementdata.Date_of_delivery, handleInputChange, "Delivery date", true, showErrors)}
                    to the Buyer.</p>
                }
              </div>
              <div className="section">
                <div className="title font-weight-bold">COMMISSION TERMS</div>
                <p className="fontcontent1">
                  The Business Partner shall be entitled to a commission of &nbsp;
                  {CommonInputField("Business_Partner_commission", aggrementdata.Business_Partner_commission, handleInputChange, "Commission percent", true, showErrors)}
                  &nbsp; on the total buying price.
                </p>
                <div className="title font-weight-bold">PAYMENT TERMS</div>
                <p className="fontcontent1">The Buyer shall make payment for the Products through the Connect Souq payment gateway on the Effective Date.
                </p>
                <div className="title font-weight-bold">DOCUMENTATION</div>
                <p className="fontcontent1">
                  The Buyer shall submit the following official documents to the Business Partner:
                  {CommonInputField("document_submitted", aggrementdata.document_submitted, handleInputChange, "Documents", true, showErrors)}
                </p>
                <div className="title font-weight-bold">APPROVAL</div>
                <p className="fontcontent1">
                  This Agreement is subject to approval by the parties and shall be deemed approved upon execution by both parties.
                </p>
                <p>By signing below, the parties acknowledge that they have read, understand, and agree to be bound by the terms and conditions of this Agreement.</p>
                <div className="title font-weight-bold">DEAL APPROVED</div>
                <p className="fontcontent1">
                  Yes / No :{CommonInputField("Deal_Approved", aggrementdata.Deal_Approved, handleInputChange, "Yes / No", true, showErrors)}
                </p>
                {/*  */}
                <div style={{ textAlign: 'justify', color: '#7D7D7D' }} className=''>
                  {fetchdata.map((item, index) => (
                    <div className="d-flex justify-content-between align-items-start">
                      <div className="fontcontent1 text-dark" style={{ width: '98%' }} key={index} dangerouslySetInnerHTML={{ __html: item }}>
                      </div>
                      <div onClick={() => { handleDeleteButtonClick(index) }} style={{ cursor: "pointer" }}><i className="fa fa-times text-dark" /></div>
                    </div>
                  ))}
                </div>
                <button className="btn"
                  onClick={() => setshowContent(!showContent)}
                >
                  Content {" "}
                  {!showContent ? <i className="fa fa-plus" /> : <i className="fa fa-minus" />}
                </button>
                <div className={`${!showContent ? "d-none" : "d-block"}`}>


                  <CKEditor
                    data={editorContent}
                    editor={ClassicEditor}
                    onChange={handleEditorChange}
                  />
                  <div className="mt-2 float-right mb-2">
                    <button className="btn btn-primary fontsubtitle font-weight-bold" onClick={handleAddButtonClick}>Add</button>
                  </div>
                </div>
              </div>
              <div className="signature-section mt-5">
                <div className="title font-weight-bold">Signatures</div>
                <div>
                  <p className="fontcontent1">Name: {aggrementdata.Buyer_Seller_name}</p>
                  <p className="fontcontent1">Signature:</p>
                  <SignatureCanvas
                    backgroundColor="white" penColor='black'
                    ref={signatureRef} canvasProps={{ width: 300, height: 180, className: 'sigCanvas pt-2 rounded border border-dark ' }} />
                  <i className="fa fa-times ml-3" style={{ color: "red", cursor: "pointer" }} onClick={clearSignature} />
                  <p className="fontcontent1">Date: {aggrementdata.valid_from}</p>
                </div>
              </div>
            </>
            <div className="d-flex justify-content-center column-gap-2 mt-5">
              <button disabled={signbutton} onClick={() => { SignAgreement() }} className="px-2 py-2 fontsubtitle font-weight-bold border-0 rounded text-light addButton">{signbutton ? 'Loading ' : 'Sign E-Aggrement'}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Agreement;
