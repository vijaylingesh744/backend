import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'
import location from '../../utils/location.json'
import FetchData from '../../fetch-api/Apifetch'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Registration = ({ show }) => {
  //Personal info data
  const [user, setUser] = useState(pre => JSON.parse(localStorage.getItem('LOGINDATA')));
  const [errors, setErrors] = useState({});
  const [disable, setDisable] = useState(false);

  useEffect(() => {
    dataList();
    setUserDataFromLocalStorage();
  }, [user]);

  const setUserDataFromLocalStorage = () => {
    if (user) {
      const { user: userData, BusinessInfoData, businessContact, BankInfoData } = user;
      if (userData) {
        setUserdata({
          first_name: userData.first_name || '',
          last_name: userData.last_name || '',
          date_of_birth: userData.date_of_birth || '',
          gmail: userData.gmail || '',
          phone: userData.phone || '',
          country: userData.country || '',
          city: userData.city || '',
          designation: userData.designation || ''
        });
      }
      if (BankInfoData) {
        setBankInfo({
          account_number: BankInfoData.account_number || '',
          institution_number: BankInfoData.institution_number || '',
          transit_number: BankInfoData.transit_number || '',
        });
        // console.log(BankInfoData)
      }
      if (BusinessInfoData) {
        setBusinessdata({
          company_name: BusinessInfoData[0].company_name || '',
          area_of_interest: BusinessInfoData[0].area_of_interest || '',
          website: BusinessInfoData[0].website || '',
          business_contact: BusinessInfoData[0].business_contact || '',
          country: BusinessInfoData[0].country || '',
          city: BusinessInfoData[0].city || '',
          size: BusinessInfoData[0].size || '',
          phone: BusinessInfoData[0].phone || '',
          email: BusinessInfoData[0].email || '',
          type: BusinessInfoData[0].type || '',
          annual_turnover: BusinessInfoData[0].annual_turnover || '',
          other_industry: BusinessInfoData[0].other_industry || '',
        });
        setSelectedIndustry(BusinessInfoData[0].area_of_interest);
        console.log(selectedIndustry)
      }
      if (businessContact) {
        var dataappend =[{
          name: businessContact.name || [],
          email: businessContact.email || [],
          website: businessContact.website || [],
          contact: businessContact.contact || []
        }]
          var dataleng = businessContact.name.length;
          var lastFormData = {
            name: [],
            email: [],
            website: [],
            contact: []
        };
        for (let i = 0; i < dataleng-1; i++) {   
          dataappend.push(lastFormData);
        }
        setBusinessContact(dataappend)
      }
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


  const AddUser = async () => {
    if (disable) {
      return;
    }
    try {
      setDisable(true);
      const userId = user.user?._id;
      console.log("User ID:", userId);

      const isValid = validateFields();

      if (!isValid) {
        setErrors({});
        return;
      }


      const userDataToUpdate = {
        email: user.user?.gmail,
        user_id: userId,
        first_name: userdata.first_name,
        last_name: userdata.last_name,
        date_of_birth: userdata.date_of_birth,
        gmail: userdata.gmail,
        phone: userdata.phone,
        country: userdata.country,
        city: userdata.city,
        designation: userdata.designation,
        registerType: "USER"
      };

      const data = JSON.stringify(userDataToUpdate);

      const response = await FetchData(`update/user/${userId}`, 'POST', data, true, false);

      console.log("User data updated successfully:", response);
      toast.success("Personal details updated successfully");
      setDisable(false);

    } catch (error) {
      console.error("Error updating user data:", error);
      toast.error("Error updating user data");
      setDisable(false);
    }
  }
 
  const handleUpdate = async () => {
    console.log(errors.length);
    if (Step == 0) {
      const isValid = validateFields();
      if (isValid) {
        MoveNext();
        AddUser()
      }
    }
    else if (Step === 1) {
      const isValid = validateFields();
      if (isValid) {
        AddBusinessinfo();
        MoveNext();
      }
    }
    else if (Step == 2) {
    //   const isValid = validateFields();
    //   if (isValid) {
    //     AddReferinfo()
    //     MoveNext();
    //   }
    // }
    // else {
      const isValid = validateFields();
      if (isValid) {
      AddBankinfo()
     SetModalView(false);
    }
  }
  };
  const MoveNext = () => {
    // if (Step == 0) {
    //   if (userdata.first_name && userdata.last_name && userdata.date_of_birth && userdata.designation && userdata.city &&
    //     userdata.country) {

    //     return setStep(Step + 1)
    //   }
    //   else {
    //     const isValid = validateFields();

    //     if (!isValid) {
    //       return;
    //     }
    //   }
    // }

    // else if (Step == 1) {
    //   if (businessdata.country && businessdata.city && businessdata.area_of_interest && businessdata.phone && businessdata.annual_turnover &&
    //     businessdata.size && businessdata.other_industry && businessdata.type) {

    //     return setStep(Step + 1)
    //   }
    //   else {
    //     const isValid = validateFields();

    //     if (!isValid) {
    //       return;
    //     }
    //   }
    // }
    // else if (Step == 2) {

    //   // return setStep(Step + 1)

    // }
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

  const AddBusinessinfo = async () => {
    if (disable) {
      return;
    }

    businessdata.area_of_interest = selectedIndustry;
    try {

      setDisable(true)
      const userId = user.user?._id;
      console.log("User ID:", userId);


      const isValid = validateFields();

      if (!isValid) {
        setErrors({});
        return;
      }


      const businessDataToUpdate = {
        email: user.user?.gmail,
        user_id: userId,
        company_name: businessdata.company_name,
        area_of_interest: businessdata.area_of_interest,
        website: businessdata.website,
        annual_turnover: businessdata.annual_turnover,
        business_contact: businessdata.business_contact,
        country: businessdata.country,
        city: businessdata.city,
        other_industry: businessdata.other_industry,
        size: businessdata.size,
        phone: businessdata.phone,
        email: businessdata.email,
        type: businessdata.type,
        registerType: "BUSINESSINFO"
      };



      const data = JSON.stringify(businessDataToUpdate);

      const response = await FetchData(`update/user/${userId}`, 'POST', data, true, false);

      console.log("Business data updated successfully:", response);
      var datas = JSON.parse(localStorage.getItem('Data'))

      datas.BusinessInfoData = response.data;

      localStorage.setItem('Data', JSON.stringify(datas));
      toast.success("Business data updated successfully");
      setDisable  (false);
    } catch (error) {
      console.error("Error updating Business data:", error);
      toast.error("Error updating Business data");
      setDisable  (false);
    }
  };
  //// step businessContact datas
  const [businesscontact, setBusinessContact] = useState([
    {
      name: [],
      email: [],
      website: [],
      contact: [],
      // user_id: JSON.parse(localStorage.getItem("User"))?.id
    }
  ]);
  const AddReferinfo = async () => {
    if (disable) {
      return;
    }
    try {
      setDisable(true)
      const userId = user.user?._id;
      const update = {
        registerType: "BUSINESSCONTACT",
        user_id:userId
      }
      const updatedContacts = {...businesscontact[0],...update};
        const data = JSON.stringify(updatedContacts);
        const response = await FetchData(`update/user/${userId}`, 'POST', data, true, false);
        console.log("Refer data updated successfully:", response);
        var datas = JSON.parse(localStorage.getItem('Data'))
        datas.businessContact = response.data;
        localStorage.setItem('Data', JSON.stringify(datas));
 
      toast.success("Refer data updated successfully");
      setDisable(false);
    } catch (error) {
      console.error("Error updating Refer data:", error);
      toast.error("Error updating Refer data");
      setDisable(false);
    }
  };


  const [Bankinfo, setBankInfo] = useState({
    transit_number: "",
    account_number: "",
    institution_number: "",
    user_id: JSON.parse(localStorage.getItem('User'))?._id
  })
  const AddBankinfo = async () => {
    try {
      const userId = user.user?._id;

      // const isValid = validateFields();

      // if (!isValid) {
      //   setErrors({});
      //   return;
      // }
      const bankDataToUpdate = {
        email: user.user?.gmail,
        user_id: userId,
        transit_number: Bankinfo.transit_number,
        account_number: Bankinfo.account_number,
        institution_number: Bankinfo.institution_number,
        registerType: "BANKINFO"
      };

      const data = JSON.stringify(bankDataToUpdate);

      const response = await FetchData(`update/user/${userId}`, 'POST', data, true, false);

      console.log("Bank data updated successfully:", response);
      var datas = JSON.parse(localStorage.getItem('Data'))

      datas.BankInfoData = response.data;

      localStorage.setItem('Data', JSON.stringify(datas));

      toast.success("Bank data updated successfully");
    } catch (error) {
      console.error("Error updating Bank data:", error);
      toast.error("Error updating Bank data");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone") {
      const numericValue = value.replace(/\D/g, '');
      if (numericValue.length <= 10) {
        setUserdata({ ...userdata, [name]: numericValue });
      }
    } else {
      setUserdata({ ...userdata, [name]: value });
    }
  };
  const handleBusinessValueChange = (e) => {
    const { name, value } = e.target;

    setBusinessdata({ ...businessdata, [name]: value });
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
    // setSelectedIndustry(value);
  };
  const handleBusinessInputChange = (event) => {
    const { value, checked } = event.target;
    console.log(checked);

    if (checked) {
      console.log(value);
      var data = [...selectedIndustry, { title: value }]
      setSelectedIndustry(data);
      console.log(data);
    } else {
      var data = selectedIndustry.filter(item => item.title !== value)
      setSelectedIndustry(data);
      console.log(data);
    }
  };
  const handleBankInputChange = (e) => {
    const { name, value } = e.target;
    setBankInfo({ ...Bankinfo, [name]: value });
  };

  const [selectedIndustry, setSelectedIndustry] = useState([]);
  const [showModal, SetModalView] = useState(show);
  useEffect(() => {
    SetModalView(show)
  }, [show])

  const handleClose = () => {
    SetModalView(false);
  };


  const InputField = (label, name, type, value, onChange, placeholder, error, readonly) => (
    <div className="col-6 mb-2 mt-3 inputs-form">
      <label htmlFor={`exampleInput${name}`} className="form-label mr-3" style={{ fontWeight: "500" }}>
        {label}
      </label>
      <input
        type={type}
        className={`form-control inputcontrol ${error ? 'is-invalid' : ''}`}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        readOnly={readonly}
        disabled={true}
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );

  const validateFields = () => {
    const newErrors = {};

    // Step 0 validation
    if (Step === 0) {
      if (!userdata.first_name) {
        newErrors.first_name = 'First Name is required';
      }
      if (!userdata.last_name) {
        newErrors.last_name = 'Last Name is required';
      }
      if (!userdata.date_of_birth) {
        newErrors.date_of_birth = 'Date of Birth is required';
      }
      if (!userdata.gmail) {
        newErrors.gmail = 'Email is required';
      }
      if (!userdata.country) {
        newErrors.country = 'Country is required';
      }
      if (!userdata.city) {
        newErrors.city = 'City is required';
      }
      if (!userdata.designation) {
        newErrors.designation = 'Designation is required';
      }
    }

    // Step 1 validation
    if (Step === 1) {
      if (!businessdata.country) {
        newErrors.country = 'Country is required';
      }
      if (!businessdata.city) {
        newErrors.city = 'City is required';
      }
      if (!businessdata.area_of_interest || businessdata.area_of_interest.length === 0) {
        newErrors.area_of_interest = 'At least one Industry is required';
      }
      if (!businessdata.phone) {
        newErrors.phone = 'Business Contact is required';
      }
      if (!businessdata.annual_turnover) {
        newErrors.annual_turnover = 'Annual Turnover is required';
      }
      if (!businessdata.size) {
        newErrors.size = 'Company Size is required';
      }
      if (!businessdata.other_industry) {
        newErrors.other_industry = 'Other Industry is required';
      }
      if (!businessdata.type) {
        newErrors.type = 'Company Type is required';
      }
    }else if(Step === 3){
      if (!Bankinfo.transit_number) {
        newErrors.transit_number = 'Transit number is required';
      }
      if (!Bankinfo.institution_number) {
        newErrors.institution_number = 'Institution number is required';
      }
      if (!Bankinfo.account_number) {
        newErrors.account_number = 'Account number is required';
      }
    }
  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };



  const handleAddCard = () => {
    const lastFormData = {
      name: [],
      email: [],
      website: [],
      contact: []};
    setBusinessContact([...businesscontact, { ...lastFormData }]);
  };
  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const newData = [...businesscontact];
    newData[0][name][index] = value;
    console.log()
    setBusinessContact(newData);
  };
  const handleDeleteCard = (index) => {
    const newData = [...businesscontact];
    newData.splice(index, 1);
    setBusinessContact(newData);
  };

  //Get citylist by country 
  const [cityList, setCityList] = useState([]);
  const Citylist = (title) => {
    const filteredCities = [];
    var data = location.find(item => item.name == userdata.country)
    data.states.forEach(state => {
      state.cities.forEach(city => {
        if (city.name.toLowerCase().startsWith(title.toLowerCase())) {
          filteredCities.push({ name: city.name, state: state.name });
        }
      });
    });
    setCityList(filteredCities)
  }
  const [businesscityList, setBusinessCityList] = useState([]);
  const BusinessCitylist = (title) => {
    const filteredCities = [];
    var data = location.find(item => item.name == businessdata.country)
    data.states.forEach(state => {
      state.cities.forEach(city => {
        if (city.name.toLowerCase().startsWith(title.toLowerCase())) {
          filteredCities.push({ name: city.name, state: state.name });
        }
      });
    });
    setBusinessCityList(filteredCities)
  }
  const [options, setOptions] = useState([]);
  const dataList = async () => {
    const res = await FetchData("industry", 'GET', null, false, false);
    setOptions(res.data.data);
  }

  const [Step, setStep] = useState(0);
  return (
    <div>
      <Modal show={showModal}
        onHide={handleClose}
        className="modelfilter modal-xl mode"
        style={{height:'auto'}}
        size="lgauto">
        <Modal.Body className="blackback1">
          <span className="step ml-5" style={{ fontSize: 23, float: 'right', cursor: 'pointer' }} onClick={handleClose} >&times;</span>
          <div className='px-5 pt-3 mx-5 d-flex flex-column mb-3' style={{ rowGap: 15 }} >
            <span className="step" style={{ fontSize: 15 }}>Step {Step + 1}</span>
            <div className='d-flex align-items-center'>
              <div class="progress " style={{ borderRadius: 20, border: '1px solid gray', height: 15, width: '100%' }}>
                <div class="progress-bar" role="progressbar" style={{ width: Step == 0 ? '25%' : Step == 1 ? '50%' : Step == 2 ? '75%' : '100%', backgroundColor: '#4535C1' }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
              </div>
              <span className='ml-1 step' style={{ fontSize: 15 }}> {Step + 1}/4</span>
            </div>
            <span className="step" style={{ fontSize: 15 }} >Complete the 4 Steps</span>

          </div>
          {/* Personal INFormation INputs */}
          {Step == 0 ? (
            <div className='row px-5'>
              <h5 className="col-12 text-center mt-1 text-center">Please enter your personal details!</h5>
              {InputField("First Name*", "first_name", "text", userdata.first_name, handleInputChange, "Enter your first name", errors.first_name)}
              {InputField("Last Name*", "last_name", "text", userdata.last_name, handleInputChange, "Enter your last name", errors.last_name)}
              {InputField("DOB*", "date_of_birth", "date", userdata.date_of_birth, handleInputChange, "Enter your last name", errors.date_of_birth)}
              {InputField("Phone Number", "phone", "number", userdata.phone, handleInputChange, "Enter your Mobile Number")}
              {InputField("E-mail*", "email", "gmail", userdata.gmail, handleInputChange, "Enter your email", errors.email, true)}

              {InputField("Designation*", "designation", "text", userdata.designation, handleInputChange, "Enter your designation",errors.designation)}

              <div className="col-6 mb-2 mt-3 inputs-form">
                <label htmlFor="exampleInputCountry" className="form-label mr-3" style={{ fontWeight: "500" }}>
                  Country*
                </label>
                <select
                  name="country"
                  value={userdata.country}
                  onChange={handleInputChange}
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
                  onChange={(e) => {
                    const { value } = e.target;
                    setUserdata({ ...userdata, city: value });
                    Citylist(value);
                  }}
                  className={`form-control inputcontrol ${errors.city ? 'is-invalid' : ''}`}
                />
                <datalist id="citys">
                  {cityList.map(item => (
                    <option key={item.name} value={`${item.name} ${item.state}`}>{`${item.name} ${item.state}`}</option>
                  ))}
                </datalist>
                {errors.city && <div className="text-danger">{errors.city}</div>}
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
                    disabled={true}
                    value={businessdata.country}
                    onChange={handleBusinessValueChange}
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
                    disabled={true}
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
                  {options.map((option, index) => (
                    <div key={option.title} className="checkbox-item m ">
                      <input
                        type="checkbox"
                        name={`industry_${index}`}
                        value={option.title}
                        checked={selectedIndustry.find(item => item.title == option.title)}
                        onChange={handleBusinessInputChange}
                        className={errors.area_of_interest ? 'is-invalid' : ''}
                      />
                      <label className='m-2'>{option.title}</label>
                    </div>
                  ))}
                  {errors.area_of_interest && <div className="invalid-feedback">{errors.area_of_interest}</div>}

                </div>
                {errors.area_of_interest && (
                  <div className="text-danger">{errors.area_of_interest}</div>
                )}
                {InputField("Company Name", "company_name", "text", businessdata.company_name, handleBusinessValueChange, "Enter your Company", errors.company_name)}
                {InputField("Business Contact*", "phone", "number", businessdata.phone, handleBusinessValueChange, "Enter your business contact", errors.phone)}
                {InputField("Business Email*", "email", "email", businessdata.email, handleBusinessValueChange, "Enter your business contact", errors.email)}
                {InputField("Annual Income*", "annual_turnover", "number", businessdata.annual_turnover, handleBusinessValueChange, "Enter your annual income", errors.annual_turnover)}
                {InputField("Company Size*", "size", "number", businessdata.size, handleBusinessValueChange, "Enter your Company Size", errors.size)}
                {InputField("Other industry*", "other_industry", "text", businessdata.other_industry, handleBusinessValueChange, "Enter your other Industry", errors.other_industry)}
                {InputField("Type*", "type", "text", businessdata.type, handleBusinessValueChange, "Enter your other Industry", errors.type)}

              </div>
            </div>
          ) : Step == 2 ? (
          //   <div className='container-fluid' style={{ maxHeight: '65vh', overflowY: 'scroll' }}>
          //     {/* <p className='intrustion col-8 offset-2'> TO BECOME A CONNECTOR PARTNER, YOU MUST ADD 1 POTENTIAL CONTACT AS A REFERENCE AND CONTACT WILL BE VERIFIED</p> */}
          //     <div className="m-2 row">
          //       <h4 className="col-12 text-center text-success">Refer Details</h4>
          //       <div className='row w-100 justify-content-around row-gap-2'>
          //         <button className="btn btn-success col-12" onClick={handleAddCard}>+</button>
          //         {businesscontact.map((data, index) => (
          //           <div key={index} className="card col-5 p-4">
          //             <div className='d-flex justify-content-between'>
          //               <p className="text-center">Enter Contact Details</p>
          //               <span className="text-right text-danger font-weight-bold" style={{ cursor: "pointer" }}
          //                 onClick={() => handleDeleteCard(index)}
          //               >
          //               x
          //               </span>
          //             </div>
          //             <div className="row">
          //               <div className="col-6">
          //                 <label htmlFor="exampleInputtext" className="form-label" style={{ fontWeight: "500" }}>
          //                   name
          //                 </label>
          //                 <input
          //                   type="text"
          //                   name="name"
          //                   value={businesscontact[0].name[index]}
          //                   onChange={(e) => handleChange(index, e)}
          //                   placeholder="Name"
          //                   className="form-control"
          //                 />
          //               </div>
          //               <div className="col-6">
          //                 <label htmlFor="exampleInputtext" className="form-label" style={{ fontWeight: "500" }}>
          //                   email
          //                 </label>
          //                 <input
          //                   type="text"
          //                   name="email"
          //                   value={businesscontact[0].email[index]}
          //                   onChange={(e) => handleChange(index, e)}
          //                   placeholder="Email"
          //                   className="form-control"
          //                 />
          //               </div>
          //             </div>
          //             <div className="row">
          //               <div className="col-6">
          //                 <label htmlFor="exampleInputtext" className="form-label" style={{ fontWeight: "500" }}>
          //                   Website
          //                 </label>
          //                 <input
          //                   type="text"
          //                   name="website"
          //                   value={businesscontact[0].website[index]}
          //                   onChange={(e) => handleChange(index, e)}
          //                   placeholder="Website"
          //                   className="form-control"
          //                 />
          //               </div>
          //               <div className="col-6">
          //                 <label htmlFor="exampleInputtext" className="form-label" style={{ fontWeight: "500" }}>
          //                   contact
          //                 </label>
          //                 <input
          //                   type="text"
          //                   name="contact"
          //                   value={businesscontact[0].contact[index]}
          //                   onChange={(e) => handleChange(index, e)}
          //                   placeholder="Contact"
          //                   className="form-control"
          //                 />
          //               </div>
          //             </div>
          //           </div>
          //         ))}
          //       </div>
          //     </div>

          //   </div>
          // ) : (
            <div>
            <form form className="row w-100 p-3 m-0 flex-column">
              <p className='px-3'>
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                when an unknown printer took a galley of type and scrambled it to make a type specimen book.<a href='#'>visit here</a>
              </p>
          
              <div className="col-6 mb-3">
                <input
                  type="number"
                  name="transit_number"
                  value={Bankinfo.transit_number}
                  onChange={handleBankInputChange}
                  className={`form-control inputcontrol ${errors.transit_number ? 'is-invalid' : ''}`}
                  aria-describedby="textHelp"
                  placeholder='Transit Number'
                />
                {errors.transit_number && <div className="invalid-feedback">{errors.transit_number}</div>}
              </div>
          
              <div className="col-6 mb-3">
                <input
                  type="number"
                  className={`form-control inputcontrol ${errors.institution_number ? 'is-invalid' : ''}`}
                  name="institution_number"
                  value={Bankinfo.institution_number}
                  onChange={handleBankInputChange}
                  aria-describedby="textHelp"
                  placeholder='Institution Number'
                />
                {errors.institution_number && <div className="invalid-feedback">{errors.institution_number}</div>}
              </div>
              <div className="col-6 mb-3">
                <input
                  type="number"
                  className={`form-control inputcontrol ${errors.account_number ? 'is-invalid' : ''}`}
                  name="account_number"
                  value={Bankinfo.account_number}
                  onChange={handleBankInputChange}
                  aria-describedby="textHelp"
                  placeholder='Account Number'
                />
                {errors.account_number && <div className="invalid-feedback">{errors.account_number}</div>}
              </div>
              <div className="col-6 mb-3">
                <input
                  type="checkbox"
                  aria-describedby="textHelp"
                  placeholder='Account Number'
                />&nbsp;
                <span>I certify that provided bank details are correct.</span>
              </div>
            </form>
          </div>
          ):null}

          <div className="col-12 mb-2 mt-3 inputs-form d-flex justify-content-around column-gap-1 align-items-center ">
            <div onClick={() => {
              if (Step != 0) {
                setStep(Step - 1)
              }
            }}><i class="fa fa-arrow-left" aria-hidden="true" style={{ cursor: "pointer" }}></i>
            </div>
            {/* <button className='border-0 px-3 py-1 rounded' style={{ color: 'white', background: '#4535C1' }}

              onClick={handleUpdate} ><strong style={{ cursor: "pointer" }}>Update</strong></button> */}
            <div onClick={() => MoveNext()}><i class="fa fa-arrow-right" aria-hidden="true" style={{ cursor: "pointer" }}></i>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default Registration
