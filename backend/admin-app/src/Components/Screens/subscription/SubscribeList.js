import React from 'react';

function SubscribeList({ listSubscription, fetchSubscription, handleEdit, handleDelete, paginationInfo, PreviousPage, NextPage, page, setPage }) {

  return (
    <div className="container" style={{ paddingLeft: '1%' }}>
      <table className="table">
        <thead>
          <tr>
          <th scope="col" style={{ background: "aliceblue", fontSize: "16px", borderRadius: "10px 0px 0px 15px" }}>S.No</th>
            <th scope="col" style={{ background: "aliceblue", fontSize: "16px" }}>Title</th>
            <th scope="col" style={{ background: "aliceblue", fontSize: "16px" }}>Description</th>
            <th scope="col" style={{ background: "aliceblue", fontSize: "16px" }}>price</th>
            <th scope="col" style={{ background: "aliceblue", fontSize: "16px" }}>Validity</th>
            <th scope="col"style={{ background: "aliceblue", fontSize: "16px" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {listSubscription.map((sub, index) => (
            <tr key={index}>
             <th scope="row">{(page - 1) * 10 + index + 1}</th>
              <td>{sub.title}</td>
              <td>{sub.description}</td>
              <td>{sub.price}</td>
              <td>{sub.validity_month}</td>
              <td>
                <button className='btn btn-success edit-btn' onClick={() => handleEdit(sub._id, sub)}> Edit</button>&nbsp;&nbsp;
                <button className='btn btn-danger delete-btn' onClick={() => handleDelete(sub._id)}> Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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

export default SubscribeList;
