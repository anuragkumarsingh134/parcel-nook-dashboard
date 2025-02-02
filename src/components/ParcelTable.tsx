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
import ParcelSearch from "./parcel/ParcelSearch";
import { useIsMobile } from "@/hooks/use-mobile";

interface ParcelTableProps {
  userRole: string | null;
}

const ParcelTable = ({ userRole }: ParcelTableProps) => {
  const [parcels, setParcels] = useState<Parcel[]>([]);
  const [selectedParcel, setSelectedParcel] = useState<Parcel | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const { toast } = useToast();
  const isMobile = useIsMobile();

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
      <div className="mb-4">
        <ParcelSearch parcels={parcels} onSelect={handleView} />
      </div>
      <div className="w-full rounded-lg border border-purple-100 dark:border-purple-800 transition-all duration-300 hover:border-purple-200 dark:hover:border-purple-700">
        <div className="overflow-x-auto min-w-full">
          <Table>
            <TableHeader>
              <TableRow className="bg-purple-50 dark:bg-purple-900/20">
                <TableHead className="font-semibold min-w-[100px]">LR No</TableHead>
                <TableHead className="font-semibold min-w-[100px]">Date</TableHead>
                <TableHead className="font-semibold min-w-[120px]">No of Parcels</TableHead>
                <TableHead className="font-semibold text-right min-w-[100px]">Actions</TableHead>
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
                  isMobile={isMobile}
                />
              ))}
            </TableBody>
          </Table>
        </div>
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