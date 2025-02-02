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
        
        <div className="mt-6 space-y-8 md:space-y-0 md:grid md:grid-cols-2 md:gap-8">
          {/* Basic Information Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-purple-600 dark:text-purple-400 border-b pb-2">
              Basic Information
            </h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-2 items-center">
                <span className="text-muted-foreground">LR No:</span>
                <span className="font-medium text-right">{parcel.lr_no}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 items-center">
                <span className="text-muted-foreground">Date:</span>
                <span className="font-medium text-right">{parcel.date}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 items-center">
                <span className="text-muted-foreground">No of Parcels:</span>
                <span className="font-medium text-right">{parcel.no_of_parcels}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 items-center">
                <span className="text-muted-foreground">Item Name:</span>
                <span className="font-medium text-right">{parcel.item_name}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 items-center">
                <span className="text-muted-foreground">Quantity:</span>
                <span className="font-medium text-right">{parcel.quantity}</span>
              </div>
            </div>
          </div>

          {/* Photos Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-purple-600 dark:text-purple-400 border-b pb-2">
              Photos
            </h3>
            <div className="space-y-6">
              {parcel.item_photo && (
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Item Photo:</p>
                  <div className="relative aspect-video w-full overflow-hidden rounded-lg border bg-muted">
                    <img 
                      src={parcel.item_photo} 
                      alt="Item" 
                      className="object-contain w-full h-full hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </div>
              )}
              {parcel.parcel_photo && (
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Parcel Photo:</p>
                  <div className="relative aspect-video w-full overflow-hidden rounded-lg border bg-muted">
                    <img 
                      src={parcel.parcel_photo} 
                      alt="Parcel" 
                      className="object-contain w-full h-full hover:scale-105 transition-transform duration-300"
                    />
                  </div>
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