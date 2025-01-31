import { useParams } from "react-router-dom";
import ParcelForm from "@/components/ParcelForm";

const EditParcel = () => {
  const { id } = useParams();
  
  // Mock data for initial development
  const mockParcel = {
    id: 1,
    lrNo: "LR001",
    date: "2024-03-20",
    noOfParcels: 3,
    itemName: "Electronics",
    quantity: 10,
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Edit Parcel</h1>
      <ParcelForm initialData={mockParcel} />
    </div>
  );
};

export default EditParcel;