import React, { useEffect, useState } from 'react'
import DashBoard from './Admin/DashBoard'
import ProfileCard from '../components/Layout/ProfileCard'
// import profile from '../Assets/Profile photo.png'
import axios from 'axios'
import { backend_url, server } from '../server'
import { toast } from 'react-toastify'

const Users = () => {
    const [users, setUsers] = useState([])
    const [user, setUser] = useState('');

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
                                {users.map((user) => (
                                    <tr key={user._id} className='text-sm font-normal text-white py-3'>
                                        <td className='' onClick={() => fetchUser(user._id)}>
                                            <div className="flex gap-3 items-center">
                                                <img src={`${backend_url}${user.profileImage}`} alt=""  className="rounded-full w-[40px] h-[40px]" />
                                                {user.username}
                                            </div>
                                        </td>
                                        <td className=''>{user.email}</td>
                                        <td>{user.phoneNumber}</td>
                                        <td className='px-2 py-2 rounded-lg text-green-500'>{user.gender}</td>
                                        <td className='py-2'> <div className=" py-2 w-24 rounded-lg bg-red-500 cursor-pointer">Suspend</div></td>

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

            </div>
        </DashBoard>
    )
}

export default Users
