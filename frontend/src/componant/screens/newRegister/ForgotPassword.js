import React, { useState } from 'react'
import Facebook from './Assets/f-icone.png'
import Google from './Assets/g-icon.png'
import Mac from './Assets/i_icon.png'
import "./Style/configure.css"
import { toast } from 'react-toastify'
import FetchData from '../../fetch-api/Apifetch';
import { useNavigate } from 'react-router-dom';
import Rightcolumn from './layout/RightColumn'


const Forgotpassword = () => {
    const navigate = useNavigate()
    const [userId, setuserId] = useState();
    const [gmail, setgmail] = useState("");
    const [otp, setOtp] = useState("");
    const [formdata, setFormdata] = useState({
        password: "",
        confirm_password: "",
        registerType: "USER"
    });
    const [step, setstep] = useState(0);
    const [Alphanumaric, setAlphanumaric] = useState(false);
    const [passwordmatch, setpasswordmatch] = useState(false);
    const [errors, setErrors] = useState({});

    const inputField = (title, type, setState, stateValue) => {
        return (
            <div className="outlined-input col-12 my-4">
                <input type={type} name="test" placeholder=" " value={stateValue} className="w-100" onChange={(e) => { setState(e.target.value) }} />
                <label for="test">{title}</label>
            </div>
        )
    }

    const handleSubmit = async () => {
        if (step == 0) {
            console.log(step);
            Verifyemail();
        }
        else if (step == 1) {
            console.log(step);
            verifyOTP()
        }
        else {
            changePassword()
        }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        let error = '';

        if (name === 'password') {
            // Check if the password meets the criteria: at least one number, one letter, and one special character
            if (!/(?=.*\d)(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9])/.test(value)) {
                // If password does not meet the criteria, set Alphanumaric to true
                setAlphanumaric(true);
            } else {
                // If password meets the criteria, set Alphanumaric to false
                setAlphanumaric(false);
            }
        }

        else if (name === 'confirm_password') {
            if (formdata.password !== value) {
                setpasswordmatch(true);
            }
            else if (formdata.password == value) {
                setpasswordmatch(false);
            }
        }
        setErrors({ ...errors, [name]: error });
        setFormdata({ ...formdata, [name]: value });

    };


    const Verifyemail = async () => {
        try {
            const response = await FetchData(`user/sendemail`, 'POST', JSON.stringify({ gmail: gmail }), false, false);
            if (response.success) {
                toast.info("Code has been resent")
                setstep(1)
            } else {
                toast.error("Can't Resend code");
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    const verifyOTP = async () => {
        try {
            const token = false;
            const data = {
                otp: otp,
                gmail: gmail,
            }
            const res = await FetchData("user/verify", 'POST', JSON.stringify(data), token, false);
            if (res.success) {
                toast.success("OTP verified successfully")
                setstep(2)
                console.log(res.data._id);
                setuserId(res.data._id)

            } else {
                toast.error('invalidOTP');
            }
        } catch (error) {
            toast.error(error.message);

        }
    }
     const changePassword = async () => {

        if (!/(?=.*\d)(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9])/.test(formdata.password)) {
            toast.error('Must include a letter, number, and special character.');
            return; // Exit the function if the password does not meet the requirements
        }
        try {
            const response = await FetchData(`update/user/${userId}`, 'POST', JSON.stringify(formdata), false, false);
            if (response.success) {
                console.log(response)
                toast.success('Password Updated Successfully!');
                navigate("/login")
            } else {
                toast.error('Please Check Credentials!');
            }
        } catch (error) {
            toast.error(error.message);
        }
    }
    return (
        <div className="container-fluid card" style={{ backgroundColor: '#e9ecef', height: 'auto', minHeight: '100vh' }}>
            <div className="row mx-lg-5" style={{ backgroundColor: '#ffff', borderRadius: '10px', height:'90vh',margin:"5vh",overflow:"hidden", boxShadow: "10px 15px 5px #ced4da" }}>
                <div className="col-lg-6 col-sm-12 d-flex align-items-center">
                    <div className="w-100 m-lg-4 h-auto">
                        {/* <div className="d-flex justify-content-start p-4">
                            <img src="images/icons/logo.png" alt="" style={{ width: "120px", height: "75px" }} />
                        </div> */}
                        <div className="p-lg-5 p-sm-2">
                            {step == 0 ? (
                                <div>
                                                  <a className='fontcontent1' style={{color:"black",cursor:'pointer'}} onClick={()=>{navigate("/login")}}><i class="fa fa-chevron-left"  aria-hidden="true" style={{marginRight:"10px",marginBottom:"10px"}}></i>Back to login</a>

                                    <h3>Forgot your password?</h3>
                                    <p>Don’t worry, happens to all of us. Enter your email below to Change your password.</p>
                                    <div className='row'>
                                        <div className="outlined-input col-12 my-4">
                                            <input type='email' name="test" placeholder=" " value={gmail} className="w-100" onChange={(e) => { setgmail(e.target.value) }} />
                                            <label for="test">Email</label>
                                        </div>
                                    </div>
                                </div>
                            ) : step == 1 ? (
                                <div>
                                    <p> Back to login</p>
                                    <h3>Verification Code</h3>
                                    <p>Please enter verification code to verify your acccount.</p>
                                    <div className='row'>
                                        <div className="outlined-input col-12 my-4">
                                            <input type='text' name="test" placeholder=" " value={otp} className="w-100" onChange={(e) => { setOtp(e.target.value) }} />
                                            <label for="test">Verification code</label>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    <p> Back to login</p>
                                    <h3>Reset password</h3>
                                    <p>Please enter new password to change</p>
                                    <div className='row'>
                                        <div className="outlined-input col-12 my-4">
                                            <input type='password' name="password" placeholder=" " value={formdata.password} className="w-100" onChange={handleInputChange} />
                                            <label for="test">Password</label>
                                        </div>
                                        {formdata.password != "" && Alphanumaric && <span className='text-danger mx-4 small' >Strong password, consider using a mix of alphabetic numbers, and special symbols.</span>}

                                        <div className="outlined-input col-12 my-4">
                                            <input type='password' name="confirm_password" placeholder=" " value={formdata.confirm_password} className="w-100" onChange={handleInputChange} />
                                            <label for="test">Confirm Password</label>
                                        </div>
                                        {passwordmatch && <span className='text-danger mx-4 small' >Password not match </span>}
                                    </div>
                                </div>

                            )

                            }
                            <button className="btn btn-connect w-100 my-3" onClick={() => { handleSubmit() }}>
                                Submit
                            </button>
                            {/* <div className="text-center">
                                <hr />
                                <p>Or login With</p>
                                <div className='d-flex justify-content-around'>
                                    <img src={Facebook} className='m-1' style={{ borderRadius: "2%", width: "30%", height: '50px' }} />
                                    <img src={Google} className='m-1' style={{ borderRadius: "2%", width: "30%", height: '50px' }} />
                                    <img src={Mac} className='m-1' style={{ borderRadius: "2%", width: "30%", height: '50px' }} />
                                </div>

                            </div> */}
                        </div>
                    </div>
                </div>
                <div className="col-6  p-0 colorimage">
                    {/* <div className='d-lg-flex d-md-flex d-none h-100 justify-content-center align-items-center'>
                        <img src={"/images/icons/logo.png"} style={{ borderRadius: "0%", width: "300px", height: '190px' }} />
                    </div>   */}
                                        <Rightcolumn />

                                  </div>
            </div>
        </div>
    )
}

export default Forgotpassword
