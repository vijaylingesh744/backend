import React from 'react'
import { Modal } from 'react-bootstrap'

const AlertModal = ({ icon, title, desc, submitText, submitAction, setShowModal, showModal }) => {
    return (
        <>
            <Modal show={showModal} onHide={() => setShowModal(false)} className="modelfilter mode mx-auto" size='mdsm'>
                <Modal.Body>
                    <div className='container-fluid d-flex flex-column align-items-center justify-content-center'>
                        <div className='w-100 d-flex justify-content-end'>
                            <i onClick={() => setShowModal(false)} class="fa fa-times fontsubtitle" aria-hidden="true"></i>
                        </div>
                        <img src={icon} style={{ width: '60px', height: '60px', border: "none", borderRadius: '50%' }} />
                        <h3 className="fontmdtitle text-dark1 mt-3">{title}</h3>
                        <span className="fontsubtitle text-dark1 mt-1">{desc}</span>
                        <div className="mt-3 d-flex justify-content-center column-gap-3">
                            <button className="fontsubtitle btn btn-outline-danger rounded-pill px-3 py-1" onClick={() => setShowModal(false)}>Cancel</button>
                            <button className="fontsubtitle btn btn-connect1 rounded-pill px-3 py-1" onClick={() => {
                                submitAction();
                                setShowModal(false);
                            }}>{submitText}</button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default AlertModal
