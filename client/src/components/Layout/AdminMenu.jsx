import React, { useState } from 'react'
// import profile from '../../Assets/download.jpg'
// import { useSelector } from "react-redux";
import { CgMenuLeft } from 'react-icons/cg'
// import {  useNavigate } from 'react-router-dom'
// import { toast } from 'react-toastify'
// import axios from '../../services'
// import { server } from '../../server';

const AdminMenu = ({ onToggleSidebar,  setActive }) => {
    // const { admin } = useSelector((state) => state.admin);
    // eslint-disable-next-line no-unused-vars
    const [open, setOpen] = useState(false)
    // const Navigate = useNavigate()
   

    // const logout = async () => {
    //     try {
    //         await axios.get(`${server}/admin/logout`,{
    //             withCredentials: true
    //         })
    //         toast.success('Logout Successfully');
    //         Navigate('/admin');
    //     } catch (error) {
    //         toast.error(error.message);
    //     }
    // };





    return (
        <>

            <div className="w-full pt-2 md:absolute relative top-0 right-0">
                <div className="flex justify-between items-center py-2 md:px-5 px-2">
                    <div className="item pt-2 ">
                        <div className="p-0 flex gap-2  justify-between md:gap-6 items-center text-[#666666]">
                            <div className="menubtn md:hidden block ">
                                <button className="btn mx-1 border-2 rounded-lg border-gray-500 p-1" onClick={onToggleSidebar}>
                                    <CgMenuLeft className='text-2xl text-gray-500' /></button>
                            </div>

                        </div>
                    </div>
                    {/* <div className=" flex items-center" onClick={onToggleSidebar}>


                        <div className="profileName px-1 hidden md:flex flex-col items-end text-[#666666]">
                            <span>{admin.email.split('@')[0]}</span>
                            <span className="float-right text-[10px]">{admin.role}</span>
                        </div>
                        <div className="rounded-full relative">
                            <img src={profile} alt="" className="w-[50px] h-[50px] rounded-full" onClick={handleButtonClick} />
                            <div className="w-[8px] h-[8px] rounded-full bg-green-600 absolute right-1 bottom-1 animate-bounce"></div>
                        </div>
                    </div> */}

                </div>

                
                {
                    open ? setActive(2) : ""
                }
            </div>


        </>
    )
}

export default AdminMenu