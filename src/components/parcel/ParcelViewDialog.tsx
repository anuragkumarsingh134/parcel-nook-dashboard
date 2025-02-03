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
      <DialogContent className="max-w-3xl overflow-y-auto max-h-[90vh] bg-gradient-to-b from-background to-background/80 dark:from-gray-900 dark:to-purple-900/20">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500">
            Parcel Details
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid md:grid-cols-1 grid-cols-4 items-center gap-4">
            <span className="font-medium md:text-lg">LR No:</span>
            <span className="col-span-3 md:col-span-1">{parcel.lr_no}</span>
          </div>
          <div className="grid md:grid-cols-1 grid-cols-4 items-center gap-4">
            <span className="font-medium md:text-lg">Date:</span>
            <span className="col-span-3 md:col-span-1">{parcel.date}</span>
          </div>
          <div className="grid md:grid-cols-1 grid-cols-4 items-center gap-4">
            <span className="font-medium md:text-lg">No of Parcels:</span>
            <span className="col-span-3 md:col-span-1">{parcel.no_of_parcels}</span>
          </div>
          <div className="grid md:grid-cols-1 grid-cols-4 items-center gap-4">
            <span className="font-medium md:text-lg">Item Name:</span>
            <span className="col-span-3 md:col-span-1">{parcel.item_name}</span>
          </div>
          <div className="grid md:grid-cols-1 grid-cols-4 items-center gap-4">
            <span className="font-medium md:text-lg">Quantity:</span>
            <span className="col-span-3 md:col-span-1">{parcel.quantity}</span>
          </div>
          {parcel.item_photo && (
            <div className="grid md:grid-cols-1 grid-cols-4 items-center gap-4">
              <span className="font-medium md:text-lg">Item Photo:</span>
              <img
                src={parcel.item_photo}
                alt="Item"
                className="col-span-3 md:col-span-1 rounded-lg border border-purple-200 dark:border-purple-800"
              />
            </div>
          )}
          {parcel.parcel_photo && (
            <div className="grid md:grid-cols-1 grid-cols-4 items-center gap-4">
              <span className="font-medium md:text-lg">Parcel Photo:</span>
              <img
                src={parcel.parcel_photo}
                alt="Parcel"
                className="col-span-3 md:col-span-1 rounded-lg border border-purple-200 dark:border-purple-800"
              />
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ParcelViewDialog;