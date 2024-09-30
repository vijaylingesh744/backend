import React from 'react'

const AccountSetting = () => {
  return (
    <div className="body-wrapper">
      <div className="container-fluid">
        <div className="card bg-info-subtle shadow-none position-relative overflow-hidden mb-4">
          <div className="card-body px-4 py-3">
            <div className="row align-items-center">
              <div className="col-9">
                <h4 className="fw-semibold mb-8">Account Setting</h4>
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a
                        className="text-muted text-decoration-none"
                        href="../main/index.html"
                      >
                        Home
                      </a>
                    </li>
                    <li className="breadcrumb-item" aria-current="page">
                      Account Setting
                    </li>
                  </ol>
                </nav>
              </div>
              <div className="col-3">
                <div className="text-center mb-n5">
                  <img
                    src="../assets/images/breadcrumb/ChatBc.png"
                    alt=""
                    className="img-fluid mb-n4"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card">
          <ul
            className="nav nav-pills user-profile-tab"
            id="pills-tab"
            role="tablist">
            <li className="nav-item" role="presentation">
              <button
                className="nav-link position-relative rounded-0 d-flex align-items-center justify-content-center bg-transparent fs-3 py-4 active"
                id="pills-account-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-account"
                type="button"
                role="tab"
                aria-controls="pills-account"
                aria-selected="true"
              >
                <i className="ti ti-user-circle me-2 fs-6" />
                <span className="d-none d-md-block">Account</span>
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="nav-link position-relative rounded-0 d-flex align-items-center justify-content-center bg-transparent fs-3 py-4"
                id="pills-notifications-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-notifications"
                type="button"
                role="tab"
                aria-controls="pills-notifications"
                aria-selected="false"
                tabIndex={-1}
              >
                <i className="ti ti-bell me-2 fs-6" />
                <span className="d-none d-md-block">Notifications</span>
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="nav-link position-relative rounded-0 d-flex align-items-center justify-content-center bg-transparent fs-3 py-4"
                id="pills-bills-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-bills"
                type="button"
                role="tab"
                aria-controls="pills-bills"
                aria-selected="false"
                tabIndex={-1}
              >
                <i className="ti ti-article me-2 fs-6" />
                <span className="d-none d-md-block">Bills</span>
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="nav-link position-relative rounded-0 d-flex align-items-center justify-content-center bg-transparent fs-3 py-4"
                id="pills-security-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-security"
                type="button"
                role="tab"
                aria-controls="pills-security"
                aria-selected="false"
                tabIndex={-1}
              >
                <i className="ti ti-lock me-2 fs-6" />
                <span className="d-none d-md-block">Security</span>
              </button>
            </li>
          </ul>
          <div className="card-body">
            <div className="tab-content" id="pills-tabContent">
              <div
                className="tab-pane fade active show"
                id="pills-account"
                role="tabpanel"
                aria-labelledby="pills-account-tab"
                tabIndex={0}
              >
                <div className="row">
                  <div className="col-lg-6 d-flex align-items-stretch">
                    <div className="card w-100 position-relative overflow-hidden">
                      <div className="card-body p-4">
                        <h5 className="card-title fw-semibold">Change Profile</h5>
                        <p className="card-subtitle mb-4">
                          Change your profile picture from here
                        </p>
                        <div className="text-center">
                          <img
                            src="../assets/images/profile/user-1.jpg"
                            alt=""
                            className="img-fluid rounded-circle"
                            width={120}
                            height={120}
                          />
                          <div className="d-flex align-items-center justify-content-center my-4 gap-6">
                            <button className="btn btn-primary">Upload</button>
                            <button className="btn bg-danger-subtle text-danger">
                              Reset
                            </button>
                          </div>
                          <p className="mb-0">
                            Allowed JPG, GIF or PNG. Max size of 800K
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 d-flex align-items-stretch">
                    <div className="card w-100 position-relative overflow-hidden">
                      <div className="card-body p-4">
                        <h5 className="card-title fw-semibold">Change Password</h5>
                        <p className="card-subtitle mb-4">
                          To change your password please confirm here
                        </p>
                        <form>
                          <div className="mb-3">
                            <label
                              htmlFor="exampleInputPassword1"
                              className="form-label"
                            >
                              Current Password
                            </label>
                            <input
                              type="password"
                              className="form-control"
                              id="exampleInputPassword1"
                              defaultValue={12345678910}
                            />
                          </div>
                          <div className="mb-3">
                            <label
                              htmlFor="exampleInputPassword2"
                              className="form-label"
                            >
                              New Password
                            </label>
                            <input
                              type="password"
                              className="form-control"
                              id="exampleInputPassword2"
                              defaultValue={12345678910}
                            />
                          </div>
                          <div className="">
                            <label
                              htmlFor="exampleInputPassword3"
                              className="form-label"
                            >
                              Confirm Password
                            </label>
                            <input
                              type="password"
                              className="form-control"
                              id="exampleInputPassword3"
                              defaultValue={12345678910}
                            />
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="card w-100 position-relative overflow-hidden mb-0">
                      <div className="card-body p-4">
                        <h5 className="card-title fw-semibold">Personal Details</h5>
                        <p className="card-subtitle mb-4">
                          To change your personal detail , edit and save from here
                        </p>
                        <form>
                          <div className="row">
                            <div className="col-lg-6">
                              <div className="mb-3">
                                <label
                                  htmlFor="exampleInputtext"
                                  className="form-label"
                                >
                                  Your Name
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="exampleInputtext"
                                  placeholder="Mathew Anderson"
                                />
                              </div>
                              <div className="mb-3">
                                <label className="form-label">Location</label>
                                <select
                                  className="form-select"
                                  aria-label="Default select example"
                                >
                                  <option selected="">United Kingdom</option>
                                  <option value={1}>United States</option>
                                  <option value={2}>United Kingdom</option>
                                  <option value={3}>India</option>
                                  <option value={3}>Russia</option>
                                </select>
                              </div>
                              <div className="mb-3">
                                <label
                                  htmlFor="exampleInputtext1"
                                  className="form-label"
                                >
                                  Email
                                </label>
                                <input
                                  type="email"
                                  className="form-control"
                                  id="exampleInputtext1"
                                  placeholder="info@modernize.com"
                                />
                              </div>
                            </div>
                            <div className="col-lg-6">
                              <div className="mb-3">
                                <label
                                  htmlFor="exampleInputtext2"
                                  className="form-label"
                                >
                                  Store Name
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="exampleInputtext2"
                                  placeholder="Maxima Studio"
                                />
                              </div>
                              <div className="mb-3">
                                <label className="form-label">Currency</label>
                                <select
                                  className="form-select"
                                  aria-label="Default select example"
                                >
                                  <option selected="">India (INR)</option>
                                  <option value={1}>US Dollar ($)</option>
                                  <option value={2}>United Kingdom (Pound)</option>
                                  <option value={3}>India (INR)</option>
                                  <option value={3}>Russia (Ruble)</option>
                                </select>
                              </div>
                              <div className="mb-3">
                                <label
                                  htmlFor="exampleInputtext3"
                                  className="form-label"
                                >
                                  Phone
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="exampleInputtext3"
                                  placeholder="+91 12345 65478"
                                />
                              </div>
                            </div>
                            <div className="col-12">
                              <div className="">
                                <label
                                  htmlFor="exampleInputtext4"
                                  className="form-label"
                                >
                                  Address
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="exampleInputtext4"
                                  placeholder="814 Howard Street, 120065, India"
                                />
                              </div>
                            </div>
                            <div className="col-12">
                              <div className="d-flex align-items-center justify-content-end mt-4 gap-6">
                                <button className="btn btn-primary">Save</button>
                                <button className="btn bg-danger-subtle text-danger">
                                  Cancel
                                </button>
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="tab-pane fade"
                id="pills-notifications"
                role="tabpanel"
                aria-labelledby="pills-notifications-tab"
                tabIndex={0}
              >
                <div className="row justify-content-center">
                  <div className="col-lg-9">
                    <div className="card">
                      <div className="card-body p-4">
                        <h4 className="fw-semibold mb-3">Notification Preferences</h4>
                        <p>
                          Select the notificaitons ou would like to receive via email.
                          Please note that you cannot opt out of receving service
                          messages, such as payment, security or legal notifications.
                        </p>
                        <form className="mb-7">
                          <label htmlFor="exampleInputtext5" className="form-label">
                            Email Address*
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="exampleInputtext5"
                            placeholder=""
                            required=""
                          />
                          <p className="mb-0">Required for notificaitons.</p>
                        </form>
                        <div className="">
                          <div className="d-flex align-items-center justify-content-between mb-4">
                            <div className="d-flex align-items-center gap-3">
                              <div className="text-bg-light rounded-1 p-6 d-flex align-items-center justify-content-center">
                                <i
                                  className="ti ti-article text-dark d-block fs-7"
                                  width={22}
                                  height={22}
                                />
                              </div>
                              <div>
                                <h5 className="fs-4 fw-semibold">Our newsletter</h5>
                                <p className="mb-0">
                                  We'll always let you know about important changes
                                </p>
                              </div>
                            </div>
                            <div className="form-check form-switch mb-0">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                role="switch"
                                id="flexSwitchCheckChecked"
                              />
                            </div>
                          </div>
                          <div className="d-flex align-items-center justify-content-between mb-4">
                            <div className="d-flex align-items-center gap-3">
                              <div className="text-bg-light rounded-1 p-6 d-flex align-items-center justify-content-center">
                                <i
                                  className="ti ti-checkbox text-dark d-block fs-7"
                                  width={22}
                                  height={22}
                                />
                              </div>
                              <div>
                                <h5 className="fs-4 fw-semibold">
                                  Order Confirmation
                                </h5>
                                <p className="mb-0">
                                  You will be notified when customer order any product
                                </p>
                              </div>
                            </div>
                            <div className="form-check form-switch mb-0">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                role="switch"
                                id="flexSwitchCheckChecked1"
                                defaultChecked=""
                              />
                            </div>
                          </div>
                          <div className="d-flex align-items-center justify-content-between mb-4">
                            <div className="d-flex align-items-center gap-3">
                              <div className="text-bg-light rounded-1 p-6 d-flex align-items-center justify-content-center">
                                <i
                                  className="ti ti-clock-hour-4 text-dark d-block fs-7"
                                  width={22}
                                  height={22}
                                />
                              </div>
                              <div>
                                <h5 className="fs-4 fw-semibold">
                                  Order Status Changed
                                </h5>
                                <p className="mb-0">
                                  You will be notified when customer make changes to
                                  the order
                                </p>
                              </div>
                            </div>
                            <div className="form-check form-switch mb-0">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                role="switch"
                                id="flexSwitchCheckChecked2"
                                defaultChecked=""
                              />
                            </div>
                          </div>
                          <div className="d-flex align-items-center justify-content-between mb-4">
                            <div className="d-flex align-items-center gap-3">
                              <div className="text-bg-light rounded-1 p-6 d-flex align-items-center justify-content-center">
                                <i
                                  className="ti ti-truck-delivery text-dark d-block fs-7"
                                  width={22}
                                  height={22}
                                />
                              </div>
                              <div>
                                <h5 className="fs-4 fw-semibold">Order Delivered</h5>
                                <p className="mb-0">
                                  You will be notified once the order is delivered
                                </p>
                              </div>
                            </div>
                            <div className="form-check form-switch mb-0">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                role="switch"
                                id="flexSwitchCheckChecked3"
                              />
                            </div>
                          </div>
                          <div className="d-flex align-items-center justify-content-between">
                            <div className="d-flex align-items-center gap-3">
                              <div className="text-bg-light rounded-1 p-6 d-flex align-items-center justify-content-center">
                                <i
                                  className="ti ti-mail text-dark d-block fs-7"
                                  width={22}
                                  height={22}
                                />
                              </div>
                              <div>
                                <h5 className="fs-4 fw-semibold">
                                  Email Notification
                                </h5>
                                <p className="mb-0">
                                  Turn on email notificaiton to get updates through
                                  email
                                </p>
                              </div>
                            </div>
                            <div className="form-check form-switch mb-0">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                role="switch"
                                id="flexSwitchCheckChecked4"
                                defaultChecked=""
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-9">
                    <div className="card">
                      <div className="card-body p-4">
                        <h4 className="fw-semibold mb-3">Date &amp; Time</h4>
                        <p>Time zones and calendar display settings.</p>
                        <div className="d-flex align-items-center justify-content-between mt-7">
                          <div className="d-flex align-items-center gap-3">
                            <div className="text-bg-light rounded-1 p-6 d-flex align-items-center justify-content-center">
                              <i
                                className="ti ti-clock-hour-4 text-dark d-block fs-7"
                                width={22}
                                height={22}
                              />
                            </div>
                            <div>
                              <p className="mb-0">Time zone</p>
                              <h5 className="fs-4 fw-semibold">
                                (UTC + 02:00) Athens, Bucharet
                              </h5>
                            </div>
                          </div>
                          <a
                            className="text-dark fs-6 d-flex align-items-center justify-content-center bg-transparent p-2 fs-4 rounded-circle"
                            href="javascript:void(0)"
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            data-bs-title="Download"
                          >
                            <i className="ti ti-download" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-9">
                    <div className="card">
                      <div className="card-body p-4">
                        <h4 className="fw-semibold mb-3">Ignore Tracking</h4>
                        <div className="d-flex align-items-center justify-content-between mt-7">
                          <div className="d-flex align-items-center gap-3">
                            <div className="text-bg-light rounded-1 p-6 d-flex align-items-center justify-content-center">
                              <i
                                className="ti ti-player-pause text-dark d-block fs-7"
                                width={22}
                                height={22}
                              />
                            </div>
                            <div>
                              <h5 className="fs-4 fw-semibold">
                                Ignore Browser Tracking
                              </h5>
                              <p className="mb-0">Browser Cookie</p>
                            </div>
                          </div>
                          <div className="form-check form-switch mb-0">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              role="switch"
                              id="flexSwitchCheckChecked5"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="d-flex align-items-center justify-content-end gap-6">
                      <button className="btn btn-primary">Save</button>
                      <button className="btn bg-danger-subtle text-danger">
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="tab-pane fade"
                id="pills-bills"
                role="tabpanel"
                aria-labelledby="pills-bills-tab"
                tabIndex={0}
              >
                <div className="row justify-content-center">
                  <div className="col-lg-9">
                    <div className="card">
                      <div className="card-body p-4">
                        <h4 className="fw-semibold mb-3">Billing Information</h4>
                        <form>
                          <div className="row">
                            <div className="col-lg-6">
                              <div className="mb-3">
                                <label
                                  htmlFor="exampleInputtext6"
                                  className="form-label"
                                >
                                  Business Name*
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="exampleInputtext6"
                                  placeholder="Visitor Analytics"
                                />
                              </div>
                              <div className="mb-3">
                                <label
                                  htmlFor="exampleInputtext7"
                                  className="form-label"
                                >
                                  Business Address*
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="exampleInputtext7"
                                  placeholder=""
                                />
                              </div>
                              <div className="">
                                <label
                                  htmlFor="exampleInputtext8"
                                  className="form-label"
                                >
                                  First Name*
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="exampleInputtext8"
                                  placeholder=""
                                />
                              </div>
                            </div>
                            <div className="col-lg-6">
                              <div className="mb-3">
                                <label
                                  htmlFor="exampleInputtext9"
                                  className="form-label"
                                >
                                  Business Sector*
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="exampleInputtext9"
                                  placeholder="Arts, Media & Entertainment"
                                />
                              </div>
                              <div className="mb-3">
                                <label
                                  htmlFor="exampleInputtext10"
                                  className="form-label"
                                >
                                  Country*
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="exampleInputtext10"
                                  placeholder="Romania"
                                />
                              </div>
                              <div className="">
                                <label
                                  htmlFor="exampleInputtext11"
                                  className="form-label"
                                >
                                  Last Name*
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="exampleInputtext11"
                                  placeholder=""
                                />
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-9">
                    <div className="card">
                      <div className="card-body p-4">
                        <h4 className="fw-semibold mb-3">
                          Current Plan :{" "}
                          <span className="text-success">Executive</span>
                        </h4>
                        <p>
                          Thanks for being a premium member and supporting our
                          development.
                        </p>
                        <div className="d-flex align-items-center justify-content-between mt-7 mb-3">
                          <div className="d-flex align-items-center gap-3">
                            <div className="text-bg-light rounded-1 p-6 d-flex align-items-center justify-content-center">
                              <i
                                className="ti ti-package text-dark d-block fs-7"
                                width={22}
                                height={22}
                              />
                            </div>
                            <div>
                              <p className="mb-0">Current Plan</p>
                              <h5 className="fs-4 fw-semibold">
                                750.000 Monthly Visits
                              </h5>
                            </div>
                          </div>
                          <a
                            className="text-dark fs-6 d-flex align-items-center justify-content-center bg-transparent p-2 fs-4 rounded-circle"
                            href="javascript:void(0)"
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            data-bs-title="Add"
                          >
                            <i className="ti ti-circle-plus" />
                          </a>
                        </div>
                        <div className="d-flex align-items-center gap-3">
                          <button className="btn btn-primary">Change Plan</button>
                          <button className="btn bg-danger-subtle text-danger">
                            Reset Plan
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-9">
                    <div className="card">
                      <div className="card-body p-4">
                        <h4 className="fw-semibold mb-3">Payment Method</h4>
                        <p>On 26 December, 2024</p>
                        <div className="d-flex align-items-center justify-content-between mt-7">
                          <div className="d-flex align-items-center gap-3">
                            <div className="text-bg-light rounded-1 p-6 d-flex align-items-center justify-content-center">
                              <i
                                className="ti ti-credit-card text-dark d-block fs-7"
                                width={22}
                                height={22}
                              />
                            </div>
                            <div>
                              <h5 className="fs-4 fw-semibold">Visa</h5>
                              <p className="mb-0 text-dark">*****2102</p>
                            </div>
                          </div>
                          <a
                            className="text-dark fs-6 d-flex align-items-center justify-content-center bg-transparent p-2 fs-4 rounded-circle"
                            href="javascript:void(0)"
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            data-bs-title="Edit"
                          >
                            <i className="ti ti-pencil-minus" />
                          </a>
                        </div>
                        <p className="my-2">
                          If you updated your payment method, it will only be
                          dislpayed here after your next billing cycle.
                        </p>
                        <div className="d-flex align-items-center gap-3">
                          <button className="btn bg-danger-subtle text-danger">
                            Cancel Subscription
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="d-flex align-items-center justify-content-end gap-6">
                      <button className="btn btn-primary">Save</button>
                      <button className="btn bg-danger-subtle text-danger">
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="tab-pane fade"
                id="pills-security"
                role="tabpanel"
                aria-labelledby="pills-security-tab"
                tabIndex={0}
              >
                <div className="row">
                  <div className="col-lg-8">
                    <div className="card">
                      <div className="card-body p-4">
                        <h4 className="fw-semibold mb-3">
                          Two-factor Authentication
                        </h4>
                        <div className="d-flex align-items-center justify-content-between pb-7">
                          <p className="mb-0">
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                            Corporis sapiente sunt earum officiis laboriosam ut.
                          </p>
                          <button className="btn btn-primary">Enable</button>
                        </div>
                        <div className="d-flex align-items-center justify-content-between py-3 border-top">
                          <div>
                            <h5 className="fs-4 fw-semibold mb-0">
                              Authentication App
                            </h5>
                            <p className="mb-0">Google auth app</p>
                          </div>
                          <button className="btn bg-primary-subtle text-primary">
                            Setup
                          </button>
                        </div>
                        <div className="d-flex align-items-center justify-content-between py-3 border-top">
                          <div>
                            <h5 className="fs-4 fw-semibold mb-0">Another e-mail</h5>
                            <p className="mb-0">E-mail to send verification link</p>
                          </div>
                          <button className="btn bg-primary-subtle text-primary">
                            Setup
                          </button>
                        </div>
                        <div className="d-flex align-items-center justify-content-between py-3 border-top">
                          <div>
                            <h5 className="fs-4 fw-semibold mb-0">SMS Recovery</h5>
                            <p className="mb-0">Your phone number or something</p>
                          </div>
                          <button className="btn bg-primary-subtle text-primary">
                            Setup
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="card">
                      <div className="card-body p-4">
                        <div className="text-bg-light rounded-1 p-6 d-inline-flex align-items-center justify-content-center mb-3">
                          <i
                            className="ti ti-device-laptop text-primary d-block fs-7"
                            width={22}
                            height={22}
                          />
                        </div>
                        <h5 className="fs-5 fw-semibold mb-0">Devices</h5>
                        <p className="mb-3">
                          Lorem ipsum dolor sit amet consectetur adipisicing elit Rem.
                        </p>
                        <button className="btn btn-primary mb-4">
                          Sign out from all devices
                        </button>
                        <div className="d-flex align-items-center justify-content-between py-3 border-bottom">
                          <div className="d-flex align-items-center gap-3">
                            <i
                              className="ti ti-device-mobile text-dark d-block fs-7"
                              width={26}
                              height={26}
                            />
                            <div>
                              <h5 className="fs-4 fw-semibold mb-0">iPhone 14</h5>
                              <p className="mb-0">London UK, Oct 23 at 1:15 AM</p>
                            </div>
                          </div>
                          <a
                            className="text-dark fs-6 d-flex align-items-center justify-content-center bg-transparent p-2 fs-4 rounded-circle"
                            href="javascript:void(0)"
                          >
                            <i className="ti ti-dots-vertical" />
                          </a>
                        </div>
                        <div className="d-flex align-items-center justify-content-between py-3">
                          <div className="d-flex align-items-center gap-3">
                            <i
                              className="ti ti-device-laptop text-dark d-block fs-7"
                              width={26}
                              height={26}
                            />
                            <div>
                              <h5 className="fs-4 fw-semibold mb-0">Macbook Air</h5>
                              <p className="mb-0">Gujarat India, Oct 24 at 3:15 AM</p>
                            </div>
                          </div>
                          <a
                            className="text-dark fs-6 d-flex align-items-center justify-content-center bg-transparent p-2 fs-4 rounded-circle"
                            href="javascript:void(0)"
                          >
                            <i className="ti ti-dots-vertical" />
                          </a>
                        </div>
                        <button className="btn bg-primary-subtle text-primary w-100 py-1">
                          Need Help ?
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="d-flex align-items-center justify-content-end gap-6">
                      <button className="btn btn-primary">Save</button>
                      <button className="btn bg-danger-subtle text-danger">
                        Cancel
                      </button>
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

export default AccountSetting
