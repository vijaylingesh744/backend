import React ,{useState} from 'react'
import { useNavigate, Link } from 'react-router-dom'
import {validateForm} from '../utils/Function'
import {toast} from 'react-toastify'
import FetchData from '../fetch-api/Apifetch'

function Register() {
  const navigate = useNavigate();

  const [emailError, setEmailError] = useState('');
  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  
  const validateForm = () => {
    let valid = true;
    if (!formdata.gmail) {
      setEmailError('Email is required');
      valid = false;
    } else {
      setEmailError('');
    }
    if (!formdata.first_name) {
      setFirstNameError('First name is required');
      valid = false;
    } else {
      setFirstNameError('');
    }
    if (!formdata.last_name) {
      setLastNameError('Last name is required');
      valid = false;
    } else {
      setLastNameError('');
    }
    if (!formdata.password) {
      setPasswordError('Password is required');
      valid = false;
    } else {
      setPasswordError('');
    }
    if (!formdata.phone) {
      setPhoneError('Phone number is required');
      valid = false;
    } else {
      setPhoneError('');
    }
    return valid;
  };

  const AuthCheck = async () => {
    try{
        if (!validateForm(formdata)) {
        // toast.error("please enter mandatory fields");
        return 
        }
        const token = false; // Replace with your actual authentication token
        const formselect = new FormData();
        formselect.append("data",JSON.stringify(formdata));
        const res = await FetchData("add/user",'POST', formselect, token,true);
        if(res.success){
            localStorage.setItem("TOKEN",res.data.access_token)
            localStorage.setItem("User",JSON.stringify(formdata))
            toast.success('register Successfully!');
            navigate("/login")
        }else{
            toast.error('Please Check Crediential!');
        }
        return null;
    } catch (error){
        // console.error('Error:', error);
        toast.error(error.message);
        return null;
    }
}


const handleInputChange = (e) => {
  const { name, value } = e.target;
  let error = '';

  if (name === 'phone' && value.length > 10) {
    return;
  }

  if (name === 'gmail') {
    if (!value.includes('@')) {
      error = 'Email must contain @ symbol';
    } 
    else if (!/^\S+@\S+\.\S+$/.test(value)) {
      error = 'Invalid email format';
  }
  }

  setFormdata({ ...formdata, [name]: value });
  setEmailError(error); 
};



const [formdata,setFormdata] = useState({
  gmail:"",
  user_type:"3",
  first_name:"",
  last_name:"",
  password:""
})
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
                  <img
                    src="/assets/images/logos/light-logo.svg"
                    className="light-logo"
                    alt="Logo-light"
                    style={{ display: "none" }}
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
                    {/* <p className="mb-7">Admin Dashboard</p> */}
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
                      <div className="d-flex">
                      <div className="mb-4">
                  <label htmlFor="first_name" className="form-label">First Name</label>
                  <input
                    type="text"
                    name="first_name"
                    value={formdata.first_name}
                    onChange={handleInputChange}
                    placeholder="Enter first name"
                    className={`form-control ${firstNameError && 'is-invalid'}`}
                    id="first_name"
                    style={{ height: "45px" }}
                  />
                  {firstNameError && <div className="invalid-feedback">{firstNameError}</div>}
                </div>&nbsp;
                <div className="mb-4">
                  <label htmlFor="last_name" className="form-label">Last Name</label>
                  <input
                    type="text"
                    name="last_name"
                    value={formdata.last_name}
                    onChange={handleInputChange}
                    placeholder="Enter last name"
                    className={`form-control ${lastNameError && 'is-invalid'}`}
                    id="last_name"
                    style={{ height: "45px" }}
                  />
                  {lastNameError && <div className="invalid-feedback">{lastNameError}</div>}
                </div>
                      </div>
                      <div className="mb-4">
                  <label htmlFor="phone" className="form-label">Mobile Number</label>
                  <input
                    type="number"
                    name="phone"
                    value={formdata.phone}
                    onChange={handleInputChange}
                    placeholder="Enter mobile number"
                    className={`form-control ${phoneError && 'is-invalid'}`}
                    id="phone"
                    style={{ height: "45px" }}
                  />
                  {phoneError && <div className="invalid-feedback">{phoneError}</div>}
                </div>
                      <div className="mb-4">
                  <label htmlFor="gmail" className="form-label">Email</label>
                  <input
                    type="email"
                    name="gmail"
                    value={formdata.gmail}
                    onChange={handleInputChange}
                    placeholder="Enter email"
                    className={`form-control ${emailError && 'is-invalid'}`}
                    id="gmail"
                    style={{ height: "45px" }}
                  />
                  {emailError && <div className="invalid-feedback">{emailError}</div>}
                </div>
                <div className="mb-4">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={formdata.password}
                    onChange={handleInputChange}
                    placeholder="Enter password"
                    className={`form-control ${passwordError && 'is-invalid'}`}
                    id="password"
                    style={{ height: "45px" }}
                  />
                  {passwordError && <div className="invalid-feedback">{passwordError}</div>}
                </div>
                      <div className="d-flex align-items-center justify-content-between mb-4">
                        <div className="form-check">
                          <input
                            className="form-check-input primary"
                            type="checkbox"
                            defaultValue=""
                            id="flexCheckChecked"
                            defaultChecked=""
                          />
                          <label
                            className="form-check-label text-dark fs-3"
                            htmlFor="flexCheckChecked"
                          >
                            Remeber this Device
                          </label>
                        </div>
                        {/* <a
                          className="text-primary fw-medium fs-3"
                          href="../main/authentication-forgot-password.html"
                        >
                          Forgot Password ?
                        </a> */}
                      </div>
                      <button
  type="button"
  className="btn btn-primary w-100 py-8 mb-4 rounded-2"
  onClick={() => AuthCheck()}
>
  Sign Up
</button>

                      <div className="d-flex align-items-center justify-content-center">
                        {/* <a href="#"><p className="fs-4 mb-0 fw-medium">Signin as Business Partner </p></a> */}
                        Already have an account?<Link
                          className="text-primary fw-medium ms-2"
                          to="/login"
                        >
                           Sign in
                        </Link>
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

export default Register
