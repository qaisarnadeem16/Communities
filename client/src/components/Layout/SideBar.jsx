import React from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { BiLogOut } from 'react-icons/bi';
// import { BsFillPatchQuestionFill } from 'react-icons/bs';
import { FaUserCircle } from 'react-icons/fa';
import { HiUserGroup } from 'react-icons/hi';
import { toast } from 'react-toastify';
import axios from 'axios';
import { server } from '../../server';
import { MdDashboard } from 'react-icons/md';
// import { useSelector } from 'react-redux';
import profile from '../../Assets/Profile photo.png'

const SideBar = ({ setActive, isSidebarVisible }) => {
    // const { admin } = useSelector((state) => state.admin);

    const Navigate = useNavigate()
    const logout = async () => {
        try {
            await axios.get(`${server}/admin/logout`, {
                withCredentials: true
            })
            toast.success('Logout Successfully');
            Navigate('/admin');
        } catch (error) {
            toast.error(error.message);
        }
    };
    const location = useLocation();

    const isActive = (path) => {
        return location.pathname === path
            ? 'text-[#2A5FCB] bg-gradient-to-r from-[#ACA9FF] via-[rgba(172, 169, 255, 0)] to-[rgba(172, 169, 255, 0)] '
            : '';
    };


    return (
        <>
            <div className={`md:block bg-[#000000] text-[#FFFFFF]  z-30  w-[65%] md:w-[20%] md:relative absolute ${isSidebarVisible ? 'hidden' : 'block absolute'} h-screen`} id="responsiveSideBar" >

                <div className="flex justify-center py-7 text-lg font-semibold border-b border-gray-300">
                    <Link to='/'>
                        Admin
                    </Link>
                </div>
                <div className="pt-5 flex flex-col justify-between relative h-[85vh]">
                    <div className=" mx-auto flex flex-col  text-[#666666]">



                        <div onClick={() => setActive(1)}>
                            <Link to="/dashboard">
                                <div className={`flex gap-2 items-center  py-4 px-5 text-lg font-medium cursor-pointer ${isActive('/dashboard')}`}>
                                    <MdDashboard className="text-[1.7rem]" />
                                    DashBoard
                                </div>
                            </Link>
                        </div>

                        <div onClick={() => setActive(2)}>
                            <Link to="/dashboard/users">
                                <div className={`flex gap-2 items-center  py-4 px-5 text-lg font-medium cursor-pointer ${isActive('/dashboard/users')}`}>
                                    <FaUserCircle className="text-[1.7rem]" />
                                    Users
                                </div>
                            </Link>
                        </div>


                        <div onClick={() => setActive(3)}>
                            <Link to="/dashboard/communities">
                                <div className={`flex gap-2 items-center  py-4 px-5 text-lg font-medium cursor-pointer ${isActive('/dashboard/communities')}`}>
                                    <HiUserGroup className="text-[1.7rem]" />
                                    Communities
                                </div>
                            </Link>
                        </div>


                        {/* <div onClick={() => setActive(4)}>
                            <Link to="/dashboard/issuses">
                                <div className={`flex gap-2 items-center  py-4 px-5 text-lg font-medium cursor-pointer ${isActive('/dashboard/issuses')}`}>
                                    <BsFillPatchQuestionFill className="text-[1.7rem]" />
                                    Issuses
                                </div>
                            </Link>
                        </div> */}



                    </div>



                    <div className="absolute bottom-0 left-6">
                        <div onClick={() => setActive(6)}>
                            <div className=" flex items-center justify-center gap-1" >

                                <div className=" relative">
                                    <img src={profile} alt="" className="w-[50px] h-[50px] " />
                                </div>
                                <div className="profileName px-1 hidden md:flex flex-col items-end text-[#666666]">
                                    {/* <span>{admin.email.split('@')[0]}</span>
                                    <span className="float-right text-[10px]">{admin.role}</span> */}
                                </div>
                                <div className={`flex gap-2 items-center  py-4 px-2  border-[#003443] rounded-tl-2xl rounded-bl-2xl text-lg font-medium cursor-pointer `} onClick={() => logout()}>
                                    <BiLogOut className="text-[1.4rem]" />

                                </div>
                            </div>


                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SideBar;
