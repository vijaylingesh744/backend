import React, { useState, useEffect } from "react";
import {Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { format } from 'date-fns';
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Modal } from "react-bootstrap";
import FetchData from "../../fetch-api/Apifetch";
import Header from "../layout/SubHeader";
import { useNavigate } from "react-router-dom";
import "./style/config.css";
import Calendar from 'react-calendar';
import "./style/cal.css"


const localizer = momentLocalizer(moment);
function Calender( { events }) {
  const [bpUser, setbpUser] = useState([]);
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("LOGINDATA"))?.user
  );
  
  const [currentDate, setCurrentDate] = useState(new Date());

  const [showmodalType, setModalType] = useState(0);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();


  useEffect(() => {
    ListChat();
  }, []);

  const ListChat = async () => {
    const res = await FetchData(
      `chatlist/${user._id}`,
      "GET",
      null,
      true,
      false
    );
    if (res.status) {
      setbpUser(res.data);
    }
  };

  const [showModal, SetModalView] = useState(false);

  const handleClose = () => {
    setModalType(0);
    setEvent({
      created_by: user._id,
      client_id: user._id,
      client_name: user.first_name + " " + user.last_name,
    });
    SetModalView(false);
  };

  const InputField = (
    label,
    name,
    type,
    value,
    onChange,
    placeholder,
    error
  ) => (
    <div className="col-10 mb-2 mt-3 inputs-form">
      <label
        htmlFor={`exampleInput${name}`}
        className="form-label mr-3"
        style={{ fontWeight: "500" }}
      >
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

  const [event, setEvent] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    status: "1",
    timezone: "0",
    created_by: user._id,
    client_id: user._id,
    client_name: user.first_name + " " + user.last_name,
  });

  const handleInputChange = (e) => {
    let error = "";

    const { name, value } = e.target;
    setEvent({ ...event, [name]: value });
    setErrors({ ...errors, [name]: error });
  };

  useEffect(() => {
    getEvent();
  }, []);

  const [listevent, setListEvent] = useState([]);
  const getEvent = async () => {
    const res = await FetchData("event/"+user._id, "GET", null, false, false);
    console.log(res.data);
     setListEvent(res.data);
  };

  // format date 
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { weekday: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-IN', options);
  };


  // highlight event dates

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
 
   const handleProgress =(item) => {

console.log(item);
   }
 


 
  return (
    <div>
      <Header />
      <div className='feed_container mt-2' style={{ display: "grid",maxWidth:"97%" }}>
            <div id='left-aside mt-2' className="d-none d-md-block d-lg-block" style={{backgroundColor:"white",height:"90vh"}}>
               <div className="py-3 px-2 d-flex justify-content-center flex-column overflow-hidden ">
                  <button className="btn  d-flex w-75 mx-auto justify-content-start py-2 mt-2 px-2 btn-menu" style={{borderRadius:"5px",cursor:"pointer",border:"none"}}>
                 
                  <i class="fa fa-th-large" aria-hidden="true" style={{color:"#d1cdcd",padding:"4px 10px"}}></i>
                  <p className="mb-0 text-secondary1">Dashboard</p>
                    
                  </button>

                  <button className="d-flex w-75 mx-auto justify-content-start py-2 mt-2 px-2 btn-menu " style={{borderRadius:"5px",cursor:"pointer",border:"none"}}>
                 
                  <i class="fa fa-users" aria-hidden="true" style={{color:"#d1cdcd",padding:"4px 10px"}}></i>
                 <p className="mb-0 text-secondary1">Add user</p>
                   
                 </button>

                 <button className="d-flex w-75 mx-auto justify-content-start py-2 mt-2 px-2 btn-menu" style={{borderRadius:"5px",cursor:"pointer",border:"none"}}>
                 
                 <i class="fa fa-file-archive-o" aria-hidden="true" style={{color:"#d1cdcd",padding:"4px 10px"}}></i>
                 <p className="mb-0 text-secondary1">Project</p>
                   
                 </button>
                 <button className="d-flex w-75 mx-auto justify-content-start py-2 mt-2 px-2 btn-menu" style={{borderRadius:"5px",cursor:"pointer",border:"none"}}>
                 
                 <i class="fa fa-folder-open" aria-hidden="true" style={{color:"#d1cdcd",padding:"4px 10px"}} ></i>
                 <p className="mb-0 text-secondary1">CS Vault</p>
                   
                 </button>
                 <button className="d-flex w-75 mx-auto justify-content-start py-2 mt-2 px-2 btn-menu" style={{borderRadius:"5px",cursor:"pointer",border:"none"}}>
                 
                 <i class="fa fa-calendar" aria-hidden="true" style={{color:"#d1cdcd",padding:"4px 10px"}}></i>
                 <p className="mb-0 text-secondary1">Follow up & lead</p>
                   
                 </button>
                 <button className="d-flex w-75 mx-auto justify-content-start py-2 mt-2 px-2 btn-menu" style={{borderRadius:"5px",cursor:"pointer",border:"none"}}>
                 
                 <i class="fa fa-exchange" aria-hidden="true" style={{color:"#d1cdcd",padding:"4px 10px"}}></i>
                 <p className="mb-0 text-secondary1">Transaction</p>
                   
                 </button>
                 <button className="d-flex w-75 mx-auto justify-content-start py-2 mt-2 px-2 btn-menu" style={{borderRadius:"5px",cursor:"pointer",border:"none"}}>
                 
                 <i class="fa fa-bell" aria-hidden="true"  style={{color:"#d1cdcd",padding:"4px 10px"}}></i>
                 <p className="mb-0 text-secondary1">Notification</p>
                   
                 </button>

                 
                
                  
               
                 
               </div>
            </div>
            <div id='main-section '>
            <div className="container-fluid mx-2 event-box" style={{height:"90vh"}}>
            <div className=" event-list " style={{ height: "auto", overflowY: 'hidden', backgroundColor: "white",padding:"0px",}}>
               <div className="m-2">
               <h2 className="mb-1 fontsubtitle">Welcome , {user.first_name} {user.last_name}</h2>
               <p className="mb-1  fontcontent2" style={{color:"gray !important"}} >wednesday, 10 July</p>
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
                    
                      
                      <img src="images/busi_images/noEvents.png" alt="No events available" style={{width:"160px",height:"120px"}} /> 
                     <p>No Events Found</p> 
                    </div>
                  )
                  }
                  


              </div>
            </div>
            </div>
            <div id='right-aside' style={{backgroundColor:"white",height:"90vh"}}>
            <div className="container-fluid bg-light px-0 ">
        <div className="d-flex justify-content-around">
          <div className="body-wrapper m-2" >
          
              

           <div className="container-fluid" style={{padding:"0px",width:"auto"}}>
         <div className='calendar-container' style={{display:"flex",alignItems:"center",flexDirection:"column"}}>
           

              <Calendar    value={currentDate}  
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
                 <p className="pcontent fontcontent2"> 8 scheduled meeting </p>
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
                 <p className="pcontent fontcontent2"> 8 scheduled meeting </p>
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
                 <p className="pcontent fontcontent2"> 8 scheduled meeting </p>
                 <p className="pcontent fontcontent2">11 may-18 may 2024 </p>
                 </div>
                 
                 <div className="cdiv">
                 <i class="fa fa-long-arrow-right" aria-hidden="true"></i>
                 </div>

               </div>
            </div>


            


         
            {/* <div className="col-12 event-list" style={{ height: "20vh", overflowY: 'scroll', backgroundColor: "white" }}>
              <table id="custom_tool_ele" className="table border table-striped table-bordered display text-nowrap dataTable" style={{ width: "100%", marginTop: "1%" }} aria-describedby="custom_tool_ele_info" >
                <thead>
                  <tr>
                    <th
                      className="sorting sorting_asc"
                      tabIndex={0}
                      aria-controls="custom_tool_ele"
                      rowSpan={1}
                      colSpan={1}
                      aria-sort="ascending"
                      aria-label="Name: activate to sort column descending"
                      style={{ width: 171 }}
                    >
                      Date & time
                    </th>
                    <th
                      className="sorting"
                      tabIndex={0}
                      aria-controls="custom_tool_ele"
                      rowSpan={1}
                      colSpan={1}
                      aria-label="Position: activate to sort column ascending"
                      style={{ width: 261 }}
                    >
                      Description
                    </th>
                    <th
                      className="sorting"
                      tabIndex={0}
                      aria-controls="custom_tool_ele"
                      rowSpan={1}
                      colSpan={1}
                      aria-label="Office: activate to sort column ascending"
                      style={{ width: 128 }}
                    >
                      Stage
                    </th>
                    <th
                      className="sorting"
                      tabIndex={0}
                      aria-controls="custom_tool_ele"
                      rowSpan={1}
                      colSpan={1}
                      aria-label="Salary: activate to sort column ascending"
                      style={{ width: 114 }}
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {listevent.map((items, index) => (
                    <tr className="odd">
                      <td className="sorting_1">{items.date} ({items.time})</td>
                      <td>{items.description}</td>
                      <td style={{ display: "flex", justifyContent: "center" }}>
                        <span style={{ backgroundColor: "rgb(228, 240, 253)", padding: "10px", fontSize: "16px" }}>
                          Order Received
                        </span>
                      </td>
                      <td style={{ textAlign: "center" }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16" onClick={() => { window.location.href = "progress" }}>
                          <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
                          <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7" />
                        </svg>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div> */}
            <Modal
              show={showModal}
              onHide={handleClose}
              className="modelfilter modal-md"
              size="md"
            >
              <Modal.Header>
                {showmodalType === 1 ? (
                  <h4>Add Event</h4>
                ) : (
                  <h4>Update Event</h4>
                )}
                <i
                  class="fa fa-times"
                  aria-hidden="true"
                  style={{ cursor: "pointer" }}
                  onClick={handleClose}
                ></i>
              </Modal.Header>
              <Modal.Body>
                <div className="d-flex flex-column align-items-center">
                  {InputField(
                    "Title*",
                    "title",
                    "text",
                    event.title,
                    handleInputChange,
                    "Enter your Title",
                    errors.title
                  )}
                  {InputField(
                    "Description*",
                    "description",
                    "text",
                    event.description,
                    handleInputChange,
                    "Enter your description",
                    errors.description
                  )}
                  {InputField(
                    "Date*",
                    "date",
                    "date",
                    event.date,
                    handleInputChange,
                    "Enter Date",
                    errors.date
                  )}
                  {InputField(
                    "Time*",
                    "time",
                    "time",
                    event.time,
                    handleInputChange,
                    "Enter Time",
                    errors.time
                  )}
                  {/* {InputField("Created By*", "created_by", "text", event.created_by, handleInputChange, "Enter your created user")} */}
                  {/* {showmodalype === 1 ? (<button className='col-4  border-0 mt-3 py-2 submit-btn' onClick={() => validateFields()}>
                      Add Event
                      </button>) : (
                     <div className="col-10 row mb-2 mt-3 inputs-form justify-content-around">
                     <button className='col-4  border-0 mt-3 py-2 submit-btn' onClick={() => DeleteEvent()}>
                      Delete Event
                    </button>
                    <button className='col-4  border-0 mt-3 py-2 submit-btn' onClick={() => UpdateEvent()}>
                        Update Event
                    </button>
                  </div>
                  )} */}
                </div>
              </Modal.Body>
            </Modal>
          </div>
        </div>
      </div>
            </div>
            </div>
      
      
    </div>
  );
}

export default Calender;
