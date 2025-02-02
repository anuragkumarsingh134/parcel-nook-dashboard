import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Parcel } from "../ParcelForm";

interface ParcelViewDialogProps {
  parcel: Parcel | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const ParcelViewDialog = ({ parcel, isOpen, onOpenChange }: ParcelViewDialogProps) => {
  if (!parcel) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Parcel Details</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-2">Basic Information</h3>
            <div className="space-y-2">
              <p><span className="font-medium">LR No:</span> {parcel.lr_no}</p>
              <p><span className="font-medium">Date:</span> {parcel.date}</p>
              <p><span className="font-medium">No of Parcels:</span> {parcel.no_of_parcels}</p>
              <p><span className="font-medium">Item Name:</span> {parcel.item_name}</p>
              <p><span className="font-medium">Quantity:</span> {parcel.quantity}</p>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Photos</h3>
            <div className="space-y-4">
              {parcel.item_photo && (
                <div>
                  <p className="font-medium mb-1">Item Photo:</p>
                  <img 
                    src={parcel.item_photo} 
                    alt="Item" 
                    className="w-full max-w-[200px] h-auto rounded-lg"
                  />
                </div>
              )}
              {parcel.parcel_photo && (
                <div>
                  <p className="font-medium mb-1">Parcel Photo:</p>
                  <img 
                    src={parcel.parcel_photo} 
                    alt="Parcel" 
                    className="w-full max-w-[200px] h-auto rounded-lg"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ParcelViewDialog;