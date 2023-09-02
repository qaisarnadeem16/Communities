import React from 'react'
// import login from '../../Assets/Rectangle 1862.png'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios'
import { toast } from 'react-toastify';
import { server } from '../server'
import { Link } from 'react-router-dom'


const SignupUserForm = () => {
    // const Navigate = useNavigate()
    const initialValues = {
        name: '',
        email: '',
        number: '',
        city: '',
        country: '',
        password: '',
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Required'),
        email: Yup.string().email('Invalid email').required('Required'),
        number: Yup.string().required('Required'),
        city: Yup.string().required('Required'),
        country: Yup.string().required('Required'),
        password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
    });


    const handleSubmit = async (values) => {

        try {
            await axios.post(`${server}/user/create-user`, values, {
                withCredentials: true
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
                                        id="name"
                                        name="name"
                                        placeholder="Enter your Full Name"
                                        className="w-full px-3  border bg-[#F5F4FF] py-3 focus:outline-none focus:border-blue-500"
                                    />
                                    <ErrorMessage name="name" component="div" className="text-red-500 text-xs mt-1" />
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
                                        id="number"
                                        name="number"
                                        placeholder="Enter your Phone number"
                                        className="w-full px-3  border bg-[#F5F4FF] py-3 focus:outline-none focus:border-blue-500"
                                    />
                                    <ErrorMessage name="number" component="div" className="text-red-500 text-xs mt-1" />
                                </div>

                                <div className=" md:w-[48%] w-full">
                                    <label htmlFor="email" className="block text-sm mb-3">
                                        City
                                    </label>
                                    <Field
                                        type="text"
                                        id="city"
                                        name="city"
                                        placeholder="Enter your city"
                                        className="w-full px-3  border bg-[#F5F4FF] py-3 focus:outline-none focus:border-blue-500"
                                    />
                                    <ErrorMessage name="city" component="div" className="text-red-500 text-xs mt-1" />
                                </div>

                                <div className=" md:w-[48%] w-full">
                                    <label htmlFor="email" className="block text-sm mb-3">
                                        Country
                                    </label>
                                    <Field
                                        type="text"
                                        id="country"
                                        name="country"
                                        placeholder="Enter your country"
                                        className="w-full px-3  border bg-[#F5F4FF] py-3 focus:outline-none focus:border-blue-500"
                                    />
                                    <ErrorMessage name="country" component="div" className="text-red-500 text-xs mt-1" />
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
