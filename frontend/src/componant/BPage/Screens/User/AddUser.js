import React, { useState, useEffect } from 'react';
import location from "../../../utils/Country.json"
import { toast } from 'react-toastify';
import FetchData from '../../../fetch-api/Apifetch';
import AllSkill from '../../../../all_skills'
// import Upload from './Assets/upload.png'
// import Close from './Assets/close.png'
// import { LoaderSpin } from '../../../utils/Function';

const Lead = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [cityList, setCityList] = useState([]);
    const [bus_cityList, setBus_cityList] = useState([]);
    const Citylist = (title, label = "personal", setData) => {
        const filteredCities = [];
        var data = []
        if (label == "personal") {
            data = location.find(item => item.name == personalformdata.country)
        } else {
            data = location.find(item => item.name == businessformdata.country)
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
    const FetchApiData = async (id) => {
        const res = await FetchData("skill/" + id, 'GET', null, false, false);
        Setskills(res.data.data)
    }
    const [userList, setUserList] = useState([]);
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
        type: "1"
    });
    const [personalformdata, setpersonalFormdata] = useState({
        first_name: "",
        last_name: "",
        date_of_birth: "",
        // designation: '',
        gender: "",
        gmail: "",
        phone: "",
        country: "",
        city: "",
        password: "QC@1234",
        confirm_password: "QC@1234",
        user_type: "",
        login_type: "1",
        password: "",
        confirm_password: "",
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

    const [errors, setErrors] = useState({});
    const [Alphanumaric, setAlphanumaric] = useState(false);
    const [passwordmatch, setpasswordmatch] = useState(false);
    const [skill, Setskills] = useState([])
    const [selectedItems, setSelectedItems] = useState([]);
    const [skillview, Setskillsview] = useState(false)
    const [options, setOptions] = useState([]);
    const [filterText, setFilterText] = useState('');
    const [loading, setLoading] = useState(false);


    const PasswordField = (title, col = 6, name, type, value, onChange, desble = false) => {

        return (
            <div className={`col-lg-${col} col-md-${col} col-sm-12 my-2`}>
                <label style={{color:'black',fontWeight:'600'}}>{`${title}`}</label>
                <input
                    className="form-control"
                    type={showPassword ? 'text' : 'password'}   
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder=" "
                />
            </div>
        );
    };

    const handleFilterChange = (event) => {
        setFilterText(event.target.value);
    };

    useEffect(() => {
        dataList()
    }, [])


    const handleCheckboxChange = (title) => {
        if (selectedItems.includes(title)) {
            setSelectedItems(selectedItems.filter(item => item !== title));
        } else {
            setSelectedItems([...selectedItems, title]);
        }
    }
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
                // If password does not meet the criteria, set Alphanumaric to true
                setAlphanumaric(true);
            } else {
                // If password meets the criteria, set Alphanumaric to false
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


    const clearFormData = () => {
        setSelectedItems([])
        setPanCard('');
        setAddressProof('');
        setNationalID('');
        setBusinessRegister('');
        setGstCertificate('');
        setBankPassbook('');
        setExportCopy('');
        setPanCardView('');
        setPanCardView('')
        setAddressProofView('')
        setNationalIDView('')
        setBusinessRegisterView('')
        setGstCertificateView('')
        setBankPassbookView('')
        setExportCopyView('');
        setLicenceFormdata({
            PanCard: "",
            AddressProof: "",
            NationalID: "",
            BusinessRegister: "",
            GstCertificate: "",
            BankPassbook: "",
            ExportCopy: "",
        });

        setbankFormdata({
            transit_number: "",
            account_number: "",
            institution_number: "",
            user_id: ""
        });
        setpersonalFormdata({
            first_name: "",
            last_name: "",
            date_of_birth: "",
            designation: 'tester',
            gender: "",
            gmail: "",
            phone: "",
            country: "",
            city: "",
            password: "",
            confirm_password: "",
            user_type: "",
            login_type: "1",
        });
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
            type: "1"
        });
    }
    

    const AddBusinessInfo = async (id) => {
        try {
            const token = false;
            const updatedFormData = {
                city: businessformdata.city,
                country: businessformdata.country,
                area_of_interest: businessformdata.area_of_interest,
                phone: businessformdata.phone,
                email: businessformdata.email,
                company_name: businessformdata.company_name,
                company_address: businessformdata.company_address,
                user_id: id,
                area_of_interest: selectedItems.map((industry) => ({ title: industry })),
            };
            const keysWithEmptyValues = Object.keys(updatedFormData).filter(
                (key) => !updatedFormData[key]
            );
            if (keysWithEmptyValues.length > 0) {
                const missingKeys = keysWithEmptyValues.join(', ');
                toast.error(`Please provide values for the following fields: ${missingKeys.replaceAll(/_/gi, " ")}`);
                return false;
            }
            if (selectedItems.length == 0) {
                toast.error(`Please select the area of interest`);
                return false;
            }
            updatedFormData.annual_turnover = businessformdata.annual_turnover
            updatedFormData.size = businessformdata.size
            const res = await FetchData("business_info", 'POST', JSON.stringify(updatedFormData), token, false);
            return true;
        } catch (error) {
            return false;
        }
    }

    const addLicenceImages = async (id = "664c3e16902cc48be1009a13") => {
        const formdata = new FormData();
        formdata.append("user_id", id);
        formdata.append(`PanCard`, PanCard);
        formdata.append(`AddressProof`, AddressProof);
        formdata.append(`NationalID`, NationalID);
        formdata.append(`BusinessRegister`, BusinessRegister);
        formdata.append(`GstCertificate`, GstCertificate);
        formdata.append(`BankPassbook`, BankPassbook);
        formdata.append(`ExportCopy`, ExportCopy);
        if (!PanCard || !AddressProof || !NationalID || !BusinessRegister || !GstCertificate || !BankPassbook || !ExportCopy) {
            toast.error("Please upload all required file documents.");
            return false;
        }
        try {
            const res = await FetchData("add/license", "POST", formdata, true, true)
            return true
        } catch (error) {
            toast.success(error.message);
            return false;
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
                } else if (file.type === "application/pdf") {
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
            <div className="align-items-center col-5 d-flex my-1 py-1 m-1" style={{ border: "1px solid" }}>
                <div className="align-items-center  justify-content-between w-100">


                    <div className="d-flex justify-content-start align-items-center ">
                        {!value &&
                            <label className="btn" htmlFor={`file-upload-${title}`}>
                                <img src={"data:image/png;base64,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"} alt='upload' style={{ width: '30%', marginLeft: '30px' }} />
                            </label>}
                        <input type="file" onChange={handleFileChange} id={`file-upload-${title}`} name="test" accept=".jpg, .png, .pdf" placeholder={title} className="d-none" />
                        {view && view.type === "image" && (
                            <div id="image-preview" style={{ display: 'flex', justifyContent: 'center' }}>
                                <img src={view.url} alt="Preview" height="100px" width='100%' />
                            </div>
                        )}
                        {view && view.type === "pdf" && (
                            <div id="pdf-preview" style={{ width: '100%', height: '100px' }}>
                                <embed src={view.url} type="application/pdf" width="100%" height="100%" />
                            </div>
                        )}
                        {value &&
                            <img src={"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAADPklEQVR4nO2Za2/SUBjH+Q6Gbq8McxoU2Si0MO73S7nDdui29DPuxZyJJmoyMH4Rx61QoJT4pm3ymEPkjbqtLe0Qwz/pW/r7lXOenuepzbbLLrv8//lRv2wsapddqXrRlSpsw6r7jKlEg/fGuzwZ6w7dUXPuI9U4tKhdKovqBSwq5yCVWFVkWM5mcngygXgyrozIOPDHMRi6I+rQHeZMhV+UWSwAc6aligzirILnj6LAuyMwcAXVoSvImQovFVsgMQjE/Kkq5pucVfDDtyEYvglC/3VA7Tn9nJE1fy/8vHAG8/wpiLmmImYbrFH4kS/FPgQ/eH0CA2cA+i9ppXdI1TX/MN6wj8HPc00Qsw2YZeqKmKqyVsEPXvmxAPRfeL9r/nGpen6nBV7M1EFM12CaquqS0A1/6IOeg9QhUGEbUplVtMDPUlWYJaswjVeUSbzEWgHfdZBKz0FqX0JLCaaF5sWWogV+lqjANF6GSbSoTsMMZ3TDDv4Gf0Cqveceg5WIaSGxcKZogZ/GSjCNFEEI5dVpMM9tHH6VWa6JflWbR+En4QJMQnkYn2TVsT/DbRx+lVm6hpbVRgO8EMyBEMjCmE4vJTYOvwquMrjaaIEX/BksACNvUjGyYbsOj+F3y4OZJcpomqjIWuDHviSMvAnY+JP/PUK0jCaxkryV8KsIIQYJ4YK8lfCrCKEcGgdz8lbCryIE0mjsz8hbCb8KT6XRyJuUtxIex0idvzsg1Rvi6OvVs00/fYPw74jjb1d2D1zbPerNpiTWhyfhvd0LHwmv+onwcVsK74MvBAXtPUptEzrbxn8HnobO8noCCevgaesljJ4qtcPTKwnlds9v7mFunSPxlf0IXds9sjZ42vx/wozz/I2dRB8Ir6wNnjZPwsxm5LOdQrd7tKwNnl5fwopOqrNPofZTSIzxlNiiTgpvULxRdUoobULHZA6PuK1sAw1JEJT2wRZPxu6s7mF1SxA6BPDHhaE7oljdgN9qltC5hHB4VwgNXEHF6vN8Z59CD0usUYn6rgDqOwOK1c1I514JE94FfWcA4fm81Z1U5w8JE9/G+OMCns/jEbfuKbGOtAmqjjcrvnSv+V122cW2lfkJLsRzLEFk6YUAAAAASUVORK5CYII="} alt='close' height='10px' style={{ margin: '10%' }} onClick={() => {
                                setValue(null)
                                setView(null)
                            }} />
                        }
                        <div className='title-proof'>
                            <label htmlFor="test">{title}</label>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
    const handleusersubmit = async () => {

        setLoading(true);
        const formselect = new FormData();
        const UserData = {
            gmail: personalformdata.gmail,
            first_name: personalformdata.first_name,
            last_name: personalformdata.last_name,
            date_of_birth: personalformdata.date_of_birth,
            gender: personalformdata.gender,
            phone: personalformdata.phone,
            country: personalformdata.country,
            city: personalformdata.city,
            password: personalformdata.password,
            confirm_password: personalformdata.confirm_password,
            designation: "full stack Developer",
            user_type: personalformdata.user_type == "Buyer" ? "0" : personalformdata.user_type == "Seller" ? 2 : 1,
            login_type: personalformdata.login_type,
        }

        const userEmptyValues = Object.keys(UserData).filter(
            (key) => !UserData[key]
        );
        if (userEmptyValues.length > 0) {
            const usermissingKeys = userEmptyValues.join(', ');
            setLoading(false);
            toast.error(`Please provide values for the following fields: ${usermissingKeys.replaceAll(/_/gi, " ")}`);

            return;
        }
        formselect.append("data", JSON.stringify(UserData));
        const res = await FetchData("add/user", 'POST', formselect, false, true);
        if (res.success) {
            console.log("userResponse", res.data.data._id) //"664c3e16902cc48be1009a13"
            const bankinfo = await AddBusinessInfo(res.data.data._id)
            const license = await addLicenceImages(res.data.data._id)
            const bankdata = await AddBankData(res.data.data._id)
            if (bankinfo && license && bankdata) {
                await clearFormData()
                setLoading(false);
                toast.success("User Data Stored Successfully")
            }
        }
        setLoading(false);
    }

    const AddBankData = async (id) => {
        try {

            const formdata = {
                transit_number: bankformdata.transit_number,
                account_number: bankformdata.account_number,
                institution_number: bankformdata.institution_number,
                user_id: id
            }
            const token = false;
            const res = await FetchData("bank_info", 'POST', JSON.stringify(formdata), token, false);
            return true

        } catch (error) {
            return false

        }
    }



    const InputField = (label, name, type, value, onChange, placeholder, caplatize) => (
        <div className="col-3 mb-2 mt-3 inputs-form">
            <label htmlFor={`exampleInput${name}`} className="form-label mr-3" style={{ fontWeight: "500" }}>
                {label}
            </label>
            <input
                type={type}
                className="form-control inputcontrol"
                name={name}
                value={value}
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
                placeholder={placeholder}
            />
        </div>
    );






    const SelectOption = (title, col = 3, name, type, value, onChange) => {
        var options = []
        var con = true
        if (name == "user_type") {
            options = [
                "Buyer",
                "Seller",
                "Business Partner",
            ]


        } else if (name == "gender") {
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
                "1 - 10",
                "11 - 50",
                "51 - 100",
                "101 - 200",
                "201 - 500",
                "501 - 1000"
            ]
        }
        else if (name === "country") {
            options = location.map(item => item.name);
        }
        else {
            con = false
            options = userList;
        }
        return (
            <div className="col-3 mb-2 mt-3 inputs-form">
                <label htmlFor={`exampleInput${title}`} className="form-label mr-3" style={{ fontWeight: "500" }}>
                    {title}
                </label>
                <select
                    name={name}
                    value={value}
                    className='form-control'
                    onChange={onChange}
                >
                    <option value={""}>Select Option</option>
                    {options.map(item => (
                        con ? <option value={item}>{item}</option> : <option value={item.userdata._id}>
                            {item.userdata.first_name} {item.userdata.last_name}
                        </option>
                    ))}
                </select>
            </div>
        )
    }

    return (
        <div className="body-wrapper">
            {/* {loading == true ? (
                <LoaderSpin />
            ) : null} */}
            <div className='float-end  mb-2 px-4 rbc-btn-group1'>
            </div>
            <div className='card m-4 p-3' style={{ backgroundColor: '#ffff' }} >
                <h4 className='m-1'>Personal Info</h4>
                <div className='card mx-2 my-3'  >
                    <div className="d-flex justify-content-between align-items-center mx-2">
                        {InputField("First Name", "first_name", "text", personalformdata.first_name, handleInputChangepersonal, "Enter your first name", true)}
                        {InputField("Last Name", "last_name", "text", personalformdata.last_name, handleInputChangepersonal, "Enter your Last Name", true)}
                        {InputField("Email", "gmail", "text", personalformdata.gmail, handleInputChangepersonal, "Enter your Email", false)}
                    </div>
                    <div className="d-flex justify-content-between align-items-center mx-2">
                        {InputField("DOB", "date_of_birth", "date", personalformdata.date_of_birth, handleInputChangepersonal, "Enter your DOB", false)}

                        {SelectOption("Gender", 6, "gender", "text", personalformdata.gender, handleInputChangepersonal, true)}
                        {InputField("Phone", "phone", "text", personalformdata.phone, handleInputChangepersonal, "Enter your phone number")}

                    </div>
                    <div className="d-flex justify-content-between align-items-center mx-2">
                        {SelectOption("User Type", 6, "user_type", "text", personalformdata.user_type, handleInputChangepersonal, true)}
                        {SelectOption("Country", 6, "country", "text", personalformdata.country, handleInputChangepersonal, true)}
                        <div className="col-3 mb-2 mt-3 inputs-form">
                            <label htmlFor={`exampleInput`} className="form-label mr-3" style={{ fontWeight: "500" }}>
                                City
                            </label>
                            <input list="citys" name="city"
                                placeholder='Enter your city'
                                disabled={!personalformdata.country ? true : false}
                                id="browser"
                                onChange={(e) => {
                                    const { name, value } = e.target;
                                    Citylist(value, "personal", setCityList)
                                    setpersonalFormdata({ ...personalformdata, [name]: value });
                                }}
                                className="form-control inputcontrol" />
                            <datalist id="citys">
                                {cityList.map(item => (
                                    <option value={item.name + " " + item.state}>{item.name + " " + item.state}</option>
                                ))}
                            </datalist>
                        </div>
                    </div>
                    <div className="d-flex justify-content-center align-items-center mx-2 w-100">
                    <div className='d-flex flex-column w-100'>
                    {PasswordField("Password", 10, "password", "password", personalformdata.password, handleInputChangepersonal, false)}
                     {personalformdata.password != "" && Alphanumaric && <span className='text-danger mx-4 small' >Strong password, consider using a mix of alphabetic numbers, and special symbols.</span>}
                    </div>
                    
                    <div className='d-flex flex-column w-100'>
                                            {PasswordField("Confirm Password", 10, "confirm_password", "password", personalformdata.confirm_password, handleInputChangepersonal, false)}
                                            {passwordmatch && <span className='text-danger mx-4 small' style={{ width: "100%", marginBottom: ".2rem" }}>Password not match </span>}
                    </div>
                    </div>
                </div>
                <h4 className='m-1'>Business Info</h4>
                <div className='card mx-2 my-3'  >
                    <div className="d-flex justify-content-between align-items-center mx-2">
                        {InputField("Company Name", "company_name", "text", businessformdata.company_name, handleInputChange, "Enter your Company Name")}
                        {InputField("Company Address", "company_address", "text", businessformdata.company_address, handleInputChange, "Enter your Company Address")}
                        {InputField("Business phone", "phone", "text", businessformdata.phone, handleInputChange, "Enter your Business Phone")}
                    </div>
                    <div className="d-flex justify-content-between align-items-center mx-2">
                        {InputField("Business Email", "email", "text", businessformdata.email, handleInputChange, "Enter your Bussiness Email", false)}
                        {SelectOption("Annual Income", 6, "annual_turnover", "text", businessformdata.annual_turnover, handleInputChange, true)}
                        {SelectOption("Company Size", 6, "size", "text", businessformdata.size, handleInputChange, true)}
                    </div>
                    <div className="d-flex justify-content-between align-items-center mx-2">
                        {SelectOption("Country", 6, "country", "text", businessformdata.country, handleInputChange, true)}
                        <div className="col-3 mb-2 mt-3 inputs-form">
                            <label htmlFor={`exampleInput`} className="form-label mr-3" style={{ fontWeight: "500" }}>
                                City
                            </label>
                            <input list="citys" name="city"
                                placeholder='Enter your city'
                                disabled={!businessformdata.country ? true : false}
                                id="browser"
                                onChange={(e) => {
                                    const { name, value } = e.target;
                                    Citylist(value, "personal", setCityList)
                                    setbusinessFormdata({ ...businessformdata, [name]: value });
                                }}
                                className="form-control inputcontrol" />
                            <datalist id="citys">
                                {cityList.map(item => (
                                    <option value={item.name + " " + item.state}>{item.name + " " + item.state}</option>
                                ))}
                            </datalist>
                        </div>
                        <div className="col-3 mb-2 mt-3 inputs-form">
                            <label htmlFor={`exampleInput Industry Type`} className="form-label mr-3" style={{ fontWeight: "500" }}>
                                Industry Type
                            </label>
                            <select
                                className='form-control'
                                id="exampleInputCountry"
                                placeholder=" "
                                onChange={(e) => {
                                    FetchApiData(e.target.value);
                                    Setskillsview(false)
                                }}
                                aria-describedby="countryHelp">
                                <option value="">Industry Type</option>
                                {options && options.map((item) => (
                                    <option value={item._id}>{item.title}</option>
                                ))}
                            </select>
                        </div>


                    </div>
                    <div className='w-100  p-3'>
                        <label htmlFor={`exampleInput Industry Type`} className="form-label mr-3" style={{ fontWeight: "500" }}>
                            Skill/Area of interests </label>
                        <div className={`outlined-input col-lg-12 col-md-12 col-sm-12 my-0`}>
                            <input type="text"
                                value={filterText}
                                onChange={handleFilterChange}
                                className="form-control inputcontrol"
                                placeholder="Select Skill Area of interests"
                                onClick={() => Setskillsview(true)}
                            />

                        </div>
                        <div className={`options mt-2 mb-2`} style={{ maxHeight: "200px", overflowY: "scroll" ,display:'flex',flexWrap:'wrap'}}>
                            {AllSkill.filter(option => option.toLowerCase().includes(filterText?.toLowerCase()))
                                .filter(option => !selectedItems.includes(option))
                                .slice(0, 100).map((optiontext, index) => (
                                    <div key={index} className="card my-1 m-1  option px-3 py-1 text-center"
                                        style={{ cursor: "pointer", width: 'fit-content', backgroundColor: 'rgb(233, 236, 239)', borderRadius: "20px" }}
                                        onClick={() => handleCheckboxChange(optiontext)}>
                                        <label>{optiontext}</label>
                                    </div>
                                ))}
                        </div>
                        <div className='py-4 px-3'>
                            <div className='pb-4'> Select maximum 5 skills:</div>
                            <div className='pb-4'>Selected items:</div>
                            <ul className='d-flex flex-row flex-wrap justify-content-start' style={{ columnGap: 15 }}>
                                {selectedItems.map((item, index) => (
                                    <div className='d-flex card flex-row align-items-center my-1' style={{backgroundColor:'#4535C1',color:'white',borderRadius:'20px'}}>
                                        <li key={index} className=' px-2'
                                            style={{ cursor: "pointer" }}
                                            onClick={() => handleCheckboxChange(item)}>{item}</li>
                                        <span className='p-2' style={{ color: 'red', cursor: 'pointer' }}
                                            onClick={() => handleCheckboxChange(item)}><strong>&times;</strong></span>
                                    </div>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
                <h4 className='m-1'>License</h4>
                <div className='card mx-2 my-3'  >
                    <div className="d-flex align-items-center mx-2 justify-content-between" >
                        {FileinputField("ID Proof", 1, PanCard, setPanCard, PanCardView, setPanCardView)}
                        {FileinputField("Address Proof", 2, AddressProof, setAddressProof, AddressProofView, setAddressProofView)}
                    </div>
                    <div className="d-flex justify-content-between align-items-center mx-2" >

                        {FileinputField("Nation ID/Driving License", 3, NationalID, setNationalID, NationalIDView, setNationalIDView)}
                        {FileinputField("Business Card", 4, BusinessRegister, setBusinessRegister, BusinessRegisterView, setBusinessRegisterView)}

                    </div>
                    <div className="d-flex justify-content-between align-items-center mx-2" >
                        {FileinputField("GST Certificate", 5, GstCertificate, setGstCertificate, GstCertificateView, setGstCertificateView)}
                        {FileinputField("Bank Passbook", 6, BankPassbook, setBankPassbook, BankPassbookView, setBankPassbookView)}
                    </div>
                    <div className="d-flex justify-content-between align-items-center mx-2" >
                        {FileinputField("Export Copy", 7, ExportCopy, setExportCopy, ExportCopyView, setExportCopyView)}
                    </div>
                </div>
                <h4 className='m-1'>Bank Info</h4>
                <div className='card mx-2 my-3'  >
                    <div className="d-flex justify-content-between align-items-center mx-2" >
                        {InputField("Transit Number", "transit_number", "text", bankformdata.transit_number, handleInputChangebank, "Enter your Transit Number")}
                        {InputField("Institution Number", "institution_number", "text", bankformdata.institution_number, handleInputChangebank, "Enter your Institution Number")}
                        {InputField("Account Number", "account_number", "text", bankformdata.account_number, handleInputChangebank, "Enter your Account Number")}
                    </div>
                </div>
                <div className="d-flex justify-content-end">
                    <button className='btn btn-danger m-2' onClick={() => clearFormData()} >Cancle</button>
                    <button className='btn btn-success m-2' disabled={loading} onClick={() => handleusersubmit()}>Submit</button>
                </div>
            </div>
        </div>
    )
}

export default Lead