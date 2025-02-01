import { useState } from "react";
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
import type { Parcel } from "./ParcelForm";

interface ParcelTableProps {
  userRole: string | null;
}

const ParcelTable = ({ userRole }: ParcelTableProps) => {
  const [parcels, setParcels] = useState<Parcel[]>([]);
  const [selectedParcel, setSelectedParcel] = useState<Parcel | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

  const isAdmin = userRole === "admin";
  const isEditor = userRole === "editor";
  const canEdit = isAdmin || isEditor;

  // Load parcels from localStorage when component mounts
  useState(() => {
    const storedParcels = JSON.parse(localStorage.getItem('parcels') || '[]');
    setParcels(storedParcels);
  });

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
                <TableCell>{parcel.lrNo}</TableCell>
                <TableCell>{parcel.date}</TableCell>
                <TableCell>{parcel.noOfParcels}</TableCell>
                <TableCell>{parcel.itemName}</TableCell>
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
                  <p><span className="font-medium">LR No:</span> {selectedParcel.lrNo}</p>
                  <p><span className="font-medium">Date:</span> {selectedParcel.date}</p>
                  <p><span className="font-medium">No of Parcels:</span> {selectedParcel.noOfParcels}</p>
                  <p><span className="font-medium">Item Name:</span> {selectedParcel.itemName}</p>
                  <p><span className="font-medium">Quantity:</span> {selectedParcel.quantity}</p>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Photos</h3>
                <div className="space-y-4">
                  {selectedParcel.itemPhoto && (
                    <div>
                      <p className="font-medium mb-1">Item Photo:</p>
                      <img 
                        src={selectedParcel.itemPhoto} 
                        alt="Item" 
                        className="w-full max-w-[200px] h-auto rounded-lg"
                      />
                    </div>
                  )}
                  {selectedParcel.parcelPhoto && (
                    <div>
                      <p className="font-medium mb-1">Parcel Photo:</p>
                      <img 
                        src={selectedParcel.parcelPhoto} 
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