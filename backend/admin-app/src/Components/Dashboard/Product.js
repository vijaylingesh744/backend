import React from 'react'

const Product = () => {
    return (
        <div className="body-wrapper">
            <div className="container-fluid">
  <div className="card bg-info-subtle shadow-none position-relative overflow-hidden mb-4">
    <div className="card-body px-4 py-3">
      <div className="row align-items-center">
        <div className="col-9">
          <h4 className="fw-semibold mb-8">Product list</h4>
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
                Shop list
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
  <div className="product-list">
    <div className="card">
      <div className="card-body p-3">
        <div className="d-flex justify-content-between align-items-center gap-6 mb-9">
          <form className="position-relative">
            <input
              type="text"
              className="form-control search-chat py-2 ps-5"
              id="text-srh"
              placeholder="Search Product"
            />
            <i className="ti ti-search position-absolute top-50 start-0 translate-middle-y fs-6 text-dark ms-3" />
          </form>
          <a
            className="fs-6 text-muted"
            href="javascript:void(0)"
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            data-bs-title="Filter list"
          >
            <i className="ti ti-filter" />
          </a>
        </div>
        <div className="table-responsive border rounded">
          <table className="table align-middle text-nowrap mb-0">
            <thead>
              <tr>
                <th scope="col">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      defaultValue=""
                      id="flexCheckDefault"
                    />
                  </div>
                </th>
                <th scope="col">Products</th>
                <th scope="col">Date</th>
                <th scope="col">Status</th>
                <th scope="col">Price</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div className="form-check mb-0">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      defaultValue=""
                      id="flexCheckDefault1"
                    />
                  </div>
                </td>
                <td>
                  <div className="d-flex align-items-center">
                    <img
                      src="../assets/images/products/s1.jpg"
                      className="rounded-circle"
                      alt="..."
                      width={56}
                      height={56}
                    />
                    <div className="ms-3">
                      <h6 className="fw-semibold mb-0 fs-4">
                        How Innovation Works
                      </h6>
                      <p className="mb-0">books</p>
                    </div>
                  </div>
                </td>
                <td>
                  <p className="mb-0">Thu, Jan 12 2024</p>
                </td>
                <td>
                  <div className="d-flex align-items-center">
                    <span className="text-bg-success p-1 rounded-circle" />
                    <p className="mb-0 ms-2">InStock</p>
                  </div>
                </td>
                <td>
                  <h6 className="mb-0 fs-4">$275</h6>
                </td>
                <td>
                  <a
                    className="fs-6 text-muted"
                    href="javascript:void(0)"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    data-bs-title="Edit"
                  >
                    <i className="ti ti-dots-vertical" />
                  </a>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="form-check mb-0">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      defaultValue=""
                      id="flexCheckDefault2"
                    />
                  </div>
                </td>
                <td>
                  <div className="d-flex align-items-center">
                    <img
                      src="../assets/images/products/s2.jpg"
                      className="rounded-circle"
                      alt="..."
                      width={56}
                      height={56}
                    />
                    <div className="ms-3">
                      <h6 className="fw-semibold mb-0 fs-4">
                        Psalms Book for Growth
                      </h6>
                      <p className="mb-0">books</p>
                    </div>
                  </div>
                </td>
                <td>
                  <p className="mb-0">Thu, Jan 10 2024</p>
                </td>
                <td>
                  <div className="d-flex align-items-center">
                    <span className="text-bg-danger p-1 rounded-circle" />
                    <p className="mb-0 ms-2">Out of Stock</p>
                  </div>
                </td>
                <td>
                  <h6 className="mb-0 fs-4">$89</h6>
                </td>
                <td>
                  <a
                    className="fs-6 text-muted"
                    href="javascript:void(0)"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    data-bs-title="Edit"
                  >
                    <i className="ti ti-dots-vertical" />
                  </a>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="form-check mb-0">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      defaultValue=""
                      id="flexCheckDefault3"
                    />
                  </div>
                </td>
                <td>
                  <div className="d-flex align-items-center">
                    <img
                      src="../assets/images/products/s3.jpg"
                      className="rounded-circle"
                      alt="..."
                      width={56}
                      height={56}
                    />
                    <div className="ms-3">
                      <h6 className="fw-semibold mb-0 fs-4">
                        The Psychology of Money
                      </h6>
                      <p className="mb-0">fashionbooks</p>
                    </div>
                  </div>
                </td>
                <td>
                  <p className="mb-0">Thu, Jan 12 2024</p>
                </td>
                <td>
                  <div className="d-flex align-items-center">
                    <span className="text-bg-success p-1 rounded-circle" />
                    <p className="mb-0 ms-2">InStock</p>
                  </div>
                </td>
                <td>
                  <h6 className="mb-0 fs-4">$125</h6>
                </td>
                <td>
                  <a
                    className="fs-6 text-muted"
                    href="javascript:void(0)"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    data-bs-title="Edit"
                  >
                    <i className="ti ti-dots-vertical" />
                  </a>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="form-check mb-0">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      defaultValue=""
                      id="flexCheckDefault4"
                    />
                  </div>
                </td>
                <td>
                  <div className="d-flex align-items-center">
                    <img
                      src="../assets/images/products/s4.jpg"
                      className="rounded-circle"
                      alt="..."
                      width={56}
                      height={56}
                    />
                    <div className="ms-3">
                      <h6 className="fw-semibold mb-0 fs-4">Boat Headphone</h6>
                      <p className="mb-0">electronics</p>
                    </div>
                  </div>
                </td>
                <td>
                  <p className="mb-0">Mon, Jan 16 2024</p>
                </td>
                <td>
                  <div className="d-flex align-items-center">
                    <span className="text-bg-success p-1 rounded-circle" />
                    <p className="mb-0 ms-2">InStock</p>
                  </div>
                </td>
                <td>
                  <h6 className="mb-0 fs-4">$50</h6>
                </td>
                <td>
                  <a
                    className="fs-6 text-muted"
                    href="javascript:void(0)"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    data-bs-title="Edit"
                  >
                    <i className="ti ti-dots-vertical" />
                  </a>
                </td>
              </tr>
              <tr>
                <td className="border-bottom-0">
                  <div className="form-check mb-0">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      defaultValue=""
                      id="flexCheckDefault5"
                    />
                  </div>
                </td>
                <td className="border-bottom-0">
                  <div className="d-flex align-items-center">
                    <img
                      src="../assets/images/products/s5.jpg"
                      className="rounded-circle"
                      alt="..."
                      width={56}
                      height={56}
                    />
                    <div className="ms-3">
                      <h6 className="fw-semibold mb-0 fs-4">MacBook Air Pro</h6>
                      <p className="mb-0">fashionelectronics</p>
                    </div>
                  </div>
                </td>
                <td className="border-bottom-0">
                  <p className="mb-0">Wed, Jan 18 2024</p>
                </td>
                <td className="border-bottom-0">
                  <div className="d-flex align-items-center">
                    <span className="text-bg-danger p-1 rounded-circle" />
                    <p className="mb-0 ms-2">Out of Stock</p>
                  </div>
                </td>
                <td className="border-bottom-0">
                  <h6 className="mb-0 fs-4">$650</h6>
                </td>
                <td className="border-bottom-0">
                  <a
                    className="fs-6 text-muted"
                    href="javascript:void(0)"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    data-bs-title="Edit"
                  >
                    <i className="ti ti-dots-vertical" />
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
          <div className="d-flex align-items-center justify-content-end py-1">
            <p className="mb-0 fs-2">Rows per page:</p>
            <select
              className="form-select w-auto ms-0 ms-sm-2 me-8 me-sm-4 py-1 pe-7 ps-2 border-0"
              aria-label="Default select example"
            >
              <option selected="">5</option>
              <option value={1}>10</option>
              <option value={2}>25</option>
            </select>
            <p className="mb-0 fs-2">1–5 of 12</p>
            <nav aria-label="...">
              <ul className="pagination justify-content-center mb-0 ms-8 ms-sm-9">
                <li className="page-item p-1">
                  <a
                    className="page-link border-0 rounded-circle text-dark fs-6 round-32 d-flex align-items-center justify-content-center"
                    href="eco-product-list.html#"
                  >
                    <i className="ti ti-chevron-left" />
                  </a>
                </li>
                <li className="page-item p-1">
                  <a
                    className="page-link border-0 rounded-circle text-dark fs-6 round-32 d-flex align-items-center justify-content-center"
                    href="eco-product-list.html#"
                  >
                    <i className="ti ti-chevron-right" />
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

        </div>
    )
}

export default Product
