import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import type { Parcel } from "./ParcelForm";

const ParcelTable = () => {
  const [parcels, setParcels] = useState<Parcel[]>([]);

  useEffect(() => {
    // Load parcels from localStorage
    const storedParcels = JSON.parse(localStorage.getItem('parcels') || '[]');
    setParcels(storedParcels);
  }, []);

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>LR No</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>No of Parcels</TableHead>
            <TableHead>Item Name</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {parcels.map((parcel) => (
            <TableRow key={parcel.id}>
              <TableCell>{parcel.lrNo}</TableCell>
              <TableCell>{parcel.date}</TableCell>
              <TableCell>{parcel.noOfParcels}</TableCell>
              <TableCell>{parcel.itemName}</TableCell>
              <TableCell>{parcel.quantity}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Link to={`/edit-parcel/${parcel.id}`}>
                    <Button variant="outline" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Button variant="outline" size="icon">
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ParcelTable;