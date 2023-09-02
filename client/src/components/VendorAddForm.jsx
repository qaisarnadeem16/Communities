/* eslint-disable no-undef */
import React, { useState } from 'react'
// import login from '../../Assets/Rectangle 1862.png'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios'
import { toast } from 'react-toastify';
import { server } from '../server'


const VendorAddForm = () => {
    // const Navigate = useNavigate()
    const [Logo, setLogo] = useState(null)

    const handleFile=(e)=>{
        setLogo(e.target.files[0]);
    }
    const initialValues = {
        vendorName: '',
        headOffice: '',
        branch: '',
        number: '',
        email: '',
        logo:Logo ||''
    };

    const validationSchema = Yup.object().shape({
        vendorName: Yup.string().required('Required'),
        headOffice: Yup.string().required('Required'),
        branch: Yup.string().required('Required'),
        number: Yup.string().required('Required'),
        email: Yup.string().email('Invalid email format').required('Required'), // Update validation for logo
    });
    const handleSubmit = async (values) => {
        values.logo=Logo

        try {
            await axios.post(`${server}/vendor/create-vendor`, values, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'multipart/form-data', // Important for file upload
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
                        <div className="text-2xl font-bold text-black text-center ">Add New Vendor</div>
                    </div>

                    <div className="">
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}
                        >
                            <Form className=" py-6 rounded flex flex-wrap gap-4">

                                <div className=" md:w-[48%] w-full">
                                    <label htmlFor="email" className="block text-sm mb-3">
                                        Vendor Name
                                    </label>
                                    <Field
                                        type="text"
                                        id="vendorName"
                                        name="vendorName"
                                        placeholder="Enter your Vendor Name"
                                        className="w-full px-3  border bg-[#F5F4FF] py-3 focus:outline-none focus:border-blue-500"
                                    />
                                    <ErrorMessage name="vendorName" component="div" className="text-red-500 text-xs mt-1" />
                                </div>
                                <div className=" md:w-[48%] w-full">
                                    <label htmlFor="email" className="block text-sm mb-3">
                                        Head Office
                                    </label>
                                    <Field
                                        type="text"
                                        id="headOffice"
                                        name="headOffice"
                                        placeholder="Enter your head Office"
                                        className="w-full px-3  border bg-[#F5F4FF] py-3 focus:outline-none focus:border-blue-500"
                                    />
                                    <ErrorMessage name="headOffice" component="div" className="text-red-500 text-xs mt-1" />
                                </div>

                                <div className=" md:w-[48%] w-full">
                                    <label htmlFor="email" className="block text-sm mb-3">
                                        Branch
                                    </label>
                                    <Field
                                        type="text"
                                        id="branch"
                                        name="branch"
                                        placeholder="Enter your branch"
                                        className="w-full px-3  border bg-[#F5F4FF] py-3 focus:outline-none focus:border-blue-500"
                                    />
                                    <ErrorMessage name="branch" component="div" className="text-red-500 text-xs mt-1" />
                                </div>

                                <div className=" md:w-[48%] w-full">
                                    <label htmlFor="email" className="block text-sm mb-3">
                                        Contact No
                                    </label>
                                    <Field
                                        type="text"
                                        id="number"
                                        name="number"
                                        placeholder="Enter your phone number"
                                        className="w-full px-3  border bg-[#F5F4FF] py-3 focus:outline-none focus:border-blue-500"
                                    />
                                    <ErrorMessage name="number" component="div" className="text-red-500 text-xs mt-1" />
                                </div>


                                <div className=" md:w-[48%] w-full">
                                    <label htmlFor="email" className="block text-sm mb-3">
                                        Email
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
                                        Vendor Logo
                                    </label>
                                    <input
                                        type="file"
                                        id="logo"
                                        name="logo"
                                        onChange={handleFile}
                                        className="w-full px-3  border bg-[#F5F4FF] py-3 focus:outline-none focus:border-blue-500"
                                    />
                                    <ErrorMessage name="logo" component="div" className="text-red-500 text-xs mt-1" />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full mt-3 bg-[#003443] text-white py-3 px-4 rounded-md hover:bg-[#53bad6] focus:outline-none focus:ring focus:ring-blue-200"
                                >
                                    Add New Vendor
                                </button>
                            </Form>
                        </Formik>
                    </div>
                </div>
            </div>
        </>
    )
}

export default VendorAddForm
