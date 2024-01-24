import React, { useState } from 'react'
// import login from '../../Assets/Rectangle 1862.png'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios'
import { toast } from 'react-toastify';
import { server } from '../server'
import { Link } from 'react-router-dom'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../config/firebaseConfig';


const SignupUserForm = () => {
    // const Navigate = useNavigate()
    const [file, setFile] = useState(null)
    const [loading, setLoading] = useState(false)

    const handleFile = async (e) => {

        const file = e.target.files[0];
        console.log('Selected file:', file);
        if (file) {
            try {
                setLoading(true);
                const storageRef = ref(storage, `userPrfile/${file.name}`);
                await uploadBytes(storageRef, file);
                const downloadURL = await getDownloadURL(storageRef);
                toast.success(' Profile successfully uploaded')
                setFile(downloadURL);
            } catch (error) {
                console.error('Error uploading file:', error.message);
                toast.error('Error uploading file: ' + error.message);
            } finally {
                setLoading(false);
            }
        }
    };
    const initialValues = {
        username: '',
        email: '',
        phoneNumber: '',
        address: '',
        gender: '',
        password: '',
        profileImage: file || ''
    };

    const validationSchema = Yup.object().shape({
        username: Yup.string().required('Required'),
        email: Yup.string().email('Invalid email').required('Required'),
        phoneNumber: Yup.string().required('Required'),
        address: Yup.string().required('Required'),
        password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
    });


    const handleSubmit = async (values) => {
        values.profileImage = file
        console.log(values)
        try {
            await axios.post(`${server}/user/create-user`, values, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            toast.success('Created Account successful');

        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.message); // Display server error message
            } else {
                toast.error('An error occurred. Please try again later.');
            }
        }
    };
    return (
        <>
            <div className="flex justify-center items-center">

                <div className="md:w-[90%] h-full w-full  flex justify-center px-8  flex-col text-[#666666]">

                    <div className="py-5 ">
                        <div className="text-2xl font-bold text-black text-center ">SIGNUP</div>
                    </div>

                    <div className="text-lg ">Please fill in your unique  Sign up details below</div>

                    <div className="">
                        <img src={file} alt="" className='rounded-full w-[50px] h-[50px] mx-auto' />

                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}
                        >
                            <Form className=" py-6 rounded flex flex-wrap gap-4">

                                <div className=" md:w-[48%] w-full">
                                    <label htmlFor="email" className="block text-sm mb-3">
                                        Full Name
                                    </label>
                                    <Field
                                        type="text"
                                        id="username"
                                        name="username"
                                        placeholder="Enter your Full Name"
                                        className="w-full px-3  border bg-[#F5F4FF] py-3 focus:outline-none focus:border-blue-500"
                                    />
                                    <ErrorMessage name="username" component="div" className="text-red-500 text-xs mt-1" />
                                </div>
                                <div className=" md:w-[48%] w-full">
                                    <label htmlFor="email" className="block text-sm mb-3">
                                        Email address
                                    </label>
                                    <Field
                                        type="email"
                                        id="email"
                                        name="email"
                                        placeholder="Enter your email"
                                        className="w-full px-3  border bg-[#F5F4FF] py-3 focus:outline-none focus:border-blue-500"
                                    />
                                    <ErrorMessage name="email" component="div" className="text-red-500 text-xs mt-1" />
                                </div>

                                <div className=" md:w-[48%] w-full">
                                    <label htmlFor="email" className="block text-sm mb-3">
                                        Phone Number
                                    </label>
                                    <Field
                                        type="number"
                                        id="phoneNumber"
                                        name="phoneNumber"
                                        placeholder="Enter your Phone number"
                                        className="w-full px-3  border bg-[#F5F4FF] py-3 focus:outline-none focus:border-blue-500"
                                    />
                                    <ErrorMessage name="phoneNumber" component="div" className="text-red-500 text-xs mt-1" />
                                </div>

                                <div className=" md:w-[48%] w-full">
                                    <label htmlFor="email" className="block text-sm mb-3">
                                        Address
                                    </label>
                                    <Field
                                        type="text"
                                        id="address"
                                        name="address"
                                        placeholder="Enter your address"
                                        className="w-full px-3  border bg-[#F5F4FF] py-3 focus:outline-none focus:border-blue-500"
                                    />
                                    <ErrorMessage name="address" component="div" className="text-red-500 text-xs mt-1" />
                                </div>

                                <div className="md:w-[48%] w-full">
                                    <label htmlFor="gender" className="block text-sm mb-3">
                                        Gender
                                    </label>
                                    <Field
                                        as="select" // Use "as" to render a select element
                                        id="gender"
                                        name="gender"
                                        className="w-full px-3 border bg-[#F5F4FF] py-3 focus:outline-none focus:border-blue-500"
                                    >
                                        <option value="" disabled>
                                            Select Gender
                                        </option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="other">Other</option>
                                    </Field>
                                    <ErrorMessage name="gender" component="div" className="text-red-500 text-xs mt-1" />
                                </div>





                                <div className=" md:w-[48%] w-full">
                                    <label htmlFor="email" className="block text-sm mb-3">
                                        Password
                                    </label>
                                    <Field
                                        type="password"
                                        id="password"
                                        name="password"
                                        placeholder="Enter your password"
                                        className="w-full px-3  border bg-[#F5F4FF] py-3 focus:outline-none focus:border-blue-500"
                                    />
                                    <ErrorMessage name="password" component="div" className="text-red-500 text-xs mt-1" />
                                </div>




                                <div className=" md:w-[48%] w-full">
                                    <label htmlFor="email" className="block text-sm mb-3">
                                        Profile
                                    </label>
                                    <input
                                        type="file"
                                        id="profileImage"
                                        onChange={handleFile}
                                        name="profileImage"
                                        accept="image/*" // Specify accepted file types
                                        className="w-full px-3 border bg-[#F5F4FF] py-3 focus:outline-none focus:border-blue-500"
                                    />
                                    <ErrorMessage name="profile" component="div" className="text-red-500 text-xs mt-1" />
                                </div>


                                <button
                                    type="submit"
                                    className="w-full mt-3 bg-[#003443] text-white py-4 px-4 rounded-md hover:bg-[#53bad6] focus:outline-none focus:ring focus:ring-blue-200"
                                >
                                    Sign up
                                </button>
                                <div className="py-3">
                                    Already Account go to <Link to='/login' className='text-blue-600 hover:scale-105'>Login</Link>
                                </div>
                            </Form>
                        </Formik>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SignupUserForm
