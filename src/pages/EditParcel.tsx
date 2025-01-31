import { useParams } from "react-router-dom";
import ParcelForm from "@/components/ParcelForm";
import { useEffect, useState } from "react";
import type { Parcel } from "@/components/ParcelForm";

const EditParcel = () => {
  const { id } = useParams();
  const [parcel, setParcel] = useState<Parcel | null>(null);

  useEffect(() => {
    // Load parcels from localStorage and find the one we want to edit
    const parcels = JSON.parse(localStorage.getItem('parcels') || '[]');
    const foundParcel = parcels.find((p: Parcel) => p.id === Number(id));
    if (foundParcel) {
      setParcel(foundParcel);
    }
  }, [id]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Edit Parcel</h1>
      <ParcelForm initialData={parcel} />
    </div>
  );
};

export default EditParcel;