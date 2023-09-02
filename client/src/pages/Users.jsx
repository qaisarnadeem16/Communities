import React from 'react'
import DashBoard from './Admin/DashBoard'
import ProfileCard from '../components/Layout/ProfileCard'
import profile from '../Assets/Profile photo.png'

const Users = () => {
    return (
        <DashBoard>
            <div className="w-full text-white flex gap-2 flex-wrap">
                <div className="md:w-[75%] w-full">
                    <div className="px-5 text-xl font-semibold pb-10">Users</div>

                  


                    {/* //table */}
                    <div className="py-5 overflow-x-auto">
                        <table className="w-full  ">
                            <thead className="text-[#ffffff]">
                                <tr>
                                    <th className="py-2 px-2 text-md font-medium ">Name</th>
                                    <th className="py-2 px-2 text-md font-medium  ">Email </th>
                                    <th className="py-2 px-2 text-md font-medium ">Phone Number</th>
                                    <th className="py-2 px-2 text-md font-medium ">Gender</th>
                                    <th className="py-2 px-5 text-md font-medium "></th>
                                </tr>
                            </thead>
                            <tbody className="text-center">

                                <tr className='text-sm font-normal text-white py-3'>
                                    <td className=''>
                                        <div className="flex gap-3 items-center">
                                            <img src={profile} alt="" className="rounded-full w-[40px] h-[40px]" />
                                            John Deo
                                        </div>
                                    </td>
                                    <td className=''>johndeo@gmail.com</td>
                                    <td>+9238883888</td>
                                    <td className='px-2 py-2 rounded-lg text-green-500'>male</td>
                                    <td className='py-2'> <div className=" py-2 w-24 rounded-lg bg-red-500 cursor-pointer">Suspend</div></td>

                                </tr>


                                <tr className='text-sm font-normal text-white py-3'>
                                    <td>
                                        <div className="flex gap-3 items-center">
                                            <img src={profile} alt="" className="rounded-full w-[40px] h-[40px]" />
                                            John Deo
                                        </div>
                                    </td>
                                    <td>johndeo@gmail.com</td>
                                    <td>+9238883888</td>
                                    <td className='px-2 py-2 rounded-lg text-green-500'>male</td>
                                    <td className='py-2'> <div className=" py-2 w-24 rounded-lg bg-red-500 cursor-pointer">Suspend</div></td>

                                </tr>


                                <tr className='text-sm font-normal text-white py-3'>
                                    <td>
                                        <div className="flex gap-3 items-center">
                                            <img src={profile} alt="" className="rounded-full w-[40px] h-[40px]" />
                                            John Deo
                                        </div>
                                    </td>
                                    <td>johndeo@gmail.com</td>
                                    <td>+9238883888</td>
                                    <td className='px-2 py-2 rounded-lg text-green-500'>male</td>
                                    <td className='py-2'> <div className=" py-2 w-24 rounded-lg bg-red-500 cursor-pointer">Suspend</div></td>

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
                    <ProfileCard/>
                </div>

            </div>
        </DashBoard>
    )
}

export default Users
