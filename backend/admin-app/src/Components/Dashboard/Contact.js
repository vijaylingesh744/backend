import React from 'react'

function Contact() {
  return (
    <div className="body-wrapper">
    <div className="container-fluid">
      <div className="card bg-info-subtle shadow-none position-relative overflow-hidden mb-4">
        <div className="card-body px-4 py-3">
          <div className="row align-items-center">
            <div className="col-9">
              <h4 className="fw-semibold mb-8">Contact</h4>
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
                    Contact
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
      <div className="widget-content searchable-container list">
        <div className="card card-body">
          <div className="row">
            <div className="col-md-4 col-xl-3">
              <form className="position-relative">
                <input
                  type="text"
                  className="form-control product-search ps-5"
                  id="input-search"
                  placeholder="Search Contacts..."
                />
                <i className="ti ti-search position-absolute top-50 start-0 translate-middle-y fs-6 text-dark ms-3" />
              </form>
            </div>
            <div className="col-md-8 col-xl-9 text-end d-flex justify-content-md-end justify-content-center mt-3 mt-md-0">
              <div className="action-btn show-btn" style={{ display: "none" }}>
                <a
                  href="javascript:void(0)"
                  className="delete-multiple bg-danger-subtle btn me-2 text-danger d-flex align-items-center font-medium"
                >
                  <i className="ti ti-trash text-danger me-1 fs-5" /> Delete All
                  Row
                </a>
              </div>
              <a
                href="javascript:void(0)"
                id="btn-add-contact"
                className="btn btn-primary d-flex align-items-center"
              >
                <i className="ti ti-users text-white me-1 fs-5" /> Add Contact
              </a>
            </div>
          </div>
        </div>
        {/* Modal */}
        <div
          className="modal fade"
          id="addContactModal"
          tabIndex={-1}
          role="dialog"
          aria-labelledby="addContactModalTitle"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header d-flex align-items-center">
                <h5 className="modal-title">Contact</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>
              <div className="modal-body">
                <div className="add-contact-box">
                  <div className="add-contact-content">
                    <form id="addContactModalTitle">
                      <div className="row">
                        <div className="col-md-6">
                          <div className="mb-3 contact-name">
                            <input
                              type="text"
                              id="c-name"
                              className="form-control"
                              placeholder="Name"
                            />
                            <span className="validation-text text-danger" />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="mb-3 contact-email">
                            <input
                              type="text"
                              id="c-email"
                              className="form-control"
                              placeholder="Email"
                            />
                            <span className="validation-text text-danger" />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="mb-3 contact-occupation">
                            <input
                              type="text"
                              id="c-occupation"
                              className="form-control"
                              placeholder="Occupation"
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="mb-3 contact-phone">
                            <input
                              type="text"
                              id="c-phone"
                              className="form-control"
                              placeholder="Phone"
                            />
                            <span className="validation-text text-danger" />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12">
                          <div className="mb-3 contact-location">
                            <input
                              type="text"
                              id="c-location"
                              className="form-control"
                              placeholder="Location"
                            />
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <div className="d-flex gap-6 m-0">
                  <button id="btn-add" className="btn btn-success rounded-pill">
                    Add
                  </button>
                  <button id="btn-edit" className="btn btn-success rounded-pill">
                    Save
                  </button>
                  <button
                    className="btn bg-danger-subtle text-danger rounded-pill"
                    data-bs-dismiss="modal"
                  >
                    {" "}
                    Discard{" "}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card card-body">
          <div className="table-responsive">
            <table className="table search-table align-middle text-nowrap">
              <thead className="header-item">
                <tr>
                  <th>
                    <div className="n-chk align-self-center text-center">
                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input primary"
                          id="contact-check-all"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="contact-check-all"
                        />
                        <span className="new-control-indicator" />
                      </div>
                    </div>
                  </th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Location</th>
                  <th>Phone</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {/* start row */}
                <tr className="search-items">
                  <td>
                    <div className="n-chk align-self-center text-center">
                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input contact-chkbox primary"
                          id="checkbox1"
                        />
                        <label className="form-check-label" htmlFor="checkbox1" />
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="d-flex align-items-center">
                      <img
                        src="assets/images/profile/user-1.jpg"
                        alt="avatar"
                        className="rounded-circle"
                        width={35}
                      />
                      <div className="ms-3">
                        <div className="user-meta-info">
                          <h6 className="user-name mb-0" data-name="Emma Adams">
                            Emma Adams
                          </h6>
                          <span
                            className="user-work fs-3"
                            data-occupation="Web Developer"
                          >
                            Web Developer
                          </span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="usr-email-addr" data-email="adams@mail.com">
                      adams@mail.com
                    </span>
                  </td>
                  <td>
                    <span className="usr-location" data-location="Boston, USA">
                      Boston, USA
                    </span>
                  </td>
                  <td>
                    <span className="usr-ph-no" data-phone="+1 (070) 123-4567">
                      +91 (070) 123-4567
                    </span>
                  </td>
                  <td>
                    <div className="action-btn">
                      <a href="javascript:void(0)" className="text-primary edit">
                        <i className="ti ti-eye fs-5" />
                      </a>
                      <a
                        href="javascript:void(0)"
                        className="text-dark delete ms-2"
                      >
                        <i className="ti ti-trash fs-5" />
                      </a>
                    </div>
                  </td>
                </tr>
                {/* end row */}
                {/* start row */}
                <tr className="search-items">
                  <td>
                    <div className="n-chk align-self-center text-center">
                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input contact-chkbox primary"
                          id="checkbox2"
                        />
                        <label className="form-check-label" htmlFor="checkbox2" />
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="d-flex align-items-center">
                      <img
                        src="assets/images/profile/user-2.jpg"
                        alt="avatar"
                        className="rounded-circle"
                        width={35}
                      />
                      <div className="ms-3">
                        <div className="user-meta-info">
                          <h6 className="user-name mb-0" data-name="Olivia Allen">
                            Olivia Allen
                          </h6>
                          <span
                            className="user-work fs-3"
                            data-occupation="Web Designer"
                          >
                            Web Designer
                          </span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="usr-email-addr" data-email="allen@mail.com">
                      allen@mail.com
                    </span>
                  </td>
                  <td>
                    <span
                      className="usr-location"
                      data-location="Sydney, Australia"
                    >
                      Sydney, Australia
                    </span>
                  </td>
                  <td>
                    <span className="usr-ph-no" data-phone="+91 (125) 450-1500">
                      +91 (125) 450-1500
                    </span>
                  </td>
                  <td>
                    <div className="action-btn">
                      <a href="javascript:void(0)" className="text-primary edit">
                        <i className="ti ti-eye fs-5" />
                      </a>
                      <a
                        href="javascript:void(0)"
                        className="text-dark delete ms-2"
                      >
                        <i className="ti ti-trash fs-5" />
                      </a>
                    </div>
                  </td>
                </tr>
                {/* end row */}
                {/* start row */}
                <tr className="search-items">
                  <td>
                    <div className="n-chk align-self-center text-center">
                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input contact-chkbox primary"
                          id="checkbox3"
                        />
                        <label className="form-check-label" htmlFor="checkbox3" />
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="d-flex align-items-center">
                      <img
                        src="assets/images/profile/user-3.jpg"
                        alt="avatar"
                        className="rounded-circle"
                        width={35}
                      />
                      <div className="ms-3">
                        <div className="user-meta-info">
                          <h6
                            className="user-name mb-0"
                            data-name="Isabella Anderson"
                          >
                            {" "}
                            Isabella Anderson{" "}
                          </h6>
                          <span
                            className="user-work fs-3"
                            data-occupation="UX/UI Designer"
                          >
                            UX/UI Designer
                          </span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span
                      className="usr-email-addr"
                      data-email="anderson@mail.com"
                    >
                      anderson@mail.com
                    </span>
                  </td>
                  <td>
                    <span className="usr-location" data-location="Miami, USA">
                      Miami, USA
                    </span>
                  </td>
                  <td>
                    <span className="usr-ph-no" data-phone="+91 (100) 154-1254">
                      +91 (100) 154-1254
                    </span>
                  </td>
                  <td>
                    <div className="action-btn">
                      <a href="javascript:void(0)" className="text-primary edit">
                        <i className="ti ti-eye fs-5" />
                      </a>
                      <a
                        href="javascript:void(0)"
                        className="text-dark delete ms-2"
                      >
                        <i className="ti ti-trash fs-5" />
                      </a>
                    </div>
                  </td>
                </tr>
                {/* end row */}
                {/* start row */}
                <tr className="search-items">
                  <td>
                    <div className="n-chk align-self-center text-center">
                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input contact-chkbox primary"
                          id="checkbox4"
                        />
                        <label className="form-check-label" htmlFor="checkbox4" />
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="d-flex align-items-center">
                      <img
                        src="assets/images/profile/user-4.jpg"
                        alt="avatar"
                        className="rounded-circle"
                        width={35}
                      />
                      <div className="ms-3">
                        <div className="user-meta-info">
                          <h6
                            className="user-name mb-0"
                            data-name="Amelia Armstrong"
                          >
                            {" "}
                            Amelia Armstrong{" "}
                          </h6>
                          <span
                            className="user-work fs-3"
                            data-occupation="Ethical Hacker"
                          >
                            Ethical Hacker
                          </span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span
                      className="usr-email-addr"
                      data-email="armstrong@mail.com"
                    >armstrong@mail.com
                    </span>
                  </td>
                  <td>
                    <span className="usr-location" data-location="Tokyo, Japan">
                      Tokyo, Japan
                    </span>
                  </td>
                  <td>
                    <span className="usr-ph-no" data-phone="+91 (154) 199- 1540">
                      +91 (154) 199- 1540
                    </span>
                  </td>
                  <td>
                    <div className="action-btn">
                      <a href="javascript:void(0)" className="text-primary edit">
                        <i className="ti ti-eye fs-5" />
                      </a>
                      <a href="javascript:void(0)" className="text-dark delete ms-2" >
                        <i className="ti ti-trash fs-5" />
                      </a>
                    </div>
                  </td>
                </tr>
                {/* end row */}
                {/* start row */}
                <tr className="search-items">
                  <td>
                    <div className="n-chk align-self-center text-center">
                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input contact-chkbox primary"
                          id="checkbox5"
                        />
                        <label className="form-check-label" htmlFor="checkbox5" />
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="d-flex align-items-center">
                      <img
                        src="assets/images/profile/user-5.jpg"
                        alt="avatar"
                        className="rounded-circle"
                        width={35}
                      />
                      <div className="ms-3">
                        <div className="user-meta-info">
                          <h6 className="user-name mb-0" data-name="Emily Atkinson" >
                            {" "}
                            Emily Atkinson{" "}
                          </h6>
                          <span className="user-work fs-3" data-occupation="Web developer" >
                            Web developer
                          </span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="usr-email-addr" data-email="atkinson@mail.com" >
                      atkinson@mail.com
                    </span>
                  </td>
                  <td>
                    <span className="usr-location" data-location="Edinburgh, UK">
                      Edinburgh, UK
                    </span>
                  </td>
                  <td>
                    <span className="usr-ph-no" data-phone="+91 (900) 150- 1500">
                      +91 (900) 150- 1500
                    </span>
                  </td>
                  <td>
                    <div className="action-btn">
                      <a href="javascript:void(0)" className="text-primary edit">
                        <i className="ti ti-eye fs-5" />
                      </a>
                      <a
                        href="javascript:void(0)"
                        className="text-dark delete ms-2"
                      >
                        <i className="ti ti-trash fs-5" />
                      </a>
                    </div>
                  </td>
                </tr>
                {/* end row */}
                {/* start row */}
                <tr className="search-items">
                  <td>
                    <div className="n-chk align-self-center text-center">
                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input contact-chkbox primary"
                          id="checkbox6"
                        />
                        <label className="form-check-label" htmlFor="checkbox6" />
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="d-flex align-items-center">
                      <img
                        src="assets/images/profile/user-1.jpg"
                        alt="avatar"
                        className="rounded-circle"
                        width={35}
                      />
                      <div className="ms-3">
                        <div className="user-meta-info">
                          <h6 className="user-name mb-0" data-name="Sofia Bailey">
                            Sofia Bailey
                          </h6>
                          <span
                            className="user-work fs-3"
                            data-occupation="UX/UI Designer"
                          >
                            UX/UI Designer
                          </span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="usr-email-addr" data-email="bailey@mail.com">
                      bailey@mail.com
                    </span>
                  </td>
                  <td>
                    <span className="usr-location" data-location="New York, USA">
                      New York, USA
                    </span>
                  </td>
                  <td>
                    <span className="usr-ph-no" data-phone="+91 (001) 160- 1845">
                      +91 (001) 160- 1845
                    </span>
                  </td>
                  <td>
                    <div className="action-btn">
                      <a href="javascript:void(0)" className="text-primary edit">
                        <i className="ti ti-eye fs-5" />
                      </a>
                      <a
                        href="javascript:void(0)"
                        className="text-dark delete ms-2"
                      >
                        <i className="ti ti-trash fs-5" />
                      </a>
                    </div>
                  </td>
                </tr>
                <tr className="search-items">
                  <td>
                    <div className="n-chk align-self-center text-center">
                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input contact-chkbox primary"
                          id="checkbox7"
                        />
                        <label className="form-check-label" htmlFor="checkbox7" />
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="d-flex align-items-center">
                      <img
                        src="assets/images/profile/user-2.jpg"
                        alt="avatar"
                        className="rounded-circle"
                        width={35}
                      />
                      <div className="ms-3">
                        <div className="user-meta-info">
                          <h6
                            className="user-name mb-0"
                            data-name="Victoria Sharma"
                          >
                            {" "}
                            Victoria Sharma{" "}
                          </h6>
                          <span
                            className="user-work fs-3"
                            data-occupation="Project Manager"
                          >
                            Project Manager
                          </span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="usr-email-addr" data-email="sharma@mail.com">
                      sharma@mail.com
                    </span>
                  </td>
                  <td>
                    <span className="usr-location" data-location="Miami, USA">
                      Miami, USA
                    </span>
                  </td>
                  <td>
                    <span className="usr-ph-no" data-phone="+91 (110) 180- 1600">
                      +91 (110) 180- 1600
                    </span>
                  </td>
                  <td>
                    <div className="action-btn">
                      <a href="javascript:void(0)" className="text-primary edit">
                        <i className="ti ti-eye fs-5" />
                      </a>
                      <a
                        href="javascript:void(0)"
                        className="text-dark delete ms-2"
                      >
                        <i className="ti ti-trash fs-5" />
                      </a>
                    </div>
                  </td>
                </tr>
                <tr className="search-items">
                  <td>
                    <div className="n-chk align-self-center text-center">
                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input contact-chkbox primary"
                          id="checkbox8"
                        />
                        <label className="form-check-label" htmlFor="checkbox8" />
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="d-flex align-items-center">
                      <img
                        src="assets/images/profile/user-3.jpg"
                        alt="avatar"
                        className="rounded-circle"
                        width={35}
                      />
                      <div className="ms-3">
                        <div className="user-meta-info">
                          <h6
                            className="user-name mb-0"
                            data-name="Penelope Baker"
                          >
                            {" "}
                            Penelope Baker{" "}
                          </h6>
                          <span
                            className="user-work fs-3"
                            data-occupation="Web Developer"
                          >
                            Web Developer
                          </span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="usr-email-addr" data-email="baker@mail.com">
                      baker@mail.com
                    </span>
                  </td>
                  <td>
                    <span className="usr-location" data-location="Edinburgh, UK">
                      Edinburgh, UK
                    </span>
                  </td>
                  <td>
                    <span className="usr-ph-no" data-phone="+91 (405) 483- 4512">
                      +91 (405) 483- 4512
                    </span>
                  </td>
                  <td>
                    <div className="action-btn">
                      <a href="javascript:void(0)" className="text-primary edit">
                        <i className="ti ti-eye fs-5" />
                      </a>
                      <a
                        href="javascript:void(0)"
                        className="text-dark delete ms-2"
                      >
                        <i className="ti ti-trash fs-5" />
                      </a>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  )
}

export default Contact
