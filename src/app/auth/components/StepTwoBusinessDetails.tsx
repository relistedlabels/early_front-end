"use client";

import React, { useState, useEffect } from "react";
import { Paragraph1 } from "@/common/ui/Text";
import { User, Mail, Hash, MapPin } from "lucide-react";
import { useProfileStore } from "@/store/useProfileStore";
import { CityLGASelect } from "./CityLGASelect";
import { StateSelect } from "./StateSelect";
import { useCreateProfile } from "@/lib/queries/user/useCreateProfile";
import { useRouter } from "next/navigation";

interface StepTwoBusinessDetailsProps {
  onNext: () => void;
  onBack: () => void;
}

const StepTwoBusinessDetails: React.FC<StepTwoBusinessDetailsProps> = ({
  onNext,
  onBack,
}) => {
  const businessInfo = useProfileStore((s) => s.businessInfo);
  const setProfile = useProfileStore((s) => s.setProfile);
  const createProfile = useCreateProfile();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  // UI state hydrated from store
  const [businessName, setBusinessName] = useState(businessInfo.businessName);
  const [businessEmail, setBusinessEmail] = useState(
    businessInfo.businessEmail,
  );
  const [registrationNumber, setRegistrationNumber] = useState(
    businessInfo.businessRegistrationNumber,
  );
  const [address, setAddress] = useState(businessInfo.businessAddress);
  const [city, setCity] = useState(businessInfo.businessCity);
  const [state, setState] = useState(businessInfo.businessState);

  /**
   * 🔁 Re-sync after persist hydration
   */
  useEffect(() => {
    setBusinessName(businessInfo.businessName || "");
    setBusinessEmail(businessInfo.businessEmail || "");
    setRegistrationNumber(businessInfo.businessRegistrationNumber || "");
    setAddress(businessInfo.businessAddress || "");
    setCity(businessInfo.businessCity || "");
    setState(businessInfo.businessState || "");
  }, [
    businessInfo.businessName,
    businessInfo.businessEmail,
    businessInfo.businessRegistrationNumber,
    businessInfo.businessAddress,
    businessInfo.businessCity,
    businessInfo.businessState,
  ]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Update store first
    setProfile({
      businessInfo: {
        businessName,
        businessEmail,
        businessRegistrationNumber: registrationNumber,
        businessAddress: address,
        businessCity: city,
        businessState: state,
      },
    });

    // Use setTimeout to ensure store is updated before mutation reads it
    setTimeout(() => {
      createProfile.mutate(undefined, {
        onSuccess: () => {
          router.push("/listers/inventory");
        },
        onError: (err) => {
          setError((err as Error).message || "Failed to create profile");
        },
      });
    }, 0);
  };

  return (
    <form onSubmit={handleFormSubmit} className="space-y-6">
      <div>
        <label className="block mb-2">
          <Paragraph1 className="text-sm font-medium text-gray-800">
            Business / Brand Name
          </Paragraph1>
        </label>
        <div className="relative">
          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            className="w-full p-4 pl-12 border rounded-lg"
          />
        </div>
      </div>

      <div>
        <label className="block mb-2">
          <Paragraph1 className="text-sm font-medium text-gray-800">
            Business Email (Optional)
          </Paragraph1>
        </label>
        <div className="relative">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            value={businessEmail}
            onChange={(e) => setBusinessEmail(e.target.value)}
            className="w-full p-4 pl-12 border rounded-lg"
          />
        </div>
      </div>

      <div>
        <label className="block mb-2">
          <Paragraph1 className="text-sm font-medium text-gray-800">
            Business Registration Number
          </Paragraph1>
        </label>
        <div className="relative">
          <Hash className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            value={registrationNumber}
            onChange={(e) => setRegistrationNumber(e.target.value)}
            className="w-full p-4 pl-12 border rounded-lg"
          />
        </div>
      </div>

      <div>
        <label className="block mb-2">
          <Paragraph1 className="text-sm font-medium text-gray-800">
            Business Address
          </Paragraph1>
        </label>
        <div className="relative">
          <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full p-4 pl-12 border rounded-lg"
          />
        </div>
      </div>

      <div className="flex gap-4">
        <CityLGASelect value={city} onChange={setCity} />
        <StateSelect value={state} onChange={setState} />
      </div>

      {error && (
        <Paragraph1 className="text-sm text-red-600 text-center">
          {error}
        </Paragraph1>
      )}

      <div className="flex gap-4 pt-4">
        <button
          type="button"
          onClick={onBack}
          disabled={createProfile.isPending}
          className="w-1/2 py-3 border rounded-lg disabled:opacity-50"
        >
          <Paragraph1>Previous</Paragraph1>
        </button>

        <button
          type="submit"
          disabled={createProfile.isPending}
          className="w-1/2 py-3 bg-black text-white rounded-lg disabled:opacity-50"
        >
          <Paragraph1>{createProfile.isPending ? "Saving..." : "Complete"}</Paragraph1>
        </button>
      </div>
    </form>
  );
};

export default StepTwoBusinessDetails;
