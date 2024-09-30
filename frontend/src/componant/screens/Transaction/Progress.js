import React, { useEffect, useState } from 'react'
import Header from '../layout/SubHeader';
import "./style/progress.css"
import { useLocation } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import FetchData from '../../fetch-api/Apifetch';

const Progress = () => {
    const [EventDetail, setEventDetail] = useState();
    const [Stage, setStage] = useState({});
    const [StageId, setStageId] = useState(Stage?.StageId);
    const [modalview, setModalView] = useState(false);
    const [businessPartner, setbusinessPartner] = useState({});
    const [projectId, setProjectId] = useState("");
    const Location = useLocation()
    const { state } = Location;
    useEffect(() => {
        setEventDetail(state)
        GetCurrentStage(state?.project_id)
        getBusinesspartner(state?.bp_id)
    }, [])

    const getBusinesspartner = async (bp_id) => {

        try {
            const res = await FetchData("detail/user/" + bp_id, 'GET', null, true, false);
            if (res.success) {
                console.log(res.data.user);
                setbusinessPartner(res.data.user)
        }
        } catch (err) {
            console.log(err);
        }
    }

    const GetCurrentStage = async (id) => {
        const res = await FetchData(`projectstage/${id}`, 'GET', null, true, false)
        console.log("state", res.data)
        if (res.success) {
            setStage(res.data)
            setStageId(res.data?.StageId)
        }
    }
    const handleupdate = async () => {
        setModalView(false)
        const res = await FetchData(`updateprojects/${state?.project_id}/${StageId}`, 'GET', null, true, false)
        GetCurrentStage()
    }

    const SouqStatus = [
        "Under Progress",
        "Packed and Shipped",
        "Delivery picker by professionals",
        "Awaiting pickup",
        "Shipment accepted",
        "Delivered",
    ]


    const ClassActive = (id) => {
        return id <= Stage?.StageId ? "active" : ""
    }

    return (
        <div>
            <header id="sub-main-header">
            <Header />
            </header>
            <div className="px-3 py-2 ">
                <div className='m-1 p-2 row' style={{ backgroundColor: "#ffff" }}>
                    <div className='d-flex col-9 '>
                        <div className='step-item mt-5'>
                            <div className='line-tag'></div>
                            <div >
                                <div className='step-number active'>
                                    <i className="fa fa-solid fa-circle text-white"></i>
                                </div>
                                <div className='pt-5 mb-5 text-start' style={{ width: 130 }}>
                                    <div style={{ fontSize: 12, fontWeight: 500 }}>Order Received</div>
                                </div>
                            </div>
                        </div>
                        {SouqStatus.map((item, index) => (
                            <div className='step-item mt-5'>
                                <div className='line-tag'></div>
                                <div >
                                    <div className={`step-number ${ClassActive(index + 1)}`}> <i className="fa fa-check text-white" aria-hidden="true"></i></div>
                                    <div className='pt-5 mb-5 text-start' style={{ width: 130, maxWidth: 200 }}>
                                        <div style={{ fontSize: 12, fontWeight: 500 }}>{item}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className='col-3 h-100 pl-4 ' style={{ boxShadow: "rgb(206, 212, 218) -15px 0px 7px -9px" }}>
                        <p className='mt-1 fontsize text-center'><span className='font-weight-bold ' style={{ textDecoration: "underline" }}>BUSINESS PARTNER DETAILS</span> </p>
                        <p className='mt-1 fontsize'><span className='font-weight-bold'>Business Partner : </span>{businessPartner?.first_name}&nbsp;{businessPartner?.last_name}</p>
                        <p className='mt-1 fontsize'><span className='font-weight-bold'>Email : </span>{businessPartner?.gmail}</p>
                        <p className='mt-0 fontsize'><span className='font-weight-bold'>Address : </span>{businessPartner?.city},{businessPartner?.country}</p>
                    </div>
                </div>
            </div>
            <Modal show={modalview} onHide={() => setModalView(false)} className='modal-xl' >
                <Modal.Header style={{ justifyContent: "center" }}>
                    <Modal.Title style={{ color: "#2D2B70", fontWeight: "600", fontSize: "20px" }}>Update Status</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ padding: "2%" }}>
                    <div className='p-4'>
                        <div className='d-flex justify-content-between py-3'>
                            <span><h6>Project ID :</h6></span><span><h6>{Stage?.project_id}</h6></span>
                        </div>
                        <div className='d-flex justify-content-between py-3'>
                            <span><h6>Project :</h6></span><span><h6>{Stage?.title}</h6></span>
                        </div>
                        <div className='py-3'>
                            <label htmlFor="accountNumber ">Location</label>
                            <select
                                name="country"
                                className="form-control mb-2"
                                placeholder=" "
                                value={StageId}
                                onChange={(e) => setStageId(e.target.value)}>
                                <option value="">Current status</option>
                                <option value='0'>Order Received</option>
                                <option value='1'>Under Progress </option>
                                <option value='2'>Packed and Shipped </option>
                                <option value='3'>Delivery picker by professionals</option>
                                <option value='4'>Awaiting pickup</option>
                                <option value='5'>Shipment accepted </option>
                                <option value='6'>Delivered</option>
                            </select>
                        </div>
                        <div className='pt-4 d-flex justify-content-center'>
                            <button onClick={() => { handleupdate() }} className='border-0 rounded px-3 py-2' style={{ color: 'white', background: '#4535C1' }}>Update</button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default Progress
