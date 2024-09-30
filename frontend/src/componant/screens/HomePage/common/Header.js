import React from 'react'
import '../css/style.css'
const Header = () => {
  return (
    <header className="theme-main-menu menu-overlay sticky-menu">
  <div className="inner-content position-relative">
    <div className="top-header">
      <div className="d-flex align-items-center justify-content-between">
        <div className="logo order-lg-0">
          <a href="#" className="d-flex align-items-center">
            <img
              data-lazyloaded={1}
              src="/images/homeImages/connect.png"
              className="white_logo"
              data-src="images/homeImages/connect.png"
              alt="Connect-Souq"
              data-srcset="/images/homeImages/connect.png"
            />
          </a>
        </div>
        <div className="right-widget action_btn_black ms-auto ms-lg-0 order-lg-3">
          <ul className="d-flex align-items-center style-none">
            <li className="d-none d-md-block">
              <a href="#" className="job-post-btn tran3s">
                Post Job
              </a>
            </li>
            <li>
              <a
                href="/login"
                className="fw-500 text-dark"
                // data-bs-toggle="modal"
                // data-bs-target="#loginModal"
              >
                Login
              </a>
            </li>
            <li className="d-none d-md-block ms-4">
              <a href="/login" className="btn-five">
                Login as partner
              </a>
            </li>
          </ul>
        </div>
        <nav className="navbar navbar-expand-lg p0 ms-lg-5 ms-3 order-lg-2">
          <button
            className="navbar-toggler d-block d-lg-none"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span />
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul
              id="menu-main-menu"
              className="navbar-nav align-items-lg-center"
            >
              <li
                itemScope="itemscope"
                className="menu-item menu-item-type-custom menu-item-object-custom current-menu-ancestor current-menu-parent menu-item-has-children  menu-item-7091 dropdown nav-item"
              >
                <a
                  title="Home"
                  role="button"
                  data-bs-auto-close="outside"
                  aria-expanded="false"
                  href="#"
                >
                  Home
                </a>
              </li>
              <li
                itemScope="itemscope"
                id=""
                className="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children  menu-item-7160 dropdown nav-item"
              >
                <a
                  title="Jobs"
                  className="nav-link dropdown-toggle"
                  role="button"
                  data-bs-toggle="dropdown"
                  data-bs-auto-close="outside"
                  aria-expanded="false"
                  href="#"
                >
                  Jobs
                </a>
                <ul role="menu" className="dropdown-menu menu-depth-2nd">
                  <li
                    itemScope="itemscope"
                    id="menu-item-8588"
                    className="menu-item menu-item-type-post_type menu-item-object-page  menu-item-8588 nav-item"
                  >
                    <a
                      title="Job List style - 1"
                      className="nav-link"
                      role="button"
                      href="#"
                    >
                      Job List style – 1
                    </a>
                  </li>
                </ul>
              </li>
              <li
                itemScope="itemscope"
                id="menu-item-7352"
                className="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children  menu-item-7352 dropdown nav-item"
              >
                <a
                  title="Company"
                  className="nav-link dropdown-toggle"
                  role="button"
                  data-bs-toggle="dropdown"
                  data-bs-auto-close="outside"
                  aria-expanded="false"
                  href="#"
                >
                  Company
                </a>
                <ul role="menu" className="dropdown-menu menu-depth-2nd">
                  <li
                    itemScope="itemscope"
                    id="menu-item-8665"
                    className="menu-item menu-item-type-post_type menu-item-object-page  menu-item-8665 nav-item"
                  >
                    <a
                      title="Company v-1"
                      className="nav-link"
                      role="button"
                      href="#"
                    >
                      Company v-1
                    </a>
                  </li>
                </ul>
              </li>
              <li
                itemScope="itemscope"
                id="menu-item-5755"
                className="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children  menu-item-5755 dropdown nav-item"
              >
                <a
                  title="Pages"
                  className="nav-link dropdown-toggle"
                  role="button"
                  data-bs-toggle="dropdown"
                  data-bs-auto-close="outside"
                  aria-expanded="false"
                  href="#"
                >
                  Pages
                </a>
                <ul role="menu" className="dropdown-menu menu-depth-2nd">
                  <li
                    itemScope="itemscope"
                    id="menu-item-5744"
                    className="menu-item menu-item-type-post_type menu-item-object-page  menu-item-5744 nav-item"
                  >
                    <a
                      title="About us"
                      className="nav-link"
                      role="button"
                      href="#"
                    >
                      About us
                    </a>
                  </li>
                  <li
                    itemScope="itemscope"
                    id="menu-item-5745"
                    className="menu-item menu-item-type-post_type menu-item-object-page  menu-item-5745 nav-item"
                  >
                    <a
                      title="Contact Us"
                      className="nav-link"
                      role="button"
                      href="#"
                    >
                      Contact Us
                    </a>
                  </li>
                  <li
                    itemScope="itemscope"
                    id="menu-item-5752"
                    className="menu-item menu-item-type-post_type menu-item-object-page  menu-item-5752 nav-item"
                  >
                    <a
                      title="Pricing"
                      className="nav-link"
                      role="button"
                      href="#"
                    >
                      Pricing
                    </a>
                  </li>
                  <li
                    itemScope="itemscope"
                    id="menu-item-5753"
                    className="menu-item menu-item-type-post_type menu-item-object-page  menu-item-5753 nav-item"
                  >
                    <a
                      title="FAQ"
                      className="nav-link"
                      role="button"
                      href="#"
                    >
                      FAQ
                    </a>
                  </li>
                  <li
                    itemScope="itemscope"
                    id="menu-item-7427"
                    className="menu-item menu-item-type-custom menu-item-object-custom  menu-item-7427 nav-item"
                  >
                    <a
                      title="404 Error"
                      className="nav-link"
                      role="button"
                      href="https://wordpress-theme.spider-themes.net/jobi/404/"
                    >
                      404 Error
                    </a>
                  </li>
                </ul>
              </li>
              <li
                itemScope="itemscope"
                id="menu-item-5757"
                className="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children  menu-item-5757 dropdown nav-item"
              >
                <a
                  title="Blog"
                  className="nav-link dropdown-toggle"
                  role="button"
                  data-bs-toggle="dropdown"
                  data-bs-auto-close="outside"
                  aria-expanded="false"
                  href="#"
                >
                  Blog
                </a>
                <ul role="menu" className="dropdown-menu menu-depth-2nd">
                  <li
                    itemScope="itemscope"
                    id="menu-item-5743"
                    className="menu-item menu-item-type-post_type menu-item-object-page  menu-item-5743 nav-item"
                  >
                    <a
                      title="Blog List"
                      className="nav-link"
                      role="button"
                      href="#"
                    >
                      Blog List
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  </div>
</header>


  )
}

export default Header