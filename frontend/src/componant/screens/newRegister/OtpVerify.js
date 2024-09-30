import React, { useEffect, useRef, useState } from 'react'
import OtpInput from 'react-otp-input';
import "./Style/configure.css"
import { useNavigate, useParams } from 'react-router-dom';
import { validateForm } from '../../utils/Function'
import { toast } from 'react-toastify';
import FetchData from '../../fetch-api/Apifetch';
import { Fade } from 'react-awesome-reveal';
import Rightcolumn from './layout/RightColumn';

const OtpVerify = () => {
    const navigate = useNavigate()
    const { gmail } = useParams();
    const [otp, setOtp] = useState("")
    const [seconds, setSeconds] = useState(300); // Initialize timer to 60 seconds
    const timerRef = useRef(null); // Use ref to store the timer ID

    const [values, setValues] = useState(Array(6).fill(''));
    const [buttonclick, setbuttonclick] = useState(false);

    const inputRefs = useRef([]);



    // 
    const handleEnterKey = (e) => {
        if (e.key === 'Enter') {

            LoginCheck();
        }
    }


    useEffect(() => {
        startTimer();
        // Cleanup interval on component unmount
        return () => clearInterval(timerRef.current);
    }, []);
    const startTimer = () => {
        timerRef.current = setInterval(() => {
            setSeconds(prevSeconds => prevSeconds - 1);
        }, 1000);
    };
    useEffect(() => {
        if (seconds === 0) {
            clearInterval(timerRef.current);
            // Perform any action when the timer reaches zero
            console.log('Timer finished');
        }
    }, [seconds]);
    const restartTimer = () => {
        clearInterval(timerRef.current);
        setSeconds(300); // Reset seconds to initial value
        startTimer(); // Start the timer again
    };


    const resendOtp = async () => {
        try {
            const response = await FetchData(`user/sendemail`, 'POST', JSON.stringify({ gmail: gmail }), false, false);
            if (response.success) {
                toast.info("Code has been resent")
                restartTimer()
            } else {
                toast.error("Can't Resend code");
            }
        } catch (error) {
            toast.error(error.message);
        }
    }


    const LoginCheck = async () => {
        setbuttonclick(true)
        try {
            const token = false;
            const data = {
                otp: otp,
                gmail: gmail,
            }
            if (!validateForm(data)) {
                toast.error("OTP Required")
                return
            }
            const res = await FetchData("user/verify", 'POST', JSON.stringify(data), token, false);
            if (res.success) {
                toast.success("OTP verified successfully")
                if (gmail) {
                    localStorage.setItem("VERIFYDATA", JSON.stringify(res.data))
                    // navigate("/personal_info?" + res.data._id)
                    window.location.href = "/personal_info?" + res.data._id;
                    setbuttonclick(false)
                }
            } else {
                toast.error('invalidOTP');
                setOtp('')
                setbuttonclick(false)
            }
        } catch (error) {
            toast.error(error.message);
            setOtp('')
            setbuttonclick(false)


        }
    }

    const handlePaste = (e) => {
        e.preventDefault();
        let paste = e.clipboardData.getData('text');
        paste = paste.slice(0, 6); // Ensure it only takes the first 6 characters if more are pasted
        setOtp(paste);
    };

    return (

        <div className="container-fluid card" style={{ backgroundColor: '#e9ecef', height: 'auto', minHeight: '100vh' }}>
            <Fade direction='right'>
                <div className="row mx-lg-5 marginall"  >
                    <div className="col-lg-6 col-sm-12 d-flex justify-content-center align-items-center">
                        <div className="w-100 m-4 h-auto">
                            {/* <div className="d-flex justify-content-start p-4">
                                <img src="/images/icons/logo.png" alt="" style={{ width: "120px", height: "75px" }} />
                            </div> */}
                            <div className="p-lg-4 p-md-4 p-sm-0">
                                <a className='fontcontent1' style={{ color: "black", cursor: 'pointer' }} onClick={() => { navigate(-1) }} ><i class="fa fa-chevron-left" aria-hidden="true"></i> Back to Login</a>
                                <h4 className='fonttitle' style={{ marginTop: "20px" }}>OTP Verification</h4>
                                <p style={{ color: 'gray' }} className='fontsubtitle'>Please enter the One-Time Password to verify your account.</p>
                                <div className='row py-3'>
                                    <OtpInput
                                        value={otp}
                                        onChange={setOtp}
                                        numInputs={6}
                                        shouldAutoFocus={true}
                                        onPaste={handlePaste}


                                        renderInput={(props) => <input {...props} className="otp-input" onKeyDown={handleEnterKey} />}
                                    />
                                    <button
                                        disabled={buttonclick}
                                        onClick={() => LoginCheck()}
                                        className="btn btn-connect mx-3 my-3" style={{ width: '94%' }}
                                    //  disabled={seconds === 0}
                                    >
                                        Validate
                                    </button>
                                </div>
                                <div className="text-center">
                                    {/* {seconds === 0 && */}
                                    <p onClick={() => resendOtp()} style={{ color: '#592C92', textDecoration: 'underline', cursor: 'pointer' }}>Resend Verification code </p>
                                    {/* // } */}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-6 p-0 colorimage d-none d-md-block d-lg-block" style={{ borderRadius: "0px 10px 10px 0px" }}>
                        <Rightcolumn />
                    </div>
                </div>
            </Fade>
        </div>
    )
}

export default OtpVerify;
