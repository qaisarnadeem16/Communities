/* eslint-disable no-undef */
import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { toast } from 'react-toastify';
import { server } from '../server';

const ReportAddForm = () => {
    const [images, setImages] = useState({ image1: null, image2: null, image3: null });

    const handleFile1 = (e) => {
      setImages({ ...images, image1: e.target.files[0] });
    };
  
    const handleFile2 = (e) => {
      setImages({ ...images, image2: e.target.files[0] });
    };
  
    const handleFile3 = (e) => {
      setImages({ ...images, image3: e.target.files[0] });
    };

 
  const initialValues = {
    reportTitle: '',
    community: '64f3a21a95eb0700f7f9402d',
    user: '64f3625e200d5e4f78eb1036',
    reportDiscription: '',
  };

  const validationSchema = Yup.object().shape({
    reportTitle: Yup.string().required('Required'),
    reportDiscription: Yup.string().required('Required'),
  });

  const handleSubmit = async (values) => {
  
    values.image1=images.image1
    values.image2=images.image2
    values.image3=images.image3

    try {
      await axios.post(`${server}/report/create-report`, values, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data', // Important for file upload
        },
      });
      toast.success('Created Report successfully');
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message); // Display server error message
      } else {
        toast.error('An error occurred. Please try again later.');
      }
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="md:w-[90%] h-full w-full flex justify-center px-8 flex-col text-[#666666]">
        <div className="py-5">
          <div className="text-2xl font-bold text-black text-center">Add New Report</div>
        </div>
        <div className="">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form className="py-6 rounded flex flex-wrap gap-4">
              <div className="md:w-[48%] w-full">
                <label htmlFor="reportTitle" className="block text-sm mb-3">
                  Report Name
                </label>
                <Field
                  type="text"
                  id="reportTitle"
                  name="reportTitle"
                  placeholder="Enter your report Name"
                  className="w-full px-3 border bg-[#F5F4FF] py-3 focus:outline-none focus:border-blue-500"
                />
                <ErrorMessage name="reportTitle" component="div" className="text-red-500 text-xs mt-1" />
              </div>
              <div className="md:w-[48%] w-full">
                <label htmlFor="reportDiscription" className="block text-sm mb-3">
                  Report Description
                </label>
                <Field
                  type="text"
                  id="reportDiscription"
                  name="reportDiscription"
                  placeholder="Enter your report Description"
                  className="w-full px-3 border bg-[#F5F4FF] py-3 focus:outline-none focus:border-blue-500"
                />
                <ErrorMessage name="reportDiscription" component="div" className="text-red-500 text-xs mt-1" />
              </div>
              <div className="md:w-[48%] w-full">
                <label htmlFor="images" className="block text-sm mb-3">
                  Image1
                </label>
                <input
                  type="file"
                  id="image1"
                  name="image1"
                  onChange={handleFile1}
                  className="w-full px-3 border bg-[#F5F4FF] py-3 focus:outline-none focus:border-blue-500"
                   // Allow multiple file selection
                />
                <ErrorMessage name="image1" component="div" className="text-red-500 text-xs mt-1" />
              </div>
              <div className="md:w-[48%] w-full">
                <label htmlFor="images" className="block text-sm mb-3">
                  Image2
                </label>
                <input
                  type="file"
                  id="image2"
                  name="image2"
                  onChange={handleFile2}
                  className="w-full px-3 border bg-[#F5F4FF] py-3 focus:outline-none focus:border-blue-500"
                   // Allow multiple file selection
                />
                <ErrorMessage name="image2" component="div" className="text-red-500 text-xs mt-1" />
              </div>

              <div className="md:w-[48%] w-full">
                <label htmlFor="images" className="block text-sm mb-3">
                  Image3
                </label>
                <input
                  type="file"
                  id="image3"
                  name="image3"
                  onChange={handleFile3}
                  className="w-full px-3 border bg-[#F5F4FF] py-3 focus:outline-none focus:border-blue-500"
                   // Allow multiple file selection
                />
                <ErrorMessage name="image3" component="div" className="text-red-500 text-xs mt-1" />
              </div>
              <button
                type="submit"
                className="w-full mt-3 bg-[#003443] text-white py-3 px-4 rounded-md hover:bg-[#53bad6] focus:outline-none focus:ring focus:ring-blue-200"
              >
                Add New Report
              </button>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default ReportAddForm;
