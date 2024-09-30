import React,{useState,useEffect} from 'react'
import { Imagesource,handleImageError, handleImagePageError, Splittext } from "../../../../utils/Function";
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import FetchData from '../../../../fetch-api/Apifetch'
import { Modal } from 'react-bootstrap';
const ProfileView = () => {
    const { id } = useParams();
    const [viewModal , setviewModal] = useState(false)
    // const [BusinessData, setBusinessData] = useState(JSON.parse(localStorage.getItem('LOGINDATA'))?.BusinessInfoData)
    const [BusinessData, setBusinessData] = useState([])
    const [User, setUser] = useState({})
    const [Showtext,setShowtext]=  useState(false)
    const [formdata, setformdata] = useState({
        designation:'',
        company:'',
        from_date:'',
        to_date:''
    })
    const [errors, setErrors] = useState({});

    useEffect(()=>{
        userDetial()
    },[])
    const userDetial = async() => {
        try {
          const res = await FetchData(`/detail/user/${id}`, 'GET', null, true, false);
          if (res.success) {
            const { user, BusinessInfoData, BankInfoData ,License} = res.data;
            setBusinessData(BusinessInfoData)
            setUser(user)
          }
        } catch (err){
            console.log(err)
        }
    }
    const listDisg = async() => {
        try {
          const res = await FetchData(`/list/designation/${id}`, 'GET', null, true, false);
          if (res.success) {
       
          }
        } catch (err){
            console.log(err)
        }
    }

    const InputField = (label, name, type, value, onChange, placeholder, error) => (
        <div className="col-12 mb-2 mt-3 inputs-form">
          <label htmlFor={`exampleInput${name}`} className="form-label mr-3" style={{ fontWeight: "500" }}>
            {label}
          </label>
          <input
            type={type}
            className="form-control inputcontrol"
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
          />
          {error && <div className="text-danger">{error}</div>}
        </div>
      );
      const handleInputChange = (e) => {
        let error = '';
        const { name, value } = e.target;
        let updatedEvent = { ...formdata, [name]: value };
        setformdata(updatedEvent);
        setErrors({ ...errors, [name]: error });
      };

  const HandleUpdate = async () => {
    try {
      var Object = {
        user_id:id, 
        data:[formdata]
      }
      const res = await FetchData(`add/designation`, 'POST', JSON.stringify(Object), true, false);
      if (res.success) {
        alert("successfully Added")
      }
    } catch (err) {
      console.log(err)
    }
  }
    return (
        <>
        <div className='card border rounded  mb-1 px-4 py-3'>
              <div className='d-flex justify-content-between align-items-center'>
                <span className="fontsubtitle font-weight-bold text-dark1">About</span>
                {/* <i class="fa fa-plus fontsubtitle text-dark1" onClick={()=>setviewModal(true)} aria-hidden="true"></i> */}
                </div>
                {User?.about ? (
  <>
    {Showtext ? User?.about : (User?.about?.length > 150 ? Splittext(User?.about, 25) + " ..." : User?.about)}
    
    {User?.about.length > 150 && (
      <span
        className="fontcontent2 font-weight-light text-connect1"
        style={{ cursor: 'pointer' }}
        onClick={() => setShowtext(!Showtext)} // Corrected onClick handler
      >
        {Showtext ? 'see less' : 'see more'}
      </span>
    )}
  </>
) : (
  <div className='py-2 text-center'>
    <img src='/images/busi_images/noData.png' width={100} alt="No Data" />
    <p className='text-secondary1 fonttitle font-weight-bold mb-2'>Information not available</p>
    <p className='text-secondary1 fontsubtitle font-weight-bold mb-1'>
      User has not provided the information yet to show
    </p>
  </div>
)}



            </div>
        <div className='card border rounded  mb-1 px-4 py-3'>
        <div><span className="fontsubtitle font-weight-bold text-dark1">Business Info</span></div>
        {BusinessData.filter(data => data.company_name && data.company_name.trim() !== "").map(item => (
        <div className='card-content py-3'>
        <img src={Imagesource(BusinessData?.business_logo)} className="rounded"
            style={{ width: "65px", height: "65px", cursor: "pointer", objectFit: "fill" }}
            onError={handleImagePageError}
        />
        <div>
        <h5 class="font-weight-bold fontsubtitle mb-1">{item.company_name?item.company_name:"Name not specified"}</h5>
                <div class="d-flex justify-content-between flex-column">
                <div class="fontcontent2 mb-1"><span className='text-dark1 font-weight-bold'></span> {item.city?item.city:"Address not provided"}</div>
                <div class="fontcontent2 mb-1"><span className='text-dark1 font-weight-bold'></span> {item.size?item.size:"Size not specified"}</div>
         </div>
        </div>
        <button className='btn btn-connect rounded-01 py-1'>view</button>
        </div>
        ))}
        </div>
        <Modal show={viewModal} onHide={()=>setviewModal(false)}
            className="modelfilter mode mx-auto modal-lg"
            size="mdd">
                <Modal.Header>
                    <Modal.Title>Add Designation</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                {InputField("Designation*", "designation", "text", formdata.designation, handleInputChange, "Enter your Designation",errors.designation)}
                {InputField("Company*", "company", "text", formdata.Company, handleInputChange, "Enter Company Name",errors.designation)}
                {InputField("From Date*", "from_date", "date", formdata.from_date, handleInputChange, "Enter start date",errors.designation)}
                {InputField("To Date*", "to_date", "date", formdata.to_date, handleInputChange, "Enter end date",errors.designation)}
                <div className="d-flex justify-content-center mt-4">
                    <button className="btn btn-connect px-3 py-1" onClick={()=>HandleUpdate()}>Update</button>
                </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default ProfileView
