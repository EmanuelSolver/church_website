import { useState, useEffect } from 'react';
import axios from 'axios';
import { apiDomain } from '../../utils/utils';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { RiDeleteBin6Line, RiEditLine } from 'react-icons/ri';
import { formatDate, formatTime } from '../../utils/constantFunctions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateEvents = () => {
    const [showEditEventModal, setShowEditEventModal] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null); 
    const [showExternalFormModal, setShowExternalFormModal] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [events, setEvents] = useState([]);
    const [externalForms, setExternalForms] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        day: '',
        time: '',
        venue: ''
    });
    


    useEffect(() => {
        fetchEvents();
        fetchExternalForms();
    }, []); // Fetch events on component mount

    const fetchEvents = async () => {
        try {
            const response = await axios.get(`${apiDomain}/event/events/`);
            setEvents(response.data);
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    };

    const fetchExternalForms = async () => {
        try {
            const response = await axios.get(`${apiDomain}/event/external-forms/`);
            setExternalForms(response.data);
        } catch (error) {
            console.error('Error fetching external forms:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleDeleteEvent = async (eventId) => {
        try {
            const response = await axios.post(`${apiDomain}/event/delete-event/${eventId}/`);

            toast.success('Event deleted: ', response.data);
            fetchEvents(); // Refresh slots list after successful deletion
        } catch (error) {
            toast.error('Error deleting the event. Please try again later.');
            console.error('Error deleting the event:', error);
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${apiDomain}/event/create-event/`, formData);
            // Reset form fields after successful submission
            setFormData({
                title: '',
                day: '',
                time: '',
                venue: ''
            });
            toast.success('Event created successfully!');
            // Refetch events to update the list
            fetchEvents();
            toggleModal(); // Close the modal after successful submission
        } catch (error) {
            console.error('Error creating event:', error);
            toast.error('Failed to post article. Please try again later.');

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
    const toggleExternalFormModal = () => {
        setShowExternalFormModal(!showExternalFormModal);
    };

    const handleUpdateEvent = async (updatedData) => {
        try {
            const response = await axios.post(`${apiDomain}/event/update-event/${updatedData.id}/`, updatedData);
            console.log('Event updated:', response.data);
            toast.success('Event updated successfully!');
            fetchEvents();
        } catch (error) {
            toast.error('Error updating event. Please try again later.');
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

    const handleUploadLinkSubmit = async (e) => {
        e.preventDefault();
        const title = document.getElementById('title').value;
        const form_link = document.getElementById('form').value;
        const deadline = document.getElementById('deadline').value;

        try {
            await axios.post(`${apiDomain}/event/upload-external-form/`, { title, form_link, deadline });
            toast.success('External form uploaded successfully!');
            fetchExternalForms();
            toggleExternalFormModal();
        } catch (error) {
            console.error('Error uploading external form:', error);
            toast.error('Failed to upload external form. Please try again later.');
        }
    }

    const handleDeleteForm = async (formId) => {
        try {
            const response = await axios.post(`${apiDomain}/event/delete-external-form/${formId}/`);

            toast.success('Form Registration deleted: ', response.data);
            fetchExternalForms(); // Refresh slots list after successful deletion
        } catch (error) {
            toast.error('Error deleting the external registration form. Please try again later.');
            console.error('Error deleting the external form:', error);
        }
    };

    return (
        <div className="container" style={{width: "100vw"}}>
            <ToastContainer />

            <div className="row">
                {/* here is a list of events in a table */}
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

                {/* here is a list of external forms in a table */}
                <div className="col-md-12 mb-4">
                    <div className="card shadow">
                        <h5 className="card-title bg-primary text-white p-2 mb-3">Event Registration Forms</h5>
                        <div className="card-body">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Event</th>
                                        <th scope="col">Link</th>
                                        <th scope="col">Registration Deadline</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {externalForms && 
                                    externalForms.map(form => (
                                        <tr key={form.id}>
                                            <td><strong>{form.title}</strong></td>
                                            <td>{form.form_link}</td>
                                            <td>{formatDate(form.deadline)}</td>
                                            <td>
                                                <button className="btn btn-danger me-2" onClick={() => handleDeleteForm(form.id)}>
                                                    <RiDeleteBin6Line />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>


                

                <div className="row">
                    <div className="col-md-6">
                        <button className="btn btn-primary mt-4" onClick={toggleModal}>Create New Event</button>
                    </div>
                    <div className="col-md-6">
                        <button className="btn btn-primary mt-4" onClick={toggleExternalFormModal}>Upload External-Form</button>
                    </div>
                </div>


                {/* create new event modal */}
                <Modal show={showModal} onHide={toggleModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Create Event</Modal.Title>
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
                        <Modal.Title>Edit Event</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    {selectedEvent && (
                        <form onSubmit={handleEditEventSubmit}>
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
                            <button type="submit" className="btn btn-primary">Save Changes</button>
                        </form>
                    )}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={toggleEditEventModal}>Close</Button>
                    </Modal.Footer>
                </Modal>



                {/*create upload external-form modal */}
                <Modal show={showExternalFormModal} onHide={toggleExternalFormModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Upload External-Form</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={handleUploadLinkSubmit}>
                            <div className="mb-3">
                                <p><i>Create a google, microsoft or any other third-party form and upload its link here</i></p>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="title" className="form-label">Title</label>
                                <input type="text" className="form-control" id="title" name="title" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="form" className="form-label">Form link</label>
                                <input type="text" className="form-control" id="form" name="form_link" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="deadline" className="form-label">Deadline</label>
                                <input type="date" className="form-control" id="deadline" name="deadline" />
                            </div>
                            <button type="submit" className="btn btn-primary">Upload</button>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={toggleExternalFormModal}>Close</Button>
                    </Modal.Footer>
                </Modal>

            </div>
        </div>
    );
};

export default CreateEvents;
