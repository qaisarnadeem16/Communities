/* eslint-disable no-undef */
import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { toast } from 'react-toastify';
import { server } from '../server';
import { useNavigate } from 'react-router-dom';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'; // Import necessary Firebase storage functions
import { storage } from '../config/firebaseConfig';

const ReportAddForm = () => {
  const Navigate = useNavigate();
  const [images, setImages] = useState({ image1: null, image2: null, image3: null });
  const [loading, setLoading] = useState(false);

  const handleFile1 = async (e) => {
    handleFile(e, 'image1');
  };

  const handleFile2 = async (e) => {
    handleFile(e, 'image2');
  };

  const handleFile3 = async (e) => {
    handleFile(e, 'image3');
  };

  const handleFile = async (e, imageKey) => {
    const file = e.target.files[0];
    console.log('Selected file:', file);

    if (file) {
      try {
        setLoading(true);
        const storageRef = ref(storage, `userProfile/${file.name}`);
        await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);
        toast.success('Image successfully uploaded');
        setImages((prevImages) => ({ ...prevImages, [imageKey]: downloadURL }));
      } catch (error) {
        console.error('Error uploading file:', error.message);
        toast.error('Error uploading file: ' + error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  const initialValues = {
    reportTitle: '',
    community: '64f3a21a95eb0700f7f9402d',
    user: '65b18476a38d331938deb4a5',
    reportDiscription: '',
  };

  const validationSchema = Yup.object().shape({
    reportTitle: Yup.string().required('Required'),
    reportDiscription: Yup.string().required('Required'),
  });
// console.log(images)
  const handleSubmit = async (values) => {
    values.image1 = images.image1;
    values.image2 = images.image2;
    values.image3 = images.image3;
// console.log(values)
    try {
      await axios.post(`${server}/report/create-report`, values, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      toast.success('Created Report successfully');
      Navigate('/dashboard');
    } catch (error) {
      toast.error(error.response.data.message);
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
                  onChange={handleFile1} // Use handleFile1 for Image1
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
                  onChange={handleFile2} // Use handleFile2 for Image2
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
                  onChange={handleFile3} // Use handleFile3 for Image3
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
