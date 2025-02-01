import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import type { Parcel } from "./ParcelForm";
import { useToast } from "@/components/ui/use-toast";

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

      // Transform the data to match our frontend Parcel type
      const transformedData: Parcel[] = data.map(parcel => ({
        id: parcel.id,
        lr_no: parcel.lr_no,
        date: parcel.date,
        no_of_parcels: parcel.no_of_parcels,
        item_name: parcel.item_name,
        quantity: parcel.quantity,
        item_photo: parcel.item_photo,
        parcel_photo: parcel.parcel_photo,
        user_id: parcel.user_id,
        created_at: parcel.created_at,
        updated_at: parcel.updated_at
      }));

      setParcels(transformedData);
    } catch (error) {
      console.error('Error fetching parcels:', error);
      toast({
        title: "Error",
        description: "Failed to load parcels",
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
              <TableRow key={parcel.id}>
                <TableCell>{parcel.lr_no}</TableCell>
                <TableCell>{parcel.date}</TableCell>
                <TableCell>{parcel.no_of_parcels}</TableCell>
                <TableCell>{parcel.item_name}</TableCell>
                <TableCell>{parcel.quantity}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    {canEdit && (
                      <Link to={`/edit-parcel/${parcel.id}`}>
                        <Button variant="outline" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </Link>
                    )}
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => handleView(parcel)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Parcel Details</DialogTitle>
          </DialogHeader>
          {selectedParcel && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">Basic Information</h3>
                <div className="space-y-2">
                  <p><span className="font-medium">LR No:</span> {selectedParcel.lr_no}</p>
                  <p><span className="font-medium">Date:</span> {selectedParcel.date}</p>
                  <p><span className="font-medium">No of Parcels:</span> {selectedParcel.no_of_parcels}</p>
                  <p><span className="font-medium">Item Name:</span> {selectedParcel.item_name}</p>
                  <p><span className="font-medium">Quantity:</span> {selectedParcel.quantity}</p>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Photos</h3>
                <div className="space-y-4">
                  {selectedParcel.item_photo && (
                    <div>
                      <p className="font-medium mb-1">Item Photo:</p>
                      <img 
                        src={selectedParcel.item_photo} 
                        alt="Item" 
                        className="w-full max-w-[200px] h-auto rounded-lg"
                      />
                    </div>
                  )}
                  {selectedParcel.parcel_photo && (
                    <div>
                      <p className="font-medium mb-1">Parcel Photo:</p>
                      <img 
                        src={selectedParcel.parcel_photo} 
                        alt="Parcel" 
                        className="w-full max-w-[200px] h-auto rounded-lg"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ParcelTable;