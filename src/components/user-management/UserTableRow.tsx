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
      <TableCell className="break-all md:w-[35%]">
        <div className="flex flex-col space-y-4 md:space-y-0">
          <span className="block font-medium" title={user.email}>
            {user.email}
          </span>
          <div className="md:hidden flex flex-col space-y-4">
            <div className="flex flex-col space-y-2">
              <span className="text-sm text-muted-foreground">Status</span>
              <StatusBadge status={user.status} />
            </div>
            
            <div className="flex flex-col space-y-2">
              <span className="text-sm text-muted-foreground">Role</span>
              <UserRoleSelect
                userId={user.id}
                currentRole={user.user_roles?.[0]?.role}
                isDisabled={user.status !== "approved"}
                onRoleUpdate={onUpdate}
              />
            </div>

            <div className="flex flex-col space-y-2">
              <span className="text-sm text-muted-foreground">Actions</span>
              <div className="flex flex-wrap gap-2">
                {user.status === "pending" && (
                  <UserActions userId={user.id} onStatusUpdate={onUpdate} />
                )}
                {user.user_roles?.[0]?.role !== "admin" && (
                  <DeleteUserButton userId={user.id} onUpdate={onUpdate} />
                )}
              </div>
            </div>
          </div>
        </div>
      </TableCell>
      <TableCell className="hidden md:table-cell md:w-[15%]">
        <StatusBadge status={user.status} />
      </TableCell>
      <TableCell className="hidden md:table-cell md:w-[20%]">
        <UserRoleSelect
          userId={user.id}
          currentRole={user.user_roles?.[0]?.role}
          isDisabled={user.status !== "approved"}
          onRoleUpdate={onUpdate}
        />
      </TableCell>
      <TableCell className="hidden md:table-cell md:w-[30%]">
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