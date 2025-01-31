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

// Mock data for initial development
const mockData = [
  {
    id: 1,
    lrNo: "LR001",
    date: "2024-03-20",
    noOfParcels: 3,
    itemName: "Electronics",
    quantity: 10,
  },
  {
    id: 2,
    lrNo: "LR002",
    date: "2024-03-21",
    noOfParcels: 2,
    itemName: "Books",
    quantity: 20,
  },
];

const ParcelTable = () => {
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
          {mockData.map((parcel) => (
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