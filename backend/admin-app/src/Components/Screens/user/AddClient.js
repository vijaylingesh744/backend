import React, { useState, useEffect } from 'react';
import FetchData from '../../fetch-api/Apifetch';
import Button from 'react-bootstrap/Button';
import Swal from 'sweetalert2';
import "./user.css"
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Modal } from 'react-bootstrap';

function Userlist() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(JSON.parse(localStorage.getItem('User')));
  const [userList, setUserList] = useState([]);
  const [ClientList, setClientList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, SetModalView] = useState(false);

  const [formdata, setFormdata] = useState({
    user_type: '',
    user_id: '',
    bp_id: '',
    req_date_time: ''
})

const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormdata({ ...formdata, [name]: value });
};
useEffect(() => {
    fetchUserList();
    listClients();
}, []);

const handleClose = () => {
    SetModalView(false);
};

const handleshow = (type) => {
    SetModalView(true);
}

const fetchUserList = async () => {
    try {
        const res = await FetchData(`get_client/${userData._id}`, 'GET', null, true, false);
        if (res.success) {
            setUserList(res.data);
        }
    } catch (error) {
        console.error("Error fetching user list:", error.message);
    } finally {
        setLoading(false);
    }
};

const listClients = async()=>{
try {
    const res = await FetchData(`listclient/${userData._id}`, 'GET', null, true, false);
    if (res.success) {
      setClientList(res.data);
    }
} catch (error) {
    console.error("Error fetching user list:", error.message);
} finally {
    setLoading(false);
}
}
  const InputField = (label, name, type, value, onChange, placeholder) => (
    <div className="col-10 mb-2 mt-3 inputs-form">
        <label htmlFor={`exampleInput${name}`} className="form-label mr-3" style={{ fontWeight: "500" }}>
            {label}
        </label>
        <input type={type} className="form-control inputcontrol" name={name} value={value} onChange={onChange} placeholder={placeholder} />
    </div>
);

const SelectOption = (title, col = 6, name, type, value, onChange) => {
    var options = []
    var con = true
    if (name == "user_type") {
        options = [
            "Buyer",
            "Seller",
        ]
    } else {
        con = false
        options = userList;
    }
    return (
        <div className="col-10 mb-2 mt-3 inputs-form">
            <label htmlFor={`exampleInput${title}`} className="form-label mr-3" style={{ fontWeight: "500" }}>
                {title}
            </label>
            <select name={name} value={value} className='form-control' onChange={onChange}
            ><option value={""}>Select Option</option>
                {options.map(item => (
                    con ? <option value={item}>{item}</option> : <option value={item.userdata._id}>
                        {item.userdata.first_name} {item.userdata.last_name}
                    </option>
                ))}
            </select>
        </div>
    )
}


const AddClients = async () => {
  const updatedata = {
      user_id: formdata.user_id,
      bp_id: userData._id,
      user_type: formdata.user_type,
      req_date_time: formdata.req_date_time
  }

  const res = await FetchData('add_client', 'POST', JSON.stringify(updatedata), true, false);
  console.log("stored data", res)
  handleClose();
  listClients();

}

  if(loading) {
    return <img src='assets/images/logos/Spinner-5.gif' style={{ textAlign: "center", marginTop: "27%", marginLeft: "40%" }} />;
  }
  return(
    <div className="body-wrapper">
      <div className="container-fluid">
        <div className="card bg-info-subtle shadow-none position-relative overflow-hidden mb-4">
          <div className="card-body px-4 py-3">
            <div className="row align-items-center">
              <div className="col-9">
                <h4 className="fw-semibold mb-8">Client Users</h4>
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a className="text-muted text-decoration-none" href="/">
                        Home
                      </a>
                    </li>
                    <li className="breadcrumb-item" aria-current="page">
                      Client Users
                    </li>
                  </ol>
                </nav>
              </div>
              <div className="col-3">
                <div className="text-center mb-n5">
                  <img
                    src="/assets/images/breadcrumb/ChatBc.png"
                    alt=""
                    className="img-fluid mb-n4"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="float-end  mb-2 px-4 rbc-btn-group1">
        <button className="px-2 py-2" onClick={()=>handleshow()}>Add Clientq</button>
      </div>
        {/* <div class="row mx-1 ">
            {ClientList && ClientList.map((user, index) => (
              <div class="col-sm-4 mx-4 my-2">
                <div class="card border border-secondary"  style={{width:'350px'}} >
                    <div class="card-body text-center">
                      <h6 class="card-title" style={{ color: 'gray' }}>Name:<span className='mx-3' >{user.userdata?.first_name}<span className='mx-2'>{user.userdata?.last_name}</span></span></h6>
                                    
                        <p class="">Type :<span className='mx-3' >{user.user_type}</span></p>
                        <p class="">Designation :<span className='mx-3' >{user.userdata?.designation}</span></p>

                        <p class="">Address :<span className='mx-3' >{user.userdata?.city}</span></p>
                          <a href="#" class="btn btn-primary">View</a>

                                </div>
                            </div>
                        </div>
                    ))}

                </div> */}

      <div className='container'>
        <table className="table">
          <thead>
            <tr>
              <th scope="col" style={{ background: "aliceblue", fontSize: "14px", borderRadius: "0px 0px 0px 0px" }}>No.</th>
              <th scope="col" style={{ background: "aliceblue", fontSize: "14px" }}>request Date</th>
              <th scope="col" style={{ background: "aliceblue", fontSize: "14px" }}>User Type</th>
              <th scope="col" style={{ background: "aliceblue", fontSize: "14px", borderRadius: "0px 0px 0px 5px" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {ClientList.map((user, index) => (
              <tr key={index}>
                <th scope="row">{index+1}</th>
                <td>{user.req_date_time}</td>
                <td>{user.user_type}</td>
                <td>
                    <Button variant="primary" >
                      View
                    </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal show={showModal} onHide={handleClose} className="modelfilter modal-md" size="md">
         <Modal.Header>Add Client</Modal.Header>
             <Modal.Body><div className="d-flex flex-column align-items-center">
                        {SelectOption("User Type", 6, "user_type", "text", formdata.user_type, handleInputChange, true)}
                        {SelectOption("Select user", 6, "user_id", "text", formdata.user_id, handleInputChange, true)}
                        {InputField("Req Date Time*", "req_date_time", "datetime-local", formdata.req_date_time, handleInputChange, "Enter your Title")}
                        <div className="col-10 row mb-2 mt-3 inputs-form justify-content-around">
                            <button className='col-4  border-0 mt-3 py-2 submit-btn' 
                            onClick={()=>AddClients()}>
                                Add Client
                            </button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
    </div>
  );
}

export default Userlist;