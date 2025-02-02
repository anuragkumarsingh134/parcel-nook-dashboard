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
      <DialogContent className="max-w-3xl bg-gradient-to-b from-white to-purple-50 dark:from-gray-900 dark:to-purple-900/20">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500">
            Parcel Details
          </DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-purple-700 dark:text-purple-300">Basic Information</h3>
            <div className="space-y-3">
              <p className="flex justify-between items-center py-2 border-b border-purple-100 dark:border-purple-800">
                <span className="font-medium text-gray-600 dark:text-gray-400">LR No:</span>
                <span className="text-gray-900 dark:text-gray-200">{parcel.lr_no}</span>
              </p>
              <p className="flex justify-between items-center py-2 border-b border-purple-100 dark:border-purple-800">
                <span className="font-medium text-gray-600 dark:text-gray-400">Date:</span>
                <span className="text-gray-900 dark:text-gray-200">{parcel.date}</span>
              </p>
              <p className="flex justify-between items-center py-2 border-b border-purple-100 dark:border-purple-800">
                <span className="font-medium text-gray-600 dark:text-gray-400">No of Parcels:</span>
                <span className="text-gray-900 dark:text-gray-200">{parcel.no_of_parcels}</span>
              </p>
              <p className="flex justify-between items-center py-2 border-b border-purple-100 dark:border-purple-800">
                <span className="font-medium text-gray-600 dark:text-gray-400">Item Name:</span>
                <span className="text-gray-900 dark:text-gray-200">{parcel.item_name}</span>
              </p>
              <p className="flex justify-between items-center py-2 border-b border-purple-100 dark:border-purple-800">
                <span className="font-medium text-gray-600 dark:text-gray-400">Quantity:</span>
                <span className="text-gray-900 dark:text-gray-200">{parcel.quantity}</span>
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-purple-700 dark:text-purple-300">Photos</h3>
            <div className="space-y-6">
              {parcel.item_photo && (
                <div className="space-y-2">
                  <p className="font-medium text-gray-600 dark:text-gray-400">Item Photo:</p>
                  <img 
                    src={parcel.item_photo} 
                    alt="Item" 
                    className="w-full max-w-[200px] h-auto rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                  />
                </div>
              )}
              {parcel.parcel_photo && (
                <div className="space-y-2">
                  <p className="font-medium text-gray-600 dark:text-gray-400">Parcel Photo:</p>
                  <img 
                    src={parcel.parcel_photo} 
                    alt="Parcel" 
                    className="w-full max-w-[200px] h-auto rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
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