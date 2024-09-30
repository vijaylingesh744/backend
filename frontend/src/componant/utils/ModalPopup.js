import React from 'react'
import { Modal } from 'react-bootstrap'

const ModalPopup = ({children, setShowModal,showModal}) => {
  return (
    <>
    <Modal show={showModal} onHide={() => setShowModal(false)} className="modelfilter mode mx-auto" size='mdsm'>
     <Modal.Body>
        {children}
    </Modal.Body>   
    </Modal>
    </>
  )
}

export default ModalPopup
