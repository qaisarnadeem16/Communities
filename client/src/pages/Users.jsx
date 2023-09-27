import React, { useEffect, useState } from 'react'
import DashBoard from './Admin/DashBoard'
import ProfileCard from '../components/Layout/ProfileCard'
import profile from '../Assets/download (1).png'
import axios from 'axios'
import { backend_url, server } from '../server'
import { toast } from 'react-toastify'
import { AiFillCloseCircle } from 'react-icons/ai'
import SuspendUser from '../components/SuspendUser'
import { MdDelete } from 'react-icons/md'

const Users = () => {
    const [users, setUsers] = useState([])
    const [user, setUser] = useState('');
    const [editID, setEditID] = useState();
    const [popup, setPopup] = useState(false);
    useEffect(() => {
        fetchUsers();
    }, []);

    // fetch all questions
    const fetchUsers = async () => {
        try {
            const response = await axios.get(`${server}/user/getAllUsers`);
            // console.log(response.data); // Check the received data in the console
            setUsers(response.data.users);
        } catch (error) {
            console.error(error);
            toast.error('Error fetching users');
        }
    };

    const fetchUser = async (userID) => {
        try {
            const response = await axios.get(`${server}/user/getUser/${userID}`);
            setUser(response.data);
        } catch (error) {
            console.error(error);
            toast.error('Error fetching user');
        }
    };
    console.log(user);

    const changeStatus = (id) => {
        setPopup(true)
        setEditID(id);
    }

    const onDelete = (id) => {
        try {
            // Send a DELETE request to delete the community by its ID
            axios.delete(`${server}/user/deleteUser/${id}`);

            // Show a success message
            toast.success('User deleted successfully');
        } catch (error) {
            console.error(error);
            toast.error('Error deleting Community');
        }
    }
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
                                    {/* <th className="py-2 px-2 text-md font-medium ">Gender</th> */}
                                    <th className="py-2 px-5 text-md font-medium "></th>
                                    <th className="py-2 px-5 text-md font-medium "></th>

                                </tr>
                            </thead>
                            <tbody className="text-center">
                                {users.map((user) => (
                                    <tr key={user._id} className='text-sm font-normal text-white py-3'>
                                        <td className='' onClick={() => fetchUser(user._id)}>
                                            <div className="flex gap-3 items-center">
                                                <img
                                                    src={user.profileImage ? `${backend_url}${user.profileImage}` : profile}
                                                    alt="profile"
                                                    className="rounded-full w-[40px] h-[40px]"
                                                />

                                                {user.username}
                                            </div>
                                        </td>
                                        <td className=''>{user.email}</td>
                                        <td>{user.phoneNumber}</td>
                                        {/* <td className='px-2 py-2 rounded-lg text-green-500'>{user.gender}</td> */}
                                        <td className="py-2">
                                            <div
                                                className={`py-2 w-24 rounded-lg ${user.accountStatus === 'active' ? 'bg-red-500' : 'bg-green-500'
                                                    } cursor-pointer`}
                                                onClick={() => changeStatus(user._id)}
                                            >
                                                {user.accountStatus === 'active' ? 'Suspend' : 'Activate'}
                                            </div>
                                        </td>
                                        <td>
                                            <button
                                                onClick={() => onDelete(user._id)} // Pass the community ID to the onDelete handler
                                                className='text-red-500 text-xl  hover:text-red-700'
                                            >
                                                <MdDelete />
                                            </button>
                                        </td>

                                    </tr>
                                ))}
                                {/* 
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

                                </tr> */}


                            </tbody>
                        </table>
                    </div>
                </div>


                {/* //users card? */}
                <div className="md:w-[24%] w-full">
                    {user && <ProfileCard user={user} />}
                </div>




                {popup && (
                    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-opacity-50 bg-gray-500">
                        <div className="md:w-1/4 md:h-[40vh] w-full bg-white relative">
                            <div className="absolute top-3 right-3 hover:scale-105 text-lg text-black hover:text-red-500" onClick={() => setPopup(false)}>
                                <AiFillCloseCircle />
                            </div>
                            <h1 className="text-black text-center py-5 font-semibold">Change Status</h1>
                            <SuspendUser ID={editID} />
                        </div>
                    </div>
                )}

            </div>
        </DashBoard>
    )
}

export default Users
