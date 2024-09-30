import React, { useEffect, useState } from 'react';
import FetchData from '../../fetch-api/Apifetch';
import { BASE_URL } from '../../utils/ApiRoute';
import Button from 'react-bootstrap/Button';
import India from './Images/india.webp'
import afgan from './Images/afgan.png'
import indo from './Images/indo.png'
import saudi from './Images/saudi.png'

function Pavilion() {
  const [datalist, setDataList] = useState([]);
  const [page, setPage] = useState(1);
  const [pavilionList, setPavilionList] = useState([]);
  const [paginationInfo, setPaginationInfo] = useState(null);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [type, setType] = useState(null);
  const [title, setTitle] = useState(null);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    fetchPavilionList();
  }, [page, type, title]);

  const fetchPavilionList = async () => {
    try {
      setLoading(true); 

      let search = '';
      if (type !== null && title !== null) {
        search = `&type=${type}&title=${title}`;
      } else if (type !== null) {
        search = `&type=${type}`;
      } else if (title !== null) {
        search = `&title=${title}`;
      }

      const endpoint = `scrap/list?page=${page}&limit=20${search}`;
      const res = await FetchData(endpoint, 'GET', null, true, false);

      if (res.status) {
        if (page === 1) {
          setPavilionList(res.users || []);
        } else {
          setPavilionList(prevList => [...prevList, ...res.users]);
        }
        setPaginationInfo(res.pagination || null);
        setDataList(res.users);
      } else {
        console.error("Error fetching pavilion list:", res.message);
      }
    } catch (error) {
      console.error("Error fetching pavilion list:", error.message);
    } finally {
      setLoading(false); 
    }
  };

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

  const NextPage = () => {
    setPage(page + 1);
  };

  const PreviousPage = () => {
    setPage(page - 1);
  };

  if (loading) {
    return <img src='assets/images/logos/Spinner-5.gif' style={{textAlign:"center", marginTop:"27%", marginLeft:"40%" }}/>; 
  }

  const Categorydata = [
    {
    title:"India Economy Chamber",
    flage:India,
  },
    {
    title:"Indo-Africa Trade Chamber",
    flage:afgan,
  },
    {
    title: "Afghanistan Trade Chamber",
    flage:indo,
  },
    {
    title:"Saudi Economy Trade Chamber",
    flage:saudi,
  },
  ]

  return (
    <div className="body-wrapper">
      <div className="container-fluid">
        <div className="card bg-info-subtle shadow-none position-relative overflow-hidden mb-4">
          <div className="card-body px-4 py-3">
            <div className="row align-items-center">
              <div className="col-9">
                <h4 className="fw-semibold mb-8">Pavilion List</h4>
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a className="text-muted text-decoration-none" href="/">
                        Home
                      </a>
                    </li>
                    <li className="breadcrumb-item" aria-current="page">
                      Pavilion List
                    </li>
                  </ol>
                </nav>
              </div>
              <div className="col-3">
                <div className="text-center mb-n5">
                  <img src="/assets/images/breadcrumb/ChatBc.png" alt="" className="img-fluid mb-n4" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container" style={{ paddingLeft: '1%' }}>
        <label htmlFor="userTypeFilter" style={{ float: "right", marginRight: "9px" }}>Filter By:</label>
      </div>

      <div className="container" style={{ paddingLeft: '1%' }}>
        <table className="table">
          <thead>
            <tr>
            <th scope="col" style={{ background: "aliceblue", fontSize: "14px", borderRadius: "10px 0px 0px 15px" }}>S.No</th>
              <th scope="col" style={{ background: "aliceblue", fontSize: "14px" }}>Flag</th>
              <th scope="col" style={{ background: "aliceblue", fontSize: "14px" }}>Category</th>
              <th scope="col" style={{ background: "aliceblue", fontSize: "14px" }}>View</th>
            </tr>
          </thead>
          <tbody>
            {Categorydata.map((item, index) => (
              <tr key={index}>
                <th scope="row">{(page - 1) * 10 + index + 1}</th>
                <td>
                    <img src={item.flage} width="50px"  alt="" />
                </td>
                <td>{item.title}</td>
                <td>
                <Button variant="primary" onClick={() => window.location.href="/pavilion"}>
                      View
                </Button>    
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
 
    </div>
  );
}

export default Pavilion;
