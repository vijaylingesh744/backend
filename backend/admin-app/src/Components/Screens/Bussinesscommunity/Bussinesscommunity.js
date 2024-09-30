import React, { useState, useEffect } from 'react'
import FetchData from '../../fetch-api/Apifetch';
import FilterColumn from './Component/Filtercolumn';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Swal from 'sweetalert2';
import { LoaderSpin } from '../../utils/Function';
import { useLocation } from 'react-router-dom';


const Bussinesscommunity = () => {
      const [userList, setUserList] = useState([]);
      const [UserData, setUserData] = useState(JSON.parse(localStorage.getItem("User")));
      const [page, setPage] = useState(1);
      const location = useLocation();
      const {state} = location;
      const [paginationInfo, setPaginationInfo] = useState(null);
      const [loading, setLoading] = useState(false);
      const [businessList, setBusinessList] = useState([]);
      const [searchQuery, setSearchQuery] = useState('');
      const [projectId, setProjectId] = useState('');
      const [Userproject, setUserproject] = useState({});
      const [selectedItems, setSelectedItems] = useState([]);
      const [skill, Setskills] = useState([])
      const [options, setOptions] = useState([]);
      const [Data, setData] = useState([]);
      const handleCheckboxChange = (title) => {
        if (selectedItems.includes(title)) {
          setSelectedItems(selectedItems.filter(item => item !== title));
        } else {
          setSelectedItems([...selectedItems, title]);
        }
      }
      useEffect(() => {
        console.log(state);
        dataList()
      }, [])
    
      const [listNatification, setListNotification] = useState([])
      const [selectedItem, setSelectedItem] = useState(false)
      useEffect(() => {
        fetchNotifyList()
        ListConnectedBusiness()
      }, [])
      
    
    
      const [show, setShow] = useState(false);
      const handleShow = (item) => {
        setUserproject(item)
        setShow(true);
      };
    
      const handleClosePop = () => {
        setShow(false);
      };
    
      const fetchNotifyList = async () => {
        setLoading(true)
        try {
          const res = await FetchData(`notify_list/${UserData._id}`, 'GET', null, true, false);
          if (res.success) {
            const Listvalue = res.data
            setListNotification(Listvalue.filter(item =>item.status == 1));
            setLoading(false)
          }
        } catch (error) {
          console.error("Error fetching user list:", error.message);
        }
      };
    
      const HandleUpdate = async (id) => {
        try {
    
          if (!projectId) {
            Swal.fire({
              title: 'Validate Error!',
              text: 'Select Project Id',
              icon: 'error'
            });
            return
          }
          const ItemData = {
            user_id: id,
            bp_id: UserData._id,
            project_id: projectId,
            status: 1,
            user_type: "1"
          }
          const res = await FetchData(`add/connection`, 'POST', JSON.stringify(ItemData), true, false);
          if (res.success) {
            fetchNotifyList()
          }
          Swal.fire({
            title: 'Success!',
            text: 'Notification Sended To Customer.',
            icon: 'success'
          });
          handleClosePop()
        } catch (error) {
          handleClosePop()
          console.error("Error fetching user list:", error.message);
        }
      }
      const [Formdata, setFormData] = useState({
        location: "",
        user_type: "1",
        country: "",
        city: "",
      })
      const setUserType = () => {
        setFormData(prevFormData => ({
          ...prevFormData,
          user_type: "-1"
        }));
      };
      const setLocation = () => {
        setFormData(prevFormData => ({
          ...prevFormData,
          location: ""
        }));
      }

      const dataList = async () => {
        const res = await FetchData("industry", 'GET', null, false, false);
        setOptions(res.data.data);
      }
      const FetchApiData = async (id) => {
        const res = await FetchData("skill/" + id, 'GET', null, false, false);
        Setskills(res.data.data)
      }
    
      useEffect(() => {
        HandleSubmit();
      }, [page]);
      const NextPage = () => {
        setPage(page + 1);
      };
    
      const PreviousPage = () => {
        setPage(page - 1);
      };
    
      const [filterText, setFilterText] = useState('');
      const handleFilterChange = (event) => {
        setFilterText(event.target.value);
      };
      const [showFilter, setFilter] = useState(false);

      const HandleSubmit = async () => {
        if(Formdata.filter_by == "1"){
          fetchUserList()
          return
        }
        setFilter(true)
        var Objectdata = { ...Formdata, ["skills"]: selectedItems }
        const res = await FetchData("filter_user/connection", 'Post', JSON.stringify(Objectdata), false, false);
        setUserList(res.data.users);
        setPaginationInfo(res.data.pagination || null);
      }

      const Handleaddbusinesscommunity = async (item) => {

        const data =[
        {
          id:item._id,
          first_name:item.first_name,
          last_name:item.last_name,
          status:item.status 

        }
      ];

        const apiData = {
          bussiness_id:UserData._id,
          connecting_list:data
        }
        console.log(apiData);

        try {
          const res = await FetchData(`businesscommunity/add`, 'POST', JSON.stringify(apiData), true, false);
          console.log(res);
        } catch (error) {
          console.error("Error fetching user list:", error.message);
        }
      }
      
    
      const paginationNumbers = () => {
        const totalPages = paginationInfo?.totalPages || 0;
        const currentPage = page;
        const paginationRange = 10;
        const paginationStart = Math.max(1, currentPage - Math.floor(paginationRange / 2));
        const paginationEnd = Math.min(totalPages, paginationStart + paginationRange - 1);
        const numbersToShow = [];
        for (let i = paginationStart; i <= paginationEnd; i++) {
          numbersToShow.push(i);
        }
        return numbersToShow;
      };
    
      const handleClose = () => {
        setFormData({ ...Formdata, ["location"]: "" })
        setFilter(false)
        setSelectedItems([])
        fetchUserList()
      }
    
      const fetchUserList = async () => {
        try {
          var query = `page=${page}&limit=10`
          if (page > 1) {
            Swal.fire({
              title: 'info!',
              text: 'You will Need Refer Minimum 5 Users',
              icon: 'info'
            });
            return
          }
          if (searchQuery) {
            query = `page=${page}&limit=15&search=${searchQuery}`
          }
    
          var url = `list/user?${query}`
          if (Formdata.filter_by == "1") {
            url = `list/business?${query}&location=${Formdata.location}`
          }
          const res = await FetchData(url, 'GET', null, true, false);
          if (res.success) {
            if (Formdata.filter_by == "1") {
              setBusinessList(res.data.data)
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
    
      const ListConnectedBusiness = async () => {
        try{
          const res = await FetchData(`businesscommunity/list/${UserData?._id}`,'GET', null, false, false);

          console.log(res);
        }
        catch(err){
          console.error("Error fetching connected business list:", err.message);
        }
      }

      const BusinessList = () => {
        return (
          <div className='mx-auto scroll px-0'
            style={{ overflowY: "scroll", maxHeight: "100vh", scrollbarWidth: "none", background: '#fff', borderRadius: '2%' }}>
            {businessList && businessList.map(item => (
              <div className="d-flex bg-white  justify-content-between my-1 px-4 py-2" style={card}>
                <div className="px-3 w-50 d-flex">
                  <div className="align-items-center d-flex w-25">
                    <img src="http://connect-client.qcodesinfotech.com/images/icons/corprate.png" alt="company image" style={{ width: "100px" }} />
                  </div>
                  <div className='mx-2'>
                    <div className="small font-weight-bold">{item.Company} -{item.Name}</div>
                    <p className="text-secondary m-0" style={{ fontSize: 12 }}>
                      {item.Address}
                      {" "}
                      <br />
                      {item?.Company_Category_Subcategory}
                    </p>
                  </div>
                </div>
                <div className="d-flex flex-column justify-content-center mx-auto text-center">
                  <span className="d-flex ml-4 my-2 name2" style={{ alignItems: "center", fontSize: 12 }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-geo-alt-fill" viewBox="0 0 16 16">
                      <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6" />
                    </svg>
                    {item.City}
                  </span>
                  <div className="text-start ml-4 rewards text-secondary" style={{ fontSize: 12 }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-telephone-fill" viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z" />
                    </svg>  {item.Mobile}
                  </div>
                  <div className="ml-4 rewards text-secondary" style={{ fontSize: 13, display: "inline-flex", alignItems: "center" }}>
    
                    <i className="fa fa-envelope mr-1" aria-hidden="true" style={{ cursor: "pointer" }}></i>
                    {" "}
                    {item.Email}
                  </div>
                </div>
                <div>
                </div>
              </div>
            ))}
          </div>
        )
      }
    
      var card = {
        border: "0.5px solid rgba(128, 128, 128, 0.31)",
        borderRadius: "10px",
        // boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
      }
    
      const FilterSuggestion = () => {
        return (
          <>
            {showFilter &&
              <div className=" mb-2 mt-1 px-4 bg-white rounded w-100 d-flex justify-content-between align-items-center">
                <div className='d-flex'>
                  {Formdata.location &&
                    <div className='card d-flex justify-content-between mx-2 my-2 px-3' style={{ width: "fit-content", color: '#fff', border: 'none', background: '#89C541', flexDirection: 'row', columnGap: 10, borderRadius: 20 }} >
                      <div>{Formdata.location}</div>
                      <div style={{ cursor: 'pointer' }} onClick={() => { setLocation() }}>&times;</div>
                    </div>
                  }
                  {Formdata.user_type != -1 &&
                    <div className='card d-flex justify-content-between mx-2 my-2 px-3' style={{ width: "fit-content", color: '#fff', border: 'none', background: '#89C541', flexDirection: 'row', columnGap: 10, borderRadius: 20 }} >
                      <div>{Formdata.user_type == 0 ? "Buyer" : Formdata.user_type == 1 ? "Business Parner" : Formdata.user_type == 2 ? "Seller" : null}</div>
                      <div style={{ cursor: 'pointer' }} onClick={() => { setUserType() }}>&times;</div>
                    </div>}
                  {selectedItems.map(item => (
                    <div className='card d-flex justify-content-between mx-2 my-2 px-3' style={{ width: "fit-content", color: '#fff', border: 'none', background: '#89C541', flexDirection: 'row', columnGap: 10, borderRadius: 20 }} >
                      <div>{item}</div>
                      <div style={{ cursor: 'pointer' }} onClick={() => { handleCheckboxChange(item) }}>&times;</div>
                    </div>))}
                </div>
                <div className="font-weight-bold text-danger"
                  onClick={() => handleClose()}
                ><i className="fa fa-times" aria-hidden="true"></i>
                </div>
              </div>
            }
          </>
        )
      }
    
      const PaginationIndex = () => {
        return (
          <div className="mx-auto my-4">
            <nav aria-label="Page navigation example">
              <ul className="pagination" style={{ marginLeft: "10px" }}>
                <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
                  <button className="page-link" onClick={PreviousPage}>Previous</button>
                </li>
                {paginationNumbers().map((pageNumber) => (
                  <li key={pageNumber}
                    className={`page-item ${page === pageNumber ? 'active' : ''}`}
                  >
                    <button
                      className="page-link"
                      onClick={() => setPage(pageNumber)}
                    >
                      {pageNumber}
                    </button>
                  </li>
                ))}
                <li className={`page-item ${page === paginationInfo?.totalPages ? 'disabled' : ''}`}>
                  <button className="page-link" onClick={NextPage}>Next</button>
                </li>
              </ul>
            </nav>
            <div className='pagination my-2' style={{ marginLeft: "17px" }}>
              <p>Total Records: {paginationInfo?.totalItems}</p><br />
              <p style={{ paddingLeft: '10px' }}>Total Pages: {paginationInfo?.totalPages}</p>
            </div>
          </div>
        )
      }
    
      const UserList = () => {
        return (
          <div className='mx-auto scroll px-0'
            style={{ overflowY: "scroll", maxHeight: "100vh", scrollbarWidth: "none", background: '#fff', borderRadius: '2%' }}>
            {userList && userList.map(item => (
              <div className="d-flex bg-white  justify-content-between my-1 px-4 py-2" style={card}>
                <div className="px-3 w-50 d-flex">
                  <div className="align-items-center d-flex">
                    <img
                      src={`http://connect-client.qcodesinfotech.com/images/profile/img0${item.randomprofile}.png`}
                      style={{ width: 45, height: 45, borderRadius: "50%" }}
                    />
                  </div>
                  <div className='mx-2'>
                    <div className="small font-weight-bold">{item.username}</div>
                    <p className="text-secondary m-0" style={{ fontSize: 12 }}>
                      {item.user_type == "1" ? "Business Partner" : item.user_type == "0" ? "Buyer" : "Seller"}
                      {" "}<br />
                      {item?.country && item?.city ? item.country + " " + item.city : "India"}
                    </p>
                  </div>
                </div>
                <div className="d-flex flex-column justify-content-center mx-auto text-center">
                  <span className="d-flex ml-4 my-2 name2">
                    {Array(5).fill().map(item => (
                      <i className="fas fa-star" aria-hidden="true" style={{ color: "yellow" }} />
                    ))}
                  </span>
                  <div className="mx-1 rewards text-secondary" style={{ fontSize: 12 }}>
                    <img
                      src="http://connect-client.qcodesinfotech.com/images/icons/medal.png"
                      className="mr-2"
                      style={{ width: 20, height: 20 }}
                    />15 Coins</div>
                </div>
                <div>
                </div>
                <div className="align-items-center d-flex">
                  <button className="btn btn-primary small"
                    onClick={() => Handleaddbusinesscommunity(item)}
                    style={{
                      fontSize: "12px", backgroundColor: "#8AC53F",
                      color: "white"
                    }} >
                        Add to Connect
                  </button>
                </div>
              </div>
            ))}
          </div>
        )
      }

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
      }
      return (
        <div className="body-wrapper">
          <div className="container-fluid">
            
            {/* <div className="card p-2">
              <div className='col-5'>
                <p className='h5'>
                  Please select your Project
                </p>
                <select className='form-control'
                  onClick={(e) => setProjectId(e.target.value)}
                >
                  <option value="" key="">Select Project</option>
                  {listNatification.map(item => (
                    <option value={item.project._id} key="">
                      {" ("}{item.project.title}{") "}
                      {item.project.project_id}
                    </option>
                  ))}
                </select>
              </div>
            </div> */}
          </div>
          <div className='container-fluid'>
            <div className="card p-2 w-100">
              <div className='d-flex justify-content-center'>
              <h4>Community group details</h4>
              </div>
              <div className='row mt-3'>
                <div className='col-3 offset-3'>
                  <div><h6><b>Group Name:</b> {state?.title}</h6></div>
                </div>
                <div className='col-3'></div>
              </div>
            </div>
          </div>
          {/* <FilterSuggestion /> */}
          <div className="row my-2 mx-2">
            <div className='col-9'>
               <UserList />
            </div>
   {/* <div className='col-9'>

            </div>  */}

            <div class="col-3 px-1 pr-1" >
              <FilterColumn FilterData={FilterData} />
            </div>
            {loading == true ? (
              <LoaderSpin />
            ) : null}
            <PaginationIndex />
          </div>
        </div>
      )

    

}

export default Bussinesscommunity