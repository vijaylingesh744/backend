import React, { useEffect, useState } from 'react'
import FetchData from '../../fetch-api/Apifetch';
import Form from 'react-bootstrap/Form';
import Swal from 'sweetalert2';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import "./input.css"


const Invoice = () => {
    const [invoice, setInvoice] = useState(false);
    const [project, setProject] = useState(true);
    const [projectdata, setProjectdata] = useState({});
    const [projectID, setProjectID] = useState('');
    const [User, setUser] = useState('');
    const [InvoiceButton, setInvoiceButton] = useState(false)
    const navigate = useNavigate();
    const Location = useLocation()
    const { state } = Location;
    const [listNatification, setListNotification] = useState([])
    const [UserData, setUserData] = useState(JSON.parse(localStorage.getItem("User")));
    const [formData, setFormData] = useState({
        projectId: "",
        bpId: UserData._id,
        senderId: UserData._id,
        receiverId: "",
        bpCharges: "",
        email: "",
        mop: "",
        // pInitiation: "",
        transactionNo: "692e2Dce12392817w",
        // dateTime: "",
        remark: "",
        // csFee: "",
        dueDate: "",
        amount: "",
        currency: "",
        invoiceNo: "XBGHJSD"
    });
    // useEffect(() => {
    //     setFormData((prevFormData) => ({
    //       ...prevFormData,
    //       invoiceNo: "INV-" + generateInvoiceNumber(7),
    //       transactionNo: "CONSQ-" + generateInvoiceNumber(12)
    //     }));
    //   }, []);
    
    //   function generateInvoiceNumber(length) {
    //     const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    //     let result = '';
    //     for (let i = 0; i < length; i++) {
    //       const randomIndex = Math.floor(Math.random() * characters.length);
    //       result += characters.charAt(randomIndex);
    //     }
    //     return result;
    //   }

 
    console.log('UserData', UserData);
    useEffect(() => {
        fetchNotifyList()
        if (state) {
            setProject(false);
            setInvoice(true);
            setFormData(prevFormData => ({
                ...prevFormData,
                projectId: state?.project_id,  // Replace with actual project ID
                receiverId: state?.user_id,
                email: state?.email,
            }));
        }
    }, [])


    const fetchNotifyList = async () => {
        try {
            const res = await FetchData(`notify_list/${UserData._id}`, 'GET', null, true, false);
            if (res.success) {
                const Listvalue = res.data
                setListNotification(Listvalue.filter(item => item.status == 1));
                console.log(Listvalue)
            }
        } catch (error) {
            console.error("Error fetching user list:", error.message);
        }
    };

    useEffect(() => {
        listProjects()
    }, [projectID])


    const listProjects = async () => {
        try {
            const res = await FetchData(`list/project/${projectID}`, 'GET', null, true, false);
            if (res.status) {
                console.log(res.data);
                setUser(res.data)

            }
        } catch (error) {
            console.error("Error fetching user list:", error.message);
        }
    }
    const HandleUpdate = async () => {
        setInvoiceButton(true)

        // const keysWithEmptyValues = Object.keys(formData).filter(
        //     (key) => !formData[key]
        // );

        // if (keysWithEmptyValues.length > 0) {
        //     const missingKeys = keysWithEmptyValues.join(", ");
        //     setInvoiceButton(false)
        //     toast.error(
        //         `Please provide values for the following fields: ${missingKeys.replaceAll(
        //             /_/gi,
        //             " "
        //         )}`
        //     );
        //     return;
        // }

        console.log(formData);

        try {

            const res = await FetchData(`transaction/add`, 'POST', JSON.stringify(formData), true, false);
            if (res.status) {
                setInvoiceButton(false)
                toast.success("Invoice added successfully");
                if (state) {
                    navigate(`/project-connection/${state?.project_id}`)
                } else {

                    setProject(true);
                    setInvoice(false);
                }
            }
            //   if (res.success) {
            //     fetchNotifyList()
            //   }
            //   Swal.fire({
            //     title: 'Success!',
            //     text: 'Notification Sended To Customer.',
            //     icon: 'success'
            //   });
        } catch (error) {
            console.error("Error fetching user list:", error.message);
            setInvoiceButton(false)
        }

    }

    const sendInvoice =() =>{
        alert(JSON.stringify(formData))
    }
    return (
        <div className="body-wrapper">
            <div className="container-fluid">
               <div className="row  d-flex justify-content-center">
                    <div className="card p-4 shadow-lg rounded">
                        <div className="row justify-content-center">
                            <div className="col-md-6">
                                <div className="form-group mb-3">
                                    <label htmlFor="selectProject" className="form-label">Select Project</label>
                                    <select
                                        className="form-control form-control-md "
                                        id="projectId"
                                        onChange={(e) => {
                                            const { id, value, key } = e.target;
                                            setProjectID(JSON.parse(value)?.project._id)
                                            // handlechange(e)
                                            setFormData({ ...formData, 
                                                ["projectId"]: JSON.parse(value)?.project._id,
                                                ["receiverId"]: JSON.parse(value)?.user_id,
                                             })
                                            setProjectdata(JSON.parse(value))
                                        }} >
                                        <option value="">Select Project</option>
                                        {listNatification.map(item => (
                                            <option value={JSON.stringify(item)} key={item.project._id}>
                                                {item.project.title} ({item.project.project_id})
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="row justify-content-center">
                            <div className="col-md-6">
                                <div className="form-group mb-3">
                                    <label htmlFor="selectUser" className="form-label">Select User</label>
                                    <select className="form-control form-control-md" id="receiverId"
                                        onChange={(e) => {
                                            const { id, value, key } = e.target;
                                            setFormData({
                                                ...formData,
                                                ...{
                                                    // receiverId: JSON.parse(value)?._id,
                                                    email: JSON.parse(value)?.gmail,
                                                    client_id: JSON.parse(value)?._id,

                                                }
                                            })
                                        }}>
                                        <option value="">Select User</option>
                                        {User && User.filter(item=>item.user_id != projectdata?.project?.user_id).map(item => (
                                            <option value={JSON.stringify(item.userdata)} key={item.user_id}>
                                                {item.userdata.first_name} {item.userdata.last_name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="row justify-content-center">
                            <div className="col-md-2">
                                <div className="d-grid gap-2">
                                    <button
                                        className="btn btn-primary "
                                        type="button"
                                        onClick={() => {
                                            HandleUpdate()
                                        }}
                                    >
                                       Request Invoice
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* {invoice && <div className="d-flex justify-content-center">
                    <div className="card  col-3 shadow-lg rounded" style={{ marginRight: "2%" }}>
                        <div style={{ backgroundColor: "#8AC53F", height: '18px', marginBottom: "5%", borderTopLeftRadius: "10px", borderTopRightRadius: "10px" }}>
                        </div>
                        <div className="row text-center mx-4">
                            <div className="col ">
                                <div className="form-group mb-3">
                                    <img
                                        src={`http://connect-client.qcodesinfotech.com/images/profile/img0${UserData?.randomprofile}.png`}
                                        alt="user1"
                                        width={58}
                                        height={58}
                                        className="rounded-circle"
                                    />
                                </div>
                                <div className="form-group mb-2 d-flex">
                                    <span style={{ fontWeight: 'bold', marginRight: "2%" }}>User Name:</span>
                                    <p className="ml-3">{UserData.first_name} {UserData.last_name}</p>
                                </div>
                                <div className="form-group mb-2 d-flex ">
                                    <span style={{ fontWeight: 'bold', marginRight: "2%" }}>Email:</span>
                                    <p className="ml-3"> {UserData.gmail}</p>
                                </div>
                                <div className="form-group mb-2 d-flex ">
                                    <span style={{ fontWeight: 'bold', marginRight: "2%" }}>Phone Number:</span>
                                    <p className="ml-3"> {UserData.phone}</p>
                                </div>
                                <div className="form-group mb-2 d-flex">
                                    <span style={{ fontWeight: 'bold', marginRight: "2%" }}>City:</span>
                                    <p className="ml-3"> {UserData.city}</p>
                                </div>
                                <div className="form-group mb-2 d-flex">
                                    <span style={{ fontWeight: 'bold', marginRight: "2%" }}>Country:</span>
                                    <p className="ml-3"> {UserData.country}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card p-4 col-8 rounded" style={{ boxShadow: "#ddd -1px 0px 9px 4px" }}>
                        <div className="row mt-2">
                            <div className="form-group mb-3 col-md-6 outlined-input">
                                <input type="text" className="form-control" id="invoiceNo" value={formData.invoiceNo} onChange={(e) => { handlechange(e) }} />
                                <label htmlFor="invoiceNo">Invoice Number</label>
                            </div>
                            <div className="form-group mb-3 col-md-6 outlined-input">

                                <input type="text" className="form-control" id="bpCharges" placeholder="" onChange={(e) => { handlechange(e) }} />
                                <label htmlFor="payment">Business Partner Charges (%)</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="form-group mb-3 col-md-6">
                                <label htmlFor="modeOfPayment">Mode of Payment</label>
                                <select className="form-control" id="mop" onChange={(e) => { handlechange(e) }} defaultValue="">
                                <option value="" disabled>Select type</option>
                                    <option>Paypal</option>
                                    <option>Stripe</option>
                                    <option>Cash</option>
                                </select>
                            </div>

                            <div className="form-group mb-3 col-md-6 outlined-input mt-4">

                                <input type="datetime-local"  className="form-control" id="dueDate" placeholder="Enter Due Date" onChange={(e) => { handlechange(e) }} />
                                <label htmlFor="dueDate">Due Date</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="form-group mb-3 col-md-6 outlined-input">
                                <input type="text" className="form-control" id="remark" placeholder="" onChange={(e) => { handlechange(e) }} />
                                <label htmlFor="remark">Remark</label>
                            </div>
                            <div className="form-group mb-3 col-md-6 outlined-input">
                                <input type="text" className="form-control" id="amount" placeholder="" onChange={(e) => { handlechange(e) }} />
                                <label htmlFor="amount">Amount</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="form-group mb-3 col-md-6 outlined-input">
                                <input type="text" className="form-control" id="currency" onChange={(e) => { handlechange(e) }} placeholder="" />
                                <label htmlFor="currency">Currency</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12 d-flex justify-content-end mt-4">
                                <button disabled={InvoiceButton} className="btn btn-primary" onClick={() => { HandleUpdate() }}>{InvoiceButton ? 'Loading' : 'Add to Invoice'}</button>
                            </div>
                        </div>
                    </div>
                </div>} */}
            </div>
        </div>
    )
}

export default Invoice
