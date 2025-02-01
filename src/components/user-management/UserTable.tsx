import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import UserRoleSelect from "./UserRoleSelect";
import UserActions from "./UserActions";

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
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Email</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users?.map((user) => (
          <TableRow key={user.id}>
            <TableCell>{user.email}</TableCell>
            <TableCell>
              <span
                className={`px-2 py-1 rounded-full text-xs ${
                  user.status === "approved"
                    ? "bg-green-100 text-green-800"
                    : user.status === "rejected"
                    ? "bg-red-100 text-red-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {user.status}
              </span>
            </TableCell>
            <TableCell>
              <UserRoleSelect
                userId={user.id}
                currentRole={user.user_roles?.[0]?.role}
                isDisabled={user.status !== "approved"}
                onRoleUpdate={onUpdate}
              />
            </TableCell>
            <TableCell>
              {user.status === "pending" && (
                <UserActions userId={user.id} onStatusUpdate={onUpdate} />
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default UserTable;