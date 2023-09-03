import React from 'react'
import profile from '../../Assets/download (1).png'
import { IoMdMail } from 'react-icons/io'
import { AiFillPhone } from 'react-icons/ai'
import { backend_url } from '../../server'
const ReportCard = ({ report }) => {
    if (!report || !report.report || !report.report.user) {
        // Handle the case when report or its properties are undefined
        return <div>Error: Report data is missing.</div>;
    }

    const user = report.report.user;
    console.log(report)
    return (  
        <div>
            <div className="w-full ">
                {/* user? */}
                <div className="flex flex-col items-center gap-4 justify-center py-10 border-b border-gray-200">
                    <img src={report ? `${backend_url}${user.profileImage}` : profile} alt="" className="w-[70px] h-[70px] rounded-full" />
                    <h1 className="text-lg font-medium text-white">{user.username}</h1>
                    <h1 className="text-md font-normal text-white">{user.email}</h1>
                </div>

                <div className="px-3 flex flex-col gap-3">
                    <h1 className="text-lg font-semibold text-white pt-3 pb-2">Contact info</h1>
                    <div className="flex gap-3 items-center !border-b-[0.5px] border-gray-100 py-2">
                        <IoMdMail className="text-gray-400" />
                        <p className="text-white">{user.email || 'email@gmail.com'}</p>
                    </div>


                    <div className="flex gap-3 items-center !border-b-[0.5px] border-gray-100 py-2">
                        <AiFillPhone className='text-gray-400' />
                        <p className="text-white">{user.phoneNumber}</p>
                    </div>
                </div>


                <div className="">
                    <h1 className="text-lg font-semibold text-white pt-3 pb-2">Image Issuses</h1>
                    <div className="w-full flex gap-3">
                        <img src={`${backend_url}${report.report.image1}`} alt='' className="bg-gray-100 md:w-[30%]  h-[100px] w-full"/>
                        <img src={`${backend_url}${report.report.image2}`} alt='' className="bg-gray-100 md:w-[30%]  h-[100px] w-full"/>
                        <img src={`${backend_url}${report.report.image3}`} alt='' className="bg-gray-100 md:w-[30%]  h-[100px] w-full"/>
                       
                      
                    </div>
                </div>



                <div className="">
                    <h1 className="text-lg font-semibold text-white pt-3 pb-2">About the issuse</h1>

                    <p className="text-sm px-2">{report.report.reportDiscription}</p>

                </div>
            </div>
        </div>
    )
}

export default ReportCard
