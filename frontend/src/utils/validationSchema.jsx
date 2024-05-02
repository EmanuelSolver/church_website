import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    username: Yup.string().required('Username is required'),
    first_name: Yup.string().required('First name is required'),
    last_name: Yup.string().required('Last name is required'),
    mobile: Yup.string().required('Mobile is required'),
    gender: Yup.string().required('Gender is required'),
    age: Yup.string().required('Age is required'),
});

export default validationSchema;
