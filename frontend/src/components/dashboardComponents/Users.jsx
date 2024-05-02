import { useState, useEffect } from 'react';
import axios from 'axios';
import { apiDomain } from '../../utils/utils';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { RiDeleteBin6Line, RiEditLine } from 'react-icons/ri';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [pastors, setPastors] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showEditUserModal, setShowEditUserModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null); // State to hold the selected user data
    const [showEditPastorModal, setShowEditPastorModal] = useState(false);
    const [selectedPastor, setSelectedPastor] = useState(null); 

    const [newPastorData, setNewPastorData] = useState({
        pastor: '',
        fellowship: '',
        ordination_status: 'awaiting',
        image: '',
    });

    useEffect(() => {
        fetchUsers();
        fetchPastors();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get(`${apiDomain}/account/fetch-users/`);
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users data:', error);
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

    // Function to toggle modal visibility
    const toggleModal = () => {
        setShowModal(!showModal);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${apiDomain}/account/add-pastor/`, newPastorData);
            setShowModal(false);
            fetchPastors();
        } catch (error) {
            console.error('Error adding new pastor:', error);
        }
    };


        // Function to handle delete user
        const handleDeleteUser = async (id) => {
            try {
                await axios.delete(`${apiDomain}/account/delete-user/${id}/`);
                fetchUsers();
            } catch (error) {
                console.error('Error deleting user:', error);
            }
        };
    

        const handleUpdateUser = async (updatedData) => {
            try {
                const response = await axios.post(`${apiDomain}/account/update-user/${updatedData.id}/`, updatedData);
                console.log('User updated:', response.data);
                fetchUsers();
                fetchPastors();
            } catch (error) {
                console.error('Error updating user:', error);
            }
        };

    
        // Function to handle delete pastor
        const handleDeletePastor = async (id) => {
            try {
                await axios.delete(`${apiDomain}/account/delete-pastor/${id}/`);
                fetchPastors();
            } catch (error) {
                console.error('Error deleting pastor:', error);
            }
        };

        const handleUpdatePastor = async (updatedPastorData) => {
            try {
                await axios.post(`${apiDomain}/account/update-pastor/${updatedPastorData.id}/`, updatedPastorData);
                fetchPastors();
            } catch (error) {
                console.error('Error updating pastor:', error);
            }
        };

    const toggleEditUserModal = (user) => {
        setSelectedUser(user); // Set the selected user data
        setShowEditUserModal(prevState => !prevState);
    };

    const toggleEditPastorModal = (pastor) => {
        setSelectedPastor(pastor); // Set the selected user data
        setShowEditPastorModal(prevState => !prevState);
    };

    const handleEditPastorSubmit = async (e) => {
        e.preventDefault();
        try {
            // Update the user with new data
            await handleUpdatePastor(selectedPastor);
            setShowEditPastorModal(false);
        } catch (error) {
            console.error('Error updating pastor:', error);
        }
    };


    
    const handleEditUserSubmit = async (e) => {
        e.preventDefault();
        try {
            // Update the user with new data
            await handleUpdateUser(selectedUser);
            setShowEditUserModal(false);
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    return (
        <div className="container" style={{width: "100vw" }}>

            {/* showing list of all users */} 
            <h4 className='bg-primary text-white p-2 mb-4'>All Users Info</h4>
            <table className="table table-striped">
                <thead>
                    <tr className='table-dark'>
                        <th>ID</th>
                        <th>Email</th>
                        <th>Username</th>
                        <th>Full_Name</th>
                        <th>Mobile</th>
                        <th>Gender</th>
                        <th>Age</th>
                        <th >Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td># {user.id}</td>
                            <td>{user.email}</td>
                            <td>{user.username}</td>
                            <td>{user.first_name} {user.last_name}</td>
                            <td>{user.mobile}</td>
                            <td>{user.gender}</td>
                            <td>{user.age}</td>
                            <td>
                                <button className="btn btn-danger me-2" onClick={() => handleDeleteUser(user.id)}>
                                    <RiDeleteBin6Line />
                                </button>
                                <button className="btn btn-primary" onClick={()=> toggleEditUserModal(user)}>
                                    <RiEditLine />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* showing list of pastors */}
            <h4 className='bg-primary text-white p-2 mb-4'>Pastors Info</h4>
            <table className="table table-striped-columns">
                <thead>
                    <tr className='table-dark'>
                        <th></th>
                        <th>Full_Name</th>
                        <th>Fellowship</th>
                        <th>Mobile</th>
                        <th>Ordination Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {pastors.map(pastor => (
                        <tr key={pastor.id}>
                            <td>    
                                <img src={pastor.image_url} alt={pastor.username} style={{ width: "auto", height: "100px" }} />
                            </td>
                            <td>{pastor.first_name} {pastor.last_name}</td>
                            <td>{pastor.fellowship}</td>
                            <td>{pastor.mobile}</td>
                            <td>{pastor.ordination_status}</td>
                            <td>
                                <button className="btn btn-danger me-2" onClick={() => handleDeletePastor(pastor.id)}>
                                    <RiDeleteBin6Line />
                                </button>
                                <button className="btn btn-primary" onClick={() => toggleEditPastorModal(pastor)}>
                                    <RiEditLine />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="col-md-4">
                <button className="btn btn-primary mt-4" onClick={toggleModal}>Add New Pastor</button>
            </div>

            {/* Add New Pastor modal */}
            <Modal show={showModal} onHide={toggleModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add New Pastor</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {/* Form for creating new appointment slot */}
                        <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <select id="pastor" className="form-control" value={newPastorData.pastor} onChange={(e) => setNewPastorData({ ...newPastorData, pastor: e.target.value })} required>
                                            <option value=''>Select Pastor</option>
                                            {users.map(user => (

                                                <option key={user.id} value={user.id}>{user.username}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="fellowship" className="form-label">Fellowship:</label>
                                        <input type="text" className="form-control" id="fellowship" value={newPastorData.fellowship} onChange={(e) => setNewPastorData({ ...newPastorData, fellowship: e.target.value })} required/>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="image" className="form-label">Image Link</label> 
                                        <input type="text" className="form-control" id="fellowship" value={newPastorData.image} onChange={(e) => setNewPastorData({ ...newPastorData, image: e.target.value })} required/>
                                    </div>
                                    <button type="submit" className="btn btn-primary">Submit</button>
                                </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={toggleModal}>Close</Button>
                    </Modal.Footer>
            </Modal>

            {/* Edit User Modal */}
            <Modal show={showEditUserModal && selectedUser} onHide={toggleEditUserModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                {selectedUser && (
                    <form onSubmit={handleEditUserSubmit} id="editUserForm">
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">Username</label>
                            <input type="text" className="form-control" id="username" value={selectedUser.username} onChange={(e) => setSelectedUser({ ...selectedUser, username: e.target.value })} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input type="email" className="form-control" id="email" value={selectedUser.email} onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="first_name" className="form-label">First Name</label>
                            <input type="text" className="form-control" id="first_name" value={selectedUser.first_name} onChange={(e) => setSelectedUser({ ...selectedUser, first_name: e.target.value })} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="last_name" className="form-label">Last Name</label>
                            <input type="text" className="form-control" id="last_name" value={selectedUser.last_name} onChange={(e) => setSelectedUser({ ...selectedUser, last_name: e.target.value })} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="mobile" className="form-label">Mobile</label>
                            <input type="text" className="form-control" id="mobile" value={selectedUser.mobile} onChange={(e) => setSelectedUser({ ...selectedUser, mobile: e.target.value })} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="gender" className="form-label">Gender</label>
                            <select className="form-control" id="gender" value={selectedUser.gender} onChange={(e) => setSelectedUser({ ...selectedUser, gender: e.target.value })}>
                                <option value="">Select gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="age" className="form-label">Age</label>
                            <select className="form-control" id="age" value={selectedUser.age} onChange={(e) => setSelectedUser({ ...selectedUser, age: e.target.value })}>
                                <option value="">Select Age</option>
                                <option value="0-12">0 - 12</option>
                                <option value="13-19">13 - 19</option>
                                <option value="20-35">20 - 35</option>
                                <option value="20-35">36 - 60</option>
                                <option value="20-35">Above 60</option>
                            </select>
                        </div>
                    </form>
                )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={toggleEditUserModal}>Close</Button>
                    <Button variant="primary" type="submit" form="editUserForm">Save Changes</Button>
                </Modal.Footer>
            </Modal>


            {/* Edit Pastor Modal */}
            <Modal show={showEditPastorModal && selectedPastor} onHide={toggleEditPastorModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Pastor Info</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                {selectedPastor && (
                    <form onSubmit={handleEditPastorSubmit} id="editUserForm">
                        <div className="mb-3">
                            <label htmlFor="image" className="form-label">Image Link</label>
                            <input type="text" className="form-control" id="image" value={selectedPastor.image_url} onChange={(e) => setSelectedPastor({ ...selectedPastor, image: e.target.value })} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="fellowship" className="form-label">Fellowship</label>
                            <input type="text" className="form-control" id="fellowship" value={selectedPastor.fellowship} onChange={(e) => setSelectedPastor({ ...selectedPastor, fellowship: e.target.value })} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="status" className="form-label">Ordination Status</label>
                            <select className="form-control" id="status" value={selectedPastor.ordination_status} onChange={(e) => setSelectedPastor({ ...selectedPastor, ordination_status: e.target.value })}>
                                <option value="">Select Status</option>
                                <option value="awaiting">Awaiting</option>
                                <option value="Ordained">Ordained</option>
                            </select>
                        </div>
                    </form>
                )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={toggleEditPastorModal}>Close</Button>
                    <Button variant="primary" type="submit" form="editUserForm">Save Changes</Button>
                </Modal.Footer>
            </Modal>

        </div>

    );
};

export default Users;
