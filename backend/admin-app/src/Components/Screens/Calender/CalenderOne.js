import React, { useState, useEffect } from 'react';
// import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Modal } from 'react-bootstrap';
import FetchData from '../../fetch-api/Apifetch.js';
import { validateForm } from '../../utils/Function.js';
import "./style.css"
import {  useNavigate } from 'react-router-dom';
import Calendar from 'react-calendar';
import { format } from 'date-fns';
import "./cal.css";
// const localizer = momentLocalizer(moment);

function Calender() {

  const [listevent, setListEvent] = useState([]);
  const [events, setEvents] = useState([]);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('User')));
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showmodalype, setModalType] = useState(0);
  const [ProjectList, setProjectList] = useState([]);
  const [errors, setErrors] = useState({});
  
  const navigate = useNavigate()
  const [event, setEvent] = useState(
    {
      title: "",
      description: "",
      date: "",
      time: "",
      project_id: "",
      status: "1",
      timezone: "0",
      created_by: user._id,
      bp_id: user._id,
      client_id: "",
      client_name: user.first_name + " " + user.last_name
    }
  )

// 
const highlightDates = listevent.map(item => new Date(item.date));
const tileClassName = ({ date, view }) => {
    
  if (view === 'month') {
    if (highlightDates.some(highlightDate => (
      highlightDate.getDate() === date.getDate() &&
      highlightDate.getMonth() === date.getMonth() &&
      highlightDate.getFullYear() === date.getFullYear()
    ))) {
      return 'highlight';
    }
  }
  return null;
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { weekday: 'short', day: 'numeric' };
  return date.toLocaleDateString('en-IN', options);
};

