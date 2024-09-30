import { signInWithPopup } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import { Fade } from 'react-reveal';
import google from './Assets/gogle.png';
import meta from './Assets/meta.png';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { auth, googleAuthProvider } from '../../../../firebase';
import FetchData from '../../../fetch-api/Apifetch';
import Rightcolumn from '../../../screens/newRegister/layout/RightColumn';
import { decryptData, encryptData } from '../../../utils/EncryptDecrypt';
import { RedirectRoute } from '../../../utils/Function';
import '../../../screens/newRegister/Style/configure.css'

const Emaillogin = () => {
        const [email, setEmail] = useState(decryptData(localStorage.getItem("email")));
        const [buttonclick, setbuttonclick] = useState(false);
        const [toastShown, setToastShown] = useState(false);
        const [password, setPassword] = useState(decryptData(localStorage.getItem("password")));
        const navigate = useNavigate();
        const [step, setStep] = useState(0)
        const [isChecked, setIsChecked] = useState(false); // Initialize the state
        const [showpassword, setshowpassword] = useState(false);
        const handleToastClose = () => {
            setToastShown(false);
        };
        const handleKeyPress = (e) => {
            if (e.key === 'Enter') {
                handleButtonClick();
            }
        };
    
        const handlePassKey = (e) => {
            if (e.key === 'Enter') {
                LoginCheck();
            }
        }
        const handleButtonClick = () => {
            if (email != '') {
                CheckEmail()
            } else {
                toast.warning("Enter Email or phone")
            }
        }
    
  
        function validateEmail(email) {
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return regex.test(email);
        }
    
        const LoginCheck = async () => {
            try {
                setbuttonclick(true)
                if (!email || !password) {
                    if (!toastShown) {
                        toast.error('Please enter both email and password.', {
                            autoClose: 3000,
                            closeButton: false,
                            onClose: handleToastClose,
                        });
                        setToastShown(true);
                    }
                    setbuttonclick(false)
                    return;
                }
    
                const token = false;
                const data = {
                    gmail: email,
                    password: password
                };
    
                const res = await FetchData("check/user", 'POST', JSON.stringify(data), token, false);
                if (res.data) {
                    if (isChecked) {
                        const encryptedData = encryptData(email);
                        const encryptedData1 = encryptData(password);
                        localStorage.setItem("email", encryptedData)
                        localStorage.setItem("password", encryptedData1)
                    }
                    toast.success("Login successfully")
                    if (res.data.user?.transaction_login == 0) {
                        // RedirectRoute("/suggestions")
                        localStorage.setItem('VERIFYDATA',JSON.stringify(res.data.user))
                        navigate(`/bp/personal_info?` + res.data.user._id)
                        
                    } else {
                        localStorage.setItem("TRANSACTIONLOGIN", JSON.stringify(res.data.data))
                        RedirectRoute("/bp/dashboard")
                        // navigate("/feed-page")
                        // window.location.reload()
                    }
    
                }
            } catch (error) {
                toast.error(error.message);
                setbuttonclick(false)
            }
        }
    
        const CheckEmaildata =async(email)=>{
            try {
                const res = await FetchData(`user/email_verify/${email}?otp=true`, 'GET', null, false, false);
                if (res.success) {
                    if (res.data.user?.transaction_login == 0) {
                        // RedirectRoute("/suggestions")
                        localStorage.setItem('VERIFYDATA',JSON.stringify(res.data.user))
                        RedirectRoute(`/bp/personal_info?` + res.data.user._id)
                        
                    } else {
                        localStorage.setItem("TRANSACTIONLOGIN", JSON.stringify(res.data.data))
                        RedirectRoute("/bp/dashboard")
                        // navigate("/feed-page")
                        // window.location.reload()
                    }
                //   RedirectRoute("/feed-page")
                   return true;
                }
            } catch (error) {
              return false;
            }
        }

        const sendOTPEmail = async(data)=> {
            console.log(data);
            const res = await FetchData('user/otp', 'POST', JSON.stringify(data),false,false)
        }
    
        const googleLogin = async () => {
            signInWithPopup(auth,googleAuthProvider)
            .then(async (result) => {
              const { user } = result;
             const checkUser = await CheckEmaildata(user.email);
             if(!checkUser){
                const formselect = new FormData();
                formselect.append("data", JSON.stringify({ 
                    gmail: user.email,
                    first_name: user.displayName,
                    last_name: "",
                    profile: user.photoURL,
                    phone: user.providerData[0]?.phoneNumber,
                    registerType: "USER",
                 }));
                const res = await FetchData("add/user", 'POST', formselect, false, true);
                if (res.success) {
                    // localStorage.setItem("LOGINDATA", JSON.stringify({
                    //     BusinessInfoData:[],
                    //     user:res.data.data,
                    //     BankInfoData:{},
                    //     License:[]
                    // }))

                    localStorage.setItem("VERIFYDATA", JSON.stringify(res.data.data))
                     navigate("/bp/personal_info?" + res.data._id)
                  
                    // RedirectRoute("/feed-page")
                     return true;
                }
             }
            })
            .catch((err) => {
              toast.error(err.message);
            });
        };
    
        const CheckEmail = async () => {
            try {
                if (!validateEmail(email)) {
                    toast.error("Please Enter Valid Email.");
                    return
                }
                const res = await FetchData(`user/email_verify/${email}`, 'GET', null, false, false);
                if (res.success) {

                    await sendOTPEmail(res.data.user)
                    if (res.data.user.otp_verify === 1) {
                        if (res.data.user.password == '0') {
                            localStorage.setItem('VERIFYDATA', JSON.stringify(res.data.user))
                            navigate("/bp/personal_info")
                        } else {
                            console.log(res);
                            // if(res?.user?.transaction_login == 0){
                            // navigate(`/bp/personal_info?` + res.data.user._id)
                            // }
                            // else{
                                setStep(1)   
                            // }
                        }
                    } else {
                        // localStorage.setItem("VERIFYDATA", JSON.stringify(res.data))
                        // navigate(`/bp/Otp/${email}`)
                    }
                }
            } catch (error) {
                if (error.message == "User Not Found") {
                    try {
                        const formselect = new FormData();
                        formselect.append("data", JSON.stringify({ gmail: email }));
                        const res = await FetchData("add/user", 'POST', formselect, false, true);
                        if (res.success) {
                            localStorage.setItem("User", JSON.stringify(res.data))
                            toast.success('OTP sent successfully.');
                            // navigate(`bp/otp/${email}`)
                            navigate(`/bp/Otp/${email}`,{state:true})

                        } else {
                            toast.error('Please Check Credentials!');
                        }
                    } catch (error) {
                        toast.error(error.message);
                    }
                } else {
                    toast.error(error.message)
                    return null;
                }
            }
        }
        const handleshow = () => {
            setshowpassword(!showpassword);
        }
        const inputField = (title, setValue, valuedata, Inputtype, disable = false) => {
            return (
                title != 'Password' ? (
                    <div className="outlined-input col-12 my-2">
                        <input type={Inputtype} name="test"
                            value={valuedata}
                            disabled={disable}
                            onKeyDown={handleKeyPress}
                            onChange={(e) => setValue(e.target.value)}
                            placeholder=" " className="w-100" />
                        <label for="test">{title}</label>
                    </div>
                ) : (
                    <>
                     <div className='w-100 d-flex'>
                        <div className="outlined-input col-12 my-2 px-0">
                            <input type={Inputtype}
                                name="test"
                                value={valuedata}
                                disabled={disable}
                                onKeyDown={handlePassKey}
                                onChange={(e) => setValue(e.target.value)}
                                placeholder=" " className="w-100" />
                            <label for="test" >{title}</label>
                        </div>
                        <div onClick={() => { handleshow() }} style={{ position: 'relative', top: '35%', right: '10%' }}>
                            <i class="fa fa-eye" aria-hidden="true"></i>
                        </div>
                     </div>
                        </>
                )
            )
        }
    
        const FeedPageRedirect = () => {
            localStorage.setItem("LOGINDATA", JSON.stringify({
                user: {
                    username: "3d7e9m5o8u5s9e0r",
                    gmail: "demo@user.com",
                    randomprofile: 3,
                    phone: "9876543210",
                    designation: "Demo Designation",
                    city: "Demo City",
                    country: "Demo Country",
                    first_name: "Guest",
                    last_name: "User",
                }
            }))
            RedirectRoute("/feed-page")
          
            // window.location.reload()
        }
        return (
    
            <div className="container-fluid card" style={{ backgroundColor: '#e9ecef', height: 'auto', minHeight: '100vh' }}>
                <Fade direction='right'>
                    <div className="row mx-lg-5 marginall"  >
                        <div className="col-lg-6 col-sm-12">
                            <div className="align-content-center flex-column h-100 justify-content-center m-lg-4 px-lg-5 px-sm-2 w-100">
                                <div className="d-flex justify-content-start px-2 py-4">
                                    <img src="/images/icons/logo.png" alt="" style={{ width: "120px", height: "75px" }} />
                                </div>
                                <div className="p-lg-1 p-sm-2">
                                   <h4 className='fonttitle'>Connect Souq Transaction Module</h4>
                                    <p style={{ color: 'gray' }} className="fontsubtitle">Connecting people around the globe</p>
                                    <div className='row row-gap-1'>
                                        {step == 0 ? (
                                            <>
                                                {inputField("Email", setEmail, email, 'email', false)}
                                            </>
                                        ) : (
                                            <>
                                                {inputField("Email", setEmail, email, 'email', true)}
                                                {inputField("Password", setPassword, password, showpassword ? 'text' : 'password', false)}
                                                <div className='d-flex justify-content-end pl-3 pr-2 w-100 align-items-baseline'>
                                                    <div>
                                                        <p className='fontcontent1' onClick={() => { navigate("/forgot_password") }}>Forgot password?</p>
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                        {step == 0 ? (
                                            <button className='btn fontsubtitle btn-connect mx-3 my-3' style={{width:'94%'}}
                                                onClick={handleButtonClick}
    
                                            >
                                                Next</button>) : (
                                            <button
                                                onClick={() => LoginCheck()}
                                                disabled={buttonclick}
                                                className="btn btn-connect mx-3 my-3" style={{width:'94%'}} >
                                                Login
                                            </button>
                                        )}
    
                                    </div>
                                    <div className="text-center">
                                    <div className='d-flex justify-content-around align-items-stretch py-3'>
                                        <hr style={{ width: '33.3%' }} />
                                        <p style={{ color: '#313131', }} className="fontcontent1">or login with</p>
                                        <hr style={{ width: '33.3%' }} />
                                    </div>
                                    <div className='d-flex justify-content-around'>
                                        <div className='rounded d-flex justify-content-center align-items-center' style={{ border: '1px solid #7497F1', width: '49%', height: 40 }}><img src={meta} width={'41%'} /></div>
                                        <div className='rounded d-flex justify-content-center align-items-center' 
                                        style={{ border: '1px solid #7497F1', width: '49%', height: 40,cursor:"pointer" }}
                                        onClick={googleLogin}
                                        ><img src={google} width={'38%'} /></div>
                                        {/* <img src={meta} className='m-1' style={{ borderRadius: "2%", height: '40px',width:'50%'}} /> */}
                                        {/* <img src={Google} className='m-1' style={{ borderRadius: "2%", height: '40px',width:'50%' }} /> */}
                                        {/* <img src={Mac} className='m-1' style={{ borderRadius: "2%", height: '40px' }} /> */}
                                    </div>
                                </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-6  p-0 colorimage d-none d-md-block d-lg-block" >
                            <Rightcolumn />
    
                        </div>
                    </div>
                </Fade>
            </div>
        )
    }

export default Emaillogin
