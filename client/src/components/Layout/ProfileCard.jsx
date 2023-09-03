import React from 'react';
import profile from '../../Assets/download (1).png';
import { IoMdMail } from 'react-icons/io';
import { AiFillPhone } from 'react-icons/ai';
import { backend_url } from '../../server';

const ProfileCard = ({ user }) => {
    // const [user, setUser] = useState(null);
  console.log(user)
   
  return (
    <div>
      <div className="w-full">
        {/* User */}
        <div className="flex flex-col items-center gap-4 justify-center py-10 border-b border-gray-200">
          <img  src={user ? `${backend_url}${user.user.profileImage}` : profile} alt="" className="w-[70px] h-[70px] rounded-full" />
          <h1 className="text-lg font-medium text-white">{user.user?.username}</h1>
          <h1 className="text-md font-normal text-white">{user.user?.email}</h1>
        </div>

        <div className="px-3 flex flex-col gap-3">
          <h1 className="text-lg font-semibold text-white pt-3 pb-2">Contact info</h1>
          <div className="flex gap-3 items-center !border-b-[0.5px] border-gray-100 py-2">
            <IoMdMail className="text-gray-400" />
            <p className="text-white">{user.user?.email || 'email@gmail.com'}</p>
          </div>
          <div className="flex gap-3 items-center !border-b-[0.5px] border-gray-100 py-2">
            <AiFillPhone className="text-gray-400" />
            <p className="text-white">{user.user?.phoneNumber || '923000000'}</p>
          </div>
        </div>

        <div className="">
          <h1 className="text-lg font-semibold text-white pt-3 pb-2">Bio</h1>
          <p className="text-sm">{user.user?.bio || 'No bio available'}</p>
        </div>

        <div className="flex justify-between items-center">
          <h1 className="text-lg font-semibold text-white pt-3 pb-2">Master Card</h1>
          <p className="text-sm">{user.user?.masterCard || 'No card information'}</p>
        </div>

        <div className="">
          <h1 className="text-lg font-semibold text-white pt-3 pb-2">Wallet Address</h1>
          <p className="text-sm">{user.user?.walletAddress || 'No wallet address'}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
