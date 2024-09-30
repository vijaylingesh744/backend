import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FetchData from '../../fetch-api/Apifetch';

function AddGICTCModal({ show, handleClose, fetchGICTC }) {
  const User = JSON.parse(localStorage.getItem("User"))
  const [formdata, setFormdata] = useState({
    code: "",
    user_id:""
});
  
  const [Buttondisable , setButtondisable] = useState(false);

  const handleAddGICTC = async () => {
    try {
      setButtondisable(true);
      const data = JSON.stringify({...formdata,["user_id"]:User._id});
      const res = await FetchData("add/code", 'POST', data, true, false);
      if (res.success){
        fetchGICTC();
        console.log("GICTC added successfully.");
        handleClose();
      } else {
        console.error("Error adding GICTC:", res.message);
      }
    } catch (error) {
      console.error("Error adding GICTC:", error.message);
    }
    finally {
      setButtondisable(false); 
    }
  };


  const HandleChanger = (e)=>{
const {name,value}=e.target
// console.log(e.target)
setFormdata({...formdata,[name]:value})
  }
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add GICTC</Modal.Title>
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
        <Button variant="primary" onClick={handleAddGICTC} disabled={Buttondisable} >
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddGICTCModal;
