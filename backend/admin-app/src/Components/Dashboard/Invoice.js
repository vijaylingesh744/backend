import React from 'react'

function Invoice() {
  return (
    <div className="body-wrapper">
    <div className="container-fluid">
      <div className="card bg-info-subtle shadow-none position-relative overflow-hidden mb-4">
        <div className="card-body px-4 py-3">
          <div className="row align-items-center">
            <div className="col-9">
              <h4 className="fw-semibold mb-8">Invoice</h4>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a
                      className="text-muted text-decoration-none"
                      href="/"
                    >
                      Home
                    </a>
                  </li>
                  <li className="breadcrumb-item" aria-current="page">
                    Invoice
                  </li>
                </ol>
              </nav>
            </div>
            <div className="col-3">
              <div className="text-center mb-n5">
                <img
                  src="assets/images/breadcrumb/ChatBc.png"
                  alt=""
                  className="img-fluid mb-n4"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="card overflow-hidden invoice-application">
        <div className="d-flex align-items-center justify-content-between gap-6 m-3 d-lg-none">
          <button
            className="btn btn-primary d-flex"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#chat-sidebar"
            aria-controls="chat-sidebar"
          >
            <i className="ti ti-menu-2 fs-5" />
          </button>
          <form className="position-relative w-100">
            <input
              type="text"
              className="form-control search-chat py-2 ps-5"
              id="text-srh"
              placeholder="Search Contact"
            />
            <i className="ti ti-search position-absolute top-50 start-0 translate-middle-y fs-6 text-dark ms-3" />
          </form>
        </div>
        <div className="d-flex">
          <div className="w-25 d-none d-lg-block border-end user-chat-box">
            <div className="p-3 border-bottom">
              <form className="position-relative">
                <input
                  type="search"
                  className="form-control search-invoice ps-5"
                  id="text-srh"
                  placeholder="Search Invoice"
                />
                <i className="ti ti-search position-absolute top-50 start-0 translate-middle-y fs-6 text-dark ms-3" />
              </form>
            </div>
            <div className="app-invoice">
              <ul
                className="overflow-auto invoice-users"
                style={{ height: "calc(100vh - 262px)" }}
                data-simplebar=""
              >
                <li>
                  <a
                    href="javascript:void(0)"
                    className="p-3 bg-hover-light-black border-bottom d-flex align-items-start invoice-user listing-user bg-light-subtle"
                    id="invoice-123"
                    data-invoice-id={123}
                  >
                    <div className="btn btn-primary round rounded-circle d-flex align-items-center justify-content-center">
                      <i className="ti ti-user fs-6" />
                    </div>
                    <div className="ms-3 d-inline-block w-75">
                      <h6 className="mb-0 invoice-customer">James Anderson</h6>
                      <span className="fs-3 invoice-id text-truncate text-body-color d-block w-85">
                        Id: #123
                      </span>
                      <span className="fs-3 invoice-date text-nowrap text-body-color d-block">
                        9 Fab 2020
                      </span>
                    </div>
                  </a>
                </li>
                <li>
                  <a
                    href="javascript:void(0)"
                    className="p-3 bg-hover-light-black border-bottom d-flex align-items-start invoice-user listing-user"
                    id="invoice-124"
                    data-invoice-id={124}
                  >
                    <div className="btn btn-danger round rounded-circle d-flex align-items-center justify-content-center">
                      <i className="ti ti-user fs-6" />
                    </div>
                    <div className="ms-3 d-inline-block w-75">
                      <h6 className="mb-0 invoice-customer">Bianca Doe</h6>
                      <span className="fs-3 invoice-id text-truncate text-body-color d-block w-85">
                        #124
                      </span>
                      <span className="fs-3 invoice-date text-nowrap text-body-color d-block">
                        9 Fab 2020
                      </span>
                    </div>
                  </a>
                </li>
                <li>
                  <a
                    href="javascript:void(0)"
                    className="p-3 bg-hover-light-black border-bottom d-flex align-items-start invoice-user listing-user"
                    id="invoice-125"
                    data-invoice-id={125}
                  >
                    <div className="btn btn-info round rounded-circle d-flex align-items-center justify-content-center">
                      <i className="ti ti-user fs-6" />
                    </div>
                    <div className="ms-3 d-inline-block w-75">
                      <h6 className="mb-0 invoice-customer">Angelina Rhodes</h6>
                      <span className="fs-3 invoice-id text-truncate text-body-color d-block w-85">
                        #125
                      </span>
                      <span className="fs-3 invoice-date text-nowrap text-body-color d-block">
                        9 Fab 2020
                      </span>
                    </div>
                  </a>
                </li>
                <li>
                  <a
                    href="javascript:void(0)"
                    className="p-3 bg-hover-light-black border-bottom d-flex align-items-start invoice-user listing-user"
                    id="invoice-126"
                    data-invoice-id={126}
                  >
                    <div className="btn btn-warning round rounded-circle d-flex align-items-center justify-content-center">
                      <i className="ti ti-user fs-6" />
                    </div>
                    <div className="ms-3 d-inline-block w-75">
                      <h6 className="mb-0 invoice-customer">Samuel Smith</h6>
                      <span className="fs-3 invoice-id text-truncate text-body-color d-block w-85">
                        #126
                      </span>
                      <span className="fs-3 invoice-date text-nowrap text-body-color d-block">
                        9 Fab 2020
                      </span>
                    </div>
                  </a>
                </li>
                <li>
                  <a
                    href="javascript:void(0)"
                    className="p-3 bg-hover-light-black border-bottom d-flex align-items-start invoice-user listing-user"
                    id="invoice-127"
                    data-invoice-id={127}
                  >
                    <div className="btn btn-primary round rounded-circle d-flex align-items-center justify-content-center">
                      <i className="ti ti-user fs-6" />
                    </div>
                    <div className="ms-3 d-inline-block w-75">
                      <h6 className="mb-0 invoice-customer">Gabriel Jobs</h6>
                      <span className="fs-3 invoice-id text-truncate text-body-color d-block w-85">
                        #127
                      </span>
                      <span className="fs-3 invoice-date text-nowrap text-body-color d-block">
                        9 Fab 2020
                      </span>
                    </div>
                  </a>
                </li>
                <li />
              </ul>
            </div>
          </div>
          <div className="w-75 w-xs-100 chat-container">
            <div className="invoice-inner-part h-100">
              <div className="invoiceing-box">
                <div className="invoice-header d-flex align-items-center border-bottom p-3">
                  <h4 className="font-medium text-uppercase mb-0">Invoice</h4>
                  <div className="ms-auto">
                    <h4 className="invoice-number" />
                  </div>
                </div>
                <div className="p-3" id="custom-invoice">
                  <div className="invoice-123" id="printableArea">
                    <div className="row pt-3">
                      <div className="col-md-12">
                        <div className="">
                          <address>
                            <h6>&nbsp;From,</h6>
                            <h6 className="fw-bold">&nbsp;Steve Jobs</h6>
                            <p className="ms-1">
                              1108, Clair Street, <br />
                              Massachusetts,
                              <br />
                              Woods Hole - 02543
                            </p>
                          </address>
                        </div>
                        <div className="text-end">
                          <address>
                            <h6>To,</h6>
                            <h6 className="fw-bold invoice-customer">
                              James Anderson,
                            </h6>
                            <p className="ms-4">
                              455, Shobe Lane, <br />
                              Colorado, <br />
                              Fort Collins - 80524
                            </p>
                            <p className="mt-4 mb-1">
                              <span>Invoice Date :</span>
                              <i className="ti ti-calendar" />
                              23rd Jan 2021
                            </p>
                            <p>
                              <span>Due Date :</span>
                              <i className="ti ti-calendar" />
                              25th Jan 2021
                            </p>
                          </address>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div
                          className="table-responsive mt-5"
                          style={{ clear: "both" }}
                        >
                          <table className="table table-hover">
                            <thead>
                              {/* start row */}
                              <tr>
                                <th className="text-center">#</th>
                                <th>Description</th>
                                <th className="text-end">Quantity</th>
                                <th className="text-end">Unit Cost</th>
                                <th className="text-end">Total</th>
                              </tr>
                              {/* end row */}
                            </thead>
                            <tbody>
                              {/* start row */}
                              <tr>
                                <td className="text-center">1</td>
                                <td>Milk Powder</td>
                                <td className="text-end">2</td>
                                <td className="text-end">$24</td>
                                <td className="text-end">$48</td>
                              </tr>
                              {/* end row */}
                              {/* start row */}
                              <tr>
                                <td className="text-center">2</td>
                                <td>Air Conditioner</td>
                                <td className="text-end">5</td>
                                <td className="text-end">$500</td>
                                <td className="text-end">$2500</td>
                              </tr>
                              {/* end row */}
                              {/* start row */}
                              <tr>
                                <td className="text-center">3</td>
                                <td>RC Cars</td>
                                <td className="text-end">30</td>
                                <td className="text-end">$600</td>
                                <td className="text-end">$18000</td>
                              </tr>
                              {/* end row */}
                              {/* start row */}
                              <tr>
                                <td className="text-center">4</td>
                                <td>Down Coat</td>
                                <td className="text-end">62</td>
                                <td className="text-end">$5</td>
                                <td className="text-end">$310</td>
                              </tr>
                              {/* end row */}
                            </tbody>
                          </table>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="pull-right mt-4 text-end">
                          <p>Sub - Total amount: $20,858</p>
                          <p>vat (10%) : $2,085</p>
                          <hr />
                          <h3>
                            <b>Total :</b> $22,943
                          </h3>
                        </div>
                        <div className="clearfix" />
                        <hr />
                        <div className="text-end">
                          <button
                            className="btn bg-danger-subtle text-danger"
                            type="submit"
                          >
                            Proceed to payment
                          </button>
                          <button
                            className="btn btn-primary btn-default print-page ms-6"
                            type="button"
                          >
                            <span>
                              <i className="ti ti-printer fs-5" />
                              Print
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* 2 */}
                  <div className="invoice-124" id="printableArea">
                    <div className="row pt-3">
                      <div className="col-md-12">
                        <div className="">
                          <address>
                            <h6>&nbsp;From,</h6>
                            <h6 className="fw-bold">&nbsp;Steve Jobs</h6>
                            <p className="ms-1">
                              1108, Clair Street, <br />
                              Massachusetts,
                              <br />
                              Woods Hole - 02543
                            </p>
                          </address>
                        </div>
                        <div className="text-end">
                          <address>
                            <h6>To,</h6>
                            <h6 className="fw-bold invoice-customer">
                              Bianca Doe,
                            </h6>
                            <p className="ms-4">
                              455, Shobe Lane, <br />
                              Colorado, <br />
                              Fort Collins - 80524
                            </p>
                            <p className="mt-4 mb-1">
                              <span>Invoice Date :</span>
                              <i className="ti ti-calendar" />
                              23rd Jan 2021
                            </p>
                            <p>
                              <span>Due Date :</span>
                              <i className="ti ti-calendar" />
                              25th Jan 2021
                            </p>
                          </address>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div
                          className="table-responsive mt-5"
                          style={{ clear: "both" }}
                        >
                          <table className="table table-hover">
                            <thead>
                              {/* start row */}
                              <tr>
                                <th className="text-center">#</th>
                                <th>Description</th>
                                <th className="text-end">Quantity</th>
                                <th className="text-end">Unit Cost</th>
                                <th className="text-end">Total</th>
                              </tr>
                              {/* end row */}
                            </thead>
                            <tbody>
                              {/* start row */}
                              <tr>
                                <td className="text-center">1</td>
                                <td>Milk Powder</td>
                                <td className="text-end">2</td>
                                <td className="text-end">$24</td>
                                <td className="text-end">$48</td>
                              </tr>
                              {/* end row */}
                              {/* start row */}
                              <tr>
                                <td className="text-center">2</td>
                                <td>Air Conditioner</td>
                                <td className="text-end">5</td>
                                <td className="text-end">$500</td>
                                <td className="text-end">$2500</td>
                              </tr>
                              {/* end row */}
                              {/* start row */}
                              <tr>
                                <td className="text-center">3</td>
                                <td>RC Cars</td>
                                <td className="text-end">30</td>
                                <td className="text-end">$600</td>
                                <td className="text-end">$18000</td>
                              </tr>
                              {/* end row */}
                              {/* start row */}
                              <tr>
                                <td className="text-center">4</td>
                                <td>Down Coat</td>
                                <td className="text-end">62</td>
                                <td className="text-end">$5</td>
                                <td className="text-end">$310</td>
                              </tr>
                              {/* end row */}
                            </tbody>
                          </table>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="pull-right mt-4 text-end">
                          <p>Sub - Total amount: $20,858</p>
                          <p>vat (10%) : $2,085</p>
                          <hr />
                          <h3>
                            <b>Total :</b> $22,943
                          </h3>
                        </div>
                        <div className="clearfix" />
                        <hr />
                        <div className="text-end">
                          <button
                            className="btn bg-danger-subtle text-danger"
                            type="submit"
                          >
                            Proceed to payment
                          </button>
                          <button
                            className="btn btn-primary btn-default print-page ms-6"
                            type="button"
                          >
                            <span>
                              <i className="ti ti-printer fs-5" />
                              Print
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* 3 */}
                  <div className="invoice-125" id="printableArea">
                    <div className="row pt-3">
                      <div className="col-md-12">
                        <div className="">
                          <address>
                            <h6>&nbsp;From,</h6>
                            <h6 className="fw-bold">&nbsp;Steve Jobs</h6>
                            <p className="ms-1">
                              1108, Clair Street, <br />
                              Massachusetts,
                              <br />
                              Woods Hole - 02543
                            </p>
                          </address>
                        </div>
                        <div className="text-end">
                          <address>
                            <h6>To,</h6>
                            <h6 className="fw-bold invoice-customer">
                              Angelina Rhodes,
                            </h6>
                            <p className="ms-4">
                              455, Shobe Lane, <br />
                              Colorado, <br />
                              Fort Collins - 80524
                            </p>
                            <p className="mt-4 mb-1">
                              <span>Invoice Date :</span>
                              <i className="ti ti-calendar" />
                              23rd Jan 2021
                            </p>
                            <p>
                              <span>Due Date :</span>
                              <i className="ti ti-calendar" />
                              25th Jan 2021
                            </p>
                          </address>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div
                          className="table-responsive mt-5"
                          style={{ clear: "both" }}
                        >
                          <table className="table table-hover">
                            <thead>
                              {/* start row */}
                              <tr>
                                <th className="text-center">#</th>
                                <th>Description</th>
                                <th className="text-end">Quantity</th>
                                <th className="text-end">Unit Cost</th>
                                <th className="text-end">Total</th>
                              </tr>
                              {/* end row */}
                            </thead>
                            <tbody>
                              {/* start row */}
                              <tr>
                                <td className="text-center">1</td>
                                <td>Milk Powder</td>
                                <td className="text-end">2</td>
                                <td className="text-end">$24</td>
                                <td className="text-end">$48</td>
                              </tr>
                              {/* end row */}
                              {/* start row */}
                              <tr>
                                <td className="text-center">2</td>
                                <td>Air Conditioner</td>
                                <td className="text-end">5</td>
                                <td className="text-end">$500</td>
                                <td className="text-end">$2500</td>
                              </tr>
                              {/* end row */}
                              {/* start row */}
                              <tr>
                                <td className="text-center">3</td>
                                <td>RC Cars</td>
                                <td className="text-end">30</td>
                                <td className="text-end">$600</td>
                                <td className="text-end">$18000</td>
                              </tr>
                              {/* end row */}
                              {/* start row */}
                              <tr>
                                <td className="text-center">4</td>
                                <td>Down Coat</td>
                                <td className="text-end">62</td>
                                <td className="text-end">$5</td>
                                <td className="text-end">$310</td>
                              </tr>
                              {/* end row */}
                            </tbody>
                          </table>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="pull-right mt-4 text-end">
                          <p>Sub - Total amount: $20,858</p>
                          <p>vat (10%) : $2,085</p>
                          <hr />
                          <h3>
                            <b>Total :</b> $22,943
                          </h3>
                        </div>
                        <div className="clearfix" />
                        <hr />
                        <div className="text-end">
                          <button
                            className="btn bg-danger-subtle text-danger"
                            type="submit"
                          >
                            Proceed to payment
                          </button>
                          <button
                            className="btn btn-primary btn-default print-page ms-6"
                            type="button"
                          >
                            <span>
                              <i className="ti ti-printer fs-5" />
                              Print
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* 4 */}
                  <div className="invoice-126" id="printableArea">
                    <div className="row pt-3">
                      <div className="col-md-12">
                        <div className="">
                          <address>
                            <h6>&nbsp;From,</h6>
                            <h6 className="fw-bold">&nbsp;Steve Jobs</h6>
                            <p className="ms-1">
                              1108, Clair Street, <br />
                              Massachusetts,
                              <br />
                              Woods Hole - 02543
                            </p>
                          </address>
                        </div>
                        <div className="text-end">
                          <address>
                            <h6>To,</h6>
                            <h6 className="fw-bold invoice-customer">
                              Samuel Smith,
                            </h6>
                            <p className="ms-4">
                              455, Shobe Lane, <br />
                              Colorado, <br />
                              Fort Collins - 80524
                            </p>
                            <p className="mt-4 mb-1">
                              <span>Invoice Date :</span>
                              <i className="ti ti-calendar" />
                              23rd Jan 2021
                            </p>
                            <p>
                              <span>Due Date :</span>
                              <i className="ti ti-calendar" />
                              25th Jan 2021
                            </p>
                          </address>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div
                          className="table-responsive mt-5"
                          style={{ clear: "both" }}
                        >
                          <table className="table table-hover">
                            <thead>
                              {/* start row */}
                              <tr>
                                <th className="text-center">#</th>
                                <th>Description</th>
                                <th className="text-end">Quantity</th>
                                <th className="text-end">Unit Cost</th>
                                <th className="text-end">Total</th>
                              </tr>
                              {/* end row */}
                            </thead>
                            <tbody>
                              {/* start row */}
                              <tr>
                                <td className="text-center">1</td>
                                <td>Milk Powder</td>
                                <td className="text-end">2</td>
                                <td className="text-end">$24</td>
                                <td className="text-end">$48</td>
                              </tr>
                              {/* end row */}
                              {/* start row */}
                              <tr>
                                <td className="text-center">2</td>
                                <td>Air Conditioner</td>
                                <td className="text-end">5</td>
                                <td className="text-end">$500</td>
                                <td className="text-end">$2500</td>
                              </tr>
                              {/* end row */}
                              {/* start row */}
                              <tr>
                                <td className="text-center">3</td>
                                <td>RC Cars</td>
                                <td className="text-end">30</td>
                                <td className="text-end">$600</td>
                                <td className="text-end">$18000</td>
                              </tr>
                              {/* end row */}
                              {/* start row */}
                              <tr>
                                <td className="text-center">4</td>
                                <td>Down Coat</td>
                                <td className="text-end">62</td>
                                <td className="text-end">$5</td>
                                <td className="text-end">$310</td>
                              </tr>
                              {/* end row */}
                            </tbody>
                          </table>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="pull-right mt-4 text-end">
                          <p>Sub - Total amount: $20,858</p>
                          <p>vat (10%) : $2,085</p>
                          <hr />
                          <h3>
                            <b>Total :</b> $22,943
                          </h3>
                        </div>
                        <div className="clearfix" />
                        <hr />
                        <div className="text-end">
                          <button
                            className="btn bg-danger-subtle text-danger"
                            type="submit"
                          >
                            Proceed to payment
                          </button>
                          <button
                            className="btn btn-primary btn-default print-page ms-6"
                            type="button"
                          >
                            <span>
                              <i className="ti ti-printer fs-5" />
                              Print
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* 5 */}
                  <div className="invoice-127" id="printableArea">
                    <div className="row pt-3">
                      <div className="col-md-12">
                        <div className="">
                          <address>
                            <h6>&nbsp;From,</h6>
                            <h6 className="fw-bold">&nbsp;Steve Jobs</h6>
                            <p className="ms-1">
                              1108, Clair Street, <br />
                              Massachusetts,
                              <br />
                              Woods Hole - 02543
                            </p>
                          </address>
                        </div>
                        <div className="text-end">
                          <address>
                            <h6>To,</h6>
                            <h6 className="fw-bold invoice-customer">
                              Gabriel Jobs,
                            </h6>
                            <p className="ms-4">
                              455, Shobe Lane, <br />
                              Colorado, <br />
                              Fort Collins - 80524
                            </p>
                            <p className="mt-4 mb-1">
                              <span>Invoice Date :</span>
                              <i className="ti ti-calendar" />
                              23rd Jan 2021
                            </p>
                            <p>
                              <span>Due Date :</span>
                              <i className="ti ti-calendar" />
                              25th Jan 2021
                            </p>
                          </address>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div
                          className="table-responsive mt-5"
                          style={{ clear: "both" }}
                        >
                          <table className="table table-hover">
                            <thead>
                              {/* start row */}
                              <tr>
                                <th className="text-center">#</th>
                                <th>Description</th>
                                <th className="text-end">Quantity</th>
                                <th className="text-end">Unit Cost</th>
                                <th className="text-end">Total</th>
                              </tr>
                              {/* end row */}
                            </thead>
                            <tbody>
                              {/* start row */}
                              <tr>
                                <td className="text-center">1</td>
                                <td>Milk Powder</td>
                                <td className="text-end">2</td>
                                <td className="text-end">$24</td>
                                <td className="text-end">$48</td>
                              </tr>
                              {/* end row */}
                              {/* start row */}
                              <tr>
                                <td className="text-center">2</td>
                                <td>Air Conditioner</td>
                                <td className="text-end">5</td>
                                <td className="text-end">$500</td>
                                <td className="text-end">$2500</td>
                              </tr>
                              {/* end row */}
                              {/* start row */}
                              <tr>
                                <td className="text-center">3</td>
                                <td>RC Cars</td>
                                <td className="text-end">30</td>
                                <td className="text-end">$600</td>
                                <td className="text-end">$18000</td>
                              </tr>
                              {/* end row */}
                              {/* start row */}
                              <tr>
                                <td className="text-center">4</td>
                                <td>Down Coat</td>
                                <td className="text-end">62</td>
                                <td className="text-end">$5</td>
                                <td className="text-end">$310</td>
                              </tr>
                              {/* end row */}
                            </tbody>
                          </table>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="pull-right mt-4 text-end">
                          <p>Sub - Total amount: $20,858</p>
                          <p>vat (10%) : $2,085</p>
                          <hr />
                          <h3>
                            <b>Total :</b> $22,943
                          </h3>
                        </div>
                        <div className="clearfix" />
                        <hr />
                        <div className="text-end">
                          <button
                            className="btn bg-danger-subtle text-danger"
                            type="submit"
                          >
                            Proceed to payment
                          </button>
                          <button
                            className="btn btn-primary btn-default print-page ms-6"
                            type="button"
                          >
                            <span>
                              <i className="ti ti-printer fs-5" />
                              Print
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="offcanvas offcanvas-start user-chat-box"
            tabIndex={-1}
            id="chat-sidebar"
            aria-labelledby="offcanvasExampleLabel"
          >
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasExampleLabel">
                Invoice
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              />
            </div>
            <div className="p-3 border-bottom">
              <form className="position-relative">
                <input
                  type="search"
                  className="form-control search-invoice ps-5"
                  id="text-srh"
                  placeholder="Search Invoice"
                />
                <i className="ti ti-search position-absolute top-50 start-0 translate-middle-y fs-6 text-dark ms-3" />
              </form>
            </div>
            <div className="app-invoice overflow-auto">
              <ul className="invoice-users">
                <li>
                  <a
                    href="javascript:void(0)"
                    className="p-3 bg-hover-light-black border-bottom d-flex align-items-start invoice-user listing-user bg-light"
                    id="invoice-123"
                    data-invoice-id={123}
                  >
                    <div className="btn btn-primary round rounded-circle d-flex align-items-center justify-content-center">
                      <i className="ti ti-user fs-6" />
                    </div>
                    <div className="ms-3 d-inline-block w-75">
                      <h6 className="mb-0 invoice-customer">James Anderson</h6>
                      <span className="fs-3 invoice-id text-truncate text-body-color d-block w-85">
                        Id: #123
                      </span>
                      <span className="fs-3 invoice-date text-nowrap text-body-color d-block">
                        9 Fab 2020
                      </span>
                    </div>
                  </a>
                </li>
                <li>
                  <a
                    href="javascript:void(0)"
                    className="p-3 bg-hover-light-black border-bottom d-flex align-items-start invoice-user listing-user"
                    id="invoice-124"
                    data-invoice-id={124}
                  >
                    <div className="btn btn-danger round rounded-circle d-flex align-items-center justify-content-center">
                      <i className="ti ti-user fs-6" />
                    </div>
                    <div className="ms-3 d-inline-block w-75">
                      <h6 className="mb-0 invoice-customer">Bianca Doe</h6>
                      <span className="fs-3 invoice-id text-truncate text-body-color d-block w-85">
                        #124
                      </span>
                      <span className="fs-3 invoice-date text-nowrap text-body-color d-block">
                        9 Fab 2020
                      </span>
                    </div>
                  </a>
                </li>
                <li>
                  <a
                    href="javascript:void(0)"
                    className="p-3 bg-hover-light-black border-bottom d-flex align-items-start invoice-user listing-user"
                    id="invoice-125"
                    data-invoice-id={125}
                  >
                    <div className="btn btn-info round rounded-circle d-flex align-items-center justify-content-center">
                      <i className="ti ti-user fs-6" />
                    </div>
                    <div className="ms-3 d-inline-block w-75">
                      <h6 className="mb-0 invoice-customer">Angelina Rhodes</h6>
                      <span className="fs-3 invoice-id text-truncate text-body-color d-block w-85">
                        #125
                      </span>
                      <span className="fs-3 invoice-date text-nowrap text-body-color d-block">
                        9 Fab 2020
                      </span>
                    </div>
                  </a>
                </li>
                <li>
                  <a
                    href="javascript:void(0)"
                    className="p-3 bg-hover-light-black border-bottom d-flex align-items-start invoice-user listing-user"
                    id="invoice-126"
                    data-invoice-id={126}
                  >
                    <div className="btn btn-warning round rounded-circle d-flex align-items-center justify-content-center">
                      <i className="ti ti-user fs-6" />
                    </div>
                    <div className="ms-3 d-inline-block w-75">
                      <h6 className="mb-0 invoice-customer">Samuel Smith</h6>
                      <span className="fs-3 invoice-id text-truncate text-body-color d-block w-85">
                        #126
                      </span>
                      <span className="fs-3 invoice-date text-nowrap text-body-color d-block">
                        9 Fab 2020
                      </span>
                    </div>
                  </a>
                </li>
                <li>
                  <a
                    href="javascript:void(0)"
                    className="p-3 bg-hover-light-black border-bottom d-flex align-items-start invoice-user listing-user"
                    id="invoice-127"
                    data-invoice-id={127}
                  >
                    <div className="btn btn-primary round rounded-circle d-flex align-items-center justify-content-center">
                      <i className="ti ti-user fs-6" />
                    </div>
                    <div className="ms-3 d-inline-block w-75">
                      <h6 className="mb-0 invoice-customer">Gabriel Jobs</h6>
                      <span className="fs-3 invoice-id text-truncate text-body-color d-block w-85">
                        #127
                      </span>
                      <span className="fs-3 invoice-date text-nowrap text-body-color d-block">
                        9 Fab 2020
                      </span>
                    </div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  )
}

export default Invoice
