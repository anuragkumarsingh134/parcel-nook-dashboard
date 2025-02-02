import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import UserRoleSelect from "./UserRoleSelect";
import UserActions from "./UserActions";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

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
  const { toast } = useToast();

  const handleDeleteUser = async (userId: string) => {
    try {
      // Delete from profiles table (this will cascade to user_roles due to FK)
      const { error } = await supabase
        .from('profiles')
        .delete()
        .eq('id', userId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "User deleted successfully",
      });
      
      onUpdate(); // Refresh the list
    } catch (error) {
      console.error('Error deleting user:', error);
      toast({
        title: "Error",
        description: "Failed to delete user",
        variant: "destructive",
      });
    }
  };

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
              <div className="flex gap-2">
                {user.status === "pending" && (
                  <UserActions userId={user.id} onStatusUpdate={onUpdate} />
                )}
                {/* Don't allow deleting yourself */}
                {user.user_roles?.[0]?.role !== "admin" && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteUser(user.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    Delete
                  </Button>
                )}
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default UserTable;