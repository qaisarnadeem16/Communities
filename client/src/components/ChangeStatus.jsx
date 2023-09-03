import React, { useEffect, useState } from 'react';
import { Formik, Form, ErrorMessage, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios'; // Assuming you have axios imported
import { toast } from 'react-toastify'; // Assuming you have toast imported
import { server } from '../server'; // Assuming you have react-router-dom imported

const ChangeStatus = (props) => {
    const userID = props;

    const [report, setReport] = useState([]);

    useEffect(() => {
        fetchReport();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchReport = async () => {
        try {
            const response = await axios.get(`${server}/report/getReport/${userID.ID}`);
            setReport(response.data);
        } catch (error) {
            console.error(error);
            toast.error('Error fetching user');
        }
    };

    const initialValues = {
        status: report.status || '',
    };

    const validationSchema = Yup.object().shape({
        status: Yup.string().required('Required'),
    });

    const handleSubmit = async (values) => {
        console.log(values)
        try {
            await axios.put(`${server}/report/updateStatus/${userID.ID}`, values);
            toast.success('Status updated successfully');
            window.location.reload()
            // navigate('/dashboard'); // Redirect to the dashboard after successful update
        } catch (error) {
            if (error.response && error.response.status === 400) {
                toast.error(error.response.data.error);
            } else {
                toast.error('Failed to update. Please try again later.');
            }
        }
    };

    return (
        <div className="w-full">
            <div className="">
                <Formik
                    initialValues={initialValues}
                    enableReinitialize={true}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    <Form className="py-2 rounded flex flex-wrap gap-4 px-5">
                        <div className="w-full px-5">
                            <label htmlFor="status" className="block text-black text-sm mb-3">
                                Status
                            </label>
                            <Field
                                as="select"
                                id="status"
                                name="status"
                                className="w-full px-3 border text-black bg-[#F5F4FF] py-3 focus:outline-none focus:border-blue-500"
                            >
                                <option value="">Select Status</option>
                                <option value="new">New</option>
                                <option value="resolved">Resolved</option>
                                <option value="underReview">Under Review</option>
                            </Field>
                            <ErrorMessage name="status" component="div" className="text-red-500 text-xs mt-1" />
                        </div>

                        <button
                            type="submit"
                            className="w-full mt-3  bg-green-500 text-white py-3  rounded-md hover:bg-[#53bad6] focus:outline-none focus:ring focus:ring-blue-200"
                        >
                            Update Status
                        </button>
                    </Form>
                </Formik>
            </div>
        </div>
    );
};

export default ChangeStatus;
