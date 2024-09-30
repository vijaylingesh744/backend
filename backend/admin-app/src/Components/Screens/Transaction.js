import React, { useEffect, useState } from 'react'
import ApiRoute from '../utils/ApiRoute';
import { useNavigate } from 'react-router-dom';
import FetchData from '../fetch-api/Apifetch';
import { Modal } from 'react-bootstrap';

const Transaction = () => {
  const [DataList, setDataList] = useState([]);
  const [Invoicedata, setInvoicedata] = useState([]);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('User')));
  useEffect(() => {
    fetchInd();
  }, []);

  const fetchInd = async () => {
    try {
      const response = await fetch(`${ApiRoute.APIBASE_URL}/listnotify/${user._id}`);
      const item = await response.json();
      setDataList(item.data);
    } catch (error) {
      console.error('Error fetching options:', error.message);
    }
  };

  const listtransaction = async (project_id) => {
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
const [viewModal,setMadal] = useState(false)
  const ViewModal = () =>{
    return(
      <Modal show={viewModal}
      className="modelfilter modal-lg"
      size="md" style={{height:"auto"}}>
      <Modal.Header>
      <h4 style={{marginLeft:'20px'}}>View Invoice</h4>
        <i class="fa fa-times" aria-hidden="true" style={{cursor:'pointer'}} onClick={()=>setMadal(!viewModal)}></i>
      </Modal.Header>
      <Modal.Body  style={{overflowY:"scroll",'&::-webkit-scrollbar':{width:12, }}}>
        <div>
<div
className="card mx-3 border-0 d-flex p-3 align-items-center justify-content-between"
style={{  height: "auto", background: "rgb(248, 248, 248)" }}
>

<div className="d-flex justify-content-between w-75 m-1">
  <span className="fontsubtitle font-weight-bold">Invoice Number</span>
  <span className="fontsubtitle font-weight-bold">{Invoicedata?.invoiceNo}</span>
</div>
<div className="d-flex justify-content-between w-75 m-1">
  <span className="fontcontent1 font-weight-normal">Mode of payment</span>
  <span className="fontcontent1 font-weight-normal">{Invoicedata?.mop}</span>
</div>
<div className="d-flex justify-content-between w-75 m-1">
  <span className="fontcontent1 font-weight-normal">currency</span>
  <span className="fontcontent1 font-weight-normal">{Invoicedata?.currency}</span>
</div>
<div className="d-flex justify-content-between w-75 m-1">
  <span className="fontcontent1 font-weight-normal">
    Transaction number
  </span>
  <span className="fontcontent1 font-weight-normal">{Invoicedata?.transactionNo}</span>
</div>
<div className="w-75 mt-2">
  <div className="d-flex justify-content-between m-2">
    <span className="fontcontent1 font-weight-normal">Total Amount</span>{" "}
    <span className="fontcontent1 font-weight-normal">
      {" "}
       {Invoicedata?.amount}
    </span>
  </div>
  {/* <div className="d-flex justify-content-between m-2">
    <span className="fontcontent1 font-weight-normal">paid Amount</span>{" "}
    <span className="fontcontent1 font-weight-normal">
      {" "}
       {Invoicedata?.payment}
    </span>
  </div> */}

</div>
<div
className="w-100 mt-2"
style={{ height: "auto", background: "rgb(248, 248, 248)",borderTop:"1px solid grey",padding:"10px"}}
>
<span className="fontcontent1 fw-bold">Remarks</span>
<p className="fontcontent1 font-weight-normal"> Thank you for your order. Payment is due within 30 days. Contact us at [email/phone] with any questions. Please reference the invoice number with your payment.</p>
</div>
</div>

</div>
</Modal.Body>
</Modal>
    )
}
  return (
    <div>
      <div className="body-wrapper">
        <div className="container-fluid">
         
          <div className="datatables">
            {/* File export */}
            <div className="row">
              <div className="col-12">

                <div className="card">
                  <div className="card-body">
                    <div className="table-responsive overflow-x-scroll">
                      <div
                        id="custom_tool_ele_wrapper"
                        className="dataTables_wrapper"
                      >
                        <table
                          id="custom_tool_ele"
                          className="table border table-striped table-bordered display text-nowrap dataTable"
                          style={{ width: "100%" }}
                          aria-describedby="custom_tool_ele_info"
                        >
                          <thead>
                            <tr>
                              <th
                                className="sorting sorting_asc"
                                tabIndex={0}
                                aria-controls="custom_tool_ele"
                                rowSpan={1}
                                colSpan={1}
                                aria-sort="ascending"
                                aria-label="Name: activate to sort column descending"
                                style={{ width: 171 }}
                              >
                                # Invoice
                              </th>
                              <th
                                className="sorting"
                                tabIndex={0}
                                aria-controls="custom_tool_ele"
                                rowSpan={1}
                                colSpan={1}
                                aria-label="Position: activate to sort column ascending"
                                style={{ width: 161 }}
                              >
                                Transaction
                              </th>
                              <th
                                className="sorting"
                                tabIndex={0}
                                aria-controls="custom_tool_ele"
                                rowSpan={1}
                                colSpan={1}
                                aria-label="Office: activate to sort column ascending"
                                style={{ width: 128 }}
                              >
                                Date & Time
                              </th>
                              <th
                                className="sorting"
                                tabIndex={0}
                                aria-controls="custom_tool_ele"
                                rowSpan={1}
                                colSpan={1}
                                aria-label="Age: activate to sort column ascending"
                                style={{ width: 53 }}
                              >
                                Made of Payment
                              </th>
                              <th
                                className="sorting"
                                tabIndex={0}
                                aria-controls="custom_tool_ele"
                                rowSpan={1}
                                colSpan={1}
                                aria-label="Salary: activate to sort column ascending"
                                style={{ width: 114 }}
                              >
                                Curerency
                              </th>
                              <th
                                className="sorting"
                                tabIndex={0}
                                aria-controls="custom_tool_ele"
                                rowSpan={1}
                                colSpan={1}
                                aria-label="Salary: activate to sort column ascending"
                                style={{ width: 114 }}
                              >
                                status
                              </th>
                              <th
                                className="sorting"
                                tabIndex={0}
                                aria-controls="custom_tool_ele"
                                rowSpan={1}
                                colSpan={1}
                                aria-label="Salary: activate to sort column ascending"
                                style={{ width: 114 }}
                              >
                                Invoice
                              </th>
                            </tr>
                          </thead>
{ViewModal()}
                          <tbody>
                            {DataList.map(item => (
                              <tr>
                                <td>
                                  {item.invoiceNo}
                                </td>
                                <td>
                                  {item.transactionNo}
                                </td>
                                <td>
                                  {item.dueDate}
                                </td>
                                <td>
                                  {item.mop}
                                </td>
                                <td>
                                  {item?.amount}
                                </td>
                                <td>
                                  {item.currency}
                                </td>
                                <td>
                                  <p>{item.status == 1 ? "UnPaid" : "paid"}</p>
                                </td>
                                <td>
                                  <p>

                                    <button className="btn btn-primary"
                                    
                                    onClick={()=>{
                                      setMadal(true)
                                      setInvoicedata(item)
                                    }}
                                    >View</button>
                                  </p>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Transaction
