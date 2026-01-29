import React from "react";
// Assuming Paragraph components are available
import { Paragraph1, Paragraph3 } from "@/common/ui/Text";

// --- Item Data Structure ---
interface RentalItem {
  name: string;
  rentalsCount: number;
  price: string;
  isAvailable: boolean;
  imageUrl: string; // Placeholder for the actual image path
}

// Data matching the provided image
const topRentalsData: RentalItem[] = [
  {
    name: "FENDI ARCO BOOTS",
    rentalsCount: 20,
    price: "₦550,000",
    isAvailable: true,
    imageUrl: "/products/p1.jpg", // Placeholder path
  },
  {
    name: "FENDI ARCO BOOTS",
    rentalsCount: 20,
    price: "₦550,000",
    isAvailable: false,
    imageUrl: "/products/p1.jpg", // Placeholder path
  },
  {
    name: "FENDI ARCO BOOTS",
    rentalsCount: 20,
    price: "₦550,000",
    isAvailable: true,
    imageUrl: "/products/p1.jpg", // Placeholder path
  },
];

// --- Individual Item Card ---
const RentalListItem: React.FC<RentalItem> = ({
  name,
  rentalsCount,
  price,
  isAvailable,
  imageUrl,
}) => {
  const statusText = isAvailable ? "Available" : "Unavailable";
  const statusColor = isAvailable ? "text-green-600" : "text-orange-500";
  const dotClass = isAvailable ? "bg-green-600" : "bg-orange-500";

  return (
    <div className="flex items-center space-x-3 p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition duration-150">
      {/* Image Placeholder */}
      <div className="w-16 h-16 bg-gray-200 rounded-lg shrink-0 overflow-hidden">
        {/* In a real app, use <img src={imageUrl} alt={name} className="w-full h-full object-cover" /> */}
        <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
      </div>

      {/* Details */}
      <div className="flex-1 min-w-0">
        <Paragraph1 className="font-semibold text-gray-800 truncate">
          {name}
        </Paragraph1>
        <Paragraph1 className="text-sm text-gray-500">
          {rentalsCount} Rentals
        </Paragraph1>
      </div>

      {/* Status and Price */}
      <div className="text-right shrink-0">
        <div className="flex items-center justify-end space-x-1 mb-1">
          <span className={`w-1.5 h-1.5 rounded-full ${dotClass}`}></span>
          <Paragraph1 className={`text-xs font-medium ${statusColor}`}>
            {statusText}
          </Paragraph1>
        </div>
        <Paragraph1 className="text-base font-semibold text-black">
          {price}
        </Paragraph1>
      </div>
    </div>
  );
};

// --- Main Component ---
const TopRentalsList: React.FC = () => {
  return (
    <div className="bg-white sm:col-span-2 p-6 rounded-xl  border border-gray-300 w-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <Paragraph3 className="text-xl font-semibold text-black">
          Top Rentals
        </Paragraph3>
        <button
          type="button"
          className="px-3 py-1 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition duration-150"
        >
          See Inventory
        </button>
      </div>

      {/* List of Rental Items */}
      <div className="space-y-4">
        {topRentalsData.map((item, index) => (
          <RentalListItem key={index} {...item} />
        ))}
      </div>
    </div>
  );
};

export default TopRentalsList;
