import UserTableRow from "./UserTableRow";

interface UserProfile {
  id: string;
  email: string;
  name: string;
  status: string;
  user_roles: { role: "admin" | "editor" | "viewer" }[];
}

interface UserTableProps {
  users: UserProfile[];
  onUpdate: () => void;
}

const UserTable = ({ users, onUpdate }: UserTableProps) => {
  return (
    <div className="w-full space-y-4">
      {users?.map((user) => (
        <UserTableRow key={user.id} user={user} onUpdate={onUpdate} />
      ))}
    </div>
  );
};

export default UserTable;