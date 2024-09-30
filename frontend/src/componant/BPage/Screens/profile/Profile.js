import React, { useState, useEffect, useRef } from 'react';
import location from "../../../utils/location.json"
import { ToastContainer, toast } from 'react-toastify';
import FetchData from '../../../fetch-api/Apifetch';
import Upload from './Asset/upload.png'
import '../../../screens/newRegister/Style/configure.css'
import Close from './Asset/close.png'
import { BASE_URL } from '../../../utils/ApiRoute';
import AllSkill from '../../../../all_skills';
import { useNavigate } from 'react-router-dom';
import imageCompression from 'browser-image-compression'; // Import image compression library
import { SingleImageCropper } from '../../../screens/FeedPage/PostData/ImageModel';
import { Modal } from 'react-bootstrap';
import { determineType, handleImageError, handleImagePageError, Imagesource } from '../../../utils/Function';

const Profile = () => {
    const [cityList, setCityList] = useState([]);
    const navigate = useNavigate()
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("LOGINDATA")))
    const [errors, setErrors] = useState({});
    const [selectedItems, setSelectedItems] = useState([]);
    const [skillview, Setskillsview] = useState(false)
    const [options, setOptions] = useState([]);
    const [filterText, setFilterText] = useState('');
    const [loading, setLoading] = useState(false);
    const [SelectedIndustry, setSelectedIndustry] = useState([]);
    const fileInputRef = useRef(null);
    const [PanCard, setPanCard] = useState();
    const [AddressProof, setAddressProof] = useState();
    const [NationalID, setNationalID] = useState();
    const [BusinessRegister, setBusinessRegister] = useState();
    const [GstCertificate, setGstCertificate] = useState();
    const [BankPassbook, setBankPassbook] = useState();
    const [ExportCopy, setExportCopy] = useState();
    const [PanCardView, setPanCardView] = useState();
    const [AddressProofView, setAddressProofView] = useState();
    const [Alphanumaric, setAlphanumaric] = useState(false);
    const [passwordmatch, setpasswordmatch] = useState(false);
    const [skill, Setskills] = useState([]);
    const [NationalIDView, setNationalIDView] = useState();
    const [GstCertificateView, setGstCertificateView] = useState();
    const [BankPassbookView, setBankPassbookView] = useState();
    const [NewBusiness, setNewBusiness] = useState(false);
    const [BusinessRegisterView, setBusinessRegisterView] = useState();
    const [BusinessLogo, setBusinessLogo] = useState({url: "", type: "image"});
    const [BusinessLogoView, setBusinessLogoView] = useState({url: "", type: "image"});
    const [ExportCopyView, setExportCopyView] = useState();
    const [stage, setstage] = useState(0);
    const [step, setstep] = useState(0);
    const [profile, setProfile] = useState("");
    const [personalinfoprofile, setpersonalinfoprofile] = useState()
    const [isModalOpen, setIsModal] = useState(false);
    const [LicenseData, setLicenseData] = useState([])
    const [businessformdata, setbusinessFormdata] = useState({
        city: "",
        country: "",
        area_of_interest: "",
        phone: "",
        email: "",
        designation: "",
        annual_turnover: "",
        size: "",
        company_name: "",
        company_address: "",
        user_id: "",
        type: "1",
        industry_id: ''
    });
    const [personalformdata, setpersonalFormdata] = useState({
        first_name: "",
        last_name: "",
        date_of_birth: "",
        gender: "",
        gmail: "",
        phone: "",
        country: "",
        city: "",
        password: "QC@1234",
        confirm_password: "QC@1234",
        user_type: "",
        login_type: "1",
        designation: ""
    });
    const [licenceformdata, setLicenceFormdata] = useState({
        PanCard: "",
        AddressProof: "",
        NationalID: "",
        BusinessRegister: "",
        GstCertificate: "",
        BankPassbook: "",
        ExportCopy: "",
    });
    const [bankformdata, setbankFormdata] = useState({
        transit_number: "",
        account_number: "",
        institution_number: "",
        user_id: ""
    })

    var GetProfile = JSON.parse(localStorage.getItem("LOGINDATA"));
    const { BusinessInfoData } = GetProfile;
    useEffect(() => {
        dataList()
        UpdateProfile()
    }, [])
    const Citylist = (title, label = "personal", setData) => {
        const filteredCities = [];
        var data = []
        if (label == "personal") {
            data = location.find(item => item.name == personalformdata.country)
        } else {
            data = location.find(item => item.name == businessformdata?.country)
        }
        data?.states.forEach(state => {
            state.cities.forEach(city => {
                if (city.name.toLowerCase().startsWith(title.toLowerCase())) {
                    filteredCities.push({ name: city.name, state: state.name });
                }
            });
        });
        setData(filteredCities)
    }
    const handleIndustrySelect = (title, index = 0) => {
        const item = { title, index };
        Setskillsview(true);
        if (SelectedIndustry.some(selected => selected?.title === title)) {
            setSelectedIndustry(SelectedIndustry.filter(selected => selected?.title !== title));
        } else {
            setSelectedIndustry([...SelectedIndustry, item]);
        }
    }
    const UpdateProfile = () => {
        var GetProfile = JSON.parse(localStorage.getItem("LOGINDATA"));
        const { user, BusinessInfoData, BankInfoData, License } = GetProfile;
        if (user) {
            setpersonalFormdata({
                first_name: user?.first_name || '',
                last_name: user?.last_name || '',
                date_of_birth: user?.date_of_birth || '',
                gmail: user?.gmail || '',
                phone: user?.phone || '',
                country: user?.country || '',
                city: user?.city || '',
                designation: user?.designation || '',
                user_type: user?.user_type,
                about: user?.about,
                gender: user?.gender || '',
            });
            setpersonalinfoprofile({ url: BASE_URL + user?.profile, type: 'image' })
            setProfile({ url: BASE_URL + user?.profile, type: 'image' })
        }
        if (BankInfoData) {
            setbankFormdata({
                account_number: BankInfoData.account_number || '',
                institution_number: BankInfoData.institution_number || '',
                transit_number: BankInfoData.transit_number || '',
            });
        }
        if(License){
            setLicenseData(License)
        }
    }
    const handleFilterChange = (event) => {
        setFilterText(event.target.value);
    };
    const handleCheckboxChange = (title, index = 0) => {
        const item = { title, index };
        if (selectedItems.some(selected => selected?.title === title)) {
            setSelectedItems(selectedItems.filter(selected => selected?.title !== title));
        } else {
            setSelectedItems([...selectedItems, item]);
        }
        setFilterText('');
    };
    const dataList = async () => {
        const res = await FetchData("industry", 'GET', null, false, false);
        setOptions(res.data.data);
    }
    const handleInputChangepersonal = (e) => {
        const { name, value } = e.target;
        let error = '';
        if (name === 'gmail') {
            if (!value.includes('@')) {
                error = 'Email must contain @ symbol';
            } else if (!/^\S+@\S+\.\S+$/.test(value)) {
                error = 'Invalid email format';
            }
        }
        else if (name === 'password') {
            if (!/(?=.*\d)(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9])/.test(value)) {
                setAlphanumaric(true);
            } else {
                setAlphanumaric(false);
            }
        }
        else if (name === 'confirm_password') {
            if (personalformdata.password !== value) {
                setpasswordmatch(true);
            }
            else if (personalformdata.password == value) {
                setpasswordmatch(false);
            }
        }
        setErrors({ ...errors, [name]: error });
        setpersonalFormdata({ ...personalformdata, [name]: value });
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setbusinessFormdata({ ...businessformdata, [name]: value });
    };
    const handleInputChangebank = (e) => {
        const { name, value } = e.target;
        setbankFormdata({ ...bankformdata, [name]: value });
    };

    const AddBusinessInfo = async (id) => {
        try {
            const token = false;
            const updatedFormData = {
                city: businessformdata?.city,
                country: businessformdata?.country,
                phone: businessformdata?.phone,
                industry_id: SelectedIndustry,
                email: businessformdata?.email,
                company_name: businessformdata?.company_name,
                company_address: businessformdata?.company_address,
                user_id: user?.user?._id,
                area_of_interest: selectedItems,
                registerType: 'BUSINESSINFO'
            };
            const keysWithEmptyValues = Object.keys(updatedFormData).filter(
                (key) => !updatedFormData[key]
              );
        
            if(keysWithEmptyValues.length > 0) {
                const missingKeys = keysWithEmptyValues.join(", ");
                toast.error(
                  `Please provide values for the following fields: ${missingKeys.replaceAll(
                    /_/gi,
                    " "
                  )}`
                );
                return;
            }
            updatedFormData.annual_turnover = businessformdata?.annual_turnover
            updatedFormData.size = businessformdata?.size
            let res
            if(NewBusiness){
                updatedFormData.NewData = true
                await addLicenceImages("NEW")
                 res = await FetchData(`update/user/${user?.user?._id}`, 'POST', JSON.stringify(updatedFormData), token, false);
            }else{
                await addLicenceImages("UPDATE")
                updatedFormData.UpdateData = true
                 res = await FetchData(`update/user/${businessformdata._id}`, 'POST', JSON.stringify(updatedFormData), token, false);
            }
            setbusinessFormdata({...businessformdata,_id:businessformdata._id});
            await addProfilePic('Business',res.data._id)
            const updatelocal = await updateLocalStorage()
            toast.success("Profile Updated Successfully")
            setLoading(false);
            // navigate('/feed-page')
            return true;
        } catch (error) {
            return false;
        }
    }
    const addLicenceImages = async (VALUE) => {
        const formdata = new FormData();
        formdata.append("user_id", user?.user?._id);
        formdata.append(`PanCard`, PanCard);
        formdata.append(`AddressProof`, AddressProof);
        formdata.append(`NationalID`, NationalID);
        formdata.append(`BusinessRegister`, BusinessRegister);
        formdata.append(`GstCertificate`, GstCertificate);
        formdata.append(`BankPassbook`, BankPassbook);
        formdata.append(`ExportCopy`, ExportCopy);
        formdata.append(`registerType`, "LICENSE");
        if(VALUE == 'NEW'){
            formdata.append(`NewData`, true);
            var dataId =user?.user?._id
        }else{
            formdata.append(`UpdateData`, true);
            var dataId =LicenseId
        }
        try {
            const res = await FetchData(`update/user/${dataId}?registerType=LICENSE`, "POST", formdata, true, true)
            const updatelocal = await updateLocalStorage()
            // toast.success("Profile Updated Successfully")
            setLoading(false);
            navigate('/feed-page')
            return true
        } catch (error) {
            // toast.success(error.message);
            return false;
        }
    }
    const updateLocalStorage = async () => {
        const res = await FetchData("detail/user/" + user?.user?._id, 'GET', null, true, false);
        if (res.success) {
            localStorage.setItem("LOGINDATA", JSON.stringify(res.data))
        }
    }
    const FileinputField = (title, label, value, setValue, view, setView) => {
        const handleFileChange = (e) => {
            console.log("File change event:", e.target.files);
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                console.log("File reader result:", reader.result);
                setValue(file);
                if (file.type.startsWith("image")) {
                    setView({ type: "image", url: reader.result });
                } else if (file.type == "application/pdf") {
                    setView({ type: "pdf", url: reader.result });
                } else {
                    setView(null);
                }
            };
            if (file) {
                reader.readAsDataURL(file);
            }
        };
        return (
            <div className="align-items-center row-gap-3 col-lg-4 col-12 flex-column d-flex my-1 py-1" >
                <div className="align-items-center  justify-content-between w-100" style={{ border: "1px dashed", height: '140px' }}>
                    <div className="d-flex justify-content-center h-100 align-items-center" >
                       
                        {(!value || (view?.url && ['undefined', 'null'].includes(view.url.split('/').pop()))) &&
                            <label className="btn" htmlFor={`file-upload-${title}`}>
                                <img src={Upload} alt='upload' style={{ width: '30%' }} />
                            </label>}
                        <input type="file" ref={fileInputRef} onChange={handleFileChange} id={`file-upload-${title}`} name="test" accept=".jpg, .png, .pdf" placeholder={title} className="d-none" />
                        {view && view.type === "image" && view.url && !['undefined', 'null'].includes(view.url.split('/').pop()) && (
                            <div id="image-preview" style={{ display: 'flex', justifyContent: 'center' }}>
                                <img src={view.url} alt="Preview" height="100px" width='95%' />
                            </div>
                        )}
                        {view && view.type === "pdf" && (
                            <div id="pdf-preview" style={{ width: '100%', height: '100px' }}>
                                <embed src={view.url} type="application/pdf" width="95%" height="100%" />
                            </div>
                        )}
                        {value &&
                            <img src={Close} alt='close' height='10px' style={{ margin: '10%', position: 'absolute', top: '-4%', right: '0%' }} onClick={() => {
                                setValue(null)
                                setView(null)
                                if (fileInputRef.current) {
                                    fileInputRef.current.value = '';
                                }
                            }} />
                        }
                    </div>
                </div>
                <div className='title-proof1'>
                    <label htmlFor="test" className='fontcontent1 text-secondary1'>{title}</label>
                </div>
            </div>
        );
    };
    const validateUserData = (data) => {
        const { gmail, first_name, last_name } = data;
        const isValidGmail = gmail && gmail.trim().length > 0 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(gmail);
        const isValidFirstName = first_name && first_name.trim().length > 0;
        const isValidLastName = last_name && last_name.trim().length > 0;
        if (!isValidGmail) {
            toast.error('Invalid or empty Email address.');
        }
        if (!isValidFirstName) {
            toast.error('First name cannot be empty.');
        }
        if (!isValidLastName) {
            toast.error('Last name cannot be empty.');
        }
        return isValidGmail && isValidFirstName && isValidLastName;
    }
    const handleusersubmit = async () => {
        setLoading(true);
        const UserData = {
            gmail: personalformdata.gmail,
            first_name: personalformdata.first_name,
            last_name: personalformdata.last_name,
            date_of_birth: personalformdata.date_of_birth,
            gender: personalformdata.gender,
            phone: personalformdata.phone,
            country: personalformdata.country,
            about: personalformdata.about,
            city: personalformdata.city,
            password: personalformdata.password,
            confirm_password: personalformdata.confirm_password,
            designation: personalformdata.designation,
            user_type: personalformdata.user_type == "Buyer" ? "0" : personalformdata.user_type == "Seller" ? 2 : personalformdata.user_type == "Business Partner" ? 1 : personalformdata.user_type,
            login_type: personalformdata.login_type,
            registerType: 'USER'
        }
        const isValid = validateUserData(UserData);
        if (!isValid) {
            return
        }
        const res = await FetchData(`update/user/${user?.user?._id}`, 'POST', JSON.stringify(UserData), false, false);
        if (res.success) {
            if (profile) {
                const updateProfile = await addProfilePic('Profile')
            }
            const updatelocal = await updateLocalStorage()
            setLoading(false);
            toast.success("Profile Updated Successfully")
        }
        setLoading(false);
        navigate('/feed-page')
    }
    const AddBankData = async (id) => {
        try {
            const formdata = {
                transit_number: bankformdata.transit_number,
                account_number: bankformdata.account_number,
                institution_number: bankformdata.institution_number,
                user_id: user?.user?._id,
                registerType: 'BANKINFO'
            }
            const token = false;
            const res = await FetchData(`update/user/${user?.user?._id}`, 'POST', JSON.stringify(formdata), token, false);
            const updatelocal = await updateLocalStorage()
            toast.success("Profile Updated Successfully")
            setLoading(false);
            navigate('/feed-page')
            return true
        } catch (error) {
            return false
        }
    }
    const InputField = (label, name, type, value, onChange, placeholder, caplatize) => (
        <div className=" outlined-input col-lg-12 col-12 mb-2 mt-3 inputs-form">
            <input
                type={type}
                className="fontcontent1 w-100"
                name={name}
                value={value}
                style={{ color: 'black' }}
                onChange={(e) => {
                    const inputValue = e.target.value;
                    var capitalizedValue = inputValue
                        .toLowerCase()
                        .split(' ')
                        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                        .join(' ');
                    if (!caplatize) {
                        if (name == "phone") {
                            capitalizedValue = e.target.value.replace(/\D/, '').slice(0, 12);;
                        } else {
                            capitalizedValue = inputValue
                        }
                    }
                    onChange({ target: { name: e.target.name, value: capitalizedValue } });
                }}
                disabled={name == "gmail" ? true : false}
                placeholder=" "
            />
            <label htmlFor={`exampleInput${name}`} className="form-label mr-3 fontcontent1" style={{ fontWeight: "500", color: 'grey' }}>
                {label}
            </label>
        </div>
    );
    const SelectOption = (title, col = 3, name, type, value, onChange) => {
        var options = []
        var con = true
        let defaultValue = "";
        if (name == "user_type") {
            options = [
                "Buyer",
                "Seller",
                "Business Partner",
            ]
            if (value === "0") {
                defaultValue = "Buyer";
            } else if (value === "1") {
                defaultValue = "Business Partner";
            } else if (value === "2") {
                defaultValue = "Seller";
            }
        } else if (name == "gender") {
            console.log(value);
            options = [
                "Male",
                "Female",
                "Others"
            ]
        }
        else if (name == "annual_turnover") {
            options = [
                "100000 - 1000000",
                "1000001 - 100000000",
                "100000001 - 1000000001"
            ]
        } else if (name == "size") {
            options = [
                "1-10",
                "11-50",
                "51-100",
                "101-200",
                "201-500",
                "501-1000"
            ]
        }
        else if (name === "country") {
            options = location.map(item => item.name);
        }
        else {
            con = false
            options = [];
        }
        return (
            <div className="col-lg-12 col-12 mb-2 mt-3 outlined-input inputs-form">
                <select
                    name={name}
                    value={con ? (defaultValue || value) : value}
                    className='form-control rounded fontcontent1'
                    onChange={onChange}
                    style={{ color: 'black', border: '1px solid #767676' }}>
                    <option value={""}>Select Option</option>
                    {options.map(item => (
                        con ? <option value={item}>{item}</option> : <option value={item.userdata._id}>
                            {item.userdata.first_name} {item.userdata.last_name}
                        </option>
                    ))}
                </select>
                <label htmlFor={`exampleInput${title}`} className="form-label mr-3 fontcontent1" style={{ fontWeight: "500", color: 'grey' }}>
                    {title}
                </label>
            </div>
        )
    }
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
            maxSizeMB: MAX_FILE_SIZE_KB / 1024,
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
    const openModal = () => {
        setIsModal(true);
        imagecropmodal();
    };
    const modalclose = () => {
        setIsModal(false);
    }
    const modalcloseremove = () => {
        setIsModal(false);
        // if(setpersonalinfoprofile.url == '/images/profile/add-user?.png'){
        setpersonalinfoprofile({ url: "/images/profile/add-user?.png" })
        setProfile('')
        // }
    }
    const addProfilePic = async (type,UserId=user?.user?._id) => {
        const picture = type == 'Profile' ? profile : BusinessLogo
    try{
        const formData = new FormData()
        formData.append('Profile', picture);
        formData.append('update',type == 'Profile' ? false:true);
        formData.append('user_id',UserId);
        const res = await FetchData(`user/profile?bgicon=${type == 'Profile' ? false:true}`, "POST", formData, true, true)
    }
    catch(err){
        console.log(err);
    }
    }
    const imagecropmodal = () => {
        let views, setvalue, setview;
        views = personalinfoprofile;
        setvalue = setProfile;
        setview = setpersonalinfoprofile;
        return (
            <div>
                <Modal show={isModalOpen} className="modelfilter"  >
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


    const [LicenseId,setLicenseId] = useState("")
    const ChangeBusinessItem = (item,id,index) => {
        if(id ==1){
            setNewBusiness(false)
            setbusinessFormdata(item)
            setBusinessLogo({ url: BASE_URL + item.business_logo, type: "image" })
            setBusinessLogoView({ url: BASE_URL + item.business_logo, type: "image" })
            setSelectedItems(item.area_of_interest)
            setSelectedIndustry(item.industry_id)
            setstep(1)
            console.log("LicenseData[index]",LicenseData)
            setLicenseId(LicenseData[index]?._id)
            const exportCopyType = determineType(BASE_URL + LicenseData[index]?.ExportCopy);
            const businessRegisterType = determineType(BASE_URL + LicenseData[index]?.BusinessRegister);
            setExportCopy({ url:BASE_URL + LicenseData[index]?.ExportCopy, type: exportCopyType });
            setExportCopyView({ url:BASE_URL + LicenseData[index]?.ExportCopy, type: exportCopyType });
            setBusinessRegister({ url:BASE_URL + LicenseData[index]?.BusinessRegister, type: businessRegisterType})
            setBusinessRegisterView({ url:BASE_URL + LicenseData[index]?.BusinessRegister, type: businessRegisterType})
        }else{

            setLicenseId("")

            setNewBusiness(true)
            setSelectedItems([])
            setBusinessLogo(null)
            setBusinessLogoView(null)
            setSelectedIndustry([])
            setbusinessFormdata({
                city: "",
                country: "",
                area_of_interest: "",
                phone: "",
                email: "",
                designation: "",
                annual_turnover: "",
                size: "",
                company_name: "",
                company_address: "",
                user_id: "",
                type: "1",
                business_logo: ''
            });
            setExportCopy(null);
            setExportCopyView(null);
            setBusinessRegister(null)
            setBusinessRegisterView(null)
            setstep(1)

        }
    }
    return (
        <div id="main-wrapper" >
          <main id="main-section" >
                <div className='body-wrapper container-fluid' style={{ height: '100px' }}>
                    <div className='row px-lg-5'>
                        <div className='col-lg-5 col-12'>
                            <div className='card shadow-sm px-3 py-3 w-100 bg-white ' style={{ minHeight: 'auto', position: 'sticky', top: '70px' }}>
                                <span className='text-dark1 fontsubtitle font-weight-bold d-none d-md-block d-lg-block'>Profile details as been show up on main page</span>
                                <p className='text-secondary1 fontcontent2 w-100 d-none d-md-block d-lg-block'>lorem ipsum sit amet,consectutur adipisocng elit sed to incididunt labore magna aliqua </p>
                                <div className='py-3' style={{ borderBottom: '1px solid lightgrey', cursor: 'pointer' }} onClick={() => setstage(0)}>
                                    <span className='fontcontent1 font-weight-normal' style={{ color: stage == 0 ? '#4535C1' : '#6c757d' }}>Profile</span>
                                </div>
                                <div className='py-3' style={{ borderBottom: '1px solid lightgrey', cursor: 'pointer' }} onClick={() => setstage(1)}>
                                    <span className=' fontcontent1 font-weight-normal' style={{ color: stage == 1 ? '#4535C1' : '#6c757d' }}>Business</span>
                                </div>
                                {/* <div className='py-3' style={{ borderBottom: '1px solid lightgrey', cursor: 'pointer' }} onClick={() => setstage(2)}>
                                    <span className=' fontcontent1 font-weight-normal' style={{ color: stage == 2 ? '#4535C1' : '#6c757d' }}>Notification</span>
                                </div> */}
                                {/* <div className='py-3' style={{ borderBottom: '1px solid lightgrey', cursor: 'pointer' }} onClick={() => setstage(3)}>
                                    <span className=' fontcontent1 font-weight-normal' style={{ color: stage == 3 ? '#4535C1' : '#6c757d' }}>Bank Settings</span>
                                </div> */}
                                <div className='py-3' style={{ borderBottom: '1px solid lightgrey', cursor: 'pointer' }} onClick={() => setstage(4)}>
                                    <span className=' fontcontent1 font-weight-normal' style={{ color: stage == 4 ? '#4535C1' : '#6c757d' }}>Bank Info</span>
                                </div>
                            </div>
                        </div>
                        <div className='col-lg-7 col-12 pl-lg-0'>
                            {stage == 0 ? (
                                <div className='container-fluid rounded d-flex justify-content-center bg-white shadow-sm  px-0'>
                                    <div className='card shadow-none w-85  px-lg-5 py-3 mb-5 mb-lg-0'>
                                        <div className="w-100 d-flex justify-content-center">
                                            <label className="btn" htmlFor="file-upload-profile">
                                                <img
                                                    src={personalinfoprofile?.url}
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
                                        {InputField("First Name", "first_name", "text", personalformdata.first_name, handleInputChangepersonal, "Enter your first name", true)}
                                        {InputField("Last Name", "last_name", "text", personalformdata.last_name, handleInputChangepersonal, "Enter your Last Name", true)}
                                        {InputField("Email", "gmail", "text", personalformdata.gmail, handleInputChangepersonal, "Enter your Email", false)}
                                        {SelectOption("User Type", 6, "user_type", "text", personalformdata.user_type, handleInputChangepersonal, true)}
                                        {SelectOption("Country", 6, "country", "text", personalformdata.country, handleInputChangepersonal, true)}
                                        <div className="col-lg-12 col-12 mb-2 mt-3 outlined-input inputs-form">
                                            <input list="citys" name="city"
                                                placeholder=' '
                                                disabled={!personalformdata.country ? true : false}
                                                id="browser"
                                                onChange={(e) => {
                                                    const { name, value } = e.target;
                                                    Citylist(value, "personal", setCityList)
                                                    setpersonalFormdata({ ...personalformdata, [name]: value })
                                                }}
                                                className="form-control inputcontrol  fontcontent1"
                                                style={{ color: 'black', border: '1px solid black' }}
                                                value={personalformdata.city}
                                            />
                                            <label htmlFor={`exampleInput`} className="form-label mr-3 fontcontent1" style={{ fontWeight: "500", color: 'grey' }}>
                                                City
                                            </label>
                                            <datalist id="citys">
                                                {cityList.map(item => (
                                                    <option value={item.name + " " + item.state}>{item.name + " " + item.state}</option>
                                                ))}
                                            </datalist>
                                        </div>
                                        {InputField("Designation", "designation", "text", personalformdata.designation, handleInputChangepersonal, "Enter Designation", false)}
                                        {/* {InputField("About", "about", "text", personalformdata.about, handleInputChangepersonal, "Enter About", false)} */}
<div>
                                        <textarea
          id={"about"}
          name={"about"}
          value={personalformdata.about}
          onChange={handleInputChangepersonal}
          placeholder={"Enter About Us"}
          rows={4}
          className='ml-3 mt-1 w-95'
        />
        </div>
                                        <div className='mt-3 px-5 d-flex justify-content-center'>
                                            <button className='btn btn-connect w-75' onClick={() => handleusersubmit()}
                                                disabled={loading}
                                                >Update</button>
                                        </div>
                                    </div>
                                </div>
                            ):stage == 1 ? (
                                <div>
                                    {step == 0 ? (
                                        <>
                                        <div className='container-fluid px-0 bg-white rounded shadow-sm' style={{ minHeight: '58vh' }}>
                                            <div className="d-flex font-weight-bold fontsubtitle justify-content-between p-3 text-dark1">
                                                <span>
                                                    My Business
                                                </span>
                                                <span
                                                    onClick={() => ChangeBusinessItem(null,0)}
                                                    className='btn btn-connect py-2 fontcontent1'>
                                                    Add Business
                                                </span>
                                            </div>
                                            <div className='container-fluid p-1 px-5 d-flex flex-column align-items-center justify-content-center'>
                                            {Array.isArray(BusinessInfoData) && BusinessInfoData.map((item,index) => (
                                                    <div className='card shadow-sm rounded border px-3 py-2 w-85 mb-3'>
                                                        <div className="d-flex justify-content-between align-items-center">
                                                            <div className="d-flex column-gap-4">
                                                                <img src={Imagesource(item?.business_logo)} width={60} height={60} onError={handleImagePageError} style={{ borderRadius: '50%' }} />
                                                                <div className='d-flex flex-column'>
                                                                    <span className='fontsubtitle font-weight-bold text-dark1'>{item?.company_name}</span>
                                                                    <span className='fontcontent1 font-weight-light text-dark1'>{item?.phone}</span>
                                                                    <span className='fontcontent1 font-weight-normal text-dark1'>{item?.city}, {item?.country}</span>
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <button className='btn btn-outline-connect py-2 fontcontent2' onClick={() => ChangeBusinessItem(item,1,index)}>View</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                       
                                        </>
                                    ):(
                                        <div className='container-fluid px-0'>
                                            <div className='card rounded shadow px-lg-5 py-3 mb-5 mb-lg-0'>
                                                <div
                                                    className='btn btn-hover-shadow btn-light-indigo w-20'
                                                    onClick={() => setstep(0)}
                                                >
                                                    <i className='fa fa-arrow-left' />
                                                </div>
                                                {InputField("Company Name", "company_name", "text", businessformdata?.company_name, handleInputChange, "Enter your Company Name")}
                                                {InputField("Company Address", "company_address", "text", businessformdata?.company_address, handleInputChange, "Enter your Company Address")}
                                                {InputField("Business phone", "phone", "text", businessformdata?.phone, handleInputChange, "Enter your Business Phone")}
                                                {InputField("Business Email", "email", "text", businessformdata?.email, handleInputChange, "Enter your Business Email", false)}
                                                {SelectOption("Company Size", 6, "size", "text", businessformdata?.size, handleInputChange, true)}
                                                {SelectOption("Country", 6, "country", "text", businessformdata?.country, handleInputChange, true)}
                                                <div className="col-lg-12 col-12 mb-2 mt-3 outlined-input inputs-form">
                                                    <input list="citys" name="city"
                                                        placeholder=' '
                                                        disabled={!businessformdata?.country ? true : false}
                                                        id="browser"
                                                        value={step === 3 ? "" : businessformdata.city}
                                                        onChange={(e) => {
                                                            const { name, value } = e.target;
                                                            Citylist(value, "personal", setCityList)
                                                            setbusinessFormdata({ ...businessformdata, [name]: value });
                                                        }}
                                                        className="form-control inputcontrol fontcontent1"
                                                        style={{ color: 'black', border: '1px solid #767676' }}
                                                    />
                                                    <label htmlFor={`exampleInput`} className="form-label mr-3 fontcontent1" style={{ fontWeight: "500", color: 'grey' }}>
                                                        City
                                                    </label>
                                                    <datalist id="citys">
                                                        {cityList.map(item => (
                                                            <option key={item.name + item.state} value={item.name + " " + item.state}>{item.name + " " + item.state}</option>
                                                        ))}
                                                    </datalist>
                                                </div>
                                                <div className='w-100 p-3'>
                                                    <label htmlFor={`exampleInput Industry Type`} className="form-label mr-3 fontcontent1" style={{ fontWeight: "500" }}>
                                                        Industry
                                                    </label>
                                                    {/* <div className={`outlined-input col-lg-12 col-md-12 col-sm-12 my-0`}>
                                                        <input type="text"
                                                            value={filterText}
                                                            onChange={handleFilterChange}
                                                            className="form-control inputcontrol fontcontent1"
                                                            placeholder="Select Industries"
                                                            onClick={() => Setskillsview(!skillview)}
                                                        />
                                                    </div> */}
                                                    {true &&
                                                        <div className={`options my-2`}
                                                            style={{
                                                                maxHeight: "200px",
                                                                overflowY: "scroll",
                                                                display: "flex",
                                                                flexWrap: "wrap"
                                                            }}>
                                                            {options.map((item, index) => ({ title: item.title, id: item._id }))
                                                                .filter(({ title }) => !SelectedIndustry.some(selected => selected.title === title)) // Exclude selected items
                                                                .map(({ title, id }) => (
                                                                    <div
                                                                        key={id}
                                                                        className="option mx-1 px-1 py-1 my-1"
                                                                        style={{
                                                                            cursor: "pointer",
                                                                            fontSize: "12px",
                                                                            width: "fit-content"
                                                                        }}
                                                                        onClick={() => handleIndustrySelect(title, id)}>
                                                                        <label
                                                                            className='d-flex fontcontent2 justify-content-around p-2'
                                                                            style={{ borderRadius: "20px", backgroundColor: "#e9ecef", width: "fit-content" }}>
                                                                            {title}
                                                                        </label>
                                                                    </div>
                                                                ))
                                                            }
                                                        </div>
                                                    }
                                                    <div className='py-4 px-3'>
                                                        <div className='pb-4 fontsubtitle'>Selected Industry:</div>
                                                        <ul className='d-flex flex-row flex-wrap justify-content-center' style={{ columnGap: 15 }}>
                                                            {SelectedIndustry.map((item, index) => (
                                                                <div className='d-flex card flex-row align-items-center my-1' key={index}>
                                                                    <li className=' px-2 fontcontent1'
                                                                        style={{ cursor: "pointer" }}
                                                                        onClick={() => handleIndustrySelect(item.title)}>{item.title}</li>
                                                                    <span className='p-2' style={{ color: 'red', cursor: 'pointer' }}
                                                                        onClick={() => handleIndustrySelect(item.title)}><strong>&times;</strong></span>
                                                                </div>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div className='w-100 p-3'>
                                                    <label htmlFor={`exampleInput Industry Type`} className="form-label mr-3 fontcontent1" style={{ fontWeight: "500" }}>
                                                        Skill/Area of interests
                                                    </label>
                                                    <div className={`outlined-input col-lg-12 col-md-12 col-sm-12 my-0`}>
                                                        <input type="text"
                                                            value={filterText}
                                                            onChange={handleFilterChange}
                                                            className="form-control inputcontrol fontcontent1"
                                                            placeholder="Select Skill Area of interests"
                                                            onClick={() => Setskillsview(!skillview)}
                                                        />
                                                    </div>
                                                    {skillview &&
                                                        <div className={`options my-2`}
                                                            style={{
                                                                maxHeight: "200px",
                                                                overflowY: "scroll",
                                                                display: "flex",
                                                                flexWrap: "wrap"
                                                            }}>
                                                            {AllSkill.map((option, index) => ({ title: option, index })) // Map to objects containing title and index
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
                                                                    return true; // Include all options if filterText length is 1 or less
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
                                                            }
                                                        </div>
                                                    }
                                                    <div className='py-4 px-3'>
                                                        <div className='pb-4 fontsubtitle'>Selected items:</div>
                                                        <ul className='d-flex flex-row flex-wrap justify-content-center' style={{ columnGap: 15 }}>
                                                            {selectedItems.map((item, index) => (
                                                                <div className='d-flex card flex-row align-items-center my-1' key={index}>
                                                                    <li className=' px-2 fontcontent1'
                                                                        style={{ cursor: "pointer" }}
                                                                        onClick={() => handleCheckboxChange(item.title)}>{item.title}</li>
                                                                    <span className='p-2' style={{ color: 'red', cursor: 'pointer' }}
                                                                        onClick={() => handleCheckboxChange(item.title)}><strong>&times;</strong></span>
                                                                </div>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                </div>
                                                <span className="text-secondary1 fontcontent1 pl-3">* Upload your documents</span>
                                        <div className="d-flex row mx-2 mt-4 justify-content-between" >
                                            {FileinputField("Business Logo", 1, BusinessLogo, setBusinessLogo, BusinessLogoView, setBusinessLogoView)}
                                            {FileinputField("Business Document", 2, BusinessRegister, setBusinessRegister, BusinessRegisterView, setBusinessRegisterView)}
                                            {FileinputField("Export Copy", 3, ExportCopy, setExportCopy, ExportCopyView, setExportCopyView)}
                                        </div>
                                                <div className='mt-3 px-3'>
                                                    <button className='btn btn-connect w-100' onClick={() => AddBusinessInfo()}>Update</button>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ) : stage == 2 ? (
                                null
                            ) : (
                                <div className='container-fluid px-0'>
                                    <div className='card rounded shadow px-lg-5 px-2 py-3 mb-5 mb-lg-0'>
                                        <span className='text-secondary1 fontcontent1 mb-4'>* indicates required</span>
                                        {InputField("Transit Number", "transit_number", "text", bankformdata.transit_number, handleInputChangebank, "Enter your Transit Number")}
                                        {InputField("Institution Number", "institution_number", "text", bankformdata.institution_number, handleInputChangebank, "Enter your Institution Number")}
                                        {InputField("Account Number", "account_number", "text", bankformdata.account_number, handleInputChangebank, "Enter your Account Number")}
                                        <div className='mt-3 px-5 d-flex justify-content-center'>
                                            <button className='btn btn-connect w-75' onClick={() => AddBankData()}>Update</button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
            {imagecropmodal()}
        </div>
    )
}
export default Profile