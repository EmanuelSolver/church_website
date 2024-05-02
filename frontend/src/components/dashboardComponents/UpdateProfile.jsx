import { useState, useEffect } from 'react';
import api from '../../api';

const UpdateProfile = () => {
    const [userData, setUserData] = useState(null);
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        mobile: '',
        age: '',
        email: '',
        gender: '',
        password: ''
    });

    useEffect(() => {
        // Retrieve user data from localStorage
        const user = localStorage.getItem('user');
        if (user) {
            // Parse user data
            const userData = JSON.parse(user);
            setUserData(userData);
            // Set form data only if userData is available
            setFormData({
                first_name: userData.first_name,
                last_name: userData.last_name,
                mobile: userData.mobile,
                age: userData.age,
                email: userData.email,
                gender: userData.gender,
                password: ''
            });
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.patch(`update-user/${userData.id}/`, formData);
            console.log('User profile updated:', response.data);
            // Optionally, you can redirect the user to another page after successful update
        } catch (error) {
            console.error('Error updating user profile:', error);
        }
    };

    if (!userData) {
        return <div>Loading...</div>; 
    }

    return (
        <div className="container" style={{width: "80vw"}}>
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card mt-5">
                        <h5 className="card-title bg-primary text-white p-2">Update profile</h5>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="row mb-3">
                                    <div className='col-md-6'>
                                        <label htmlFor="first_name" className="form-label">First Name</label>
                                        <input type="text" className="form-control" id="first_name" name="first_name" value={formData.first_name} onChange={handleChange} />
                                    </div>
                                    <div className='col-md-6'>
                                        <label htmlFor="last_name" className="form-label">Last Name</label>
                                        <input type="text" className="form-control" id="last_name" name="last_name" value={formData.last_name} onChange={handleChange} />
                                    </div>
                                    
                                </div>

                                <div className="row mb-3">
                                    <div className='col-md-6'>
                                        <label htmlFor="mobile" className="form-label">Mobile</label>
                                        <input type="text" className="form-control" id="mobile" name="mobile" value={formData.mobile} onChange={handleChange} />
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="email" className="form-label">Email</label>
                                        <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} />
                                    </div>
                                    
                                </div>

                                <div className='row mb-3'>
                                    <div className="col-md-6">
                                        <label htmlFor="age" className="form-label">Age</label>
                                        <select className="form-select" id="age" name="age" value={formData.age} onChange={handleChange}>
                                            <option value="">Select age</option>
                                            <option value="0-12">0 - 12</option>
                                            <option value="13-19">13 - 19</option>
                                            <option value="20-35">20 - 35</option>
                                            <option value="36-60">36 - 60</option>
                                            <option value="above-60">Above 60</option>
                                        </select>
                                    </div>

                                    <div className="col-md-6">
                                        <label htmlFor="gender" className="form-label">Gender</label>
                                        <select className="form-select" id="gender" name="gender" value={formData.gender} onChange={handleChange}>
                                            <option value="">Select gender</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input type="password" className="form-control" id="password" name="password" value={formData.password} onChange={handleChange} />
                                </div>
                                <button type="submit" className="btn btn-primary">Update</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateProfile;
