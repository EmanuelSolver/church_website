import { useState, useEffect } from 'react';
import axios from 'axios';
import { apiDomain } from '../../utils/utils';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { RiDeleteBin6Line, RiEditLine } from 'react-icons/ri';
import { formatDate, formatTime } from '../../utils/constantFunctions';

const CreateEvents = () => {
    const [showEditEventModal, setShowEditEventModal] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null); 


    const [formData, setFormData] = useState({
        title: '',
        day: '',
        time: '',
        venue: ''
    });
    const [showModal, setShowModal] = useState(false);

    const [events, setEvents] = useState([]);

    useEffect(() => {
        fetchEvents();
    }, []); // Fetch events on component mount

    const fetchEvents = async () => {
        try {
            const response = await axios.get(`${apiDomain}/activity/events/`);
            setEvents(response.data);
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleDeleteEvent = async (eventId) => {
        try {
            const response = await axios.post(`${apiDomain}/activity/delete-event/${eventId}/`);
            console.log('Event deleted:', response.data);
            fetchEvents(); // Refresh slots list after successful deletion
        } catch (error) {
            console.error('Error deleting the event:', error);
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${apiDomain}/activity/create-event/`, formData);
            // Reset form fields after successful submission
            setFormData({
                title: '',
                day: '',
                time: '',
                venue: ''
            });
            // Refetch events to update the list
            fetchEvents();
        } catch (error) {
            console.error('Error creating event:', error);
        }
    };

    // Function to toggle modal visibility
    const toggleModal = () => {
        setShowModal(!showModal);
    };

    const toggleEditEventModal = (event) => {
        setSelectedEvent(event); // Set the selected user data
        setShowEditEventModal(prevState => !prevState);
    };

    const handleUpdateEvent = async (updatedData) => {
        try {
            const response = await axios.post(`${apiDomain}/activity/update-event/${updatedData.id}/`, updatedData);
            console.log('Event updated:', response.data);
            fetchEvents();
        } catch (error) {
            console.error('Error updating event:', error);
        }
    };

    const handleEditEventSubmit = async (e) => {
        e.preventDefault();
        try {
            // Update the user with new data
            await handleUpdateEvent(selectedEvent);
            setShowEditEventModal(false);
        } catch (error) {
            console.error('Error updating event:', error);
        }
    };



    return (
        <div className="container" style={{width: "100%"}}>
            <div className="row">
                <div className="col-md-12 mb-4">
                    <div className="card shadow">
                        <h5 className="card-title bg-primary text-white p-2 mb-3">Events</h5>
                        <div className="card-body">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Event</th>
                                        <th scope="col">Day</th>
                                        <th scope="col">Time</th>
                                        <th scope="col">Venue</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {events.map(event => (
                                        <tr key={event.id}>
                                            <td><strong>{event.title}</strong></td>
                                            <td>{formatDate(event.day)}</td>
                                            <td>{formatTime(event.time)}</td>
                                            <td>{event.venue}</td>
                                            <td>
                                                <button className="btn btn-danger me-2" onClick={() => handleDeleteEvent(event.id)}>
                                                    <RiDeleteBin6Line />
                                                </button>
                                                <button className="btn btn-primary" onClick={() => toggleEditEventModal(event)}>
                                                    <RiEditLine />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                        <button className="btn btn-primary mt-4" onClick={toggleModal}>Create New Event</button>
                </div>

                {/* create new event modal */}
                <Modal show={showModal} onHide={toggleModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Create Appointment Slot</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="title" name="title" value={formData.title} onChange={handleChange} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="day" className="form-label">Day</label>
                                    <input type="date" className="form-control" id="day" name="day" value={formData.day} onChange={handleChange} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="time" className="form-label">Time</label>
                                    <input type="time" className="form-control" id="time" name="time" value={formData.time} onChange={handleChange} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="venue" className="form-label">Venue</label>
                                    <input type="text" className="form-control" id="venue" name="venue" value={formData.venue} onChange={handleChange} required />
                                </div>
                                <button type="submit" className="btn btn-primary">Create Event</button>
                        </form>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={toggleModal}>Close</Button>
                    </Modal.Footer>
                </Modal>

                {/* edit event modal */}
                <Modal show={showEditEventModal && selectedEvent} onHide={toggleEditEventModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit User</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    {selectedEvent && (
                        <form onSubmit={handleEditEventSubmit} id="editUserForm">
                            <div className="mb-3">
                                <label htmlFor="title" className="form-label">Title</label>
                                <input type="text" className="form-control" id="username" value={selectedEvent.title} onChange={(e) => setSelectedEvent({ ...selectedEvent, title: e.target.value })} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="day" className="form-label">Date</label>
                                <input type="date" className="form-control" id="day" value={selectedEvent.day} onChange={(e) => setSelectedEvent({ ...selectedEvent, day: e.target.value })} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="time" className="form-label">Time</label> 
                                <input type="time" className="form-control" id="time" value={selectedEvent.time} onChange={(e) => setSelectedEvent({ ...selectedEvent, time: e.target.value })} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="venue" className="form-label">Venue</label> 
                                <input type="text" className="form-control" id="venue" value={selectedEvent.venue} onChange={(e) => setSelectedEvent({ ...selectedEvent, venue: e.target.value })} />
                            </div>

                        </form>
                    )}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={toggleEditEventModal}>Close</Button>
                        <Button variant="primary" type="submit" form="editUserForm">Save Changes</Button>
                    </Modal.Footer>
                </Modal>


            </div>
        </div>
    );
};

export default CreateEvents;
