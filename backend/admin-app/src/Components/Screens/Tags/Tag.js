import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import FetchData from '../../fetch-api/Apifetch';
import Swal from 'sweetalert2';

function Tag() {
  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [tagName, setTagName] = useState('');
  const [tagValidity, setTagValidity] = useState('');
  const [taglist, setTaglist] = useState([]);
  const [editTagId, setEditTagId] = useState(null);
  const [tagNameError, setTagNameError] = useState('');
  const [tagValidityError, setTagValidityError] = useState('');
  const [paginationInfo, setPaginationInfo] = useState(null);
  const [page, setPage] = useState(1);
  const [Buttondisable , setButtondisable] = useState(false);

  const handleShow = () => setShow(true);
  const handleEdit = () => setShowEdit(true);
  const handleClose = () => {
    setShow(false);
    setShowEdit(false);
    setTagName('');
    setTagValidity('');
    setTagNameError('');
    setTagValidityError('');
  };

  const handleCloseEdit = () => {
    setShowEdit(false);
    setEditTagId(null);
    setTagName('');
    setTagValidity('');
    setTagNameError('');
    setTagValidityError('');
  };

  useEffect(() => {
    fetchTag();
  }, [page]);

  const handleAddTag = async () => {
    if (!validateForm()) return;
    setButtondisable(true);

    try {
      const data = JSON.stringify({
        key: tagName,
        value: tagValidity,
      });
      const res = await FetchData("post_tag", 'POST', data, true, false);
      if (res.status) {
        setTaglist([...taglist, res.data]);
        console.log("Tag added successfully.");
        handleClose();
      } else {
        console.error("Error adding tag:", res.message);
      }
    } catch (error) {
      console.error("Error adding tag:", error.message);
    }
    finally {
      setButtondisable(false); 
    }
  };

  const handleUpdateTag = async () => {
    if (!validateForm()) return;

    try {
      const data = JSON.stringify({
        key: tagName,
        value: tagValidity,
      });

      const res = await FetchData(`post_tag/update/${editTagId}`, 'POST', data, true, false);
      if (res.status) {
        const updatedTaglist = taglist.map(tag => {
          if (tag._id === editTagId) {
            return {
              ...tag,
              key: tagName,
              value: tagValidity
            };
          } else {
            return tag;
          }
        });
        setTaglist(updatedTaglist);
        console.log("Tag updated successfully.");
        handleCloseEdit();
      } else {
        console.error("Error updating tag:", res.message);
      }
    } catch (error) {
      console.error("Error updating tag:", error.message);
    }
  };

  const validateForm = () => {
    let valid = true;

    if (!tagName) {
      setTagNameError('Tag Name is required');
      valid = false;
    } else {
      setTagNameError('');
    }

    if (!tagValidity) {
      setTagValidityError('Tag Value is required');
      valid = false;
    } else {
      setTagValidityError('');
    }

    return valid;
  };

 const fetchTag = async () => {
    try {
      const res = await FetchData(`post_tag?page=${page}&limit=10`, 'GET', null, true, false);
      if (res.status) {
        setTaglist(res.data);
        setPaginationInfo(res.pagination);
        console.log("Tag data:", res.data);
      } else {
        console.error("Error fetching tag list:", res.message);
      }
    } catch (error) {
      console.error("Error fetching tag list:", error.message);
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
          const res = await FetchData(`post_tag/delete/${itemId}`, 'DELETE', null, true, false);
          if (res.status) {
            console.log(`tag deleted successfully for item ${itemId}`);
            fetchTag();

            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Tag Deleted Successfully",
              showConfirmButton: false,
              timer: 1500
            });
          } else {
            console.error("Error deleting User:", res.message);
          }
        } catch (error) {
          console.error("Error deleting User:", error.message);
        }
      }
    });
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
                <h4 className="fw-semibold mb-8">Tags List</h4>
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a className="text-muted text-decoration-none" href="/">
                        Home
                      </a>
                    </li>
                    <li className="breadcrumb-item" aria-current="page">
                      Tags List
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
        <Button variant="primary" style={{ float: 'right' }} onClick={handleShow} className='mb-2'>
          Add Tag
        </Button>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Tag</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Tag Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter the tag name"
                  autoFocus
                  value={tagName}
                  onChange={(e) => setTagName(e.target.value)}
                />
                {tagNameError && <div className="text-danger">{tagNameError}</div>}
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Value</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter the validity"
                  autoFocus
                  value={tagValidity}
                  onChange={(e) => setTagValidity(e.target.value)}
                />
                {tagValidityError && <div className="text-danger">{tagValidityError}</div>}
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleAddTag} disabled={Buttondisable}>
              Add
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Edit Tag Modal */}
        <Modal show={showEdit} onHide={handleCloseEdit}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Tag</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Tag Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter the tag name"
                  autoFocus
                  value={tagName}
                  onChange={(e) => setTagName(e.target.value)}
                />
                {tagNameError && <div className="text-danger">{tagNameError}</div>}
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Value</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter the Value"
                  autoFocus
                  value={tagValidity}
                  onChange={(e) => setTagValidity(e.target.value)}
                />
                {tagValidityError && <div className="text-danger">{tagValidityError}</div>}
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={handleCloseEdit}>
              Close
            </Button>
            <Button variant="primary" onClick={handleUpdateTag}>
              Update
            </Button>
          </Modal.Footer>
        </Modal>
      </div>

      {/* Tag Table and Pagination */}
      <div className="container" style={{ paddingLeft: '2%' }}>
        <table className="table">
          <thead>
            <tr>
              <th scope="col" style={{ background: "aliceblue", fontSize: "16px", borderRadius: "10px 0px 0px 15px" }}>S.No</th>
              <th scope="col" style={{ background: "aliceblue", fontSize: "14px" }}>Tag Name</th>
              <th scope="col" style={{ background: "aliceblue", fontSize: "14px" }}>Value</th>
              <th scope="col" style={{ background: "aliceblue", fontSize: "14px" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {taglist.map((tag, index) => (
              <tr key={index}>
             <th scope="row">{(page - 1) * 10 + index + 1}</th>
                <td>{tag.key}</td>
                <td>{tag.value}</td>
                <td>
                  <button className='btn btn-success edit-btn' onClick={() => { setEditTagId(tag._id); setTagName(tag.key); setTagValidity(tag.value); handleEdit(); }}> Edit</button>&nbsp;&nbsp;
                  <button className='btn btn-danger delete-btn' onClick={() => handleDelete(tag._id)}> Delete</button>
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
export default Tag;
