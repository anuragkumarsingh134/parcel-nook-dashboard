import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { supabase } from "@/integrations/supabase/client";
import type { Parcel } from "./ParcelForm";
import { useToast } from "@/hooks/use-toast";
import ParcelTableRow from "./parcel/ParcelTableRow";
import ParcelViewDialog from "./parcel/ParcelViewDialog";

interface ParcelTableProps {
  userRole: string | null;
}

const ParcelTable = ({ userRole }: ParcelTableProps) => {
  const [parcels, setParcels] = useState<Parcel[]>([]);
  const [selectedParcel, setSelectedParcel] = useState<Parcel | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const { toast } = useToast();

  const isAdmin = userRole === "admin";
  const isEditor = userRole === "editor";
  const canEdit = isAdmin || isEditor;

  useEffect(() => {
    fetchParcels();
  }, []);

  const fetchParcels = async () => {
    try {
      const { data, error } = await supabase
        .from('parcels')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      setParcels(data as Parcel[]);
    } catch (error) {
      console.error('Error fetching parcels:', error);
      toast({
        title: "Error",
        description: "Failed to load parcels",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (parcelId: string) => {
    try {
      const { error } = await supabase
        .from('parcels')
        .delete()
        .eq('id', parcelId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Parcel deleted successfully",
      });
      
      fetchParcels();
    } catch (error) {
      console.error('Error deleting parcel:', error);
      toast({
        title: "Error",
        description: "Failed to delete parcel",
        variant: "destructive",
      });
    }
  };

  const handleView = (parcel: Parcel) => {
    setSelectedParcel(parcel);
    setIsViewDialogOpen(true);
  };

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>LR No</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>No of Parcels</TableHead>
              <TableHead>Item Name</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {parcels.map((parcel) => (
              <ParcelTableRow
                key={parcel.id}
                parcel={parcel}
                isAdmin={isAdmin}
                canEdit={canEdit}
                onView={handleView}
                onDelete={handleDelete}
              />
            ))}
          </TableBody>
        </Table>
      </div>

      <ParcelViewDialog
        parcel={selectedParcel}
        isOpen={isViewDialogOpen}
        onOpenChange={setIsViewDialogOpen}
      />
    </>
  );
};

export default ParcelTable;