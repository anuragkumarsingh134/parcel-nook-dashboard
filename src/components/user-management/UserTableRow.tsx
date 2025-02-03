import StatusBadge from "./StatusBadge";
import UserRoleSelect from "./UserRoleSelect";
import UserActions from "./UserActions";
import DeleteUserButton from "./DeleteUserButton";

interface UserProfile {
  id: string;
  email: string;
  name: string;
  status: string;
  user_roles: { role: "admin" | "editor" | "viewer" }[];
}

interface UserTableRowProps {
  user: UserProfile;
  onUpdate: () => void;
}

const UserTableRow = ({ user, onUpdate }: UserTableRowProps) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="space-y-4">
        <div>
          <span className="font-medium text-lg" title={user.email}>
            {user.name}
          </span>
        </div>
        
        <div className="space-y-4">
          <StatusBadge status={user.status} />
          
          <UserRoleSelect
            userId={user.id}
            currentRole={user.user_roles?.[0]?.role}
            isDisabled={user.status !== "approved"}
            onRoleUpdate={onUpdate}
          />

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
  );
};

export default UserTableRow;