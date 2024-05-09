import axios from 'axios';
import { useState, useEffect } from 'react';
import { apiDomain } from '../../utils/utils';
import { formatDate,formatTime } from '../../utils/constantFunctions';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Appointment = () => {
    const [showModal, setShowModal] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isStaff, setIsStaff] = useState(false);
    const [formData, setFormData] = useState({
        pastor: '',
        day: '',
        start_time: '',
        end_time: '',
    });
    const [slots, setSlots] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [pastors, setPastors] = useState([]);
    const [bookReason, setBookReason] = useState('');
    const [member, setMember] = useState();
    const [pastorId, setPastorId] = useState(0);


    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.role == 'Admin') {
            setIsAdmin(true);
        }
        else if (user && user.role == 'Staff') {
            setIsStaff(true);
            setPastorId(user.id);
        }else{
            console.log(null)
        }

        setMember(user.id);
        fetchPastors();
        fetchSlots();
        fetchAppointments();
    }, []);

    const fetchSlots = async () => {
        try {
            const response = await axios.get(`${apiDomain}/appointment/appointment-slots/`);
            setSlots(response.data);
        } catch (error) {
            console.error('Error fetching slots:', error);
        }
    };

    const fetchAppointments = async () => {
        try {
            const response = await axios.get(`${apiDomain}/appointment/appointments/`);
            setAppointments(response.data);
        } catch (error) {
            console.error('Error fetching appointments:', error);
        }
    };

    const fetchPastors = async () => {
        try {
            const response = await axios.get(`${apiDomain}/account/fetch-pastors/`);
            setPastors(response.data);
        } catch (error) {
            console.error('Error fetching pastors:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'pastor') {
            // Convert the selected pastor's ID to a number
            const pastorId = parseInt(value);
            setFormData({ ...formData, pastor: pastorId }); // Update pastor ID in the form data
        } else {
            // Handle other form inputs
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleBookSlot = async (slotId) => {
        try {
            const bookingData = new FormData();
            bookingData.append('slotId', slotId);
            bookingData.append('member', member);
            bookingData.append('reason', bookReason);
    
            await axios.post(`${apiDomain}/appointment/book-slot/`, bookingData);
            toast.success('Ticket booked successfully!');
            fetchSlots(); // Refresh slots list after successful booking
        } catch (error) {
            toast.error('Error booking slot', error);
            console.error('Error booking slot:', error);
        }
    };
    
    const handleApproveSlot = async (slotId) => {
        try {
            await axios.post(`${apiDomain}/appointment/approve-slot/${slotId}/`);
            toast.success('Appointment approved successfully!')
            fetchSlots(); 
        } catch (error) {
            toast.error('Error approving slot', error);
            console.error('Error approving slot:', error);
        }
    };

    const handleDeleteSlot = async (slotId) => {
        try {
            const response = await axios.post(`${apiDomain}/appointment/delete-slot/${slotId}/`);
            console.log('Slot deleted:', response.data);
            toast.success('Slot deleted successfully!')
            fetchSlots(); // Refresh slots list after successful deletion
        } catch (error) {
            toast.error('Error deleting slot', error);
            console.error('Error deleting the slot:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${apiDomain}/appointment/create-slot/`, formData);

            toast.success('Appointment Ticket created successfully!');           
            setFormData({
                pastor: '',
                day: '',
                start_time: '',
                end_time: '',
            });
            fetchSlots();
            toggleModal(false);
        } catch (error) {
            if (error.response && error.response.status === 400) {
                // Handle validation errors
                toast.error('Validation error: Please check your input and try again.');
            } else {
                console.error('Error creating appointment slot:', error);
                toast.error('Failed to create appointment slot. Please try again later.');
            }
        }
    };

    // Function to toggle modal visibility
    const toggleModal = () => {
        setShowModal(!showModal);
    };

    return (
        <div className="container" style={{width: "100vw"}}>
            <ToastContainer />

            <div className="row">
                {/* Display appointments to staff only */}
                <div className={(isStaff && !isAdmin) ? "col-md-12" : "col-md-8"}>
                    {(isStaff && !isAdmin) && (<>
                        <div className="card mt-4">
                            <h5 className="card-title bg-primary text-white p-2">Booked Appointments</h5>
                            <div className="card-body">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Booked_by</th>
                                            <th>Day</th>
                                            <th>Time</th>
                                            <th>Reason</th>
                                            <th>Status</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {appointments.filter(appointment => pastorId == appointment.pastor_id).length > 0 ? (
                                            appointments.map(appointment => (
                                                (pastorId == appointment.pastor_id) &&
                                                <tr key={appointment.id}>
                                                    <td>{appointment.member_username}</td>
                                                    <td>{formatDate(appointment.slot_day)}</td>
                                                    <td>{formatTime(appointment.slot_startTime)} - {formatTime(appointment.slot_endTime)}</td>
                                                    <td>{appointment.reason}</td>
                                                    <td>{appointment.slot_status}</td>
                                                    <td><button className="btn btn-primary" onClick={() => handleApproveSlot(appointment.slot_id)}>Approve</button></td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="7">No appointments yet</td>
                                            </tr>
                                        )}
                                    </tbody>

                                </table>
                            </div>

                        </div>
                        <div className="col-md-4">
                            <button className="btn btn-primary mt-4" onClick={toggleModal}>Create New Slot</button>
                        </div>
                        </>
                    )}

                </div>


                {/* Display all slots available to non-admin users */}
                {!isAdmin && (
                    <div className="col-md-12">
                        <div className="card mt-4">
                            <h5 className="card-title bg-primary text-white p-2">Available Slots</h5>

                            <div className="card-body">
                                <div className="row">
                                    {slots && slots.length > 0 ?(
                                    slots.map(slot => (
                                        <div key={slot.id} className="col-md-4">
                                            <div className="card mt-3 shadow">
                                                <div className="card-body">
                                                    <div className="position-relative">
                                                        <span className="badge bg-secondary position-absolute top-0 end-0">{slot.status}</span>
                                                    </div>
                                                    <h5 className="card-title">Meet {slot.pastor_name}</h5>
                                                    <p className="card-text">Day: {formatDate(slot.day)}</p>
                                                    <p className="card-text">Starts at: {formatTime(slot.start_time)}</p>
                                                    <p className="card-text">Ends at: {formatTime(slot.end_time)}</p>
                                                    {!isAdmin && slot.status === 'New' && (
                                                        <div className="mb-3">
                                                            <input type="text" style={{marginBottom:"20px"}} className="form-control card-text" placeholder="Type reason for appointment..." value={bookReason} onChange={(e) => setBookReason(e.target.value)} />
                                                            <button className="btn btn-primary" onClick={() => handleBookSlot(slot.id)}>Book</button>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ):(
                                    <div className="col-12">
                                        <h6><i>No appointment tickets available, yet...</i></h6>
                                    </div>
                                )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}


                {/* Modal component */}
                <Modal show={showModal} onHide={toggleModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Create Appointment Slot</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {/* Form for creating new appointment slot */}
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="pastor" className="form-label">Select Pastor</label>
                                <select className="form-select" id="pastor" name="pastor" value={formData.pastor} onChange={handleChange} required>
                                    <option value="">Select Pastor</option>
                                    {pastors.map(pastor => (
                                        <option key={pastor.id} value={pastor.id}> {pastor.username} </option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="day" className="form-label">Select Day</label>
                                <input type="date" className="form-control" id="day" name="day" value={formData.day} onChange={handleChange} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="start_time" className="form-label">Start Time</label>
                                <input type="time" className="form-control" id="start_time" name="start_time" value={formData.start_time} onChange={handleChange} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="end_time" className="form-label">End Time</label>
                                <input type="time" className="form-control" id="end_time" name="end_time" value={formData.end_time} onChange={handleChange} required />
                            </div>
                            <button type="submit" className="btn btn-primary">Create Slot</button>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={toggleModal}>Close</Button>
                    </Modal.Footer>
                </Modal>


                {/* Display all slots created to Admins only*/}
                {isAdmin && (<>
                    <div className='row'>
                        <div className="col-md-12">
                            <div className="card mt-4">
                                <h5 className="card-title bg-primary text-white p-2">Created Slots</h5>
                                <div className="card-body">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>Meet_with</th>
                                                <th>Day</th>
                                                <th>Time</th>
                                                <th>Status</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {slots.map(slot => (
                                                <tr key={slot.id}>
                                                    <td>{slot.pastor_name}</td>
                                                    <td>{formatDate(slot.day)}</td>
                                                    <td>{formatTime(slot.start_time)} - {formatTime(slot.end_time)}</td>
                                                    <td>{slot.status}</td>
                                                    <td><button className="btn btn-danger" onClick={() => handleDeleteSlot(slot.id)}>Delete</button></td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                </div>
                <div className="col-md-4">
                    <button className="btn btn-primary mt-4" onClick={toggleModal}>Create New Slot</button>
                </div>
                </>
                )}
            </div>
        </div>
    );
};


export default Appointment;
