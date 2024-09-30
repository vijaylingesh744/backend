import React, { useEffect, useRef, useState } from 'react'
import SignatureCanvas from 'react-signature-canvas'
import { BASE_URL } from '../../../utils/ApiRoute';
import { useLocation } from 'react-router-dom';
import FetchData from '../../../fetch-api/Apifetch';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
const Preview = () => {
  const [selectedItem, setSelectedItem] = useState({})
  const location = useLocation();
  const { state } = location;
  var formData = {}
  const [userData, setUserData] = useState(JSON.parse(localStorage.getItem("LOGINDATA")).user);
  const [aggrementdata, setaggreementdata] = useState({
    name: state?.user?.first_name + " " + state?.user?.last_name,
    bp_id: userData?._id,
    buyer_seller: state?.buyer_seller,
    user_id: state?.user_id,
    city: state?.user?.city || '',
    country: state?.user?.country || '',
    phone: state?.user?.phone || '', 
    valid_from: new Date().toISOString().slice(0, 10),
    valid_to: new Date().toISOString().slice(0, 10),
    user_signature: state?.user_signature,
    Buyer_Seller_name: userData?.first_name + " " + userData?.last_name,
    Company_name: state?.Company_name,
    Product_details: state?.Product_details,
    Product_quantity: state?.Product_quantity,
    Buying_price: state?.Buying_price,
    Date_of_delivery: state?.Date_of_delivery,
    Buyer_Business_Partner_name: state?.Buyer_Business_Partner_name,
    Business_Partner_commission: state?.Business_Partner_commission,
    Date_of_transaction: state?.Date_of_transaction,
    document_submitted: state?.document_submitted,
    Deal_Approved: state?.Deal_Approved,
    title:state?.title,
    desc:state?.desc
  })

  useEffect(() => {
    console.log(state);
    setSelectedItem(state)
  }, [])
  
  const signatureRef = useRef();

  const clearSignature = () => {
    signatureRef.current.clear();
  };

  const HandleUpdate = async (status) => {
    const canvas = document.querySelector('.sigCanvas');
    const signatureURL = canvas.toDataURL('image/png');
    const signatureBlob = await fetch(signatureURL).then(response => response.blob());

    try {
      const ItemData = {
        status: status,
        user_id: selectedItem?.user_id,
        bp_id: selectedItem?.bp_id,
      }
      Swal.fire({
        title: `Are you sure you want change status to ${status == 1 ? "Approve" : "Rejected"}`,
        showCancelButton: true,
        confirmButtonText: "Yes",
        denyButtonText: "Cancel",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const res = await FetchData(`notify_update`, 'POST', JSON.stringify(ItemData), true, false);
          if (res.success) {
            toast.success("status Update Successfully")
            window.location.href = "/bp/notification"
          }
        }
      })
    } catch (error) {
      console.error("Error fetching user list:", error.message);
    }
  }

  const CommonInputField = (name, value, onChange, placeholder) => {
    const inputWidth = (value?.length * 4) + 150;
    return (
      <input
        name={name}
        value={value}
        onChange={onChange}
        style={{
          width: inputWidth,
          borderBottom: "0.5px solid black",
          borderTop: "none",
          borderLeft: "none",
          borderRight: "none",
          fontWeight: 600,
          paddingLeft: "5px"
        }}
        placeholder={placeholder}

      />
    );
  };

  return (
    <>
    <div className="body-wrapper d-none">
      <div className="container-fluid">
        <div className="card bg-info-subtle shadow-none position-relative overflow-hidden mb-4">

        </div>
      </div>
      <div className='container-fluid m-4'>
        <h1 className="text-center my-3">Agreement Detail</h1>
        <div className="modal-body col-10 mx-auto">
          <>
            <p className="fontcontent1" style={{ float: "right" }}>
              <strong>Agreement Date:</strong> {aggrementdata?.valid_from}
            </p>
            <div className="section">
              <p className="fontcontent1">
                <strong>Buiness Partner</strong><br />
                {aggrementdata?.name}<br />
                {aggrementdata?.city},{aggrementdata?.country}<br />
                {aggrementdata?.phone},{aggrementdata?.gmail}
              </p>
            </div>
            <div className="section">
              <div className="title font-weight-bold">Recitals</div>
              {aggrementdata.buyer_seller == 0 ?
                <p className="fontcontent1">
                  Whereas, the Buyer desires to purchase
                  &nbsp;<strong>{aggrementdata?.product_service1}</strong>&nbsp;
                  from the Seller.
                </p> :
                <p className="fontcontent1">Whereas, the Seller agrees to sell
                  &nbsp;<strong>{aggrementdata?.product_service2}</strong>&nbsp;
                  to the Buyer.</p>}
              <p className="fontcontent1">
                Whereas, the Business Partner has facilitated the introduction and
                negotiation between the Buyer and Seller.
              </p>
            </div>
            <div className="section">
              <div className="title font-weight-bold">Terms and Conditions</div>
              <div className="title font-weight-bold">Products/Services</div>
              <p className="fontcontent1">
                The Seller agrees to provide the following products/services to the Buyer:
                &nbsp;<strong>{aggrementdata?.product_description}</strong>&nbsp;
              </p>
              <p className="fontcontent1">
                The quantity, quality, and specifications of the products/services are as
                follows:
                &nbsp;<strong>{aggrementdata?.detailed_description}</strong>&nbsp;
              </p>
              <div className="title font-weight-bold">Purchase Price and Escrow</div>
              <p className="fontcontent1">The total purchase price for the products/services is
              &nbsp;<strong>{aggrementdata?.amount}</strong>&nbsp;

                USD.</p>
              <p className="fontcontent1">Payment terms are as follows:

              &nbsp;<strong>{aggrementdata?.payment_terms}</strong>&nbsp;
                .</p>
              <p className="fontcontent1">
                The Buyer agrees to deposit the purchase price into an escrow account
                managed by
                &nbsp;<strong>{aggrementdata?.escrow_agent_name}</strong>&nbsp;
 within
 &nbsp;<strong>{aggrementdata?.no_of_days}</strong>&nbsp;
  days of signing
                this agreement.
              </p>
              <div className="title font-weight-bold">Business Partner's Commission</div>
              <p className="fontcontent1">
                The Business Partner is entitle font-weight-boldd to a commission of
                &nbsp;<strong>{aggrementdata?.percentage_amount}</strong>&nbsp;

                USD for facilitating this transaction.
              </p>
              <p className="fontcontent1">
                The commission is to be paid by {aggrementdata?.buyer_seller == 0 ? 'buyer' : "seller"} upon completion of the
                transaction from the escrow account.
              </p>
              <div className="title font-weight-bold">Responsibilities</div>
              {formData.buyer_seller == 0 ? (
                <p className="fontcontent1">
                  <strong className="title">Buyer:</strong> To inspect and accept the products/services upon
                  delivery and to authorize the release of funds from escrow once satisfied.
                </p>
              ) : (
                <p className="fontcontent1">
                  <strong className="title">Seller:</strong> To deliver the products/services as per the
                  agreed specifications and schedule.
                </p>
              )}
              <p className="fontcontent1">
                <strong>Business Partner:</strong> To facilitate communication and
                negotiation between the Buyer and Seller and ensure smooth transaction
                processing.
              </p>
              <div className="title font-weight-bold">Escrow Process</div>
              <p className="fontcontent1">
                <strong>Escrow Deposit:</strong> The Buyer will deposit the purchase price
                into the escrow account within
                &nbsp;<strong>{aggrementdata?.no_of_days2}</strong>&nbsp;


                days of signing this agreement.
              </p>
              <p className="fontcontent1">
                <strong>Delivery and Inspection:</strong> The Seller will deliver the
                products/services to
                &nbsp;<strong>{aggrementdata?.delivery_location}</strong>&nbsp;

                by
                &nbsp;<strong>{aggrementdata?.delivery_date}</strong>&nbsp;

                .The Buyer has
                &nbsp;<strong>{aggrementdata?.no_of_days3}</strong>&nbsp;


                days to inspect the products/services and notify the Seller of
                any discrepancies or defects.
              </p>
              <p className="fontcontent1">
                <strong>Release of Funds:</strong> Upon satisfactory inspection, the Buyer
                will instruct the escrow agent to release the funds to the Seller and the
                commission to the Middleman.
              </p>
              <div className="title font-weight-bold">Dispute Resolution</div>
              <p className="fontcontent1">
                Any disputes arising from this agreement shall be resolved through
                &nbsp;<strong>{aggrementdata?.arb_media_court}</strong>&nbsp;


                in
                &nbsp;<strong>{aggrementdata?.jurisdiction}</strong>&nbsp;
.
              </p>
              <div className="title font-weight-bold">Confidentiality</div>
              <p className="fontcontent1">
                All parties agree to keep the terms of this agreement and any related
                information confidential.
              </p>
              <div className="title font-weight-bold">Termination</div>
              <p className="fontcontent1">
                This agreement may be terminated by mutual consent of all parties or by
                &nbsp;<strong>{aggrementdata?.condition_terms}</strong>&nbsp;
.
              </p>
              <div className="title font-weight-bold">Governing Law</div>
              <p className="fontcontent1">
                This agreement shall be governed by and construed in accordance with the
                laws of
                &nbsp;<strong>{aggrementdata?.state_country}</strong>&nbsp;
.
              </p>
            </div>
              <div className="title font-weight-bold">Signatures</div>
            <div className="signature-section mt-5 row">
              <div className="col-6 d-flex align-items-start justify-content-start flex-column">
              <p className="fontcontent1">Name: {aggrementdata?.name}</p>
                <p className="fontcontent1">Signature:</p>
                <div className="card border-0 rounded" style={{width:'70%',height:'60%',backgroundColor:'#f8f8f8'}}>
                  <img src={BASE_URL+aggrementdata?.user_signature}/>
                </div>
              </div>
              <div className="col-6">
              <div>
                <p className="fontcontent1">Name: {userData?.first_name + " " + userData?.last_name}</p>
                <p className="fontcontent1">Signature:</p>
                <SignatureCanvas
                  backgroundColor="white" penColor='black'
                  ref={signatureRef} canvasProps={{ width: 300, height: 180, className: 'sigCanvas pt-2 rounded border border-dark ' }} />
                <i className="fa fa-times ml-3" style={{ color: "red", cursor: "pointer" }} onClick={clearSignature} />
                <p className="fontcontent1">Date: {aggrementdata?.valid_from}</p>
              </div>
              </div>
            </div>
          </>
          <div className="row mt-2">
            <div className="col-lg-12">
              {/* <div className="row">
                {selectedItem &&
                  <div className="card mb-3">
                    <div className="card-header h5">{selectedItem?.project?.title} (ID: {selectedItem?.project?._id})
                    </div>
                    <div className="card-body p-4 row">
                      <h5 className="card-title col-12">Agreement Details</h5>
                      <p className="card-text col-6"><strong>Buyer/Seller:</strong> {selectedItem?.buyer_seller == 0 ? "Buyer" : "seller"}</p>
                      <p className="card-text col-6"><strong>Commission Type:</strong> {selectedItem?.project?.commission_type}</p>
                      <p className="card-text col-6"><strong>Value:</strong> {selectedItem?.project?.commission_value}</p>
                      <p className="card-text col-6"><strong>Date Time:</strong> {new Date(selectedItem?.date_time).toLocaleString()}</p>
                      <p className="card-text col-6"><strong>Valid From:</strong> {new Date(selectedItem?.valid_from).toLocaleDateString()}</p>
                      <p className="card-text col-6"><strong>Valid To:</strong> {new Date(selectedItem?.valid_to).toLocaleDateString()}</p>
                    </div>
                    <div className="card-footer d-flex">
                      <div className='w-50'>
                        <h6>User Details</h6>
                        <p className="font-weigth-bold">  {selectedItem?.user?.first_name} {selectedItem?.user?.last_name}</p>
                        <p className="card-text"> {selectedItem?.user?.city}  {selectedItem?.user?.country}</p>
                      </div>
                      <div className="w-50">
                        <h6>Business Partner Details</h6>
                        <p className="font-weigth-bold"> {selectedItem?.bp?.first_name} {selectedItem?.bp?.last_name}</p>
                        <p className="card-text"> {selectedItem?.bp?.city}  {selectedItem?.bp?.country}</p>
                      </div>
                      <hr />
                    </div>
                  </div>
                }
                <div className='d-flex row justify-content-around'>
                  <div className="col-5">
                    <div className='d-flex justify-content-between'>
                      <span style={{ marginBottom: "0%" }}>Signature</span>{" "}
                    </div>
                    <img src={BASE_URL + selectedItem?.user_signature} width={330} height={170} className="sigCanvas pt-2 rounded border border-dark" style={{ touchAction: "none" }} />
                  </div>
                  <div className='col-5'>
                    <div className='d-flex justify-content-between'>
                      <span>Signature</span>
                      <div className='btn btn-danger' onClick={()=>{clearSignature()}} style={{marginTop:'-2%',marginBottom:"2%"}}>clear</div>
                    </div>
                    <SignatureCanvas backgroundColor="white"
                      penColor='black'
                      canvasProps={{ width: 330, height: 160, className: 'sigCanvas pt-2 rounded border border-dark' }} />
                  </div>
                </div> */}
              <div className="m-2 p-2 d-flex justify-content-end column-gap-3 mx-auto">
                <button className="btn btn-connect small  p-2 w-25" style={{ fontSize: "12px", backgroundColor: "#e92e07", color: "white" }} onClick={() => HandleUpdate(2)}>Reject</button>
                <button className="btn btn-connect small  p-2 w-25" style={{ fontSize: "12px", backgroundColor: "#4535C1", color: "white" }} onClick={() => HandleUpdate(1)}>Approve</button>
              </div>
              {/* </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="body-wrapper bg-white">
        <div className="container-fluid mt-2" style={{ background: 'white', height: 'auto' }}>
          <div className="container  py-4">
            <div className="pt-2 pb-3 text-center fonttitle font-weight-bold" style={{ color: "#2D2B70", fontWeight: "600" }}>Tri-Party E-Agreement with Escrow</div>
            <>
              <p className="fontcontent1 float-right">
                {/* <strong>Agreement Date:</strong> {formData?.valid_from} */}
              </p>
              <div className="section">
                <div className="title font-weight-bold mb-2">E-AGREEMENT FOR PURCHASE OF PRODUCTS</div>
                <p className="fontcontent1">
                  This E-Agreement ("Agreement") is made and entered into on {aggrementdata.Date_of_transaction}
                  {/* {CommonInputField("Date_of_transaction", aggrementdata.Date_of_transaction, handleInputChange, "Date", true, showErrors)} */}
                  &nbsp; by and between:
                </p>
                <div className="title font-weight-bold mb-2">Project Details</div>
                <p className="fontcontent1">
                  Give Your Project a name {aggrementdata.title}
                  {/* {CommonInputField("title", aggrementdata.title, handleInputChange, "Project name", true, showErrors)} */}
                  &nbsp;and Describe the use of this shortly&nbsp;{aggrementdata.desc}
                  {/* {CommonInputField("desc", aggrementdata.desc, handleInputChange, "Description", true, showErrors)} */}

                </p>
                <p className="fontcontent1">
                  {aggrementdata.Buyer_Seller_name}
                  {/* {CommonInputField("Buyer_Seller_name", aggrementdata.Buyer_Seller_name, handleInputChange, "Name", true, showErrors)} */}
                  &nbsp;representing&nbsp;
                  {aggrementdata.Company_name}
                  {/* {CommonInputField("Company_name", aggrementdata.Company_name, handleInputChange, "Company name", true, showErrors)} */}
                  &nbsp;And

                </p>
                <p className="fontcontent1">
                  {aggrementdata.Buyer_Business_Partner_name}
                  {/* {CommonInputField("Buyer_Business_Partner_name", aggrementdata.Buyer_Business_Partner_name, handleInputChange, "Business Partner Name", true, showErrors)} */}
                  ("Business Partner")
                </p>
                <p className="fontcontent1">
                  For the purchase of&nbsp;
                  {aggrementdata.Product_details}
                  {/* {CommonInputField("Product_details", aggrementdata.Product_details, handleInputChange, "product Detail", true, showErrors)} */}
                  &nbsp;("Products") in the quantity of &nbsp;
                  {aggrementdata.Product_quantity}
                  {/* {CommonInputField("Product_quantity", aggrementdata.Product_quantity, handleInputChange, "Product Quantity", true, showErrors)} */}
                  &nbsp; at a total buying price of &nbsp;
                  {aggrementdata.Buying_price}
                  {/* {CommonInputField("Buying_price", aggrementdata.Buying_price, handleInputChange, "Buying Price", true, showErrors)} */}
                </p>
              </div>
              <div className="section">
                <div className="title font-weight-bold">DELIVERY TERMS</div>
                {formData.buyer_seller == 0 ?
                  <p className="fontcontent1">
                    The Products shall be delivered to the Buyer on or before &nbsp;
                    {aggrementdata.Date_of_delivery}
                    {/* {CommonInputField("Date_of_delivery", aggrementdata.Date_of_delivery, handleInputChange, "Delivery date", true, showErrors)} from the Seller. */}
                  </p> :
                  <p className="fontcontent1">
                    The Products shall be delivered to the Buyer on or before &nbsp;
                    {aggrementdata.Date_of_delivery}
                    {/* {CommonInputField("Date_of_delivery", aggrementdata.Date_of_delivery, handleInputChange, "Delivery date", true, showErrors)} */}
                    &nbsp;to the Buyer.</p>
                }
              </div>
              <div className="section">
                <div className="title font-weight-bold">COMMISSION TERMS</div>
                <p className="fontcontent1">
                  The Business Partner shall be entitled to a commission of &nbsp;{aggrementdata.Business_Partner_commission}
                  {/* {CommonInputField("Business_Partner_commission", aggrementdata.Business_Partner_commission, handleInputChange, "Commission percent", true, showErrors)} */}
                  &nbsp; on the total buying price.
                </p>
                <div className="title font-weight-bold">PAYMENT TERMS</div>
                <p className="fontcontent1">The Buyer shall make payment for the Products through the Connect Souq payment gateway on the Effective Date.
                </p>
                <div className="title font-weight-bold">DOCUMENTATION</div>
                <p className="fontcontent1">
                  The Buyer shall submit the following official documents to the Business Partner:{aggrementdata.document_submitted}
                  {/* {CommonInputField("document_submitted", aggrementdata.document_submitted, handleInputChange, "Documents", true, showErrors)} */}
                </p>
                <div className="title font-weight-bold">APPROVAL</div>
                <p className="fontcontent1">
                  This Agreement is subject to approval by the parties and shall be deemed approved upon execution by both parties.
                </p>
                <p>By signing below, the parties acknowledge that they have read, understand, and agree to be bound by the terms and conditions of this Agreement.</p>
                <div className="title font-weight-bold">DEAL APPROVED</div>
                <p className="fontcontent1">
                  Yes / No : {aggrementdata.Deal_Approved}
                  {/* {CommonInputField("Deal_Approved", aggrementdata.Deal_Approved, handleInputChange, "Yes / No", true, showErrors)} */}
                </p>
              </div>
              <div className="signature-section mt-5 row">
              <div className="col-6 d-flex align-items-start justify-content-start flex-column">
              <p className="fontcontent1">Name: {aggrementdata?.name}</p>
                <p className="fontcontent1">Signature:</p>
                <div className="card border-0 rounded" style={{width:'70%',height:'60%',backgroundColor:'#f8f8f8'}}>
                  <img src={BASE_URL+aggrementdata?.user_signature}/>
                </div>
              </div>
              <div className="col-6">
              <div>
                <p className="fontcontent1">Name: {userData?.first_name + " " + userData?.last_name}</p>
                <p className="fontcontent1">Signature:</p>
                <SignatureCanvas
                  backgroundColor="white" penColor='black'
                  ref={signatureRef} canvasProps={{ width: 300, height: 180, className: 'sigCanvas pt-2 rounded border border-dark ' }} />
                <i className="fa fa-times ml-3" style={{ color: "red", cursor: "pointer" }} onClick={clearSignature} />
                <p className="fontcontent1">Date: {aggrementdata?.valid_from}</p>
              </div>
              </div>
            </div>
            </>
            {/* <div className="d-flex justify-content-center column-gap-2 mt-5">
              <button disabled={signbutton} onClick={() => { SignAgreement() }} className="px-2 py-2 fontsubtitle font-weight-bold border-0 rounded text-light addButton">{signbutton ? 'Loading ' : 'Sign E-Aggrement'}</button>
            </div> */}
            <div className="m-2 p-2 d-flex justify-content-center column-gap-3 mx-auto">
                <button className="btn btn-connect small  p-2 w-25" style={{ fontSize: "12px", backgroundColor: "#e92e07", color: "white" }} onClick={() => HandleUpdate(2)}>Reject</button>
                <button className="btn btn-connect small  p-2 w-25" style={{ fontSize: "12px", backgroundColor: "#4535C1", color: "white" }} onClick={() => HandleUpdate(1)}>Approve</button>
              </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Preview
