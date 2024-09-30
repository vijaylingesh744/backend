import React from 'react'
import Header from '../layout/SubHeader';

const Index = () => {
  return (
    <div>
      <header id="sub-main-header">
        <Header />
      </header>
      <div
        className="container-fluid px-lg-5 px-2 w-100 mt-3"
        style={{ height: 100 }}>
        <div className="row px-lg-5">
          <div className="col-lg-5 col-12">
            <div className='card shadow-sm p-3 mb-2'>
              <span className='fontsubtitle text-dark1 font-weight-bold'>Transactions</span>
            </div>
            <div className="card shadow-sm px-3 py-3 w-100 bg-white "
              style={{ minHeight: "auto", position: "sticky", top: 70 }}>
              <span className="text-dark1 fontsubtitle font-weight-bold d-none d-md-block d-lg-block">
                Transaction Module
              </span>
              <p className="text-secondary1 fontcontent2 w-100 d-none d-md-block d-lg-block">
                lorem ipsum sit amet,consectutur adipisocng elit sed to incididunt
              </p>

            </div>
          </div>
          <div className="col-lg-7 col-12 pl-lg-0">
            <div>
              <div className="container-fluid rounded px-0 shadow-sm bg-white" style={{}}>
                <div className=" px-lg-5 py-3 mb-5 mb-lg-0">
                  <div className="d-flex align-items-center justify-content-between px-3 py-2">
                    <div className="d-flex column-gap-3">
                      <img src="/images/profile/img03.png" width={50} height={50} />
                      <div className="d-flex flex-column ">
                        <span className="fontcontent1 text-dark1 font-weight-bold"> Received from Jhon Deo  </span>
                        <span className="fontcontent2 font-weight-light">
                          {" "}
                          12 Aug 2024, 11:23 AM
                        </span>
                      </div>
                    </div>
                    <span
                      className="text-connect fonthint"
                      style={{ fontWeight: 600, minWidth: 65 }}
                    >
                      + $300.00
                    </span>
                  </div>
                </div>
                <div className=" px-lg-5 py-3 mb-5 mb-lg-0">
                  <div className="d-flex align-items-center justify-content-between px-3 py-2">
                    <div className="d-flex column-gap-3">
                      <img src="/images/profile/img03.png" width={50} height={50} />
                      <div className="d-flex flex-column ">
                        <span className="fontcontent1 text-dark1 font-weight-bold"> Received from Adam Den  </span>
                        <span className="fontcontent2 font-weight-light">
                          {" "}
                          12 Aug 2024, 11:23 AM
                        </span>
                      </div>
                    </div>
                    <span
                      className="text-connect fonthint"
                      style={{ fontWeight: 600, minWidth: 65 }}
                    >
                      + $100.00
                    </span>
                  </div>
                </div>
                <div className="px-lg-5 py-3 mb-5 mb-lg-0">
                  <div className="d-flex align-items-center justify-content-between px-3 py-2">
                    <div className="d-flex column-gap-3">
                      <img src="/images/profile/img03.png" width={50} height={50} />
                      <div className="d-flex flex-column ">
                        <span className="fontcontent1 text-dark1 font-weight-bold"> Sent to Jack Wills  </span>
                        <span className="fontcontent2 font-weight-light">
                          {" "}
                          12 Aug 2024, 11:23 AM
                        </span>
                      </div>
                    </div>
                    <span
                      className="text-danger fonthint"
                      style={{ fontWeight: 600, minWidth: 65 }}
                    >
                      - $80.00
                    </span>
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

export default Index
