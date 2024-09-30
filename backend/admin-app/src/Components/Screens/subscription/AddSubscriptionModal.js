import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FetchData from '../../fetch-api/Apifetch';

function AddSubscriptionModal({ show, handleClose, fetchSubscription }) {
  const User = JSON.parse(localStorage.getItem("User"))
  const [formdata, setFormdata] = useState({
    title: "",
    price: "",
    description: "",
    validity_month: ""
});
  
  const [Buttondisable , setButtondisable] = useState(false);

  const handleAddSubscription = async () => {
    try {
      setButtondisable(true);
      const data = JSON.stringify({...formdata,["admin_id"]:User._id});
      const res = await FetchData("subscription", 'POST', data, true, false);
      if (res.status) {
        fetchSubscription();
        console.log("Subscription added successfully.");
        handleClose();
      } else {
        console.error("Error adding subscription:", res.message);
      }
    } catch (error) {
      console.error("Error adding subscription:", error.message);
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
        <Modal.Title>Add Subscription</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter the title"
              autoFocus
              name="title"
              value={formdata.title}
              onChange={HandleChanger}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter the validity"
              name="price"
              value={formdata.price}
              onChange={HandleChanger}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
            <Form.Label>Validity (Month)</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter the No of Months"
              name="validity_month"
              value={formdata.validity_month}
              onChange={HandleChanger}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
            <Form.Label>Description</Form.Label>
            <textarea
            className='form-control'
            name="description"
            value={formdata.description}
            onChange={HandleChanger}
            >
            </textarea>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleAddSubscription} disabled={Buttondisable} >
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddSubscriptionModal;
