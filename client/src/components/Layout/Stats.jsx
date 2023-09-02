import React from 'react'
import { BsPatchCheckFill } from 'react-icons/bs'
import {FaBoxes} from 'react-icons/fa'
import { MdPendingActions } from 'react-icons/md'
import { MdCancel } from 'react-icons/md'
const Stats = () => {
  return (
    <div>
       <div className="bg-white rounded-xl p-2">
                <div className="flex justify-between items-center">
                    <h4 className="text-[#00459E] text-lg font-normal py-1 px-5">Satatistics</h4>
                </div>

                <div className="md:pt-3 pb-2 flex flex-wrap gap-5 md:gap-2 justify-between md:px-12">

                    <div className="flex gap-3 items-center">
                    <div className="bg-[#00459e] rounded-full p-5"><FaBoxes className='text-xl'/></div>

                        <div className="flex flex-col items-center ">
                            <p className="text-[#00459e] text-lg">45</p>
                            <p className="text-gray-400 text-[13px] leading-[13px]">Total <br /> Reports</p>
                        </div>
                    </div>

                    <div className="flex gap-3 items-center">
                        <div className="bg-[#42BA96] rounded-full p-5"><MdPendingActions/></div>
                        <div className="flex flex-col items-center ">
                            <p className="text-[#42BA96]">66</p>
                            <p className="text-gray-400 text-[10px] leading-[13px]">Under <br /> Reviews</p>
                        </div>
                    </div>

                    <div className="flex gap-3 items-center">
                        <div className="bg-[#32CD32] rounded-full p-5"><BsPatchCheckFill/></div>
                        <div className="flex flex-col items-center ">
                            <p className="text-[#32CD32]">35</p>
                            <p className="text-gray-400 text-[10px] leading-[13px]">Resolved <br /> Reports</p>
                        </div>
                    </div>

                 

                    <div className="flex gap-3 items-center">
                        <div className="bg-[#E32828] rounded-full p-5"><MdCancel/></div>
                        <div className="flex flex-col items-center ">
                            <p className="text-[#E32828]">10</p>
                            <p className="text-gray-400 text-[10px] leading-[13px]">not  <br /> Resloved</p>
                        </div>
                    </div> 
                </div>

            </div>
    </div>
  )
}

export default Stats
