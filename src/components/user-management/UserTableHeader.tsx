import {
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const UserTableHeader = () => {
  return (
    <TableHeader className="hidden md:table-header-group">
      <TableRow>
        <TableHead className="w-[35%]">Email</TableHead>
        <TableHead className="w-[15%]">Status</TableHead>
        <TableHead className="w-[20%]">Role</TableHead>
        <TableHead className="w-[30%]">Actions</TableHead>
      </TableRow>
    </TableHeader>
  );
};

export default UserTableHeader;