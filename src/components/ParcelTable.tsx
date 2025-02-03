import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/providers/AuthProvider";
import ParcelTableRow from "./parcel/ParcelTableRow";
import ParcelSearch from "./parcel/ParcelSearch";
import ParcelViewDialog from "./parcel/ParcelViewDialog";
import { useIsMobile } from "@/hooks/use-mobile";
import type { Parcel } from "./ParcelForm";

interface UserProfile {
  id: string;
  name: string;
}

interface ParcelTableProps {
  userRole?: string;
}

const ParcelTable = ({ userRole }: ParcelTableProps) => {
  const [parcels, setParcels] = useState<Parcel[]>([]);
  const [selectedParcel, setSelectedParcel] = useState<Parcel | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user } = useAuth();
  const isMobile = useIsMobile();
  const isAdmin = userRole === "admin";
  const canEdit = isAdmin || userRole === "editor";

  useEffect(() => {
    fetchParcels();
  }, [searchTerm]);

  const fetchParcels = async () => {
    try {
      let query = supabase
        .from("parcels")
        .select("*")
        .order("created_at", { ascending: false });

      if (searchTerm) {
        query = query.ilike("lr_no", `%${searchTerm}%`);
      }

      const { data: parcelsData, error } = await query;

      if (error) throw error;

      console.log("Fetched parcels:", parcelsData);
      setParcels(parcelsData || []);
    } catch (error) {
      console.error("Error fetching parcels:", error);
      toast({
        title: "Error",
        description: "Failed to fetch parcels",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (parcelId: string) => {
    try {
      const { error } = await supabase
        .from("parcels")
        .delete()
        .eq("id", parcelId);

      if (error) throw error;

      setParcels((prev) => prev.filter((parcel) => parcel.id !== parcelId));
      toast({
        title: "Success",
        description: "Parcel deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting parcel:", error);
      toast({
        title: "Error",
        description: "Failed to delete parcel",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-4">
      <ParcelSearch onSearch={setSearchTerm} />
      <div className="rounded-md border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-purple-50/50 dark:bg-purple-900/20">
              <TableHead className="w-[200px] font-semibold text-purple-900 dark:text-purple-100">
                LR No
              </TableHead>
              <TableHead className="w-[150px] font-semibold text-purple-900 dark:text-purple-100 text-left">
                Date
              </TableHead>
              <TableHead className="w-[150px] font-semibold text-purple-900 dark:text-purple-100 text-center">
                No of Parcels
              </TableHead>
              {!isMobile && (
                <TableHead className="w-[120px] text-right font-semibold text-purple-900 dark:text-purple-100">
                  Actions
                </TableHead>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {parcels.map((parcel) => (
              <ParcelTableRow
                key={parcel.id}
                parcel={parcel}
                isAdmin={isAdmin}
                canEdit={canEdit}
                onView={(parcel) => {
                  setSelectedParcel(parcel);
                  setIsDialogOpen(true);
                }}
                onDelete={handleDelete}
                isMobile={isMobile}
              />
            ))}
          </TableBody>
        </Table>
      </div>
      {selectedParcel && (
        <ParcelViewDialog
          parcel={selectedParcel}
          isOpen={isDialogOpen}
          onOpenChange={setIsDialogOpen}
        />
      )}
    </div>
  );
};

export default ParcelTable;