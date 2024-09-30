import React from 'react'

function Commerce() {
  return (
    <div>
      <div className="body-wrapper">
  <div className="container-fluid">
    <div className="row">
      <div className="col-lg-8 d-flex align-items-stretch">
        <div className="card w-100 bg-primary-subtle overflow-hidden shadow-none">
          <div className="card-body position-relative">
            <div className="row">
              <div className="col-sm-7">
                <div className="d-flex align-items-center mb-7">
                  <div className="rounded-circle overflow-hidden me-6">
                    <img
                      src="assets/images/profile/user-1.jpg"
                      alt=""
                      width={40}
                      height={40}
                    />
                  </div>
                  <h5 className="fw-semibold mb-0 fs-5">
                    Welcome back Mathew Anderson!
                  </h5>
                </div>
                <div className="d-flex align-items-center">
                  <div className="border-end pe-4 border-muted border-opacity-10">
                    <h3 className="mb-1 fw-semibold fs-8 d-flex align-content-center">
                      $2,340
                      <i className="ti ti-arrow-up-right fs-5 lh-base text-success" />
                    </h3>
                    <p className="mb-0 text-dark">Today’s Sales</p>
                  </div>
                  <div className="ps-4">
                    <h3 className="mb-1 fw-semibold fs-8 d-flex align-content-center">
                      35%
                      <i className="ti ti-arrow-up-right fs-5 lh-base text-success" />
                    </h3>
                    <p className="mb-0 text-dark">Overall Performance</p>
                  </div>
                </div>
              </div>
              <div className="col-sm-5">
                <div className="welcome-bg-img mb-n7 text-end">
                  <img
                    src="assets/images/backgrounds/welcome-bg.svg"
                    alt=""
                    className="img-fluid"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-sm-6 col-lg-2 d-flex align-items-stretch">
        <div className="card w-100">
          <div className="card-body p-4">
            <h4 className="fw-semibold">$10,230</h4>
            <p className="mb-2 fs-3">Expense</p>
            <div id="expense" />
          </div>
        </div>
      </div>
      <div className="col-sm-6 col-lg-2 d-flex align-items-stretch">
        <div className="card w-100">
          <div className="card-body p-4">
            <h4 className="fw-semibold">$65,432</h4>
            <p className="mb-1 fs-3">Sales</p>
            <div id="sales" className="sales-chart" />
          </div>
        </div>
      </div>
      <div className="col-md-6 col-lg-4 d-flex align-items-stretch">
        <div className="card w-100">
          <div className="card-body">
            <h5 className="card-title fw-semibold">Revenue Updates</h5>
            <p className="card-subtitle mb-4">Overview of Profit</p>
            <div className="d-flex align-items-center">
              <div className="me-4">
                <span className="round-8 text-bg-primary rounded-circle me-2 d-inline-block" />
                <span className="fs-2">Footware</span>
              </div>
              <div>
                <span className="round-8 text-bg-secondary rounded-circle me-2 d-inline-block" />
                <span className="fs-2">Fashionware</span>
              </div>
            </div>
            <div id="revenue-chart" className="revenue-chart" />
          </div>
        </div>
      </div>
      <div className="col-md-6 col-lg-4 d-flex align-items-stretch">
        <div className="card w-100">
          <div className="card-body">
            <h5 className="card-title fw-semibold">Sales Overview</h5>
            <p className="card-subtitle mb-2">Every Month</p>
            <div id="sales-overview" className="mb-4" />
            <div className="d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center">
                <div className="bg-primary-subtle text-primary rounded-2 me-8 p-8 d-flex align-items-center justify-content-center">
                  <i className="ti ti-grid-dots fs-6" />
                </div>
                <div>
                  <h6 className="fw-semibold text-dark fs-4 mb-0">$23,450</h6>
                  <p className="fs-3 mb-0 fw-normal">Profit</p>
                </div>
              </div>
              <div className="d-flex align-items-center">
                <div className="bg-secondary-subtle text-secondary rounded-2 me-8 p-8 d-flex align-items-center justify-content-center">
                  <i className="ti ti-grid-dots fs-6" />
                </div>
                <div>
                  <h6 className="fw-semibold text-dark fs-4 mb-0">$23,450</h6>
                  <p className="fs-3 mb-0 fw-normal">Expance</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-4">
        <div className="row">
          <div className="col-sm-6 d-flex align-items-stretch">
            <div className="card w-100">
              <div className="card-body">
                <div className="p-2 bg-primary-subtle rounded-2 d-inline-block mb-3">
                  <img
                    src="assets/images/svgs/icon-cart.svg"
                    alt=""
                    className="img-fluid"
                    width={24}
                    height={24}
                  />
                </div>
                <div id="sales-two" className="mb-3" />
                <h4 className="mb-1 fw-semibold d-flex align-content-center">
                  $16.5k
                  <i className="ti ti-arrow-up-right fs-5 text-success" />
                </h4>
                <p className="mb-0">Sales</p>
              </div>
            </div>
          </div>
          <div className="col-sm-6 d-flex align-items-stretch">
            <div className="card w-100">
              <div className="card-body">
                <div className="p-2 bg-info-subtle rounded-2 d-inline-block mb-3">
                  <img
                    src="assets/images/svgs/icon-bar.svg"
                    alt=""
                    className="img-fluid"
                    width={24}
                    height={24}
                  />
                </div>
                <div id="growth" className="mb-3" />
                <h4 className="mb-1 fw-semibold d-flex align-content-center">
                  24%
                  <i className="ti ti-arrow-up-right fs-5 text-success" />
                </h4>
                <p className="mb-0">Growth</p>
              </div>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-body">
            <div className="row alig n-items-start">
              <div className="col-8">
                <h5 className="card-title mb-9 fw-semibold">
                  {" "}
                  Monthly Earnings{" "}
                </h5>
                <div className="d-flex align-items-center mb-3">
                  <h4 className="fw-semibold mb-0 me-8">$6,820</h4>
                  <div className="d-flex align-items-center">
                    <span className="me-2 rounded-circle bg-success-subtle text-success round-20 d-flex align-items-center justify-content-center">
                      <i className="ti ti-arrow-up-left" />
                    </span>
                    <p className="text-dark me-1 fs-3 mb-0">+9%</p>
                  </div>
                </div>
              </div>
              <div className="col-4">
                <div className="d-flex justify-content-end">
                  <div className="p-2 bg-primary-subtle rounded-2 d-inline-block">
                    <img
                      src="assets/images/svgs/icon-master-card-2.svg"
                      alt=""
                      className="img-fluid"
                      width={24}
                      height={24}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div id="monthly-earning" />
          </div>
        </div>
      </div>
      <div className="col-md-6 col-lg-4 d-flex align-items-stretch">
        <div className="card w-100">
          <div className="card-body">
            <h5 className="card-title fw-semibold">Weekly Stats</h5>
            <p className="card-subtitle mb-0">Average sales</p>
            <div id="weekly-stats" className="mb-4 mt-7" />
            <div className="position-relative">
              <div className="d-flex align-items-center justify-content-between mb-4">
                <div className="d-flex">
                  <div className="p-6 bg-primary-subtle text-primary rounded-2 me-6 d-flex align-items-center justify-content-center">
                    <i className="ti ti-grid-dots fs-6" />
                  </div>
                  <div>
                    <h6 className="mb-1 fs-4 fw-semibold">Top Sales</h6>
                    <p className="fs-3 mb-0">Johnathan Doe</p>
                  </div>
                </div>
                <div className="bg-primary-subtle text-primary badge">
                  <p className="fs-3 fw-semibold mb-0">+68</p>
                </div>
              </div>
              <div className="d-flex align-items-center justify-content-between mb-4">
                <div className="d-flex">
                  <div className="p-6 bg-success-subtle text-success rounded-2 me-6 d-flex align-items-center justify-content-center">
                    <i className="ti ti-grid-dots fs-6" />
                  </div>
                  <div>
                    <h6 className="mb-1 fs-4 fw-semibold">Best Seller</h6>
                    <p className="fs-3 mb-0">Footware</p>
                  </div>
                </div>
                <div className="bg-success-subtle text-success badge">
                  <p className="fs-3 fw-semibold mb-0">+68</p>
                </div>
              </div>
              <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex">
                  <div className="p-6 bg-danger-subtle text-danger rounded-2 me-6 d-flex align-items-center justify-content-center">
                    <i className="ti ti-grid-dots fs-6" />
                  </div>
                  <div>
                    <h6 className="mb-1 fs-4 fw-semibold">Most Commented</h6>
                    <p className="fs-3 mb-0">Fashionware</p>
                  </div>
                </div>
                <div className="bg-danger-subtle text-danger badge">
                  <p className="fs-3 fw-semibold mb-0">+68</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-6 col-lg-4 d-flex align-items-stretch">
        <div className="card w-100">
          <div className="card-body">
            <div>
              <h5 className="card-title fw-semibold">Yearly Sales</h5>
              <p className="card-subtitle mb-0">Every month</p>
              <div id="salary" className="mb-7 pb-8" />
              <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                  <div className="bg-primary-subtle text-primary rounded-2 me-8 p-8 d-flex align-items-center justify-content-center">
                    <i className="ti ti-grid-dots fs-6" />
                  </div>
                  <div>
                    <p className="fs-3 mb-0 fw-normal">Total Sales</p>
                    <h6 className="fw-semibold text-dark fs-4 mb-0">$36,358</h6>
                  </div>
                </div>
                <div className="d-flex align-items-center">
                  <div className="bg-light-subtle text-muted rounded-2 me-8 p-8 d-flex align-items-center justify-content-center">
                    <i className="ti ti-grid-dots fs-6" />
                  </div>
                  <div>
                    <p className="fs-3 mb-0 fw-normal">Expenses</p>
                    <h6 className="fw-semibold text-dark fs-4 mb-0">$5,296</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-6 col-lg-4 d-flex align-items-stretch">
        <div className="card w-100">
          <div className="card-body">
            <h5 className="card-title fw-semibold">Payment Gateways</h5>
            <p className="card-subtitle mb-7">Platform for Income</p>
            <div className="position-relative">
              <div className="d-flex align-items-center justify-content-between mb-4">
                <div className="d-flex">
                  <div className="p-8 bg-primary-subtle rounded-2 d-flex align-items-center justify-content-center me-6">
                    <img
                      src="assets/images/svgs/icon-paypal2.svg"
                      alt=""
                      className="img-fluid"
                      width={24}
                      height={24}
                    />
                  </div>
                  <div>
                    <h6 className="mb-1 fs-4 fw-semibold">PayPal</h6>
                    <p className="fs-3 mb-0">Big Brands</p>
                  </div>
                </div>
                <h6 className="mb-0 fw-semibold">+$6,235</h6>
              </div>
              <div className="d-flex align-items-center justify-content-between mb-4">
                <div className="d-flex">
                  <div className="p-8 bg-success-subtle rounded-2 d-flex align-items-center justify-content-center me-6">
                    <img
                      src="assets/images/svgs/icon-wallet.svg"
                      alt=""
                      className="img-fluid"
                      width={24}
                      height={24}
                    />
                  </div>
                  <div>
                    <h6 className="mb-1 fs-4 fw-semibold">Wallet</h6>
                    <p className="fs-3 mb-0">Bill payment</p>
                  </div>
                </div>
                <h6 className="mb-0 fw-semibold text-muted">+$345</h6>
              </div>
              <div className="d-flex align-items-center justify-content-between mb-4">
                <div className="d-flex">
                  <div className="p-8 bg-warning-subtle rounded-2 d-flex align-items-center justify-content-center me-6">
                    <img
                      src="assets/images/svgs/icon-credit-card.svg"
                      alt=""
                      className="img-fluid"
                      width={24}
                      height={24}
                    />
                  </div>
                  <div>
                    <h6 className="mb-1 fs-4 fw-semibold">Credit card</h6>
                    <p className="fs-3 mb-0">Money reversed</p>
                  </div>
                </div>
                <h6 className="mb-0 fw-semibold">+$2,235</h6>
              </div>
              <div className="d-flex align-items-center justify-content-between mb-7 pb-1">
                <div className="d-flex">
                  <div className="p-8 bg-danger-subtle rounded-2 d-flex align-items-center justify-content-center me-6">
                    <img
                      src="assets/images/svgs/icon-pie2.svg"
                      alt=""
                      className="img-fluid"
                      width={24}
                      height={24}
                    />
                  </div>
                  <div>
                    <h6 className="mb-1 fs-4 fw-semibold">Refund</h6>
                    <p className="fs-3 mb-0">Bill payment</p>
                  </div>
                </div>
                <h6 className="mb-0 fw-semibold text-muted">-$32</h6>
              </div>
            </div>
            <button className="btn btn-outline-primary w-100">
              View all transactions
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-6 col-lg-4 d-flex align-items-stretch">
        <div className="card w-100">
          <div className="card-body">
            <div className="mb-4">
              <h5 className="card-title fw-semibold">Recent Transactions</h5>
              <p className="card-subtitle">How to Secure Recent Transactions</p>
            </div>
            <ul className="timeline-widget mb-0 position-relative mb-n5">
              <li className="timeline-item d-flex position-relative overflow-hidden">
                <div className="timeline-time text-dark flex-shrink-0 text-end">
                  09:30
                </div>
                <div className="timeline-badge-wrap d-flex flex-column align-items-center">
                  <span className="timeline-badge border-2 border border-primary flex-shrink-0 my-8" />
                  <span className="timeline-badge-border d-block flex-shrink-0" />
                </div>
                <div className="timeline-desc fs-3 text-dark mt-n1">
                  Payment received from John Doe of $385.90
                </div>
              </li>
              <li className="timeline-item d-flex position-relative overflow-hidden">
                <div className="timeline-time text-dark flex-shrink-0 text-end">
                  10:00 am
                </div>
                <div className="timeline-badge-wrap d-flex flex-column align-items-center">
                  <span className="timeline-badge border-2 border border-info flex-shrink-0 my-8" />
                  <span className="timeline-badge-border d-block flex-shrink-0" />
                </div>
                <div className="timeline-desc fs-3 text-dark mt-n1 fw-semibold">
                  New sale recorded{" "}
                  <a
                    href="javascript:void(0)"
                    className="text-primary d-block fw-normal "
                  >
                    #ML-3467
                  </a>
                </div>
              </li>
              <li className="timeline-item d-flex position-relative overflow-hidden">
                <div className="timeline-time text-dark flex-shrink-0 text-end">
                  12:00 am
                </div>
                <div className="timeline-badge-wrap d-flex flex-column align-items-center">
                  <span className="timeline-badge border-2 border border-success flex-shrink-0 my-8" />
                  <span className="timeline-badge-border d-block flex-shrink-0" />
                </div>
                <div className="timeline-desc fs-3 text-dark mt-n1">
                  Payment was made of $64.95 to Michael
                </div>
              </li>
              <li className="timeline-item d-flex position-relative overflow-hidden">
                <div className="timeline-time text-dark flex-shrink-0 text-end">
                  09:30 am
                </div>
                <div className="timeline-badge-wrap d-flex flex-column align-items-center">
                  <span className="timeline-badge border-2 border border-warning flex-shrink-0 my-8" />
                  <span className="timeline-badge-border d-block flex-shrink-0" />
                </div>
                <div className="timeline-desc fs-3 text-dark mt-n1 fw-semibold">
                  New sale recorded{" "}
                  <a
                    href="javascript:void(0)"
                    className="text-primary d-block fw-normal "
                  >
                    #ML-3467
                  </a>
                </div>
              </li>
              <li className="timeline-item d-flex position-relative overflow-hidden">
                <div className="timeline-time text-dark flex-shrink-0 text-end">
                  09:30 am
                </div>
                <div className="timeline-badge-wrap d-flex flex-column align-items-center">
                  <span className="timeline-badge border-2 border border-danger flex-shrink-0 my-8" />
                  <span className="timeline-badge-border d-block flex-shrink-0" />
                </div>
                <div className="timeline-desc fs-3 text-dark mt-n1 fw-semibold">
                  New arrival recorded{" "}
                  <a
                    href="javascript:void(0)"
                    className="text-primary d-block fw-normal "
                  >
                    #ML-3467
                  </a>
                </div>
              </li>
              <li className="timeline-item d-flex position-relative overflow-hidden">
                <div className="timeline-time text-dark flex-shrink-0 text-end">
                  12:00 am
                </div>
                <div className="timeline-badge-wrap d-flex flex-column align-items-center">
                  <span className="timeline-badge border-2 border border-success flex-shrink-0 my-8" />
                </div>
                <div className="timeline-desc fs-3 text-dark mt-n1">
                  Payment Done
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="col-md-12 col-lg-8 d-flex align-items-stretch">
        <div className="card w-100">
          <div className="card-body">
            <div className="d-sm-flex d-block align-items-center justify-content-between mb-3">
              <div className="mb-3 mb-sm-0">
                <h5 className="card-title fw-semibold">Product Performances</h5>
                <p className="card-subtitle">
                  What Impacts Product Performance?
                </p>
              </div>
              <div>
                <select className="form-select fw-semibold">
                  <option value={1}>March 2024</option>
                  <option value={2}>April 2024</option>
                  <option value={3}>May 2024</option>
                  <option value={4}>June 2024</option>
                </select>
              </div>
            </div>
            <div className="table-responsive">
              <table className="table align-middle text-nowrap mb-0">
                <thead>
                  <tr className="text-muted fw-semibold">
                    <th scope="col" className="ps-0">
                      Assigned
                    </th>
                    <th scope="col">Progress</th>
                    <th scope="col">Priority</th>
                    <th scope="col">Budget</th>
                    <th scope="col">Chart</th>
                  </tr>
                </thead>
                <tbody className="border-top">
                  <tr>
                    <td className="ps-0">
                      <div className="d-flex align-items-center">
                        <div className="me-2 pe-1">
                          <img
                            src="assets/images/products/product-1.jpg"
                            className="rounded-2"
                            width={48}
                            height={48}
                            alt=""
                          />
                        </div>
                        <div>
                          <h6 className="fw-semibold mb-1">Minecraf App</h6>
                          <p className="fs-2 mb-0 text-muted">Jason Roy</p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <p className="mb-0 fs-3 text-dark">73.2%</p>
                    </td>
                    <td>
                      <span className="badge fw-semibold py-1 w-85 bg-success-subtle text-success">
                        Low
                      </span>
                    </td>
                    <td>
                      <p className="fs-3 text-dark mb-0">$3.5k</p>
                    </td>
                    <td>
                      <div id="table-chart" />
                    </td>
                  </tr>
                  <tr>
                    <td className="ps-0">
                      <div className="d-flex align-items-center">
                        <div className="me-2 pe-1">
                          <img
                            src="assets/images/products/product-2.jpg"
                            className="rounded-2"
                            width={48}
                            height={48}
                            alt=""
                          />
                        </div>
                        <div>
                          <h6 className="fw-semibold mb-1">Web App Project</h6>
                          <p className="fs-2 mb-0 text-muted">
                            Mathew Flintoff
                          </p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <p className="mb-0 fs-3 text-dark">56.8%</p>
                    </td>
                    <td>
                      <span className="badge fw-semibold py-1 w-85 bg-warning-subtle text-warning">
                        Medium
                      </span>
                    </td>
                    <td>
                      <p className="fs-3 text-dark mb-0">$3.5k</p>
                    </td>
                    <td>
                      <div id="table-chart-1" />
                    </td>
                  </tr>
                  <tr>
                    <td className="ps-0">
                      <div className="d-flex align-items-center">
                        <div className="me-2 pe-1">
                          <img
                            src="assets/images/products/product-3.jpg"
                            className="rounded-2"
                            width={48}
                            height={48}
                            alt=""
                          />
                        </div>
                        <div>
                          <h6 className="fw-semibold mb-1">
                            Modernize Dashboard
                          </h6>
                          <p className="fs-2 mb-0 text-muted">Anil Kumar</p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <p className="mb-0 fs-3 text-dark">25%</p>
                    </td>
                    <td>
                      <span className="badge fw-semibold py-1 w-85 bg-info-subtle text-info">
                        Very high
                      </span>
                    </td>
                    <td>
                      <p className="fs-3 text-dark mb-0">$3.5k</p>
                    </td>
                    <td>
                      <div id="table-chart-2" />
                    </td>
                  </tr>
                  <tr>
                    <td className="ps-0 border-bottom-0">
                      <div className="d-flex align-items-center">
                        <div className="me-2 pe-1">
                          <img
                            src="assets/images/products/product-4.jpg"
                            className="rounded-2"
                            width={48}
                            height={48}
                            alt=""
                          />
                        </div>
                        <div>
                          <h6 className="fw-semibold mb-1">Dashboard Co</h6>
                          <p className="fs-2 mb-0 text-muted">George Cruize</p>
                        </div>
                      </div>
                    </td>
                    <td className="border-bottom-0">
                      <p className="mb-0 fs-3 text-dark">96.3%</p>
                    </td>
                    <td className="border-bottom-0">
                      <span className="badge fw-semibold py-1 w-85 bg-danger-subtle text-danger">
                        High
                      </span>
                    </td>
                    <td className="border-bottom-0">
                      <p className="fs-3 text-dark mb-0">$3.5k</p>
                    </td>
                    <td className="border-bottom-0">
                      <div id="table-chart-3" />
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
</div>

    </div>
  )
}

export default Commerce
