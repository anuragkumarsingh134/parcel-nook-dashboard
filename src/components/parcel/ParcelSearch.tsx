import { useState, useEffect } from "react";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import type { Parcel } from "../ParcelForm";

interface ParcelSearchProps {
  parcels: Parcel[];
  onSelect: (parcel: Parcel) => void;
}

const ParcelSearch = ({ parcels, onSelect }: ParcelSearchProps) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <div className="relative">
      <Button
        variant="outline"
        className="relative h-9 w-full justify-start border-purple-200 bg-purple-50 text-sm text-purple-900 hover:bg-purple-100 hover:border-purple-300 dark:border-purple-800 dark:bg-purple-900/20 dark:hover:bg-purple-900/40 dark:hover:border-purple-700 sm:pr-12 md:w-40 lg:w-64"
        onClick={() => setOpen(true)}
      >
        <Search className="mr-2 h-4 w-4" />
        <span className="hidden md:inline-flex">Search parcels...</span>
        <span className="inline-flex md:hidden">Search...</span>
        <kbd className="pointer-events-none absolute right-1.5 hidden h-6 select-none items-center gap-1 rounded border border-purple-200 bg-purple-100 px-1.5 font-mono text-[10px] font-medium text-purple-600 opacity-100 dark:border-purple-800 dark:bg-purple-900 dark:text-purple-400 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <Command className="rounded-lg border shadow-md">
          <CommandInput 
            placeholder="Search parcels..." 
            className="text-base text-purple-900 dark:text-white placeholder:text-purple-500 dark:placeholder:text-purple-400"
          />
          <CommandList>
            <CommandEmpty className="py-6 text-sm text-purple-600 dark:text-purple-300">
              No results found.
            </CommandEmpty>
            <CommandGroup heading="Parcels" className="text-sm font-medium text-purple-900 dark:text-white">
              {parcels.map((parcel) => (
                <CommandItem
                  key={parcel.id}
                  value={`${parcel.lr_no} ${parcel.item_name} ${parcel.date}`}
                  className="cursor-pointer hover:bg-purple-50 dark:hover:bg-purple-900/40 rounded-md"
                  onSelect={() => {
                    onSelect(parcel);
                    setOpen(false);
                  }}
                >
                  <div className="flex flex-col py-1">
                    <span className="font-medium text-purple-900 dark:text-white">
                      {parcel.lr_no}
                    </span>
                    <span className="text-sm text-purple-600 dark:text-purple-300">
                      {parcel.item_name} - {parcel.date}
                    </span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>
    </div>
  );
};

export default ParcelSearch;