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
import { useIsMobile } from "@/hooks/use-mobile";

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
  const isMobile = useIsMobile();

  const handleDeleteUser = async (userId: string) => {
    try {
      const { data, error } = await supabase.functions.invoke('delete-user', {
        body: { userId },
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "User deleted successfully",
      });
      
      onUpdate();
    } catch (error) {
      console.error('Error deleting user:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to delete user",
        variant: "destructive",
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "rejected":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default:
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
    }
  };

  return (
    <div className="w-full overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[35%]">Email</TableHead>
            <TableHead className="w-[15%]">Status</TableHead>
            <TableHead className="w-[20%]">Role</TableHead>
            <TableHead className="w-[30%]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users?.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="break-all">
                <span className="block" title={user.email}>
                  {user.email}
                </span>
              </TableCell>
              <TableCell>
                <span
                  className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                    user.status
                  )}`}
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
                <div className="flex flex-wrap gap-2">
                  {user.status === "pending" && (
                    <UserActions userId={user.id} onStatusUpdate={onUpdate} />
                  )}
                  {user.user_roles?.[0]?.role !== "admin" && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteUser(user.id)}
                      className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UserTable;