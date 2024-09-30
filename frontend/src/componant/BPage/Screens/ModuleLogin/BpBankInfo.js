import React, { useEffect, useState } from 'react'
import { Fade } from 'react-reveal';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import FetchData from '../../../fetch-api/Apifetch';
import Rightcolumn from '../../../screens/newRegister/layout/RightColumn';
import { BUSINESS_URL } from '../../../utils/ApiRoute';
import { RedirectRoute, validateForm } from '../../../utils/Function';
import '../../../screens/newRegister/Style/configure.css'

const BpBankInfo = () => {
        const User = JSON.parse(localStorage.getItem("VERIFYDATA"))
        const [btndisable, setBtndisable] = useState(false);
        const navigate = useNavigate()
        const [formdata, setFormdata] = useState({
          transit_number: "",
          account_number: "",
          institution_number: "",
          user_id: User?._id
        })
        
        const handleInputChange = (e) => {
          const { name, value } = e.target;
          setFormdata({ ...formdata, [name]: value });
        };
      
        const [isUserSet, setIsUserSet] = useState(false);
      
        useEffect(() => {
          setIsUserSet(true);
        }, []);
      
        const AddData = async () => {
          setBtndisable(true)
          try {
            const token = false;
            if (!validateForm(formdata)) {
              toast.error("please enter mandatory fields");
              setBtndisable(false)
      
              return
            }
            const res = await FetchData("bank_info", 'POST', JSON.stringify(formdata), token, false);
            if (res.success) {
              toast.success("User Data Stored Successfully")
              // if(res.data.user?.user_type === '1') {
              //   window.location.href = BUSINESS_URL + "?user_id=" + res.data.user?._id;
              // }else{
                localStorage.removeItem('type')
                localStorage.setItem("LOGINDATA", JSON.stringify(res.data.data))
                // window.location.reload()
                RedirectRoute("/bp/dashboard")
              // }
            }else{
              toast.error("Please Check Crediential")
              setBtndisable(false)
            }
            return null;
          }catch(error) {
            console.error('Error:', error);
            toast.error(error.message)
            setBtndisable(false)
      
            return null;
          }
        }
      
      
        const inputField = (title, name, type, value, onChange) => {
          return (
            <div className="outlined-input col-12 my-2">
              <input type="text"
                name={name}
                value={value}
                onChange={onChange}
                placeholder=" " className="w-100" />
              <label for="test">{title}</label>
            </div>
          )
        }
        return (
          <div className="container-fluid card" style={{ backgroundColor: 'rgb(233, 236, 239)', height: 'auto', minHeight: '100vh'}}>
            <Fade direction='right'>
              <div className="row mx-lg-5 marginall">
                <div className="col-lg-6 col-sm-12 ">
                  <div className="w-100 m-lg-4 h-100">
                    <div className="p-lg-5 p-sm-2 mt-4 mt-lg-0">
                    <a className='fontcontent1' style={{color:"black",cursor:'pointer'}} onClick={()=>{navigate("/license")}}><i class="fa fa-chevron-left"  aria-hidden="true"></i> Back to Business verification</a>
                      <h4 className='fonttitle' style={{marginTop:"20px"}}>Bank Details</h4>
                      <p style={{color: 'gray' }} className="fontsubtitle">Bank details are required to Complete the Transactions!</p>
                      <div className='row'>
                        {inputField("Transit Number", "transit_number", "text", formdata.transit_number, handleInputChange)}
                        {inputField("Institution Number", "institution_number", "text", formdata.institution_number, handleInputChange)}
                        {inputField("Account Number", "account_number", "text", formdata.account_number, handleInputChange)}
                        <div className='d-flex justify-content-end column-gap-1 w-100 mt-4 pr-3'>
                          {/* <button className="btn fontsubtitle btn-secondary  my-3"
                            style={{ width: '25%' }}
                            onClick={() => SkipButton()}>Skip</button> */}
                          <button className="btn fontsubtitle btn-connect my-3" disabled={btndisable} onClick={() => AddData()}
                            style={{ width:'25%'}}>
                            Submit
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-6 p-0 colorimage d-none d-md-block d-lg-block" style={{ borderRadius: '0px 10px 10px 0px ' }}>
                  {/* <div className='h-100 d-none d-lg-flex d-md-flex justify-content-center align-items-center'>
                    <img src={"/images/icons/logo.png"} style={{ borderRadius: "0% 5% 5% 0%", width: "300px", height: '190px' }} />
                  </div> */}
                              <Rightcolumn someProp={isUserSet}/>
                </div>
              </div>
            </Fade>
          </div>
        )
      }

export default BpBankInfo
