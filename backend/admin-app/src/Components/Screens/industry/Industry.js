import React, { useState, useEffect } from 'react';
import FetchData from '../../fetch-api/Apifetch';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Swal from 'sweetalert2';
import ApiRoute from '../../utils/ApiRoute';
import { useNavigate } from 'react-router-dom';

const Industry = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState('add');
  const [industryId, setIndustryId] = useState(null);
  const [options, setOptions] = useState([]);
  const [Indust, setIndust] = useState('');
  const [IndustError, setIndustError] = useState('');
  const [paginationInfo, setPaginationInfo] = useState(null);
  const [page, setPage] = useState(1);
  const [Buttondisable , setButtondisable] = useState(false);

  useEffect(() => {
    fetchInd();
  }, [page]);

  const fetchInd = async () => {
    try {
      const response = await fetch(`${ApiRoute.APIBASE_URL}/industry?page=${page}&limit=10`);
      const data = await response.json();
      setOptions(data.data.data);
      setPaginationInfo(data.data.pagination || null)
    }catch(error){
      console.error('Error fetching options:', error.message);
    }
  };

  const handleShow = (title) => {
    setShow(true);
    setMode(title);
    setIndustError(''); // Resetting error message on modal open
  };

  const handleClose = () => {
    setShow(false);
    setIndustryId(null);
    setIndust('');
    setIndustError(''); // Resetting error message on modal close
  };

  const handleEdit = (id, title) => {
    setIndustryId(id);
    setIndust(title);
    handleShow("edit");
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

  const handleAddOrEditIndustry = async () => {
    try {
      if (!Indust) {
        setIndustError('Industry name is required.');
        return;
      } else {
        setIndustError('');
      }
      setButtondisable(true);
  
      const data = JSON.stringify({
        title: Indust,
      });
  
      const method = mode === 'edit' ? 'POST' : 'POST';
      const url = mode === 'edit' ? `industry/update/${industryId}` : 'industry';
  
      const res = await FetchData(url, method, data, true, false);
      if (res.success){
        handleClose();
        fetchInd(); // Fetch industries again after successful addition/edit
      }
    } catch (error) {
      console.error(`Error ${mode === 'edit' ? 'editing' : 'adding'} industry:`, error.message);
    } finally {
      setButtondisable(false); // Resetting Buttondisable to false after the operation
    }
  };
  
const handleview = (Industryid) => {
  navigate(`/skills`,
   { state: { Industryid } });

}


  const handleDelete = (itemId) => {
    Swal.fire({
      title: "Are you sure you want to delete this?",
      showCancelButton: true,
      confirmButtonText: "Delete",
      denyButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await FetchData(`industry/delete/${itemId}`, 'GET', null, true, false);
          if (res.success) {
            fetchInd();

            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Industry Deleted Successfully",
              showConfirmButton: false,
              timer: 1500
            });
          } else {
            console.error("Error deleting Industry:", res.message);
          }
        } catch (error) {
          console.error("Error deleting Industry:", error.message);
        }
      }
    });
  };

  return (
    <div className="body-wrapper">
      <div className="container-fluid">
        <div className="card bg-info-subtle shadow-none position-relative overflow-hidden mb-4">
          <div className="card-body px-4 py-3">
            <div className="row align-items-center">
              <div className="col-9">
                <h4 className="fw-semibold mb-8">Industry Application</h4>
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a className="text-muted text-decoration-none" href="/">Home</a>
                    </li>
                    <li className="breadcrumb-item" aria-current="page">Industry Application</li>
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

        <Button variant="primary" style={{ float: 'right' }} onClick={() => handleShow("add")} className='mb-2'>Add Industry</Button>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{mode === 'edit' ? 'Edit' : 'Add'}  Industry</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Enter Industry Name</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter industry name"
                  autoFocus
                  value={Indust}
                  onChange={(e) => {
                    setIndust(e.target.value);
                    setIndustError('');
                  }}
                />
                {IndustError && <div className="text-danger">{IndustError}</div>}
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={handleClose}>Close</Button>
            <Button variant="primary" onClick={handleAddOrEditIndustry } disabled={Buttondisable} >{mode === 'edit' ? 'Update' : 'Add'}</Button>
          </Modal.Footer>
        </Modal>

      </div>

      <div className='container' style={{ paddingLeft: '2%' }}>
        <table className="table">
          <thead>
            {/* <tr className="w-100 row"> */}
              <th scope="col"  className="col-3 p-2" style={{ background: "aliceblue", fontSize: "16px", borderRadius: "10px 0px 0px 15px" }}>S.No</th>
              <th scope="col" className="col-6 p-2" style={{ background: "aliceblue", fontSize: "16px" }}>Industry</th>
              <th scope="col" className="col-3 p-2 text-center"style={{ background: "aliceblue", fontSize: "16px" }}>Action</th>
            {/* </tr> */}
          </thead>
          <tbody>


          <tr>
                <th scope="row">0</th>
                <td style={{ width: "20%" }}>Other Industry</td>
                <td className='text-end'>
                  <button className='btn btn-primary view-btn mx-4' onClick={() => handleview(8)}>view</button>
                </td>
              </tr>
            {options && options.map((industry, index) => (
              <tr key={index}>
                <th scope="row">{(page - 1) * 10 + index + 1}</th>
                <td style={{ width: "20%" }}>{industry.title}</td>
                <td>
                  <button className='btn btn-success edit-btn' onClick={() => handleEdit(industry._id, industry.title)}>Edit</button>&nbsp;&nbsp;
                  <button className='btn btn-danger delete-btn' onClick={() => handleDelete(industry._id)}>Delete</button>
                  &nbsp;&nbsp;
                  <button className='btn btn-primary view-btn' onClick={() => handleview(industry._id)}>view</button>
                </td>
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

export default Industry;
