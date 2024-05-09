import { useState, useEffect } from 'react';
import axios from 'axios';
import { apiDomain } from '../../utils/utils';
import { formatDate, formatTime } from '../../utils/constantFunctions';
import Modal from 'react-bootstrap/Modal';

const Notifications = () => {
    const [notifications, setNotifications] = useState([]);
    const [registrationForms, setRegistrationForms] = useState([]);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        fetchNotifications();
        fetchEventRegistrationForms();
    }, []);

    const fetchNotifications = async () => {
        try {
            const response = await axios.get(`${apiDomain}/event/events/`);
            setNotifications(response.data);
        } catch (error) {
            console.error('Error fetching notifications:', error);
        }
    };

    const fetchEventRegistrationForms = async () => {
        try {
            const response = await axios.get(`${apiDomain}/event/external-forms/`);
            const filteredForms = response.data.filter(form => new Date(form.deadline) >= new Date());
            console.log(filteredForms)
            setRegistrationForms(filteredForms);
        } catch (error) {
            console.error('Error fetching events registration forms:', error);
        }
    };

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    return (
        <div className="container" style={{ width: "80vw" }}>
            <h3 className="text-center" style={{ background: 'linear-gradient(to right, rgba(0, 0, 255, 0.879) 0%, rgba(255, 255, 255, 0) 50%, rgba(0, 0, 255, 0.879) 100%)' }}>Church Events</h3>

            <div className="row">
                {notifications && notifications.length > 0 ? (
                    notifications.map(event => (
                        <div key={event.id} className="col-lg-6 col-xl-4 mb-4">
                            <div className="card">
                                <div className="card-header bg-primary text-white">
                                    <strong>{event.title}</strong>
                                </div>
                                <div className="card-body">
                                    <p className="card-text"><b>Date:</b> {formatDate(event.day)}</p>
                                    <p className="card-text"><b>Time:</b> {formatTime(event.time)}</p>
                                    <p className="card-text"><b>Venue:</b> {event.venue}</p>
                                </div>
                                <div className="card-footer bg-light">
                                    <button className="btn btn-primary">RSVP</button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-12">
                        <h6><i>No Upcoming Events available, yet...</i></h6>
                    </div>
                )}

                {
                registrationForms.length > 0 && 
                    <div className='col-md-12'>
                        <button className='btn btn-primary' onClick={toggleModal}>Register for Upcoming events</button>
                    </div> 
                }

                <Modal show={showModal} onHide={toggleModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Select Event to Register for</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className='table-responsive'>
                            <table className='table'>
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Deadline for Reg</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {registrationForms.map(form => (
                                        <tr key={form.id}>
                                            <td>{form.title}</td>
                                            <td>{formatDate(form.deadline)}</td>
                                            <td><button className='btn btn-primary'><a href={form.form_link} className='text-white'>Register</a></button></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <button className='btn btn-secondary' onClick={toggleModal}>Close</button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    );
};

export default Notifications;
