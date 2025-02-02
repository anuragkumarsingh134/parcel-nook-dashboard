import {
  TableCell,
  TableRow,
} from "@/components/ui/table";
import UserRoleSelect from "./UserRoleSelect";
import UserActions from "./UserActions";
import DeleteUserButton from "./DeleteUserButton";
import StatusBadge from "./StatusBadge";

interface UserProfile {
  id: string;
  email: string;
  status: string;
  user_roles: { role: "admin" | "editor" | "viewer" }[];
}

interface UserTableRowProps {
  user: UserProfile;
  onUpdate: () => void;
}

const UserTableRow = ({ user, onUpdate }: UserTableRowProps) => {
  return (
    <TableRow>
      <TableCell className="break-all">
        <span className="block" title={user.email}>
          {user.email}
        </span>
      </TableCell>
      <TableCell>
        <StatusBadge status={user.status} />
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
        <div className="flex flex-wrap gap-2">
          {user.status === "pending" && (
            <UserActions userId={user.id} onStatusUpdate={onUpdate} />
          )}
          {user.user_roles?.[0]?.role !== "admin" && (
            <DeleteUserButton userId={user.id} onUpdate={onUpdate} />
          )}
        </div>
      </TableCell>
    </TableRow>
  );
};

export default UserTableRow;