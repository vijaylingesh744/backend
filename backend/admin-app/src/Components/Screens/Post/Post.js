import React, { useEffect, useState } from 'react';
import FetchData from '../../fetch-api/Apifetch';
import { BASE_URL } from '../../utils/ApiRoute';
import { useParams } from 'react-router-dom';

function Post() {
  const { id } = useParams();

  const [paginationInfo, setPaginationInfo] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchData();
  }, [id, page]);

  const [datalist, setDataList] = useState([]);
  const [showFullDescription, setShowFullDescription] = useState([]);

  const fetchData = async () => {
    const res = await FetchData(`post?page=${page}&limit=10`, 'GET', null, true, false);
    setDataList(res.data.sort((a, b) => b.__v - a.__v));
    setPaginationInfo(res.pagination); 
  };

  const getReactionCount = (post) => {
    return post.reaction ? post.reaction.length : 0;
  };

  const getCommentCount = (post) => {
    return post.CommentUsers ? post.CommentUsers.length : 0;
  };

  const handleImageError = (event) => {
    event.target.src = "/assets/images/no-images/No-Image.png"; 
    event.target.style.width = '60%'; 
    event.target.style.height = '80px'; 
  };

  const NextPage = () => {
    if (paginationInfo.currentPage < paginationInfo.totalPages) {
      setPage(page + 1);
    }
  };
  
  const PreviousPage = () => {
    if (paginationInfo.currentPage > 1) {
      setPage(page - 1);
    }
  };

  return (
    <div className="body-wrapper">
      <div className="container-fluid">
        <div className="card bg-info-subtle shadow-none position-relative overflow-hidden mb-4">
          <div className="card-body px-4 py-3">
            <div className="row align-items-center">
              <div className="col-9">
                <h4 className="fw-semibold mb-8">Posts list</h4>
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a className="text-muted text-decoration-none" href="/">
                        Home
                      </a>
                    </li>
                    <li className="breadcrumb-item" aria-current="page">
                      Post list
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
        <table className="table">
          <thead>
            <tr>
            <th scope="col" style={{ background: "aliceblue", fontSize: "14px", borderRadius: "10px 0px 0px 15px" }}>S.No</th>
              <th scope="col" style={{ background: "aliceblue", fontSize: "14px" }}>POSTED-BY</th>
              <th scope="col" style={{ background: "aliceblue", fontSize: "14px" }}>DESCRIPTION</th>
              <th scope="col" style={{ background: "aliceblue", fontSize: "14px" }}>IMAGES</th>
              <th scope="col" style={{ background: "aliceblue", fontSize: "14px" }}>COMMENTS</th>
              <th scope="col" style={{ background: "aliceblue", fontSize: "14px" }}>REACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {datalist.map((post, index) => (
              <tr key={index}>
               <th scope="row">{(page - 1) * 10 + index + 1}</th>
                <td style={{ width: '13%' }}>{post.users ? post.users.first_name : 'Unknown User'}</td>
                <td style={{ width: '46%', lineHeight: '20px', fontSize: '14px' }}>
                {showFullDescription[index] ? (
  post.description
) : (
  <>
    {post.description.length > 100 ? (
      <>
        {post.description.substring(0, 100)}
        <a
          onClick={() => {
            const updatedShowFullDescription = [...showFullDescription];
            updatedShowFullDescription[index] = true;
            setShowFullDescription(updatedShowFullDescription);
          }}
          style={{ color:"blue",cursor:"pointer" }}
        >
          ... See More
        </a>
      </>
    ) : (
      post.description
    )}
  </>
)}

                 
                </td>
                <td>
                  <img
                    src={BASE_URL + post.media_url[0]}
                    alt=""
                    style={{ width: '81%', height: '118px',objectFit: "contain" }}
                    className={'full-width'}
                    onError={handleImageError}
                  />
                </td>
                <td style={{ textAlign:"center" }}>{getCommentCount(post)}</td>
                <td style={{ textAlign:"center" }}>{getReactionCount(post)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <nav aria-label="Page navigation example">
      <ul className="pagination" style={{ marginLeft: "10px" }}>
          <li className={`page-item ${paginationInfo && paginationInfo.currentPage === 1 ? 'disabled' : ''}`}>
            <a className="page-link" href="#" aria-label="Previous" onClick={PreviousPage}>
              <span aria-hidden="true">Previous</span>
              {/* <span className="sr-only">Previous</span> */}
            </a>
          </li>
          {paginationInfo && [...Array(paginationInfo.totalPages).keys()].map((pageNum) => (
            <li key={pageNum} className={`page-item ${page === pageNum + 1 ? 'active' : ''}`}>
              <a className="page-link" href="#" onClick={() => setPage(pageNum + 1)}>
                {pageNum + 1}
              </a>
            </li>
          ))}
          <li className={`page-item ${paginationInfo && paginationInfo.currentPage === paginationInfo.totalPages ? 'disabled' : ''}`}>
            <a className="page-link" href="#" aria-label="Next" onClick={NextPage}>
              <span aria-hidden="true">Next</span>
              {/* <span className="sr-only">Next</span> */}
            </a>
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

export default Post;