// 
  useEffect(() => {
    const storedEvents = localStorage.getItem('events');
    if (storedEvents) {
      setEvents(JSON.parse(storedEvents));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(events));
  }, [events]);

  const handleSelect = ({ start }) => {
    event.date = start.toISOString().slice(0, 10);
    setEvent({...event,["date"]:start.toISOString().slice(0, 10)})
    SetModalView(true);
  };


  const [itemId, setItemId] = useState('');
  const [showModal, SetModalView] = useState(false);

  const handleshow = (type) => {
    setModalType(type);
    SetModalView(true);
  }

  const handleClose = () => {
    setModalType(0);
    setEvent({
      created_by: user._id,
      client_id: user._id,
      client_name: user.first_name + " " + user.last_name
    })
    SetModalView(false);
  };

  const InputField = (label, name, type, value, onChange, placeholder, error) => (
    <div className="col-10 mb-2 mt-3 inputs-form">
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
  
    // Create a new state object to hold the updated event state
    let updatedEvent = { ...event, [name]: value };
  
    // Check if the input field is 'project_id' and update 'client_id' accordingly
    if (name === "project_id" && value !== "") {
      const dataObject = ProjectList.find(item => item.project._id === value);
      if (dataObject) {
        updatedEvent = { ...updatedEvent, client_id: dataObject.user_id };
        console.log("dataObject", dataObject);
      }
    }
    setEvent(updatedEvent);
    setErrors({ ...errors, [name]: error });
  };

  const validateFields = () => {
    const newErrors = {};
    if (!event.title) {
      newErrors.title = 'Title is required';
    }
    if (!event.description) {
      newErrors.description = 'Description is required';
    }
    if (!event.date) {
      newErrors.date = 'Date is required';
    } if (!event.time) {
      newErrors.time = "Time is required";
    }

    if (Object.keys(newErrors).length === 0) {
      handleSubmit();
    } else {
      setErrors(newErrors);
      console.log("error");
    }
  }

  const handleSubmit = async () => {

    try {
      var object = {
        title: event.title,
        description: event.description,
        date: event.date,
        time: event.time,
        project_id: event.project_id,
        bp_id:user._id,
        client_id: event.client_id,
      }
      if (!validateForm(object)) {
        // toast.error("Please enter mandatory fields");
        return;
      }
      const res = await FetchData("event", 'POST', JSON.stringify(event), false, false);
      handleClose();
      setModalType(0)
      getEvent();
    } catch (error) {
      console.error("Error fetching event:", error.message);
    }
  }

  useEffect(() => {
    getEvent();
    listProjects();
  }, [])


  const listProjects = async()=>{
    try {
        const res = await FetchData(`notify_list/${user._id}`, 'GET', null, true, false);
        if (res.success) {
            setProjectList(res.data);
        }
    } catch (error) {
        console.error("Error fetching user list:", error.message);
    }
  }
  // const [listevent, setListEvent] = useState([])

  const getEvent = async () => {
      const res = await FetchData("event/"+user._id+"?type=1", "GET", null, false, false);
    setListEvent(res.data);
  }

  const UpdateEvent = async () => {
    // try {
    //   const res = await FetchData(`event/update/${itemId}`, 'POST', JSON.stringify(event), false, false);
    //   setItemId();
    //   handleClose();
    //   setModalType(0)
    //   getEvent();
    // } catch (error) {
    //   console.error("Error fetching event:", error.message);
    // }

  }

  const DeleteEvent = async () => {
    try {
      const res = await FetchData(`event/delete/${itemId}`, 'GET', null, false, false);
      console.log(res);
      setItemId();
      handleClose();
      setModalType(0)
      getEvent();
    } catch (error) {
      console.error("Error fetching event:", error.message);
    }
  }

  const SelectOption = (title, col = 6, name, type, value, onChange) => {
  

    return (
        <div className="col-10 mb-2 mt-3 inputs-form">
            <label htmlFor={`exampleInput${title}`} className="form-label mr-3" style={{ fontWeight: "500" }}>
                {title}
            </label>
            <select
                name={name}
                value={value}
                className='form-control'
                onChange={onChange}
            ><option value={""}>Select Option</option>
                {ProjectList && ProjectList.map(item => (
                    <option value={item.project._id}>
                        {item.project.project_id}
                    </option>
                ))}
            </select>
        </div>
    )
}

  return (
    <div className="body-wrapper">
      <div className="container-fluid">
      <div className='feed_container mt-2 px-2' style={{ display: "grid",maxWidth:"100%" }}>
            {/* <div id='left-aside mt-2' style={{backgroundColor:"white",height:"90vh"}}>
               <div className="py-3 px-2 d-flex justify-content-center flex-column overflow-hidden">
                  <button className="btn  d-flex w-75 mx-auto justify-content-center py-2 mt-2 px-2 btn-menu" style={{borderRadius:"5px",cursor:"pointer",border:"none"}}>
                 
                  <i class="fa fa-th-large" aria-hidden="true" style={{color:"#d1cdcd",padding:"4px 10px"}}></i>
                  <p className="mb-0 text-white">Dashboard</p>
                    
                  </button>

                  <button className="d-flex w-75 mx-auto justify-content-center py-2 mt-2 px-2 btn-menu " style={{borderRadius:"5px",cursor:"pointer",border:"none"}}>
                 
                  <i class="fa fa-users" aria-hidden="true" style={{color:"#d1cdcd",padding:"4px 10px"}}></i>
                 <p className="mb-0 text-white">Add user</p>
                   
                 </button>

                 <button className="d-flex w-75 mx-auto justify-content-center py-2 mt-2 px-2 btn-menu" style={{borderRadius:"5px",cursor:"pointer",border:"none"}}>
                 
                 <i class="fa fa-file-archive-o" aria-hidden="true" style={{color:"#d1cdcd",padding:"4px 10px"}}></i>
                 <p className="mb-0 text-white">Project</p>
                   
                 </button>
                 <button className="d-flex w-75 mx-auto justify-content-center py-2 mt-2 px-2 btn-menu" style={{borderRadius:"5px",cursor:"pointer",border:"none"}}>
                 
                 <i class="fa fa-folder-open" aria-hidden="true" style={{color:"#d1cdcd",padding:"4px 10px"}} ></i>
                 <p className="mb-0 text-white">CS Vault</p>
                   
                 </button>
                 <button className="d-flex w-75 mx-auto justify-content-center py-2 mt-2 px-2 btn-menu" style={{borderRadius:"5px",cursor:"pointer",border:"none"}}>
                 
                 <i class="fa fa-calendar" aria-hidden="true" style={{color:"#d1cdcd",padding:"4px 10px"}}></i>
                 <p className="mb-0 text-white">Follow up & lead</p>
                   
                 </button>
                 <button className="d-flex w-75 mx-auto justify-content-center py-2 mt-2 px-2 btn-menu" style={{borderRadius:"5px",cursor:"pointer",border:"none"}}>
                 
                 <i class="fa fa-exchange" aria-hidden="true" style={{color:"#d1cdcd",padding:"4px 10px"}}></i>
                 <p className="mb-0 text-white">Transaction</p>
                   
                 </button>
                 <button className="d-flex w-75 mx-auto justify-content-center py-2 mt-2 px-2 btn-menu" style={{borderRadius:"5px",cursor:"pointer",border:"none"}}>
                 
                 <i class="fa fa-bell" aria-hidden="true"  style={{color:"#d1cdcd",padding:"4px 10px"}}></i>
                 <p className="mb-0 text-white">Notification</p>
                   
                 </button>

                 
                
                  
               
                 
               </div>
            </div> */}
            <div id='main-section '>
            <div className="container-fluid mx-2" style={{backgroundColor:"white",height:"auto"}}>
            <div className=" event-list " style={{ height: "auto", overflowY: 'hidden', backgroundColor: "white",padding:"0px",}}>
               <div className="m-2">
               <h2 className="mb-0 fontsubtitle">Welcome , {user.first_name} {user.last_name}</h2>
               <p className="mb-0  fontcontent2" style={{color:"grey"}} >wednesday, 10 July</p>
               </div>
                 
                {listevent.length > 0 ? (
                listevent.map((item,index)=>(
          <div className="dcol d-flex align-items-center  gg w-100" key={index}  onClick={() => {
                              navigate('/progress', {
                                state: item
                              })
                              }}>
                      <p className="d-flex flex-column text-center dbox border-0" style={{ padding: "18px", backgroundColor: "white", marginBottom: "0px",textTransform:"uppercase",boxShadow:'#cec9c9 2px 0px 1px 1px'}}> {formatDate(item.date)}</p>
                        <div className="pbox">
                          <h6 className="mb-0 p-0 fw- text-uppercase fontsubtitle">{item.title} </h6>
                          <span className="fontcontent2">{item.description}</span></div>
                        
                      </div>
                          
                    ))
                  ) : (
                    <div className="no-events d-flex justify-content-center align-items-center flex-column" style={{height:"80vh"}}>
                    
                      
                      <img src="assets/images/backgrounds/noEvents.png" alt="No events available" style={{width:"160px",height:"120px"}} /> 
                     <p className='text-capitalize'>no events found</p> 
                    </div>
                  )
                  }
                  


              </div>
            </div>
            </div>
            <div id='right-aside' style={{backgroundColor:"white",height:"90vh"}}>
            <div className="container-fluid bg-light px-0 ">
        <div className="d-flex justify-content-around">
          <div className="body-wrapper p-0" >
          
              

           <div className="container-fluid" style={{padding:"0px",width:"auto"}}>
         <div className='calendar-container p-0' style={{display:"flex",alignItems:"center",flexDirection:"column"}}>
           

              <Calendar    
              value={currentDate}  
   formatShortWeekday={(locale, date) => format(date, 'EEE', { locale })}
   tileClassName={tileClassName}
/>



            </div>

            </div>

            <div>
               <div className="card alert-card d-flex" style={{backgroundColor:"#ffe8e8"}}>
                 
                 <div className="cdiv" >
                
                  <i class="fa fa-users fz-5" aria-hidden="true" style={{color:"gray",backgroundColor: "white", borderRadius: "50%",padding: "15px",}}></i>
                
                 
                 </div>
                 
                 <div style={{margin:"auto 0px"}}>
                 <p className="pcontent fontcontent2 text-black fw-bold"> 8 scheduled meeting </p>
                 <p className="pcontent fontcontent2">11 may-18 may 2024 </p>
                 </div>
                 
                 <div className="cdiv">
                 <i class="fa fa-long-arrow-right" aria-hidden="true" ></i>
                 </div>

               </div>
               <div className="card alert-card d-flex" style={{backgroundColor:"#e3ffef"}}>
                 
                 <div className="cdiv">
                 <i class="fa fa-comments" aria-hidden="true" style={{color:"gray",backgroundColor: "white", borderRadius: "50%",padding: "15px"}}></i>
                 </div>
                 
                 <div style={{margin:"auto 0px"}}>
                 <p className="pcontent fontcontent2 text-black fw-bold"> 2 proposals sent </p>
                 <p className="pcontent fontcontent2">11 may-18 may 2024 </p>
                 </div>
                 
                 <div className="cdiv">
                 <i class="fa fa-long-arrow-right" aria-hidden="true"></i>
                 </div>
                 
               </div>
               <div className="card alert-card d-flex" style={{backgroundColor:"#e1deff"}}>
                 
                 <div className="cdiv">
                 <i class="fa fa-comments" aria-hidden="true" style={{color:"gray",backgroundColor: "white", borderRadius: "50%",padding: "15px"}}></i>
                 </div>
                 
                 <div style={{margin:"auto 0px"}}>
                 <p className="pcontent fontcontent2 text-black fw-bold"> 8 scheduled meeting </p>
                 <p className="pcontent fontcontent2">11 may-18 may 2024 </p>
                 </div>
                 
                 <div className="cdiv">
                 <i class="fa fa-long-arrow-right" aria-hidden="true"></i>
                 </div>

               </div>
            </div>


            


         
         
           
          </div>
        </div>
      </div>
            </div>
            </div>
   

      </div>







{/* ------------------------------------------------------------------------------------------------------ */}
      <Modal show={showModal}
        onHide={handleClose}
        className="modelfilter modal-md"
        size="md">
        <Modal.Header>
          {showmodalype === 1 ? (<h4>Add Event</h4>) : (<h4>Update Event</h4>)}
          <i class="fa fa-times" aria-hidden="true" style={{ cursor: 'pointer' }} onClick={handleClose}></i>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex flex-column align-items-center">
            {SelectOption("Select Project", 6, "project_id", "text", event.project_id, handleInputChange, true)}
            {InputField("Title*", "title", "text", event.title, handleInputChange, "Enter your Title", errors.title)}
            {InputField("Description*", "description", "text", event.description, handleInputChange, "Enter your description", errors.description)}
            {InputField("Date*", "date", "date", event.date, handleInputChange, "Enter Date", errors.date)}
            {InputField("Time*", "time", "time", event.time, handleInputChange, "Enter Time", errors.time)}
            {true ?(
            <button className='col-4  border-0 mt-3 py-2 submit-btn' onClick={() => validateFields()}>
              Add Event
            </button>
            ):(
              <div className="col-10 row mb-2 mt-3 inputs-form justify-content-around">
                {/* <button className='col-4  border-0 mt-3 py-2 submit-btn' onClick={() => DeleteEvent()}>
                  Delete Event
                </button> */}
                {/* <button className='col-4  border-0 mt-3 py-2 submit-btn' onClick={() => UpdateEvent()}>
                  update Event
                </button> */}
              </div>
            )}
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Calender;
