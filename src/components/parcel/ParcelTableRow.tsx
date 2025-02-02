import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { Edit, Eye, Trash } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Parcel } from "@/components/ParcelForm";

interface ParcelTableRowProps {
  parcel: Parcel;
  isAdmin: boolean;
  canEdit: boolean;
  onView: (parcel: Parcel) => void;
  onDelete: (id: string) => void;
  isMobile: boolean;
}

const ParcelTableRow = ({
  parcel,
  isAdmin,
  canEdit,
  onView,
  onDelete,
  isMobile,
}: ParcelTableRowProps) => {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/edit-parcel/${parcel.id}`);
  };

  return (
    <>
      <TableRow>
        <TableCell className="font-medium">{parcel.lr_no}</TableCell>
        <TableCell className="text-left whitespace-nowrap">{parcel.date}</TableCell>
        <TableCell className="text-center">{parcel.no_of_parcels}</TableCell>
        {!isMobile && (
          <TableCell className="text-right">
            <div className="flex items-center gap-2 justify-end">
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
                  onClick={handleEdit}
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
        )}
      </TableRow>
      {isMobile && (
        <TableRow className="border-0">
          <TableCell colSpan={4} className="py-0 pt-0">
            <div className="flex items-center gap-2 justify-end pb-4">
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
                  onClick={handleEdit}
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
      )}
    </>
  );
};

export default ParcelTableRow;