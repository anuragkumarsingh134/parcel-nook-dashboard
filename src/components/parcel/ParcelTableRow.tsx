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
      <TableCell className="font-medium max-w-[100px] truncate" title={parcel.lr_no}>
        {parcel.lr_no}
      </TableCell>
      {!isMobile && <TableCell>{parcel.date}</TableCell>}
      <TableCell>{parcel.no_of_parcels}</TableCell>
      {!isMobile && <TableCell className="max-w-[120px] truncate" title={parcel.item_name}>{parcel.item_name}</TableCell>}
      <TableCell>{parcel.quantity}</TableCell>
      <TableCell>
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