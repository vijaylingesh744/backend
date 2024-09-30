import React, { useEffect, useRef, useState } from 'react'
import { Modal } from 'react-bootstrap';
import { Fade } from 'react-reveal';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import FetchData from '../../../fetch-api/Apifetch';
import { SingleImageCropper2 } from '../../../screens/FeedPage/PostData/ImageModel';
import { BASE_URL } from '../../../utils/ApiRoute';
import location from "../../../utils/location.json";
import flagData from '../../../utils/Country.json';
import imageCompression from 'browser-image-compression'; // Import image compression library
import Upload from "./Assets/upload1.png";
import Close from "./Assets/close.png";
import '../../../screens/newRegister/Style/configure.css'

const BpLicense = () => {
        const User = JSON.parse(localStorage.getItem("VERIFYDATA"));
        const navigate = useNavigate();
        const fileInputRef = useRef(null);
        const locationVal = useLocation();
        const { value } = locationVal;
        const [formdata, setFormdata] = useState({
          area_of_interest: "",
          phone:User?.phone,
          email:User?.gmail,
          country:User?.country,
          city:User?.city,
          annual_turnover: "",
          size: "",
          company_name: "",
          company_address: "",
          user_id: User?._id,
          type: 2,
        });
      
        const [isOpen, setIsOpen] = useState(false);
      const [selectedCountry, setSelectedCountry] = useState(flagData[0]);
      const [searchTerm, setSearchTerm] = useState("");
      
      const dropdownRef = useRef(null);
      
      const handleToggle = () => {
        setIsOpen(!isOpen);
      };
      
      const handleSelect = (country) => {
        setSelectedCountry(country);
        setIsOpen(false);
      };
      
      
      // -----------
      const companyNameRef = useRef(null);
      const phoneRef = useRef(null);
      const bemail = useRef(null);
      const companysize = useRef(null);
      const addressRef = useRef(null);
      const selectRef = useRef(null);
      const cityRef = useRef(null);
      const [buttonclick, setbuttonclick] = useState(false);
      
      const refs = [companyNameRef,phoneRef ,bemail,companysize,addressRef,selectRef,cityRef];
      
      const handlekeyEnter = (index) => (event) => {
        if (event.key === "Enter") {
          event.preventDefault();
          const nextRef = refs[index + 1];
          if (nextRef) {
            nextRef.current.focus();
          }else{
            addLicenceImages()
      
          }
        }
      };
      // ---------
        useEffect(() => {
          console.log(value);
             getLocation();
          setBusinessVerifyData();
          setIsUserSet(true);
          // handleGetData()
        }, []);
      
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
      
      // common function
      
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
        setFormdata({...formdata,["country"]:nearestCountry.name})
        setSelectedCountry(flagData.find(item=>item.name == nearestCountry.name));
      };
      const getLocation = () => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const { latitude, longitude } = position.coords;
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
      
      
      // common function end
      
      
        const handleKeyPress = (e) => {
          if (!isOpen) return;
      
          if (e.key === "ArrowDown") {
            setSearchTerm("");
          } else {
            setSearchTerm((prev) => prev + e.key);
          }
        };
      
        const filteredCountries = flagData
          .filter((country) =>
            country.dial_code.startsWith(searchTerm)
          )
          .concat(
            flagData.filter(
              (country) =>
                !country.dial_code.startsWith(searchTerm) &&
                country.dial_code.includes(searchTerm)
            )
          );
      
        const setBusinessVerifyData = async () => {
          const userdata = JSON.parse(localStorage.getItem("VERIFYDATA"));
          const res = await FetchData("detail/user/"+ userdata?._id, 'GET', null, true, false);
          if(res.success){
            console.log(res.data);
            if(res.data.BusinessInfoData[0]){
              var data = res?.data?.BusinessInfoData[0]  
                  setFormdata(data)
          }
          if(res.data.License[0]?.PanCard){
            // setLicenceFormdata(res?.data?.License)
                  setPanCardView({ url: BASE_URL + res?.data?.License[0]?.PanCard, type: "image" })
                  setPanCard({ url: BASE_URL + res?.data?.License[0]?.PanCard, type: "image" })
          }if(res.data.License[0]?.AddressProof){
                  setAddressProofView({ url: BASE_URL + res?.data?.License[0]?.AddressProof, type: "image" })
                  setAddressProof({ url: BASE_URL + res?.data?.License[0]?.AddressProof, type: "image" })
          } if(res.data.License[0]?.NationalID){
                  setNationalIDView({ url: BASE_URL + res?.data?.License[0]?.NationalID, type: "image" })
                  setNationalID({ url: BASE_URL + res?.data?.License[0]?.NationalID, type: "image" })
          }if(res.data.License[0]?.BusinessRegister){    
                  setBusinessRegisterView({ url: BASE_URL + res?.data?.License[0]?.BusinessRegister, type: "image" })
                  setBusinessRegister({ url: BASE_URL + res?.data?.License[0]?.BusinessRegister, type: "image" })   
          }if(res.data.License[0]?.GstCertificate){     
                  setGstCertificateView({ url: BASE_URL + res?.data?.License[0]?.GstCertificate, type: "image" })
                  setGstCertificate({ url: BASE_URL + res?.data?.License[0]?.GstCertificate, type: "image" })
          }
          if(res.data.License[0]?.ExportCopy){      
                  setExportCopyView({ url: BASE_URL + res?.data?.License[0]?.ExportCopy, type: "image" })
                  setExportCopy({ url: BASE_URL + res?.data?.License[0]?.ExportCopy, type: "image" })
          }}
        }
      
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
          }
      
          // setErrors({ ...errors, [name]: error });
          setFormdata({ ...formdata, [name]: value });
        };
      
        const RegisterAdded = async () => {
          var updatedFormData = {
            city: formdata.city,
            country: formdata.country,
            // area_of_interest: formdata.area_of_interest,
            phone: formdata.phone,
            email: formdata.email,
            type: formdata.type,
            company_name: formdata.company_name,
            company_address: formdata.company_address,
            user_id: User?._id,
            //  area_of_interest: selectedItems.map((industry) => ({
            //     title: industry,
            //  })),
            registerType: "BUSINESSINFO",
          };
          updatedFormData.annual_turnover = formdata.annual_turnover;
          updatedFormData.size = formdata.size;
          const res = await FetchData(
            `update/user/${User?._id}`,
            "POST",
            JSON.stringify(updatedFormData),
            false,
            false
          );
          if (res.status) {
            toast.success("Business Data Stored Successfully");
      
          }
        };
      
        const AddBusinessLogo = async () => {
          const formData = new FormData()
          console.log(BusinessLogo);
          console.log(User?._id);
        formData.append('Profile', BusinessLogo);
        formData.append('user_id', User?._id);
          try{
            const res = await FetchData("user/profile?bgicon=true", "POST", formData , true, true)
            console.log(res);
          }
          catch(err){
            console.log(err);
          }
        }
      
        const addLicenceImages = async () => {
          setbuttonclick(true);
          const formdata = new FormData();
          formdata.append("user_id", User?._id);
          formdata.append(`PanCard`, PanCard);
          formdata.append(`AddressProof`, AddressProof);
          // formdata.append(`NationalID`, NationalID);
          formdata.append(`BusinessRegister`, BusinessRegister);
          formdata.append(`GstCertificate`, GstCertificate);
          // formdata.append(`BankPassbook`, BankPassbook);
          formdata.append(`ExportCopy`, ExportCopy);
          formdata.append(`registerType`, "LICENSE");
          await RegisterAdded();
          await AddBusinessLogo();
          if (!BusinessRegister || !ExportCopy) {
            toast.error("Please upload all required documents.");
      
            setbuttonclick(false);
            return;
      
          }
          try {
            const res = await FetchData(
              `update/user/${User?._id}?registerType=LICENSE`,
              "POST",
              formdata,
              true,
              true
            );
            if (res.success) {
              console.log(res);
              toast.success("added Successfully");
              //   SkipButton()
              await updatelocal()
              
              navigate("/bp/dashboard");
            } else {
              toast.error("cant Add licence");
            setbuttonclick(false);
            }
          } catch (error) {
            toast.success(error.message);
            setbuttonclick(false);
            return null;
          }
        };

        const updatelocal = async ()=> {
          try{
            const res1 = await FetchData("detail/user/"+ User?._id, 'GET', null, true, false);
              localStorage.setItem('TRANSACTIONLOGIN',JSON.stringify(res1.data))
          }catch(err){
            console.log(err);
          }
        }
      
        const [PanCard, setPanCard] = useState();
        const [AddressProof, setAddressProof] = useState();
        const [NationalID, setNationalID] = useState();
        const [BusinessRegister, setBusinessRegister] = useState();
        const [GstCertificate, setGstCertificate] = useState();
        const [BankPassbook, setBankPassbook] = useState();
        const [ExportCopy, setExportCopy] = useState();
        const [PanCardView, setPanCardView] = useState();
        const [AddressProofView, setAddressProofView] = useState();
        const [NationalIDView, setNationalIDView] = useState();
        const [BusinessRegisterView, setBusinessRegisterView] = useState();
        const [GstCertificateView, setGstCertificateView] = useState();
        const [BankPassbookView, setBankPassbookView] = useState();
        const [ExportCopyView, setExportCopyView] = useState();
        const [BusinessLogo, setBusinessLogo] = useState();
        const [BusinessLogoView, setBusinessLogoView] = useState();
      
        const [cityList, setCityList] = useState([]);
        const [isUserSet, setIsUserSet] = useState(false);
      
        const Citylist = (title) => {
          const filteredCities = [];
          var data = location.find((item) => item.name == formdata.country);
          data.states.forEach((state) => {
            state.cities.forEach((city) => {
              if (city.name.toLowerCase().startsWith(title.toLowerCase())) {
                filteredCities.push({ name: city.name, state: state.name });
              }
            });
          });
          //   alert(filteredCities)
          setCityList(filteredCities);
        };
      
        const SelectOption = (title, col = 3, name, type, value, onChange, autoFocus, inputRef,
       onKeyPress) => {
          var options = [];
          if (name == "annual_turnover") {
            options = [
              "100000 - 1000000",
              "10000001 - 100000000",
              "100000001 - 1000000001",
            ];
          } else if (name == "size") {
            options = ["1-10", "11-50", "51-100", "101-200", "201-500", "501-1000"];
          } else if (name === "country") {
            options = location.map((item) => item.name);
          }
          return (
            <div
              className={`outlined-input col-lg-${col} col-md-${col} col-sm-12 my-3`}
            >
              <select name={name} value={value} onChange={onChange}  ref={inputRef}
                autoFocus={autoFocus}
                className={`form-control inputcontrol w-100`}
                onKeyDown={onKeyPress}>
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
          col = 3,
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
            <div style={{width:name=='phone'? '80%' : undefined}}
              className={`outlined-input col-lg-${col} col-md-${col} col-${name == 'phone' ? "10" : ''} my-3 ${name == 'phone' ? 'px-0' : ''}`}
            >
              <input
                type={type}
                className="w-100"
                name={name}
                value={value}
                onChange={(e) => {
                  const inputValue = e.target.value;
                  onChange({
                    target: { name: e.target.name, value: inputValue },
                  });
                }}
                placeholder=" "
                ref={inputRef}
                autoFocus={autoFocus}
                onKeyDown={onKeyPress}
                
              />
              <label for="test">{title}</label>
            </div>
          );
        };
      
        const [modalTitle, setModalTitle] = useState('');
      
        const openModal = (title) => {
          setModalTitle(title);
          setIsModal(true);
          imagecropmodal();
        };
      
        const resetState = (type) => {
          switch (type) {
            case 'Business Logo *':
              setBusinessLogo('');
              setBusinessLogoView('');
              break;
            case 'Business Document':
              setBusinessRegister('');
              setBusinessRegisterView('');
              break;
            case 'Export Copy':
              setExportCopy('');
              setExportCopyView('');
              break;
            default:
              break;
          }
        };
        
      
        const imagecropmodal = () => {
          let views, setvalue, setview,name;
      
          switch (modalTitle) {
            case 'Business Logo *':
              views = BusinessLogoView
              setvalue = setBusinessLogo;
              setview = setBusinessLogoView;
              break;
            case 'Business Pan Card *':
            case 'Pan Card *':
              views = PanCardView;
              setvalue = setPanCard;
              setview = setPanCardView;
              break;
            case 'License *':
              views = AddressProofView;
              setvalue = setAddressProof;
              setview = setAddressProofView;
              break;
            case 'Business Document':
              views = BusinessRegisterView;
              setvalue = setBusinessRegister;
              setview = setBusinessRegisterView;
              break;
            case 'GST Certificate':
              views = GstCertificateView;
              setvalue = setGstCertificate;
              setview = setGstCertificateView;
              break;
            case 'Export Copy':
              views = ExportCopyView;
              setvalue = setExportCopy;
              setview = setExportCopyView;
              break;
            default:
              return null;
          }
      
      
      
          return (
              <div>
            <Modal show={isModalOpen}  className="modelfilter"  >
              <Modal.Body >
                <SingleImageCropper2
                  imageUrl={views?.url}
                  onClose={modalcloseremove}
                  setCroppedImage={setvalue}
                  setViewImage={setview}
                  onSet={modalclose}
                  modalTitle={modalTitle}
      
                />
              </Modal.Body>
            </Modal>
            </div>
          );
        };
      
      
        const modalclose = () => {
          setIsModal(false);
        }
        const modalcloseremove = (type) => {
          console.log(type);
          setIsModal(false);
          resetState(type);
      
      
        }
      
      const MAX_FILE_SIZE_KB = 400; // Maximum file size in kilobytes
      
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
      
        const [isModalOpen, setIsModal] = useState(false);
        const FileinputField = (title, label, value, setValue, view, setView) => {
        
          const handleFileChange = async(e) => {
            console.log("File change event:", e.target.files);
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onloadend = async () => {
              if (file.type.startsWith("image")) {
                const compressedFile = await compressImage(file);
                setView({ type: "image", url: reader.result });
                setValue(compressedFile);
                openModal(title)
              } else if (file.type === "application/pdf") {
                // Handle PDF file
                setValue(file);
                setView({ type: "pdf", url: reader.result });
                console.log();
              } else {
                // Unsupported file type
                setView(null);
              }
            };
            if (file) {
              reader.readAsDataURL(file);
            }
          };
      
          return (
            <div className="align-items-center col-lg-3 col-12 d-flex my-2">
              <div
                className="align-items-center  justify-content-between w-100 p-2"
                style={{ border: "1px solid grey" }}
              >
                <div className="d-flex justify-content-center align-items-center ">
                  {!value && (
                    <label className="btn" htmlFor={`file-upload-${title}`}>
                      <img src={Upload} alt="upload" style={{ width: "18%" }}/>
                    </label>
                  )}
                  <input
                    type="file"
                    onChange={handleFileChange}
                    id={`file-upload-${title}`}
                    name="test"
                    accept=".jpg, .png, .pdf"
                    placeholder={title}
                    className="d-none"
                    ref={fileInputRef}
                  />
                  {view && view.type === "image" && (
                    <div
                      id="image-preview"
                      style={{ display: "flex", justifyContent: "center" }}
                    >
                      <img
                        src={view.url}
                        alt="Preview"
                        height="100px"
                        width="100%"
                        onClick={() => openModal(title)}
                        className="uploadimg" 
                      />
                    </div>
                  )}
                  {view && view.type === "pdf" && (
                    <div id="pdf-preview" style={{ width: "100%", height: "100px" }}>
                      <embed
                        src={view.url}
                        type="application/pdf"
                        width="100%"
                        height="100%"
                        
                      />
                    </div>
                  )}
                  {value && (
                    <img
                      src={Close}
                      alt="close"
                      height="10px"
                      style={{
                        margin: "10%",
                        position: "absolute",
                        top: "-22px",
                        left: 210,
                      }}
                      onClick={() => {
                        setValue(null);
                        setView(null);
                        if (fileInputRef.current) {
                          fileInputRef.current.value = '';
                        }
                      }}
                    />
                  )}
                  <div className="title-proof">
                    <label htmlFor="test">{title}</label>
                  </div>
                </div>
              </div>
            </div>
          );
        };
      
      //   const handleGetData=(type) => {
      // if(true){
      //     setFormdata({
      //       ...formdata,
      //       phone:User?.phone,
      //       email:User?.gmail,
      //       country:User?.country,
      //       city:User?.city
      
      //     })
        // }else{
        //   setFormdata({
        //     ...formdata,
        //     phone:"",
        //     email: "",
        //     country: "",
        //     city: ""
        //   })
        // }
          
        // }
      
        const handleClick = (type) => {
          setFormdata((prevFormdata) => ({ ...prevFormdata, type }));
        };
        return (
          <div
            className="container-fluid card"
            style={{ backgroundColor: "#e9ecef", height: "auto", minHeight: "100vh" }}
          >
            <Fade direction="right">
              <div
                className="row mx-lg-5 marginallscroll overflow-auto"
              >
                <div className="col-lg-12 col-sm-12">
                  <div className="w-100 m-lg-4 h-100">
                    <div className="px-lg-5 px-sm-2 mt-4 mt-lg-0">
                    <a className='fontcontent1' style={{color:"black",cursor:'pointer'}} onClick={()=>{navigate('/business-info')}}><i class="fa fa-chevron-left"  aria-hidden="true" style={{marginRight:"10px"}}></i> Back to Business Info</a>
                      <h3 className="fonttitle" style={{marginTop:"20px"}}>Hi {User?.first_name}</h3>
                      <p className="fontsubtitle mb-2">
                      Please provide all necessary information about your business to help us identify potential and suitable leads for you.
                      </p>
                      {/* <p className="font-weight-bold fontsubtitle mb-0">
                        Do you own a company ?
                      </p> */}
                      <div className="row">
                        <div className="col-lg-12  my-3 inputs-form outlined-input">
                          <div className="d-flex justify-content-center column-gap-2">
                            {/* <div>
                              <div
                                className={`px-2 py-2 column-gap-1`}
                                style={{
                                  border: "1px solid #c7c7c7",
                                  borderRadius: "10px",
                                  width: "auto",
                                  textAlign: "center",
                                  backgroundColor:
                                    formdata.type == 2 ? "#4535C1" : "#f5f5f5",
                                  display: "flex",
                                  justifyContent: "start",
                                  alignItems: "center",
                                  height: "auto",
                                }}
                                onClick={() => handleClick(2)}
                              >
                                <div
                                  className="rounded-circle p-1"
                                  style={{
                                    border: "1px solid #c7c7c7",
                                    backgroundColor: formdata.type == 2 ? "#fff" : "",
                                  }}
                                >
                                  <img
                                    src={Invester}
                                    className="m-1"
                                    style={{ width: "15px", height: "15px" }}
                                  />
                                </div>
                                <span
                                  className="fontsubtitle"
                                  style={{
                                    color: formdata.type == 2 ? "#fff" : "#c0c0c0",
                                    fontWeight: "600",
                                  }}
                                  onClick={()=>handleGetData(0)}
                                >
                                  Yes, I own a company
                                </span>
                              </div>
                            </div> */}
                            {/* <div>
                              <div
                                className={`px-2 py-2 column-gap-1`}
                                style={{
                                  border: "1px solid #c7c7c7",
                                  borderRadius: "10px",
                                  width: "auto",
                                  textAlign: "center",
                                  backgroundColor:
                                    formdata.type == 1 ? "#4535C1" : "#f5f5f5",
                                  display: "flex",
                                  justifyContent: "start",
                                  alignItems: "center",
                                  height: "auto",
                                }}
                                onClick={() => handleClick(1)}
                              >
                                <div
                                  className="rounded-circle p-1"
                                  style={{
                                    border: "1px solid #c7c7c7",
                                    backgroundColor: formdata.type == 1 ? "#fff" : "",
                                  }}
                                >
                                  <img
                                    src={Invester}
                                    className="m-1"
                                    style={{ width: "15px", height: "15px" }}
                                  />
                                </div>
                                <span
                                  className="fontsubtitle"
                                  style={{
                                    color: formdata.type == 1 ? "#fff" : "#c0c0c0",
                                    fontWeight: "600",
                                  }}
                                  onClick={()=>handleGetData(1)}
                                >
                                  No, I'm an Independent consultant
                                </span>
                              </div>
                            </div> */}
                          </div>
                        </div>
                        {formdata.type != 1 &&
                          inputField(
                            "Company Name",
                            3,
                            "company_name",
                            "text",
                            formdata.company_name,
                            handleInputChange,
                            true,
                            true,
                            companyNameRef,
                            handlekeyEnter(0)
                          )}
      {/*  */}
      {/* <div className="custom-dropdown col-3" ref={dropdownRef} tabIndex="0" onKeyDown={handleKeyPress} style={{ outline: 'none' }}>
            <div className="dropdown-header mt-3" style={{ outline: 'none' }}>
              <div onClick={handleToggle}>
              {selectedCountry.dial_code}
              <span className="dropdown-arrow" >&#9660;</span>
              </div>
              {inputField("Phone *", 12, "phone", "number", formdata.phone, handleInputChange, false,false,phoneRef,handlekeyEnter(1))}
            </div>
            {isOpen && (
              <div className="dropdown-list">
                {filteredCountries.map((country, index) => (
                  <div
                    key={index}
                    className="dropdown-item"
                    onClick={() => handleSelect(country)}
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
          </div>                            */}
                                                   {/*  */}
                                                   <div
                              className="custom-dropdown align-items-center row col-lg-3 col-md-6 col-sm-12  pl-3 ml-0 mx-auto"
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
                                <div className="col-lg-3  py-1 fontcontent1 d-flex justify-content-center  align-items-center" onClick={handleToggle} style={{width:'20%',border:'1px solid grey',borderRight: 'none',height:'2.5rem'}}>{selectedCountry?.dial_code}</div>
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
                        {inputField(
                          "Business Email *",
                          3,
                          "email",
                          "email",
                          formdata.email,
                          handleInputChange,
                          false,
                          false,
                          bemail,
                          handlekeyEnter(2)
                        )}
                        {formdata.type != 1 &&
                          SelectOption(
                            "Company Size",
                            3,
                            "size",
                            "number",
                            formdata.size,
                            handleInputChange,
                           
                            false,
                          companysize,
                          handlekeyEnter(3)
                          )}
                        {formdata.type != 1 &&
                          inputField(
                            "Building / Block No",
                            3,
                            "company_address",
                            "text",
                            formdata.company_address,
                            handleInputChange,
                            true,
                            false,
                          addressRef,
                          handlekeyEnter(4)
                          )}
                        <div className="col-lg-3 col-sm-12  my-3 inputs-form outlined-input">
                          <select
                            name="country"
                            className={`form-control inputcontrol w-100`}
                            id="exampleInputCountry"
                            value={formdata.country}
                            placeholder=" "
                            onChange={handleInputChange}
                            style={{ height: "2.5rem", border: "0.1px solid grey" }}
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
                          <label htmlFor="test">Select Country *</label>
                        </div>
                        <div className="col-lg-3 col-sm-12 my-3 mt-3 inputs-form outlined-input">
                          <input
                            list="citys"
                            name="city"
                            id="browser"
                            placeholder=" "
                            className="w-100"
                            value={formdata.city}
                            disabled={formdata.country ? false : true}
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
                      </div>
      
                      <p className="font-weight-bold">Business Documents</p>
                      <div className="row">
                        {/* {FileinputField(
                          formdata.type != 1 ? "Business Pan Card *" : "Pan Card *",
                          1,
                          PanCard,
                          setPanCard,
                          PanCardView,
                          setPanCardView
                        )} */}
                        {FileinputField(
                         "Business Logo *",
                          2,
                          BusinessLogo,
                          setBusinessLogo,
                          BusinessLogoView,
                          setBusinessLogoView
                        )}
                        {/* {FileinputField("National ID/Driving License", 3, NationalID, setNationalID, NationalIDView, setNationalIDView)} */}
                        {formdata.type != 1 &&
                          FileinputField(
                            "Business Document",
                            4,
                            BusinessRegister,
                            setBusinessRegister,
                            BusinessRegisterView,
                            setBusinessRegisterView
                          )}
                        {/* {formdata.type != 1 &&
                          FileinputField(
                            "GST Certificate",
                            5,
                            GstCertificate,
                            setGstCertificate,
                            GstCertificateView,
                            setGstCertificateView
                          )} */}
                        {/* {FileinputField("Bank Passbook", 6, BankPassbook, setBankPassbook, BankPassbookView, setBankPassbookView)} */}
                        {formdata.type != 1 &&
                          FileinputField(
                            "Export Copy",
                            7,
                            ExportCopy,
                            setExportCopy,
                            ExportCopyView,
                            setExportCopyView
                          )}
                      </div>
                      <div
                        className="justify-content-end column-gap-1"
                        style={{ display: "flex" }}
                      >
                        {/* <button
                          className="btn fontsubtitle btn-secondary  my-3 w-25"
                          // style={{ width: "18%" }}
                          onClick={() => SkipButton()}
                        >
                          Skip
                        </button> */}
                        <button
                          className="btn fontsubtitle btn-connect   my-3 w-25"
                          // style={{ width: "18%" }}
                          disabled={buttonclick}
                          onClick={() => addLicenceImages()}
                        >
                          Register
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Fade>
            {imagecropmodal()}
          </div>
        );
      };

export default BpLicense
