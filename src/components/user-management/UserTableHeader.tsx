import {
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const UserTableHeader = () => {
  return (
    <TableHeader className="hidden md:table-header-group">
      <TableRow>
        <TableHead>Email</TableHead>
        <TableHead>Status</TableHead>
        <TableHead>Role</TableHead>
        <TableHead>Actions</TableHead>
      </TableRow>
    </TableHeader>
  );
};

export default UserTableHeader;