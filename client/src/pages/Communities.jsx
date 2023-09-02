import React from 'react'
import DashBoard from './Admin/DashBoard'
import AddCommunityForm from '../components/AddCommunityForm'

const Communities = () => {
    return (
        <DashBoard>
            <div className="w-full text-white flex gap-2 flex-wrap">
                <div className="md:w-[70%] w-full">
                    <div className="px-5 text-xl font-semibold pb-10">Communities</div>

                  


                    {/* //table */}
                    <div className="py-2 overflow-x-auto">
                        <table className="w-full  ">
                            <thead className="text-[#ffffff]">
                                <tr>
                                    <th className="py-2 px-2 text-md font-medium ">Name</th>
                                    <th className="py-2 px-2 text-md font-medium  ">City </th>
                                    <th className="py-2 px-2 text-md font-medium "> State</th>
                                    <th className="py-2 px-2 text-md font-medium ">Zip Code</th>
                                    {/* <th className="py-2 px-5 text-md font-medium "></th> */}
                                </tr>
                            </thead>
                            <tbody className="text-center">

                                <tr className='text-sm font-normal text-white py-3'>
                                    <td className=''>
                                    BetCoverse
                                    </td>
                                    <td className=''>Chicago</td>
                                    <td>California</td>
                                    <td className='px-2 py-2 rounded-lg text-green-500'>6007</td>

                                </tr>

                                <tr className='text-sm font-normal text-white py-3'>
                                    <td className=''>
                                    BetCoverse
                                    </td>
                                    <td className=''>Chicago</td>
                                    <td>California</td>
                                    <td className='px-2 py-2 rounded-lg text-green-500'>6007</td>

                                </tr>


                                <tr className='text-sm font-normal text-white py-3'>
                                    <td className=''>
                                    BetCoverse
                                    </td>
                                    <td className=''>Chicago</td>
                                    <td>California</td>
                                    <td className='px-2 py-2 rounded-lg text-green-500'>6007</td>

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
                <div className="md:w-[28%] w-full">
                    <AddCommunityForm/>
                </div>

            </div>
        </DashBoard>
    )
}

export default Communities
