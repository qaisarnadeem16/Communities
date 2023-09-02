import React, { useEffect, useState } from 'react';
import DashBoard from './DashBoard';
import { AiFillCloseCircle, AiFillEdit } from 'react-icons/ai';
import { MdDelete, MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import axios from 'axios';
import { backend_url, server } from '../../server';
import { toast } from 'react-toastify';
import Search from '../../components/Search';
import EditVendor from '../../components/EditVendor';
import AddLoanForm from '../../components/Loans/AddLoanFrom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLoans } from '../../Redux/ReduxSlices/Loans';
import LoanEdit from '../../components/Loans/LoanEdit';

const Loans = () => {
    const dispatch = useDispatch();
    const { loans } = useSelector((state) => state.loans);
    useEffect(() => {
        dispatch(fetchLoans());
    }, [dispatch]);

    const [popUp, setPopUp] = useState(false);
    const [popUpEdit, setPopUpEdit] = useState(false);
    const [editId, setEditId] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');


    useEffect(() => {
        SearchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filteredData, searchQuery]);

    const SearchData = async () => {
        try {
            const filtered = loans.filter(item =>
                item.loanName.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredData(filtered);
        } catch (error) {
            toast.error('Error In searching loans');
        }
    };
    

    // delete a question
    const userDelete = async (userId) => {
        try {
            await axios.delete(`${server}/loan/deleteLoan/${userId}`);
             dispatch(fetchLoans()) // Fetch updated questions after deletion
            toast.success('loans deleted successfully');
        } catch (error) {
            toast.error(error);
        }
    };
    // edit questions
    const userEdit = (id) => {
        setPopUpEdit(true);
        setEditId(id)
    };
  


    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
// console.log(filteredData)

    return (
        <DashBoard>
            <div className="w-full">

                <div className="flex md:px-12 px-5 md:gap-16 gap-5 z-30">
                    <div className="text-2xl block font-medium capitalize   ">Loans</div>

                    <Search
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    searchData={SearchData}
                />

                </div>



                <div className="md:px-10 px-5 pt-16 py-5">
                    <button className="rounded-lg py-3 px-6 hover:scale-105 transition-all duration-300 bg-[#1751F0] text-white text-center capitalize" onClick={() => setPopUp(!popUp)}>Add New Loan</button>
                </div>

                <div className="md:px-10 px-2 ">
                    <div className="w-full">
                        <table className="overflow-x-auto  px-5  p-3 bg-white  rounded-md  shadow-lg  w-full">
                            <thead className="border-b py-4 text-[#525252] font-medium ">
                                <tr>
                                    <th className=" py-4 text-md font-medium">Loan Name</th>
                                    <th className=" py-4 text-md font-medium">Ventor</th>
                                    <th className=" py-4 text-md font-medium">Loan Detail</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems.map((item) => (
                                
                                    <tr key={item._id} className="border-b text-[#525252]">
                                        <td className="py-4 text-sm font-normal text-center">{item.loanName}</td>
                                        <td className="text-blue-600 py-4 flex justify-center mx-auto"><img src={`${backend_url}${item.vendorDetail.logo}`} alt="" className='w-24 h-16'/></td>
                                        <td className="py-4 text-sm font-normal text-center">
                                            <div className="">Minimum Salary: {item.loanPlan.minSalary}</div>
                                            <div className="">Monthly Payment: {item.loanPlan.monthlyPayment}</div>
                                            <div className="">Salary Transfer: {item.loanPlan.salaryTransfer}</div>
                                        </td>


                                        <td className="py-4 text-sm font-normal flex justify-center items-center gap-5">
                                            <div className="flex gap-1 items-center hover:scale-105 transition-all duration-300 hover:text-blue-500 bg-gray-200 rounded-md p-2 cursor-pointer" onClick={() => userEdit(item._id)}>
                                                <AiFillEdit /> Edit
                                            </div>
                                            <div className="flex gap-1 items-center hover:scale-105 transition-all duration-300 hover:text-red-500 bg-red-200 rounded-md p-2 cursor-pointer" onClick={() => userDelete(item._id)}>
                                                <MdDelete /> Delete
                                            </div>

                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>


                {/* //pagination code */}
                <div className="flex justify-end mt-4 py-5 text-black px-10">
                    <button
                        className={`mx-1 py-1 px-3 rounded ${currentPage === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-white text-gray-700'
                            }`}
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        <MdKeyboardArrowLeft className='text-xl' />
                    </button>
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index}
                            className={`mx-1 py-1 px-3 rounded ${currentPage === index + 1 ? 'text-gray-800 bg-white border-blue-700 border-2' : 'bg-white text-gray-700'
                                }`}
                            onClick={() => handlePageChange(index + 1)}
                        >
                            {index + 1}
                        </button>
                    ))}
                    <button
                        className={`mx-1 py-1 px-3 rounded ${currentPage === totalPages ? 'bg-gray-300 cursor-not-allowed' : 'bg-white text-gray-700'
                            }`}
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        <MdKeyboardArrowRight className='text-xl' />
                    </button>
                </div>


                {popUp && (
                    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-opacity-50 bg-gray-500">
                        <div className="md:w-1/2 md:h-[80vh] w-full bg-white relative">
                            <div className="absolute top-3 right-3 hover:scale-105 text-lg hover:text-red-500" onClick={() => setPopUp(false)}>
                                <AiFillCloseCircle />
                            </div>
                            <AddLoanForm />
                        </div>
                    </div>
                )}




                {/* // edit Vendor popUp */}
                {popUpEdit && (
                    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-opacity-50 bg-gray-500">
                        <div className="md:w-1/2 md:h-[80vh] w-full bg-white relative">
                            <div className="absolute top-3 right-3 hover:scale-105 text-lg hover:text-red-500" onClick={() => setPopUpEdit(false)}>
                                <AiFillCloseCircle />
                            </div>
                            <LoanEdit ID={editId} />
                        </div>
                    </div>
                )}
            </div>
        </DashBoard>
    );
};

export default Loans;
