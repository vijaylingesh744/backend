import React from 'react'

const Maintain = () => {
    return (
        <div className="body-wrapper">
                <div id="main-wrapper">
  <div className="position-relative overflow-hidden min-vh-100 w-100 d-flex align-items-center justify-content-center">
    <div className="d-flex align-items-center justify-content-center w-100">
      <div className="row justify-content-center w-100">
        <div className="col-lg-4">
          <div className="text-center">
            <img
              src="/assets/images/backgrounds/maintenance.svg"
              alt=""
              className="img-fluid"
              width={500}
            />
            <h1 className="fw-semibold my-7 fs-9">Maintenance Mode!!!</h1>
            <h4 className="fw-semibold mb-7">
              Website is Under Construction. Check back later!
            </h4>
            <a
              className="btn btn-primary"
              href="/"
              role="button"
            >
              Go Back to Home
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

        </div>
    )
}

export default Maintain
