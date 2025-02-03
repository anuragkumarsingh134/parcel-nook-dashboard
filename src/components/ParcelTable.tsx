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
  const [userProfiles, setUserProfiles] = useState<Record<string, string>>({});
  const [selectedParcel, setSelectedParcel] = useState<Parcel | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
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

      setParcels(parcelsData || []);

      // Fetch user profiles for all unique user IDs
      const userIds = [...new Set(parcelsData?.map(p => p.user_id) || [])];
      const { data: profiles, error: profilesError } = await supabase
        .from("profiles")
        .select("id, name")
        .in("id", userIds);

      if (profilesError) throw profilesError;

      const userProfileMap = (profiles || []).reduce((acc: Record<string, string>, profile: UserProfile) => {
        acc[profile.id] = profile.name;
        return acc;
      }, {});

      setUserProfiles(userProfileMap);
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
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>LR No</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>No of Parcels</TableHead>
              <TableHead>Added By</TableHead>
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
                onView={(parcel) => setSelectedParcel(parcel)}
                onDelete={handleDelete}
                isMobile={isMobile}
                userName={userProfiles[parcel.user_id]}
              />
            ))}
          </TableBody>
        </Table>
      </div>
      {selectedParcel && (
        <ParcelViewDialog
          parcel={selectedParcel}
          onClose={() => setSelectedParcel(null)}
        />
      )}
    </div>
  );
};

export default ParcelTable;