import React from 'react'

function General() {
  return (
    <div className="body-wrapper">
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="d-flex align-items-center gap-4 mb-4">
            <div className="position-relative">
              <div className="border border-2 border-primary rounded-circle">
                <img
                  src="assets/images/profile/user-1.jpg"
                  className="rounded-circle m-1"
                  alt="user1"
                  width={60}
                />
              </div>
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill text-bg-primary">
                {" "}
                3<span className="visually-hidden">unread messages</span>
              </span>
            </div>
            <div>
              <h3 className="fw-semibold">
                Hi, <span className="text-dark">Johnathan</span>
              </h3>
              <span>Cheers, and happy activities - July 6 2024</span>
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <div className="row pb-4">
                <div className="col-lg-4 d-flex align-items-stretch">
                  <div className="d-flex flex-column align-items-start w-100">
                    <div className="text-start">
                      <h5 className="card-title fw-semibold">Financial Income</h5>
                      <span>Aug 1, 2024 - Nov 1, 2024</span>
                    </div>
                    <div className="mt-lg-auto mt-4 mb-4">
                      <span className="text-dark">
                        Total Revenue <span className="text-success">+9.78%</span>
                      </span>
                      <h2 className="mt-2 fw-bold">$8,240,00</h2>
                      <span>Increased 15% from last month</span>
                    </div>
                  </div>
                </div>
                <div className="col-lg-8 d-flex align-items-stretch">
                  <div className="w-100">
                    <div className="d-md-flex align-items-start gap-3">
                      <div>
                        <h6 className="mb-0">Product Condition</h6>
                        <div className="d-flex align-items-center gap-3">
                          <h2 className="mt-2 fw-bold">75%</h2>
                          <span className="badge text-bg-primary  px-2 py-1 d-flex align-items-center">
                            <i className="ti ti-chevron-down fs-4" />
                            2.8%{" "}
                          </span>
                        </div>
                      </div>
                      <div className="ms-auto">
                        <select className="form-select">
                          <option value={1}>March 2024</option>
                          <option value={2}>April 2024</option>
                          <option value={3}>May 2024</option>
                          <option value={4}>June 2024</option>
                        </select>
                      </div>
                    </div>
                    <div className="mt-4">
                      <div id="financial" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="border-top">
              <div className="row gx-0">
                <div className="col-md-4 border-end">
                  <div className="p-4 py-3 py-md-4">
                    <p className="fs-4 text-danger mb-0">
                      <span className="text-danger">
                        <span className="round-8 text-bg-danger rounded-circle d-inline-block me-1" />
                      </span>
                      Selling Product
                    </p>
                    <h3 className=" mt-2 mb-0">$3,350,00</h3>
                  </div>
                </div>
                <div className="col-md-4 border-end">
                  <div className="p-4 py-3 py-md-4">
                    <p className="fs-4 text-primary mb-0">
                      <span className="text-primary">
                        <span className="round-8 text-bg-primary rounded-circle d-inline-block me-1" />
                      </span>
                      Followers
                    </p>
                    <h3 className=" mt-2 mb-0">1,500+</h3>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="p-4 py-3 py-md-4">
                    <p className="fs-4 text-info mb-0">
                      <span className="text-info">
                        <span className="round-8 text-bg-info rounded-circle d-inline-block me-1" />
                      </span>
                      Campaign
                    </p>
                    <h3 className=" mt-2 mb-0">560</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-5 d-flex align-items-stretch">
          <div className="card w-100">
            <div className="card-body">
              <h5 className="card-title fw-semibold">Upcoming Activity</h5>
              <p className="card-subtitle">
                Preparation for the Upcoming Activity
              </p>
              <div className="mt-9 py-6 d-flex align-items-center">
                <div className="flex-shrink-0 bg-primary-subtle text-primary rounded-circle round d-flex align-items-center justify-content-center">
                  <i className="ti ti-map-pin fs-6" />
                </div>
                <div className="ms-3">
                  <h6 className="mb-0 fw-semibold">Trip to Singapore</h6>
                  <span className="fs-3">working on</span>
                </div>
                <div className="ms-auto">
                  <span className="fs-2">12:00 AM</span>
                </div>
              </div>
              <div className="py-6 d-flex align-items-center">
                <div className="flex-shrink-0 bg-danger-subtle text-danger rounded-circle round d-flex align-items-center justify-content-center">
                  <i className="ti ti-bookmark fs-6" />
                </div>
                <div className="ms-3">
                  <h6 className="mb-0 fw-semibold">Archived Data</h6>
                  <span className="fs-3">working on</span>
                </div>
                <div className="ms-auto">
                  <span className="fs-2">3:52 PM</span>
                </div>
              </div>
              <div className="py-6 d-flex align-items-center">
                <div className="flex-shrink-0 bg-success-subtle text-success rounded-circle round d-flex align-items-center justify-content-center">
                  <i className="ti ti-microphone fs-6" />
                </div>
                <div className="ms-3">
                  <h6 className="mb-0 fw-semibold">Meeting with Client</h6>
                  <span className="fs-3">working on</span>
                </div>
                <div className="ms-auto">
                  <span className="fs-2">4:50 PM</span>
                </div>
              </div>
              <div className="py-6 d-flex align-items-center">
                <div className="flex-shrink-0 bg-warning-subtle text-warning rounded-circle round d-flex align-items-center justify-content-center">
                  <i className="ti ti-cast fs-6" />
                </div>
                <div className="ms-3">
                  <h6 className="mb-0 fw-semibold ">Screening Task Team</h6>
                  <span className="fs-3">working on</span>
                </div>
                <div className="ms-auto">
                  <span className="fs-2">5:10 PM</span>
                </div>
              </div>
              <div className="pt-6 d-flex align-items-center">
                <div className="flex-shrink-0 bg-info-subtle text-info rounded-circle round d-flex align-items-center justify-content-center">
                  <i className="ti ti-mail fs-6" />
                </div>
                <div className="ms-3">
                  <h6 className="mb-0 fw-semibold">Send envelope to John</h6>
                  <span className="fs-3">working on</span>
                </div>
                <div className="ms-auto">
                  <span className="fs-2">6:00 PM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-7 d-flex align-items-stretch">
          <div className="card w-100 bg-primary-subtle overflow-hidden">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div>
                  <h5 className="card-title fw-semibold">Sales Hourly</h5>
                  <div className="d-flex gap-2">
                    <span>
                      <span className="round-8 text-bg-primary rounded-circle d-inline-block" />
                    </span>
                    <span>Your data updates every 3 hours</span>
                  </div>
                </div>
                <div className="ms-auto d-flex align-items-stretch gap-2">
                  <a href="javascript:void(0)" className="btn btn-primary">
                    <i className="ti ti-download fs-6" />
                  </a>
                </div>
              </div>
            </div>
            <div id="activity-status" />
          </div>
        </div>
        <div className="col-lg-12">
          <div className="card">
            <div className="card-body">
              <div className="d-md-flex align-items-center mb-9">
                <div>
                  <h5 className="card-title fw-semibold">Order Status</h5>
                  <p className="card-subtitle">
                    How to Check Your Order Status Online
                  </p>
                </div>
                <div className="ms-auto mt-4 mt-md-0">
                  <ul className="nav nav-tabs" role="tablist">
                    <li className="nav-item">
                      <a
                        className="nav-link rounded active"
                        data-bs-toggle="tab"
                        href="index5.html#home"
                        role="tab"
                      >
                        <span>Checkout</span>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link rounded"
                        data-bs-toggle="tab"
                        href="index5.html#profile"
                        role="tab"
                      >
                        <span>Paid</span>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link rounded"
                        data-bs-toggle="tab"
                        href="index5.html#messages"
                        role="tab"
                      >
                        <span>Packed</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              {/* Tab panes */}
              <div className="tab-content mt-3">
                <div className="tab-pane active" id="home" role="tabpanel">
                  <div className="table-responsive">
                    <table className="table align-middle mb-0 text-nowrap">
                      <tbody>
                        <tr>
                          <td className="ps-0">
                            <div className="d-flex align-items-center gap-3">
                              <div className="flex-shrink-0">
                                <img
                                  src="assets/images/products/product-1.jpg"
                                  className="rounded"
                                  alt="p1"
                                  width={80}
                                />
                              </div>
                              <div>
                                <h6 className="mb-0 fw-semibold">
                                  Irpun Wicaksono
                                </h6>
                                <span className="fs-2">irpun@gmail.com</span>
                              </div>
                            </div>
                          </td>
                          <td className="ps-0">
                            <span>React Js - Online Classes</span>
                          </td>
                          <td className="ps-0">
                            <h6 className="mb-0">$50.00</h6>
                          </td>
                          <td className="text-end ps-0">
                            <span className="badge bg-warning-subtle text-warning rounded-pill">
                              <span className="round-8 text-bg-warning rounded-circle d-inline-block me-1" />
                              progress
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td className="ps-0">
                            <div className="d-flex align-items-center gap-3">
                              <div className="flex-shrink-0">
                                <img
                                  src="assets/images/products/product-2.jpg"
                                  className="rounded"
                                  alt="p2"
                                  width={80}
                                />
                              </div>
                              <div>
                                <h6 className="mb-0 fw-semibold">
                                  Oyhan Ruhiyan
                                </h6>
                                <span className="fs-2">oyhan@gmail.com</span>
                              </div>
                            </div>
                          </td>
                          <td className="ps-0">
                            <span>Frontend Dev - Online Classes</span>
                          </td>
                          <td className="ps-0">
                            <h6 className="mb-0">$49.00</h6>
                          </td>
                          <td className="text-end ps-0">
                            <span className="badge bg-success-subtle text-success rounded-pill">
                              <span className="round-8 text-bg-success rounded-circle d-inline-block me-1" />
                              delivered
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td className="ps-0">
                            <div className="d-flex align-items-center gap-3">
                              <div className="flex-shrink-0">
                                <img
                                  src="assets/images/products/product-3.jpg"
                                  className="rounded"
                                  alt="p3"
                                  width={80}
                                />
                              </div>
                              <div>
                                <h6 className="mb-0 fw-semibold">
                                  Dayat Santoso
                                </h6>
                                <span className="fs-2">dayat@gmail.com</span>
                              </div>
                            </div>
                          </td>
                          <td className="ps-0">
                            <span>UX Research - Power Courses</span>
                          </td>
                          <td className="ps-0">
                            <h6 className="mb-0">$79.00</h6>
                          </td>
                          <td className="text-end ps-0">
                            <span className="badge bg-danger-subtle text-danger rounded-pill">
                              <span className="round-8 text-bg-danger rounded-circle d-inline-block me-1" />
                              cancel
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td className="ps-0">
                            <div className="d-flex align-items-center gap-3">
                              <div className="flex-shrink-0">
                                <img
                                  src="assets/images/products/product-4.jpg"
                                  className="rounded"
                                  alt="p4"
                                  width={80}
                                />
                              </div>
                              <div>
                                <h6 className="mb-0 fw-semibold">
                                  Irpun Wicaksono
                                </h6>
                                <span className="fs-2">irpun@gmail.com</span>
                              </div>
                            </div>
                          </td>
                          <td className="ps-0">
                            <span>React Js - Online Classes</span>
                          </td>
                          <td className="ps-0">
                            <h6 className="mb-0">$50.00</h6>
                          </td>
                          <td className="text-end ps-0">
                            <span className="badge bg-success-subtle text-success rounded-pill">
                              <span className="round-8 text-bg-success rounded-circle d-inline-block me-1" />
                              delivered
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="tab-pane" id="profile" role="tabpanel">
                  <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0 text-nowrap">
                      <tbody>
                        <tr>
                          <td className="ps-0">
                            <div className="d-flex align-items-center gap-3">
                              <div className="flex-shrink-0">
                                <img
                                  src="assets/images/products/product-2.jpg"
                                  className="rounded"
                                  alt="p2"
                                  width={80}
                                />
                              </div>
                              <div>
                                <h6 className="mb-0 fw-semibold">
                                  Oyhan Ruhiyan
                                </h6>
                                <span className="fs-2">oyhan@gmail.com</span>
                              </div>
                            </div>
                          </td>
                          <td className="ps-0">
                            <span>Frontend Dev - Online Classes</span>
                          </td>
                          <td className="ps-0">
                            <h6 className="mb-0">$49.00</h6>
                          </td>
                          <td className="text-end ps-0">
                            <span className="badge bg-success-subtle text-success rounded-pill">
                              <span className="round-8 text-bg-success rounded-circle d-inline-block me-1" />
                              delivered
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td className="ps-0">
                            <div className="d-flex align-items-center gap-3">
                              <div className="flex-shrink-0">
                                <img
                                  src="assets/images/products/product-1.jpg"
                                  className="rounded"
                                  alt="p1"
                                  width={80}
                                />
                              </div>
                              <div>
                                <h6 className="mb-0 fw-semibold">
                                  Irpun Wicaksono
                                </h6>
                                <span className="fs-2">irpun@gmail.com</span>
                              </div>
                            </div>
                          </td>
                          <td className="ps-0">
                            <span>React Js - Online Classes</span>
                          </td>
                          <td className="ps-0">
                            <h6 className="mb-0">$50.00</h6>
                          </td>
                          <td className="text-end ps-0">
                            <span className="badge bg-warning-subtle text-warning rounded-pill">
                              <span className="round-8 text-bg-warning rounded-circle d-inline-block me-1" />
                              progress
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td className="ps-0">
                            <div className="d-flex align-items-center gap-3">
                              <div className="flex-shrink-0">
                                <img
                                  src="assets/images/products/product-3.jpg"
                                  className="rounded"
                                  alt="p3"
                                  width={80}
                                />
                              </div>
                              <div>
                                <h6 className="mb-0 fw-semibold">
                                  Dayat Santoso
                                </h6>
                                <span className="fs-2">dayat@gmail.com</span>
                              </div>
                            </div>
                          </td>
                          <td className="ps-0">
                            <span>UX Research - Power Courses</span>
                          </td>
                          <td className="ps-0">
                            <h6 className="mb-0">$79.00</h6>
                          </td>
                          <td className="text-end ps-0">
                            <span className="badge bg-danger-subtle text-danger rounded-pill">
                              <span className="round-8 text-bg-danger rounded-circle d-inline-block me-1" />
                              cancel
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td className="ps-0">
                            <div className="d-flex align-items-center gap-3">
                              <div className="flex-shrink-0">
                                <img
                                  src="assets/images/products/product-4.jpg"
                                  className="rounded"
                                  alt="p4"
                                  width={80}
                                />
                              </div>
                              <div>
                                <h6 className="mb-0 fw-semibold">
                                  Irpun Wicaksono
                                </h6>
                                <span className="fs-2">irpun@gmail.com</span>
                              </div>
                            </div>
                          </td>
                          <td className="ps-0">
                            <span>React Js - Online Classes</span>
                          </td>
                          <td className="ps-0">
                            <h6 className="mb-0">$50.00</h6>
                          </td>
                          <td className="text-end ps-0">
                            <span className="badge bg-success-subtle text-success rounded-pill">
                              <span className="round-8 text-bg-success rounded-circle d-inline-block me-1" />
                              delivered
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="tab-pane" id="messages" role="tabpanel">
                  <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0 text-nowrap">
                      <tbody>
                        <tr>
                          <td className="ps-0">
                            <div className="d-flex align-items-center gap-3">
                              <div className="flex-shrink-0">
                                <img
                                  src="assets/images/products/product-4.jpg"
                                  className="rounded"
                                  alt="p4"
                                  width={80}
                                />
                              </div>
                              <div>
                                <h6 className="mb-0 fw-semibold">
                                  Irpun Wicaksono
                                </h6>
                                <span className="fs-2">irpun@gmail.com</span>
                              </div>
                            </div>
                          </td>
                          <td className="ps-0">
                            <span>React Js - Online Classes</span>
                          </td>
                          <td className="ps-0">
                            <h6 className="mb-0">$50.00</h6>
                          </td>
                          <td className="text-end ps-0">
                            <a
                              href="javascript:void(0)"
                              className="badge bg-success-subtle text-success rounded-pill"
                            >
                              <span className="round-8 text-bg-success rounded-circle d-inline-block me-1" />
                              delivered
                            </a>
                          </td>
                        </tr>
                        <tr>
                          <td className="ps-0">
                            <div className="d-flex align-items-center gap-3">
                              <div className="flex-shrink-0">
                                <img
                                  src="assets/images/products/product-1.jpg"
                                  className="rounded"
                                  alt="p1"
                                  width={80}
                                />
                              </div>
                              <div>
                                <h6 className="mb-0 fw-semibold">
                                  Irpun Wicaksono
                                </h6>
                                <span className="fs-2">irpun@gmail.com</span>
                              </div>
                            </div>
                          </td>
                          <td className="ps-0">
                            <span>React Js - Online Classes</span>
                          </td>
                          <td className="ps-0">
                            <h6 className="mb-0">$50.00</h6>
                          </td>
                          <td className="text-end ps-0">
                            <span className="badge bg-warning-subtle text-warning rounded-pill">
                              <span className="round-8 text-bg-warning rounded-circle d-inline-block me-1" />
                              progress
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td className="ps-0">
                            <div className="d-flex align-items-center gap-3">
                              <div className="flex-shrink-0">
                                <img
                                  src="assets/images/products/product-2.jpg"
                                  className="rounded"
                                  alt="p2"
                                  width={80}
                                />
                              </div>
                              <div>
                                <h6 className="mb-0 fw-semibold">
                                  Oyhan Ruhiyan
                                </h6>
                                <span className="fs-2">oyhan@gmail.com</span>
                              </div>
                            </div>
                          </td>
                          <td className="ps-0">
                            <span>Frontend Dev - Online Classes</span>
                          </td>
                          <td className="ps-0">
                            <h6 className="mb-0">$49.00</h6>
                          </td>
                          <td className="text-end ps-0">
                            <span className="badge bg-success-subtle text-success rounded-pill">
                              <span className="round-8 text-bg-success rounded-circle d-inline-block me-1" />
                              delivered
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td className="ps-0">
                            <div className="d-flex align-items-center gap-3">
                              <div className="flex-shrink-0">
                                <img
                                  src="assets/images/products/product-3.jpg"
                                  className="rounded"
                                  alt="p3"
                                  width={80}
                                />
                              </div>
                              <div>
                                <h6 className="mb-0 fw-semibold">
                                  Dayat Santoso
                                </h6>
                                <span className="fs-2">dayat@gmail.com</span>
                              </div>
                            </div>
                          </td>
                          <td className="ps-0">
                            <span>UX Research - Power Courses</span>
                          </td>
                          <td className="ps-0">
                            <h6 className="mb-0">$79.00</h6>
                          </td>
                          <td className="text-end ps-0">
                            <span className="badge bg-danger-subtle text-danger rounded-pill">
                              <span className="round-8 text-bg-danger rounded-circle d-inline-block me-1" />
                              cancel
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-5 d-flex align-items-stretch">
          <div className="card w-100">
            <div className="card-body">
              <h5 className="card-title fw-semibold">Tasks</h5>
              <p className="card-subtitle">
                The Power of Prioritizing Your Tasks
              </p>
              <div className="mt-4 pb-3 border-bottom">
                <div className="d-flex align-items-center">
                  <span className="bg-primary-subtle text-primary badge">
                    Inprogress
                  </span>
                  <span className="fs-3 ms-auto">8 March 2020</span>
                </div>
                <h6 className="mt-3">NFT Landing Page</h6>
                <span className="fs-3 lh-sm">
                  Designing an NFT-themed website with a creative concept so th...
                </span>
                <div className="hstack gap-3 mt-3">
                  <a
                    href="index5.html#"
                    className="fs-3 text-bodycolor d-flex align-items-center text-decoration-none"
                  >
                    <i className="ti ti-clipboard fs-6 text-primary me-2 d-flex" />{" "}
                    2 Tasks{" "}
                  </a>
                  <a
                    href="index5.html#"
                    className="fs-3 text-bodycolor d-flex align-items-center text-decoration-none"
                  >
                    <i className="ti ti-message-dots fs-6 text-primary me-2 d-flex" />{" "}
                    13 Commets{" "}
                  </a>
                </div>
              </div>
              <div className="py-3 border-bottom">
                <div className="d-flex align-items-center">
                  <span className="bg-danger-subtle text-danger badge">
                    Inpending
                  </span>
                  <span className="fs-3 ms-auto">8 Jan 2024</span>
                </div>
                <h6 className="mt-3">Dashboard Finanace Management</h6>
                <span className="fs-3 lh-sm">
                  Designing an NFT-themed website with a creative concept so th...
                </span>
                <div className="hstack gap-3 mt-3">
                  <a
                    href="index5.html#"
                    className="fs-3 text-bodycolor d-flex align-items-center text-decoration-none"
                  >
                    <i className="ti ti-clipboard fs-6 text-primary me-2 d-flex" />{" "}
                    4 Tasks{" "}
                  </a>
                  <a
                    href="index5.html#"
                    className="fs-3 text-bodycolor d-flex align-items-center text-decoration-none"
                  >
                    <i className="ti ti-message-dots fs-6 text-primary me-2 d-flex" />{" "}
                    50 Commets{" "}
                  </a>
                </div>
              </div>
              <div className="pt-3">
                <div className="d-flex align-items-center">
                  <span className="bg-success-subtle text-success badge">
                    Completed
                  </span>
                  <span className="fs-3 ms-auto">8 Feb 2024</span>
                </div>
                <h6 className="mt-3">Logo Branding</h6>
                <span className="fs-3 lh-sm">
                  Designing an NFT-themed website with a creative concept so th...
                </span>
                <div className="hstack gap-3 mt-3">
                  <a
                    href="index5.html#"
                    className="fs-3 text-bodycolor d-flex align-items-center text-decoration-none"
                  >
                    <i className="ti ti-clipboard fs-6 text-primary me-2 d-flex" />{" "}
                    1 Task{" "}
                  </a>
                  <a
                    href="index5.html#"
                    className="fs-3 text-bodycolor d-flex align-items-center text-decoration-none"
                  >
                    <i className="ti ti-message-dots fs-6 text-primary me-2 d-flex" />{" "}
                    12 Commets{" "}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-7 d-flex align-items-stretch">
          <div className="card w-100">
            <div className="card-body border-bottom">
              <div className="d-md-flex align-items-center">
                <div>
                  <h5 className="card-title fw-semibold">Team Performance</h5>
                  <p className="card-subtitle">How to Measure Team Performance</p>
                </div>
                <div className="ms-auto mt-4 mt-md-0">
                  <div className="hstack">
                    <a
                      href="javascript:void(0)"
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title="John Deo"
                    >
                      <img
                        src="assets/images/profile/user-1.jpg"
                        className="rounded-circle border border-2 border-white"
                        width={35}
                        alt="u1"
                      />
                    </a>
                    <a
                      href="javascript:void(0)"
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title="Mark Smith"
                      className="ms-n2"
                    >
                      <img
                        src="assets/images/profile/user-2.jpg"
                        className="rounded-circle border border-2 border-white"
                        width={35}
                        alt="u2"
                      />
                    </a>
                    <a
                      href="javascript:void(0)"
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title="Jonthan Leo"
                      className="ms-n2"
                    >
                      <img
                        src="assets/images/profile/user-3.jpg"
                        className="rounded-circle border border-2 border-white"
                        width={35}
                        alt="u3"
                      />
                    </a>
                  </div>
                </div>
              </div>
              <div className="row mt-4">
                <div className="col-md-6">
                  <div className="hstack p-3 border rounded mb-3 mb-md-0">
                    <a
                      href="javascript:void(0)"
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title="John Deo"
                    >
                      <img
                        src="assets/images/profile/user-1.jpg"
                        className="rounded-circle border border-2 border-white"
                        width={30}
                        alt="u4"
                      />
                    </a>
                    <a
                      href="javascript:void(0)"
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title="Mark Smith"
                      className="ms-n2"
                    >
                      <img
                        src="assets/images/profile/user-2.jpg"
                        className="rounded-circle border border-2 border-white"
                        width={30}
                        alt="u2"
                      />
                    </a>
                    <div className="ms-3">
                      <h6 className="mb-0 fs-3">Monster Dashboard</h6>
                      <span className="fs-2">46%</span>
                      <span className="fs-2 ms-4">Due in 3 days</span>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="hstack p-3 border rounded">
                    <a
                      href="javascript:void(0)"
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title="John Deo"
                    >
                      <img
                        src="assets/images/profile/user-3.jpg"
                        className="rounded-circle border border-2 border-white"
                        width={30}
                        alt="u3"
                      />
                    </a>
                    <a
                      href="javascript:void(0)"
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title="Mark Smith"
                      className="ms-n2"
                    >
                      <img
                        src="assets/images/profile/user-4.jpg"
                        className="rounded-circle border border-2 border-white"
                        width={30}
                        alt="u4"
                      />
                    </a>
                    <div className="ms-3">
                      <h6 className="mb-0 fs-3">Xtreme Dashboard</h6>
                      <span className="fs-2">87%</span>
                      <span className="fs-2 ms-4">Due in 7 days</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <div id="team-performance" />
              </div>
              <div className="text-center">
                <span className="d-block">
                  Your team performance is 5% better this week.
                </span>
                <a href="javascript:void(0)" className="btn btn-primary mt-4">
                  View Details
                </a>
              </div>
            </div>
            <div className="p-3">
              <div className="hstack gap-3 justify-content-center">
                <div>
                  <span>
                    <span className="round-8 text-bg-primary rounded-circle d-inline-block me-2" />
                  </span>
                  <span className="fs-3 text-dark">Completed 124</span>
                </div>
                <div>
                  <span>
                    <span className="round-8 text-bg-danger rounded-circle d-inline-block me-2" />
                  </span>
                  <span className="fs-3 text-dark">Percentage 86%</span>
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

export default General
