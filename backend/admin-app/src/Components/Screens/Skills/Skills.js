import React, { useState, useEffect } from 'react';
import FetchData from '../../fetch-api/Apifetch';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Swal from 'sweetalert2';
import ApiRoute from '../../utils/ApiRoute';
import { useLocation } from 'react-router-dom';

const Skills = () => {
    const location = useLocation();
    const { state } = location;

    const [show, setShow] = useState(false);
    const [mode, setMode] = useState('add');
    const [skillId, setSkillId] = useState(null);
    const [options, setOptions] = useState([]);

    const [Indust, setIndust] = useState(state.Industryid);
    const [Skill, setSkill] = useState('');

    const [SkillError, setSkillError] = useState('');
    const [paginationInfo, setPaginationInfo] = useState(null);
    const [page, setPage] = useState(1);
    const [Buttondisable , setButtondisable] = useState(false);
  
    useEffect(() => {
      fetchInd();
    }, [page]);

    const fetchInd = async () => {
      try {
        const response = await fetch(`${ApiRoute.APIBASE_URL}/skill/${Indust}?page=${page}&limit=10`);
        const data = await response.json();
        setOptions(data.data.data);
        setPaginationInfo(data.data.pagination);
      } catch (error) {
        console.error('Error fetching options:', error.message);
      }
    };
  
    const handleShow = (title) => {
      setShow(true);
      setMode(title);
      setSkillError(''); // Resetting error message on modal open
    };
  
    const handleClose = () => {
      setShow(false);
      setSkillId(null);
      setSkill('');
      setSkillError(''); // Resetting error message on modal close
    };
  
    const handleEdit = (id, title) => {
      setSkillId(id);
      setSkill(title);
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
  
    const handleAddOrEditSkill = async () => {
      try {
        if (!Skill) {
          setSkillError('skills is required.');
          return;
        } else {
          setSkillError('');
        }
        setButtondisable(true);
    
        const data = JSON.stringify({
        //  Industry_id:Indust,
         skill:Skill
        });
    
        const method = mode === 'edit' ? 'POST' : 'POST';
        const url = mode === 'edit' ? `skill/update/${skillId}` : 'skill';
    
        const res = await FetchData(url, method, data, true, false);
        // if (res.success) {
          handleClose();
          fetchInd(); // Fetch industries again after successful addition/edit
        // }
      } catch (error) {
        console.error(`Error ${mode === 'edit' ? 'editing' : 'adding'} skill:`, error.message);
      } finally {
        setButtondisable(false); // Resetting Buttondisable to false after the operation
      }
    };
    
  
    const handleDelete = (itemId) => {
      Swal.fire({
        title: "Are you sure you want to delete this?",
        showCancelButton: true,
        confirmButtonText: "Delete",
        denyButtonText: "Cancel",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const res = await FetchData(`skill/delete/${itemId}`, 'GET', null, true, false);
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
              <h4 className="fw-semibold mb-8">Skills</h4>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a className="text-muted text-decoration-none" href="/">Home</a>
                  </li>
                  <li className="breadcrumb-item" aria-current="page">Skills</li>
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

      <Button variant="primary" style={{ float: 'right' }} onClick={() => handleShow("add")} className='mb-2'>Add Skills</Button>
      
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{mode === 'edit' ? 'Edit' : 'Add'}  Skills</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Enter Skill</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter Skill"
                autoFocus
                value={Skill}
                onChange={(e) => {
                  setSkill(e.target.value);
                  setSkillError('');
                }}
              />
              {SkillError && <div className="text-danger">{SkillError}</div>}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>Close</Button>
          <Button variant="primary" onClick={handleAddOrEditSkill } disabled={Buttondisable} >{mode === 'edit' ? 'Update' : 'Add'}</Button>
        </Modal.Footer>
      </Modal>
    </div>

    <div className='container' style={{ paddingLeft: '2%' }}>
      <table className="table">
        <thead>
          <tr>
            <th scope="col" style={{ background: "aliceblue", fontSize: "16px", borderRadius: "10px 0px 0px 15px" }}>S.No</th>
            <th scope="col" style={{ background: "aliceblue", fontSize: "16px" }}>Skills</th>
            <th scope="col" style={{ background: "aliceblue", fontSize: "16px" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {options.map((skill, index) => (
            <tr key={index}>
              <th scope="row">{(page - 1) * 10 + index + 1}</th>
              <td style={{ width: "20%" }}>{skill.skill}</td>
              <td>
                <button className='btn btn-success edit-btn' onClick={() => handleEdit(skill._id, skill.skill)}>Edit</button>&nbsp;&nbsp;
                <button className='btn btn-danger delete-btn' onClick={() => handleDelete(skill._id)}>Delete</button>
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
  )
}

export default Skills