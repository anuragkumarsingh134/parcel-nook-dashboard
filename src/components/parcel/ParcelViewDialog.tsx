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
        <div className="grid md:grid-cols-2 gap-4 p-2">
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
          <div className="grid grid-rows-2 gap-4">
            {parcel.item_photo && (
              <div>
                <span className="font-medium text-lg mb-2 block">Item Photo:</span>
                <div className="flex items-center justify-center h-[35vh] bg-gray-50/30 dark:bg-gray-800/30">
                  <img
                    src={parcel.item_photo}
                    alt="Item"
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
              </div>
            )}
            {parcel.parcel_photo && (
              <div>
                <span className="font-medium text-lg mb-2 block">Parcel Photo:</span>
                <div className="flex items-center justify-center h-[35vh] bg-gray-50/30 dark:bg-gray-800/30">
                  <img
                    src={parcel.parcel_photo}
                    alt="Parcel"
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ParcelViewDialog;