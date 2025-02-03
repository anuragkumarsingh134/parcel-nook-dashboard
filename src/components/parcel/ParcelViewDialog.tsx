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
      <DialogContent className="max-w-7xl w-full overflow-hidden max-h-[95vh] bg-gradient-to-b from-background to-background/80 dark:from-gray-900 dark:to-purple-900/20">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500">
            Parcel Details
          </DialogTitle>
        </DialogHeader>
        <div className="grid md:grid-cols-2 gap-6 py-4 h-full overflow-y-auto md:overflow-hidden">
          {/* Left column for text information */}
          <div className="space-y-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <span className="font-medium text-lg">LR No:</span>
              <span className="col-span-3">{parcel.lr_no}</span>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <span className="font-medium text-lg">Date:</span>
              <span className="col-span-3">{parcel.date}</span>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <span className="font-medium text-lg">No of Parcels:</span>
              <span className="col-span-3">{parcel.no_of_parcels}</span>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <span className="font-medium text-lg">Item Name:</span>
              <span className="col-span-3">{parcel.item_name}</span>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <span className="font-medium text-lg">Quantity:</span>
              <span className="col-span-3">{parcel.quantity}</span>
            </div>
          </div>
          
          {/* Right column for images */}
          <div className="space-y-6">
            {parcel.item_photo && (
              <div className="space-y-2">
                <span className="font-medium text-lg block">Item Photo:</span>
                <img
                  src={parcel.item_photo}
                  alt="Item"
                  className="w-full h-[200px] object-contain rounded-lg border border-purple-200 dark:border-purple-800"
                />
              </div>
            )}
            {parcel.parcel_photo && (
              <div className="space-y-2">
                <span className="font-medium text-lg block">Parcel Photo:</span>
                <img
                  src={parcel.parcel_photo}
                  alt="Parcel"
                  className="w-full h-[200px] object-contain rounded-lg border border-purple-200 dark:border-purple-800"
                />
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ParcelViewDialog;