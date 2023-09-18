import React from 'react'
import login from '../../Assets/Rectangle 1862.png'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios'
import { toast } from 'react-toastify';
import { server } from '../../server'
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie';

const AdminLogin = () => {
    const [cookies, setCookie] = useCookies(['adminToken']);
    const Navigate = useNavigate()
    const initialValues = {
        email: '',
        password: '',
    };

    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Required'),
        password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
    });

    const handleSubmit = async (values) => {
        try {
            const { data } = await axios.post(`${server}/admin/login-admin`, values, {
                withCredentials: true
            });
            const token = data?.token ?? ''
            if (token) {
                setCookie('adminToken', token)
            }
            Navigate('/dashboard')
            toast.success('Login successful');

        } catch (error) {
            if (error.response && error.response.status === 401) {
                toast.error('Token expired. Please log in again.')
            } else {
                toast.error('Login failed. Please try again.')
            }
        }
    };
    return (
        <>
            <div className="flex justify-center items-center">
                <div className="md:w-[50%]  hidden md:flex h-[100vh] bg-[#000000bf]  items-center">
                    <img src={login} alt="" />
                </div>
                <div className="md:w-[50%] w-full  flex justify-center px-8 h-[100vh] bg-[#000000de]  md:px-16 flex-col text-white">

                    <div className="py-10 ">
                        <div className="text-xl font-semibold text-white text-center "> Admin Login</div>
                    </div>

                    <div className="text-lg ">Please fill in your unique admin login details below</div>

                    <div className="">
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}
                        >
                            <Form className=" py-8 rounded">
                                <div className="mb-4 text-black">
                                    <label htmlFor="email" className="block text-sm text-white mb-3">
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
                                <div className="mb-4 text-black">
                                    <label htmlFor="email" className="block text-white text-sm mb-3">
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
                                    className="w-full mt-5 bg-[#003443] text-white py-4 px-4 rounded-md hover:bg-[#53bad6] focus:outline-none focus:ring focus:ring-blue-200"
                                >
                                    Sign in
                                </button>
                            </Form>
                        </Formik>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminLogin
