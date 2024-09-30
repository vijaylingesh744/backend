import React from 'react'

const AllJobs = () => {
  return (
    <div className="body-wrapper">
      <div className="container-fluid">
        <div className="card bg-info-subtle shadow-none position-relative overflow-hidden mb-4">
          <div className="card-body px-4 py-3">
            <div className="row align-items-center">
              <div className="col-9">
                <h4 className="fw-semibold mb-8">All Jobs</h4>
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a
                        className="text-muted text-decoration-none"
                        href="/">
                        Home
                      </a>
                    </li>
                    <li className="breadcrumb-item" aria-current="page">
                      All Jobs
                    </li>
                  </ol>
                </nav>
              </div>
              <div className="col-3">
                <div className="text-center mb-n5">
                  <img
                    src="/assets/images/breadcrumb/ChatBc.png"
                    className="img-fluid mb-n4"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="dropdown" style={{
          float: "right",
          margin: "20px"
        }}>
          <a class="dropdown-toggle" href="app-kanban.html#" role="button" id="dropdownMenuLink-1"
            data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
            Filter Item
          </a>
          <div class="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuLink-1">
            <a class="dropdown-item list-edit" href="javascript:void(0);">Completed</a>
            <a class="dropdown-item list-delete" href="javascript:void(0);">Pending</a>
            <a class="dropdown-item list-clear-all" href="javascript:void(0);">Cancelled</a>
          </div>
        </div>
        <div style={{ marginTop: "100px" }}>
          {[1, 2, 3, 4].map((item) => (

            <div id="card-main-container" className="mb-3 card">
              <div className="col-md-3 col-lg-3 m-2">
                <img src="/assets/images/products/sofware.jpg"
                  // style={{objectFit: "cover"}}
                  width="100%" />
              </div>
              <div className="col-md-6 col-lg-7">
                <h5 className="font-weight-bold">
                  <a href="#" className="text-secondary">
                    Job Detail
                  </a>
                </h5>
                <div className="mb-1 mt-3 product-tag w-25">
                  {item % 2 ? (
                      <p className="bg-primary p-1 pl-2 pr-2 text-center">
                        <a href="#">Pending</a>
                      </p>
                    ) : (
                      <p className="bg-danger p-1 pl-2 pr-2 mr-1 text-center">
                        <a href="#">Cancelled</a>
                      </p>
                    )
                  }
                </div>
                <p className="mb-3">
                  It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letter
                </p>

              </div>
              <div className="col-md-3 col-lg-2">
                <h5 className="font-weight-bold">$799.99</h5>
                <div className="mt-3">
                  <i className="fa-star fa" />
                  <i className="fa-star fa" />
                  <i className="fa-star fa" />
                  <i className="fa-star fa" />
                  <i className="fa-star fa" />
                  <p className="text-muted mt-1">4512 review</p>
                </div>
                <button
                  style={{ background: "#7F00FF", fontSize: "13px !important" }}
                  className="btn btn-success text-white mr-1 p-2 pl-3 pr-3 font-weight-bold"
                >
                  Job Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AllJobs
