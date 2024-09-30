import React from 'react'

const Modal = () => {

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth" 
    });
  };

  return (
    <div>
  <div
  className="modal fade login_from"
  id="loginModal"
  tabIndex={-1}
  aria-hidden="true"
>
  <div className="modal-dialog modal-fullscreen modal-dialog-centered">
    <div className="container">
      <div className="user-data-form modal-content">
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
        />
        <div className="text-center">
          <h2>Hi, Welcome Back!</h2>
          <p>
            Still don't have an account?
            <a href="">Sign up </a>
          </p>
        </div>
        <div className="form-wrapper m-auto">
          <form
            action="#"
            className="mt-10"
            name="loginform"
            id="loginform"
            method="post"
          >
            <div className="row">
              <div className="col-12">
                <div className="input-group-meta position-relative mb-25">
                  <label>Username/Email*</label>
                  <input
                    type="text"
                    name="user_input"
                    id="user_input"
                    defaultValue=""
                    placeholder="Enter username or email"
                  />
                </div>
              </div>
              <div className="col-12">
                <div className="input-group-meta position-relative mb-20">
                  <label>Password*</label>
                  <input
                    type="password"
                    name="pwd"
                    id="password"
                    defaultValue=""
                    placeholder="Enter Password"
                    className="pass_log_id"
                  />
                  <span className="placeholder_icon">
                    <span className="passVicon">
                      <img
                        data-lazyloaded={1}
                        src="/uploads/2023/07/icon_60.svg"
                        data-src="https://wordpress-theme.spider-themes.net/jobi/wp-content/themes/jobi/assets/img/icons/icon_60.svg"
                        alt="eye-icon"
                      />
                    </span>
                  </span>
                </div>
              </div>
              <div className="col-12">
                <div className="agreement-checkbox d-flex justify-content-between align-items-center">
                  <div>
                    <input type="checkbox" id="remember" />
                    <label htmlFor="remember">Keep me logged in</label>
                  </div>
                  <a href="https://wordpress-theme.spider-themes.net/jobi//wp-login.php?action=lostpassword">
                    Forget Password?{" "}
                  </a>
                </div>
              </div>
              <div className="col-12">
                <button className="btn-eleven fw-500 tran3s d-block mt-20">
                  Login
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</div>
<button className="scroll-top" onClick={scrollToTop}>
        <i className="fa fa-arrow-up fa-sm" style={{ color: "white", fontSize: "20px" }} aria-hidden="true"></i>
      </button>
</div>
  )
}

export default Modal
