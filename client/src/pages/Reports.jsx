import React, { useEffect, useState } from 'react'
import DashBoard from './Admin/DashBoard'
import Stats from '../components/Layout/Stats'
import ReportCard from '../components/Layout/ReportCard'
import axios from 'axios'
import { server } from '../server'
import { toast } from 'react-toastify'
import { AiFillCloseCircle } from 'react-icons/ai'
import ChangeStatus from '../components/ChangeStatus'
import { MdDelete } from 'react-icons/md'

const Reports = () => {
    const [reports, setReports] = useState([])
    const [report, setReport] = useState('');
    const [editID, setEditID] = useState();
    const [popup, setPopup] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState('');

    useEffect(() => {
        fetchReports();
    }, []);

    // fetch all reports
    const fetchReports = async () => {
        try {
            const response = await axios.get(`${server}/report/getAllReports`);
            // console.log(response.data); // Check the received data in the console
            setReports(response.data.reports);
        } catch (error) {
            console.error(error);
            toast.error('Error fetching users');
        }
    };
    const fetchReport = async (userID) => {
        try {
            const response = await axios.get(`${server}/report/getReport/${userID}`);
            setReport(response.data);
        } catch (error) {
            console.error(error);
            toast.error('Error fetching user');
        }
    };

    const changeStatus = (id) => {
        setPopup(true)
        setEditID(id);
    }

    const onDelete = (id) => {
        try {
            // Send a DELETE request to delete the community by its ID
            axios.delete(`${server}/report/deleteReport/${id}`);

            // Show a success message
            toast.success('Report deleted successfully');
            fetchReports()
        } catch (error) {
            console.error(error);
            toast.error('Error deleting Report');
        }
    }

    // Filter reports based on the selected status
    const filteredReports = selectedStatus
        ? reports.filter((report) => report.status === selectedStatus)
        : reports;

    return (
        <DashBoard>
            <div className="w-full text-white flex gap-2 flex-wrap">
                <div className="md:w-[75%] w-full">
                    <div className="px-5 text-xl font-semibold pb-10">Reports</div>

                    <Stats />

                 <div className="flex justify-end">
                 <div className="px-5   py-4">
                        <select
                            className="w-40 px-2 py-1 border rounded-md  text-white bg-black focus:outline-none focus:border-blue-500"
                            value={selectedStatus}
                            onChange={(e) => setSelectedStatus(e.target.value)}
                        >
                            <option value="">All</option>
                            <option value="new">New</option>
                            <option value="resolved">Resolved</option>
                            <option value="underReview">Under Review</option>
                        </select>
                    </div>
                 </div>

                    {/* //table */}
                    <div className="py-2  overflow-x-auto">
                        <table className="w-full ">
                            <thead className="text-[#ffffff]">
                                <tr>
                                    <th className="py-2 px-2 text-md font-medium ">Report Title</th>
                                    <th className="py-2 px-2 text-md font-medium ">User </th>
                                    <th className="py-2 px-2 text-md font-medium ">Repot Discription</th>
                                    <th className="py-2 px-2 text-md font-medium ">Current Status</th>
                                    <th className="py-2 px-5 text-md font-medium "></th>
                                </tr>
                            </thead>
                            <tbody className="text-center">

                                {filteredReports.map((report) => (
                                    <tr key={report._id} className='text-sm font-normal text-white py-3 cursor-pointer' >
                                        <td onClick={() => fetchReport(report._id)}>{report.reportTitle}</td>
                                        <td onClick={() => fetchReport(report._id)}>{report.user.username}</td>
                                        <td onClick={() => fetchReport(report._id)} className="  overflow-hidden">{report.reportDiscription.substring(0, 20) + '...'}</td>
                                        <td className={`px-2 py-2 rounded-lg ${report.status === 'new' ? 'text-blue-500' : (report.status === 'resolved' ? 'text-green-500' : 'text-red-500')} `}>
                                            {report.status}
                                        </td>

                                        <td className='py-2'> <div className=" py-2 w-32 rounded-lg bg-blue-500 hover:scale-105 cursor-pointer" onClick={() => changeStatus(report._id)}>Change Status</div></td>
                                        <td>
                                            <button
                                                onClick={() => onDelete(report._id)} // Pass the community ID to the onDelete handler
                                                className='text-red-500 text-xl  hover:text-red-700'
                                            >
                                                <MdDelete />
                                            </button>
                                        </td>
                                    </tr>
                                ))}

                                {/* <tr className='text-sm font-normal text-white py-3'>
                                    <td>Report one</td>
                                    <td>john</td>
                                    <td>Dmeo discription abbout report</td>
                                    <td className='px-2 py-2 rounded-lg text-yellow-500'>under reviews</td>
                                    <td className='py-2'> <div className=" py-2 w-32 rounded-lg bg-blue-500 cursor-pointer">Change Status</div></td>
                                </tr> */}

                            </tbody>
                        </table>
                    </div>
                </div>


                {/* //users card? */}
                <div className="md:w-[24%] w-full">
                    {report && <ReportCard report={report} />}
                </div>
                {popup && (
                    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-opacity-50 bg-gray-500">
                        <div className="md:w-1/4 md:h-[40vh] w-full bg-white relative">
                            <div className="absolute top-3 right-3 hover:scale-105 text-lg text-black hover:text-red-500" onClick={() => setPopup(false)}>
                                <AiFillCloseCircle />
                            </div>
                            <h1 className="text-black text-center py-5 font-semibold">Change Status</h1>
                            <ChangeStatus ID={editID} />
                        </div>
                    </div>
                )}
            </div>
        </DashBoard>
    )
}

export default Reports
