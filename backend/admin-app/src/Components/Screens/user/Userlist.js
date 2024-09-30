import React, { useState, useEffect } from 'react';
import FetchData from '../../fetch-api/Apifetch';
import Button from 'react-bootstrap/Button';
import Swal from 'sweetalert2';
import "./user.css"
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Userlist() {
  const navigate = useNavigate();
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [paginationInfo, setPaginationInfo] = useState(null);
  const [userTypeFilter, setUserTypeFilter] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchUserList();
  }, [page, userTypeFilter]);



  const paginationNumbers = () => {
    const totalPages = paginationInfo?.totalPages || 0;
    const currentPage = page;
    const paginationRange = 10;
    const maxPagesToShow = Math.min(totalPages, paginationRange);
    const paginationStart = Math.max(1, currentPage - Math.floor(paginationRange / 2));
    const paginationEnd = Math.min(totalPages, paginationStart + paginationRange - 1);

    const numbersToShow = [];
    for (let i = paginationStart; i <= paginationEnd; i++) {
      numbersToShow.push(i);
    }
    return numbersToShow;
  };

  const fetchUserList = async () => {
    try {
      // setLoading(true)
      const typeMapping = {
        'all': '',
        'client': '0',
        'business': '1',
        'admin': '2',
      };
      var query =`page=${page}&limit=10`
      if(searchQuery && typeMapping[userTypeFilter || '']){
        query =`page=${page}&limit=10&type=${typeMapping[userTypeFilter || '']}&search=${searchQuery}`
      }else if(searchQuery){
        query =`page=${page}&limit=10&search=${searchQuery}`
      }else if(typeMapping[userTypeFilter || '']){
        query =`page=${page}&limit=10&type=${typeMapping[userTypeFilter || '']}`
      }
      const res = await FetchData(`list/user?${query}`, 'GET', null, true, false);
      if (res.success) {
        const filteredUsers = filterUsersByType(res.data.users || []);
        setUserList(filteredUsers);
        setPaginationInfo(res.data.pagination || null);
        console.log("User list:", filteredUsers);
      } else {
        console.error("Error fetching user list:", res.message);
      }
    } catch (error) {
      console.error("Error fetching user list:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const filterUsersByType = (users) => {
    if (userTypeFilter === 'client') {
      return users.filter(user => user.user_type === '0');
    } else if (userTypeFilter === 'business') {
      return users.filter(user => user.user_type === '1');
    } else if (userTypeFilter === 'admin') {
      return users.filter(user => user.user_type === '2');
    } else {
      return users;
    }
  };

  const handleUserTypeChange = (event) => {
    const selectedUserType = event.target.value;
    console.log('Selected User Type:', selectedUserType);
    setUserTypeFilter(selectedUserType);
    setPage(1);
  };

  const handleSearchInputChange = async (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    setUserTypeFilter('')
    if (query === '') {
      return;
    }
    await fetchUserList();
  };
  
  

  const NextPage = () => {
    setPage(page + 1);
  };

  const PreviousPage = () => {
    setPage(page - 1);
  };

  const Gotonext = (userId) => {
    navigate(`/alldetails/${userId}`);
  };

  if (loading) {
    return <img src='assets/images/logos/Spinner-5.gif' style={{ textAlign: "center", marginTop: "27%", marginLeft: "40%" }} />;
  }
  return (
    <div className="body-wrapper">
      <div className="container-fluid">
        <div className="card bg-info-subtle shadow-none position-relative overflow-hidden mb-4">
          <div className="card-body px-4 py-3">
            <div className="row align-items-center">
              <div className="col-9">
                <h4 className="fw-semibold mb-8">User Application</h4>
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a className="text-muted text-decoration-none" href="/">
                        Home
                      </a>
                    </li>
                    <li className="breadcrumb-item" aria-current="page">
                      User Application
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
      <div className='container'>
        <input type="text" placeholder='search here...' style={{ border: "0.5px solid #cfcfcf",borderRadius: "4px",height:"30px",width:"23%" }} className='px-2 mx-2'
         onChange={handleSearchInputChange} />
        <select
          name="userTypeFilter"
          id="userTypeFilter"
          value={userTypeFilter || ''}
          onChange={handleUserTypeChange}
          style={{ float: "right", marginRight: "20px", marginBottom: "8px", border: "2px solid #cfcfcf", borderRadius: "4px", width: "10%" }}
        >
          <option value="" >All</option>
          <option value="client">Client</option>
          <option value="business">Business Partner</option>
          <option value="admin">Admin</option>
        </select>
        <label htmlFor="userTypeFilter" style={{ float: "right", marginRight: "9px" }}>Filter By:</label>
        <table className="table">
          <thead>
            <tr>
              <th scope="col" style={{ background: "aliceblue", fontSize: "14px", borderRadius: "10px 0px 0px 15px" }}>No.</th>
              <th scope="col" style={{ background: "aliceblue", fontSize: "14px" }}>Username</th>
              <th scope="col" style={{ background: "aliceblue", fontSize: "14px" }}>First Name</th>
              <th scope="col" style={{ background: "aliceblue", fontSize: "14px" }}>Last Name</th>
              <th scope="col" style={{ background: "aliceblue", fontSize: "14px" }}>Email</th>
              <th scope="col" style={{ background: "aliceblue", fontSize: "14px" }}>User Type</th>
              <th scope="col" style={{ background: "aliceblue", fontSize: "14px" }}>Verify</th>
              <th scope="col" style={{ background: "aliceblue", fontSize: "14px", borderRadius: "0px 0px 0px 5px" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {userList.map((user, index) => (
              <tr key={index}>
                <th scope="row">{(page - 1) * 10 + index + 1}</th>
                <td>{user.username}</td>
                <td>{user.first_name}</td>
                <td>{user.last_name}</td>
                <td>{user.gmail}</td>
                <td>{user.user_type === '0' || user.user_type === '2' ? 'Client' : (user.user_type === '1' ? 'Business Partner' : 'Admin')}</td>
                <td>
                  <Link to="">
                    {user.status === 0 ? (
                      <i className="fa fa-times" aria-hidden="true" style={{ color: "red", marginLeft: "15px" }}></i>
                      ) : user.status === 1 ?  (
                      <i className="fa fa-check" aria-hidden="true" style={{ color: "green", marginLeft: "15px" }}></i>
                      ): user.status === 2 ? (
                        <i class="fa fa-ban" aria-hidden="true"  style={{ color: "Red", marginLeft: "15px" }}></i> 
                      ):(
                        <i class="fa fa-info-circle" aria-hidden="true" style={{ color: "orange", marginLeft: "15px" }}></i>
                    )}
                  </Link>
                </td>

                <td>
                    <Button variant="primary" onClick={() => Gotonext(user._id)}>
                      View
                    </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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
      <div className='pagination' style={{ marginLeft: "17px" }}>
        <p>Total Records: {paginationInfo?.totalItems}</p>
        <p style={{ paddingLeft: '10px' }}>Total Pages: {paginationInfo?.totalPages}</p>
      </div>
    </div>
  );
}

export default Userlist;
