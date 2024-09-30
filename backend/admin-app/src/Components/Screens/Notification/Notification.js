import React, { useState, useEffect ,useRef } from 'react'
import FetchData from '../../fetch-api/Apifetch';
import Swal from 'sweetalert2';
import Modal from 'react-bootstrap/Modal';
import { BASE_URL } from '../../utils/ApiRoute';
import { LoaderSpin } from '../../utils/Function';
import SignatureCanvas from 'react-signature-canvas'
import { useNavigate } from 'react-router-dom';
const Notification = () => {
  const [UserData, setUserData] = useState(JSON.parse(localStorage.getItem("User")));
  const [listNatification, setListNotification] = useState([])
  const [filteredData, setFilteredData] = useState([]);
  const [selectoption, setSelectoption] = useState(0);
  const [selectedItem, setSelectedItem] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  useEffect(() => {
    fetchNotifyList()
  }, [])

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  };

  const fetchNotifyList = async () => {
    setLoading(true)
    try {
      const res = await FetchData(`notify_list/${UserData._id}`, 'GET', null, true, false);
      if (res.success) {
        setListNotification(res.data);
        const Listvalue =res.data;
        setFilteredData(Listvalue.filter(item => item.status === 0))
        setLoading(false)
      }
    } catch (error) {
      console.error("Error fetching user list:", error.message);
    }
  };

  const HandleUpdate = async (item,status) => {
    try {
      const ItemData = {
        status: status,
        user_id: item?.user_id,
        bp_id: item?.bp_id,
      }
      Swal.fire({
        title: `Are you sure you want change status to ${status == 1 ? "Approve" : "Rejected"}`,
        showCancelButton: true,
        confirmButtonText: "Yes",
        denyButtonText: "Cancel",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const res = await FetchData(`notify_update`, 'POST', JSON.stringify(ItemData), true, false);
          if (res.success) {
            fetchNotifyList()
          }
        }
      })
    } catch (error) {
      handleClose()
      console.error("Error fetching user list:", error.message);
    }
  }
  return (
    <div className="body-wrapper">
      {loading == true ? (<LoaderSpin />) : null}
     
      {/* <div className='col-3 d-flex m-4 justify-content-around'>
      <p className='ml-2 mr-4' style={{borderBottom:selectoption == 0?'4px solid #8AC53F':""}} onClick={() => {filterData(0)
               setSelectoption(0)}}>Pending</p>    
                <p className='' style={{borderBottom:selectoption == 1?'4px solid #8AC53F':""}} onClick={() => {filterData(1) 
                setSelectoption(1)
                }}>Accepted</p>
                 <p className='ml-4' style={{borderBottom:selectoption == 2?'4px solid #8AC53F':""}} onClick={() => {filterData(2) 
                setSelectoption(2)
                }}>Rejected</p>
      </div> */}
      <div className='container-fluid'>
      {listNatification.map((item, index) =>  (
          <div className='card shadow mb-1' style={{}}>
            <div className='d-flex py-2'>
              <div className="rounded-circle text-center" style={{ width: '10%' }}>
                <img src="http://connect-client.qcodesinfotech.com/images/profile/img01.png" width={60} height={60} />
              </div>
              <div style={{ width:'70%'}}>
                <span></span>
                <div className='mb-1 d-flex justify-content-start align-items-center column-gap-2'>{item.status != 1 ? ( `Hi ${UserData.first_name + " " + UserData.last_name}, someone has sent you an invite, would you like to accept & explore the business opportunity ?`):(`You have accepted the request for the respective user!`)}</div>
                <div className={` mb-1  `} style={{ fontWeight: "900" ,color: item.status === 0 ? "orange" : item.status == 1 ? "#8ac43f" : "#e04d46"}}>{item.status == 0 ? (
            <>
              <i class="fa-solid fa-hourglass-end"></i> Pending List
            </>
          ) : item.status == 1 ? 
                 (
                  <>
                    <i class="fa-solid fa-circle-check"></i> Approved by Business Partner
                  </>):(
            <>
              <i class="fa fa-ban" aria-hidden="true"></i> Rejected
            </>
          )
                  
                  }</div>
              </div>
              
              <div style={{ height: "70px", lineHeight: "70px" }}>
                <button
                  onClick={() => HandleUpdate(item,1)} disabled={item.status == 1 || item.status == 2}
                  className="btn btn-connect small mx-1" style={{ fontSize: "12px", backgroundColor: "#8AC53F", color: "white" }}>{item.status == 1 ? 'Approved': item.status == 2 ? 'Rejected': 'Approve'}</button>
            {item.status ==0 &&
                <button
                  onClick={() => HandleUpdate(item,2)} disabled={item.status == 1 || item.status == 2}
                  className="btn btn-danger small mx-1" style={{ fontSize: "12px", color: "white" }}>Reject</button>}
            
              </div>
            </div>
          </div>
        ))}
      </div>


    </div>)
}

export default Notification