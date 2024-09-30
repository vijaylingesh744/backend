import React, { useEffect, useRef, useState } from 'react'
import SignatureCanvas from 'react-signature-canvas'
import { BASE_URL,BUSINESS_URL } from '../../utils/ApiRoute';

import { useLocation } from 'react-router-dom';
import FetchData from '../../fetch-api/Apifetch';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
const Preview = () => {
  const [selectedItem, setSelectedItem] = useState({})
  const location = useLocation();
  const { state } = location;
  var formData = {}
  const [userData, setUserData] = useState(JSON.parse(localStorage.getItem("User")));
  const [aggrementdata, setaggreementdata] = useState({
    name: state?.user?.first_name + " " + state?.user?.last_name,
    bp_id: userData?._id,
    buyer_seller: state?.buyer_seller,
    user_id: state?.user_id,
    commision: state?.commision,
    valid_to: new Date().toISOString().slice(0, 10),
    valid_from: new Date().toISOString().slice(0, 10),
    user_signature: state?.user_signature,
    price: selectedItem.price,
    quantity: "",
    city: state?.user?.city || '',
    country: state?.user?.country || '',
    phone: state?.user?.phone || '',
    product_service1: state?.product_service1,
    product_service2: state?.product_service2,
    product_description: state?.product_description,
    detailed_description: state?.detailed_description,
    amount: state?.amount,
    payment_terms: state?.payment_terms,
    escrow_agent_name: state?.escrow_agent_name,
    no_of_days: state?.no_of_days,
    percentage_amount: state?.percentage_amount,
    no_of_days2: state?.no_of_days2,
    delivery_location: state?.delivery_location,
    delivery_date: state?.delivery_date,
    no_of_days3: state?.no_of_days3,
    arb_media_court: state?.arb_media_court,
    jurisdiction: state?.jurisdiction,
    condition_terms: state?.condition_terms,
    state_country: state?.state_country,
  })
  var handleInputChange = () => {

  }
  useEffect(() => {
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

    console.log(signatureBlob);
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
            window.location.href = "/notification"
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
    <div className="body-wrapper">
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
                <button className="btn btn-connect small  p-2 w-25" style={{ fontSize: "12px", backgroundColor: "#8AC53F", color: "white" }} onClick={() => HandleUpdate(1)}>Approve</button>
              </div>
              {/* </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Preview
