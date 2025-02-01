import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { UserCheck, UserX } from "lucide-react";

type UserRole = "admin" | "editor" | "viewer";

interface UserProfile {
  id: string;
  email: string;
  status: string;
  user_roles: { role: UserRole }[];
}

const UserManagement = () => {
  const { toast } = useToast();
  const [updating, setUpdating] = useState(false);

  const { data: users, refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      // First, get all profiles
      const { data: profiles, error: profilesError } = await supabase
        .from("profiles")
        .select("id, email, status");

      if (profilesError) throw profilesError;

      // Then, for each profile, get their roles
      const profilesWithRoles = await Promise.all(
        profiles.map(async (profile) => {
          const { data: roles, error: rolesError } = await supabase
            .from("user_roles")
            .select("role")
            .eq("user_id", profile.id);

          if (rolesError) throw rolesError;

          return {
            ...profile,
            user_roles: roles || [],
          };
        })
      );

      return profilesWithRoles as UserProfile[];
    },
  });

  const updateUserRole = async (userId: string, newRole: UserRole) => {
    setUpdating(true);
    try {
      const { error } = await supabase
        .from("user_roles")
        .update({ role: newRole })
        .eq("user_id", userId);

      if (error) throw error;

      toast({
        title: "Role updated successfully",
        description: "The user's role has been updated.",
      });
      refetch();
    } catch (error) {
      toast({
        title: "Error updating role",
        description: "There was an error updating the user's role.",
        variant: "destructive",
      });
    } finally {
      setUpdating(false);
    }
  };

  const updateUserStatus = async (userId: string, newStatus: string) => {
    setUpdating(true);
    try {
      const { error } = await supabase
        .from("profiles")
        .update({ status: newStatus })
        .eq("id", userId);

      if (error) throw error;

      toast({
        title: "Status updated successfully",
        description: `User has been ${newStatus}.`,
      });
      refetch();
    } catch (error) {
      toast({
        title: "Error updating status",
        description: "There was an error updating the user's status.",
        variant: "destructive",
      });
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">User Management</h2>
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
                <Select
                  disabled={updating}
                  value={user.user_roles?.[0]?.role}
                  onValueChange={(value: UserRole) => updateUserRole(user.id, value)}
                >
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="editor">Editor</SelectItem>
                    <SelectItem value="viewer">Viewer</SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell>
                {user.status === "pending" && (
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={updating}
                      onClick={() => updateUserStatus(user.id, "approved")}
                    >
                      <UserCheck className="w-4 h-4 mr-1" />
                      Approve
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={updating}
                      onClick={() => updateUserStatus(user.id, "rejected")}
                    >
                      <UserX className="w-4 h-4 mr-1" />
                      Reject
                    </Button>
                  </div>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UserManagement;