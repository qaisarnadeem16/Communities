import React from 'react'
import DashBoard from './Admin/DashBoard'
import Stats from '../components/Layout/Stats'
import ReportCard from '../components/Layout/ReportCard'

const Reports = () => {
    return (
        <DashBoard>
            <div className="w-full text-white flex gap-2 flex-wrap">
                <div className="md:w-[75%] w-full">
                    <div className="px-5 text-xl font-semibold pb-10">Reports</div>

                    <Stats />


                    {/* //table */}
                    <div className="py-5  overflow-x-auto">
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

                                <tr className='text-sm font-normal text-white py-3'>
                                    <td>Report one</td>
                                    <td>john</td>
                                    <td>Dmeo discription abbout report</td>
                                    <td className='px-2 py-2 rounded-lg text-green-500'>New</td>
                                    <td className='py-2'> <div className=" py-2 w-32 rounded-lg bg-blue-500 cursor-pointer">Change Status</div></td>

                                </tr>


                                <tr className='text-sm font-normal text-white py-3'>
                                    <td>Report one</td>
                                    <td>john</td>
                                    <td>Dmeo discription abbout report</td>
                                    <td className='px-2 py-2 rounded-lg text-yellow-500'>under reviews</td>
                                    <td className='py-2'> <div className=" py-2 w-32 rounded-lg bg-blue-500 cursor-pointer">Change Status</div></td>
                                </tr>

                                {/* {currentItems.map((quiz) => (
                                        <tr key={quiz._id}>
                                            <td className="py-2 px-4 border text-left">{quiz.quizId.title}</td>
                                            <td className="py-2 px-4 border">{quiz.quizId.category}</td>
                                            <td className="py-2 px-4 border">{quiz.questions.length}</td>
                                            <td className="py-2 px-4 border">{quiz.questions.length - quiz.totalNotAttempted}</td>
                                            <td className="py-2 px-4 border">{quiz.totalWrongAnswers}</td>
                                            <td className="py-2 px-4 border">{quiz.totalCorrectAnswers}</td>
                                            <td className="py-2 px-4 border">{quiz.quizId.firstPrize}$</td>
                                        </tr>
                                    ))} */}
                            </tbody>
                        </table>
                    </div>
                </div>


                {/* //users card? */}
                <div className="md:w-[24%] w-full">
                    <ReportCard/>
                </div>

            </div>
        </DashBoard>
    )
}

export default Reports
