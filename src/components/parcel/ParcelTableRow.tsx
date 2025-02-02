import { TableCell, TableRow } from "@/components/ui/table";
import type { Parcel } from "../ParcelForm";
import ParcelActions from "./ParcelActions";

interface ParcelTableRowProps {
  parcel: Parcel;
  isAdmin: boolean;
  canEdit: boolean;
  onView: (parcel: Parcel) => void;
  onDelete: (parcelId: string) => void;
  isMobile: boolean;
}

const ParcelTableRow = ({ parcel, isAdmin, canEdit, onView, onDelete, isMobile }: ParcelTableRowProps) => {
  return (
    <TableRow className="hover:bg-purple-50/50 dark:hover:bg-purple-900/20 transition-colors">
      <TableCell className="font-medium">{parcel.lr_no}</TableCell>
      {!isMobile && <TableCell>{parcel.date}</TableCell>}
      <TableCell>{parcel.no_of_parcels}</TableCell>
      {!isMobile && <TableCell>{parcel.item_name}</TableCell>}
      <TableCell>{parcel.quantity}</TableCell>
      <TableCell className="text-right">
        <ParcelActions
          parcel={parcel}
          isAdmin={isAdmin}
          canEdit={canEdit}
          onView={onView}
          onDelete={onDelete}
          isMobile={isMobile}
        />
      </TableCell>
    </TableRow>
  );
};

export default ParcelTableRow;