import React from "react";
import { Paragraph1 } from "@/common/ui/Text";
import {
  HiOutlineUser,
  HiOutlinePhone,
  HiOutlineCube,
  HiOutlineHome,
  HiOutlinePencil,
  HiOutlineCamera,
  HiOutlinePlus,
} from "react-icons/hi2";
import { HiOutlineMail } from "react-icons/hi";

const AccountProfileDetails: React.FC = () => {
  return (
    <div className="font-sans ">
      {/* Profile Header and Image Upload */}
      <div className="flex flex-col bg-[#3A3A32] p-6 items-center mb-6">
        <div className="relative w-28 h-28 rounded-full bg-gray-200 flex items-center justify-center  overflow-hidden">
          {/* Placeholder for Profile Picture */}
          <HiOutlineUser className="w-16 h-16 text-gray-500" />

          {/* Upload Button Overlay */}
          <div className="absolute bottom-0 right-0 w-8 h-8 bg-black rounded-full flex items-center justify-center cursor-pointer border-2 border-white">
            <HiOutlineCamera className="w-4 h-4 text-white" />
          </div>
        </div>
        <Paragraph1 className="text-sm text-center mt-4 text-white -600">
          Upload a profile photo <br /> (Max 2MB)
        </Paragraph1>
      </div>

      {/* --- Profile Details Section --- */}
      <Paragraph1 className="text-lg font-bold uppercase text-gray-900 mb-4">
        Profile Details
      </Paragraph1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {/* Full Name */}
        <div>
          <Paragraph1 className="text-sm font-medium text-gray-900 mb-2">
            Full Name
          </Paragraph1>
          <div className="relative">
            <HiOutlineUser className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              defaultValue="Sarah Jessica Parker"
              className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-black focus:border-black transition duration-150"
            />
          </div>
        </div>

        {/* Email Address */}
        <div>
          <Paragraph1 className="text-sm font-medium text-gray-900 mb-2">
            Email Address
          </Paragraph1>
          <div className="relative">
            <HiOutlineMail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="email"
              defaultValue="samathadani@gmail.com"
              className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-black focus:border-black transition duration-150"
            />
          </div>
        </div>

        {/* Phone Number */}
        <div>
          <Paragraph1 className="text-sm font-medium text-gray-900 mb-2">
            Phone Number
          </Paragraph1>
          <div className="relative">
            <HiOutlinePhone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="tel"
              defaultValue="0923848556"
              className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-black focus:border-black transition duration-150"
            />
          </div>
        </div>

        {/* Role */}
        <div>
          <Paragraph1 className="text-sm font-medium text-gray-900 mb-2">
            Role
          </Paragraph1>
          <div className="relative">
            <HiOutlineCube className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            {/* Disabled or read-only input for Role */}
            <input
              type="text"
              defaultValue="Dresser"
              readOnly
              className="w-full p-3 pl-10 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
            />
          </div>
        </div>
      </div>

      {/* --- Address Section --- */}
      <Paragraph1 className="text-lg font-bold text-gray-900 mb-4">
        Address
      </Paragraph1>
      <Paragraph1 className="text-sm font-medium text-gray-900 mb-2">
        Default Address
      </Paragraph1>

      <div className="flex items-center justify-between p-3 border border-gray-300 rounded-lg bg-white mb-6">
        <div className="flex items-center space-x-2">
          <HiOutlineHome className="w-5 h-5 text-gray-500 shrink-0" />
          <Paragraph1 className="text-sm text-gray-700">
            20, Allen Street, Diamond Bay Estate, Lekki Lagos state, Nigeria
          </Paragraph1>
        </div>
        <button className="text-gray-500 hover:text-black transition duration-150 p-1">
          <HiOutlinePencil className="w-4 h-4" />
        </button>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col w-full gap-4 sm:flex-row justify-end space-x-3 pt-4">
        <button className="flex items-center space-x-1 px-4 py-2 text-sm font-semibold text-black border border-gray-300 rounded-lg hover:bg-gray-50 transition duration-150">
          <HiOutlinePlus className="w-4 h-4" />
          <span>Add New Address</span>
        </button>
        <button className="px-6 py-2 text-sm font-semibold text-white bg-black rounded-lg hover:bg-gray-800 transition duration-150">
          Update Profile
        </button>
      </div>
    </div>
  );
};

export default AccountProfileDetails;
