import { useContext } from 'react';
import { Context } from '../../context/userContext/Context';

const Profile = () => {
    const { user } = useContext(Context)

    return (
        <div className="container" style={{width: "80vw"}}>
            <div className="">
                    <h3 className="mt-4 mb-3 text-center" style={{ background: 'linear-gradient(to right, rgba(0, 0, 255, 0.879) 0%, rgba(255, 255, 255, 0) 50%, rgba(0, 0, 255, 0.879) 100%)'}}>Christian Fellowship Foundation</h3>
            </div>
            {user && (
                <div className="row">
                    <div className="col-md-6 mb-4">
                        <div className="card shadow">
                            <h5 className="card-title bg-primary text-white p-2 mb-4">Welcome, {user.first_name}</h5>
                            <div className="card-body">
                                <p className=""><i>We are glad to have you here...</i></p>
                                <p className="card-text"><b>Username:</b> {user.username}</p>
                                <p className="card-text"><b>Role:</b> Church {user.role}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="row">
                            <div className="col-md-12 mb-4">
                                <div className="card shadow">
                                    <h5 className="card-title bg-primary text-white p-2 mb-4">Contact Info</h5>
                                    <div className="card-body">
                                        <p className="card-text"><b>Full Name:</b> {user.first_name} {user.last_name}</p>
                                        <p className="card-text"><b>Email:</b> {user.email}</p>
                                        <p className="card-text"><b>Mobile No:</b> {user.mobile}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="card shadow">
                                    <h5 className="card-title bg-primary text-white p-2 mb-4">More Info</h5>
                                    <div className="card-body">
                                    <div>
                                    <h6><b>Your Departments:</b></h6>
                                    <ol>
                                        {user.departments.length > 0 ?( 
                                            user.departments.map((department, index) => (
                                            <li key={index}>{department}</li>
                                        ))
                                    ): <h6><i>No Department joined yet!</i></h6>
                                    }
                                    </ol>
                                </div>                                        
                                <p className="card-text"><b>Gender:</b> {user.gender}</p>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profile;
