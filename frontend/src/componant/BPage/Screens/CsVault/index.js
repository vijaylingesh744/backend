import React, { useState, useEffect } from "react";
import FetchData from "../../../fetch-api/Apifetch";
import FilterColumn from "./Component/FilterColumn";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import './style/csvalut.css';
import Swal from "sweetalert2";
// import { LoaderSpin } from "../../utils/Function";
import { useLocation } from "react-router-dom";
import { Button } from "react-bootstrap";
import { handleImageError, Imagesource } from "../../../utils/Function";
import LeftSide from "../../../screens/FeedPage/PostData/LeftSide"

const Index = () => {
  const Location = useLocation();
  const { state } = Location;
  const [userList, setUserList] = useState([]);
  const [UserData, setUserData] = useState(
    JSON.parse(localStorage.getItem("LOGINDATA"))
  );
  const [page, setPage] = useState(1);
  const [Paging, setPaging] = useState(false);
  const [paginationInfo, setPaginationInfo] = useState(null);
  const [loading, setLoading] = useState(false);
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
  const [show, setShow] = useState(false);
  const [viewtab, setviewtab] = useState(0);
  const [filterText, setFilterText] = useState("");
  const [showFilter, setFilter] = useState(false);
  const [listNatification, setListNotification] = useState([]);
  const [requested, setRequested] = useState([]);
  const [ChatUser, setChatUser] = useState([]);
  const [allreceivedconnections, setallreceivedconnections] = useState([]);


  useEffect(() => {
    if (state) {
      console.log(state);
      setProjectId(state?.project_id);
      listProjects(state?.project_id);
    }
    dataList();
    HandleSubmit()
    onReqConnection()
  }, []);

  useEffect(() => {
    listProjects(projectId);
  }, [projectId]);

  useEffect(() => {
    fetchNotifyList();
  }, []);

  const handleClosePop = () => {
    setShow(false);
  };
  const listProjects = async (id = projectId) => {
    try {
      const res = await FetchData(`list/project/${id}`, "GET", null, true, false);
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
      const res = await FetchData(`notify_list/${UserData?.user?._id}`, "GET", null, true, false);
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
        bp_id: UserData?.user?._id,
        project_id: projectId,
        status: 1,
        user_type: "1",
      };
      const res = await FetchData(`add/connection`, "POST", JSON.stringify(ItemData), true, false);
      if (res.status) {
        listProjects();
      }
      Swal.fire({
        title: "Success!",
        text: "Notification Sent To Customer.",
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

  const dataList = async () => {
    const res = await FetchData("industry", "GET", null, false, false);
    setOptions(res.data.data);
  };
  const FetchApiData = async (id) => {
    const res = await FetchData("skill/" + id, "GET", null, false, false);
    Setskills(res.data.data);
  };

  const NextPage = () => {
    setPage(page + 1);
  };

  const PreviousPage = () => {
    setPage(page - 1);
  };

  const HandleSubmit = async () => {
    if (Formdata.filter_by == "1") {
      fetchUserList();
      return;
    }
    setFilter(true);
    setLoading(true)
    var Objectdata = { ...Formdata, ["skills"]: selectedItems };
    const res = await FetchData("filter_user?user_id=" + UserData?.user?._id, "Post", JSON.stringify(Objectdata), false, false);
    if (res.data) {
      setLoading(false)
      setPaging(true)
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
      const res = await FetchData(url, "GET", null, true, false);
      if (res.success) {
        setUserList(res.data.users);
        setPaginationInfo(res.data.pagination || null);
      } else {
        console.error("Error fetching user list:", res.message);
      }
    } catch (error) {
      console.error("Error fetching user list:", error.message);
    }
  };

  const PaginationIndex = () => {
    return (
      <div className="d-flex justify-content-end mb-3">
        <div className="pagination align-items-center">
          <p className="mb-0">Total Records: {paginationInfo?.totalItems}</p>
          <br />
          <p style={{ paddingLeft: "10px" }} className="mb-0">
            Total Pages: {paginationInfo?.totalPages}
          </p>
        </div>
        <nav aria-label="Page navigation example">
          <ul className="pagination column-gap-1" style={{ marginLeft: "10px" }}>
            <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
              <a className="px-3 py-2 rounded-left" style={{ border: '1px solid grey' }} onClick={PreviousPage}>
                <i class="fa fa-chevron-left text-dark1" aria-hidden="true"></i>
              </a>
            </li>
            {paginationNumbers().map((pageNumber) => (
              <li
                key={pageNumber}
                className={`page-item`}
              >
                <span
                  className={`text-dark1 py-2 px-3 ${page === pageNumber ? "bg-light shadow-sm" : ""}`} style={{ border: '1px solid grey' }}
                  onClick={() => setPage(pageNumber)}
                >
                  {pageNumber}
                </span>
              </li>
            ))}
            <li
              className={`page-item ${page === paginationInfo?.totalPages ? "disabled" : ""
                }`}
            >
              <a className="px-3 py-2 rounded-right" style={{ border: '1px solid grey' }} onClick={NextPage}>
                <i class="fa fa-chevron-right text-dark1" aria-hidden="true"></i>

              </a>
            </li>
          </ul>
        </nav>

      </div>
    );
  };

  const EmptyCard = () => {
    return (
      <div
        className="container-fluid w-100 d-flex justify-content-center align-items-center"
        style={{ height: "200px" }}
      >
        <div className="w-100 d-flex align-items-center row-gap-1 flex-column justify-content-center">
          <span className="fontsubtitle font-weight-bold text-dark1">
            No connection yet?
          </span>
          <a
            onClick={() => setviewtab(0)}
          >
            <span
              className="fontsubtitle font-weight-bold text-connect"
              role="button"
            >
              Let's Start connecting
            </span>
          </a>
          <span className="fontcontent2 font-weight-light text-secondary1">
            Find more people
          </span>
        </div>
      </div>
    )
  }

  const handleConnectUser = async (id) => {

    const UserConnect = {
      sender: UserData?.user?._id,
      receive: id
    }
    console.log(UserConnect);
    // return;
    try {
      const res = await FetchData('userconnect/add', "POST", JSON.stringify(UserConnect), false, false)
      HandleSubmit()
    } catch (err) {
      console.log(err);
    }
  }
  var FilterData = {
    setFormData,
    Formdata,
    FetchApiData,
    options,
    HandleSubmit,
  };

  const onReqConnection = async () => {
    const res = await FetchData(`userConnectlist/${UserData?.user?._id}`, "GET", null, true, false);
    if (res.data) {
      const filteredConnectionList = res.data
        .filter((item) => item.status == 1)
        .map((item) => {
          if (item.matchedField === "senderData") {
            item.receiveDetails.nodeId = item.nodeId
            item.receiveDetails.userRemoveId = item._id;
            return item.receiveDetails; // Extract receiveDetails if matchedField is senderData
          } else if (item.matchedField === "receiverData") {
            item.senderDetails.nodeId = item.nodeId
            item.senderDetails.userRemoveId = item._id;
            return item.senderDetails; // Extract senderDetails if matchedField is receiverData
          }
          return null; // Handle any other cases (optional)
        })
        .filter((item) => item !== null); // Filter out any null values
      setChatUser(filteredConnectionList);
      setallreceivedconnections(res.data);
      const filteredConnectionList2 = res.data
        .filter((item) => item.status == 0)
        .map((item) => {
          if (item.matchedField === "senderData") {
            item.receiveDetails.userRemoveId = item._id;
            return item.receiveDetails; // Extract receiveDetails if matchedField is senderData
          } else if (item.matchedField === "receiverData") {
            item.senderDetails.userRemoveId = item._id;
            return item.senderDetails; // Extract senderDetails if matchedField is receiverData
          }
          return null; // Handle any other cases (optional)
        })
        .filter((item) => item !== null); // Filter out any null values

      setRequested(filteredConnectionList2);
      console.log(allreceivedconnections);
    }
  };

  const UserList = () => {
    return (
      <>
        {userList && userList.map((item) => {
          return (
            <>
              <div className="card p-3 mx-2 my-1 border">
                <div className="card-content1">
                  <img
                    src={Imagesource(item?.profile)}
                    onError={handleImageError}
                    width={45}
                    height={45}
                    className="rounded-circle"
                  />
                  <div>
                    <div className='mb-1 d-flex justify-content-start align-items-center column-gap-2'>
                      <span className="text-dark1 fontsubtitle font-weight-bold " style={{ whiteSpace: 'nowrap', overflowX: 'hidden', textOverflow: 'ellipsis', minWidth: '30%', maxWidth: '40%' }}>
                        {item?.first_name ? item?.first_name : null}&nbsp;{item?.last_name ? item?.last_name : null}
                      </span>
                    </div>
                    <div><span className="text-dark1 fontcontent2 font-weight-light">ConnectSouq&nbsp;{item?.user_type == 0 ? 'Buyer' : item?.user_type == 1 ? 'Business Partner' : 'Seller'}</span></div>
                  </div>
                  <button className="btn btn-connect " onClick={() => handleConnectUser(item._id)}>Lets' Connect</button>
                </div>
              </div>
            </>
          );
        })}
      </>
    );
  };

  const RemoveUser = async (id) => {
    try {
      const res = await FetchData(`cloneupdateconnect/${id}/2`, "GET", null, false, false)
      onReqConnection()
    } catch (err) {
      console.log(err);
    }
  }

  const ConnectionList = () => {
    return (
      <>
        {ChatUser &&
          ChatUser.map((item) => {
            return (
              <>
                <div className="card p-3 mx-2 my-1 border">
                  <div className="card-content1">
                    <img
                      src={Imagesource(item?.profile)}
                      onError={handleImageError}
                      width={45}
                      height={45}
                      className="rounded-circle"
                    />
                    <div>
                      <div className='mb-1 d-flex justify-content-start align-items-center column-gap-2'>
                        <span className="text-dark1 fontsubtitle font-weight-bold" 
                        style={{ whiteSpace: 'nowrap', overflowX: 'hidden', textOverflow: 'ellipsis', minWidth: '30%', maxWidth: '40%' }}>{item?.first_name ? item?.first_name : "Name"}&nbsp;{item?.last_name ? item?.last_name : 'unknown'}</span><small className="fonthint w-40" style={{ whiteSpace: 'nowrap', overflowX: 'hidden', textOverflow: 'ellipsis', minWidth: '30%', maxWidth: '40%' }}>from {item?.city},&nbsp;{item?.country}</small></div>
                      <div><span className="text-dark1 fontcontent2 font-weight-light">ConnectSouq&nbsp;{item?.user_type == 0 ? 'Buyer' : item?.user_type == 1 ? 'Business Partner' : 'Seller'}</span></div>
                    </div>
                    <button className="btn btn-connect " onClick={() => RemoveUser(item.nodeId)}>UnFollow</button>
                  </div>
                </div>
              </>
            );
          })}
      </>
    )
  }

const ReceiveUser = () => {
   return(
    allreceivedconnections &&
      allreceivedconnections.length > 0 ? (
      allreceivedconnections
        .filter((item) => item.matchedField === "receiverData" && item.status != 1).length > 0 ? (
        <>
          {allreceivedconnections
            .filter((item) => item.matchedField === "receiverData" && item.status != 1)
            .map((item) => (
              <div className="d-flex align-items-center justify-content-between px-3 py-2">
                <div className="d-flex column-gap-3">
                  <img
                    className="rounded-circle"
                    src={`${item?.senderDetails?.profile
                      ? `${Imagesource(
                        item?.senderDetails?.profile
                      )}`
                      : `/images/profile/img0${item?.senderDetails?.randomprofile}.png`
                      }`}
                    onError={handleImageError}
                    width={50}
                    height={50}
                  />
                  <div className="d-flex flex-column">
                    <span className="fontcontent1 text-dark1">
                      {item?.senderDetails?.first_name}{" "}
                      {item?.senderDetails?.last_name}
                    </span>
                    <span className="font-weight-light font-weight-normal fontcontent2 mt-2">
                      {item?.senderDetails?.designation}
                    </span>
                  </div>
                </div>
                {item.status == 0 ? (
                  <div className="d-flex">
                    <button className='btn btn-connect fonthint mr-1'
                      onClick={() => HandleUpdate("1", item.nodeId)}
                      style={{ fontWeight: '600', minWidth: '65px' }} >
                      Accept
                    </button>
                    <button className='btn btn-dark fonthint '
                      onClick={() => RemoveUser(item.nodeId)}
                      style={{ fontWeight: '600', minWidth: '65px' }} >
                      Reject
                    </button>
                  </div>
                ) : (
                  <button className='btn btn-outline-connect fonthint '
                    onClick={() => window.location.href = "/chats"}
                    style={{ fontWeight: '600', minWidth: '65px' }} >
                    Chat
                  </button>
                )}
              </div>
            ))}
        </>
      ) : (
        <EmptyCard />
      )
    ) : (
      <EmptyCard />
    ))
}
const SendUser = () => {
   return(
    allreceivedconnections &&
    allreceivedconnections.length > 0 ? (
    allreceivedconnections
      .filter((item) => item.matchedField === "senderData" && item.status != 1).length > 0 ? (
      <>
        {allreceivedconnections
          .filter((item) => item.matchedField === "senderData" && item.status != 1)
          .map((item) => (
            <div className="d-flex align-items-center justify-content-between px-3 py-2">
              <div className="d-flex column-gap-3">
                <img
                  className="rounded-circle"
                  src={`${item?.receiveDetails?.profile
                    ? `${Imagesource(
                      item?.receiveDetails?.profile
                    )}`
                    : `/images/profile/img0${item?.receiveDetails?.randomprofile}.png`
                    }`}
                  onError={handleImageError}
                  width={50}
                  height={50}
                />
                <div className="d-flex flex-column">
                  <span className="fontcontent1 text-dark1">
                    {item?.receiveDetails?.first_name}{" "}
                    {item?.receiveDetails?.last_name}
                  </span>
                  <span className="font-weight-light font-weight-normal fontcontent2 mt-2">
                    {item?.receiveDetails?.designation}
                  </span>
                </div>
              </div>
                <button
                  className="btn btn-connect fonthint"
                  onClick={() =>
                    RemoveUser(item.nodeId)
                  }
                  style={{ fontWeight: "600", minWidth: "65px" }}
                >
                  Remove Request
                </button>
            
            </div>
          ))}
      </>
    ) : (
      <EmptyCard />
    )
  ) : (
    <EmptyCard />
  ))
}


  return (
    <>
      <div className="container body-wrapper w-75 d-flex" style={{ display: "grid" }}>

        <div id="main-wrapper" >
          <main id="main-section" >
            <div className="container-fluid w-100">
              <div className="card px-3 pt-3">
                <div className="d-flex justify-content-between">
                  <span className="fontsubtitle font-weight-bold text-connect">Connections List</span>
                  <div className="ml-4 align-items-center justify-content-end column-gap-1 mr-5">
                    <input placeholder={"Search Here"} className="border-0 rounded-pill bg-light fontcontent2 px-2 py-1" />
                  </div>
                </div>
                <div>

                </div>
                <div>
                  <FilterColumn FilterData={FilterData} />
                </div>

                {Paging && <PaginationIndex />}

                <div className="container-fluid d-flex justify-content-around pt-2 column-gap-3 mt-2">
                  <div className={`${viewtab == 0 ? 'activestop' : ''}`} onClick={() => setviewtab(0)}><span className="fontsubtitle p-2" role="button">CS vault</span></div>
                  <div className={`${viewtab == 1 ? 'activestop' : ''}`} onClick={() => setviewtab(1)}><span className="fontsubtitle p-2" role="button">My vault</span></div>
                  <div className={`${viewtab == 2 ? 'activestop' : ''}`} onClick={() => setviewtab(2)}><span className="fontsubtitle p-2" role="button">Received</span></div>
                  <div className={`${viewtab == 3 ? 'activestop' : ''}`} onClick={() => setviewtab(3)}><span className="fontsubtitle p-2" role="button">Sent</span></div>
                </div>
              </div>
              {viewtab == 0 &&
                <div className="card rounded shadow-sm p-2">
                  <UserList />
                </div>
              }
              {viewtab == 1 &&
                <div className="card rounded shadow-sm p-2">
                  <ConnectionList />
                </div>
              }
              {viewtab == 2 &&
                <div className="card rounded shadow-sm p-2">
                  <ReceiveUser />
                </div>
              }
              {viewtab == 3 &&
                <div className="card rounded shadow-sm p-2">
                  <SendUser />
                </div>
              }
            </div>
          </main>
        </div>
        <LeftSide />
      </div>
    </>
  );
};

export default Index;
