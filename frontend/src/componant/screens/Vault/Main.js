import React, { useState, useEffect } from 'react'
import Header from '../layout/SubHeader';
import FetchData from '../../fetch-api/Apifetch';
import './Style/Style.css';
import FilterColumn from './Component/FilterColumn';
import LeftSide from "../FeedPage/PostData/LeftSide";
import { useNavigate, useLocation } from 'react-router-dom';
import { handleImageError, Imagesource, Splittext } from '../../utils/Function';
import { toast } from 'react-toastify';
import { Notifycard, ChatSuggest, Twobyoneshimmer } from '../layout/Shimmer';
import locations from '../../utils/location.json'
import AllSkill from '../../../all_skills';
import BottomNavbar from '../layout/BottomNavbar';
import { Modal } from 'react-bootstrap';

const Vault = () => {
  const [userList, setUserList] = useState([]);
  const [page, setPage] = useState(1);
  const [paginationInfo, setPaginationInfo] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [skill, Setskills] = useState([]);
  const [loader, setLoader] = useState(true);
  const [options, setOptions] = useState([]);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("LOGINDATA"))?.user)
  const [filterText, setFilterText] = useState('');
  const { search } = useLocation()
  const [data, setData] = useState(() => {
    const storedData = localStorage.getItem('LOGINDATA');
    return storedData ? JSON.parse(storedData) : null;
  });
  const urlParams = new URLSearchParams(search);
  const searchParam = urlParams.get('search');

  const handleCheckboxChange = (title) => {
    if (selectedItems.includes(title)) {
      setSelectedItems(selectedItems.filter(item => item !== title));
    } else {
      setSelectedItems([...selectedItems, title]);
    }
  }

  useEffect(() => {
    if (searchParam) {
      HandleSubmit(searchParam)
    } else {
      ClientNotify()
    }
    dataList()
  }, [])

  const [cityList, setCityList] = useState([]);
  const Citylist = (title) => {
    const filteredCities = [];
    var data = locations.find(item => item.name == Formdata.location)
    data.states.forEach(state => {
      state.cities.forEach(city => {
        if (city.name.toLowerCase().startsWith(title.toLowerCase())) {
          filteredCities.push({ name: city.name, state: state.name });
        }
      });
    });
    setCityList(filteredCities)
  }

  const ClientNotify = async () => {
    setLoader(true)
    try {
      const res = await FetchData(
        `client_notify/${user?._id}/3`,
        "GET",
        null,
        true,
        false
      );
      if (res.success) {
        const filterData = res.data.filter(
          (item) => item.user_id !== user?._id
        );
        setUserList(filterData.map(item => item.userdata));
      }
      setLoader(false)
    } catch (error) {
      console.log(error);
      setLoader(false)
    }
  };

  const [Formdata, setFormData] = useState({
    location: "",
    // user_type: "-1",
    city: "",
    industry: "",
    search: "",
    // filter_by: "0",
  })

  const dataList = async () => {
    const res = await FetchData("industry", 'GET', null, false, false);
    setOptions(res.data.data);
  }

  const FetchApiData = async (id) => {
    const res = await FetchData("skill/" + id, 'GET', null, false, false);
    Setskills(res.data.data)
  }

  const NextPage = () => {
    setPage(page + 1);
  };

  const PreviousPage = () => {
    setPage(page - 1);
  };

  const handleFilterChange = (event) => {
    setFilterText(event.target.value);
  };
  const [showFilter, setFilter] = useState(true);

  const HandleSubmit = async (search = Formdata.search) => {
    setLoader(true)
    var Objectdata = { ...Formdata, area_of_interest: selectedItems }
    Objectdata = { ...Objectdata, ["search"]: search }
    const res = await FetchData("filter_user?user_id=" + user._id, 'Post', JSON.stringify(Objectdata), false, false);
    setUserList(res.data.users);
    setPaginationInfo(res.data.pagination || null);
    setLoader(false)
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

  const PaginationIndex = () => {
    return (
      <div >
        <nav aria-label="Page navigation example">
          <ul className="pagination column-gap-1 ml-5" style={{ marginLeft: "10px" }}>
            <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
              <a className="px-3 py-2 rounded-left" style={{ border: '1px solid grey' }} onClick={PreviousPage}><i class="fa fa-chevron-left text-dark1" aria-hidden="true"></i>
              </a>
            </li>
            {paginationNumbers().slice(0, 8).map((pageNumber) => (
              <li key={pageNumber} className={`page-item `} >
                <span className={`text-dark1 py-2 px-3 ${page === pageNumber ? "bg-light shadow-sm" : ""}`} style={{ border: '1px solid grey' }}
                  // {`${page === pageNumber ? 'btn-connect' : 'btn-outline-connect'}  border-pill p-2`}
                  onClick={() => setPage(pageNumber)}>
                  {pageNumber}
                </span>
              </li>
            ))}
            <li className={`page-item ${page === paginationInfo?.totalPages ? 'disabled' : ''}`}>
              <a className="px-3 py-2 rounded-right" style={{ border: '1px solid grey' }} onClick={NextPage}><i class="fa fa-chevron-right text-dark1" aria-hidden="true"></i>
              </a>
            </li>
          </ul>
        </nav>
        <div className='pagination mb-2 mt-3' style={{ marginLeft: "17px" }}>
          <p>Total Records: {paginationInfo?.totalItems}</p><br />
          <p style={{ paddingLeft: '10px' }}>Total Pages: {paginationInfo?.totalPages}</p>
        </div>
      </div>
    )
  }

  const handleConnectUser = async (id) => {
    const connectData = {
      sender: user?._id,
      receive: id
    }
    try {
      const res = await FetchData('userconnect/add', "POST", JSON.stringify(connectData), false, false)
      toast.success('Connection Request sent')
      HandleSubmit()
    } catch (err) {
      console.log(err);
    }
  }

  const UserList = () => {
    return (
      <>
        {userList && userList.length > 0 ? (
          userList
            .filter((data) => data.first_name && data.first_name.trim() !== "")
            .map((item) => {
              if (user._id.includes(item._id)) {
                return null; // Skip this item if it exists in the current user list
              }
              return (
                <div key={item._id} className="card p-3 mx-2 my-1 border">
                  <div className="card-content1 d-flex align-items-center">
                    <img
                      src={Imagesource(item?.profile)}
                      onError={handleImageError}
                      width={45}
                      height={45}
                      className="rounded-circle"
                      alt="User Profile"
                    />
                    <div
                      className="d-flex flex-column ml-3"
                      role="button"
                      onClick={() => (window.location.href = `/user/${item._id}`)}
                    >
                      <span className="fontcontent1 text-dark1">
                        {item?.first_name}&nbsp;{item?.last_name}
                      </span>
                      <span className="font-weight-light text-secondary1 fontcontent2">
                        {item?.designation || "Designation"}
                      </span>
                      <p className="font-weight-light fonthint text-secondary1 w-85">
                        {item?.about
                          ? Splittext(item?.about, 18)
                          : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor."}
                      </p>
                    </div>
                    <button
                      className="btn btn-connect py-1 ml-auto"
                      onClick={() => handleConnectUser(item._id)}
                    >
                      Let's Connect
                    </button>
                  </div>
                </div>
              );
            })
        ) : !loader ? (
          <div
            className="container-fluid w-100 d-flex justify-content-center align-items-center"
            style={{ height: "200px" }}
          >
            <div className="w-100 d-flex align-items-center row-gap-1 flex-column justify-content-center">
              <span className="fontsubtitle font-weight-bold text-dark1">
                No Filtered Data
              </span>
              <span
                className="fontsubtitle font-weight-bold text-connect"
                role="button"
              >
                Let's Start connecting
              </span>
              <span className="fontcontent2 font-weight-light text-secondary1">
                Find more people by filter
              </span>
            </div>
          </div>
        ) : null}

        {userList.length === 0 && loader && (
          <>
            <ChatSuggest />
            <ChatSuggest />
            <ChatSuggest />
          </>
        )}
      </>
      // </div>
    )
  }

  const [showModal, setShowModal] = useState(false);
  const handleClose = () => {
    setShowModal(false);
  };
  return (
    <div >
      <header id='main-header'>
        <Header />
      </header>
      <div className="feed_doublecontainer" style={{ display: 'grid' }}>
        <section id='ads'></section>
        <div id="main-wrapper" className='px-0 mt-5 mt-lg-0'>
          <main id="main-section" className='pr-lg-3 mt-2 mt-lg-0' >
            <div className="container-fluid w-100">
              <div className="card p-3 mb-1">
                <div className="d-flex justify-content-between">
                  <span className="fontsubtitle font-weight-bold text-dark1">Users List</span>

                  <span className="d-lg-none d-md-none d-block fontsubtitle" onClick={() => { setShowModal(true) }}>
                    <i className="fa fa-filter" style={{ color: '#4535C1' }} />
                  </span>
                </div>

              </div>
              <div className="card rounded shadow-sm p-2">
                {<UserList />}
              </div>
            </div>
          </main>
        </div>

        <div className="d-none d-md-block d-lg-block">
          <div className="card p-2 position-sticky" style={{ top: '60px' }}>
            <div className="w-100 p-2 scrollerhide" style={{ height: "77vh", overflowY: 'scroll' }}>
              <div className="text-end d-flex align-items-center">
                <span className="text-dark1 text-center fontmdtitle w-100 font-weight-1">
                  Filter
                </span>
              </div>
              <div className="mt-3">
                <div>
                  <label htmlFor="accountNumber" className="text-dark1">Search</label>
                  <div className='w-100 filterinput'>
                    <input
                      type="text"
                      className="form-control mb-2 rounded-01"
                      value={Formdata.search}
                      onChange={(e) => {
                        setFormData({ ...Formdata, ["search"]: e.target.value })
                      }}
                    />
                  </div>
                </div>
                <div>
                  <label className="text-dark1">Country</label>
                  <div className='w-100 filterinput'>
                    <select
                      name="country"
                      className="form-control mb-2 rounded-01"
                      value={Formdata.location}
                      placeholder=" "
                      onChange={(e) => {
                        setFormData({ ...Formdata, ["location"]: e.target.value })
                      }}
                    >
                      <option value="">Country</option>
                      {locations.map(item => (
                        <option value={item.name}>{item.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="mt-3">
                  <label className="text-dark1">City</label>
                  <div className='w-100 filterinput'>
                    <input list="citys"
                      name="city"
                      className="form-control mb-2 rounded-01"
                      placeholder='Enter City'
                      disabled={Formdata.location ? false : true}
                      onChange={(e) => {
                        const { name, value } = e.target;
                        Citylist(value)
                        setFormData({ ...Formdata, ["city"]: value });
                      }}
                    />
                    <datalist id="citys">
                      {cityList.map(item => (
                        <option value={item.name + " " + item.state}>{item.name + " " + item.state}</option>
                      ))}
                    </datalist>
                  </div>
                </div>
                <div className='mt-3'>
                  <label className="text-dark1">Sector</label>
                  <div className='w-100 filterinput'>
                    <select className={`form-control inputcontrol rounded-01 mb-2 w-100`}
                      id="exampleInputCountry"
                      placeholder=" "
                      onChange={(e) => {
                        setFormData({ ...Formdata, ["industry"]: e.target.value })
                      }}
                      aria-describedby="countryHelp">
                      <option value="">Industry</option>
                      {options && options.map((item) => (
                        <option value={item._id}>{item.title}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label htmlFor="accountNumber" className="text-dark1">Skills</label>
                  <div className='w-100 filterinput'>
                    <input
                      type="text"
                      className="form-control mb-2 rounded-01"
                      value={filterText}
                      onChange={handleFilterChange}
                    />
                    {selectedItems.length != 0 &&
                      <div className='py-1 px-2'>
                        <label htmlFor="accountNumber">Selected items:</label>

                        <ul className='d-flex flex-row flex-wrap justify-content-start' style={{ columnGap: 2 }}>
                          {selectedItems.map((item, index) => (
                            <div style={{ background: '#592C92', color: '#fff', borderRadius: 25 }} className="d-flex card flex-row align-items-center my-1">
                              <li key={index} className=' px-2'
                                style={{ cursor: "pointer", fontSize: "12px" }}
                                onClick={() => handleCheckboxChange(item)} >{item}</li>
                              <span className='p-1' style={{ color: 'red', cursor: 'pointer' }}
                                onClick={() => handleCheckboxChange(item)}>
                                <strong>&times;</strong>
                              </span>
                            </div>
                          ))}
                        </ul>
                      </div>}
                    <div className='card p-2'>
                      <h5>Suggested</h5>
                      <hr style={{ marginBottom: "0%", marginTop: "0%" }} />
                      <div
                        className={`options ${true ? "d-flex" : "d-none"}`}
                        style={{ maxHeight: "180px", overflowY: "scroll", flexWrap: "wrap" }}
                      >
                        {AllSkill.filter(
                          (option) => !selectedItems.includes(option)
                        ) // Exclude selected items
                          .filter((option) => {
                            if (filterText && filterText.length === 2) {
                              const sanitizedFilterText = filterText.replace(
                                /\s/g,
                                ""
                              ); // Remove spaces from filterText
                              return option
                                .toLowerCase()
                                .includes(sanitizedFilterText.toLowerCase());
                            }
                            if (filterText && filterText.length > 2) {
                              return option
                                .toLowerCase()
                                .includes(filterText.toLowerCase());
                            }
                            return true;
                          })
                          .slice(0, 100)
                          .map((optiontext, index) => (
                            <div key={index} className="option mx-1 px-1 py-1 my-1"
                              style={{ cursor: "pointer", fontSize: "10px", display: "flex", flexWrap: "wrap" }}
                              onClick={() => handleCheckboxChange(optiontext)}
                            >
                              <div className='d-flex justify-content-around p-2 ' style={{ borderRadius: "20px", backgroundColor: "#e9ecef", width: "fit-content" }}>
                                {optiontext}

                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="d-flex" style={{ justifyContent: "flex-end", marginTop: "10px" }}>
              <button className="btn btn-outline-connect rounded-pill mr-2" onClick={() => {
                setFormData({
                  location: "",
                  city: "",
                  industry: "",
                  search: "",
                });
                ClientNotify()
              }}>Reset</button>
              <button className="btn btn-connect rounded-pill" onClick={() => { HandleSubmit() }}>Filter</button>
            </div>
          </div>
        </div>
      </div>
      <Modal
        show={showModal}
        onHide={handleClose}
        className="modelfilter modal-xl modaltop feed-modal"
        size="lgg"
      >
        <Modal.Body className="px-0 pt-0 pb-0" style={{ backgroundColor: "transparent", alignContent: "center" }}>
          <div className="card p-2 scrollerhide" style={{ height: "80vh", overflowY: 'scroll', margin: "10px", padding: "10px", width: "auto" }}>
            <div className="text-end d-flex justify-content-between">
              <span className="text-dark1 text-center fontmdtitle font-weight-1">
                Filter
              </span>
              <button
                className="btn btn-outline-connect rounded-pill px-0"
                onClick={() => { setShowModal(false) }}
                style={{
                  width: "70px",
                  padding: "4px 10px"
                }}
              >
                Close
              </button>
            </div>
            <div className="mt-3">
              <div>
                <label htmlFor="accountNumber" className="text-dark1">Search</label>
                <div className='w-100 filterinput'>
                  <input
                    type="text"
                    className="form-control mb-2 rounded-01"
                    value={Formdata.search}
                    onChange={(e) => {
                      setFormData({ ...Formdata, ["search"]: e.target.value })
                    }}
                  />
                </div>
              </div>
              <div>
                <label className="text-dark1">Country</label>
                <div className='w-100 filterinput'>
                  <select
                    name="country"
                    className="form-control mb-2 rounded-01"
                    value={Formdata.location}
                    placeholder=" "
                    onChange={(e) => {
                      setFormData({ ...Formdata, ["location"]: e.target.value })
                    }}
                  >
                    <option value="">Country</option>
                    {locations.map(item => (
                      <option value={item.name}>{item.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="mt-3">
                <label className="text-dark1">City</label>
                <div className='w-100 filterinput'>
                  <input list="citys"
                    name="city"
                    className="form-control mb-2 rounded-01"
                    placeholder='Enter City'
                    disabled={Formdata.location ? false : true}
                    onChange={(e) => {
                      const { name, value } = e.target;
                      Citylist(value)
                      setFormData({ ...Formdata, ["city"]: value });
                    }}
                  />
                  <datalist id="citys">
                    {cityList.map(item => (
                      <option value={item.name + " " + item.state}>{item.name + " " + item.state}</option>
                    ))}
                  </datalist>
                </div>
              </div>
              <div className='mt-3'>
                <label className="text-dark1">Sector</label>
                <div className='w-100 filterinput'>
                  <select className={`form-control inputcontrol rounded-01 mb-2 w-100`}
                    id="exampleInputCountry"
                    placeholder=" "
                    onChange={(e) => {
                      setFormData({ ...Formdata, ["industry"]: e.target.value })
                    }}
                    aria-describedby="countryHelp">
                    <option value="">Industry</option>
                    {options && options.map((item) => (
                      <option value={item._id}>{item.title}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="accountNumber" className="text-dark1">Skills</label>
                <div className='w-100 filterinput'>
                  <input
                    type="text"
                    className="form-control mb-2 rounded-01"
                    value={filterText}
                    onChange={handleFilterChange}
                  />
                  {selectedItems.length != 0 &&
                    <div className='py-1 px-2'>
                      <label htmlFor="accountNumber">Selected items:</label>

                      <ul className='d-flex flex-row flex-wrap justify-content-start' style={{ columnGap: 2 }}>
                        {selectedItems.map((item, index) => (
                          <div style={{ background: '#592C92', color: '#fff', borderRadius: 25 }} className="d-flex card flex-row align-items-center my-1">
                            <li key={index} className=' px-2'
                              style={{ cursor: "pointer", fontSize: "12px" }}
                              onClick={() => handleCheckboxChange(item)} >{item}</li>
                            <span className='p-1' style={{ color: 'red', cursor: 'pointer' }}
                              onClick={() => handleCheckboxChange(item)}>
                              <strong>&times;</strong>
                            </span>
                          </div>
                        ))}
                      </ul>
                    </div>}
                  <div className='card p-2'>
                    <h5>Suggested</h5>
                    <hr style={{ marginBottom: "0%", marginTop: "0%" }} />
                    <div
                      className={`options ${true ? "d-flex" : "d-none"}`}
                      style={{ maxHeight: "180px", overflowY: "scroll", flexWrap: "wrap" }}
                    >
                      {AllSkill.filter(
                        (option) => !selectedItems.includes(option)
                      ) // Exclude selected items
                        .filter((option) => {
                          if (filterText && filterText.length === 2) {
                            const sanitizedFilterText = filterText.replace(
                              /\s/g,
                              ""
                            ); // Remove spaces from filterText
                            return option
                              .toLowerCase()
                              .includes(sanitizedFilterText.toLowerCase());
                          }
                          if (filterText && filterText.length > 2) {
                            return option
                              .toLowerCase()
                              .includes(filterText.toLowerCase());
                          }
                          return true;
                        })
                        .slice(0, 100)
                        .map((optiontext, index) => (
                          <div key={index} className="option mx-1 px-1 py-1 my-1"
                            style={{ cursor: "pointer", fontSize: "10px", display: "flex", flexWrap: "wrap" }}
                            onClick={() => handleCheckboxChange(optiontext)}
                          >
                            <div className='d-flex justify-content-around p-2 ' style={{ borderRadius: "20px", backgroundColor: "#e9ecef", width: "fit-content" }}>
                              {optiontext}

                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-between">
                <button className="btn btn-outline-connect rounded-pill" onClick={() => { handleClose() }}>
                  Reset
                </button>
                <button className="btn btn-connect rounded-pill"
                  onClick={() => {
                    HandleSubmit()
                    handleClose();
                  }}
                >Filter</button>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <BottomNavbar />
    </div>
  )
}
export default Vault

