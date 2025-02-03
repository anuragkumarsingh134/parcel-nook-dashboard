import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface ParcelSearchProps {
  onSearch: (term: string) => void;
}

const ParcelSearch = ({ onSearch }: ParcelSearchProps) => {
  return (
    <div className="relative">
      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search parcels..."
          className="pl-8"
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
    </div>
  );
};

export default ParcelSearch;