import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ParcelForm from "@/components/ParcelForm";
import type { Parcel } from "@/components/ParcelForm";
import { supabase } from "@/integrations/supabase/client";

const EditParcel = () => {
  const { id } = useParams();
  const [parcel, setParcel] = useState<Parcel | null>(null);

  useEffect(() => {
    const fetchParcel = async () => {
      if (!id) return;

      const { data, error } = await supabase
        .from('parcels')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching parcel:', error);
        return;
      }

      setParcel(data as Parcel);
    };

    fetchParcel();
  }, [id]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Edit Parcel</h1>
      <ParcelForm initialData={parcel} />
    </div>
  );
};

export default EditParcel;