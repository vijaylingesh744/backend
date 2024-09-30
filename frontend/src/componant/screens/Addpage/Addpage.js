import React, { useState, useEffect, useRef } from 'react'
import Header from '../layout/SubHeader';
import "../Transaction/style/progress.css"
import { useLocation, useNavigate } from 'react-router-dom';
import FetchData from '../../fetch-api/Apifetch';
import "./style/addpage.css"
import locationData from "../../utils/location.json";
import { toast } from "react-toastify";
import { handleImagePageError, slugify } from '../../utils/Function';
import { BASE_URL } from '../../utils/ApiRoute';
import AllSkill from "../../../all_skills";
import {CheckGICTC} from "../../utils/Function"
import AdminContent from '../Pages/layout/AdminContent';
const Addpage = () => {
  const navigate = useNavigate()
  const locations = useLocation();
  const { state } = locations;
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('LOGINDATA'))?.user);
  const [skill, Setskills] = useState([]);
  const [options, setOptions] = useState([]);
  const [skillview, Setskillsview] = useState(false);
  const [profile, setProfile] = useState();
  const [profileView, setProfileView] = useState();
  const [ModalAdmin, setModalAdmin] = useState(false)
  const [cityList, setCityList] = useState([]);
  const [country, setCountry] = useState(false);
  const [filterText, setFilterText] = useState("");
  const [selectedItems,setSelectedItems] = useState([]);
  const [PageDetails, setPageDetails] = useState();
  const [TitleCheck, setTitleCheck] = useState({
    show: false,
    status: 0
  });
  const [formdata, setFormdata] = useState({
    title: "",
    user_id: user?._id,
    website: "",
    phone: "",
    description: "",
    industry: "",
    company_size: "",
    location: "",
    city:""
  });
  useEffect(() => {
    dataList();
    console.log(state);
    if (state) {
      setPageDetails(state);
      setFormdata({
        ...formdata,
        title: state?.title,
        user_id: state?.user_id,
        city: state?.city,
        website: state?.website,
        phone: state?.phone,
        description: state?.description,
        industry: state?.industry,
        company_size: state?.company_size,
        location: state?.location,
        area_of_interest: selectedItems,
      })
      setProfileView({ type: "image", url: BASE_URL + state?.profile_icon })
    }
  }, [])
  const handleFilterChange = (event) => {
    setFilterText(event.target.value);
  };

  
  const handleInputChange = async (e) => {
    const { name, value } = e.target;

    if(name == 'country'){
      setCountry(value)
    }
    if (name === "title" && !user.gmail.toLowerCase().includes("muaz")) {
      if (value.toLowerCase().includes("gict")) {
        alert("You cannot add 'Gictc' in the title as it is restricted");
        setFormdata({...formdata, [name]: "" });
        return;
      }
    }
    setFormdata({ ...formdata, [name]: value });
    if (name == 'title') {
      try {
        const res = await FetchData(`check/pagetitle?title=${value}`, 'GET', null, false, false)
        console.log(res);
        if (res.success) {
          setTitleCheck({ show: true, status: 0 })
        } else {
          setTitleCheck({ show: true, status: 1 })
        }
      }
      catch (err) {
        console.log(err);
      }
      if (value.length == 0) {
        setTitleCheck({ show: false, status: 0 })
      }
    }
  };
  const FetchApiData = async (id) => {
    const res = await FetchData("skill/" + id, "GET", null, false, false);
    Setskills(res.data.data);
  };

  const dataList = async () => {
    const res = await FetchData("industry", "GET", null, false, false);
    setOptions(res.data.data);
  };

  const handleCheckboxChange = (title, index = 0) => {
    const item = { title, index };
    if (selectedItems.some(selected => selected?.title === title)) {
      setSelectedItems(selectedItems.filter(selected => selected?.title !== title));
    } else {
      // setSelectedItems([...selectedItems, item]);
      // if (selectedItems.length < 5) {
        setSelectedItems([...selectedItems, item]);
      // } else {
        // if (!toastShown1) {
        //   toast.warning('Cannot add more than 5 items', {
        //     autoClose: 3000, 
        //     closeButton: false, 
        //     onClose: handleToastClose1, 
        //   });
        //   setToastShown1(true);
        // }
      // }
    }
    setFilterText('');
  };


  const Citylist = (title) => {
    const filteredCities = [];
    var data = locationData.find((item) => item.name == formdata.location);
    data?.states.forEach((state) => {
      state.cities.forEach((city) => {
        if (city.name.toLowerCase().startsWith(title.toLowerCase())) {
          filteredCities.push({ name: city.name, state: state.name });
        }
      });
    });
    setCityList(filteredCities);
  };


  const handleFileChange = (e) => {
    console.log("File change event:", e.target.files);
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      console.log("File reader result:", reader.result);
      setProfile(file)
      if (file.type.startsWith("image")) {
        setProfileView({ type: "image", url: reader.result });
      } else if (file.type === "application/pdf") {
        // Handle PDF file
        setProfileView({ type: "pdf", url: reader.result });
      } else {
        // Unsupported file type
        setProfileView(null);
      }
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };
  const SelectOption = (title, col = 6, name, type, value, onChange, autoFocus, inputRef,
    onKeyPress) => {
    var options = [];
    if (name == "company_size") {
      options = ["1-10", "11-50", "51-100", "101-200", "201-500", "501-1000"];
    } else if (name === "location") {
      options = locationData.map((item) => item.name);
    }
    return (
      <div
        className={`outlined-input col-lg-${col} col-md-${col} col-sm-12 my-3`}
      >
        <select name={name} value={value} onChange={onChange} ref={inputRef} style={{ height: '3rem' }}
          autoFocus={autoFocus}
          onKeyDown={onKeyPress}>
            <option value="">Select company Size</option>
          {options.map((item) => (
            <option value={item}>{item}</option>
          ))}
        </select>
        <label htmlFor="test">{title}</label>
      </div>
    );  
  };
  const inputField = (
    title,
    col = 6,
    name,
    type,
    value,
    onChange,
    caplatize,
    autoFocus,
    inputRef,
    onKeyPress
  ) => {

    return (
      <div
        className={`outlined-input col-lg-${col} col-md-${col} col-sm-12 my-2`}
      >
        <input
          className="w-100"
          type={type}
          name={name}
          value={value}
          onChange={(e) => {
            const inputValue = e.target.value;
            var capitalizedValue = inputValue
              .toLowerCase()
              .split(" ")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ");
            if (!caplatize) {
              if (name == "phone") {
                capitalizedValue = e.target.value
                  .replace(/\D/, "")
                  .slice(0, 12);
              } else {
                capitalizedValue = inputValue;
              }
            }
            onChange({
              target: { name: e.target.name, value: capitalizedValue },
            });
          }}
          placeholder=" "
          disabled={name == "gmail" ? true : false}
          style={{ color: name === "gmail" ? "#605d5d" : "initial", height: "3rem" }}

          ref={inputRef}
          autoFocus={autoFocus}
          onKeyDown={onKeyPress}
        />
        <label>{`${title}`}</label>
        {title === "Company Name *" && TitleCheck.show && <span className='fonthint pl-3' style={{ color: TitleCheck.status == 1 ? 'red' : 'green' }}
        >{TitleCheck.status == 1 ? `Name already taken` : `Name is available`}</span>}
      </div>
    );
  };

  const handlePageCreate = async () => {

    const keysWithEmptyValues = Object.keys(formdata).filter(
      (key) => !formdata[key]
    );

    if (keysWithEmptyValues.length > 0) {
      const missingKeys = keysWithEmptyValues.join(", ");
      toast.error(
        `Please provide values for the following fields: ${missingKeys.replaceAll(
          /_/gi,
          " "
        )}`
      );
      return;
    }
    const form = new FormData()
    form.append('data', JSON.stringify(formdata))
    form.append('profile_icon', profile)
    try {
      const res = await FetchData('add/page', "POST", form, false, true);
      if (res.success) {
        toast.success("Page Created Successfully")
        navigate(`/pages/${slugify(res.data.title)}`)
      }
    } catch (err) {
      console.log(err);
    }
  }

  const handleUpdateCreate = async () => {
    const form = new FormData()
    form.append('data', JSON.stringify(formdata))
    form.append('profile_icon', profile)
    try {
      const res = await FetchData('update_page/' + state?._id, "POST", form, false, true);
      if (res.success) {
        toast.success("Page Updated Successfully")
        navigate(`/pages/${slugify(res.data.title)}`)
      }
    } catch (err) {
      console.log(err);
    }
  }

  const AdminToggle = () => {
    setModalAdmin(!ModalAdmin)
}

