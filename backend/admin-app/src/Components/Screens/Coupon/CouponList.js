import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Swal from 'sweetalert2';
import FetchData from '../../fetch-api/Apifetch';

function CouponList({ listCoupon, fetchCoupon, paginationInfo, PreviousPage, NextPage, page, setPage }) { 
    
  const handleDelete = async (itemId) => {
    Swal.fire({
      title: "Are you sure you want to delete this?",
      showCancelButton: true,
      confirmButtonText: "Delete",
      denyButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await FetchData(`/coupon/delete/${itemId}`, 'DELETE', null, true, false);
          if (res.status) {
            fetchCoupon();
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Deleted Successfully",
              showConfirmButton: false,
              timer: 1500
            });
          }
        } catch (error) {
          console.error("Error deleting Coupon:", error.message);
        }
      }
    });
  };
  const [show, setShow] = useState(false);
  const [couponName, setCouponName] = useState('');
  const [startValidity, setStartValidity] = useState('');
  const [endValidity, setEndValidity] = useState('');
  const [couponKey, setCouponKey] = useState('');
  const [country, setCountry] = useState('');
  const [editCouponId, setEditCouponId] = useState(null);
  const [showEdit, setShowEdit] = useState(false);
  const [formErrors, setFormErrors] = useState({
    couponName: '',
    startValidity: '',
    endValidity: '',
    couponKey: '',
    country: '',
  });
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleUpdateCoupon = async () => {
    try {
      let valid = true;
      const errors = {
        couponName: '',
        startValidity: '',
        endValidity: '',
        couponKey: '',
        country: '',
      };
      if (!couponName) {
        valid = false;
        errors.couponName = 'Coupon Name is required';
      }

      if (!startValidity) {
        valid = false;
        errors.startValidity = 'Start Validity is required';
      }

      if (!endValidity) {
        valid = false;
        errors.endValidity = 'End Validity is required';
      }

      if (!couponKey) {
        valid = false;
        errors.couponKey = 'Coupon Value is required';
      }

      if (!country) {
        valid = false;
        errors.country = 'Country is required';
      }

      if (!valid) {
        // If form is not valid, set errors and return
        setFormErrors(errors);
        return;
      }
      const data = JSON.stringify({
        title: couponName,
        valid_from: startValidity,
        valid_to: endValidity,
        value: couponKey,
        country: country,
      });
      const res = await FetchData(`/coupon/update/${editCouponId}`, 'POST', data, true, false);
      if (res.status) {
        console.log("Coupon updated successfully.");
        fetchCoupon();
        handleClose();
      } else {
        console.error("Error updating coupon:", res.message);
      }
    } catch (error) {
      console.error("Error updating coupon:", error.message);
    }
    
  };
  const handleEdit = (couponId) => {
    setShowEdit(true);
    setEditCouponId(couponId);
    const editedCoupon = listCoupon.find(coupon => coupon._id === couponId);
    if (editedCoupon) {
      setCouponName(editedCoupon.title);
      setStartValidity(editedCoupon.valid_from);
      setEndValidity(editedCoupon.valid_to);
      setCouponKey(editedCoupon.value);
      setCountry(editedCoupon.country);
    }
    handleShow();
  };

  return (
    <div className="container" style={{ paddingLeft: '1%' }}>
      <table className="table">
        <thead>
          <tr>
          <th scope="col" style={{ background: "aliceblue", fontSize: "16px", borderRadius: "10px 0px 0px 15px" }}>S.No</th>
            <th scope="col" style={{ background: "aliceblue", fontSize: "16px" }}>Coupon Name</th>
            <th scope="col" style={{ background: "aliceblue", fontSize: "16px" }}>From_Valid</th>
            <th scope="col" style={{ background: "aliceblue", fontSize: "16px" }}>To_Valid</th>
            <th scope="col" style={{ background: "aliceblue", fontSize: "16px" }}>Value</th>
            <th scope="col" style={{ background: "aliceblue", fontSize: "16px" }}>Country</th>
            <th scope="col"style={{ background: "aliceblue", fontSize: "16px" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {listCoupon.map((coupon, index) => (
            <tr key={index}>
              <th scope="row">{(page - 1) * 10 + index + 1}</th>
              <td>{coupon.title}</td>
              <td>{coupon.valid_from}</td>
              <td>{coupon.valid_to}</td>
              <td>{coupon.value}</td>
              <td>{coupon.country}</td>
              <td>
                <button className='btn btn-success edit-btn' onClick={() => handleEdit(coupon._id)}> Edit</button>&nbsp;&nbsp;
                <button className='btn btn-danger delete-btn' onClick={() => handleDelete(coupon._id)}> Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Coupon</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Coupon Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter the coupon name"
                autoFocus
                value={couponName}
                onChange={(e) => setCouponName(e.target.value)}
              />
               {formErrors.couponName && <div className="text-danger">{formErrors.couponName}</div>}
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>From_Valid</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter the validity"
                autoFocus
                value={startValidity}
                onChange={(e) => setStartValidity(e.target.value)}
              />
               {formErrors.startValidity && <div className="text-danger">{formErrors.startValidity}</div>}
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>To_Valid</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter the validity"
                autoFocus
                value={endValidity}
                onChange={(e) => setEndValidity(e.target.value)}
              />
               {formErrors.endValidity && <div className="text-danger">{formErrors.endValidity}</div>}
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Coupon Key</Form.Label>
              <Form.Control
                type="text"
                autoFocus
                value={couponKey}
                onChange={(e) => setCouponKey(e.target.value)}
              />
               {formErrors.couponKey && <div className="text-danger">{formErrors.couponKey}</div>}
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Country</Form.Label>
              <Form.Control
                type="text"
                autoFocus
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
               {formErrors.country && <div className="text-danger">{formErrors.country}</div>}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdateCoupon}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
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
export default CouponList;
