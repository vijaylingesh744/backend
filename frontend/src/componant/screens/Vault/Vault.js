import React, { useState, useEffect } from 'react'
import Header from '../layout/SubHeader';
import FetchData from '../../fetch-api/Apifetch';
import './Style/Style.css';
import FilterColumn from './Component/FilterColumn';
import LeftSide from "../FeedPage/PostData/LeftSide";
const Vault = () => {
  const [userList, setUserList] = useState([]);
  const [page, setPage] = useState(1);
  const [paginationInfo, setPaginationInfo] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [skill, Setskills] = useState([])
  const [options, setOptions] = useState([]);
  const handleCheckboxChange = (title) => {
    if (selectedItems.includes(title)) {
      setSelectedItems(selectedItems.filter(item => item !== title));
    } else {
      setSelectedItems([...selectedItems, title]);
    }
  }
  useEffect(() => {
    dataList()
  }, [])


  const [Formdata, setFormData] = useState({
    location: "",
    user_type: "-1",
    country: "",
    city: "",
  })
  const setUserType = () => {
    setFormData(prevFormData => ({
      ...prevFormData,
      user_type: "-1"
    }));
  };
  const setLocation =() =>{
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
    fetchUserList();
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
    setFilter(true)
    var Objectdata = { ...Formdata, ["skills"]: selectedItems }
    const res = await FetchData("filter_user", 'Post', JSON.stringify(Objectdata), false, false);
    setUserList(res.data.users);
    setPaginationInfo(res.data.pagination || null);
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
      if (searchQuery) {
        query = `page=${page}&limit=10&search=${searchQuery}`
      }
      const res = await FetchData(`list/user?${query}`, 'GET', null, true, false);
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

  var card = {
    border: "0.5px solid rgba(128, 128, 128, 0.31)",
    borderRadius: "10px",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
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
                  <div style={{cursor:'pointer'}} onClick={()=>{setLocation()}}>&times;</div>
                </div>}
                {Formdata.user_type != -1 &&
              <div className='card d-flex justify-content-between mx-2 my-2 px-3' style={{ width: "fit-content", color: '#fff', border: 'none', background: '#89C541', flexDirection: 'row', columnGap: 10, borderRadius: 20 }} >
                <div>{Formdata.user_type == 0 ? "Buyer" : Formdata.user_type == 1 ? "Business Parner" : Formdata.user_type == 2 ? "Seller" : null}</div>
                <div style={{cursor:'pointer'}} onClick={()=>{setUserType()}}>&times;</div>
              </div>}
              {selectedItems.map(item => (
                <div className='card d-flex justify-content-between mx-2 my-2 px-3' style={{ width: "fit-content", color: '#fff', border: 'none', background: '#89C541', flexDirection: 'row', columnGap: 10, borderRadius: 20 }} >
                  <div>{item}</div>
                  <div style={{cursor:'pointer'}} onClick={()=>{handleCheckboxChange(item)}}>&times;</div>
                </div>
              ))}
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
              <li
                key={pageNumber}
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
        style={{ overflowY: "scroll", maxHeight: "90vh", scrollbarWidth: "none", background: '#fff', borderRadius: '2%' }}>
        {userList && userList.map(item => (
          <div className="d-flex bg-white  justify-content-between my-1 px-4 py-2" style={card}>
            <div className="px-3 w-50 d-flex">
              <div className="align-items-center d-flex">
                <img
                  src={`/images/profile/img0${item.randomprofile}.png`}
                  style={{ width: 45, height: 45, borderRadius: "50%" }}
                />
              </div>
              <div className='mx-2'>
                <div className="small font-weight-bold">{item.username}</div>
                <p className="text-secondary1 m-0" style={{ fontSize: 12 }}>
                  {item.user_type == "1" ? "Business Partner" : "Buyer/Seller"}
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
              <div className="mx-4 rewards text-secondary1" style={{ fontSize: 12 }}>
                <img
                  src="/images/icons/medal.png"
                  className="mr-2"
                  style={{ width: 20, height: 20 }}
                />15 Coins</div>
            </div>
            <div>
            </div>
            <div className="align-items-center d-flex">
              <button className="btn btn-connect small" style={{ fontSize: "12px" }}>Lets Connect</button>
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
    <div>
      <Header />
      <FilterSuggestion />
      <div className="row my-2 mx-2">
        <div className='col-2 p-0 m-0'>
          <div className="d-none card d-md-block d-lg-block">
            <LeftSide />
          </div>
        </div>
        <div className='col-7'>
          <UserList />
        </div>
        <div class="col-3 px-1 pr-1" >
          <FilterColumn FilterData={FilterData} />
        </div>
        <PaginationIndex />
      </div>
    </div>
  )
}
export default Vault

