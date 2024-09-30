import React, { useState, useEffect } from 'react';
import '../Details/details.css';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useNavigate} from 'react-router-dom';
import FetchData from '../../../fetch-api/Apifetch';
import { BASE_URL } from '../../../utils/ApiRoute';
function Alldetails() {
  const navigate = useNavigate();
  const [bankDetails, setBankDetails] = useState(null);
  const [userData, setUserData] = useState(null);
  const [userList, setUserList] = useState([]);
  const [businessInfo, setBusinessInfo] = useState(null);
  const [businessContact, setBusinessContact] = useState(null);
  const [selectedSection, setSelectedSection] = useState('userDetails');
  const [license, setLicense] = useState([]);
  const { id } = useParams();


  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await FetchData(`/detail/user/${id}`, 'GET', null, true, false);
        if (res.success) {
          console.log(res.data);
          setBankDetails(res.data.BankInfoData);
          setUserData(res.data.user);
          setBusinessContact(res.data.BusinessContact);
          setBusinessInfo(res.data.BusinessInfoData[0]);
          setLicense(res.data.License[0])
        } else {
          console.error("Error fetching details:", res.message);
        }
      } catch (error) {
        console.error("Error fetching details:", error.message);
      }
    };

    fetchData();
  }, [id]);

  const showSection = (section) => {
    setSelectedSection(section);
  };

  const ViewLicense = (image,title)=>{
    return(
      <a href={BASE_URL + image} target="_blank"   className='mx-4 px-1 mx-auto' rel="noopener noreferrer">
      <img src={BASE_URL + image} alt="" width={150} height={150}
       style={{ borderRadius: 10 }} />
      <p className="px-3">{title}</p>
   </a>
    )
  }
  const renderSection = () => {
    switch (selectedSection) {
      case 'userDetails':
        return (
          <form className="col userform">
            <div className='d-flex flex-column card p-3' style={{ border: "0.5px solid rgb(226, 225, 225)" }}>
              <div className="row">
                <div className=" col-6">
                  <label htmlFor="firstName">First Name</label>
                  <input type="text" className="form-control mb-3" id="firstName" value={userData?.first_name || ''} placeholder='Enter the first name' readOnly />
                </div>
                <div className=" col-6">
                  <label htmlFor="lastName">Last Name</label>
                  <input type="text" className="form-control mb-3" id="lastName" value={userData?.last_name || ''} placeholder='Enter the last name' readOnly />
                </div>
                <div className="col-6">
                  <label htmlFor="email">Email</label>
                  <input type="text" className="form-control mb-3" id="email" value={userData?.gmail || ''} placeholder='Enter the email' readOnly />
                </div>
                <div className="col-6">
                  <label htmlFor="dob">Date of Birth</label>
                  <input type="text" className="form-control mb-3" id="dob" value={userData?.date_of_birth || ''} placeholder='Enter the dob' readOnly />
                </div>
                <div className="col-6">
                  <label htmlFor="city">City</label>
                  <input type="text" className="form-control mb-3" id="city" value={userData?.city || ''} placeholder='Enter the city' readOnly />
                </div>
                <div className="col-6">
                  <label htmlFor="country">Country</label>
                  <input type="text" className="form-control mb-3" id="country" value={userData?.country || ''} placeholder='Enter the country' readOnly />
                </div>
                <div className="col-6">
                  <label htmlFor="country">User Type</label>
                  <input type="text" className="form-control mb-3" id="country" value={userData?.user_type =="0"?"Buyer":userData?.user_type =="2"?"Seller":"Business Partner"} placeholder='Enter the country' readOnly />
                </div>
                <div className="col-6">
                  <label htmlFor="country">Gender</label>
                  <input type="text" className="form-control mb-3" id="country" value={userData?.gender} placeholder='Enter the country' readOnly />
                </div>
              </div>
            </div>
          </form>
        );
      case 'bankDetails':
        return (
          <form className="col userform">
            <div className='d-flex card p-3' style={{ border: "0.5px solid rgb(226, 225, 225)" }}>
              <div className="row">
                <div className="col-6">
                  <label htmlFor="transitNumber">Transit Number</label>
                  <input type="text" className="form-control mb-2" id="transitNumber" value={bankDetails?.transit_number || ''} placeholder='Enter the Transit number' readOnly />
                </div>
                <div className="col-6">
                  <label htmlFor="accountNumber">Account Number</label>
                  <input type="text" className="form-control mb-2" id="accountNumber" value={bankDetails?.account_number || ''} placeholder='Enter the Account number' readOnly />
                </div>
              </div>
              <div className="row">
                <div className="col-6">
                  <label htmlFor="institutionNumber">Institution Number</label>
                  <input type="text" className="form-control mb-2" id="institutionNumber" value={bankDetails?.institution_number || ''} placeholder='Enter Institution number' readOnly />
                </div>
              </div>
            </div>
            {/* <div className="form-group">
              <label htmlFor="status">Status</label>
              <input type="text" className="form-control" id="status" value={bankDetails?.status === 0 ? 'Inactive' : 'Active'} readOnly />
            </div> */}
          </form>
        );
      case 'businessInfo':
        return (
          <form className="col userform">
            <div className='d-flex card p-3' style={{ border: "0.5px solid rgb(226, 225, 225)" }}>
              <div className="row">
                <div className="col-6 ">
                  <label htmlFor="companyName">Company Name</label>
                  <input type="text" className="form-control mb-3" id="companyName" value={businessInfo?.company_name || ''} placeholder='Enter company name' readOnly />
                </div>
                <div className="col-6 ">
                  <label htmlFor="businessContact">Business Contact</label>
                  <input type="text" className="form-control mb-3" id="businessContact" value={businessInfo?.phone || ''} placeholder='Enter business contact' readOnly />
                </div>
                <div className="col-6">
                  <label htmlFor="businessContact">Business Email</label>
                  <input type="text" className="form-control mb-3" id="businessContact" value={businessInfo?.email || ''} placeholder='Enter business email' readOnly />
                </div>
                <div className="col-6">
                  <label htmlFor="address">Annual-turnover </label>
                  <input type="text" className="form-control mb-3" id="address" value={businessInfo?.annual_turnover || ''} placeholder='Enter annual-turnover' readOnly />
                </div>
                <div className="col-6">
                  <label htmlFor="country">Country</label>
                  <input type="text" className="form-control mb-3" id="country" value={businessInfo?.country || ''} placeholder='Enter country' readOnly />
                </div>
      
                <div className="col-6">
                  <label htmlFor="country">Company-Size</label>
                  <input type="text" className="form-control mb-3" id="country" value={businessInfo?.size || ''} placeholder='Enter company-size' readOnly />
                </div>
                <div className="col-6">
                  <label htmlFor="city">City</label>
                  <input type="text" className="form-control mb-3" id="city" value={businessInfo?.city || ''} placeholder='Enter city' readOnly />
                </div>
                <div className="col-6">
                  <label htmlFor="city">Type</label>
                  <input type="text" className="form-control mb-3" id="city" value={businessInfo?.type === '0' ? 'Individual' : businessInfo?.type === '1' ? 'Company' : ''} placeholder='Enter the type' readOnly />
                </div>
                <div className="col-6">
                  <label htmlFor="industry">Industry (Area of Interests)</label>
                  <input
                    type="text"
                    className="form-control mb-3"
                    id="industry"
                    value={businessInfo?.area_of_interest.map(area => area.title).join(', ') || ''}
                    placeholder='Enter the area_of_interest'
                    readOnly
                  />
                </div>
              </div>
            </div>
          </form>
        );
      case 'license':
        return (
          <div className='rounded' style={{ border: "0.5px solid rgb(226, 225, 225)", height: '100%' }}>
            <div className="d-flex flex-wrap justify-content-around">
            {ViewLicense(license?.PanCard,"Pan Card")}
            {ViewLicense(license?.AddressProof,"Address Proof")}
            {ViewLicense(license?.NationalID,"National Id")}
            {ViewLicense(license?.GstCertificate,"Gst Certificate")}
            {ViewLicense(license?.BusinessRegister,"BUsiness Certificate")}
            {ViewLicense(license?.BankPassbook,"Bank Passbook")}
            {ViewLicense(license?.ExportCopy,"Export Copy")}     
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="body-wrapper">
      <div className="container-fluid">
        <div className="card bg-info-subtle shadow-none position-relative overflow-hidden mb-3">
          <div className="card-body px-4 py-3">
            <div className="row align-items-center">
              <div className="col-9">
                <h4 className="fw-semibold mb-8">User Details</h4>
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a className="text-muted text-decoration-none" href="/">
                        Home
                      </a>
                    </li>
                    <li className="breadcrumb-item" aria-current="page">
                      User Details
                    </li>
                  </ol>
                </nav>
              </div>
              <div className="col-3">
                <div className="text-center mb-n5">
                  <img src="/assets/images/breadcrumb/ChatBc.png" alt="" className="img-fluid mb-n4" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="content m-5 mt-2">

        <div className="row">
          <div>
            <i 
            className="fa fa-arrow-left font-weight-bold m-2" 
            style={{cursor:"pointer"}}
            onClick={()=>navigate(-1)}
            />
          </div>
          <div className='col-3'>
            <div className='alldetails'>
              <p href="#" onClick={() => showSection('userDetails')} className={selectedSection === 'userDetails' ? 'active-section' : ''}>
                <p style={{ marginLeft: "10px" }} className='mb-0'>Personal Information</p>
              </p>
              <p href="#" onClick={() => showSection('businessInfo')} className={selectedSection === 'businessInfo' ? 'active-section' : ''}>
                <p style={{ marginLeft: "10px" }} className='mb-0'>Business Information</p>
              </p>
              <p href="#" onClick={() => showSection('license')} className={selectedSection === 'license' ? 'active-section' : ''}>
                <p style={{ marginLeft: "10px" }} className='mb-0'>License</p>
              </p>
              <p href="#" onClick={() => showSection('bankDetails')} className={selectedSection === 'bankDetails' ? 'active-section' : ''}>
                <p style={{ marginLeft: "10px" }} className='mb-0'>Bank Details</p>
              </p>
            </div>
          </div>
          <div className='col-8'>
            {renderSection()}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Alldetails;
