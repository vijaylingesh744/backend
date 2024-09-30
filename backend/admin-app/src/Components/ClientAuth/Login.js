import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { validateForm } from '../utils/Function'
import { toast } from 'react-toastify';
import { BUSINESS_URL,CLIENT_URL } from '../utils/ApiRoute'
import FetchData from '../fetch-api/Apifetch'
import { useUserContext } from '../ReUsable/Context';

function Login() {
  const { userRoute, setRoute } = useUserContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  //   const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const LoginCheck = async () => {
    try {
      const token = false;
      const data = {
        gmail: email,
        password: password
      }
  
      if (!email.trim()) {
        setEmailError('Email is required');
        return;
      } else {
        setEmailError('');
      }
  
      if (!password.trim()) {
        setPasswordError('Password is required');
        return;
      } else {
        setPasswordError('');
      }
  
      const emailCheckResponse = await FetchData(`user/email_verify/${email}`, 'GET', null, false, false);
      if (!emailCheckResponse.success) {
        setEmailError('Email not found');
        return;
      }
  
      const loginResponse = await FetchData("check/user", 'POST', JSON.stringify(data), token, false);
      if(loginResponse.success && (loginResponse.data.user.user_type === '1' || loginResponse.data.user.user_type === '3'))
      {
        localStorage.setItem("TOKEN", loginResponse.data.access_token);
        localStorage.setItem("User", JSON.stringify(loginResponse.data.user));
        toast.success("Login successfully");
        window.location.href = "/" + "?route=3";
      }else{
        toast.error("Please check your credentials");
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error(error.message);
    }
  }
  

  // useEffect(() => {
  //   setRoute(null);
  //   localStorage.removeItem('userRoute')
  //   window.location.href =CLIENT_URL
  // }, [])
  const handleRegisterClick = () => {
    navigate('/registers');
  };
  return (
    <div id="main-wrapper">
      <div className="position-relative overflow-hidden radial-gradient min-vh-100 w-100">
        <div className="position-relative z-index-5">
          <div className="row">
            <div className="col-xl-7 col-xxl-8">
              <a
                href=""
                className="text-nowrap logo-img d-block px-4 py-9 w-100"
              >
                <img
                  src="/assets/images/logos/C_logo.png"
                  className="dark-logo"
                  alt="Logo-Dark"
                  width={150}
                />
              </a>
              <div
                className="d-none d-xl-flex align-items-center justify-content-center"
                style={{ height: "calc(100vh - 80px)" }}
              >
                <img
                  src="/assets/images/backgrounds/login-security.svg"
                  alt=""
                  className="img-fluid"
                  width={500}
                />
              </div>
            </div>
            <div className="col-xl-5 col-xxl-4">
              <div className="authentication-login min-vh-100 bg-body row justify-content-center align-items-center p-4">
                <div className="auth-max-width col-sm-8 col-md-6 col-xl-7 px-4">
                  <h2 className="mb-1 fs-7 fw-bolder mb-4">Welcome to Connect souq</h2>
                  <div className="row">
                    <div className="col-6 mb-2 mb-sm-0">
                      <a
                        className="btn text-dark border fw-normal d-flex align-items-center justify-content-center rounded-2 py-8"
                        href="javascript:void(0)"
                        role="button"
                      >
                        <img
                          src="/assets/images/svgs/google-icon.svg"
                          alt=""
                          className="img-fluid me-2"
                          width={18}
                          height={18}
                        />
                        <span className="flex-shrink-0">Login with Google</span>
                      </a>
                    </div>
                    <div className="col-6">
                      <a
                        className="btn text-dark border fw-normal d-flex align-items-center justify-content-center rounded-2 py-8"
                        href="javascript:void(0)"
                        role="button"
                      >
                        <img
                          src="/assets/images/svgs/facebook-icon.svg"
                          alt=""
                          className="img-fluid me-2"
                          width={18}
                          height={18}
                        />
                        <span className="flex-shrink-0">Login with FB</span>
                      </a>
                    </div>
                  </div>
                  <div className="position-relative text-center my-4">

                    <p className="mb-0 fs-4 px-3 d-inline-block bg-body text-dark z-index-5 position-relative">
                      or sign in with
                    </p>
                    <span className="border-top w-100 position-absolute top-50 start-50 translate-middle" />
                  </div>
                  <form>
                  <div className="mb-2">
                      <label htmlFor="email" className="form-label">Email</label>
                      <input
                        type="email"
                        className={`form-control ${emailError && 'is-invalid'}`}
                        id="email"
                        placeholder="Enter the Email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          setEmailError('');
                        }}
                        style={{ height: "45px" }}
                      />
                      {emailError && <div className="invalid-feedback">{emailError}</div>}
                    </div>
                    <div className="mb-4">
                      <label htmlFor="password" className="form-label">Password</label>
                      <input
                        type="password"
                        className={`form-control ${passwordError && 'is-invalid'}`}
                        id="password"
                        placeholder="Enter the password"
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                          setPasswordError('');
                        }}
                        style={{ height: "45px" }}
                      />
                      {passwordError && <div className="invalid-feedback">{passwordError}</div>}
                    </div>
                    <a
                      href="#"
                      className="btn btn-primary w-100 py-8 mb-4 rounded-2"
                      onClick={() => LoginCheck() 
                      }
                    >
                      Sign In
                    </a>
                    <div className="d-flex align-items-center justify-content-center">
                      {/* <a href="#"><p className="fs-4 mb-0 fw-medium">Signin as Business Partner </p></a> */}
                      Don't have an account? <a href="#" className="text-primary fw-medium ms-2"
                        onClick={handleRegisterClick} > Sign up
                      </a>
                    </div>
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

export default Login
