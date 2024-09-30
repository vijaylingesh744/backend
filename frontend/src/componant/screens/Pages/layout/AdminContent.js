import React, { useState, useEffect } from "react";
import { Modal, NavItem } from "react-bootstrap";
import { toast } from "react-toastify";
import FetchData from "../../../fetch-api/Apifetch";
import { handleImageError, Imagesource } from "../../../utils/Function";
const AdminContent = ({ PropsPage }) => {
  const { PageDetails, ModalAdmin, AdminToggle } = PropsPage;
  const [ChatUser, setChatUser] = useState([]);
  const [selectedRole, setSelectedRole] = useState(0);
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("LOGINDATA"))?.user
  );
  const [Selected, setSelected] = useState([]);
  const [Step, setStep] = useState(0);

  const RoleArray = [
    { id: 1, name: "Admin",desc:'Grant admin-level permissions to control and manage this page effectively.' },
    // { id: 2, name: "Content writer", desc:'Grant content writer permissions to create, edit, and manage content on this page.' },
  ];
  const [ViewTab,setViewTab] = useState(1)
  const [ExistUserData,setExistUser] = useState(1)
  useEffect(() => {
    if(PageDetails){
      UserData(PageDetails?._id)
    }
    onReqConnection();
  }, [PageDetails]);

  const handleCheckboxChange = (id) => {
    setSelected((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((itemId) => itemId !== id)
        : [...prevSelected, id]
    );
  };

   const UserData = async(id)=>{
     const ExistsUser = await FetchData(
      `exist/page_admin/${id}`,
      "GET",
      null,
      true,
      false
     )
     setExistUser(ExistsUser?.data[0]?.users)
   }

  const onReqConnection = async () => {
    const res = await FetchData(
      `userConnectlist/${user?._id}`,
      "GET",
      null,
      true,
      false
    );
    if (res.data) {
      const filteredConnectionList = res.data
        .filter((item) => item.status == 1)
        .map((item) => {
          if (item.matchedField === "senderData") {
            item.receiveDetails.userRemoveId = item._id;
            return item.receiveDetails; // Extract receiveDetails if matchedField is senderData
          } else if (item.matchedField === "receiverData") {
            item.senderDetails.userRemoveId = item._id;
            return item.senderDetails; // Extract senderDetails if matchedField is receiverData
          }
          return null; 
        })
        .filter((item) => item !== null); // Filter out any null values
      setChatUser(filteredConnectionList);
    }
  };
  const usersToDisplay = ChatUser.filter(newUser => {
    return Array.isArray(ExistUserData) && !ExistUserData.some(existingUser => existingUser.userDetails._id?.toString() === newUser._id?.toString());
  });
    const RemoveAdmin =async(id)=>{
      const confirmed = window.confirm("Are you sure you want to remove this user?");
  
      if (!confirmed) {
        return; // Exit if the user did not confirm
      }

  try {
      const ExistsUser = await FetchData(
        `remove/page_admin/${PageDetails?._id}/${id}`,
        "GET",
        null,
        true,
        false
      )
      toast.success('User Access Removed')
      UserData(PageDetails?._id)
    } catch (error) {
      toast.error('Error removing user access');
    }
  
    }
  const AddAdminUsers = async () => {
  
    const usersArray = Selected.map(item => ({
      user: item, // Map each user_id to an object
      role: selectedRole // Assuming you need to send the selected role for each user
    }));
  
    const data = {
      users: usersArray,
      page_id: PageDetails._id
    };
      try {
        const res = await FetchData('add/page_admin', 'POST',JSON.stringify(data), false, false);
        AdminToggle()
    setStep(0)
    setSelected([])
    setSelectedRole()
    UserData(PageDetails?._id)
    toast.success('New User Access Granted')
      } catch (err) {
        console.log(`Error adding user`, err);
      }
  };

  const handleRoleChange = (event) => {
    setSelectedRole(parseInt(event.target.value)); // Update selected role
  };
  const oncloseModal = async ()=>{
    AdminToggle()
    setStep(0)
  }

  return (
    <div>
      <Modal
        show={ModalAdmin}
        onHide={() => AdminToggle()}
        className="modelfilter "
        size="mdd"
      >
        <Modal.Header>
          <span className=" fontsubtitle text-dark1 mb-0 ml-4 font-weight-bold">
            Add Page Access
          </span>
          <i
            class="fa fa-times"
            aria-hidden="true"
            style={{ cursor: "pointer" }}
            onClick={() => oncloseModal()}
          ></i>
        </Modal.Header>
        <Modal.Body>
          {Step == 0 ? (
            <div className=" card border-0 shadow-none align-items-center h-100 row-gap-1">
              <div className="w-100">
                <span className="fontsubtitle text-dark1 ml-4 font-weight-bold">
                  {PageDetails?.title}
                </span>
                <p className="fontcontent2 text-dark font-weight-light ml-4">
                  Please select your role to access specific page content. This will ensure you have the appropriate permissions for viewing the information
                </p>
              </div>
  
<div className="container d-flex px-lg-3 px-0 w-100">
    <div
      className={`w-50 d-flex justify-content-center ${ViewTab === 1 ? 'activestop' : ''} py-3`}
      role="button"
      onClick={() => setViewTab(1)}
    >
      <span className="fontsubtitle"> Page Users</span>
    </div>
    <div
    className={`w-50 d-flex justify-content-center ${ViewTab === 2 ? 'activestop' : ''} py-3`}
    role="button"
    onClick={() => setViewTab(2)}
    >
      <span className="fontsubtitle" style={{ width: "max-content" }}>
      Privileged Users
      </span>
    </div>
    </div>

              <div className="container-fluid pb-2 mt-3" style={{maxHeight:'230px',overflowY:'scroll',display:ViewTab === 1?"block":"none"}}>
                {usersToDisplay.map((item) => (
                  <div
                    key={item._id} 
                    className="d-flex align-items-center justify-content-between px-3 py-2 border-bottom"
                  >
                    <div className="d-flex column-gap-3 w-75">
                      <img
                        className="rounded-circle"
                        src={`${
                          item?.profile
                            ? `${Imagesource(item?.profile)}`
                            : `/images/profile/img0${item?.randomprofile}.png`
                        }`}
                        onError={handleImageError}
                        width={50}
                        height={50}
                        alt={`${item?.first_name} ${item?.last_name}`}
                      />
                      <div className="d-flex flex-column w-75">
                        <span className="fontcontent1 text-dark1">
                          {item?.first_name} {item?.last_name}
                        </span>
                        <span className="font-weight-light font-weight-normal w-85 fontcontent2">
                          {item?.designation}
                        </span>
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      className="form-check-input position-relative"
                      checked={Selected.includes(item._id)}
                      onChange={() => handleCheckboxChange(item._id)}
                    />
                  </div>
                ))}
              </div>
              <div className="container-fluid pb-2 mt-3" style={{maxHeight:'230px',overflowY:'scroll',display:ViewTab === 2?"block":"none"}}>
                {Array.isArray(ExistUserData) && ExistUserData.map((item) => (
                  <div 
                    className="d-flex align-items-center justify-content-between px-3 py-2 border-bottom"
                  >
                    <div className="d-flex column-gap-3 w-75">
                      <img
                        className="rounded-circle"
                        src={`${
                          item?.profile
                            ? `${Imagesource(item?.userDetails?.profile)}`
                            : `/images/profile/img0${item?.userDetails?.randomprofile}.png`
                        }`}
                        onError={handleImageError}
                        width={50}
                        height={50}
                        alt={`${item?.userDetails?.first_name} ${item?.userDetails?.last_name}`}
                      />
                      <div className="d-flex flex-column w-75">
                        <span className="fontcontent1 text-dark1">
                          {item?.userDetails?.first_name} {item?.userDetails?.last_name}
                        </span>
                        <span className="font-weight-light font-weight-normal w-85 fontcontent2">
                          {item?.userDetails?.designation}
                        </span>
                      </div>
                    </div>
                   <span>
                    {item?.role == 1?"Admin":"Content writer"}
                   </span>
                   <span className="text-danger" role="button"
                   onClick={()=>RemoveAdmin(item?.userDetails?._id)}
                   >
                    Remove
                   </span>
                  </div>
                ))}
              </div>

              <div></div>
            </div>
          ) : (
            <div className=" card border-0 shadow-none align-items-center h-100 row-gap-1">
              <div className="w-100">
                <span className="fontsubtitle text-dark1 ml-4 font-weight-bold">
                  Set access to {PageDetails?.title}
                </span>
                <p className="fontcontent2 text-dark font-weight-light ml-4">
                Please assign access rights and permissions to control what users can do on this page. 
                Make sure to select the appropriate roles for each user.
                </p>
              </div>
              <div className="container-fluid pb-2 mt-3">
                {/* {usersToDisplay.map((item) => (
                  <div
                    key={item._id} // Add a key for each mapped item
                    className="d-flex align-items-center justify-content-between px-3 py-2"
                  >
                    <div className="d-flex column-gap-3">
                      <img
                        className="rounded-circle"
                        src={`${
                          item?.profile
                            ? `${Imagesource(item?.profile)}`
                            : `/images/profile/img0${item?.randomprofile}.png`
                        }`}
                        onError={handleImageError}
                        width={50}
                        height={50}
                        alt={`${item?.first_name} ${item?.last_name}`}
                      />
                      <div className="d-flex flex-column">
                        <span className="fontcontent1 text-dark1">
                          {item?.first_name} {item?.last_name}
                        </span>
                        <span className="font-weight-light font-weight-normal fontcontent2">
                          {item?.designation}
                        </span>
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      className="form-check-input position-relative"
                      checked={Selected.includes(item._id)}
                      onChange={() => handleCheckboxChange(item._id)}
                    />
                  </div>
                ))} */}
                {RoleArray.map((role) => (
                  <div key={role.id} className="form-check">
                    <input
                      type="radio"
                      id={`role-${role.id}`}
                      name="role"
                      value={role.id}
                      checked={selectedRole === role.id}
                      onChange={handleRoleChange}
                      className="form-check-input mt-3"
                    />
                    <label
                      htmlFor={`role-${role.id}`}
                      className="form-check-label text-dark1 mb-1"
                    >
                      {role.name}
                    </label>
                    <p className="text-secondary1 fontcontent2">{role.desc}</p>
                  </div>
                ))}
                {/* {selectedRole !== null && (
                  <p>
                    Selected Role:{" "}
                    {RoleArray.find((role) => role.id === selectedRole)?.name}
                  </p>
                )} */}
              </div>

              <div></div>
            </div>
          )}
          <Modal.Footer>
            <div>
              <div className="d-flex justify-content-center mt-4 gap-2">
                {Step ==1 && 
                <button  className="btn btn-outline-connect" onClick={()=>setStep(0)}>
                  Back
                </button>
                }
                <button
                  disabled={Selected?.length == 0}
                  className="btn btn-connect1"
                  onClick={() => {
                    if (Step == 0) {
                      setStep(1);
                    } else {
                      AddAdminUsers();
                    }
                  }}
                >
                  {Step == 1 ? "Make As Admin" : "Set Role"}
                </button>
              </div>
            </div>
          </Modal.Footer>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AdminContent;
