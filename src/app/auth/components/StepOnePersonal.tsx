import React, { useState } from "react";
import { Paragraph1 } from "@/common/ui/Text";
// Importing icons needed for the form fields
import { MapPin, Briefcase, UploadCloud, ChevronDown } from "lucide-react";
import { FileUploader } from "@/common/ui/FileUploader";
import { useProfileStore } from "@/store/useProfileStore";
import { PhoneInput } from "./PhoneInput";

// Define props for the component
interface StepOnePersonalProps {
  onNext: () => void; // Function passed down from the flow to advance the step
}

const StepOnePersonal: React.FC<StepOnePersonalProps> = ({ onNext }) => {
  // State for all form fields
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [bvn, setBvn] = useState("");
  const [identificationFiles, setIdentificationFiles] = useState<File[]>([]);
  const setProfile = useProfileStore((s) => s.setProfile);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!phoneNumber || !address || !city || !state || !bvn) {
      alert("Please fill in all required fields.");
      return;
    }

    setProfile({
      phoneNumber,
      bvn,
      address: {
        street: address,
        city,
        state,
        country: "Nigeria",
      },
    });

    onNext();
  };

  const handleUpload = (data: { id: string; url?: string }) => {
    setProfile({
      ninUploadId: data.id,
    });
  };

  return (
    <form onSubmit={handleFormSubmit} className="space-y-6">
      {/* 1. Phone Number Input */}
      <PhoneInput value={phoneNumber} onChange={(val) => setPhoneNumber(val)} />
      {/* 2. Address Input */}
      <div>
        <label htmlFor="address" className="block mb-2">
          <Paragraph1 className="text-sm font-medium text-gray-800">
            Address
          </Paragraph1>
        </label>
        <div className="relative">
          <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            id="address"
            required
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Street address"
            className="w-full p-4 pl-12 border border-gray-300 rounded-lg bg-white text-gray-600 placeholder-gray-400 focus:ring-black focus:border-black"
          />
        </div>
      </div>
      {/* 3. City and State (Side-by-side) */}
      <div className="flex space-x-4">
        {/* City Input */}
        <div className="flex-1">
          <label htmlFor="city" className="block mb-2">
            <Paragraph1 className="text-sm font-medium text-gray-800">
              City
            </Paragraph1>
          </label>
          <div className="relative">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              id="city"
              required
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter City"
              className="w-full p-4 pl-12 border border-gray-300 rounded-lg bg-white text-gray-600 placeholder-gray-400 focus:ring-black focus:border-black"
            />
          </div>
        </div>

        {/* State Dropdown */}
        <div className="flex-1">
          <label htmlFor="state" className="block mb-2">
            <Paragraph1 className="text-sm font-medium text-gray-800">
              State
            </Paragraph1>
          </label>
          <div className="relative">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <select
              id="state"
              required
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="w-full appearance-none p-4 pl-12 pr-10 border border-gray-300 rounded-lg bg-white text-gray-600 focus:ring-black focus:border-black"
            >
              <option value="" disabled>
                Select State
              </option>
              {/* Example options */}
              <option value="Lagos">Lagos</option>
              <option value="Abuja">Abuja FCT</option>
              <option value="Rivers">Rivers</option>
            </select>
            {/* Custom chevron icon to override default select appearance */}
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>
      {/* 4. BVN Input */}
      <div>
        <label htmlFor="bvn" className="block mb-2">
          <Paragraph1 className="text-sm font-medium text-gray-800">
            BVN
          </Paragraph1>
        </label>
        <div className="relative">
          <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text" // BVN is typically treated as a string/text field
            id="bvn"
            required
            value={bvn}
            onChange={(e) => setBvn(e.target.value)}
            placeholder="Enter your BVN"
            className="w-full p-4 pl-12 border border-gray-300 rounded-lg bg-white text-gray-600 placeholder-gray-400 focus:ring-black focus:border-black"
          />
        </div>
      </div>
      {/* 5. Means of Identification (File Upload) */}
      <div>
        <label className="block mb-2">
          <Paragraph1 className="text-sm font-medium text-gray-800">
            Means of Identification
          </Paragraph1>
        </label>
        <FileUploader
          helperText="International Passport, NIN, Driver's License"
          onUploaded={handleUpload}
        />

        {/* Display uploaded files */}
        {identificationFiles.length > 0 && (
          <div className="mt-2 text-sm text-gray-600">
            <Paragraph1>
              Files selected:{" "}
              {identificationFiles.map((f) => f.name).join(", ")}
            </Paragraph1>
          </div>
        )}
      </div>
      {/* Next Button */}
      <button
        type="submit"
        className="w-full py-3 text-base font-semibold text-white bg-black rounded-lg hover:bg-gray-800 transition duration-150 mt-8"
      >
        <Paragraph1>Next</Paragraph1>
      </button>
    </form>
  );
};

export default StepOnePersonal;
