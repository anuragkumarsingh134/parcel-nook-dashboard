import ParcelForm from "@/components/ParcelForm";

const AddParcel = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Add New Parcel</h1>
      <ParcelForm />
    </div>
  );
};

export default AddParcel;