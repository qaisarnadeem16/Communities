import React from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import { server } from '../server';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
    name: Yup.string().required('name is required'),
    city: Yup.string().required('city is required'),
    state: Yup.string().required('state is required'),
    zipCode: Yup.string().required('zipCode is required'),
  // Add validation for other fields
});

const AddCommunityForm = ({ user }) => {
  const formik = useFormik({
    initialValues: {
        name:"",
        city:"",
        state:"",
        zipCode:"",

    },
    validationSchema,
    onSubmit: async (values) => {
      // Remove setting the user here, as it's already set in initialValues
      try {
        await axios.post(`${server}/Quiz/scheduleQuiz`, values);
        toast.success('Quiz created successfully');
      } catch (error) {
        if (error.response && error.response.status === 400) {
          toast.error(error.response.data.error);
        } else {
          toast.error('Failed to save Quiz. Please try again later.');
        }
      }
    },
  });

  return (
    <div className="w-full">
      <h3 className="text-white font-medium text-xl">Add Community</h3>

   
      <div className="">
        <form className="py-5 md:py-8 " onSubmit={formik.handleSubmit}>
          <div className="py-2 md:px-2 ">
            <div className="">
              <input
                type="text"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                className="w-full  px-2 bg-[#25314a] rounded py-2"
                placeholder="Add Name"
              />
              {formik.errors.title && (
                <p className="text-red-500">{formik.errors.name}</p>
              )}
            </div>
          </div>


          <div className="py-2 md:px-2 ">
            <div className="">
              <input
                type="text"
                name="city"
                value={formik.values.city}
                onChange={formik.handleChange}
                className="w-full  px-2 bg-[#25314a] rounded py-2"
                placeholder="Add City"
              />
              {formik.errors.city && (
                <p className="text-red-500">{formik.errors.city}</p>
              )}
            </div>
          </div>



          <div className="py-2 md:px-2 ">
            <div className="">
              <input
                type="text"
                name="state"
                value={formik.values.state}
                onChange={formik.handleChange}
                className="w-full  px-2 bg-[#25314a] rounded py-2"
                placeholder="Add state"
              />
              {formik.errors.state && (
                <p className="text-red-500">{formik.errors.state}</p>
              )}
            </div>
          </div>



          <div className="py-2 md:px-2 ">
            <div className="">
              <input
                type="text"
                name="zipCode"
                value={formik.values.zipCode}
                onChange={formik.handleChange}
                className="w-full  px-2 bg-[#25314a] rounded py-2"
                placeholder="Add zipCode"
              />
              {formik.errors.title && (
                <p className="text-red-500">{formik.errors.zipCode}</p>
              )}
            </div>
          </div>

          {/* Add more form fields here for other properties */}
          
          <button
            type="submit"
            className="bg-blue-500 text-white px-3 mx-2 float-right py-2 rounded hover:bg-blue-600"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCommunityForm;
