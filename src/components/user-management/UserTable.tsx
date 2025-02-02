import { Table, TableBody } from "@/components/ui/table";
import UserTableHeader from "./UserTableHeader";
import UserTableRow from "./UserTableRow";

interface UserProfile {
  id: string;
  email: string;
  status: string;
  user_roles: { role: "admin" | "editor" | "viewer" }[];
}

interface UserTableProps {
  users: UserProfile[];
  onUpdate: () => void;
}

const UserTable = ({ users, onUpdate }: UserTableProps) => {
  return (
    <div className="w-full overflow-x-auto">
      <Table>
        <UserTableHeader />
        <TableBody>
          {users?.map((user) => (
            <UserTableRow key={user.id} user={user} onUpdate={onUpdate} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UserTable;