import React from 'react'

function Member() {
  return (
    <div className="body-wrapper">
    <div className="container-fluid">
      <div className="card bg-info-subtle shadow-none position-relative overflow-hidden mb-4">
        <div className="card-body px-4 py-3">
          <div className="row align-items-center">
            <div className="col-9">
              <h4 className="fw-semibold mb-8">MemberShip</h4>
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
                    MemberShip
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
      <div className="row justify-content-center">
        <div className="col-lg-6 text-center">
          <h2 className="fw-bolder mb-0 fs-8 lh-base">
            Flexible Plans Tailored to Fit Your Community's Unique Needs!
          </h2>
        </div>
      </div>
      <div className="d-flex align-items-center justify-content-center my-7">
        <span className="text-dark fw-bolder text-capitalize me-3">Monthly</span>
        <div className="form-check form-switch mb-0">
          <input
            className="form-check-input"
            type="checkbox"
            role="switch"
            id="flexSwitchCheckChecked"
            defaultChecked=""
          />
        </div>
        <span className="text-dark fw-bolder text-capitalize ms-2">Yearly</span>
      </div>
      <div className="row">
        <div className="col-sm-6 col-lg-4">
          <div className="card">
            <div className="card-body">
              <span className="fw-bolder text-uppercase fs-2 d-block mb-7">
                Silver
              </span>
              <div className="my-4">
                <img
                  src="../assets/images/backgrounds/silver.png"
                  alt=""
                  className="img-fluid"
                  width={80}
                  height={80}
                />
              </div>
              <h2 className="fw-bolder fs-12 mb-3">Free</h2>
              <ul className="list-unstyled mb-7">
                <li className="d-flex align-items-center gap-2 py-2">
                  <i className="ti ti-check text-primary fs-4" />
                  <span className="text-dark">3 Members</span>
                </li>
                <li className="d-flex align-items-center gap-2 py-2">
                  <i className="ti ti-check text-primary fs-4" />
                  <span className="text-dark">Single Devise</span>
                </li>
                <li className="d-flex align-items-center gap-2 py-2">
                  <i className="ti ti-x text-muted fs-4" />
                  <span className="text-muted">50GB Storage</span>
                </li>
                <li className="d-flex align-items-center gap-2 py-2">
                  <i className="ti ti-x text-muted fs-4" />
                  <span className="text-muted">Monthly Backups</span>
                </li>
                <li className="d-flex align-items-center gap-2 py-2">
                  <i className="ti ti-x text-muted fs-4" />
                  <span className="text-muted">Permissions &amp; workflows</span>
                </li>
              </ul>
              <button className="btn btn-primary fw-bolder py-6 w-100 text-capitalize">
                Choose Silver
              </button>
            </div>
          </div>
        </div>
        <div className="col-sm-6 col-lg-4">
          <div className="card">
            <div className="card-body pt-6">
              <div className="text-end">
                <span className="badge fw-bolder py-1 bg-warning-subtle text-warning text-uppercase fs-2 rounded-3">
                  POPULAR
                </span>
              </div>
              <span className="fw-bolder text-uppercase fs-2 d-block mb-7">
                bronze
              </span>
              <div className="my-4">
                <img
                  src="../assets/images/backgrounds/bronze.png"
                  alt=""
                  className="img-fluid"
                  width={80}
                  height={80}
                />
              </div>
              <div className="d-flex mb-3">
                <h5 className="fw-bolder fs-6 mb-0">$</h5>
                <h2 className="fw-bolder fs-12 ms-2 mb-0">4.99</h2>
                <span className="ms-2 fs-4 d-flex align-items-center">/mo</span>
              </div>
              <ul className="list-unstyled mb-7">
                <li className="d-flex align-items-center gap-2 py-2">
                  <i className="ti ti-check text-primary fs-4" />
                  <span className="text-dark">5 Members</span>
                </li>
                <li className="d-flex align-items-center gap-2 py-2">
                  <i className="ti ti-check text-primary fs-4" />
                  <span className="text-dark">Single Devise</span>
                </li>
                <li className="d-flex align-items-center gap-2 py-2">
                  <i className="ti ti-check text-primary fs-4" />
                  <span className="text-dark">80GB Storage</span>
                </li>
                <li className="d-flex align-items-center gap-2 py-2">
                  <i className="ti ti-x text-muted fs-4" />
                  <span className="text-muted">Monthly Backups</span>
                </li>
                <li className="d-flex align-items-center gap-2 py-2">
                  <i className="ti ti-x text-muted fs-4" />
                  <span className="text-muted">Permissions &amp; workflows</span>
                </li>
              </ul>
              <button className="btn btn-primary fw-bolder py-6 w-100 text-capitalize">
                choose bronze
              </button>
            </div>
          </div>
        </div>
        <div className="col-sm-6 col-lg-4">
          <div className="card">
            <div className="card-body">
              <span className="fw-bolder text-uppercase fs-2 d-block mb-7">
                gold
              </span>
              <div className="my-4">
                <img
                  src="../assets/images/backgrounds/gold.png"
                  alt=""
                  className="img-fluid"
                  width={80}
                  height={80}
                />
              </div>
              <div className="d-flex mb-3">
                <h5 className="fw-bolder fs-6 mb-0">$</h5>
                <h2 className="fw-bolder fs-12 ms-2 mb-0">9.99</h2>
                <span className="ms-2 fs-4 d-flex align-items-center">/mo</span>
              </div>
              <ul className="list-unstyled mb-7">
                <li className="d-flex align-items-center gap-2 py-2">
                  <i className="ti ti-check text-primary fs-4" />
                  <span className="text-dark">5 Members</span>
                </li>
                <li className="d-flex align-items-center gap-2 py-2">
                  <i className="ti ti-check text-primary fs-4" />
                  <span className="text-dark">Single Devise</span>
                </li>
                <li className="d-flex align-items-center gap-2 py-2">
                  <i className="ti ti-check text-primary fs-4" />
                  <span className="text-dark">120GB Storage</span>
                </li>
                <li className="d-flex align-items-center gap-2 py-2">
                  <i className="ti ti-check text-primary fs-4" />
                  <span className="text-dark">Monthly Backups</span>
                </li>
                <li className="d-flex align-items-center gap-2 py-2">
                  <i className="ti ti-check text-primary fs-4" />
                  <span className="text-dark">Permissions &amp; workflows</span>
                </li>
              </ul>
              <button className="btn btn-primary fw-bolder py-6 w-100 text-capitalize">
                choose gold
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Member
