import React, { useEffect, useState } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { toast } from 'react-toastify';
import { server } from '../../server';
import {  useNavigate, useParams } from 'react-router-dom';
import DashBoard from './DashBoard';

const EditUser = () => {
    const Navigate = useNavigate();
    const { id } = useParams();
    const [user, setUser] = useState([]);

    useEffect(() => {
        fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchUser = async () => {
        try {
            const response = await axios.get(`${server}/user/getUser/${id}`);
            setUser(response.data.user);
        } catch (error) {
            console.error(error);
        }
    };

    const initialValues = {
        name: user.name || '',
        email: user.email || '',
        number: user.number || '',
        city: user.city || '',
        country: user.country || '',
    }
    // enableReinitialize: true,
    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Required'),
        email: Yup.string().email('Invalid email').required('Required'),
        number: Yup.string().required('Required'),
        city: Yup.string().required('Required'),
        country: Yup.string().required('Required'),
    });

    const handleSubmit = async (values) => {
        try {
            await axios.put(`${server}/user/updateUser/${id}`, values);
            toast.success('User updated successfully');
            Navigate('/dashboard'); // Redirect to the dashboard after successful update
        } catch (error) {
            if (error.response && error.response.status === 400) {
                toast.error(error.response.data.error);
            } else {
                toast.error('Failed to update User. Please try again later.');
            }
        }
    }


    return (
        <DashBoard>
            <div className="flex justify-center items-center">

                <div className="md:w-[80%] w-full  flex justify-center px-8  flex-col text-[#666666]">

                    <div className="py-5 ">
                        <div className="text-2xl font-bold text-black text-center ">Update User</div>
                    </div>


                    <div className="">
                        <Formik
                            initialValues={initialValues}
                            enableReinitialize= {true}
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




                               
                                <button
                                    type="submit"
                                    className="w-full mt-3 bg-[#003443] text-white py-4 px-4 rounded-md hover:bg-[#53bad6] focus:outline-none focus:ring focus:ring-blue-200"
                                >
                                    Update
                                </button>
                            </Form>
                        </Formik>
                    </div>
                </div>
            </div>
        </DashBoard>
    )
}

export default EditUser
