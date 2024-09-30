import React, { useEffect, useState } from 'react'
import FetchData from '../../../fetch-api/Apifetch';
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
    const [UserData, setUserData] = useState(JSON.parse(localStorage.getItem("LOGINDATA")).user);
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
    useEffect(() => {
        setFormData((prevFormData) => ({
          ...prevFormData,
          invoiceNo: "INV-" + generateInvoiceNumber(7),
          transactionNo: "CONSQ-" + generateInvoiceNumber(12)
        }));
      }, []);
    
      function generateInvoiceNumber(length) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let result = '';
        for (let i = 0; i < length; i++) {
          const randomIndex = Math.floor(Math.random() * characters.length);
          result += characters.charAt(randomIndex);
        }
        return result;
      }

 
    console.log('UserData', UserData);
    useEffect(() => {
        fetchNotifyList()
        console.log(state);
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
                    // navigate(`/bp/project-connection/${state?.project_id}`)
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
            //     text: 'Notification Sent To Customer.',
            //     icon: 'success'
            //   });
        } catch (error) {
            console.error("Error fetching user list:", error.message);
            setInvoiceButton(false)
        }

    }

    return (
        <div className="body-wrapper">
            <div className="container-fluid w-75">
               <div className="row  d-flex justify-content-center d-none">
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
                                                {item.project.title} ({item.project_id})
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
               <div className="row mt-3 mx-0">
  <div className="col-lg-12 col-12 px-1">
    <div
      className="container-fluid rounded d-flex w-100 py-1 bg-white justify-content-between align-items-center"
      style={{ height: 50, boxShadow: "lightgrey 0px 2px 2px 1px" }}
    >
      <span className="fontsubtitle font-weight-bold">Invoices</span>
      <div className="d-flex column-gap-2 align-items-center">
        <img src="/images/icons/settings.png" width={20} height={20} />
        <button className="btn btn-outline-success ">+ Add</button>
      </div>
    </div>
    <div className="container-fluid d-flex py-3 px-1">
      <div className="active mx-1 py-2 " style={{ cursor: "pointer" }}>
        <span className="fontsubtitle font-weight-bold">Paid</span>
      </div>
      <div className="false mx-1 py-2" style={{ cursor: "pointer" }}>
        <span className="fontsubtitle font-weight-bold">Unpaid</span>
      </div>
    </div>
    <div className="card border-0 w-100 " style={{ height: "auto" }}>
      <div className="d-flex border justify-content-around align-items-center py-3">
        <p
          className="fontsubtitle font-weight-bold mb-1 text-center d-none d-md-block d-lg-block w-10"
          style={{ color: "rgb(69, 53, 193)" }}
        >
          1
        </p>
        <div className="w-25 text-center">
          <p
            className="fontsubtitle font-weight-bold mb-1"
            style={{ color: "rgb(69, 53, 193)" }}
          >
            INV-KEWBNPY
          </p>
          <p className="fontcontent2 text-secondary1 mb-0">15/06/2024</p>
        </div>
        <div className="w-25 text-center">
          <p
            className="fontsubtitle font-weight-bold mb-1"
            style={{ color: "rgb(69, 53, 193)" }}
          >
            Total: 1000
          </p>
          <p className="fontcontent2 text-secondary1 mb-0">25/06/2024</p>
        </div>
        <div className="w-10 text-center">
          <div
            className="px-2 py-1 rounded fontcontent1"
            style={{
              background: "rgb(205, 255, 232)",
              color: "rgb(86, 224, 161)"
            }}
          >
            You
          </div>
        </div>
        <div className="d-flex flex-column flex-lg-row w-25 justify-content-center">
          <button
            className="btn py-1 fontsubtitle font-weight-bold text-white mx-1"
            style={{ background: "rgb(69, 53, 193)" }}
          >
            View
          </button>
          <button
            className="btn py-1 fontsubtitle font-weight-bold text-white mx-1"
            style={{ background: "rgb(17, 151, 148)" }}
          >
            Pay
          </button>
          <button
            className="btn py-1 fontsubtitle font-weight-bold text-white mx-1"
            style={{ background: "rgb(17, 151, 148)" }}
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  </div>
</div>

            </div>
        </div>
    )
}

export default Invoice
