import React, { useEffect, useState } from 'react'
import ApiRoute from '../../utils/ApiRoute';
import { useNavigate } from 'react-router-dom';
import FetchData from '../../fetch-api/Apifetch';
import { Modal } from 'react-bootstrap';
// import Header from '../../screens/layout/Header';
import LeftSide from '../../screens/FeedPage/PostData/LeftSide';
import '../../screens/FeedPage/style/style.css'

const Transaction = () => {
  const [DataList, setDataList] = useState([]);
  const [Invoicedata, setInvoicedata] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('LOGINDATA')));

  useEffect(() => {
    listtransaction();
  }, []);

  const listtransaction = async (project_id) => {
    try {
      const res = await FetchData(`listnotify/${user?.user?._id}`, 'GET', null, true, false)
      if (res.status) {
        const list = res.data.filter(item => item.status !== 0)
        setDataList(list);
        setLoading(false)
      }
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  const [viewModal, setMadal] = useState(false)
  const ViewModal = () => {
    return (
      <Modal show={viewModal}
        className="modelfilter mode mx-auto modal-lg"
        size="mdmd" style={{ height: "auto" }}>
        <Modal.Header>
          <h4 style={{ marginLeft: '20px' }}>View Invoice</h4>
          <i class="fa fa-times" aria-hidden="true" style={{ cursor: 'pointer' }} onClick={() => setMadal(!viewModal)}></i>
        </Modal.Header>
        <Modal.Body style={{ overflowY: "scroll", '&::-webkit-scrollbar': { width: 12, } }}>
          <div className='d-flex justify-content-center align-items-center'>
            <div
              className="card mx-3 border-0 d-flex p-3 align-items-center justify-content-between w-85"
              style={{ height: "auto", background: "rgb(248, 248, 248)" }}>
              <div className="d-flex justify-content-between w-75 m-1">
                <span className="fontsubtitle font-weight-bold">Invoice Number</span>
                <span className="fontsubtitle font-weight-bold">{Invoicedata?.invoiceNo}</span>
              </div>

              {/* <div className="d-flex justify-content-between w-75 m-1">
  <span className="fontcontent1 font-weight-normal">currency</span>
  <span className="fontcontent1 font-weight-normal">{Invoicedata?.currency}</span>
</div> */}
              <div className="d-flex justify-content-between w-75 m-1">
                <span className="fontcontent1 font-weight-normal">
                  Transaction number
                </span>
                <span className="fontcontent1 font-weight-normal">{Invoicedata?.transactionNo}</span>
              </div>
              <div className="d-flex justify-content-between w-75 m-1">
                <span className="fontcontent1 font-weight-normal">
                  Connect souq Fees
                </span>
                <span className="fontcontent1 font-weight-normal">{Invoicedata?.csFee}</span>
              </div>
              <div className="d-flex justify-content-between w-75 m-1">
                <span className="fontcontent1 font-weight-normal">
                  Tax Fees
                </span>
                <span className="fontcontent1 font-weight-normal">{Invoicedata?.tax}</span>
              </div>
              <div className="w-75 mt-2">
                <div className="d-flex justify-content-between">
                  <span className="fontcontent1 font-weight-normal">Total Amount</span>{" "}
                  <span className="fontcontent1 font-weight-normal">
                    {" "}
                    {Invoicedata?.amount}
                  </span>
                </div>
              </div>
              <div
                className="w-100 mt-2"
                style={{ height: "auto", background: "rgb(248, 248, 248)", borderTop: "1px solid grey", padding: "10px" }}
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

  // if (loading) {
  //   return <img src='/bp-assets/images/logos/Spinner-5.gif' style={{ textAlign: "center", marginTop: "30%", marginLeft: "47%" }} />;
  // }
  return (
    <div>
      <div >
        {/* <header id='main-header'>
          <Header />
        </header> */}
        <div className="feed_container" style={{ display: "grid" }}>
          <section id="ads"></section>
          <aside id='left-aside'></aside>
          {/* <div className="body-wrapper"> */}
          {/* <div className="container-fluid"> */}
          <div id="main-wrapper" className="mt-5 mt-lg-0" >
            <main id="main-section" className="mt-2 mt-lg-0">
              <div className="card" style={{ width: '150%', marginLeft: '-50%' }}>
                <div className="card-body">
                  <div className="table-responsive overflow-x-scroll scrollerhide">
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
                              aria-label="Salary: activate to sort column ascending"
                              style={{ width: 114 }}
                            >
                              Amount
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
                          {DataList && DataList.map(item => (
                            <tr>
                              <td>
                                {item.invoiceNo}
                              </td>
                              <td>
                                {item.transactionNo}
                              </td>
                              <td>
                                {item?.amount}
                              </td>
                              <td>
                                <p>{item.status == 1 ? "UnPaid" : "paid"}</p>
                              </td>
                              <td>
                                <p>

                                  <button className="btn btn-primary"

                                    onClick={() => {
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
            </main>
          </div>
          <LeftSide />
        </div>
      </div></div>
  )
}

export default Transaction
