import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FetchData from '../../fetch-api/Apifetch';

function AddCouponModal({ fetchCoupon }) {
  const [show, setShow] = useState(false);
  const [couponName, setCouponName] = useState('');
  const [startValidity, setStartValidity] = useState('');
  const [endValidity, setEndValidity] = useState('');
  const [couponKey, setCouponKey] = useState('');
  const [country, setCountry] = useState('');
  const [Buttondisable , setButtondisable] = useState(false);
  const [formErrors, setFormErrors] = useState({
    couponName: '',
    startValidity: '',
    endValidity: '',
    couponKey: '',
    country: '',
  });

  const handleShow = () => setShow(true);
  const handleClose = () => {
    setShow(false);
    // Reset form errors when modal closes
    setFormErrors({
      couponName: '',
      startValidity: '',
      endValidity: '',
      couponKey: '',
      country: '',
    });
  };

  const handleAddCoupon = async () => {
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
      setButtondisable(true);

      const data = JSON.stringify({
        title: couponName,
        valid_from: startValidity,
        valid_to: endValidity,
        value: couponKey,
        country: country,
      });
      const res = await FetchData("coupon", 'POST', data, true, false);
      if (res.status) {
        fetchCoupon();
        console.log("Coupon added successfully.");
        handleClose();
      } else {
        console.error("Error adding coupon:", res.message);
      }
    } catch (error) {
      console.error("Error adding coupon:", error.message);
    }
    finally {
      setButtondisable(false); 
    }
  };

  return (
    <>
      <Button variant="primary" style={{ float: 'right' }} className='mb-2' onClick={handleShow}>
        Add Coupon
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Coupon</Modal.Title>
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
                placeholder="Enter the validity Start"
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
                placeholder="Enter the validity end"
                autoFocus
                value={endValidity}
                onChange={(e) => setEndValidity(e.target.value)}
              />
              {formErrors.endValidity && <div className="text-danger">{formErrors.endValidity}</div>}
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Coupon Value</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter the coupon value"
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
                placeholder="Enter the country"
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
          <Button variant="primary" onClick={handleAddCoupon}disabled={Buttondisable}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddCouponModal;
