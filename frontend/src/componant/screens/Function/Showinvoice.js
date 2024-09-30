import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import Swal from 'sweetalert2';

const Showinvoice = ({data,ModalView,setModalView,setpaymodal}) => {

    const [user,setuser]=useState(JSON.parse(localStorage.getItem('LOGINDATA'))?.user)
    const path = window.location.pathname
    function formatDate(date, format) {
        const map = {
          'MM': ('0' + (date.getMonth() + 1)).slice(-2),
          'DD': ('0' + date.getDate()).slice(-2),
          'YYYY': date.getFullYear()
        };
      
        return format.replace(/MM|DD|YYYY/gi, matched => map[matched]);
      }

      const PayInvoice = async () =>{

        // Swal.fire({
        //     title: 'Payment Success',
        //     html: `<span style="font-size: 16px; font-weight: bold;">Your Invoice payment is complete.</span>`,
        //     icon: 'success',
        //     customClass: {
        //         title: 'swal2-title',
        //     },
        //     iconHtml: `<img src="http://connect-souq.qcodesinfotech.com/images/icons/laugh.png" style="width: 60px; height: 60px; border:none; border-radius: 50%;" />`,
        //     timer: 2000, // Close the modal after 2 seconds
        //     timerProgressBar: true, // Show a progress bar for the timer
        //     showConfirmButton: false, // Hide the confirm button
        //     showCancelButton: false // Hide the cancel button
        // });

        setModalView(false)
        setpaymodal(true)
      }

  return (
    <div>
    <Modal show={ModalView} className="modelfilter modal-xl h-auto" size="sl">
        <Modal.Body>
          <div className="d-flex justify-content-end">
            <span style={{ cursor: 'pointer' }} onClick={() => setModalView(false)}><i class="fa fa-times" aria-hidden="true"></i></span>
          </div>
          <div className="d-flex justify-content-between align-items-center px-3">
            <div className="d-flex flex-column align-items-start row-gap-05">
              <img
                src="/images/icons/smalllogo.png"
                style={{ width: "100px" }}
              />
            </div>
            <div className="d-flex flex-column align-items-end row-gap-05">
              <h4 className="font-weight-bold" style={{ color: "#4535C1" }}>
                INVOICE
              </h4>
              <span className="fontcontent1 font-weight-bold">{data?.invoiceNo}</span>
              <span className="fontcontent1 font-weight-bold">{data?.transactionNo}</span>
              <span className="fontcontent1 font-weight-bold">
                Date:{formatDate(new Date(), 'DD/MM/YYYY')}
              </span>
            </div>
          </div>
          <div className="container mt-4 text-justify">
            <span className="fontcontent1 font-weight-bold">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Vestibulum posuere lobortis porta. Nullam maximus justo at nisl
              interdum eleifend.
            </span>
          </div>
          <div className="container-fluid mt-3">
            <table class="table">
              <thead>
                <tr className="text-center">
                  <th scope="col" className='d-none d-md-block d-lg-block'>S.No</th>
                  <th scope="col">Product</th>
                  <th scope="col">Quantity</th>
                  <th scope="col" className="w-25">Amount</th>
                </tr>
              </thead>
              <tbody>
                {data?.receiverCharges.map((item, index) => (
                  <tr key={item.id} className="text-center">
                    <th scope="row" className="fontcontent1 d-none d-md-block d-lg-block">{index + 1}</th>
                    <td>
                        <span className="fontcontent1">{item.product}</span>
                    </td>
                    <td>
                        <span className="fontcontent1">{item.quantity}</span>
                    </td>
                    <td>
                        <span className="fontcontent1">{item.amount}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="row">
              <div className="col-10 col-lg-5 offset-2 offset-lg-7 container d-flex flex-column align-items-end row-gap-05">
                <div className="d-flex column-gap-2 w-100">
                  <span className="fontcontent1 font-weight-bold w-50 text-right mt-3">Total Amount :</span> <span className="fontcontent1 font-weight-bold w-50 mt-3" style={{ color: '#4535C1' }}> {data?.amount}</span>
                </div>
                {path == '/notify' && <div className="d-flex column-gap-2 w-100" >
                  <span className="fontcontent1 font-weight-bold w-50 text-right mt-3">Business partner :</span> <span className="fontcontent1 font-weight-bold w-50 mt-3" style={{ color: '#4535C1' }}> 200.00</span>
                </div>}
                <div className="d-flex column-gap-2 w-100">
                  <span className=" d-flex fontcontent1 font-weight-bold w-50 justify-content-end mt-3">Connect Souq &nbsp; <span className='w-25 pl-2'  >
                    {((data?.csFee/data?.amount) *100).toFixed(1)}
                  </span>: </span> <span className="fontcontent1 font-weight-bold w-50 mt-3" style={{ color: '#4535C1' }}>{data?.csFee}</span>
                </div>
                <div className="d-flex column-gap-2 w-100">
                
                  <span className="fontcontent1 d-flex font-weight-bold w-50 justify-content-end mt-3">Tax &nbsp;
                     <span className='w-25 pl-2' >{((data?.tax/data?.amount) *100).toFixed(1)}</span>:</span> <span className="fontcontent1 font-weight-bold w-50 mt-3" style={{ color: '#4535C1' }}> {data?.tax}</span>
                </div>
              </div>
            </div>
            <div className="container d-flex justify-content-center mt-3">
              {data?.receiverId == user?._id ? (
              <button className="border-0 rounded text-white p-2 fontcontent1 font-weight-bold" style={{ background: '#4535C1' }} onClick={()=>PayInvoice()} >Pay Invoice</button>
              ):(
                <button className="border-0 rounded text-white p-2 fontcontent1 font-weight-bold" style={{ background: '#4535C1' }} onClick={() => setModalView(false)} >Back</button>
              )} 
            </div>
          </div>
        </Modal.Body>
      </Modal>
        </div>
  )
}

export default Showinvoice