import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'
import location from '../../utils/location.json'
import FetchData from '../../fetch-api/Apifetch'
import Upload from '../newRegister/Assets/upload.png'
import Close from '../newRegister/Assets/close.png'
import "../newRegister/Style/configure.css"
import { toast } from 'react-toastify';
import { BASE_URL } from '../../utils/ApiRoute'
import 'react-toastify/dist/ReactToastify.css';

const BP_Profile = ({SetShow, show,id}) => {
  //Personal info data
  const [user, setUser] = useState(pre => JSON.parse(localStorage.getItem('Data')));
  const [errors, setErrors] = useState({});
  const [licence, setLicense] = useState(null);

  useEffect(() => {
    setUserDataFromLocalStorage();
  }, [user,show]);

  const inputField = (title, img) => {

    const isPDF = (url) => url?.endsWith('.pdf');

    return(
        <div className="align-items-center col-3 d-flex my-4 py-4 m-1" style={{ border: "1px solid" }}>
            <div className="align-items-center  justify-content-between w-100">
                <div className="d-flex justify-content-center align-items-center ">
                        <div id="image-preview" style={{display:'flex',justifyContent:'center'}}>
                            {/* <img src={BASE_URL+img} alt="Preview" height="100px" width='100%' /> */}
                            {isPDF(img) ? (
                            <embed
                                src={BASE_URL + img}
                                type="application/pdf"
                                width="100%"
                                height="100px"
                                style={{ border: 'none' }}
                            />
                        ) : (
                            <img
                                src={BASE_URL + img}
                                alt="Preview"
                                height="100px"
                                width="100%"
                                style={{ objectFit: 'contain' }}
                            />
                        )}
                        </div>

                    <div className='title-proof'>
                        <label htmlFor="test">{title}</label>
                    </div>
                </div>
            </div>
        </div>
    );      
};

  const setUserDataFromLocalStorage = async() => {
    try {
      const res = await FetchData(`/detail/user/${id}`, 'GET', null, true, false);
      if (res.success) {
        const { user, BusinessInfoData, BankInfoData ,License} = res.data;
        if (user) {
          setUserdata({
            first_name: user.first_name || '',
            last_name: user.last_name || '',
            date_of_birth: user.date_of_birth || '',
            gmail: user.gmail || '',
            phone: user.phone || '',
            country: user.country || '',
            city: user.city || '',
            designation: user.designation || ''
          });
        }
        if (BankInfoData) {
          setBankInfo({
            account_number: BankInfoData.account_number || '',
            institution_number: BankInfoData.institution_number || '',
            transit_number: BankInfoData.transit_number || '',
          });
        }
        if (BusinessInfoData[0]) {
          setBusinessdata(BusinessInfoData[0])
        }
        if(License){
          setLicense(License[0])
          // setAddressProofView(License.AddressProof)
          // setPanCard(License.PanCard)
          // setAddressProof(License.AddressProof)
        }
      } else {
        console.error("Error fetching details:", res.message);
      }
    } catch (error) {
      console.error("Error fetching details:", error.message);
    }

};


  const [userdata, setUserdata] = useState(
    {
      first_name: '',
      last_name: '',
      date_of_birth: '',
      gmail: '',
      phone: '',
      country: '',
      city: '',
      user_type: "1",
      login_type: "1",
    }
  )

  const MoveNext = () => {
    if(Step == 2){
      return
    }
    return setStep(Step + 1)
  }


  //Business Details data
  const [businessdata, setBusinessdata] = useState({
    company_name: "",
    area_of_interest: [],
    website: "",
    business_contact: "",
    country: "",
    city: "",
    limit: "",
    annual_turnover: "",
    size: "",
    phone: "",
    other_industry: "",
    user_id: JSON.parse(localStorage.getItem('User'))?._id,
    type: ""
  });


  const [Bankinfo, setBankInfo] = useState({
    transit_number: "",
    account_number: "",
    institution_number: "",
    user_id: JSON.parse(localStorage.getItem('User'))?._id
  })

  useEffect(() => {
    SetShow(show)
  }, [show])

  const handleClose = () => {
    SetShow(false);
  };


  const InputField = (label, name, type, value, placeholder, error, readonly) => (
    <div className="col-6 mb-2 mt-3 inputs-form">
      <label htmlFor={`exampleInput${name}`} className="form-label mr-3" style={{ fontWeight: "500" }}>
        {label}
      </label>
      <input
        type={type}
        className={`form-control inputcontrol ${error ? 'is-invalid' : ''}`}
        name={name}
        value={value}
        placeholder={placeholder}
        readOnly={readonly}
        disabled={true}
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );


  const [businesscityList, setBusinessCityList] = useState([]);
  const BusinessCitylist = (title) => {
    const filteredCities = [];
    var data = location.find(item => item.name == businessdata.country)
    data.states.forEach(state => {
      state.cities.forEach(city => {
        if(city.name.toLowerCase().startsWith(title.toLowerCase())) {
          filteredCities.push({ name: city.name, state: state.name });
        }
      });
    });
    setBusinessCityList(filteredCities)
  }
  const [Step, setStep] = useState(0);
  return (
    <div>
      <Modal show={show}
        onHide={handleClose}
        className="modelfilter modal-xl mode"
        size="lgauto">
        <Modal.Body className="blackback1">
          <span className="step ml-5" style={{ fontSize: 23, float: 'right', cursor: 'pointer' }} onClick={handleClose} >&times;</span>
          {/* <div className='px-5 pt-3 mx-5 d-flex flex-column mb-3' style={{ rowGap: 15 }} >
            <span className="step" style={{ fontSize: 15 }}>Step {Step + 1}</span>
            <div className='d-flex align-items-center'>
              <div class="progress " style={{ borderRadius: 20, border: '1px solid gray', height: 15, width: '100%' }}>
                <div class="progress-bar" role="progressbar" style={{ width: Step == 0 ? '25%' : Step == 1 ? '50%' : Step == 2 ? '75%' : '100%', backgroundColor: '#4535C1' }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" ></div>
              </div>
              <span className='step' style={{ fontSize: 15 }}> {Step + 1}/4</span>
            </div>
            <span className="step" style={{ fontSize: 15 }} >Complete the 4 Steps</span>

          </div> */}
          {/* Personal INFormation INputs */}
          {Step == 0 ? (
            <div className='row px-5'>
              <h5 className="col-12 text-center mt-1 text-center">Profile details!</h5>
              {InputField("First Name*", "first_name", "text", userdata.first_name, "Enter your first name", errors.first_name)}
              {InputField("Last Name*", "last_name", "text", userdata.last_name, "Enter your last name", errors.last_name)}
              {InputField("DOB*", "date_of_birth", "date", userdata.date_of_birth, "Enter your last name", errors.date_of_birth)}
              {InputField("Phone Number", "phone", "number", userdata.phone, "Enter your Mobile Number")}
              {InputField("E-mail*", "email", "gmail", userdata.gmail, "Enter your email", errors.email, true)}
              {InputField("Designation*", "designation", "text", userdata.designation, "Enter your designation",errors.designation)}
              <div className="col-6 mb-2 mt-3 inputs-form">
                <label htmlFor="exampleInputCountry" className="form-label mr-3" style={{ fontWeight: "500" }}>
                  Country*
                </label>
                <select
                  name="country"
                  value={userdata.country}
                  // onChange={handleInputChange}
                  className={`form-control inputcontrol ${errors.country ? 'is-invalid' : ''}`} id="exampleInputCountry" aria-describedby="countryHelp">
                  <option value="" disabled selected>Select a country</option>
                  {location.map(item => (
                    <option value={item.name}>{item.name}</option>
                  ))}
                </select>
                {errors.country && <div className="text-danger">{errors.country}</div>}
              </div>
              <div className="col-6 mb-2 mt-3 inputs-form">
                <label htmlFor="exampleInputCity" className="form-label mr-3" style={{ fontWeight: "500" }}>
                  City*
                </label>
                <input
                  list="citys"
                  name="city"
                  id="browser"
                  value={userdata.city}
                  className={`form-control inputcontrol ${errors.city ? 'is-invalid' : ''}`}
                />
              </div>
            </div>
          ) : Step == 1 ? (
            <div className='container-fluid' style={{ overflowY: 'scroll', maxHeight: '65vh' }}>
              <div className='row px-2'>
                <h5 className="col-12 text-center mt-1 text-center">Please enter your business details!</h5>

                <div className="col-6 mb-2 mt-3 inputs-form">
                  <label htmlFor="exampleInputCountry" className="form-label mr-3" style={{ fontWeight: "500" }}>
                    Country*
                  </label>
                  <select
                    name="country"
                    value={businessdata.country}
                    // onChange={handleBusinessValueChange}
                    className={`form-control inputcontrol ${errors.country ? 'is-invalid' : ''}`} id="exampleInputCountry" aria-describedby="countryHelp">
                    <option value="" disabled selected>Select a country</option>
                    {location.map(item => (
                      <option value={item.name}>{item.name}</option>
                    ))}
                  </select>
                  {errors.country && <div className="invalid-feedback">{errors.country}</div>}
                </div>
                {/* {InputField("City*", "city*", "text", businessdata.city, handleBusinessInputChange, "Enter your city")} */}

                <div className="col-6 mb-2 mt-3 inputs-form">
                  <label htmlFor="exampleInputCity" className="form-label mr-3" style={{ fontWeight: "500" }}>
                    City*
                  </label>
                  <input
                    list="citys"
                    name="city"
                    id="browser"
                    value={businessdata.city}
                    onChange={(e) => {
                      const { value } = e.target;
                      setBusinessdata({ ...businessdata, city: value });
                      BusinessCitylist(value);
                    }}
                    className={`form-control inputcontrol ${errors.city ? 'is-invalid' : ''}`}
                  />
                  <datalist id="citys">
                    {businesscityList.map(item => (
                      <option key={item.name} value={`${item.name} ${item.state}`}>{`${item.name} ${item.state}`}</option>
                    ))}
                  </datalist>
                  {errors.city && <div className="invalid-feedback">{errors.city}</div>}
                </div>
                {/* {InputField("Industry", "first_name", "text", businessdata.first_name, handleBusinessInputChange, "Enter your first name")} */}

                <div className="col-6 mb-2 mt-3 inputs-form d-flex flex-wrap column-gap-1">
                  <label htmlFor="exampleInputCountry" className="form-label mr-3 col-12 pl-0" style={{ fontWeight: "500" }}>
                    Industry*
                  </label>
                  {businessdata.area_of_interest.map((option, index) => (
                    <div key={option.title} className="checkbox-item m ">
                     {"*"} <label className='m-2'>{option.title}</label>
                    </div>
                  ))}
                  {errors.area_of_interest && <div className="invalid-feedback">{errors.area_of_interest}</div>}

                </div>
                {errors.area_of_interest && (
                  <div className="text-danger">{errors.area_of_interest}</div>
                )}
                {InputField("Company Name", "company_name", "text", businessdata.company_name,  "Enter your Company", errors.company_name)}
                {InputField("Business Contact*", "phone", "number", businessdata.phone,  "Enter your business contact", errors.phone)}
                {InputField("Business Email*", "email", "email", businessdata.email,  "Enter your business contact", errors.email)}
                {InputField("Annual Income*", "annual_turnover", "number", businessdata.annual_turnover,  "Enter your annual income", errors.annual_turnover)}
                {InputField("Company Size*", "size", "number", businessdata.size,  "Enter your Company Size", errors.size)}
                {InputField("Other industry*", "other_industry", "text", businessdata.other_industry,  "Enter your other Industry", errors.other_industry)}
                {InputField("Type*", "type", "text", businessdata.type==2?"Seller":businessdata.type==0?"Buyer":businessdata.type==1?"Business Partner":"Select user",  "Enter your other Industry", errors.type)}
              </div>
            </div>
          ) 
          // : Step == 3 ? (
          //   <div>
          //   <form form className="row w-100 p-3 m-0 flex-column">
          //     <p className='px-3'>
          //       Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
          //       when an unknown printer took a galley of type and scrambled it to make a type specimen book.<a href=''>visit here</a>
          //     </p>
          //     <div className="col-6 mb-3">
          //       <input
          //         type="text"
          //         name="transit_number"
          //         value={Bankinfo.transit_number}
          //         // onChange={handleBankInputChange}
          //         className={`form-control inputcontrol ${errors.transit_number ? 'is-invalid' : ''}`}
          //         aria-describedby="textHelp"
          //         placeholder='Transit Number'
          //       />
          //       {errors.transit_number && <div className="invalid-feedback">{errors.transit_number}</div>}
          //     </div>
          
          //     <div className="col-6 mb-3">
          //       <input
          //         type="text"
          //         className={`form-control inputcontrol ${errors.institution_number ? 'is-invalid' : ''}`}
          //         name="institution_number"
          //         value={Bankinfo.institution_number}
          //         // onChange={handleBankInputChange}
          //         aria-describedby="textHelp"
          //         placeholder='Institution Number'
          //       />
          //       {errors.institution_number && <div className="invalid-feedback">{errors.institution_number}</div>}
          //     </div>
          //     <div className="col-6 mb-3">
          //       <input
          //         type="text"
          //         className={`form-control inputcontrol ${errors.account_number ? 'is-invalid' : ''}`}
          //         name="account_number"
          //         value={Bankinfo.account_number}
          //         // onChange={handleBankInputChange}
          //         aria-describedby="textHelp"
          //         placeholder='Account Number'
          //       />
          //       {errors.account_number && <div className="invalid-feedback">{errors.account_number}</div>}
          //     </div>
          //   </form>
          // </div>
          // )
          :Step == 2 ? (
            <div className='row m-2 column-gap-5 justify-content-center'>
            {inputField("ID Proof", businessdata.business_logo)}
            {/* {inputField("Address Proof",licence.AddressProof)}  */}
            {/* {inputField("Nation ID/Driving License",licence.NationalID)} */}
            {inputField("Business Card",licence?.BusinessRegister)}
            {/* {inputField("GST Certificate",licence.GstCertificate)} */}
            {/* {inputField("Bank Passbook",licence.BankPassbook)} */}
            {inputField("Export Copy",licence?.ExportCopy)} 
            {/* <button className="btn btn-connect w-100 mx-auto my-3"
            onClick={()=>addLicenceImages()}>
                Register
            </button> */}
        </div>
          ):null}

          <div className="col-12 mb-2 mt-3 inputs-form d-flex justify-content-around column-gap-1 align-items-center ">
            <div onClick={() => {
              if (Step != 0) {
                setStep(Step - 1)
              }
            }}><i class="fa fa-arrow-left" aria-hidden="true" style={{ cursor: "pointer" }}></i>
            </div>
            <div onClick={() => MoveNext()}><i class="fa fa-arrow-right" aria-hidden="true" style={{ cursor: "pointer" }}></i>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default BP_Profile
