import React, { useEffect, useState } from 'react'
// import Header from '../layout/SubHeader';
import "./style2.css"
import { useLocation } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import FetchData from '../../fetch-api/Apifetch';
import { validateForm } from '../../utils/Function.js';
import { toast } from 'react-toastify';

const Progress = () => {
    const [EventDetail, setEventDetail] = useState();
    const [Stage, setStage] = useState({});
    const [StageId, setStageId] = useState(Stage?.StageId);
    const [modalview, setModalView] = useState(false);
    const [projectId, setProjectId] = useState("");
    const Location = useLocation()
    const { state } = Location;
    useEffect(() => {
        GetCurrentStage(state?.project_id)
        setEventDetail(state)
        
    }, [])
    const getCurrentDate = () => {
        const date = new Date();
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // January is 0
        const year = date.getFullYear();
        return `${year}-${month}-${day}`;
    };

    const getCurrentTime = () => {
        const date = new Date();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        return `${hours}:${minutes}:${seconds}`;
    };


    const GetCurrentStage = async () => {
        const res = await FetchData(`projectstage/${state?.project_id}`, 'GET', null, true, false)
        if (res.success) {
            setStage(res.data)
            setEventform({...Eventform,title:res.data?.title })
            setStageId(res.data?.StageId)
        }
    }
    const handleupdate=async()=>{
        setModalView(false)
        const res = await FetchData(`updateprojects/${state?.project_id}/${StageId}`, 'GET', null, true, false)
        handleSubmit()
        GetCurrentStage()
    }

    const SouqStatus = [
        "Proposal sent",
        "Proposal Negotiation",
        "Requested a Demo",
        "KT Transferred ",
        "Shipping the Product",
        "Deal Closed Successfully",
    ]


    const [Eventform, setEventform] = useState({
        title: "",
        description: "",
        date: getCurrentDate(),
        time: getCurrentTime(),
        bp_id: EventDetail?.bp_id,
        client_id: EventDetail?.user_id,
        project_id: state?.project_id,
    })

    const handleSubmit = async () => {
        try {
            var object = {
                ...Eventform,
                bp_id: EventDetail?.bp_id,
                client_id: EventDetail?.user_id,
                project_id: state?.project_id,
            }

            console.log(object);

            if (!validateForm(object)) {
                toast.error("Please Enter all the fields!")
                return;
            }
            const res = await FetchData("event", 'POST', JSON.stringify(object), false, false);
        } catch (error) {
            console.error("Error fetching event:", error.message);
        }
    }

    // const HandleChanger = (e) => {
    //     const { name, value } = e.target;
    //     setEventform({ ...Eventform, [name]: value })
    // // }


    const ClassActive = (id) => {
        return id <= Stage?.StageId?"active" : ""
    }

    const HandleChanger = (e) => {
        const { name, value } = e.target;

        if (name === 'date') {
            const dateParts = value.split('-');
            if (dateParts[0].length > 4) {
                dateParts[0] = dateParts[0].slice(0, 4); // Keep only the first 4 digits of the year
                const newDate = dateParts.join('-');
                setEventform(prevState => ({
                    ...prevState,
                    [name]: newDate,
                }));
            } else {
                setEventform(prevState => ({
                    ...prevState,
                    [name]: value,
                }));
            }
        } else {
            setEventform(prevState => ({
                ...prevState,
                [name]: value,
            }));
        }
    };

    return (
        <div className="body-wrapper">
            <div className="px-3 py-2">
                <div className='m-1 p-2 row w-100 card flex-row justify-content-between' style={{ backgroundColor: "#fff" }}>
                    <div className='d-flex col-9 ml-1'>
                        <div className='step-item mt-5'>
                            <div className='line-tag'></div>
                            <div >
                                <div className='step-number active'>
                                    <i className="fa fa-solid fa-circle text-white"></i>
                                </div>
                                <div className='pt-5 mb-5 text-start' style={{ width: 120 }}>
                                    <div style={{ fontSize: 12, fontWeight: 500 }}>Request for  Meeting</div>
                                </div>
                            </div>
                        </div>
                        {SouqStatus.map((item, index) => (
                            <div className='step-item mt-5'>
                                <div className='line-tag'></div>
                                <div >
                                    <div className={`step-number ${ClassActive(index + 1)}`}> <i className="fa fa-check text-white" aria-hidden="true"></i></div>
                                    <div className='pt-5 mb-5 text-start' style={{ width: 115, maxWidth: 200 }}>
                                        <div style={{ fontSize: 12, fontWeight: 500 }}>{item}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className='col-2 h-100 p-3 ml-1 w-25' style={{ boxShadow: "rgb(206, 212, 218) -15px 0px 7px -9px",width:"170px" }}>
                        <p className='mb-0 fontsize text-start'><span className='font-weight-bold ' style={{ textDecoration: "underline" }}><strong>CLIENT DETAILS</strong></span> </p>
                        <p className='mb-0 fontsize'><strong>Client Name:</strong> {state?.userdata?.first_name+" "+state?.userdata?.last_name}</p>
                        <p className='mb-0 fontsize'><strong>Business Type:</strong> {state?.userdata?.user_type == 0 ? 'Buyer':'Seller'}</p>
                        <p className='mb-0 fontsize'><strong>Address:</strong> {state?.userdata?.city}<br />{state?.userdata?.country}</p>
                        <div className='d-flex justify-content-center mt-2 mb-2 pt-4'>
                            <button onClick={() => { setModalView(true) }} className='border-0 rounded px-3 py-2' style={{ color: 'white', background: '#8A40E9', cursor: 'pointer' }}>Update Status</button>
                        </div>
                    </div>
                </div>  
            </div>
            <Modal show={modalview} onHide={() => setModalView(false)} className='modal-lg' >
                <Modal.Header style={{ justifyContent: "center" }}>
                    <Modal.Title style={{ color: "#2D2B70", fontWeight: "600", fontSize: "20px" }}>Update Status</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ padding: "2%" }}>
                    <div className='p-4'>
                        <div className="p-2 text-bg-light text-center">Project ID:{Stage?.project_id}</div>
                        <div className='mb-3'>
                            <label>Description</label>
                            <textarea type="text" name="description"
                                value={Eventform.description}
                                onChange={HandleChanger}
                                className="form-control" />
                        </div>
                        <div className='mb-3'>
                            <div className="row">
                                <div className='col-6'>
                                    <label>Date</label>
                                    <input type="date" name="date"
                                        value={Eventform.date}
                                        onChange={HandleChanger}
                                        className="form-control" />
                                </div>
                                <div className='col-6'>
                                    <label>Time</label>
                                    <input type="time" name="time"
                                        value={Eventform.time}
                                        onChange={HandleChanger}
                                        className="form-control" />
                                </div>
                            </div>
                        </div>

                        <div className='py-3'>
                            <label htmlFor="accountNumber ">Status</label>
                            <select
                                name="country"
                                className="form-control mb-2"
                                placeholder=" "
                                value={StageId} onChange={(e) => setStageId(e.target.value)}>
                                <option value="">Current status</option>
                                <option value='0'>Requested For Meeting</option>
                                {SouqStatus && SouqStatus.map((item,index)=>(
                                <option value={index+1}>{item}</option>
                            ))}
                             
                            </select>
                        </div>
                        <div className='pt-4 d-flex justify-content-center column-gap-2'>
                            <button onClick={() => { setModalView(false)}} className='border-0 rounded px-3 py-2' style={{ color: 'white', background: 'rgb(159 157 160)' }}>Close</button>
                            <button onClick={() => { handleupdate() }} className='border-0 rounded px-3 py-2' style={{ color: 'white', background: '#8A40E9' }}>Update</button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default Progress