const PropsPage = { PageDetails, ModalAdmin, AdminToggle }


  return (
    <div>
      <Header />

      <div className='p-2 row ' style={{ backgroundColor: "#ffff", height: 'fit-content', marginTop: '2px' }} >
        <div className='float-left ml-4' >
          <p className='text-center ml-2 ' style={{ color: "#666666", fontWeight: '400' }}>Create your own page and connect more...!  </p>
        </div>
      </div>

      <div className="px-3 py-2 ">
        <div className='m-1 p-2 row d-flex justify-content-center' >
          <div className='col-lg-5 col-12 h-100 px-sm-0'>
            <div className='d-flex card px-sm-0' style={{ width: '100% !important' }}>
              <div className='d-flex flex-column col-12 mt-4 mb-4 row-gap-1'>
                {inputField(
                  "Company Name *",
                  12,
                  "title",
                  "text",
                  formdata.title,
                  handleInputChange,
                  false,
                  true,
                )}


                {inputField(
                  "Website*",
                  12,
                  "website",
                  "text",
                  formdata.website,
                  handleInputChange,
                  false,
                  false,
                )}
                {inputField(
                  "Phone",
                  12,
                  "phone",
                  "text",
                  formdata.phone,
                  handleInputChange,
                  false,
                  true,
                )}

                {/* {inputField(
                        "Description",
                        12,
                        "description",
                        "text",
                        formdata.overview,
                        handleInputChange,
                        false,
                        true,
                      )} */}
                <div className={`outlined-input col-lg-12 col-md-12 col-sm-12 my-2`}>
                  <textarea className="w-100"
                    type='text'
                    name="description"
                    value={formdata.description}
                    placeholder=" "
                    style={{ height: "5rem", padding: "16px 7px" }}
                    // autoFocus={autoFocus}
                    onChange={handleInputChange}
                  // onKeyDown={onKeyPress}
                  />            <label>Description</label>

                </div>


                {SelectOption(
                  "Company Size",
                  12,
                  "company_size",
                  "text",
                  formdata.company_size,
                  handleInputChange,
                  false,
                )}
                <div className="col-lg-12 col-sm-12  my-3 inputs-form outlined-input">
                  <select
                    name="location"
                    className={`form-control inputcontrol w-100`}
                    id="exampleInputCountry"
                    value={formdata.location}
                    placeholder=" "
                    onChange={handleInputChange}
                    style={{ height: "3rem", border: "1px solid grey" }}
                    aria-describedby="countryHelp"
                    autoFocus={false}
                  >
                    <option value="">Select location</option>
                    {locationData.map((item) => (
                      <option value={item.name}>{item.name}</option>
                    ))}
                  </select>
                  <label htmlFor="test">Location *</label>
                </div>

                <div
                        className={`inputs-form outlined-input col-lg-12 col-md-6 col-sm-12 my-3`}
                      >
                        <input
                          list="citys"
                          name="city"
                          id="browser"
                          placeholder=" "
                          className="w-100"
                          value={formdata.city}
                          onChange={(e) => {
                            const { name, value } = e.target;
                            Citylist(value);
                            setFormdata({ ...formdata, ["city"]: value });
                          }}
                          // ref={cityRef}
                          // autoFocus={false}
                          // onKeyDown={handlekeyEnter(6)}
                        />
                        <label htmlFor="test">Select City *</label>
                        <datalist id="citys">
                          {cityList.map((item) => (
                            <option value={item.name + " " + item.state}>
                              {item.name + " " + item.state}
                            </option>
                          ))}
                        </datalist>
                      </div>

                <div className="col-lg-12  my-3 inputs-form outlined-input">
                  <input type="file" name="profile_icon" id="file" class="inputfile " style={{ border: '1px solid grey' }} onChange={(e) => handleFileChange(e)} />
                  <label for="file">Profile Icon</label>
                </div>



                <div className="col-lg-12  my-3 inputs-form outlined-input">
                  <select
                    className={`form-control inputcontrol w-100`}
                    id="exampleInputCountry"
                    placeholder=""
                    value={formdata?.industry}
                    onChange={(e) => {
                      FetchApiData(e.target.value);
                      Setskillsview(true);
                      setFormdata({ ...formdata, ["industry"]: e.target.value })
                    }}
                    style={{ height: "3rem", border: "0.1px solid grey" }}
                    aria-describedby="countryHelp"
                  >
                    <option value="" style={{ color: 'hsla(240,7%,62%,1) !important' }}>Industry Type</option>
                    {options &&
                      options.map((item) => (
                        <option style={{ color: 'hsla(240, 7%, 62%, 1)' }} value={item._id}>{item.title}</option>
                      ))}
                  </select>
                  <label htmlFor="test">Industry Type</label>
                </div>


                <div className="px-3">
                    <div className="pb-1 fontsubtitle"> Let us know your interests:</div>
                    <ul
                      className="d-flex flex-row flex-wrap justify-content-start"
                      style={{ columnGap: 15, rowGap: 10 }}
                    >
                      {selectedItems.map((item, index) => (
                        <div style={{ background: '#4535C1', color: '#fff', borderRadius: 25 }} className="d-flex card flex-row align-items-center">
                          <li
                            key={index}
                            className=" pl-2"
                            style={{ cursor: "pointer", fontSize: "13px" }}
                            onClick={() => handleCheckboxChange(item.title)}
                          >{item.title} </li>
                          <span
                            className="p-2"
                            style={{ color: "#fff", cursor: "pointer" }}
                            onClick={() => handleCheckboxChange(item.title)}
                          ><strong>&times;</strong></span>
                        </div>
                      ))}
                    </ul>
                  </div>
                <div className="w-100 pt-3 pb-2">
                  <div className={`outlined-input col-lg-12 col-md-12 col-sm-12 my-0`}>
                    <input
                      type="text"
                      value={filterText}
                      onChange={handleFilterChange}
                      className="w-100"
                      placeholder=""
                      onClick={() => {
                        if (formdata?.industry_id) {
                          Setskillsview(true)
                        }
                      }
                      }
                    />
                    <label for="test">Area of interests</label>
                  </div>
                  <div
                    className={`options mt-3`}
                    style={{
                      maxHeight: "100px",
                      overflowY: "scroll",
                      display: "flex",
                      flexWrap: "wrap"
                    }}
                  >

                  {skillview && (AllSkill.map((option, index) => ({ title: option, index })) // Map to objects containing title and index
                      .filter(({ title }) => !selectedItems.some(selected => selected.title === title)) // Exclude selected items
                      .filter(({ title }) => {
                        if (filterText && filterText.length === 2) {
                          const sanitizedFilterText = filterText.replace(/\s/g, ""); // Remove spaces from filterText
                          return title
                            .toLowerCase()
                            .includes(sanitizedFilterText.toLowerCase());
                        }
                        if (filterText && filterText.length > 2) {
                          return title
                            .toLowerCase()
                            .includes(filterText.toLowerCase());
                        }
                        return true;
                      })
                      .slice(0, 100)
                      .map(({ title, index }) => (
                        <div
                          key={index}
                          className="option mx-1 px-1 py-1 my-1"
                          style={{
                            cursor: "pointer",
                            fontSize: "12px",
                            width: "fit-content"
                          }}
                          onClick={() => handleCheckboxChange(title, index)}
                        >
                          <label
                            className='d-flex fontcontent2 justify-content-around p-2'
                            style={{ borderRadius: "20px", backgroundColor: "#e9ecef", width: "fit-content" }}>
                            {title}
                          </label>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className='d-flex justify-content-end mt-3'>
              {!state ? (
                <button className='btn btn-connect fontsubtitle font-weight-bold' onClick={() => handlePageCreate()}>Create page</button>
              ) : (
                <button className='btn btn-connect fontsubtitle font-weight-bold' onClick={() => handleUpdateCreate()}>Update page</button>
              )}
            </div>
          </div>
          <div className='d-lg-flex col-lg-5 col-12 d-none d-md-block d-lg-block' >
            <div className='card w-100 bg-light justify-content-start align-items-center' style={{ borderRadius: 14, height: '65%', position: 'sticky', top: 30 }}>
              <div className='container-fluid bg-white w-100 d-flex align-items-center justify-content-between' style={{ height: 60, borderBottom: '1px solid lightgrey', borderRadius: '15px 15px 0px 0px' }}>
                <span className='fontsubtitle font-weight-bold'>Page Preview</span>
                <div className='d-flex justify-content-end p-3' role='button'
                    onClick={() => AdminToggle()}>
                    {state && state.user_id == user._id && (
                    <i class="fa fa-address-card-o" aria-hidden="true" style={{width:"15px",height:"15px"}}/>
                 )}
                </div>
              </div>

              <div className="card bg-white border h-50 mt-4 " style={{ width: '85%', borderRadius: 14 }}>
                <div className='pl-4 pt-3 d-flex flex-column'>
                  <img src={profileView ? profileView?.url : '/images/profile/dummypageimage.png'} className='mb-4 rounded-circle' style={{ objectFit: 'contain' }} width={120} height={120} onError={handleImagePageError} />
                  <span className='fontsubtitle font-weight-bold mb-2 pl-2'>{formdata.title ? formdata.title : 'Page Name'}</span>
                  <span className='fontcontent1 font-weight-normal pl-2'>{formdata.description ? formdata.description.substring(0, 100) : 'Page Description'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AdminContent PropsPage={PropsPage}/>
    </div>
  )
}

export default Addpage