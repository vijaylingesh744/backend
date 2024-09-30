import React from 'react'

const Payment = () => {
    return (
        <div>
            <div className="body-wrapper">
  <div className="container-fluid">
    <div className="card bg-info-subtle shadow-none position-relative overflow-hidden mb-4">
      <div className="card-body px-4 py-3">
        <div className="row align-items-center">
          <div className="col-9">
            <h4 className="fw-semibold mb-8">Order Confirm</h4>
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
                Order Confirm
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
    <div className="checkout">
      <div className="card shadow-none border">
        <div className="card-body p-4">
          <div className="wizard-content">
            <form
              action="eco-checkout.html#"
              className="tab-wizard wizard-circle"
            >
              {/* Step 1 */}
              <h6>Cart</h6>
              <section>
                <div className="table-responsive">
                  <table className="table align-middle text-nowrap mb-0">
                    <thead className="fs-2">
                      <tr>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th className="text-end">Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border-bottom-0">
                          <div className="d-flex align-items-center gap-3 overflow-hidden">
                            <img
                              src="https://psediting.websites.co.in/obaju-turquoise/img/product-placeholder.png"
                              alt=""
                              className="img-fluid rounded"
                              width={80}
                            />
                            <div>
                              <h6 className="fw-semibold fs-4 mb-0">
                                Product Name
                              </h6>
                              <p className="mb-0">Lorem description ....</p>
                              {/* <a
                                href="javascript:void(0)"
                                className="text-danger fs-4"
                              >
                                <i className="ti ti-trash" />
                              </a> */}
                            </div>
                          </div>
                        </td>
                        <td className="border-bottom-0">
                          <div className="input-group input-group-sm flex-nowrap rounded">
                            <button
                              className="btn minus min-width-40 py-0 border-end border-muted border-end-0 text-muted"
                              type="button"
                              id="add1"
                            >
                              <i className="ti ti-minus" />
                            </button>
                            <input
                              type="text"
                              className="min-width-40 flex-grow-0 border border-muted text-muted fs-3 fw-semibold form-control text-center qty"
                              placeholder=""
                              aria-label="Example text with button addon"
                              aria-describedby="add1"
                              defaultValue={1}
                            />
                            <button
                              className="btn min-width-40 py-0 border border-muted border-start-0 text-muted add"
                              type="button"
                              id="addo2"
                            >
                              <i className="ti ti-plus" />
                            </button>
                          </div>
                        </td>
                        <td className="text-end border-bottom-0">
                          <h6 className="fs-4 fw-semibold mb-0">$285</h6>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="order-summary border rounded p-4 my-4">
                  <div className="p-3">
                    <h5 className="fs-5 fw-semibold mb-4">Order Summary</h5>
                    <div className="d-flex justify-content-between mb-4">
                      <p className="mb-0 fs-4">Sub Total</p>
                      <h6 className="mb-0 fs-4 fw-semibold">$285</h6>
                    </div>
                    <div className="d-flex justify-content-between mb-4">
                      <p className="mb-0 fs-4">Discount 5%</p>
                      <h6 className="mb-0 fs-4 fw-semibold text-danger">
                        -$14
                      </h6>
                    </div>
                    <div className="d-flex justify-content-between">
                      <h6 className="mb-0 fs-4 fw-semibold">Total</h6>
                      <h6 className="mb-0 fs-5 fw-semibold">$271</h6>
                    </div>
                  </div>
                </div>
              </section>
              {/* Step 2 */}
              <h6>Billing &amp; address</h6>
              <section>
                <div className="billing-address-content">
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="card shadow-none border">
                        <div className="card-body p-4">
                          <h6 className="mb-3 fs-4 fw-semibold">
                            Johnathan Doe
                          </h6>
                          <p className="mb-1 fs-2">
                            E601 Vrundavan Heights, godrej garden city - 382481
                          </p>
                          <h6 className="d-flex align-items-center gap-2 my-4 fw-semibold fs-4">
                          <i className="ti ti-device-mobile fs-7" />
                            9999501050
                          </h6>
                          <a
                            onClick={()=>window.location.href='/bank-payment'}
                            className="btn btn-outline-primary  billing-address"
                          >Confirm to This Address
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="payment-method-list payment-method">
                  <div className="delivery-option btn-group-active  card shadow-none border">
                    <div className="card-body p-4">
                      <h6 className="mb-3 fw-semibold fs-4">Delivery Option</h6>
                      <div
                        className="btn-group row w-100"
                        role="group"
                        aria-label="Basic radio toggle button group"
                      >
                        <div className="position-relative col-lg-6">
                          <input
                            type="radio"
                            className="btn-check z-1 top-50 start-0 ms-4 round-16 position-relative"
                            name="deliveryOpt1"
                            id="btnradio1"
                            autoComplete="off"
                            defaultChecked=""
                          />
                          <label
                            className="btn btn-outline-primary mb-0 p-3 rounded ps-5 w-100"
                            htmlFor="btnradio1"
                          >
                            <div className="text-start ps-2">
                              <h6 className="fs-4 fw-semibold mb-0">
                                Free delivery
                              </h6>
                              <p className="mb-0 text-muted">
                                Delivered on Firday, May 10
                              </p>
                            </div>
                          </label>
                        </div>
                        <div className="position-relative col-lg-6">
                          <input
                            type="radio"
                            className="btn-check z-1 top-50 start-0 ms-4 round-16 position-relative"
                            name="deliveryOpt1"
                            id="btnradio2"
                            autoComplete="off"
                          />
                          <label
                            className="btn btn-outline-primary mb-0 p-3 rounded ps-5 w-100"
                            htmlFor="btnradio2"
                          >
                            <div className="text-start ps-2">
                              <h6 className="fs-4 fw-semibold mb-0">
                                Fast delivery ($2,00)
                              </h6>
                              <p className="mb-0 text-muted">
                                Delivered on Wednesday, May 8
                              </p>
                            </div>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="payment-option btn-group-active  card shadow-none border">
                    <div className="card-body p-4">
                      <h6 className="mb-3 fw-semibold fs-4">Payment Option</h6>
                      <div className="row">
                        <div className="col-lg-8">
                          <div
                            className="btn-group row"
                            role="group"
                            aria-label="Basic radio toggle button group"
                          >
                            <div className="position-relative col-12 mb-3">
                              <input
                                type="radio"
                                className="btn-check z-1 top-50 start-0 ms-4 round-16 position-relative"
                                name="paymentType1"
                                id="btnradio3"
                                autoComplete="off"
                                defaultChecked=""
                              />
                              <label
                                className="btn btn-outline-primary mb-0 p-3 rounded ps-5 w-100"
                                htmlFor="btnradio3"
                              >
                                <div className="d-flex align-items-center">
                                  <div className="text-start ps-2">
                                    <h6 className="fs-4 fw-semibold mb-0">
                                      Pay with Paypal
                                    </h6>
                                    <p className="mb-0 text-muted">
                                      You will be redirected to PayPal website
                                      to complete your purchase securely.
                                    </p>
                                  </div>
                                  <img
                                    src="/assets/images/svgs/paypal.svg"
                                    alt=""
                                    className="img-fluid ms-auto"
                                  />
                                </div>
                              </label>
                            </div>
                            <div className="position-relative col-12 mb-3">
                              <input
                                type="radio"
                                className="btn-check z-1 top-50 start-0 ms-4 round-16 position-relative"
                                name="paymentType1"
                                id="btnradio4"
                                autoComplete="off"
                              />
                              <label
                                className="btn btn-outline-primary mb-0 p-3 rounded ps-5 w-100"
                                htmlFor="btnradio4"
                              >
                                <div className="d-flex align-items-center">
                                  <div className="text-start ps-2">
                                    <h6 className="fs-4 fw-semibold mb-0">
                                      Credit / Debit Card
                                    </h6>
                                    <p className="mb-0 text-muted">
                                      We support Mastercard, Visa, Discover and
                                      Stripe.
                                    </p>
                                  </div>
                                  <img
                                    src="/assets/images/svgs/mastercard.svg"
                                    alt=""
                                    className="img-fluid ms-auto"
                                  />
                                </div>
                              </label>
                            </div>
                            <div className="position-relative col-12">
                              <input
                                type="radio"
                                className="btn-check z-1 top-50 start-0 ms-4 round-16 position-relative"
                                name="paymentType1"
                                id="btnradio5"
                                autoComplete="off"
                              />
                              <label
                                className="btn btn-outline-primary mb-0 p-3 rounded ps-5 w-100"
                                htmlFor="btnradio5"
                              >
                                <div className="text-start ps-2">
                                  <h6 className="fs-4 fw-semibold mb-0">
                                    Cash on Delivery
                                  </h6>
                                  <p className="mb-0 text-muted">
                                    Pay with cash when your order is delivered.
                                  </p>
                                </div>
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-4">
                          <img
                            src="/assets/images/products/payment.svg"
                            alt=""
                            className="img-fluid"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
        </div>
    )
}

export default Payment
