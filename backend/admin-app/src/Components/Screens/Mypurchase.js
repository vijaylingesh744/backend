import React, { useState } from 'react'

const Mypurchase = () => {

  const TrackStatusPanel = () => {
    return (
      <div className="col-md-8">
        <div style={{ marginLeft: 10 }}>
          <div className="wrapper">
            <ul className="StepProgress">
              <div className="StepProgress-item is-done">
                <strong>Post a contest</strong>
              </div>
              <div className="StepProgress-item is-done">
                <strong>Award an entry</strong>
                Got more entries that you love? Buy more entries anytime! Just hover on
                your favorite entry and click the Buy button
              </div>
              <div className="StepProgress-item is-done">
                <strong>Post a contest</strong>
              </div>
              <div className="StepProgress-item is-done">
                <strong>Handover</strong>
              </div>
              <div className="StepProgress-item current">
                <strong>Provide feedback</strong>
              </div>
            </ul>
          </div>
        </div>

      </div>
    );
  };

  const PurchaseCard = ({ purchaseNumber }) => {
    const [isPanelVisible, setPanelVisible] = useState(false);

    const handleTrackStatusClick = () => {
      setPanelVisible(!isPanelVisible);
    };

    return (
      <div >
        <div className="row justify-content-center">
          <div className="col-md-12 col-xl-12">
            <div className="card shadow-0 border rounded-3">
              <div className="card-body">
                <div className="row">
                  <div className="col-md-12 col-lg-3 col-xl-3 mb-4 mb-lg-0">
                    <div className="bg-image hover-zoom ripple rounded ripple-surface">
                      <img
                        src={purchaseNumber.img}
                        className="w-100"
                      />
                      <a href="#!">
                        <div className="hover-overlay">
                          <div
                            className="mask"
                            style={{ backgroundColor: "rgba(253, 253, 253, 0.15)" }}
                          />
                        </div>
                      </a>
                    </div>
                  </div>
                  <div className={isPanelVisible?"col-md-3 col-lg-3 col-xl-3":"col-md-6 col-lg-6 col-xl-6"}>
                    <h5>{purchaseNumber.name} </h5>
                    <div className="d-flex flex-row">
                      <div className="text-danger mb-1 me-2">
                        <i className="fa fa-star" />
                        <i className="fa fa-star" />
                        <i className="fa fa-star" />
                        <i className="fa fa-star" />
                      </div>
                      <span>310 </span>
                    </div>
                    <div className="mt-1 mb-0 text-muted small">
                      <span>100% </span>
                      <span className="text-primary"> • </span>
                      <span>loreum</span>
                      <span className="text-primary"> • </span>
                      <span>
                        Best loreum
                        <br />
                      </span>
                    </div>
                    <div className="mb-2 text-muted small">
                      <span>loreum design</span>
                      <span className="text-primary"> • </span>
                      <span>For loreum</span>
                      <span className="text-primary"> • </span>
                      <span>
                        loreum
                        <br />
                      </span>
                    </div>
                    <p className=" mb-4 mb-md-0">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mattis aliquam faucibus purus in. Tincidunt arcu non sodales neque sodales. Faucibus ornare suspendisse sed nisi lacus. Ac odio tempor orci dapibus ultrices. Ultrices neque ornare aenean euismod. Molestie a iaculis at erat pellentesque. Interdum varius sit amet mattis vulputate enim nulla aliquet. Dictum fusce ut placerat orci nulla pellentesque dignissim enim sit. In nisl nisi scelerisque eu ultrices vitae.
                    </p>
                  </div>
                  <div className="col-md-6 col-lg-3 col-xl-3 border-sm-start-none border-start">
                    <div className="d-flex flex-row align-items-center mb-1">
                      <h4 className="mb-1 me-1">${purchaseNumber.price}</h4>
                      <span className="text-danger">
                        <s>${purchaseNumber.price+10}</s>
                      </span>
                    </div>
                    {purchaseNumber.id == 1 ? (
                      <div className="d-flex flex-column mt-4">
                        <button className="btn btn-danger"
                          onClick={() => window.location.href = "/payment"}
                          type="button">
                          Payment Pending
                        </button>
                      </div>
                    ) : (
                      <div className="d-flex flex-column mt-4">
                        <button className="btn btn-primary btn-sm" type="button">
                          Details
                        </button>
                        <button
                          className="btn btn-outline-primary btn-sm mt-2"
                          type="button"
                          onClick={handleTrackStatusClick}
                        >
                          Track Status
                        </button>
                      </div>
                    )}

                  </div>
                  <div className="col-md-6 col-lg-3 col-xl-3 border-sm-start-none border-start">
                  {isPanelVisible && <TrackStatusPanel />}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };


const ProductArr =[
  {
    id:1,
    name:"XYZ CRM Banking",
    img:"/assets/images/products/crm.jpg",
    price:110
  },
  {
    id:2,
    name:"Steel Industries",
    img:"/assets/images/products/Steel.jpg",
    price:231
  },
  {
    id:4,
    name:"Telecom IT",
    img:"/assets/images/products/Telecom.jpg",
    price:2300
  }
]

  return (
    <div>
      <div className="body-wrapper">
        <div className="container-fluid">
          <div className="card bg-info-subtle shadow-none position-relative overflow-hidden mb-4">
            <div className="card-body px-4 py-3">
              <div className="row align-items-center">
                <div className="col-9">
                  <h4 className="fw-semibold mb-8">My Purchase</h4>
                  <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                      <li className="breadcrumb-item">
                        <a
                          className="text-muted text-decoration-none"
                          href="index.html"
                        >
                          Home
                        </a>
                      </li>
                      <li className="breadcrumb-item" aria-current="page">
                        My Purchase
                      </li>
                    </ol>
                  </nav>
                </div>
                <div className="col-3">
                  <div className="text-center mb-n5">
                    <img
                      src="/assets/images/breadcrumb/ChatBc.png"
                      alt=""
                      className="img-fluid mb-n4"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="container">
            {ProductArr.map((purchaseNumber) => (
              <PurchaseCard purchaseNumber={purchaseNumber} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Mypurchase
