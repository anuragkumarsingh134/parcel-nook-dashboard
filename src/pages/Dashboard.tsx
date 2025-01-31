import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import ParcelTable from "@/components/ParcelTable";

const Dashboard = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Parcel Management</h1>
        <Link to="/add-parcel">
          <Button className="bg-primary hover:bg-primary/90">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add New Parcel
          </Button>
        </Link>
      </div>
      <ParcelTable />
    </div>
  );
};

export default Dashboard;