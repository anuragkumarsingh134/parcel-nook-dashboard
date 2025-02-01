import { useParams } from "react-router-dom";
import ParcelForm from "@/components/ParcelForm";
import { useEffect, useState } from "react";
import type { Parcel } from "@/components/ParcelForm";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

const EditParcel = () => {
  const { id } = useParams();
  const [parcel, setParcel] = useState<Parcel | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchParcel = async () => {
      if (!id) return;

      try {
        const { data, error } = await supabase
          .from('parcels')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;
        if (data) setParcel(data as Parcel);
      } catch (error) {
        console.error('Error fetching parcel:', error);
        toast({
          title: "Error",
          description: "Failed to load parcel details",
          variant: "destructive",
        });
      }
    };

    fetchParcel();
  }, [id, toast]);

  if (!parcel) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Edit Parcel</h1>
      <ParcelForm initialData={parcel} />
    </div>
  );
};

export default EditParcel;