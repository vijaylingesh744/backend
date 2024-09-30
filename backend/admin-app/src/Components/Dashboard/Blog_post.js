import React from 'react'

function Blog_post() {
  return (
    <div className="body-wrapper">
    <div className="container-fluid">
      <div className="card bg-info-subtle shadow-none position-relative overflow-hidden mb-4">
        <div className="card-body px-4 py-3">
          <div className="row align-items-center">
            <div className="col-9">
              <h4 className="fw-semibold mb-8">Blog</h4>
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
                    Blog
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
      <div className="row">
        <div className="col-md-6 col-lg-8">
          <div
            className="card blog position-relative overflow-hidden hover-img"
            style={{
              backgroundImage: "url(assets/images/blog/blog-img9.jpg)"
            }}
          >
            <div className="card-body position-relative">
              <div className="d-flex flex-column justify-content-between h-100">
                <div className="d-flex align-items-start justify-content-between">
                  <div
                    className="position-relative"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    data-bs-title="Mollie Underwood"
                  >
                    <img
                      src="assets/images/profile/user-4.jpg"
                      alt=""
                      className="rounded-circle img-fluid"
                      width={40}
                      height={40}
                    />
                  </div>
                  <span className="badge text-bg-primary rounded-3 fs-2 fw-semibold">
                    Gadget
                  </span>
                </div>
                <div>
                  <a
                    href="Blog_details"
                    className="fs-7 my-4 fw-semibold text-white d-block lh-sm"
                  >
                    Early Black Friday Amazon deals: cheap TVs, headphones,
                    laptops
                  </a>
                  <div className="d-flex align-items-center gap-4">
                    <div className="d-flex align-items-center gap-2 text-white fs-3 fw-normal">
                      <i className="ti ti-eye fs-5" />
                      6006
                    </div>
                    <div className="d-flex align-items-center gap-2 text-white fs-3 fw-normal">
                      <i className="ti ti-message-2 fs-5" />3
                    </div>
                    <div className="d-flex align-items-center gap-1 text-white fw-normal ms-auto">
                      <i className="ti ti-point" />
                      <small>Fri, Jan 13</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-lg-4">
          <div
            className="card blog position-relative overflow-hidden hover-img"
            style={{
              backgroundImage: "url(assets/images/blog/blog-img10.jpg)"
            }}
          >
            <div className="card-body position-relative">
              <div className="d-flex flex-column justify-content-between h-100">
                <div className="d-flex align-items-start justify-content-between">
                  <div
                    className="position-relative"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    data-bs-title="Francisco Quinn"
                  >
                    <img
                      src="assets/images/profile/user-5.jpg"
                      alt=""
                      className="rounded-circle img-fluid"
                      width={40}
                      height={40}
                    />
                  </div>
                  <span className="badge text-bg-primary rounded-3 fs-2 fw-semibold">
                    Health
                  </span>
                </div>
                <div>
                  <a
                    href="Blog_details"
                    className="fs-7 my-4 fw-semibold text-white d-block lh-sm"
                  >
                    Presented by Max Rushden with Barry Glendenning, Philippe
                    Auclair
                  </a>
                  <div className="d-flex align-items-center gap-4">
                    <div className="d-flex align-items-center gap-2 text-white fs-3 fw-normal">
                      <i className="ti ti-eye fs-5" />
                      713
                    </div>
                    <div className="d-flex align-items-center gap-2 text-white fs-3 fw-normal">
                      <i className="ti ti-message-2 fs-5" />3
                    </div>
                    <div className="d-flex align-items-center gap-1 text-white fw-normal ms-auto">
                      <i className="ti ti-point" />
                      <small>Wed, Jan 18</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-lg-4">
          <div className="card rounded-2 overflow-hidden hover-img">
            <div className="position-relative">
              <a href="Blog_details">
                <img
                  src="assets/images/blog/blog-img6.jpg"
                  className="card-img-top rounded-0"
                  alt="..."
                />
              </a>
              <span className="badge text-bg-light fs-2 rounded-4 lh-sm mb-9 me-9 py-1 px-2 fw-semibold position-absolute bottom-0 end-0">
                2 min Read
              </span>
              <img
                src="assets/images/profile/user-1.jpg"
                alt=""
                className="img-fluid rounded-circle position-absolute bottom-0 start-0 mb-n9 ms-9"
                width={40}
                height={40}
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                data-bs-title="Addie Keller"
              />
            </div>
            <div className="card-body p-4">
              <span className="badge text-bg-light fs-2 rounded-4 py-1 px-2 lh-sm  mt-3">
                Gadget
              </span>
              <a
                className="d-block my-4 fs-5 text-dark fw-semibold"
                href="Blog_details"
              >
                As yen tumbles, gadget-loving Japan goes for secondhand iPhones
              </a>
              <div className="d-flex align-items-center gap-4">
                <div className="d-flex align-items-center gap-2">
                  <i className="ti ti-eye text-dark fs-5" />
                  9,125
                </div>
                <div className="d-flex align-items-center gap-2">
                  <i className="ti ti-message-2 text-dark fs-5" />3
                </div>
                <div className="d-flex align-items-center fs-2 ms-auto">
                  <i className="ti ti-point text-dark" />
                  Mon, Jan 16
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-lg-4">
          <div className="card rounded-2 overflow-hidden hover-img">
            <div className="position-relative">
              <a href="Blog_details">
                <img
                  src="assets/images/blog/blog-img11.jpg"
                  className="card-img-top rounded-0"
                  alt="..."
                />
              </a>
              <span className="badge text-bg-light fs-2 rounded-4 lh-sm mb-9 me-9 py-1 px-2 fw-semibold position-absolute bottom-0 end-0">
                2 min Read
              </span>
              <img
                src="assets/images/profile/user-2.jpg"
                alt=""
                className="img-fluid rounded-circle position-absolute bottom-0 start-0 mb-n9 ms-9"
                width={40}
                height={40}
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                data-bs-title="Walter Palmer"
              />
            </div>
            <div className="card-body p-4">
              <span className="badge text-bg-light fs-2 rounded-4 py-1 px-2 lh-sm  mt-3">
                Social
              </span>
              <a
                className="d-block my-4 fs-5 text-dark fw-semibold"
                href="Blog_details"
              >
                Intel loses bid to revive antitrust case against patent foe
                Fortress
              </a>
              <div className="d-flex align-items-center gap-4">
                <div className="d-flex align-items-center gap-2">
                  <i className="ti ti-eye text-dark fs-5" />
                  4,150
                </div>
                <div className="d-flex align-items-center gap-2">
                  <i className="ti ti-message-2 text-dark fs-5" />
                  38
                </div>
                <div className="d-flex align-items-center fs-2 ms-auto">
                  <i className="ti ti-point text-dark" />
                  Sun, Jan 15
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-lg-4">
          <div className="card rounded-2 overflow-hidden hover-img">
            <div className="position-relative">
              <a href="Blog_details">
                <img
                  src="assets/images/blog/blog-img8.jpg"
                  className="card-img-top rounded-0"
                  alt="..."
                />
              </a>
              <span className="badge text-bg-light fs-2 rounded-4 lh-sm mb-9 me-9 py-1 px-2 fw-semibold position-absolute bottom-0 end-0">
                2 min Read
              </span>
              <img
                src="assets/images/profile/user-3.jpg"
                alt=""
                className="img-fluid rounded-circle position-absolute bottom-0 start-0 mb-n9 ms-9"
                width={40}
                height={40}
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                data-bs-title="Miguel Kennedy"
              />
            </div>
            <div className="card-body p-4">
              <span className="badge text-bg-light fs-2 rounded-4 py-1 px-2 lh-sm  mt-3">
                Health
              </span>
              <a
                className="d-block my-4 fs-5 text-dark fw-semibold"
                href="Blog_details"
              >
                COVID outbreak deepens as more lockdowns loom in China
              </a>
              <div className="d-flex align-items-center gap-4">
                <div className="d-flex align-items-center gap-2">
                  <i className="ti ti-eye text-dark fs-5" />
                  9,480
                </div>
                <div className="d-flex align-items-center gap-2">
                  <i className="ti ti-message-2 text-dark fs-5" />
                  12
                </div>
                <div className="d-flex align-items-center fs-2 ms-auto">
                  <i className="ti ti-point text-dark" />
                  Sat, Jan 14
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-lg-4">
          <div className="card rounded-2 overflow-hidden hover-img">
            <div className="position-relative">
              <a href="Blog_details">
                <img
                  src="assets/images/blog/blog-img5.jpg"
                  className="card-img-top rounded-0"
                  alt="..."
                />
              </a>
              <span className="badge text-bg-light fs-2 rounded-4 lh-sm mb-9 me-9 py-1 px-2 fw-semibold position-absolute bottom-0 end-0">
                2 min Read
              </span>
              <img
                src="assets/images/profile/user-5.jpg"
                alt=""
                className="img-fluid rounded-circle position-absolute bottom-0 start-0 mb-n9 ms-9"
                width={40}
                height={40}
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                data-bs-title="Esther Lindsey"
              />
            </div>
            <div className="card-body p-4">
              <span className="badge text-bg-light fs-2 rounded-4 py-1 px-2 lh-sm  mt-3">
                Lifestyle
              </span>
              <a
                className="d-block my-4 fs-5 text-dark fw-semibold"
                href="
                .html"
              >
                Streaming video way before it was cool, go dark tomorrow
              </a>
              <div className="d-flex align-items-center gap-4">
                <div className="d-flex align-items-center gap-2">
                  <i className="ti ti-eye text-dark fs-5" />
                  2252
                </div>
                <div className="d-flex align-items-center gap-2">
                  <i className="ti ti-message-2 text-dark fs-5" />3
                </div>
                <div className="d-flex align-items-center fs-2 ms-auto">
                  <i className="ti ti-point text-dark" />
                  Sat, Jan 14
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-lg-4">
          <div className="card rounded-2 overflow-hidden hover-img">
            <div className="position-relative">
              <a href="/Blog_details">
                <img
                  src="assets/images/blog/blog-img3.jpg"
                  className="card-img-top rounded-0"
                  alt="..."
                />
              </a>
              <span className="badge text-bg-light fs-2 rounded-4 lh-sm mb-9 me-9 py-1 px-2 fw-semibold position-absolute bottom-0 end-0">
                2 min Read
              </span>
              <img
                src="assets/images/profile/user-3.jpg"
                alt=""
                className="img-fluid rounded-circle position-absolute bottom-0 start-0 mb-n9 ms-9"
                width={40}
                height={40}
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                data-bs-title="Leroy Greer"
              />
            </div>
            <div className="card-body p-4">
              <span className="badge text-bg-light fs-2 rounded-4 py-1 px-2 lh-sm  mt-3">
                Design
              </span>
              <a
                className="d-block my-4 fs-5 text-dark fw-semibold"
                href="Blog_details"
              >
                Apple is apparently working on a new ‘streamlined’ accessibility
              </a>
              <div className="d-flex align-items-center gap-4">
                <div className="d-flex align-items-center gap-2">
                  <i className="ti ti-eye text-dark fs-5" />
                  5860
                </div>
                <div className="d-flex align-items-center gap-2">
                  <i className="ti ti-message-2 text-dark fs-5" />
                  38
                </div>
                <div className="d-flex align-items-center fs-2 ms-auto">
                  <i className="ti ti-point text-dark" />
                  Fri, Jan 13
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-lg-4">
          <div className="card rounded-2 overflow-hidden hover-img">
            <div className="position-relative">
              <a href="Blog_details">
                <img
                  src="assets/images/blog/blog-img2.jpg"
                  className="card-img-top rounded-0"
                  alt="..."
                />
              </a>
              <span className="badge text-bg-light fs-2 rounded-4 lh-sm mb-9 me-9 py-1 px-2 fw-semibold position-absolute bottom-0 end-0">
                2 min Read
              </span>
              <img
                src="assets/images/profile/user-2.jpg"
                alt=""
                className="img-fluid rounded-circle position-absolute bottom-0 start-0 mb-n9 ms-9"
                width={40}
                height={40}
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                data-bs-title="Tommy Butler"
              />
            </div>
            <div className="card-body p-4">
              <span className="badge text-bg-light fs-2 rounded-4 py-1 px-2 lh-sm  mt-3">
                Lifestyle
              </span>
              <a
                className="d-block my-4 fs-5 text-dark fw-semibold"
                href="Blog_details"
              >
                After Twitter Staff Cuts, Survivors Face ‘Radio Silence
              </a>
              <div className="d-flex align-items-center gap-4">
                <div className="d-flex align-items-center gap-2">
                  <i className="ti ti-eye text-dark fs-5" />
                  6315
                </div>
                <div className="d-flex align-items-center gap-2">
                  <i className="ti ti-message-2 text-dark fs-5" />
                  12
                </div>
                <div className="d-flex align-items-center fs-2 ms-auto">
                  <i className="ti ti-point text-dark" />
                  Wed, Jan 11
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-lg-4">
          <div className="card rounded-2 overflow-hidden hover-img">
            <div className="position-relative">
              <a href="Blog_details">
                <img
                  src="assets/images/blog/blog-img4.jpg"
                  className="card-img-top rounded-0"
                  alt="..."
                />
              </a>
              <span className="badge text-bg-light fs-2 rounded-4 lh-sm mb-9 me-9 py-1 px-2 fw-semibold position-absolute bottom-0 end-0">
                2 min Read
              </span>
              <img
                src="assets/images/profile/user-4.jpg"
                alt=""
                className="img-fluid rounded-circle position-absolute bottom-0 start-0 mb-n9 ms-9"
                width={40}
                height={40}
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                data-bs-title="Donald Holmes"
              />
            </div>
            <div className="card-body p-4">
              <span className="badge text-bg-light fs-2 rounded-4 py-1 px-2 lh-sm  mt-3">
                Design
              </span>
              <a
                className="d-block my-4 fs-5 text-dark fw-semibold"
                href="Blog_details"
              >
                Why Figma is selling to Adobe for $20 billion
              </a>
              <div className="d-flex align-items-center gap-4">
                <div className="d-flex align-items-center gap-2">
                  <i className="ti ti-eye text-dark fs-5" />
                  7570
                </div>
                <div className="d-flex align-items-center gap-2">
                  <i className="ti ti-message-2 text-dark fs-5" />
                  38
                </div>
                <div className="d-flex align-items-center fs-2 ms-auto">
                  <i className="ti ti-point text-dark" />
                  Wed, Jan 11
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-lg-4">
          <div className="card rounded-2 overflow-hidden hover-img">
            <div className="position-relative">
              <a href="Blog_details">
                <img
                  src="assets/images/blog/blog-img1.jpg"
                  className="card-img-top rounded-0"
                  alt="..."
                />
              </a>
              <span className="badge text-bg-light fs-2 rounded-4 lh-sm mb-9 me-9 py-1 px-2 fw-semibold position-absolute bottom-0 end-0">
                2 min Read
              </span>
              <img
                src="assets/images/profile/user-1.jpg"
                alt=""
                className="img-fluid rounded-circle position-absolute bottom-0 start-0 mb-n9 ms-9"
                width={40}
                height={40}
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                data-bs-title="Eric Douglas"
              />
            </div>
            <div className="card-body p-4">
              <span className="badge text-bg-light fs-2 rounded-4 py-1 px-2 lh-sm  mt-3">
                Gadget
              </span>
              <a
                className="d-block my-4 fs-5 text-dark fw-semibold"
                href="Blog_details"
              >
                Garmins Instinct Crossover is a rugged hybrid smartwatch
              </a>
              <div className="d-flex align-items-center gap-4">
                <div className="d-flex align-items-center gap-2">
                  <i className="ti ti-eye text-dark fs-5" />
                  6763
                </div>
                <div className="d-flex align-items-center gap-2">
                  <i className="ti ti-message-2 text-dark fs-5" />
                  12
                </div>
                <div className="d-flex align-items-center fs-2 ms-auto">
                  <i className="ti ti-point text-dark" />
                  Tue, Jan 10
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <nav aria-label="...">
        <ul className="pagination justify-content-center mb-0 mt-4">
          <li className="page-item">
            <a
              className="page-link border-0 rounded-circle text-dark round-32 d-flex align-items-center justify-content-center"
              href="blog_post#"
            >
              <i className="ti ti-chevron-left" />
            </a>
          </li>
          <li className="page-item active" aria-current="page">
            <a
              className="page-link border-0 rounded-circle round-32 mx-1 d-flex align-items-center justify-content-center"
              href="blog_post#"
            >
              1
            </a>
          </li>
          <li className="page-item">
            <a
              className="page-link border-0 rounded-circle text-dark round-32 mx-1 d-flex align-items-center justify-content-center"
              href="blog_post#"
            >
              2
            </a>
          </li>
          <li className="page-item">
            <a
              className="page-link border-0 rounded-circle text-dark round-32 mx-1 d-flex align-items-center justify-content-center"
              href="blog_post#"
            >
              3
            </a>
          </li>
          <li className="page-item">
            <a
              className="page-link border-0 rounded-circle text-dark round-32 mx-1 d-flex align-items-center justify-content-center"
              href="blog_post#"
            >
              4
            </a>
          </li>
          <li className="page-item">
            <a
              className="page-link border-0 rounded-circle text-dark round-32 mx-1 d-flex align-items-center justify-content-center"
              href="blog_post#"
            >
              5
            </a>
          </li>
          <li className="page-item">
            <a
              className="page-link border-0 rounded-circle text-dark round-32 mx-1 d-flex align-items-center justify-content-center"
              href="blog_post#"
            >
              ...
            </a>
          </li>
          <li className="page-item">
            <a
              className="page-link border-0 rounded-circle text-dark round-32 mx-1 d-flex align-items-center justify-content-center"
              href="blog_post#"
            >
              10
            </a>
          </li>
          <li className="page-item">
            <a
              className="page-link border-0 rounded-circle text-dark round-32 d-flex align-items-center justify-content-center"
              href="blog_post#"
            >
              <i className="ti ti-chevron-right" />
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
  
  )
}

export default Blog_post
