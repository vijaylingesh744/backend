import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FetchData from '../../fetch-api/Apifetch';

function EditGICTCModal({ show, handleClose, fetchGICTC, editSubId, EditForm }) {
  const User = JSON.parse(localStorage.getItem("User"))
  const [formdata, setFormdata] = useState(EditForm);
  const handleUpdateGICTC = async () => {
    try {
      const data = JSON.stringify(formdata);
      const res = await FetchData(`/update/code/${editSubId}`, 'POST', data, true, false);
      if (res.success) {
        fetchGICTC();
        handleClose();
      }else{
        console.error("Error updating GICTC:", res.message);
      }
    } catch (error) {
      console.error("Error updating GICTC:", error.message);
    }
  };

  const HandleChanger = (e) => {
    const { name, value } = e.target
    setFormdata({ ...formdata, [name]: value })
  }
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit GICTC</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Enter Code</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter the GICTC code"
              autoFocus
              name="code"
              value={formdata.code}
              onChange={HandleChanger}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleUpdateGICTC}>
          Update
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditGICTCModal;
