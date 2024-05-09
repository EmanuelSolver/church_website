import { useState, useContext } from "react";
import { useFormik } from "formik";
import api from "../api";
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../utils/utils";
import LoadingIndicator from "./LoadingIndicator";
import video from '../images/bg-video.mp4'
import validationSchema from '../utils/validationSchema'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Context } from "../context/userContext/Context";

const Form = ({ route, method }) => {
    const { dispatch } = useContext(Context);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const name = method === "login" ? "Login" : "Register";

    const formik = useFormik({
        initialValues: {
            email: "",
            username: "",
            first_name: "",
            last_name: "",
            mobile: "",
            gender: "",
            age: "",
            password: ""
        },
        validationSchema: method === "register" ? validationSchema : null,

        onSubmit: async (values) => {
            setLoading(true);
            try {
                const res = await api.post(route, values);
                if (method === "login") {
                    localStorage.setItem(ACCESS_TOKEN, res.data.access);
                    localStorage.setItem(REFRESH_TOKEN, res.data.refresh);

                    dispatch({type: "LOGIN_SUCCESS", payload: res.data});
                    toast.success("Login successful!");
                    navigate("/dashboard");
                    
                } else {
                    navigate("/signin");
                }
            } catch (error) {
                toast.error("Failed to register. Please try again later.");
                toast.error(error.response.data.error);
            } finally {
                setLoading(false);
            }
        },
    });

    return (
        <section
            className="main-content d-flex flex-column justify-content-center align-items-center position-relative"
            style={{
                height: 800,
            }}>
            {/* Video background */}
            <video
                className="position-absolute top-0 start-0 w-100 h-100"
                src={video}
                autoPlay
                loop
                muted
                playsInline
                style={{
                    objectFit: 'cover',
                }}>
            </video>

            <div className="container">
                <ToastContainer />

                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card mt-5">
                            <div className="card-body">
                                <h2 className="card-title text-center">{name}</h2>

                                <form onSubmit={formik.handleSubmit} className="form-container">
                                    {method === "register" &&
                                        <>
                                            <div className="row mb-3">
                                                <div className="col-md-6">
                                                    <label htmlFor="email" className="form-label">Email:</label>
                                                    <input type="email" className="form-control" id="email" name="email" value={formik.values.email} onChange={formik.handleChange} />
                                                    {formik.errors.email && <div className="text-danger">{formik.errors.email}</div>}
                                                </div>
                                                <div className="col-md-6">
                                                    <label htmlFor="username" className="form-label">Username:</label>
                                                    <input type="text" className="form-control" id="username" name="username" value={formik.values.username} onChange={formik.handleChange} />
                                                    {formik.errors.username && <div className="text-danger">{formik.errors.username}</div>}
                                                </div>
                                            </div>
                                            <div className="row mb-3">
                                                <div className="col-md-6">
                                                    <label htmlFor="first_name" className="form-label">First Name:</label>
                                                    <input type="text" className="form-control" id="first_name" name="first_name" value={formik.values.first_name} onChange={formik.handleChange} />
                                                    {formik.errors.first_name && <div className="text-danger">{formik.errors.first_name}</div>}
                                                </div>
                                                <div className="col-md-6">
                                                    <label htmlFor="last_name" className="form-label">Last Name:</label>
                                                    <input type="text" className="form-control" id="last_name" name="last_name" value={formik.values.last_name} onChange={formik.handleChange} />
                                                    {formik.errors.last_name && <div className="text-danger">{formik.errors.last_name}</div>}
                                                </div>
                                            </div>
                                            <div className="row mb-3">
                                                <div className="col-md-6">
                                                    <label htmlFor="mobile" className="form-label">Mobile:</label>
                                                    <input type="text" className="form-control" id="mobile" name="mobile" value={formik.values.mobile} onChange={formik.handleChange} />
                                                    {formik.errors.mobile && <div className="text-danger">{formik.errors.mobile}</div>}
                                                </div>
                                                <div className="col-md-6">
                                                    <label htmlFor="gender" className="form-label">Gender:</label>
                                                    <select className="form-select" id="gender" name="gender" value={formik.values.gender} onChange={formik.handleChange}>
                                                        <option value="">Select gender</option>
                                                        <option value="Male">Male</option>
                                                        <option value="Female">Female</option>
                                                        <option value="Other">Other</option>
                                                    </select>
                                                    {formik.errors.gender && <div className="text-danger">{formik.errors.gender}</div>}
                                                </div>
                                            </div>
                                            <div className="row mb-3">
                                                <div className="col-md-6">
                                                    <label htmlFor="age" className="form-label">Age:</label>
                                                    <select className="form-select" id="age" name="age" value={formik.values.age} onChange={formik.handleChange}>
                                                        <option value="">Select age</option>
                                                        <option value="0-12">0 - 12</option>
                                                        <option value="13-19">13 - 19</option>
                                                        <option value="20-35">20 - 35</option>
                                                        <option value="36-60">36 - 60</option>
                                                        <option value="above-60">Above 60</option>
                                                    </select>
                                                    {formik.errors.age && <div className="text-danger">{formik.errors.age}</div>}
                                                </div>
                                                <div className="col-md-6">
                                                    <label htmlFor="password" className="form-label">Password:</label>
                                                    <input type="password" className="form-control" id="password" name="password" value={formik.values.password} onChange={formik.handleChange} autoComplete="new-password" />
                                                    {formik.errors.password && <div className="text-danger">{formik.errors.password}</div>}
                                                </div>
                                            </div>
                                        </>
                                    }
                                    {method === "login" &&
                                        <>
                                            <div className="mb-3">
                                                <label htmlFor="email" className="form-label">Email:</label>
                                                <input type="email" className="form-control" name="email" value={formik.values.email} onChange={formik.handleChange} autoComplete="username"/>
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="password" className="form-label">Password:</label>
                                                <input type="password" className="form-control" name="password" value={formik.values.password} onChange={formik.handleChange} autoComplete="current-password" />
                                            </div>
                                        </>
                                    }
                                    {loading && <LoadingIndicator />}
                                    <button className="btn btn-primary" type="submit">{name}</button>

                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Form;

Form.propTypes = {
    route: PropTypes.string.isRequired,
    method: PropTypes.string.isRequired,
};