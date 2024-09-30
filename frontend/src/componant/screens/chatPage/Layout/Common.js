import React from 'react'

export const generateInvoiceNumber= (length)=> {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }
    return result;
  }

export const Paymentsuccess = ({ paymentDetails, selectedItem, listtransaction, UserImg, setSwipe }) => {
    return (
        <div>
            <div className="align-items-center background4 column-gap-2 d-flex p-2 border border-left-0">
                <img src="/images/icons/arrow.png" style={{ width: 20, height: 20 }} onClick={() => setSwipe(2)} />
                <div className="d-flex flex-column gap1 ">
                    <span className="name1grey">Project Id : {"(" + selectedItem?.project_data?.project_id + ")"} </span>
                </div>
            </div>
            <div className='card my-2 border-0 d-flex flex-lg-row p-3 align-items-center justify-content-center' style={{ width: '100%', height: 'auto', background: '#4535C1' }}>
                <div className='d-flex column-gap-3 align-items-center flex-column'>
                    <img src={`/images/profile/${UserImg[selectedItem?.users?.randomprofile]}`} style={{ width: 40, height: 40 }} />

                    <div>
                        <span className="chatname" style={{ color: 'white' }}>{selectedItem?.users?.first_name + " " + selectedItem?.users?.last_name}</span>
                    </div>
                </div>
            </div>
            <div className='row'>
                <div className="px-1 py-2 d-flex text-center flex-column col-12 ">

                    <h5 className='mt-5' style={{ color: "#4535C1" }}><img src='/images/icons/tick.png' width={35} />Payment Successful !</h5>
                    <h6 className='mb-3 mt-2' style={{ color: "#000000", fontWeight: '600' }} >Thankyou! Your payment of ${paymentDetails?.amount}.00 has been received.</h6>
                    <div className='mb-3 mt-2' style={{ fontSize: '14px', color: '#BBBBBB' }}>
                        <span>Transaction ID: {paymentDetails?.transactionNo}</span>
                    </div>
                    <p className='mb-5' style={{ fontSize: '14px', color: '#BBBBBB' }} >Please contact us at 1800- or email to care@canvera.com for any query</p>
                    <div className='mt-3' >
                        <button className='btn  alian-center text-white' style={{ width: "20%", backgroundColor: '#4535C1' }} onClick={() => { listtransaction(selectedItem?.project_data?._id) }}>
                            ok
                        </button>
                    </div>

                </div>
            </div>
        </div>
    )
}