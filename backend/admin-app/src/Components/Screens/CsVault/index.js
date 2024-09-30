import React, { useState, useEffect } from "react";
import FetchData from "../../fetch-api/Apifetch";
import FilterColumn from "./Component/FilterColumn";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import './style/csvalut.css';
import Swal from "sweetalert2";
import { LoaderSpin } from "../../utils/Function";
import { useLocation } from "react-router-dom";
import { Button } from "react-bootstrap";

const Index = () => {
  const Location = useLocation();
  const { state } = Location;
  const [userList, setUserList] = useState([]);
  const [UserData, setUserData] = useState(
    JSON.parse(localStorage.getItem("User"))
  );
  const [page, setPage] = useState(1);
  const [paginationInfo, setPaginationInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [businessList, setBusinessList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [projectId, setProjectId] = useState("");
  const [csv, setCsv] = useState(true);
  const [myvalut, setmyvalut] = useState(false);
  const [Userproject, setUserproject] = useState({});
  const [UserExist, setUserExist] = useState([]);
  const [UserDataExist, setUserDataExist] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [skill, Setskills] = useState([]);
  const [options, setOptions] = useState([]);
  const handleCheckboxChange = (title) => {
    if (selectedItems.includes(title)) {
      setSelectedItems(selectedItems.filter((item) => item !== title));
    } else {
      setSelectedItems([...selectedItems, title]);
    }
  };
  useEffect(() => {
    if (state) {
      // setCsv(false)
      // setmyvalut(true)
      // HandleSubmit()
      console.log(state);
      setProjectId(state?.project_id);
      listProjects(state?.project_id);
    }
    dataList();
  }, []);



  const changeview = () => {
    setCsv(true);
    setmyvalut(false);
  };
  useEffect(() => {
    listProjects(projectId);
  }, [projectId]);

  const [listNatification, setListNotification] = useState([]);
  const [selectedItem, setSelectedItem] = useState(false);
  useEffect(() => {
    fetchNotifyList();
  }, []);

  const [show, setShow] = useState(false);
  const handleShow = (item) => {
    setUserproject(item);
    setShow(true);
  };

  const handleClosePop = () => {
    setShow(false);
  };
  const listProjects = async (id = projectId) => {
    try {
      const res = await FetchData(`list/project/${id}`,"GET",null,true,false);
      setUserExist(res.data.map((item) => item.user_id));
      setUserDataExist(res.data.map((item) => item));
      console.log(res.data);
    } catch (error) {
      console.error("Error fetching user list:", error.message);
    }
  };

  const fetchNotifyList = async () => {
    setLoading(true);
    try {
      const res = await FetchData(`notify_list/${UserData._id}`,"GET",null,true,false);
      if (res.success) {
        const Listvalue = res.data;
        setListNotification(Listvalue.filter((item) => item.status == 1));
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching user list:", error.message);
    }
  };

  const HandleUpdate = async (id) => {
    console.log(projectId);
    try {
      if (!projectId) {
        Swal.fire({
          title: "Validate Error!",
          text: "Select Project Id",
          icon: "error",
        });
        return;
      }
      const ItemData = {
        user_id: id,
        bp_id: UserData._id,
        project_id: projectId,
        status: 1,
        user_type: "1",
      };
      const res = await FetchData(`add/connection`,"POST",JSON.stringify(ItemData),true,false);
      if (res.status) {
        listProjects();
      }
      Swal.fire({
        title: "Success!",
        text: "Notification Sended To Customer.",
        icon: "success",
      });
      handleClosePop();
    } catch (error) {
      handleClosePop();
      console.error("Error fetching user list:", error.message);
    }
  };
  const [Formdata, setFormData] = useState({
    location: "",
    user_type: state?.user?.user_type == "0" ? "2" : "0",
    country: "",
    city: "",
  });
  const setUserType = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      user_type: "-1",
    }));
  };
  const setLocation = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      location: "",
    }));
  };

  const dataList = async () => {
    const res = await FetchData("industry", "GET", null, false, false);
    setOptions(res.data.data);
  };
  const FetchApiData = async (id) => {
    const res = await FetchData("skill/" + id, "GET", null, false, false);
    Setskills(res.data.data);
  };

  // useEffect(() => {
  //   fetchUserList();
  // }, [page]);
  const NextPage = () => {
    setPage(page + 1);
  };

  const PreviousPage = () => {
    setPage(page - 1);
  };

  const [filterText, setFilterText] = useState("");
  const handleFilterChange = (event) => {
    setFilterText(event.target.value);
  };
  const [showFilter, setFilter] = useState(false);
  const HandleSubmit = async () => {
    if (Formdata.filter_by == "1") {
      fetchUserList();
      return;
    }
    setFilter(true);
    setLoading(true)
    var Objectdata = { ...Formdata, ["skills"]: selectedItems };
    const res = await FetchData("filter_user","Post",JSON.stringify(Objectdata),false,false);
      if(res.data){
      setLoading(false)
      }
      setUserList(res.data.users);
      setPaginationInfo(res.data.pagination || null);
  };

  const paginationNumbers = () => {
    const totalPages = paginationInfo?.totalPages || 0;
    const currentPage = page;
    const paginationRange = 10;
    const paginationStart = Math.max(
      1,
      currentPage - Math.floor(paginationRange / 2)
    );
    const paginationEnd = Math.min(
      totalPages,
      paginationStart + paginationRange - 1
    );
    const numbersToShow = [];
    for (let i = paginationStart; i <= paginationEnd; i++) {
      numbersToShow.push(i);
    }
    return numbersToShow;
  };

  const handleClose = () => {
    setFormData({ ...Formdata, ["location"]: "" });
    setFilter(false);
    setSelectedItems([]);
    fetchUserList();
  };

  const fetchUserList = async () => {
    try {
      var query = `page=${page}&limit=10`;
      if (page > 1) {
        Swal.fire({
          title: "info!",
          text: "You will Need Refer Minimum 5 Users",
          icon: "info",
        });
        return;
      }
      if (searchQuery) {
        query = `page=${page}&limit=15&search=${searchQuery}`;
      }

      var url = `list/user?${query}`;
      if (Formdata.filter_by == "1") {
        url = `list/business?${query}&location=${Formdata.location}`;
      }
      const res = await FetchData(url, "GET", null, true, false);
      if (res.success) {
        if (Formdata.filter_by == "1") {
          setBusinessList(res.data.data);
        } else {
          setUserList(res.data.users);
        }
        setPaginationInfo(res.data.pagination || null);
      } else {
        console.error("Error fetching user list:", res.message);
      }
    } catch (error) {
      console.error("Error fetching user list:", error.message);
    }
  };

  const handleprojectselect = (e) => {
    console.log(e.target.value);
    setProjectId(e.target.value);
    setTimeout(() => {
      console.log(projectId);
    }, 3000);
  };

  const handletype =async (value)=>{
    console.log(value);
  }

  const BusinessList = () => {
    return (
      <div
        className="mx-auto scroll px-0"
        style={{
          overflowY: "scroll",
          maxHeight: "100vh",
          scrollbarWidth: "none",
          background: "#fff",
          borderRadius: "2%",
        }}
      >
        {businessList &&
          businessList.map((item) => (
            <div
              className="d-flex bg-white  justify-content-between my-1 px-4 py-2"
              style={card}
            >
              <div className="px-3 w-50 d-flex">
                <div className="align-items-center d-flex w-25">
                  <img
                    src="http://connect-client.qcodesinfotech.com/images/icons/corprate.png"
                    alt="company image"
                    style={{ width: "100px" }}
                  />
                </div>
                <div className="mx-2">
                  <div className="small font-weight-bold">
                    {item.Company} -{item.Name}
                  </div>
                  <p className="text-secondary m-0" style={{ fontSize: 12 }}>
                    {item.Address} <br />
                    {item?.Company_Category_Subcategory}
                  </p>
                </div>
              </div>
              <div className="d-flex flex-column justify-content-center mx-auto text-center">
                <span
                  className="d-flex ml-4 my-2 name2"
                  style={{ alignItems: "center", fontSize: 12 }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    fill="currentColor"
                    class="bi bi-geo-alt-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6" />
                  </svg>
                  {item.City}
                </span>
                <div
                  className="text-start ml-4 rewards text-secondary"
                  style={{ fontSize: 12 }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-telephone-fill"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z"
                    />
                  </svg>{" "}
                  {item.Mobile}
                </div>
                <div
                  className="ml-4 rewards text-secondary"
                  style={{
                    fontSize: 13,
                    display: "inline-flex",
                    alignItems: "center",
                  }}
                >
                  <i
                    className="fa fa-envelope mr-1"
                    aria-hidden="true"
                    style={{ cursor: "pointer" }}
                  ></i>{" "}
                  {item.Email}
                </div>
              </div>
              <div></div>
            </div>
          ))}
      </div>
    );
  };

  var card = {
    border: "0.5px solid rgba(128, 128, 128, 0.31)",
    borderRadius: "10px",
    // boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
  };

  const FilterSuggestion = () => {
    return (
      <>
        {showFilter && (
          <div className=" mb-2 mt-1 px-4 bg-white rounded w-100 d-flex justify-content-between align-items-center">
            <div className="d-flex">
              {Formdata.location && (
                <div
                  className="card d-flex justify-content-between mx-2 my-2 px-3"
                  style={{
                    width: "fit-content",
                    color: "#fff",
                    border: "none",
                    background: "#89C541",
                    flexDirection: "row",
                    columnGap: 10,
                    borderRadius: 20,
                  }}
                >
                  <div>{Formdata.location}</div>
                  <div
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setLocation();
                    }}
                  >
                    &times;
                  </div>
                </div>
              )}
              {Formdata.user_type != -1 && (
                <div
                  className="card d-flex justify-content-between mx-2 my-2 px-3"
                  style={{
                    width: "fit-content",
                    color: "#fff",
                    border: "none",
                    background: "#89C541",
                    flexDirection: "row",
                    columnGap: 10,
                    borderRadius: 20,
                  }}
                >
                  <div>
                    {Formdata.user_type == 0
                      ? "Buyer"
                      : Formdata.user_type == 1
                      ? "Business Parner"
                      : Formdata.user_type == 2
                      ? "Seller"
                      : null}
                  </div>
                  <div
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setUserType();
                    }}
                  >
                    &times;
                  </div>
                </div>
              )}
              {selectedItems.map((item) => (
                <div
                  className="card d-flex justify-content-between mx-2 my-2 px-3"
                  style={{
                    width: "fit-content",
                    color: "#fff",
                    border: "none",
                    background: "#89C541",
                    flexDirection: "row",
                    columnGap: 10,
                    borderRadius: 20,
                  }}
                >
                  <div>{item}</div>
                  <div
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      handleCheckboxChange(item);
                    }}
                  >
                    &times;
                  </div>
                </div>
              ))}
            </div>
            <div
              className="font-weight-bold text-danger"
              onClick={() => handleClose()}
            >
              <i className="fa fa-times" aria-hidden="true"></i>
            </div>
          </div>
        )}
      </>
    );
  };

  const NewFilterSuggestion = () => {
    return (
      <>
        {showFilter && (
          <div className=" mb-2 mt-1 px-4 bg-white rounded w-100 d-flex justify-content-between align-items-center">
            <div className="d-flex">
              {Formdata.user_type != -1 && (
                <div
                  className="card d-flex justify-content-between mx-2 my-2 px-3"
                  style={{
                    width: "fit-content",
                    color: "#fff",
                    border: "none",
                    background: "#89C541",
                    flexDirection: "row",
                    columnGap: 10,
                    borderRadius: 20,
                  }}
                >
                  <div>
                    {Formdata.user_type == 0 ? "Buyer": Formdata.user_type == 1? "Business Parner": Formdata.user_type == 2? "Seller": null}
                  </div>
                  <div style={{ cursor: "pointer" }} onClick={() => {setUserType()}}>&times;</div>
                </div>
              )}

              <div onClick={()=>{handletype(0)}}
               className="card hoverer d-flex justify-content-between mx-2 my-2 px-3">
                <div>People</div>
              </div>
              <div onClick={()=>{handletype(1)}}
               className="card hoverer d-flex justify-content-between mx-2 my-2 px-3">
                <div>Business</div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  };

  const PaginationIndex = () => {
    return (
      <div className="mx-auto my-4">
        <nav aria-label="Page navigation example">
          <ul className="pagination" style={{ marginLeft: "10px" }}>
            <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
              <button className="page-link" onClick={PreviousPage}>
                Previous
              </button>
            </li>
            {paginationNumbers().map((pageNumber) => (
              <li
                key={pageNumber}
                className={`page-item ${page === pageNumber ? "active" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={() => setPage(pageNumber)}
                >
                  {pageNumber}
                </button>
              </li>
            ))}
            <li
              className={`page-item ${
                page === paginationInfo?.totalPages ? "disabled" : ""
              }`}
            >
              <button className="page-link" onClick={NextPage}>
                Next
              </button>
            </li>
          </ul>
        </nav>
        <div className="pagination my-2" style={{ marginLeft: "17px" }}>
          <p>Total Records: {paginationInfo?.totalItems}</p>
          <br />
          <p style={{ paddingLeft: "10px" }}>
            Total Pages: {paginationInfo?.totalPages}
          </p>
        </div>
      </div>
    );
  };

  const UserList = () => {
    return (
      <div
        className="mx-auto scroll px-0"
        style={{
          overflowY: "scroll",
          maxHeight: "100vh",
          scrollbarWidth: "none",
          background: "#fff",
          borderRadius: "2%",
        }}
      >
        {userList &&
          userList.map((item) => {
            if (UserExist.includes(item._id)) {
              return null; // Skip this item if it exists in UserExist
            }
            return (
              <div
                key={item._id}
                className="d-flex bg-white justify-content-between my-1 px-4 py-2"
                style={card}
              >
                <div className="px-3 w-50 d-flex">
                  <div className="align-items-center d-flex">
                    <img
                      src={`http://connect-client.qcodesinfotech.com/images/profile/img0${item.randomprofile}.png`}
                      style={{ width: 45, height: 45, borderRadius: "50%" }}
                      alt="Profile"
                    />
                  </div>
                  <div className="mx-2">
                    <div className="small font-weight-bold">
                      {item.first_name + " " + item.last_name}
                    </div>
                    <p className="text-secondary m-0" style={{ fontSize: 12 }}>
                      {item.user_type === "1"
                        ? "Business Partner"
                        : item.user_type === "0"
                        ? "Buyer"
                        : "Seller"}{" "}
                      <br />
                      {item?.country && item?.city
                        ? item.country + " " + item.city
                        : "India"}
                    </p>
                  </div>
                </div>
                <div className="d-flex flex-column justify-content-center mx-auto text-center">
                  <span className="d-flex ml-4 my-2 name2">
                    {Array(5)
                      .fill()
                      .map((_, index) => (
                        <i
                          key={index}
                          className="fas fa-star"
                          aria-hidden="true"
                          style={{ color: "yellow" }}
                        />
                      ))}
                  </span>
                  <div
                    className="mx-1 rewards text-secondary"
                    style={{ fontSize: 12 }}
                  >
                    <img
                      src="http://connect-client.qcodesinfotech.com/images/icons/medal.png"
                      className="mr-2"
                      style={{ width: 20, height: 20 }}
                      alt="Medal"
                    />
                    15 Coins
                  </div>
                </div>
                <div></div>
                <div className="align-items-center d-flex">
                  <button
                    className="btn btn-primary small"
                    onClick={() => HandleUpdate(item._id)}
                    style={{
                      fontSize: "12px",
                      backgroundColor: "#8AC53F",
                      color: "white",
                    }}
                  >
                    Lets Connect
                  </button>
                </div>
              </div>
            );
          })}
      </div>
    );
  };

  var FilterData = {
    setFormData,
    Formdata,
    FetchApiData,
    options,
    filterText,
    handleFilterChange,
    skill,
    selectedItems,
    handleCheckboxChange,
    HandleSubmit,
  };

  return (
    <div className="body-wrapper">
      <div className="container-fluid">
       
        <div style={{marginTop:'-2%',marginBottom:'2%'}}>
       { !state && ( <ul class="nav">
  <li class="nav-item">
    <a class="nav-link active"  href="#" style={{color:csv?"green":"",borderBottom:csv?"2px solid green":''}}  onClick={()=>{setCsv(true)
    setmyvalut(false)}} >Csv</a>
 </li>
  <li class="nav-item">
    <a class="nav-link" href="#"  style={{color:myvalut?"green":"",borderBottom:myvalut?"2px solid green":''}}  onClick={()=>{setCsv(false)
    setmyvalut(true)}}>My vault </a>
  </li>
</ul>)}
</div>
        <div className={`card p-2 ${myvalut ? "d-none":""}  `}>
          <div className='col-5'>
            <p className='h5'>
              Please select your Project
            </p>
            <select className='form-control'
              onChange={(e) =>setProjectId(e.target.value)}
            >
              <option value="" key="">
                Select Project
              </option>
              {listNatification.map((item) => (
                <option value={item.project._id} key="">
                  {" ("}
                  {item.project.title}
                  {") "}
                  {item.project.project_id}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      {/* <FilterSuggestion /> */}
      <NewFilterSuggestion />
      <div className="row my-2 mx-2">
        <div className="col-9">
          {Formdata.filter_by == "1" ? <BusinessList /> : <UserList />}
          {/* {state && myvalut && (
            <div className='container bg-white mt-3' style={{height:"auto"}}>
              <div className='d-flex justify-content-around'>
                <div className='d-flex flex-column row-gap-2'>
                <span className='font-weight-bold'>Project Name : {state?.project?.title}</span>
              <span className='font-weight-bold'>Project ID : {state?.project?.project_id}</span>
              <span className='font-weight-bold d-flex'>Status : {state?.project?.status ==1?<div><span style={{color:'#8AC53F'}}>Active</span><span><img src='/images/icons/tick.png' width={20} /> </span></div> : <span style={{color:'#FF4C4C'}}>inactive</span>}
</span>
                </div>
                <div>
                <Button variant="primary"  onClick={()=>changeview()} >
                                    <i className="ti ti-user nav-small-cap-icon fs-4 pr-sm"/>Add
                                    </Button>
                </div>

              </div>
              <div className='container d-flex justify-content-center mt-3'>
                <div className='w-85'>
                  <h4>Connected Users</h4>
                  <div className='container text-center'>
                  <table className="table border  table-bordered display text-nowrap dataTable">
                    <thead>
                        <tr>
                            <th scope="col" style={{ background: "aliceblue", fontSize: "14px", borderRadius: "0px 0px 0px 0px", width: "10%" }}>S.No</th>
                            <th scope="col" style={{ background: "aliceblue", fontSize: "14px" }}>Name</th>
                            <th scope="col" style={{ background: "aliceblue", fontSize: "14px" }}>Gmail</th>
                        </tr>
                    </thead>
                    <tbody>
                    {UserDataExist && UserDataExist.map((item,index) => (
                      <tr key={index}>
                         <th scope="row">{index + 1}</th>
                        <td>{item?.userdata?.first_name}&nbsp;{item?.userdata?.last_name}</td>
                        <td>{item?.userdata?.gmail}</td>
                      </tr>
                    )
                    )}
                    </tbody>
                    </table>
                    </div>
                </div>
              </div>
              </div>
          )} */}
        </div>
        <div class="col-3 px-1 pr-1">
          <FilterColumn FilterData={FilterData} />
        </div>
        {loading == true ? <LoaderSpin /> : null}
        <PaginationIndex />
      </div>
    </div>
  );
};

export default Index;
