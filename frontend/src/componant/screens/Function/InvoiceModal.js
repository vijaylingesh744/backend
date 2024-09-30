import React from 'react'
import { Modal } from "react-bootstrap";
import './style/Modal.css'
const InvoiceModal = ({
    ModalView,
    setModalView,
    invoiceData,
    // AddItemInvoice,
    TabInvoice,
    setTabInvoice,
    HandleShareInvoice,
    setinvoicedata
  }) => {

    const path = window.location.pathname

    function formatDate(date, format) {
      const map = {
        'MM': ('0' + (date.getMonth() + 1)).slice(-2),
        'DD': ('0' + date.getDate()).slice(-2),
        'YYYY': date.getFullYear()
      };
    
      return format.replace(/MM|DD|YYYY/gi, matched => map[matched]);
    }

    const AddItemInvoice = () => {
      setTabInvoice(prevTabInvoice => [
        ...prevTabInvoice,
        {
          id: Date.now(),  // Assuming id should be unique
          product: "",
          quantity: "",
          amount: ""
        }
      ]);
    };
    
    const handleinputs = (e, index) => {
      const { name, value } = e.target;
      setTabInvoice(prevTabInvoice => {
        const newTabInvoice = [...prevTabInvoice];
        newTabInvoice[index] = {
          ...newTabInvoice[index],
          [name]: value
        };
        return newTabInvoice;
      });
    }

    const handletax = async (e) => {
      const { name, value } = e.target;
      console.log(name, value);
      if(name == "CS_tax"){
        console.log(invoiceData.amount);
        const percentageValue = (parseFloat(value) / 100) * invoiceData.amount;
        console.log(percentageValue);
        setinvoicedata({...invoiceData, csFee: percentageValue.toFixed(2) }); 
      }
      if(name == "tax"){
        console.log(invoiceData.amount);
        const percentageValue = (parseFloat(value) / 100) * invoiceData.amount;
      console.log(percentageValue);
      setinvoicedata({...invoiceData, tax: percentageValue.toFixed(2) });
    };
  }

    const RemoveItemInvoice = (selectoption) => {
      setTabInvoice(prevTabInvoice =>
        prevTabInvoice.filter(item => item.id !== selectoption)
      );
    };
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
              <span className="fontcontent1 font-weight-bold">{invoiceData.invoiceNo}</span>
              <span className="fontcontent1 font-weight-bold">{invoiceData.transactionNo}</span>
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
                  <th scope="col" onClick={() => AddItemInvoice()}><img style={{ cursor: 'pointer' }} src="/images/icons/add (7) 1.png" width={20} /></th>
                </tr>
              </thead>
              <tbody>
                {TabInvoice.map((item, index) => (
                  <tr key={item.id} className="text-center">
                    <th scope="row" className="fontcontent1 d-none d-md-block d-lg-block">{index + 1}</th>
                    <td>
                      <input
                        type="text"
                        name="product"
                        value={item.product}
                        className="inputwidth"
                        onChange={(e) => handleinputs(e, index)}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        name="quantity"
                        className="inputwidth"
                        value={item.quantity}
                        onChange={(e) => handleinputs(e, index)}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        name="amount"
                        value={item.amount}
                        className="inputwidth"
                        onChange={(e) => handleinputs(e, index)}
                      />
                    </td>
                    <td onClick={() => RemoveItemInvoice(item.id)} ><img style={{ cursor: 'pointer' }} src="/images/icons/minus 1.png" width={20} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="row">
              <div className="col-lg-5 col-10 offset-lg-7 offset-2 container d-flex flex-column align-items-end row-gap-05">
                <div className="d-flex column-gap-2 w-100">
                  <span className="fontcontent1 font-weight-bold w-50 text-right mt-3">Total Amount :</span> <span className="fontcontent1 font-weight-bold w-50 mt-3" style={{ color: '#4535C1' }}> {invoiceData.amount}</span>
                </div>
                {path == '/notify' && <div className="d-flex column-gap-2 w-100" >
                  <span className="fontcontent1 font-weight-bold w-50 text-right mt-3">Business partner :</span> <span className="fontcontent1 font-weight-bold w-50 mt-3" style={{ color: '#4535C1' }}> 200.00</span>
                </div>}
                <div className="d-flex column-gap-2 w-100">
                  <span className=" d-flex fontcontent1 font-weight-bold w-50 justify-content-end mt-3">Connect Souq &nbsp; <input type="number" name="CS_tax" 
                  // value={(invoiceData.csFee/invoiceData.amount) *100}
                  className='w-25 pl-2' onChange={(e)=>handletax(e)} style={{border:'none',borderBottom:'0.5px solid black'}}/>: </span> <span className="fontcontent1 font-weight-bold w-50 mt-3" style={{ color: '#4535C1' }}>{invoiceData.csFee}</span>
                </div>
                <div className="d-flex column-gap-2 w-100">
                
                  <span className="fontcontent1 d-flex font-weight-bold w-50 justify-content-end mt-3">Tax &nbsp;
                     <input type="number" name="tax" className='w-25 pl-2' 
                    //  value={(invoiceData.tax/invoiceData.amount) *100}
                     onChange={(e)=>handletax(e)} style={{border:'none',borderBottom:'0.5px solid black'}}/>:</span> <span className="fontcontent1 font-weight-bold w-50 mt-3" style={{ color: '#4535C1' }}> {invoiceData.tax}</span>
                </div>
              </div>
            </div>
            <div className="container d-flex justify-content-center mt-3">
              <button className="border-0 rounded text-white p-2 fontcontent1 font-weight-bold" style={{ background: '#4535C1' }} onClick={() => HandleShareInvoice()}>Share Invoice</button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
        </div>
    )
}

export default InvoiceModal
