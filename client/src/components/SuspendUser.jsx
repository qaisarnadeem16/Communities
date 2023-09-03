import React, { useEffect, useState } from 'react';
import { Formik, Form, ErrorMessage, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { toast } from 'react-toastify';
import { server } from '../server';

const SuspendUser = (props) => {
    const userID = props;

    const [user, setUser] = useState([]);

    useEffect(() => {
        fetchUser();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchUser = async () => {
        try {
            const response = await axios.get(`${server}/user/getUser/${userID.ID}`);
            setUser(response.data);
        } catch (error) {
            console.error(error);
            toast.error('Error fetching user');
        }
    };

    const initialValues = {
        accountStatus: user.accountStatus || '',
    };

    const validationSchema = Yup.object().shape({
        accountStatus: Yup.string().required('Required'),
    });

    const handleSubmit = async (values) => {
        try {
            await axios.put(`${server}/user/updateStatus/${userID.ID}`, values);
            toast.success('Status updated successfully');
            window.location.reload();
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
                            <label htmlFor="accountStatus" className="block text-black text-sm mb-3">
                                Account Status
                            </label>
                            <Field
                                as="select"
                                id="accountStatus"
                                name="accountStatus"
                                className="w-full px-3 border text-black bg-[#F5F4FF] py-3 focus:outline-none focus:border-blue-500"
                            >
                                <option value="">Select account Status</option>
                                <option value="active">active</option>
                                <option value="suspend">suspend</option>
                            </Field>
                            <ErrorMessage name="accountStatus" component="div" className="text-red-500 text-xs mt-1" />
                        </div>

                        <button
                            type="submit"
                            className="w-full mt-3  bg-green-500 text-white py-3 rounded-md hover:bg-[#53bad6] focus:outline-none focus:ring focus:ring-blue-200"
                        >
                            Update Status
                        </button>
                    </Form>
                </Formik>
            </div>
        </div>
    );
};

export default SuspendUser;
