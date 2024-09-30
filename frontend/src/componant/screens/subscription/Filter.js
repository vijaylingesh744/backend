import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import "./style/style.css";

function Filter() {
    const [showModal, setShowModal] = useState(false);
    const [location, setLocation] = useState('');
    const [industry, setIndustry] = useState('');
    const [salesOptions, setSalesOptions] = useState(['Option X', 'Option Y', 'Option Z']);
    const [selectedSales, setSelectedSales] = useState('');
    const [ratingOptions, setRatingOptions] = useState(['Rating 1', 'Rating 2', 'Rating 3']);
    const [selectedRating, setSelectedRating] = useState('');
    const [sortBy, setSortBy] = useState('');
    const handleClose = () => {
        setShowModal(false);
    };
    const handleShow = () => setShowModal(true);
    const handleApplyFilters = () => {
        handleClose();
    };

    return(
        <div className='container mt-4'>
            <div className="feed_container" style={{ display: "grid" }}>
                <button type="button" className="btn btn-secondary" style={{ width: "14%", height: "94%" }} onClick={handleShow}>Filter</button>
                <Modal show={showModal} onHide={handleClose} className='modelfilter'>
                    <Modal.Header >
                        <Modal.Title>Filters</Modal.Title>
                        <button type="button" className="close" onClick={handleClose}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="location">
                                <Form.Control
                                    type="text"
                                    placeholder="Location"
                                    className="control-filter"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group controlId="industry">
                                <Form.Control
                                    type="text"
                                    placeholder="Industry"
                                    className="control-filter mt-4"
                                    value={industry}
                                    onChange={(e) => setIndustry(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group controlId="sales">
                                <Form.Control
                                    as="select"
                                    value={selectedSales}
                                    onChange={(e) => setSelectedSales(e.target.value)}
                                    className="control-filter mt-4 p-2"
                                ><option value="">Sales</option>
                                    {salesOptions.map((option) => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId="rating">
                                <Form.Control
                                    as="select"
                                    value={selectedRating}
                                    onChange={(e) => setSelectedRating(e.target.value)}
                                    className="control-filter mt-4">
                                    <option value="">Rating</option>
                                    {ratingOptions.map((option) => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId="sortBy">
                            <img src="/images/icons/up-down.png" className="filter-icon"/>
                                <Form.Control
                                    as="select"
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="control-filter mt-2"
                                >
                                    <option value="">Sort By</option>
                                    <option value="date">Date</option>
                                    <option value="name">Name</option>
                                </Form.Control>
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={handleApplyFilters} className='filter-btn mr-5'>
                            Show Results
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    );
}

export default Filter;
