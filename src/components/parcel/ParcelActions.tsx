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
}

const ParcelActions = ({ parcel, isAdmin, canEdit, onView, onDelete }: ParcelActionsProps) => {
  return (
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
        onClick={() => onView(parcel)}
      >
        <Eye className="h-4 w-4" />
      </Button>
      {isAdmin && (
        <Button
          variant="outline"
          size="icon"
          onClick={() => onDelete(parcel.id)}
          className="text-red-500 hover:text-red-700"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
};

export default ParcelActions;