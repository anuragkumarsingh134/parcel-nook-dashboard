import { TableCell, TableRow } from "@/components/ui/table";
import type { Parcel } from "../ParcelForm";
import ParcelActions from "./ParcelActions";

interface ParcelTableRowProps {
  parcel: Parcel;
  isAdmin: boolean;
  canEdit: boolean;
  onView: (parcel: Parcel) => void;
  onDelete: (parcelId: string) => void;
}

const ParcelTableRow = ({ parcel, isAdmin, canEdit, onView, onDelete }: ParcelTableRowProps) => {
  return (
    <TableRow>
      <TableCell>{parcel.lr_no}</TableCell>
      <TableCell>{parcel.date}</TableCell>
      <TableCell>{parcel.no_of_parcels}</TableCell>
      <TableCell>{parcel.item_name}</TableCell>
      <TableCell>{parcel.quantity}</TableCell>
      <TableCell>
        <ParcelActions
          parcel={parcel}
          isAdmin={isAdmin}
          canEdit={canEdit}
          onView={onView}
          onDelete={onDelete}
        />
      </TableCell>
    </TableRow>
  );
};

export default ParcelTableRow;