import React, { useEffect, useState } from 'react'
import { useRef } from 'react';
import { Modal } from 'react-bootstrap';
import { Fade } from 'react-reveal';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { SingleImageCropper } from '../../../screens/FeedPage/PostData/ImageModel';
import Rightcolumn from '../../../screens/newRegister/layout/RightColumn';
import Invester from "./Assets/investor.png";
import Buyer from "./Assets/buyer.png";
import Upload from "./Assets/upload1.png";
import Close from "./Assets/close.png";
import Customer from "./Assets/customer.png";
import imageCompression from 'browser-image-compression'; // Import image compression library
import location from "../../../utils/location.json";
import flagData from "../../../utils/Country.json";
import FetchData from '../../../fetch-api/Apifetch';
import '../../../screens/newRegister/Style/configure.css'
const BpPersonal = () => {
        const location = useLocation();
        const {state} = location
        const [showPassword, setShowPassword] = useState(false);
        const [toastShown, setToastShown] = useState(false);
        const [passwordmatch, setpasswordmatch] = useState(false);
        const [Alphanumaric, setAlphanumaric] = useState(false);
        const [Location, setLocation] = useState({ latitude: null, longitude: null });
        const [country, setCountry] = useState(false);
        const [buttonclick, setbuttonclick] = useState(false);
        const [profile, setProfile] = useState("");
        const [personalinfoprofile, setpersonalinfoprofile] = useState({
          url:"/images/profile/add-user.png"
        }
        );
      
        // const [error, setError] = useState(null);
      
        useEffect(() => {
          getLocation();
          setPersonalInfoData();
        }, []);
      useEffect(() => {
        
        console.log(personalinfoprofile);
        
      }, [personalinfoprofile]);
      
       
        //
      
        const [isOpen, setIsOpen] = useState(false);
        const [selectedCountry, setSelectedCountry] = useState(flagData[0]);
        const [searchTerm, setSearchTerm] = useState("");
        const dropdownRef = useRef(null);
        const handleToggle = () => {
          setIsOpen(!isOpen);
        };
      
        const handleSelect = (country) => {
          setSelectedCountry(country);
          console.log(country);
          setIsOpen(false);
        };
        //
      
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
      
        //
        const [licenceformdata, setLicenceFormdata] = useState({
          PanCard: "",
          AddressProof: "",
          NationalID: "",
          BusinessRegister: "",
          GstCertificate: "",
          BankPassbook: "",
          ExportCopy: "",
        });
      
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
                // setStep(1);
                setIsUserSet(true);
                setuserType(data?.user_type);
              }
              // if(data.profile !==){
              //   console.log(data.profile);
              //   setpersonalinfoprofile({
              //     url:BASE_URL + data?.profile
              //   })
      
              // }
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
            // if (res.data.License) {
            //   setLicenceFormdata(res?.data?.License);
            //   setNationalIDView({
            //     url: BASE_URL + res?.data?.License.NationalID,
            //     type: "image",
            //   });
            //   setNationalID({
            //     url: BASE_URL + res?.data?.License.NationalID,
            //     type: "image",
            //   });
            // }
          }
        };
      
        const findNearestCountry = (lat, lng, countries) => {
          let nearestCountry = null;
          let shortestDistance = Infinity;
      
          countries.forEach((country) => {
            var distance = ""
            // console.log("country",country.states)
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
          setFormdata({...formdata,["country"]:nearestCountry.name})
          setSelectedCountry(flagData.find(item=>item.name == nearestCountry.name));
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
                // setError(err.message);
              }
            );
          } else {
            // setError("Geolocation is not supported by this browser.");
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
      
        const User = JSON.parse(localStorage.getItem("LOGINDATA"))?.user;
        const [step, setStep] = useState(0);
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
          company:"",
          about:""
        });
        //
        const firstNameRef = useRef(null);
        const lastNameRef = useRef(null);
        const selectRef = useRef(null);
        const phoneRef = useRef(null);
        const cityRef = useRef(null);
        const passwordRef = useRef(null);
        const cpRef = useRef(null);
        const designRef=useRef(null);
        const aboutRef=useRef(null);
        const companyRef=useRef(null);
        const refs = [firstNameRef, lastNameRef,designRef,aboutRef,companyRef,selectRef,cityRef,phoneRef,passwordRef,cpRef,];
      
        const handlekeyEnter = (index) => (event) => {
          if (event.key === "Enter") {
            event.preventDefault();
            const nextRef = refs[index + 1];
            if (nextRef) {
              nextRef.current.focus();
            }else{
              Register();
            }
          }
        };
      
        const addProfilePic = async()=>{
      
      
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
          var updatedUserData = {
              email: formdata.gmail,
              user_id: User?._id,
              first_name: formdata.first_name,
              last_name: formdata.last_name,
              designation: formdata.designation,
              date_of_birth: formdata.date_of_birth,
              country: formdata.country,
              city: formdata.city,
              phone: formdata.phone,
              registerType: "USER",
              company:formdata.company,
              about:formdata.about
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
              if(profile){
              addProfilePic()
              }
              toast.success("Details Updated Successfully!");
              // if(userType == 1){
              //   SkipButton()
              // }else{

              navigate("/bp/Business-info", { state: userType });
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
              className={`outlined-input col-lg-${col} col-md-${col} col-${name == 'phone' ? '10' : '' } my-2 ${name == 'phone' ? 'px-0' : ''}`}
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
                style={{ color: name === "gmail" ? "#605d5d" : "initial" }}
                
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
            <div
              className={`outlined-input col-lg-${col} col-md-${col} col-sm-12 my-2`}
            >
              <input
                className="w-100"
                type={showPassword ? "text" : "password"}
                name={name}
                value={value}
                onChange={onChange}
                placeholder=" "
                ref={inputRef}
                autoFocus={autoFocus}
                onKeyDown={onKeyPress}
              />
      
              <label>{`${title} * `}</label>
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
          let error = "";
      
      if(name=="country"){
        setSelectedCountry(flagData.find(item=>item.name == value));
      }
          if (name === "gmail") {
            if (!value.includes("@")) {
              error = "Email must contain @ symbol";
            } else if (!/^\S+@\S+\.\S+$/.test(value)) {
              error = "Invalid email format";
            }
          } else if (name === "password") {
            // Check if the password meets the criteria: at least one number, one letter, and one special character
            if (!/(?=.*\d)(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9])/.test(value)) {
              // If password does not meet the criteria, set Alphanumaric to true
              setAlphanumaric(true);
            } else {
              // If password meets the criteria, set Alphanumaric to false
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
          //   alert(filteredCities)
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
          setpersonalinfoprofile({url:"/images/profile/add-user.png"})
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
            <Modal show={isModalOpen}  className="modelfilter"  >
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
        
        // const [NationalID, setNationalID] = useState();
        // const [NationalIDView, setNationalIDView] = useState();
      
        // const addIdProof = async () => {
        //   const formdata = new FormData();
        //   formdata.append("user_id", User._id);
        //   formdata.append(`NationalID`, NationalID);
      
        //   if (!NationalID) {
        //     // toast.error("Please upload ID documents.");
        //     return;
        //   }
      
        //   try {
        //     const res = await FetchData("add/license", "POST", formdata, true, true);
        //     if (res.success) {
        //     } else {
        //       toast.error("cant Add Id Proof");
        //     }
        //   } catch (error) {
        //     // toast.success(error.message);
        //     return null;
        //   }
        // };
      
        // const FileinputField = (title, label, value, setValue, view, setView) => {
        //   const handleFileChange = (e) => {
        //     console.log("File change event:", e.target.files);
        //     const file = e.target.files[0];
        //     const reader = new FileReader();
        //     reader.onloadend = () => {
        //       console.log("File reader result:", reader.result);
        //       setValue(file);
        //       if (file.type.startsWith("image")) {
        //         setView({ type: "image", url: reader.result });
        //       } else if (file.type === "application/pdf") {
        //         // Handle PDF file
        //         setView({ type: "pdf", url: reader.result });
        //       } else {
        //         // Unsupported file type
        //         setView(null);
        //       }
        //     };
        //     if (file) {
        //       reader.readAsDataURL(file);
        //     }
        //   };
      
        //   return (
        //     <div className="align-items-center col-5 d-flex my-2">
        //       <div
        //         className="align-items-center  justify-content-between w-100 p-2"
        //         style={{ border: "1px solid grey" }}
        //       >
        //         <div className="d-flex justify-content-start align-items-center ">
        //           {!value && (
        //             <label className="btn" htmlFor={`file-upload-${title}`}>
        //               <img
        //                 src={Upload}
        //                 alt="upload"
        //                 style={{ width: "18%", marginLeft: "10px" }}
        //               />
        //             </label>
        //           )}
        //           <input
        //             type="file"
        //             onChange={handleFileChange}
        //             id={`file-upload-${title}`}
        //             name="test"
        //             accept=".jpg, .png, .pdf"
        //             placeholder={title}
        //             className="d-none"
        //           />
        //           {view && view.type === "image" && (
        //             <div
        //               id="image-preview"
        //               style={{ display: "flex", justifyContent: "center" }}
        //             >
        //               <img
        //                 src={view.url}
        //                 alt="Preview"
        //                 height="100px"
        //                 width="100%"
        //                 className="uploadimg"
        //               />
        //             </div>
        //           )}
        //           {view && view.type === "pdf" && (
        //             <div id="pdf-preview" style={{ width: "100%", height: "100px" }}>
        //               <embed
        //                 src={view.url}
        //                 type="application/pdf"
        //                 width="100%"
        //                 height="100%"
        //               />
        //             </div>
        //           )}
        //           {value && (
        //             <img
        //               src={Close}
        //               alt="close"
        //               height="10px"
        //               style={{
        //                 margin: "10%",
        //                 position: "absolute",
        //                 top: "-17px",
        //                 left: 180,
        //               }}
        //               onClick={() => {
        //                 setValue(null);
        //                 setView(null);
        //               }}
        //             />
        //           )}
        //           <div className="title-proof">
        //             <label htmlFor="test " className="fontcontent1">
        //               {title}
        //             </label>
        //           </div>
        //         </div>
        //       </div>
        //     </div>
        //   );
        // };
        // const isDisabled = userType == -1;
        return (
          <div
            className="container-fluid card"
            style={{ backgroundColor: "#e9ecef", height: "auto", minHeight: "100vh" }}
          >
            <Fade direction="right">
              <div
                className="row mx-lg-5 marginall"
              
              >
                <div className="col-lg-6 col-sm-12 pb-lg-5 ">
                  <div
                    className="w-100 m-lg-2 h-100 scrollerhide"
                    style={{ overflowY: "scroll", overflowX: "hidden" }}
                  >
                    {/* <div className="d-flex justify-content-start p-4">
                                      <img src="images/icons/logo.png" alt="" style={{ width: "120px", height: "75px" }} />
                                  </div> */}
                    <div className="p-lg-4 mt-5 mt-lg-0 px-3 px-lg-0" style={{ height: "550px" }}>
                      {/* {step == 0 ? ( */}
                        <a
                          className="fontcontent1"
                          style={{ color: "black", cursor: "pointer" }}
                          onClick={() => {
                            navigate("/login");
                          }}
                        >
                          <i class="fa fa-chevron-left" aria-hidden="true" style={{marginRight:"10px"}}></i> Back
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
                      <h4
                        className="fontsubtitle"
                        style={{ marginTop: "20px", fontSize: "var(--title)" }}
                      >
                       Welcome to Connect Souq.
                      </h4>
                      <p style={{ color: "gray" }} className="fontcontent2">
                      To complete your profile and become an effective Connect Souq member,
                       please provide accurate information. This will enhance your ability to generate more leads. Additionally, 
                      we request you upload a government-issued ID, such as a Passport or National ID, to verify your identity.{" "}
                      </p>
                      <p style={{ color: "gray" }} className="fontcontent2">
                      Thank you for your cooperation.
                      </p>
                      <div className="row">
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
                                  className={` px-3 py-2 align-items-center cardsize ${
                                    userType == 0 ? "active" : ""
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
                                  className={` px-3 py-2 align-items-center cardsize ${
                                    userType == 1 ? "active" : ""
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
                                  className={` px-3 py-2 align-items-center cardsize ${
                                    userType == 2 ? "active" : ""
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
                              <label className="btn" htmlFor="file-upload-profile">
                                <img
                                  src={personalinfoprofile.url}
                                  alt="upload"
                                  style={{
                                    width: "100px",
                                    height: "100px",
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
                              className={`outlined-input col-lg-6 col-md-6 col-sm-12 my-2`}
                            >
                              <select
                                name="country"
                                className={`form-control inputcontrol w-100`}
                                id="exampleInputCountry"
                                value={formdata.country}
                                placeholder=" "
                                onChange={handleInputChange}
                                style={{
                                  height: "2.5rem",
                                  border: "0.1px solid grey",
                                }}
                                aria-describedby="countryHelp"
                                ref={selectRef}
                                autoFocus={false}
                                onKeyDown={handlekeyEnter(5)}
                                
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
                                className="w-100"
                                disabled={formdata.country || country ? false : true}
                                onChange={(e) => {
                                  const { name, value } = e.target;
                                  Citylist(value);
                                  setFormdata({ ...formdata, [name]: value });
                                }}
                                ref={cityRef}
                                autoFocus={false}
                                onKeyDown={handlekeyEnter(6)}
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
                            <div
                              className="custom-dropdown align-items-center row col-lg-6 col-md-6 col-sm-12  pl-3 ml-0 "
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
                                <div className="col-lg-3 py-1 fontcontent1 d-flex justify-content-center align-items-center" onClick={handleToggle} style={{width:'20%',border:'1px solid grey',borderRight: 'none',height:'2.5rem'}}>{selectedCountry?.dial_code}</div>
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
                              handlekeyEnter(7)
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
                                        style={{width:"30px",height:"30px"}}
                                      />
                                      {country.dial_code}
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                            {PasswordField(
                              "Password",
                              12,
                              "password",
                              "password",
                              formdata.password,
                              handleInputChange,
                              false,
                              false,
                              
                              passwordRef,
                              handlekeyEnter(8)
                            )}
                            {formdata.password != "" && Alphanumaric && (
                              <span className="text-danger mx-4 small">
                                Strong password, consider using a mix of alphabetic
                                numbers, and special symbols.
                              </span>
                            )}
                            {PasswordField(
                              "Confirm Password",
                              12,
                              "confirm_password",
                              "password",
                              formdata.confirm_password,
                              handleInputChange,
                              false,
                              false,
                              cpRef,
                              handlekeyEnter(9)
                            )}
                            {passwordmatch && (
                              <span
                                className="text-danger mx-4 small"
                                style={{ width: "100%", marginBottom: ".2rem" }}
                              >
                                Password not match{" "}
                              </span>
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
                            className="btn fontsubtitle   mt-2 btn-connect w-25 my-3"
                            onClick={() => {
                              // if (step == 0) {
                                // } else {
                                  if(state){
                                    setStep(1);       
                                }else{
                                Register();
                              }
                            }}
                            disabled={buttonclick}
                            >
                            {userType != -1 ? "Next" : "Select"}
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
                  {/* <div className='d-lg-flex d-md-flex d-none h-100 justify-content-center align-items-center'>
                                  <img src={"/images/icons/logo.png"} style={{ borderRadius: "0% 5% 5% 0%",  width: "300px", height: '190px'  }} />
                              </div> */}
                  <Rightcolumn someProp={isUserSet} settype={type} />
                </div>
              </div>
            </Fade>
            {imagecropmodal()}
          </div>
        );
      };
export default BpPersonal
