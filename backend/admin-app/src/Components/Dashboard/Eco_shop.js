import React from 'react'

function Eco_shop() {
  return (
    <div className="body-wrapper">
    <div className="container-fluid">
      <div className="card bg-info-subtle shadow-none position-relative overflow-hidden mb-4">
        <div className="card-body px-4 py-3">
          <div className="row align-items-center">
            <div className="col-9">
              <h4 className="fw-semibold mb-8">Shop</h4>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a
                      className="text-muted text-decoration-none"
                      href="index"
                    >
                      Home
                    </a>
                  </li>
                  <li className="breadcrumb-item" aria-current="page">
                    Shop
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
      <div className="card position-relative overflow-hidden">
        <div className="shop-part d-flex w-100">
          <div className="shop-filters flex-shrink-0 border-end d-none d-lg-block">
            <ul className="list-group pt-2 border-bottom rounded-0">
              <h6 className="my-3 mx-4 fw-semibold">Filter by Category</h6>
              <li className="list-group-item border-0 p-0 mx-4 mb-2">
                <a
                  className="d-flex align-items-center gap-6 list-group-item-action text-dark px-3 py-6 rounded-1"
                  href="javascript:void(0)"
                >
                  <i className="ti ti-circles fs-5" />
                  All
                </a>
              </li>
              <li className="list-group-item border-0 p-0 mx-4 mb-2">
                <a
                  className="d-flex align-items-center gap-6 list-group-item-action text-dark px-3 py-6 rounded-1"
                  href="javascript:void(0)"
                >
                  <i className="ti ti-hanger fs-5" />
                  Fashion
                </a>
              </li>
              <li className="list-group-item border-0 p-0 mx-4 mb-2">
                <a
                  className="d-flex align-items-center gap-6 list-group-item-action text-dark px-3 py-6 rounded-1"
                  href="javascript:void(0)"
                >
                  <i className="ti ti-notebook fs-5" />
                  Books
                </a>
              </li>
              <li className="list-group-item border-0 p-0 mx-4 mb-2">
                <a
                  className="d-flex align-items-center gap-6 list-group-item-action text-dark px-3 py-6 rounded-1"
                  href="javascript:void(0)"
                >
                  <i className="ti ti-mood-smile fs-5" />
                  Toys
                </a>
              </li>
              <li className="list-group-item border-0 p-0 mx-4 mb-2">
                <a
                  className="d-flex align-items-center gap-6 list-group-item-action text-dark px-3 py-6 rounded-1"
                  href="javascript:void(0)"
                >
                  <i className="ti ti-device-laptop fs-5" />
                  Electronics
                </a>
              </li>
            </ul>
            <ul className="list-group pt-2 border-bottom rounded-0">
              <h6 className="my-3 mx-4 fw-semibold">Sort By</h6>
              <li className="list-group-item border-0 p-0 mx-4 mb-2">
                <a
                  className="d-flex align-items-center gap-6 list-group-item-action text-dark px-3 py-6 rounded-1"
                  href="javascript:void(0)"
                >
                  <i className="ti ti-ad-2 fs-5" />
                  Newest
                </a>
              </li>
              <li className="list-group-item border-0 p-0 mx-4 mb-2">
                <a
                  className="d-flex align-items-center gap-6 list-group-item-action text-dark px-3 py-6 rounded-1"
                  href="javascript:void(0)"
                >
                  <i className="ti ti-sort-ascending-2 fs-5" />
                  Price: High-Low
                </a>
              </li>
              <li className="list-group-item border-0 p-0 mx-4 mb-2">
                <a
                  className="d-flex align-items-center gap-6 list-group-item-action text-dark px-3 py-6 rounded-1"
                  href="javascript:void(0)"
                >
                  <i className="ti ti-sort-descending-2 fs-5" />
                  Price: Low-High
                </a>
              </li>
              <li className="list-group-item border-0 p-0 mx-4 mb-2">
                <a
                  className="d-flex align-items-center gap-6 list-group-item-action text-dark px-3 py-6 rounded-1"
                  href="javascript:void(0)"
                >
                  <i className="ti ti-ad-2 fs-5" />
                  Discounted
                </a>
              </li>
            </ul>
            <div className="by-gender border-bottom rounded-0">
              <h6 className="mt-4 mb-3 mx-4 fw-semibold">By Gender</h6>
              <div className="pb-4 px-4">
                <div className="form-check py-2 mb-0">
                  <input
                    className="form-check-input p-2"
                    type="radio"
                    name="exampleRadios"
                    id="exampleRadios1"
                    defaultValue="option1"
                    defaultChecked=""
                  />
                  <label
                    className="form-check-label d-flex align-items-center ps-2"
                    htmlFor="exampleRadios1"
                  >
                    All
                  </label>
                </div>
                <div className="form-check py-2 mb-0">
                  <input
                    className="form-check-input p-2"
                    type="radio"
                    name="exampleRadios"
                    id="exampleRadios2"
                    defaultValue="option1"
                  />
                  <label
                    className="form-check-label d-flex align-items-center ps-2"
                    htmlFor="exampleRadios2"
                  >
                    Men
                  </label>
                </div>
                <div className="form-check py-2 mb-0">
                  <input
                    className="form-check-input p-2"
                    type="radio"
                    name="exampleRadios"
                    id="exampleRadios3"
                    defaultValue="option1"
                  />
                  <label
                    className="form-check-label d-flex align-items-center ps-2"
                    htmlFor="exampleRadios3"
                  >
                    Women
                  </label>
                </div>
                <div className="form-check py-2 mb-0">
                  <input
                    className="form-check-input p-2"
                    type="radio"
                    name="exampleRadios"
                    id="exampleRadios4"
                    defaultValue="option1"
                  />
                  <label
                    className="form-check-label d-flex align-items-center ps-2"
                    htmlFor="exampleRadios4"
                  >
                    Kids
                  </label>
                </div>
              </div>
            </div>
            <div className="by-pricing border-bottom rounded-0">
              <h6 className="mt-4 mb-3 mx-4 fw-semibold">By Pricing</h6>
              <div className="pb-4 px-4">
                <div className="form-check py-2 mb-0">
                  <input
                    className="form-check-input p-2"
                    type="radio"
                    name="exampleRadios"
                    id="exampleRadios5"
                    defaultValue="option1"
                    defaultChecked=""
                  />
                  <label
                    className="form-check-label d-flex align-items-center ps-2"
                    htmlFor="exampleRadios5"
                  >
                    All
                  </label>
                </div>
                <div className="form-check py-2 mb-0">
                  <input
                    className="form-check-input p-2"
                    type="radio"
                    name="exampleRadios"
                    id="exampleRadios6"
                    defaultValue="option1"
                  />
                  <label
                    className="form-check-label d-flex align-items-center ps-2"
                    htmlFor="exampleRadios6"
                  >
                    0-50
                  </label>
                </div>
                <div className="form-check py-2 mb-0">
                  <input
                    className="form-check-input p-2"
                    type="radio"
                    name="exampleRadios"
                    id="exampleRadios7"
                    defaultValue="option1"
                  />
                  <label
                    className="form-check-label d-flex align-items-center ps-2"
                    htmlFor="exampleRadios7"
                  >
                    50-100
                  </label>
                </div>
                <div className="form-check py-2 mb-0">
                  <input
                    className="form-check-input p-2"
                    type="radio"
                    name="exampleRadios"
                    id="exampleRadios8"
                    defaultValue="option1"
                  />
                  <label
                    className="form-check-label d-flex align-items-center ps-2"
                    htmlFor="exampleRadios8"
                  >
                    100-200
                  </label>
                </div>
                <div className="form-check py-2 mb-0">
                  <input
                    className="form-check-input p-2"
                    type="radio"
                    name="exampleRadios"
                    id="exampleRadios9"
                    defaultValue="option1"
                  />
                  <label
                    className="form-check-label d-flex align-items-center ps-2"
                    htmlFor="exampleRadios9"
                  >
                    Over 200
                  </label>
                </div>
              </div>
            </div>
            <div className="by-colors border-bottom rounded-0">
              <h6 className="mt-4 mb-3 mx-4 fw-semibold">By Colors</h6>
              <div className="pb-4 px-4">
                <ul className="list-unstyled d-flex flex-wrap align-items-center gap-2 mb-0">
                  <li className="shop-color-list">
                    <a
                      className="shop-colors-item rounded-circle d-block shop-colors-1"
                      href="javascript:void(0)"
                    />
                  </li>
                  <li className="shop-color-list">
                    <a
                      className="shop-colors-item rounded-circle d-block shop-colors-2"
                      href="javascript:void(0)"
                    />
                  </li>
                  <li className="shop-color-list">
                    <a
                      className="shop-colors-item rounded-circle d-block shop-colors-3"
                      href="javascript:void(0)"
                    />
                  </li>
                  <li className="shop-color-list">
                    <a
                      className="shop-colors-item rounded-circle d-block shop-colors-4"
                      href="javascript:void(0)"
                    />
                  </li>
                  <li className="shop-color-list">
                    <a
                      className="shop-colors-item rounded-circle d-block shop-colors-5"
                      href="javascript:void(0)"
                    />
                  </li>
                  <li className="shop-color-list">
                    <a
                      className="shop-colors-item rounded-circle d-block shop-colors-6"
                      href="javascript:void(0)"
                    />
                  </li>
                  <li className="shop-color-list">
                    <a
                      className="shop-colors-item rounded-circle d-block shop-colors-7"
                      href="javascript:void(0)"
                    />
                  </li>
                </ul>
              </div>
            </div>
            <div className="p-4">
              <a href="javascript:void(0)" className="btn btn-primary w-100">
                Reset Filters
              </a>
            </div>
          </div>
          <div className="card-body p-4 pb-0">
            <div className="d-flex justify-content-between align-items-center gap-6 mb-4">
              <a
                className="btn btn-primary d-lg-none d-flex"
                data-bs-toggle="offcanvas"
                href="eco-shop.html#filtercategory"
                role="button"
                aria-controls="filtercategory"
              >
                <i className="ti ti-menu-2 fs-6" />
              </a>
              <h5 className="fs-5 mb-0 d-none d-lg-block">Products</h5>
              <form className="position-relative">
                <input
                  type="text"
                  className="form-control search-chat py-2 ps-5"
                  id="text-srh"
                  placeholder="Search Product"
                />
                <i className="ti ti-search position-absolute top-50 start-0 translate-middle-y fs-6 text-dark ms-3" />
              </form>
            </div>
            <div className="row">
              <div className="col-sm-6 col-xl-4">
                <div className="card hover-img overflow-hidden rounded-2">
                  <div className="position-relative">
                    <a href="eco-shop-detail">
                      <img
                        src="assets/images/products/s11.jpg"
                        className="card-img-top rounded-0"
                        alt="..."
                      />
                    </a>
                    <a
                      href="javascript:void(0)"
                      className="text-bg-primary rounded-circle p-2 text-white d-inline-flex position-absolute bottom-0 end-0 mb-n3 me-3"
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      data-bs-title="Add To Cart"
                    >
                      <i className="ti ti-basket fs-4" />
                    </a>
                  </div>
                  <div className="card-body pt-3 p-4">
                    <h6 className="fw-semibold fs-4">Cute Soft Teddybear</h6>
                    <div className="d-flex align-items-center justify-content-between">
                      <h6 className="fw-semibold fs-4 mb-0">
                        $285{" "}
                        <span className="ms-2 fw-normal text-muted fs-3">
                          <del>$345</del>
                        </span>
                      </h6>
                      <ul className="list-unstyled d-flex align-items-center mb-0">
                        <li>
                          <a className="me-1" href="javascript:void(0)">
                            <i className="ti ti-star text-warning" />
                          </a>
                        </li>
                        <li>
                          <a className="me-1" href="javascript:void(0)">
                            <i className="ti ti-star text-warning" />
                          </a>
                        </li>
                        <li>
                          <a className="me-1" href="javascript:void(0)">
                            <i className="ti ti-star text-warning" />
                          </a>
                        </li>
                        <li>
                          <a className="me-1" href="javascript:void(0)">
                            <i className="ti ti-star text-warning" />
                          </a>
                        </li>
                        <li>
                          <a className="" href="javascript:void(0)">
                            <i className="ti ti-star text-warning" />
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-xl-4">
                <div className="card hover-img overflow-hidden rounded-2">
                  <div className="position-relative">
                    <a href="eco-shop-detail">
                      <img
                        src="assets/images/products/s5.jpg"
                        className="card-img-top rounded-0"
                        alt="..."
                      />
                    </a>
                    <a
                      href="javascript:void(0)"
                      className="text-bg-primary rounded-circle p-2 text-white d-inline-flex position-absolute bottom-0 end-0 mb-n3 me-3"
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      data-bs-title="Add To Cart"
                    >
                      <i className="ti ti-basket fs-4" />
                    </a>
                  </div>
                  <div className="card-body pt-3 p-4">
                    <h6 className="fw-semibold fs-4">MacBook Air Pro</h6>
                    <div className="d-flex align-items-center justify-content-between">
                      <h6 className="fw-semibold fs-4 mb-0">
                        $650{" "}
                        <span className="ms-2 fw-normal text-muted fs-3">
                          <del>$900</del>
                        </span>
                      </h6>
                      <ul className="list-unstyled d-flex align-items-center mb-0">
                        <li>
                          <a className="me-1" href="javascript:void(0)">
                            <i className="ti ti-star text-warning" />
                          </a>
                        </li>
                        <li>
                          <a className="me-1" href="javascript:void(0)">
                            <i className="ti ti-star text-warning" />
                          </a>
                        </li>
                        <li>
                          <a className="me-1" href="javascript:void(0)">
                            <i className="ti ti-star text-warning" />
                          </a>
                        </li>
                        <li>
                          <a className="me-1" href="javascript:void(0)">
                            <i className="ti ti-star text-warning" />
                          </a>
                        </li>
                        <li>
                          <a className="" href="javascript:void(0)">
                            <i className="ti ti-star text-warning" />
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-xl-4">
                <div className="card hover-img overflow-hidden rounded-2">
                  <div className="position-relative">
                    <a href="eco-shop-detail">
                      <img
                        src="assets/images/products/s6.jpg"
                        className="card-img-top rounded-0"
                        alt="..."
                      />
                    </a>
                    <a
                      href="javascript:void(0)"
                      className="text-bg-primary rounded-circle p-2 text-white d-inline-flex position-absolute bottom-0 end-0 mb-n3 me-3"
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      data-bs-title="Add To Cart"
                    >
                      <i className="ti ti-basket fs-4" />
                    </a>
                  </div>
                  <div className="card-body pt-3 p-4">
                    <h6 className="fw-semibold fs-4">Gaming Console</h6>
                    <div className="d-flex align-items-center justify-content-between">
                      <h6 className="fw-semibold fs-4 mb-0">
                        $25{" "}
                        <span className="ms-2 fw-normal text-muted fs-3">
                          <del>$31</del>
                        </span>
                      </h6>
                      <ul className="list-unstyled d-flex align-items-center mb-0">
                        <li>
                          <a className="me-1" href="javascript:void(0)">
                            <i className="ti ti-star text-warning" />
                          </a>
                        </li>
                        <li>
                          <a className="me-1" href="javascript:void(0)">
                            <i className="ti ti-star text-warning" />
                          </a>
                        </li>
                        <li>
                          <a className="me-1" href="javascript:void(0)">
                            <i className="ti ti-star text-warning" />
                          </a>
                        </li>
                        <li>
                          <a className="me-1" href="javascript:void(0)">
                            <i className="ti ti-star text-warning" />
                          </a>
                        </li>
                        <li>
                          <a className="" href="javascript:void(0)">
                            <i className="ti ti-star text-warning" />
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-xl-4">
                <div className="card hover-img overflow-hidden rounded-2">
                  <div className="position-relative">
                    <a href="eco-shop-detail">
                      <img
                        src="assets/images/products/s4.jpg"
                        className="card-img-top rounded-0"
                        alt="..."
                      />
                    </a>
                    <a
                      href="javascript:void(0)"
                      className="text-bg-primary rounded-circle p-2 text-white d-inline-flex position-absolute bottom-0 end-0 mb-n3 me-3"
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      data-bs-title="Add To Cart"
                    >
                      <i className="ti ti-basket fs-4" />
                    </a>
                  </div>
                  <div className="card-body pt-3 p-4">
                    <h6 className="fw-semibold fs-4">Boat Headphone</h6>
                    <div className="d-flex align-items-center justify-content-between">
                      <h6 className="fw-semibold fs-4 mb-0">
                        $50{" "}
                        <span className="ms-2 fw-normal text-muted fs-3">
                          <del>$65</del>
                        </span>
                      </h6>
                      <ul className="list-unstyled d-flex align-items-center mb-0">
                        <li>
                          <a className="me-1" href="javascript:void(0)">
                            <i className="ti ti-star text-warning" />
                          </a>
                        </li>
                        <li>
                          <a className="me-1" href="javascript:void(0)">
                            <i className="ti ti-star text-warning" />
                          </a>
                        </li>
                        <li>
                          <a className="me-1" href="javascript:void(0)">
                            <i className="ti ti-star text-warning" />
                          </a>
                        </li>
                        <li>
                          <a className="me-1" href="javascript:void(0)">
                            <i className="ti ti-star text-warning" />
                          </a>
                        </li>
                        <li>
                          <a className="" href="javascript:void(0)">
                            <i className="ti ti-star text-warning" />
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-xl-4">
                <div className="card hover-img overflow-hidden rounded-2">
                  <div className="position-relative">
                    <a href="eco-shop-detail">
                      <img
                        src="assets/images/products/s10.jpg"
                        className="card-img-top rounded-0"
                        alt="..."
                      />
                    </a>
                    <a
                      href="javascript:void(0)"
                      className="text-bg-primary rounded-circle p-2 text-white d-inline-flex position-absolute bottom-0 end-0 mb-n3 me-3"
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      data-bs-title="Add To Cart"
                    >
                      <i className="ti ti-basket fs-4" />
                    </a>
                  </div>
                  <div className="card-body pt-3 p-4">
                    <h6 className="fw-semibold fs-4">Toy Dino for Fun</h6>
                    <div className="d-flex align-items-center justify-content-between">
                      <h6 className="fw-semibold fs-4 mb-0">
                        $210{" "}
                        <span className="ms-2 fw-normal text-muted fs-3">
                          <del>$250</del>
                        </span>
                      </h6>
                      <ul className="list-unstyled d-flex align-items-center mb-0">
                        <li>
                          <a className="me-1" href="javascript:void(0)">
                            <i className="ti ti-star text-warning" />
                          </a>
                        </li>
                        <li>
                          <a className="me-1" href="javascript:void(0)">
                            <i className="ti ti-star text-warning" />
                          </a>
                        </li>
                        <li>
                          <a className="me-1" href="javascript:void(0)">
                            <i className="ti ti-star text-warning" />
                          </a>
                        </li>
                        <li>
                          <a className="me-1" href="javascript:void(0)">
                            <i className="ti ti-star text-warning" />
                          </a>
                        </li>
                        <li>
                          <a className="" href="javascript:void(0)">
                            <i className="ti ti-star text-warning" />
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-xl-4">
                <div className="card hover-img overflow-hidden rounded-2">
                  <div className="position-relative">
                    <a href="eco-shop-detail">
                      <img
                        src="assets/images/products/s7.jpg"
                        className="card-img-top rounded-0"
                        alt="..."
                      />
                    </a>
                    <a
                      href="javascript:void(0)"
                      className="text-bg-primary rounded-circle p-2 text-white d-inline-flex position-absolute bottom-0 end-0 mb-n3 me-3"
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      data-bs-title="Add To Cart"
                    >
                      <i className="ti ti-basket fs-4" />
                    </a>
                  </div>
                  <div className="card-body pt-3 p-4">
                    <h6 className="fw-semibold fs-4">Red Valvet Dress</h6>
                    <div className="d-flex align-items-center justify-content-between">
                      <h6 className="fw-semibold fs-4 mb-0">
                        $150{" "}
                        <span className="ms-2 fw-normal text-muted fs-3">
                          <del>$200</del>
                        </span>
                      </h6>
                      <ul className="list-unstyled d-flex align-items-center mb-0">
                        <li>
                          <a className="me-1" href="javascript:void(0)">
                            <i className="ti ti-star text-warning" />
                          </a>
                        </li>
                        <li>
                          <a className="me-1" href="javascript:void(0)">
                            <i className="ti ti-star text-warning" />
                          </a>
                        </li>
                        <li>
                          <a className="me-1" href="javascript:void(0)">
                            <i className="ti ti-star text-warning" />
                          </a>
                        </li>
                        <li>
                          <a className="me-1" href="javascript:void(0)">
                            <i className="ti ti-star text-warning" />
                          </a>
                        </li>
                        <li>
                          <a className="" href="javascript:void(0)">
                            <i className="ti ti-star text-warning" />
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-xl-4">
                <div className="card hover-img overflow-hidden rounded-2">
                  <div className="position-relative">
                    <a href="eco-shop-detail">
                      <img
                        src="assets/images/products/s8.jpg"
                        className="card-img-top rounded-0"
                        alt="..."
                      />
                    </a>
                    <a
                      href="javascript:void(0)"
                      className="text-bg-primary rounded-circle p-2 text-white d-inline-flex position-absolute bottom-0 end-0 mb-n3 me-3"
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      data-bs-title="Add To Cart"
                    >
                      <i className="ti ti-basket fs-4" />
                    </a>
                  </div>
                  <div className="card-body pt-3 p-4">
                    <h6 className="fw-semibold fs-4">Shoes for Girls</h6>
                    <div className="d-flex align-items-center justify-content-between">
                      <h6 className="fw-semibold fs-4 mb-0">
                        $300{" "}
                        <span className="ms-2 fw-normal text-muted fs-3">
                          <del>$380</del>
                        </span>
                      </h6>
                      <ul className="list-unstyled d-flex align-items-center mb-0">
                        <li>
                          <a className="me-1" href="javascript:void(0)">
                            <i className="ti ti-star text-warning" />
                          </a>
                        </li>
                        <li>
                          <a className="me-1" href="javascript:void(0)">
                            <i className="ti ti-star text-warning" />
                          </a>
                        </li>
                        <li>
                          <a className="me-1" href="javascript:void(0)">
                            <i className="ti ti-star text-warning" />
                          </a>
                        </li>
                        <li>
                          <a className="me-1" href="javascript:void(0)">
                            <i className="ti ti-star text-warning" />
                          </a>
                        </li>
                        <li>
                          <a className="" href="javascript:void(0)">
                            <i className="ti ti-star text-warning" />
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-xl-4">
                <div className="card hover-img overflow-hidden rounded-2">
                  <div className="position-relative">
                    <a href="eco-shop-detail">
                      <img
                        src="assets/images/products/s9.jpg"
                        className="card-img-top rounded-0"
                        alt="..."
                      />
                    </a>
                    <a
                      href="javascript:void(0)"
                      className="text-bg-primary rounded-circle p-2 text-white d-inline-flex position-absolute bottom-0 end-0 mb-n3 me-3"
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      data-bs-title="Add To Cart"
                    >
                      <i className="ti ti-basket fs-4" />
                    </a>
                  </div>
                  <div className="card-body pt-3 p-4">
                    <h6 className="fw-semibold fs-4">Short &amp; Sweet Purse</h6>
                    <div className="d-flex align-items-center justify-content-between">
                      <h6 className="fw-semibold fs-4 mb-0">
                        $175{" "}
                        <span className="ms-2 fw-normal text-muted fs-3">
                          <del>$200</del>
                        </span>
                      </h6>
                      <ul className="list-unstyled d-flex align-items-center mb-0">
                        <li>
                          <a className="me-1" href="javascript:void(0)">
                            <i className="ti ti-star text-warning" />
                          </a>
                        </li>
                        <li>
                          <a className="me-1" href="javascript:void(0)">
                            <i className="ti ti-star text-warning" />
                          </a>
                        </li>
                        <li>
                          <a className="me-1" href="javascript:void(0)">
                            <i className="ti ti-star text-warning" />
                          </a>
                        </li>
                        <li>
                          <a className="me-1" href="javascript:void(0)">
                            <i className="ti ti-star text-warning" />
                          </a>
                        </li>
                        <li>
                          <a className="" href="javascript:void(0)">
                            <i className="ti ti-star text-warning" />
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-xl-4">
                <div className="card hover-img overflow-hidden rounded-2">
                  <div className="position-relative">
                    <a href="eco-shop-detail">
                      <img
                        src="assets/images/products/s3.jpg"
                        className="card-img-top rounded-0"
                        alt="..."
                      />
                    </a>
                    <a
                      href="javascript:void(0)"
                      className="text-bg-primary rounded-circle p-2 text-white d-inline-flex position-absolute bottom-0 end-0 mb-n3 me-3"
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      data-bs-title="Add To Cart"
                    >
                      <i className="ti ti-basket fs-4" />
                    </a>
                  </div>
                  <div className="card-body pt-3 p-4">
                    <h6 className="fw-semibold fs-4">The Psychology of Money</h6>
                    <div className="d-flex align-items-center justify-content-between">
                      <h6 className="fw-semibold fs-4 mb-0">
                        $125{" "}
                        <span className="ms-2 fw-normal text-muted fs-3">
                          <del>$137</del>
                        </span>
                      </h6>
                      <ul className="list-unstyled d-flex align-items-center mb-0">
                        <li>
                          <a className="me-1" href="javascript:void(0)">
                            <i className="ti ti-star text-warning" />
                          </a>
                        </li>
                        <li>
                          <a className="me-1" href="javascript:void(0)">
                            <i className="ti ti-star text-warning" />
                          </a>
                        </li>
                        <li>
                          <a className="me-1" href="javascript:void(0)">
                            <i className="ti ti-star text-warning" />
                          </a>
                        </li>
                        <li>
                          <a className="me-1" href="javascript:void(0)">
                            <i className="ti ti-star text-warning" />
                          </a>
                        </li>
                        <li>
                          <a className="" href="javascript:void(0)">
                            <i className="ti ti-star text-warning" />
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-xl-4">
                <div className="card hover-img overflow-hidden rounded-2">
                  <div className="position-relative">
                    <a href="eco-shop-detail">
                      <img
                        src="assets/images/products/s1.jpg"
                        className="card-img-top rounded-0"
                        alt="..."
                      />
                    </a>
                    <a
                      href="javascript:void(0)"
                      className="text-bg-primary rounded-circle p-2 text-white d-inline-flex position-absolute bottom-0 end-0 mb-n3 me-3"
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      data-bs-title="Add To Cart"
                    >
                      <i className="ti ti-basket fs-4" />
                    </a>
                  </div>
                  <div className="card-body pt-3 p-4">
                    <h6 className="fw-semibold fs-4">How Innovation Works</h6>
                    <div className="d-flex align-items-center justify-content-between">
                      <h6 className="fw-semibold fs-4 mb-0">
                        $275{" "}
                        <span className="ms-2 fw-normal text-muted fs-3">
                          <del>$350</del>
                        </span>
                      </h6>
                      <ul className="list-unstyled d-flex align-items-center mb-0">
                        <li>
                          <a className="me-1" href="javascript:void(0)">
                            <i className="ti ti-star text-warning" />
                          </a>
                        </li>
                        <li>
                          <a className="me-1" href="javascript:void(0)">
                            <i className="ti ti-star text-warning" />
                          </a>
                        </li>
                        <li>
                          <a className="me-1" href="javascript:void(0)">
                            <i className="ti ti-star text-warning" />
                          </a>
                        </li>
                        <li>
                          <a className="me-1" href="javascript:void(0)">
                            <i className="ti ti-star text-warning" />
                          </a>
                        </li>
                        <li>
                          <a className="" href="javascript:void(0)">
                            <i className="ti ti-star text-warning" />
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-xl-4">
                <div className="card hover-img overflow-hidden rounded-2">
                  <div className="position-relative">
                    <a href="eco-shop-detail">
                      <img
                        src="assets/images/products/s12.jpg"
                        className="card-img-top rounded-0"
                        alt="..."
                      />
                    </a>
                    <a
                      href="javascript:void(0)"
                      className="text-bg-primary rounded-circle p-2 text-white d-inline-flex position-absolute bottom-0 end-0 mb-n3 me-3"
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      data-bs-title="Add To Cart"
                    >
                      <i className="ti ti-basket fs-4" />
                    </a>
                  </div>
                  <div className="card-body pt-3 p-4">
                    <h6 className="fw-semibold fs-4">Little Angel Toy</h6>
                    <div className="d-flex align-items-center justify-content-between">
                      <h6 className="fw-semibold fs-4 mb-0">
                        $5{" "}
                        <span className="ms-2 fw-normal text-muted fs-3">
                          <del>$10</del>
                        </span>
                      </h6>
                      <ul className="list-unstyled d-flex align-items-center mb-0">
                        <li>
                          <a className="me-1" href="javascript:void(0)">
                            <i className="ti ti-star text-warning" />
                          </a>
                        </li>
                        <li>
                          <a className="me-1" href="javascript:void(0)">
                            <i className="ti ti-star text-warning" />
                          </a>
                        </li>
                        <li>
                          <a className="me-1" href="javascript:void(0)">
                            <i className="ti ti-star text-warning" />
                          </a>
                        </li>
                        <li>
                          <a className="me-1" href="javascript:void(0)">
                            <i className="ti ti-star text-warning" />
                          </a>
                        </li>
                        <li>
                          <a className="" href="javascript:void(0)">
                            <i className="ti ti-star text-warning" />
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-xl-4">
                <div className="card hover-img overflow-hidden rounded-2">
                  <div className="position-relative">
                    <a href="eco-shop-detail">
                      <img
                        src="assets/images/products/s2.jpg"
                        className="card-img-top rounded-0"
                        alt="..."
                      />
                    </a>
                    <a
                      href="javascript:void(0)"
                      className="text-bg-primary rounded-circle p-2 text-white d-inline-flex position-absolute bottom-0 end-0 mb-n3 me-3"
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      data-bs-title="Add To Cart"
                    >
                      <i className="ti ti-basket fs-4" />
                    </a>
                  </div>
                  <div className="card-body pt-3 p-4">
                    <h6 className="fw-semibold fs-4">Psalms Book for Growth</h6>
                    <div className="d-flex align-items-center justify-content-between">
                      <h6 className="fw-semibold fs-4 mb-0">
                        $89{" "}
                        <span className="ms-2 fw-normal text-muted fs-3">
                          <del>$99</del>
                        </span>
                      </h6>
                      <ul className="list-unstyled d-flex align-items-center mb-0">
                        <li>
                          <a className="me-1" href="javascript:void(0)">
                            <i className="ti ti-star text-warning" />
                          </a>
                        </li>
                        <li>
                          <a className="me-1" href="javascript:void(0)">
                            <i className="ti ti-star text-warning" />
                          </a>
                        </li>
                        <li>
                          <a className="me-1" href="javascript:void(0)">
                            <i className="ti ti-star text-warning" />
                          </a>
                        </li>
                        <li>
                          <a className="me-1" href="javascript:void(0)">
                            <i className="ti ti-star text-warning" />
                          </a>
                        </li>
                        <li>
                          <a className="" href="javascript:void(0)">
                            <i className="ti ti-star text-warning" />
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="offcanvas offcanvas-start"
            tabIndex={-1}
            id="filtercategory"
            aria-labelledby="filtercategoryLabel"
          >
            <div className="offcanvas-body shop-filters w-100 p-0">
              <ul className="list-group pt-2 border-bottom rounded-0">
                <h6 className="my-3 mx-4 fw-semibold">Filter by Category</h6>
                <li className="list-group-item border-0 p-0 mx-4 mb-2">
                  <a
                    className="d-flex align-items-center gap-6 list-group-item-action text-dark px-3 py-6 rounded-1"
                    href="javascript:void(0)"
                  >
                    <i className="ti ti-circles fs-5" />
                    All
                  </a>
                </li>
                <li className="list-group-item border-0 p-0 mx-4 mb-2">
                  <a
                    className="d-flex align-items-center gap-6 list-group-item-action text-dark px-3 py-6 rounded-1"
                    href="javascript:void(0)"
                  >
                    <i className="ti ti-hanger fs-5" />
                    Fashion
                  </a>
                </li>
                <li className="list-group-item border-0 p-0 mx-4 mb-2">
                  <a
                    className="d-flex align-items-center gap-6 list-group-item-action text-dark px-3 py-6 rounded-1"
                    href="javascript:void(0)"
                  >
                    <i className="ti ti-notebook fs-5" />
                    Books
                  </a>
                </li>
                <li className="list-group-item border-0 p-0 mx-4 mb-2">
                  <a
                    className="d-flex align-items-center gap-6 list-group-item-action text-dark px-3 py-6 rounded-1"
                    href="javascript:void(0)"
                  >
                    <i className="ti ti-mood-smile fs-5" />
                    Toys
                  </a>
                </li>
                <li className="list-group-item border-0 p-0 mx-4 mb-2">
                  <a
                    className="d-flex align-items-center gap-6 list-group-item-action text-dark px-3 py-6 rounded-1"
                    href="javascript:void(0)"
                  >
                    <i className="ti ti-device-laptop fs-5" />
                    Electronics
                  </a>
                </li>
              </ul>
              <ul className="list-group pt-2 border-bottom rounded-0">
                <h6 className="my-3 mx-4 fw-semibold">Sort By</h6>
                <li className="list-group-item border-0 p-0 mx-4 mb-2">
                  <a
                    className="d-flex align-items-center gap-6 list-group-item-action text-dark px-3 py-6 rounded-1"
                    href="javascript:void(0)"
                  >
                    <i className="ti ti-ad-2 fs-5" />
                    Newest
                  </a>
                </li>
                <li className="list-group-item border-0 p-0 mx-4 mb-2">
                  <a
                    className="d-flex align-items-center gap-6 list-group-item-action text-dark px-3 py-6 rounded-1"
                    href="javascript:void(0)"
                  >
                    <i className="ti ti-sort-ascending-2 fs-5" />
                    Price: High-Low
                  </a>
                </li>
                <li className="list-group-item border-0 p-0 mx-4 mb-2">
                  <a
                    className="d-flex align-items-center gap-6 list-group-item-action text-dark px-3 py-6 rounded-1"
                    href="javascript:void(0)"
                  >
                    <i className="ti ti-sort-descending-2 fs-5" />
                    Price: Low-High
                  </a>
                </li>
                <li className="list-group-item border-0 p-0 mx-4 mb-2">
                  <a
                    className="d-flex align-items-center gap-6 list-group-item-action text-dark px-3 py-6 rounded-1"
                    href="javascript:void(0)"
                  >
                    <i className="ti ti-ad-2 fs-5" />
                    Discounted
                  </a>
                </li>
              </ul>
              <div className="by-gender border-bottom rounded-0">
                <h6 className="mt-4 mb-3 mx-4 fw-semibold">By Gender</h6>
                <div className="pb-4 px-4">
                  <div className="form-check py-2 mb-0">
                    <input
                      className="form-check-input p-2"
                      type="radio"
                      name="exampleRadios"
                      id="exampleRadios10"
                      defaultValue="option1"
                      defaultChecked=""
                    />
                    <label
                      className="form-check-label d-flex align-items-center ps-2"
                      htmlFor="exampleRadios10"
                    >
                      All
                    </label>
                  </div>
                  <div className="form-check py-2 mb-0">
                    <input
                      className="form-check-input p-2"
                      type="radio"
                      name="exampleRadios"
                      id="exampleRadios11"
                      defaultValue="option1"
                    />
                    <label
                      className="form-check-label d-flex align-items-center ps-2"
                      htmlFor="exampleRadios11"
                    >
                      Men
                    </label>
                  </div>
                  <div className="form-check py-2 mb-0">
                    <input
                      className="form-check-input p-2"
                      type="radio"
                      name="exampleRadios"
                      id="exampleRadios12"
                      defaultValue="option1"
                    />
                    <label
                      className="form-check-label d-flex align-items-center ps-2"
                      htmlFor="exampleRadios12"
                    >
                      Women
                    </label>
                  </div>
                  <div className="form-check py-2 mb-0">
                    <input
                      className="form-check-input p-2"
                      type="radio"
                      name="exampleRadios"
                      id="exampleRadios13"
                      defaultValue="option1"
                    />
                    <label
                      className="form-check-label d-flex align-items-center ps-2"
                      htmlFor="exampleRadios13"
                    >
                      Kids
                    </label>
                  </div>
                </div>
              </div>
              <div className="by-pricing border-bottom rounded-0">
                <h6 className="mt-4 mb-3 mx-4 fw-semibold">By Pricing</h6>
                <div className="pb-4 px-4">
                  <div className="form-check py-2 mb-0">
                    <input
                      className="form-check-input p-2"
                      type="radio"
                      name="exampleRadios"
                      id="exampleRadios14"
                      defaultValue="option1"
                      defaultChecked=""
                    />
                    <label
                      className="form-check-label d-flex align-items-center ps-2"
                      htmlFor="exampleRadios14"
                    >
                      All
                    </label>
                  </div>
                  <div className="form-check py-2 mb-0">
                    <input
                      className="form-check-input p-2"
                      type="radio"
                      name="exampleRadios"
                      id="exampleRadios15"
                      defaultValue="option1"
                    />
                    <label
                      className="form-check-label d-flex align-items-center ps-2"
                      htmlFor="exampleRadios15"
                    >
                      0-50
                    </label>
                  </div>
                  <div className="form-check py-2 mb-0">
                    <input
                      className="form-check-input p-2"
                      type="radio"
                      name="exampleRadios"
                      id="exampleRadios16"
                      defaultValue="option1"
                    />
                    <label
                      className="form-check-label d-flex align-items-center ps-2"
                      htmlFor="exampleRadios16"
                    >
                      50-100
                    </label>
                  </div>
                  <div className="form-check py-2 mb-0">
                    <input
                      className="form-check-input p-2"
                      type="radio"
                      name="exampleRadios"
                      id="exampleRadios17"
                      defaultValue="option1"
                    />
                    <label
                      className="form-check-label d-flex align-items-center ps-2"
                      htmlFor="exampleRadios17"
                    >
                      100-200
                    </label>
                  </div>
                  <div className="form-check py-2 mb-0">
                    <input
                      className="form-check-input p-2"
                      type="radio"
                      name="exampleRadios"
                      id="exampleRadios18"
                      defaultValue="option1"
                    />
                    <label
                      className="form-check-label d-flex align-items-center ps-2"
                      htmlFor="exampleRadios18"
                    >
                      Over 200
                    </label>
                  </div>
                </div>
              </div>
              <div className="by-colors border-bottom rounded-0">
                <h6 className="mt-4 mb-3 mx-4 fw-semibold">By Colors</h6>
                <div className="pb-4 px-4">
                  <ul className="list-unstyled d-flex flex-wrap align-items-center gap-2 mb-0">
                    <li className="shop-color-list">
                      <a
                        className="shop-colors-item rounded-circle d-block shop-colors-1"
                        href="javascript:void(0)"
                      />
                    </li>
                    <li className="shop-color-list">
                      <a
                        className="shop-colors-item rounded-circle d-block shop-colors-2"
                        href="javascript:void(0)"
                      />
                    </li>
                    <li className="shop-color-list">
                      <a
                        className="shop-colors-item rounded-circle d-block shop-colors-3"
                        href="javascript:void(0)"
                      />
                    </li>
                    <li className="shop-color-list">
                      <a
                        className="shop-colors-item rounded-circle d-block shop-colors-4"
                        href="javascript:void(0)"
                      />
                    </li>
                    <li className="shop-color-list">
                      <a
                        className="shop-colors-item rounded-circle d-block shop-colors-5"
                        href="javascript:void(0)"
                      />
                    </li>
                    <li className="shop-color-list">
                      <a
                        className="shop-colors-item rounded-circle d-block shop-colors-6"
                        href="javascript:void(0)"
                      />
                    </li>
                    <li className="shop-color-list">
                      <a
                        className="shop-colors-item rounded-circle d-block shop-colors-7"
                        href="javascript:void(0)"
                      />
                    </li>
                  </ul>
                </div>
              </div>
              <div className="p-4">
                <a href="javascript:void(0)" className="btn btn-primary w-100">
                  Reset Filters
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

export default Eco_shop
