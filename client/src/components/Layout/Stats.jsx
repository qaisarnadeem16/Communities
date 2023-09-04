import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BsPatchCheckFill } from 'react-icons/bs'
import {FaBoxes} from 'react-icons/fa'
import { MdPendingActions } from 'react-icons/md'
import { AiFillSetting } from 'react-icons/ai'
import { server } from '../../server'
import { toast } from 'react-toastify'
const Stats = () => {
    const [reports , setReports]=useState([])
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
            toast.error('Error fetching stats');
        }
    };

    const newReports = reports.filter((report) => report.status === 'new');
    const underReviewReports = reports.filter((report) => report.status === 'underReview');
    const resolvedReports = reports.filter((report) => report.status === 'resolved');
  return (
    <div>
       <div className="bg-white rounded-xl p-2">
                <div className="flex justify-between items-center">
                    <h4 className="text-[#00459E] text-lg font-normal py-1 px-5">Satatistics</h4>
                </div>

                <div className="md:pt-3 pb-2 flex flex-wrap gap-5 md:gap-2 justify-between md:px-12">

                    <div className="flex gap-3 items-center">
                    <div className="bg-[#00459e] rounded-full p-5"><FaBoxes className='text-xl'/></div>

                        <div className="flex flex-col items-center ">
                            <p className="text-[#00459e] text-lg">{reports.length}</p>
                            <p className="text-gray-400 text-[13px] leading-[13px]">Total <br /> Reports</p>
                        </div>
                    </div>

                    <div className="flex gap-3 items-center">
                        <div className="bg-[#42BA96] rounded-full p-5"><MdPendingActions/></div>
                        <div className="flex flex-col items-center ">
                            <p className="text-[#42BA96]">{newReports.length}</p>
                            <p className="text-gray-400 text-[10px] leading-[13px]">New <br /> Reports</p>
                        </div>
                    </div>

                    <div className="flex gap-3 items-center">
                        <div className="bg-[#32CD32] rounded-full p-5"><BsPatchCheckFill/></div>
                        <div className="flex flex-col items-center ">
                            <p className="text-[#32CD32]">{resolvedReports.length}</p>
                            <p className="text-gray-400 text-[10px] leading-[13px]">Resolved <br /> Reports</p>
                        </div>
                    </div>

                 

                    <div className="flex gap-3 items-center">
                        <div className="bg-[#E32828] rounded-full p-5"><AiFillSetting className='text-xl'/></div>
                        <div className="flex flex-col items-center ">
                            <p className="text-[#E32828]">{underReviewReports.length}</p>
                            <p className="text-gray-400 text-[10px] leading-[13px]">Under  <br /> Reviews</p>
                        </div>
                    </div> 
                </div>

            </div>
    </div>
  )
}

export default Stats
