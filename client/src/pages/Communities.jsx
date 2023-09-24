import React, { useEffect, useState } from 'react'
import DashBoard from './Admin/DashBoard'
import AddCommunityForm from '../components/AddCommunityForm'
import axios from 'axios';
import { server } from '../server';
import { toast } from 'react-toastify';
import { MdDelete } from 'react-icons/md';

const Communities = () => {
    const [communities, setCommunities] = useState([]);

    useEffect(() => {
        fetchCommunities();
        // onDelete()
    }, []);

    // fetch all questions
    const fetchCommunities = async () => {
        try {
            const response = await axios.get(`${server}/community/getAllCommunity`);
            // console.log(response.data); // Check the received data in the console
            setCommunities(response.data.users);
        } catch (error) {
            console.error(error);
            toast.error('Error fetching Community');
        }
    };

    const onDelete = (id) => {
        try {
            // Send a DELETE request to delete the community by its ID
            axios.delete(`${server}/community/deleteCommunity/${id}`);

            // Show a success message
            toast.success('Community deleted successfully');
        } catch (error) {
            console.error(error);
            toast.error('Error deleting Community');
        }
    }
    // console.log(communities)
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
                                    <th className="py-2 px-5 text-md font-medium "></th>
                                </tr>
                            </thead>
                            <tbody className="text-center">

                                {communities.map((community) => (
                                    <tr key={community._id} className='text-sm font-normal text-white py-3'>
                                        <td className=''>
                                            {community.name}
                                        </td>
                                        <td className=''>{community.city}</td>
                                        <td>{community.state}</td>
                                        <td className='px-2 py-2 rounded-lg text-green-500'>{community.zipCode}</td>
                                        <td>
                                            <button
                                                onClick={() => onDelete(community._id)} // Pass the community ID to the onDelete handler
                                                className='text-red-500 text-xl  hover:text-red-700'
                                            >
                                                <MdDelete />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {/* <tr className='text-sm font-normal text-white py-3'>
                                    <td className=''>
                                    BetCoverse
                                    </td>
                                    <td className=''>Chicago</td>
                                    <td>California</td>
                                    <td className='px-2 py-2 rounded-lg text-green-500'>6007</td>

                                </tr> */}


                            </tbody>
                        </table>
                    </div>
                </div>


                {/* //users card? */}
                <div className="md:w-[28%] w-full">
                    <AddCommunityForm />
                </div>

            </div>
        </DashBoard>
    )
}

export default Communities
