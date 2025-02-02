import { Button } from "@/components/ui/button";
import { Edit, Eye, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import type { Parcel } from "../ParcelForm";

interface ParcelActionsProps {
  parcel: Parcel;
  isAdmin: boolean;
  canEdit: boolean;
  onView: (parcel: Parcel) => void;
  onDelete: (parcelId: string) => void;
  isMobile: boolean;
}

const ParcelActions = ({ parcel, isAdmin, canEdit, onView, onDelete, isMobile }: ParcelActionsProps) => {
  return (
    <div className="flex gap-2 justify-end">
      {canEdit && (
        <Link to={`/edit-parcel/${parcel.id}`}>
          <Button 
            variant="outline" 
            size="icon"
            className="bg-blue-50 border-blue-200 hover:bg-blue-100 hover:border-blue-300 dark:bg-blue-900/20 dark:border-blue-800 dark:hover:bg-blue-900/40 dark:hover:border-blue-700"
          >
            <Edit className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          </Button>
        </Link>
      )}
      <Button 
        variant="outline" 
        size="icon"
        onClick={() => onView(parcel)}
        className="bg-purple-50 border-purple-200 hover:bg-purple-100 hover:border-purple-300 dark:bg-purple-900/20 dark:border-purple-800 dark:hover:bg-purple-900/40 dark:hover:border-purple-700"
      >
        <Eye className="h-4 w-4 text-purple-600 dark:text-purple-400" />
      </Button>
      {isAdmin && (
        <Button
          variant="outline"
          size="icon"
          onClick={() => onDelete(parcel.id)}
          className="bg-red-50 border-red-200 hover:bg-red-100 hover:border-red-300 dark:bg-red-900/20 dark:border-red-800 dark:hover:bg-red-900/40 dark:hover:border-red-700"
        >
          <Trash2 className="h-4 w-4 text-red-600 dark:text-red-400" />
        </Button>
      )}
    </div>
  );
};

export default ParcelActions;