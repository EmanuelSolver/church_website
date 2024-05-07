import { useState, useEffect } from 'react';
import axios from 'axios';
import { apiDomain } from '../../utils/utils';
import { useContext } from 'react';
import { Context } from '../../context/userContext/Context';
import { RiDeleteBin6Line, RiEditLine } from 'react-icons/ri';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const Departments = () => {
    const { user } = useContext(Context)
    const [showModal, setShowModal] = useState(false);
    const [departments, setDepartments] = useState([]);
    const [userId, setUserId] = useState(0);
    const [leaders, setLeaders] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        leader: '',
        description: ''
    });

        // Function to toggle modal visibility
    const toggleModal = () => {
        setShowModal(!showModal);
    };

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.role === 'Admin') {
            setIsAdmin(true);
        }else if(user){
            setUserId(user.id);
        }

        fetchDepartments();
        fetchStaffLeaders(); 
    }, []);

    const fetchDepartments = async () => {
        try {
            const response = await axios.get(`${apiDomain}/department/departments`);
            setDepartments(response.data);
        } catch (error) {
            console.error('Error fetching departments:', error);
        }
    };

    const fetchStaffLeaders = async () => {
        try {
            const response = await axios.get(`${apiDomain}/account/fetch-pastors/`);
            setLeaders(response.data);
        } catch (error) {
            console.error('Error fetching staff leaders:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${apiDomain}/department/create-department/`, formData);
            // Refresh departments after creation
            fetchDepartments()
            // const response = await axios.get(`${apiDomain}/activity/departments/`);
            // setDepartments(response.data);
            // Clear form data after submission
            setFormData({
                title: '',
                leader: '',
                description: ''
            });
        } catch (error) {
            console.error('Error creating department:', error);
        }
    };

    const handleDeleteDept = async (deptId) => {
        try {
            const response = await axios.post(`${apiDomain}/department/delete-department/${deptId}/`);
            console.log('You deleted the department:', response.data);
            fetchDepartments(); // Refresh department list after successful deletion

        } catch (error) {
            console.error('Error while deleting the department:', error);
        }
    };
    
    const handleUpdateDept = (id) => {
        // Implementation for updating a pastor
        // You can open a modal or redirect to a different page for updating
        console.log('Update department with ID:', id);
    };

    const handleJoinDepartment = async (deptId) => {
        try {
            const user_id = userId;
            const response = await axios.post(`${apiDomain}/department/join-department/${user_id}/${deptId}/`);

            console.log('Dept. joined successfully:', response.data);
        } catch (error) {
            console.error('Error joining the department:', error);
        }
    };



    return (
        <div className="container" style={{width: "100vw" }}>
            <div className="row">
                {isAdmin ? (
                    <>
                        <div className="col-md-12 mb-4">
                            <div className="card shadow">
                                <h5 className="card-title bg-primary text-white p-2">Departments</h5>
                                <div className="card-body">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th scope="col">Ministry</th>
                                                <th scope="col">Head</th>
                                                <th scope="col">Description</th>
                                                <th scope="col">Action</th>

                                            </tr>
                                        </thead>
                                        <tbody>
                                            {departments && departments.map(department => (
                                                <tr key={department.id}>
                                                    <td><strong>{department.title}</strong></td>
                                                    <td>{department.leader_name}</td>
                                                    <td>{department.description}</td>
                                                    <td>
                                                        <button className="btn btn-danger me-2" onClick={() => handleDeleteDept(department.id)}>
                                                            <RiDeleteBin6Line />
                                                        </button>
                                                        <button className="btn btn-primary" onClick={() => handleUpdateDept(department.id)}>
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
                            <button className="btn btn-primary mt-4" onClick={toggleModal}>Create Department</button>
                        </div>

                        <Modal show={showModal} onHide={toggleModal}>
                            <Modal.Header closeButton>
                                <Modal.Title>Create a department</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                            <form onSubmit={handleSubmit}>
                                                <div className="mb-3">
                                                    <label htmlFor="title" className="form-label">Title</label>
                                                    <input type="text" className="form-control" id="title" name="title" value={formData.title} onChange={handleChange} />
                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="leader" className="form-label">Leader</label>
                                                    <select className="form-control" id="leader" name="leader" value={formData.leader} onChange={handleChange}>
                                                        <option value="">Select a leader</option>
                                                        {leaders.map(leader => (
                                                            <option key={leader.id} value={leader.id}>{leader.username}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="description" className="form-label">Description</label>
                                                    <textarea className="form-control" id="description" name="description" value={formData.description} onChange={handleChange}></textarea>
                                                </div>
                                                <button type="submit" className="btn btn-primary">Create</button>
                                            </form>

                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={toggleModal}>Close</Button>
                                <Button variant="primary" type="submit" form="editUserForm">Save Changes</Button>
                            </Modal.Footer>
                        </Modal>
                    </>
                ) : (
                    <div className="col-md-12">
                        <div className="card mt-4">
                            <h5 className="card-title bg-primary text-white p-2">Departments</h5>
                            <div className="card-body">
                                <div className='row'>
                                    {departments && departments.length > 0 ? (
                                    departments.map(department => (
                                        <div key={department.id} className="col-md-6">
                                            <div className="card mt-3 shadow">
                                                <div className="card-body">
                                                    <h5><strong>{department.title}</strong></h5>
                                                    <p><b>Led by</b> {department.leader_name}</p>
                                                    <p><b>About the ministry:</b></p>
                                                    <p>{department.description}</p>
                                                    {user.departments && (
                                                        <p>
                                                            {user.departments.includes(department.title) ? (
                                                                // If user is already a member of the department
                                                                <span style={{color: "green"}}>Already a member</span>
                                                            ) : (
                                                                // If user is not a member of the department
                                                                <button className="btn btn-primary" onClick={() => handleJoinDepartment(department.id)}>Join</button>
                                                            )}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                <div className="col-12">
                                    <h6><i>No departments available, yet...</i></h6>
                                </div>
                                )}
                                </div>
                            </div>
                        </div>
                    </div>

                )}
            </div>
        </div>
    );
};

export default Departments;
