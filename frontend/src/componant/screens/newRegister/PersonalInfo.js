import React, { useEffect, useState, useRef } from "react";
import Invester from "./Assets/investor.png";
import Buyer from "./Assets/buyer.png";
import Upload from "./Assets/upload1.png";
import Close from "./Assets/close.png";
import Customer from "./Assets/customer.png";
import { toast } from "react-toastify";
import "./Style/configure.css";
import FetchData from "../../fetch-api/Apifetch";
import { useNavigate } from "react-router-dom";
import location from "../../utils/location.json";
import flagData from "../../utils/Country.json";
import { Fade } from "react-awesome-reveal";
import { BASE_URL } from "../../utils/ApiRoute";
import Rightcolumn from "./layout/RightColumn";
import { set } from "date-fns";
import { SkipButton } from "../../utils/Function";
import imageCompression from 'browser-image-compression'; // Import image compression library
import { Modal } from "react-bootstrap";
import { SingleImageCropper } from "../FeedPage/PostData/ImageModel";


const PersonalInfo = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [toastShown, setToastShown] = useState(false);

  const [passwordmatch, setpasswordmatch] = useState(false);
  const [Alphanumaric, setAlphanumaric] = useState(false);
  const [Location, setLocation] = useState({ latitude: null, longitude: null });
  const [country, setCountry] = useState(false);
  const [buttonclick, setbuttonclick] = useState(false);
  const [profile, setProfile] = useState("");
  const [personalinfoprofile, setpersonalinfoprofile] = useState({ url: "/images/profile/add-user.png" });
  const [licenceformdata, setLicenceFormdata] = useState({
    PanCard: "",
    AddressProof: "",
    NationalID: "",
    BusinessRegister: "",
    GstCertificate: "",
    BankPassbook: "",
    ExportCopy: "",
  });
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(flagData[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef(null);
  const User = JSON.parse(localStorage.getItem("VERIFYDATA"));
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const [formdata, setFormdata] = useState({
    first_name: "",
    last_name: "",
    date_of_birth: "",
    designation: "",
    gender: "",
    gmail: User?.gmail,
    country: "",
    city: "",
    phone: "",
    password: "",
    confirm_password: "",
    user_type: "",
    login_type: "1",
    company: "",
    about: ""
  });
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const selectRef = useRef(null);
  const phoneRef = useRef(null);
  const cityRef = useRef(null);
  const passwordRef = useRef(null);
  const cpRef = useRef(null);
  const designRef = useRef(null);
  const aboutRef = useRef(null);
  const companyRef = useRef(null);
  const refs = [firstNameRef, lastNameRef, designRef, aboutRef, companyRef, selectRef, cityRef, phoneRef, passwordRef, cpRef,];
  // const [error, setError] = useState(null);

  useEffect(() => {
    getLocation();
    setPersonalInfoData();
  }, []);


  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (country) => {
    setSelectedCountry(country);
    console.log(country);
    setIsOpen(false);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };
  useEffect(() => {
    if (searchTerm.length > 0) {
      const timer = setTimeout(() => setSearchTerm(""), 5000);
      return () => clearTimeout(timer);
    }
  }, [searchTerm]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const handleKeyPress = (e) => {
    if (!isOpen) return;

    if (e.key === "ArrowDown") {
      setSearchTerm("");
    } else {
      setSearchTerm((prev) => prev + e.key);
    }
  };

  const filteredCountries = flagData
    .filter((country) => country.dial_code.startsWith(searchTerm))
    .concat(
      flagData.filter(
        (country) =>
          !country.dial_code.startsWith(searchTerm) &&
          country.dial_code.includes(searchTerm)
      )
    );


  const setPersonalInfoData = async () => {
    const userdata = JSON.parse(localStorage.getItem("VERIFYDATA"));
    console.log(userdata);
    console.log(userdata._id);
    const res = await FetchData(
      "detail/user/" + userdata?._id,
      "GET",
      null,
      true,
      false
    );
    if (res.success) {
      console.log(res.data);
      if (res.data.user) {
        var data = res?.data?.user;
        if (data.first_name) {
          setStep(1);
          setIsUserSet(true);
          setuserType(data?.user_type);
        }
        setFormdata({
          first_name: data.first_name,
          last_name: data.last_name,
          country: data.country,
          gmail: data.gmail,
          city: data.city,
          phone: data.phone,
          password: "",
          confirm_password: "",
        });
      }
    }
  };

  const findNearestCountry = (lat, lng, countries) => {
    let nearestCountry = null;
    let shortestDistance = Infinity;

    countries.forEach((country) => {
      var distance = ""
      country.states.forEach((statItem) => {
        distance = haversineDistance(
          lat,
          lng,
          statItem.latitude,
          statItem.longitude
        );
        if (distance < shortestDistance) {
          shortestDistance = distance;
          nearestCountry = country;
        }
      })
    });

    return nearestCountry;
  };
  const getCountryName = (lat, lon) => {
    const nearestCountry = findNearestCountry(lat, lon, location);
    setCountry(nearestCountry);
    setFormdata({ ...formdata, ["country"]: nearestCountry.name })
    setSelectedCountry(flagData.find(item => item.name == nearestCountry.name));
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
          getCountryName(latitude, longitude);
        },
        (err) => {
        }
      );
    } else {
    }
  };

  const haversineDistance = (lat1, lon1, lat2, lon2) => {
    const toRad = (angle) => angle * (Math.PI / 180);

    const R = 6371; // Radius of the Earth in kilometers
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // Distance in kilometers
  };



  const handlekeyEnter = (index) => (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const nextRef = refs[index + 1];
      if (nextRef) {
        nextRef.current.focus();
      } else {
        Register();
      }
    }
  };

  const addProfilePic = async () => {


    const formData = new FormData()
      ;
    formData.append('Profile', profile);
    formData.append('user_id', User?._id);

    const res = await FetchData("user/profile?bgicon=false", "POST", formData, true, true)

    console.log(res);

  }

  const handleToastClose = () => {
    setToastShown(false);
  };
  //
  const Register = async () => {

    setbuttonclick(true);
    try {
      if (
        formdata.password.length < 8 ||
        formdata.password !== formdata.confirm_password
      ) {
        if (!toastShown || Alphanumaric) {
          toast.error('Your password must include uppercase and lowercase letters, a number, a special character, and be at least 8 characters long', {
            autoClose: 3000,
            closeButton: false,
            onClose: handleToastClose,
          });
          setToastShown(true);
        }

        setbuttonclick(false);
        return;

      }


      var updatedUserData = {
        email: formdata.gmail,
        user_id: User?._id,
        first_name: formdata.first_name,
        last_name: formdata.last_name,
        password: formdata.password,
        country: formdata.country,
        city: formdata.city,
        phone: formdata.phone,
        about: formdata.about,
        designation: formdata.designation
      };

      const keysWithEmptyValues = Object.keys(updatedUserData).filter(
        (key) => !updatedUserData[key]
      );

      if (keysWithEmptyValues.length > 0) {
        const missingKeys = keysWithEmptyValues.join(", ");
        toast.error(
          `Please provide values for the following fields: ${missingKeys.replaceAll(
            /_/gi,
            " "
          )}`
        );
        setbuttonclick(false);
        return;
      }

      updatedUserData = {
        email: formdata.gmail,
        user_id: User?._id,
        first_name: formdata.first_name,
        last_name: formdata.last_name,
        password: formdata.password,
        designation: formdata.designation,
        date_of_birth: formdata.date_of_birth,
        country: formdata.country,
        city: formdata.city,
        phone: formdata.phone,
        registerType: "USER",
        company: formdata.company,
        about: formdata.about
      };

      updatedUserData.user_type = userType;
      const response = await FetchData(
        `update/user/${User._id}`,
        "POST",
        JSON.stringify(updatedUserData),
        false,
        false
      );
      if (response.success) {
        // const idproof = await addIdProof();
        console.log(response);
        localStorage.setItem("VERIFYDATA", JSON.stringify(response.data));
        if (profile) {
          addProfilePic()
        }
        toast.success("Details Updated Successfully!");
        // if(userType == 1){
        //   SkipButton()
        // }else{
          navigate("/suggestpage/1",{ 
            state:{
              type: userType,
            country: formdata.country,
            city: formdata.city,
           }
      })
        // navigate("/business-info", { state: userType });
        // }
        setbuttonclick(false)
      } else {
        toast.error("Please Check Credentials!");
        setbuttonclick(false)
      }
    } catch (error) {
      toast.error(error.message);
      setbuttonclick(false)
    }
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
      <div style={{ borderLeft: name === 'phone' ? 'none' : undefined, width: name === 'phone' ? '80%' : undefined }}
        className={`outlined-input col-lg-${col} col-md-${col} col-${name == 'phone' ? '10' : ''} my-2 ${name == 'phone' ? 'px-0' : ''}`}
      >
        <input
          className={`w-100 ${name == 'phone' ? 'rounded-right' : 'rounded-01'}`}
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
          style={{ color: name === "gmail" ? "#605d5d" : "initial",border:'1px solid grey' }}

          ref={inputRef}
          autoFocus={autoFocus}
          onKeyDown={onKeyPress}
        />
        <label>{`${title}`}</label>
      </div>
    );
  };
  const PasswordField = (
    title,
    col = 6,
    name,
    type,
    value,
    onChange,
    desble = false,
    autoFocus,
    inputRef,
    onKeyPress
  ) => {
    return (
      <div className={`outlined-input col-lg-${col} col-md-${col} col-sm-12 my-2`}>
        <input
          className="w-100 rounded-01"
          type={showPassword ? "text" : "password"}
          name={name}
          value={value}
          onChange={onChange}
          placeholder=" "
          ref={inputRef}
          autoFocus={autoFocus}
          onKeyDown={onKeyPress}
          style={{border: "1px solid grey"}}
        />
        <label>{`${title} * `}</label>
        {name == 'password' && formdata.password != "" && Alphanumaric && (
          <span className="text-danger small w-85 position-absolute fonttext" style={{left:'6%',top:'90%'}}>
            Your password must include uppercase and lowercase letters, a number, a special character, and be at least 8 characters long.
          </span>
        )}
        {name == 'confirm_password' && passwordmatch && (
          <span className="text-danger mx-4 small"
            style={{ width: "100%", marginBottom: ".2rem" }}>
            Password does not match{" "}
          </span>
        )}
      </div>
    );
  };
  const SelectOption = (title, col = 6, name, type, value, onChange) => {
    var options = [];
    if (name == "gender") {
      options = ["Male", "Female", "Others"];
    }

    return (
      <div
        className={`outlined-input col-lg-${col} col-md-${col} col-sm-12 my-2`}
      >
        <select
          name="test"
          // value={valuedata}
          onChange={(e) => {
            const newValue = e.target.value.slice(0, 6); // Limit to 6 characters
            // setValue(newValue);
          }}
        >
          {options.map((item) => (
            <option value={item}>{item}</option>
          ))}
        </select>
        <label htmlFor="test">{title}</label>
      </div>
    );
  };

  const HandleShower = (type) => {
    return userType == type ? (
      <div className="text-center" style={{ fontSize: "var(--smallhint)" }}>
        {type == 0
          ? "Find what you love, buy what you need."
          : type == 1
            ? "Together, we build better business."
            : "Your products, our platform, endless opportunities."}
      </div>
    ) : null;
  };
  const [type, setType] = useState();
  const [cityList, setCityList] = useState([]);
  const [userType, setuserType] = useState(-1);
  const [errors, setErrors] = useState({});


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(value);
    let error = "";

    if (name == "country") {
      setSelectedCountry(flagData.find(item => item.name == value));
    }
    if (name === "gmail") {
      if (!value.includes("@")) {
        error = "Email must contain @ symbol";
      } else if (!/^\S+@\S+\.\S+$/.test(value)) {
        error = "Invalid email format";
      }
    } else if (name === "password") {
      // Check if the password meets the criteria: at least one number, one letter, and one special character
      if (value.length < 8 || !/(?=.*\d)(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9])/.test(value)) {
        setAlphanumaric(true);
      } else {
        setAlphanumaric(false);
      }
    } else if (name === "confirm_password") {
      if (formdata.password !== value) {
        setpasswordmatch(true);
      } else if (formdata.password == value) {
        setpasswordmatch(false);
      }
    }
    setErrors({ ...errors, [name]: error });
    setFormdata({ ...formdata, [name]: value });
  };

  // useEffect(()=>{
  //     setStep(1)
  // },[userType])

  const Citylist = (title) => {
    const filteredCities = [];
    var data = location.find((item) => item.name == formdata.country);
    data?.states.forEach((state) => {
      state.cities.forEach((city) => {
        if (city.name.toLowerCase().startsWith(title.toLowerCase())) {
          filteredCities.push({ name: city.name, state: state.name });
        }
      });
    });
    setCityList(filteredCities);
  };
  const [isUserSet, setIsUserSet] = useState(false);

  const setUser = (type) => {
    localStorage.removeItem("type");
    localStorage.setItem("type", type);
    setuserType(type);
    setType(type);
    setIsUserSet(true);
    console.log(userType);
  };

  const handleFileChange = (e) => {
    console.log("File change event:", e.target.files);
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const [isModalOpen, setIsModal] = useState(false);

  const openModal = () => {
    setIsModal(true);
    imagecropmodal();
  };

  const handleFileChange2 = async (e) => {
    console.log("File change event:", e.target.files);
    const file = e.target.files[0];
    if (file) {
      const compressedFile = await compressImage(file);
      setProfile(compressedFile)
      const reader = new FileReader();
      reader.onloadend = () => {
        setpersonalinfoprofile(reader.result);
        openModal()
      };
      reader.readAsDataURL(file);
    }
  };
  const MAX_FILE_SIZE_KB = 400;
  const compressImage = async (file) => {
    const options = {
      maxSizeMB: MAX_FILE_SIZE_KB / 1024, // Convert maximum file size to megabytes
      useWebWorker: true, // Use web worker for better performance
    };

    try {
      const compressedFile = await imageCompression(file, options);
      console.log('Original file size:', file.size / 1024, 'KB');
      console.log('Compressed file size:', compressedFile.size / 1024, 'KB');
      return compressedFile;
    } catch (error) {
      console.error('Error compressing image:', error);
      throw error;
    }
  }
  const modalclose = () => {
    setIsModal(false);
  }
  const modalcloseremove = () => {
    setIsModal(false);
    // if(setpersonalinfoprofile.url == '/images/profile/add-user.png'){
    setpersonalinfoprofile({ url: "/images/profile/add-user.png" })
    setProfile('')
    // }
  }

  const imagecropmodal = () => {
    let views, setvalue, setview;

    views = personalinfoprofile;
    setvalue = setProfile;
    setview = setpersonalinfoprofile;



    return (
      <div>
        <Modal show={isModalOpen} className="modelfilter" size='mdd'  >
          <Modal.Header className='p-0'>
            <div className='w-100 px-3 d-flex align-items-center justify-content-between' style={{ height: '70px', background: '#7C00FE' }}>
              <span className="fontmdtitle text-white">Crop Image</span>
            </div>
          </Modal.Header>
          <Modal.Body >
            <SingleImageCropper
              imageUrl={views}
              onClose={modalcloseremove}
              setCroppedImage={setvalue}
              setViewImage={setview}
              onSet={modalclose}
            />
          </Modal.Body>
        </Modal>
      </div>
    );
  };

  const navtologin = () => {
    localStorage.removeItem('VERIFYDATA')
    window.location.href = '/login'
  }

  return (
    <div
      className="container-fluid card"
      style={{ backgroundColor: "#e9ecef", height: "auto", minHeight: "100vh" }}
    >
      <Fade direction="right">
        <div
          className="row mx-lg-5 marginall"

        >
          <div className="col-lg-6 col-sm-12 d-flex align-items-center">
            <div
              className="w-100 m-lg-2 h-100 scrollerhide"
              style={{ overflowY: "scroll", overflowX: "hidden" }}
            >
              {/* <div className="d-flex justify-content-start p-4">
                                <img src="images/icons/logo.png" alt="" style={{ width: "120px", height: "75px" }} />
                            </div> */}
              <div className="p-lg-4 mt-5 mt-lg-0 px-3 px-lg-0" style={{ height: "500px" }}>
                {/* {step == 0 ? ( */}
                <a
                  className="fontcontent1"
                  style={{ color: "black", cursor: "pointer" }}
                  onClick={() => {
                    navtologin()
                  }}
                >
                  <i class="fa fa-chevron-left" aria-hidden="true" style={{ marginRight: "10px" }}></i> Back
                  to Login
                </a>
                {/* // ) : (
                //   <a
                //     className="fontcontent1"
                //     style={{ color: "black", cursor: "pointer" }}
                //     onClick={() => {
                //       setStep(0);
                //     }}
                //   >
                //     <i class="fa fa-chevron-left" aria-hidden="true" style={{marginRight:"10px"}}></i> Back
                //     to Login
                //   </a>
                // )} */}
                <h4 className="fontsubtitle"
                  style={{ marginTop: "20px", fontSize: "var(--title)" }}>
                  Welcome to Connect Souq.
                </h4>
                <p style={{ color: "gray" }} className="fontcontent2">
                Please  provide the valid informations o become an effective Connect Souq Member,
                which will help you to generate more leads.{" "}
                </p>
                <div className="row justify-content-center">
                  {step == 0 ? (
                    <div class="col-12 w-100">
                      <p
                        className="font-weight-bold fontsubtitle text-center text-dark"
                        style={{ marginBottom: "0px" }}
                      >
                        Are you a{" "}
                      </p>
                      <div className="d-flex justify-content-between flex-column">
                        <div className="d-flex justify-content-around mt-4">
                          <div
                            className={` px-3 py-2 align-items-center cardsize ${userType == 0 ? "active" : ""
                              }`}
                            onClick={() => setUser(0)}
                            style={{
                              backgroundColor:
                                userType == 0 ? "#4535C1" : "#f5f5f5",
                            }}

                          >
                            <div className="rounded-circle p-1"
                              style={{
                                backgroundColor: userType == 0 ? "#fff" : "",
                              }} >
                              <img src={Buyer} className="m-1" style={{ width: "30px" }}
                              />
                            </div>
                            <label
                              className="text-center fontsubtitle mx-3 px-3 py-1"
                              style={{
                                color: userType == 0 ? "#fff" : "#c0c0c0",
                                fontWeight: "600",
                                marginBottom: "0px",
                              }}
                            >
                              Buyer
                            </label>
                          </div>
                        </div>
                        <div
                          class=" w-75 p-0 d-flex justify-content-center"
                          style={{
                            margin: "10px auto",
                            border: "none",
                            color: "#4535C1",
                            fontWeight: "600",
                          }}
                          role="alert"
                        >
                          {HandleShower(0)}
                        </div>
                        <div className="d-flex justify-content-center">
                          <div
                            className={` px-3 py-2 align-items-center cardsize ${userType == 1 ? "active" : ""
                              }`}
                            onClick={() => setUser(1)}
                            style={{
                              backgroundColor:
                                userType == 1 ? "#4535C1" : "#f5f5f5",
                            }}

                          >
                            <div
                              className="rounded-circle p-1"
                              style={{
                                backgroundColor: userType == 1 ? "#fff" : "",
                              }}
                            >
                              <img
                                src={Customer}
                                className="m-1"
                                style={{ width: "30px" }}
                              />
                            </div>
                            <label
                              className="text-center fontsubtitle mx-1 px-1 "
                              style={{
                                color: userType == 1 ? "#fff" : "#c0c0c0",
                                fontWeight: "600",
                                marginBottom: "0px",
                              }}
                            >
                              Business Partner (Broker)
                            </label>
                          </div>
                        </div>
                        <div
                          class=" w-75 p-0 d-flex justify-content-center"
                          style={{
                            margin: "10px auto",
                            border: "none",
                            color: "#4535C1",
                            fontWeight: "600",
                          }}
                          role="alert"
                        >
                          {HandleShower(1)}
                        </div>
                        <div className="d-flex justify-content-center ">
                          <div
                            className={` px-3 py-2 align-items-center cardsize ${userType == 2 ? "active" : ""
                              }`}
                            onClick={() => setUser(2)}
                            style={{
                              backgroundColor:
                                userType == 2 ? "#4535C1" : "#f5f5f5",
                            }}

                          >
                            <div
                              className="rounded-circle p-1"
                              style={{
                                backgroundColor: userType == 2 ? "#fff" : "",
                              }}
                            >
                              <img
                                src={Invester}
                                className="m-1"
                                style={{ width: "30px" }}
                              />
                            </div>
                            <label
                              className="text-center fontsubtitle mx-3 px-3 "
                              style={{
                                color: userType == 2 ? "#fff" : "#c0c0c0",
                                fontWeight: "600",
                                marginBottom: "0px",
                              }}
                            >
                              Seller
                            </label>
                          </div>
                        </div>

                        <div
                          class=" w-75 p-0 d-flex justify-content-center"
                          style={{
                            margin: "10px auto",
                            border: "none",
                            color: "#4535C1",
                            fontWeight: "600",
                          }}
                        >
                          {HandleShower(2)}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="row">
                      <div className="w-100 d-flex justify-content-center">
                        <label className="" htmlFor="file-upload-profile">
                          <img
                            src={personalinfoprofile.url}
                            alt="upload"
                            style={{
                              width: "75px",
                              height: "75px",
                              borderRadius: "50%",
                            }}
                          />
                        </label>
                        <input
                          type="file"
                          onChange={handleFileChange2}
                          id="file-upload-profile"
                          name="test"
                          accept=".jpg, .png, .pdf"
                          className="d-none"
                        />
                      </div>
                      {inputField(
                        "First Name *",
                        6,
                        "first_name",
                        "text",
                        formdata.first_name,
                        handleInputChange,
                        false,
                        true,
                        firstNameRef,
                        handlekeyEnter(0)
                      )}
                      {inputField(
                        "Last Name *",
                        6,
                        "last_name",
                        "text",
                        formdata.last_name,
                        handleInputChange,
                        false,
                        false,
                        lastNameRef,
                        handlekeyEnter(1)
                      )}
                      {inputField(
                        "Email",
                        6,
                        "gmail",
                        "text",
                        formdata.gmail,
                        handleInputChange,
                        false
                      )}

                      <div
                        className="custom-dropdown align-items-center  row col-lg-6 col-md-6 col-sm-12  ml-0 "
                        ref={dropdownRef}
                        tabIndex="0"
                        onKeyDown={handleKeyPress}
                        style={{ outline: "none" }}
                      >
                        {/* <div
                          className="dropdown-header1 pr-2 col-lg-12 col-md-12 col-sm-12"
                          onClick={handleToggle}
                          style={{ outline: "none"}}
                        > */}
                        <div className="col-lg-3 py-1 fontcontent1 rounded-left d-flex justify-content-center align-items-center" onClick={handleToggle} style={{ width: '20%', border: '1px solid grey', borderRight: 'none', height: '2.5rem' }}>{selectedCountry?.dial_code}</div>
                        {/* <span className="dropdown-arrow">&#9660;</span> */}
                        {inputField(
                          "Phone",
                          9,
                          "phone",
                          "number",
                          formdata.phone,
                          handleInputChange,
                          false,
                          false,
                          phoneRef,
                          handlekeyEnter(5)
                        )}
                        {/* </div> */}
                        {isOpen && (
                          <div className="dropdown-list">
                            {filteredCountries.map((country, index) => (
                              <div
                                key={index}
                                className="dropdown-item"
                                onClick={() => handleSelect(country)}
                                style={{}}
                              >
                                <img
                                  src={country.image}
                                  alt={`${country.country} flag`}
                                  style={{ width: "30px", height: "30px" }}
                                />
                                {country.dial_code}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                      <div
                        className={`outlined-input col-lg-6 col-md-6 col-sm-12 my-2`}
                      >
                        <select
                          name="country"
                          className={`form-control inputcontrol w-100 rounded-01`}
                          id="exampleInputCountry"
                          value={formdata.country}
                          placeholder=" "
                          onChange={handleInputChange}
                          style={{
                            height: "2.5rem",
                            border: "1px solid grey",
                          }}
                          aria-describedby="countryHelp"
                          ref={selectRef}
                          autoFocus={false}
                          onKeyDown={handlekeyEnter(6)}

                        >
                          <option value="">Country List</option>
                          {location.map((item) => (
                            <option value={item.name}>{item.name}</option>
                          ))}
                        </select>
                        <label htmlFor="test ">Select Country *</label>
                      </div>
                      <div
                        className={`outlined-input col-lg-6 col-md-6 col-sm-12 my-2`}
                      >
                        <input
                          list="citys"
                          name="city"
                          id="browser"
                          placeholder=" "
                          className="w-100 rounded-01"
                          disabled={formdata.country || country ? false : true}
                          onChange={(e) => {
                            const { name, value } = e.target;
                            Citylist(value);
                            setFormdata({ ...formdata, [name]: value });
                          }}
                          style={{border: "1px solid grey"}}
                          ref={cityRef}
                          autoFocus={false}
                          onKeyDown={handlekeyEnter(7)}
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
                      {inputField(
                        "Designation",
                        12,
                        "designation",
                        "text",
                        formdata.designation,
                        handleInputChange,
                        false,
                        false,
                        phoneRef,
                        handlekeyEnter(8)
                      )}
                      <div className='outlined-input col-12'>
                        <textarea
                          id={"about"}
                          name={"about"}
                          value={formdata.about}
                          onChange={handleInputChange}
                          placeholder={"Write about yourself in 50 words"}
                          rows={4}
                          style={{ paddingLeft: '20px', height: '75px', border: "1px solid grey" }}
                          className='pt-2 w-100 mt-3 mb-2 rounded-01 '
                        />
                        <label htmlFor={`exampleInputabout`} className="form-label mr-3 fontcontent1" style={{ fontWeight: "500", color: 'grey', top: '13%', left: '6%' }}>About</label>
                      </div>
                      {PasswordField(
                        "Password",
                        6,
                        "password",
                        "password",
                        formdata.password,
                        handleInputChange,
                        false,
                        false,

                        passwordRef,
                        handlekeyEnter(9)
                      )}

                      {PasswordField(
                        "Confirm Password",
                        6,
                        "confirm_password",
                        "password",
                        formdata.confirm_password,
                        handleInputChange,
                        false,
                        false,
                        cpRef,
                        handlekeyEnter(10)
                      )}

                      {/* {FileinputField(
                        "Passport/National ID",
                        3,
                        NationalID,
                        setNationalID,
                        NationalIDView,
                        setNationalIDView
                      )} */}
                    </div>
                  )}

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      width: "100%",
                    }}
                  >
                    <button
                      className="btn fontsubtitle mt-2 btn-connect w-25 my-3"
                      onClick={() => {
                        if (step == 0) {
                          setStep(1);
                        } else {
                          Register();
                        }
                      }}
                      disabled={buttonclick}
                    >
                      {/* {userType != -1 ? "Next" : "Select"} */}
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="col-6  p-0 colorimage d-none d-md-block d-lg-block"
            style={{ overflow: "hidden", borderRadius: "0px 10px 10px 0px" }}
          >
            <Rightcolumn someProp={isUserSet} settype={type} />
          </div>
        </div>
      </Fade>
      {imagecropmodal()}
    </div>
  );
};

export default PersonalInfo;
