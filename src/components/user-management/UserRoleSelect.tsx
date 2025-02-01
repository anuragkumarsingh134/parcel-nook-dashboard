import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type UserRole = "admin" | "editor" | "viewer";

interface UserRoleSelectProps {
  userId: string;
  currentRole?: UserRole;
  isDisabled: boolean;
  onRoleUpdate: () => void;
}

const UserRoleSelect = ({ userId, currentRole, isDisabled, onRoleUpdate }: UserRoleSelectProps) => {
  const { toast } = useToast();
  const [updating, setUpdating] = useState(false);

  const updateUserRole = async (newRole: UserRole) => {
    setUpdating(true);
    try {
      const { data: existingRole } = await supabase
        .from("user_roles")
        .select("*")
        .eq("user_id", userId)
        .single();

      if (existingRole) {
        const { error } = await supabase
          .from("user_roles")
          .update({ role: newRole })
          .eq("user_id", userId);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("user_roles")
          .insert({ user_id: userId, role: newRole });

        if (error) throw error;
      }

      toast({
        title: "Role updated successfully",
        description: "The user's role has been updated.",
      });
      onRoleUpdate();
    } catch (error) {
      console.error("Error updating role:", error);
      toast({
        title: "Error updating role",
        description: "There was an error updating the user's role.",
        variant: "destructive",
      });
    } finally {
      setUpdating(false);
    }
  };

  return (
    <Select
      disabled={updating || isDisabled}
      value={currentRole}
      onValueChange={(value: UserRole) => updateUserRole(value)}
    >
      <SelectTrigger className="w-32">
        <SelectValue placeholder="Select role" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="admin">Admin</SelectItem>
        <SelectItem value="editor">Editor</SelectItem>
        <SelectItem value="viewer">Viewer</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default UserRoleSelect;