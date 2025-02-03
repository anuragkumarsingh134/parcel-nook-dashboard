import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { Edit, Eye, Trash } from "lucide-react";
import { Parcel } from "@/components/ParcelForm";

interface ParcelTableRowProps {
  parcel: Parcel;
  isAdmin: boolean;
  canEdit: boolean;
  onView: (parcel: Parcel) => void;
  onDelete: (id: string) => void;
  isMobile: boolean;
  userName?: string;
}

const ParcelTableRow = ({
  parcel,
  isAdmin,
  canEdit,
  onView,
  onDelete,
  isMobile,
  userName,
}: ParcelTableRowProps) => {
  return (
    <TableRow>
      <TableCell className="font-medium">{parcel.lr_no}</TableCell>
      {!isMobile && (
        <>
          <TableCell>{parcel.date}</TableCell>
          <TableCell>{parcel.no_of_parcels}</TableCell>
          <TableCell>{userName}</TableCell>
        </>
      )}
      <TableCell>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onView(parcel)}
            className="h-8 w-8"
          >
            <Eye className="h-4 w-4" />
          </Button>
          {canEdit && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => window.location.href = `/edit-parcel/${parcel.id}`}
              className="h-8 w-8"
            >
              <Edit className="h-4 w-4" />
            </Button>
          )}
          {isAdmin && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDelete(parcel.id)}
              className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
            >
              <Trash className="h-4 w-4" />
            </Button>
          )}
        </div>
      </TableCell>
    </TableRow>
  );
};

export default ParcelTableRow;